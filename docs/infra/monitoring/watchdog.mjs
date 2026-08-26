/**
 * Lambda handler for the marketing-site uptime watchdog.
 *
 * Invoked by EventBridge Scheduler every CHECK_INTERVAL_MINUTES. Wires the
 * pure modules together: check the site, run the state machine against the
 * state persisted in SSM, and deliver alerts on DOWN/RECOVERED transitions.
 *
 * Delivery semantics: if every alert channel fails, the state is NOT
 * persisted, so the next poll re-derives the same transition and retries
 * the alert. If at least one channel succeeded, state is persisted and the
 * incident is considered notified (exactly-once per incident).
 */

import {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
} from "@aws-sdk/client-ssm";
import { checkUrl } from "./check.mjs";
import { Action, parseState, transition } from "./state.mjs";
import {
  buildDownEmail,
  buildDownSms,
  buildRecoveredEmail,
  buildRecoveredSms,
} from "./alerts.mjs";
import { sendEmail, sendSms } from "./send.mjs";

const ssm = new SSMClient({});

function env(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export async function handler() {
  const siteUrl = env("SITE_URL");
  const markerText = process.env.MARKER_TEXT || undefined;
  const threshold = Number(env("FAILURE_THRESHOLD", "3"));
  const timeoutMs = Number(env("REQUEST_TIMEOUT_MS", "10000"));
  const intervalMinutes = Number(env("CHECK_INTERVAL_MINUTES", "5"));
  const stateParameterName = env("STATE_PARAMETER_NAME");
  const alertEmail = env("ALERT_EMAIL");
  const senderEmail = env("SENDER_EMAIL");
  const alertSmsNumber = env("ALERT_SMS_NUMBER");

  const previousRaw = (
    await ssm.send(new GetParameterCommand({ Name: stateParameterName }))
  ).Parameter?.Value;
  const previous = parseState(previousRaw);

  const check = await checkUrl(siteUrl, { markerText, timeoutMs });
  const nowIso = new Date().toISOString();
  const { nextState, action } = transition(previous, check, nowIso, threshold);

  console.log(JSON.stringify({ check, action, nextState }));

  if (action !== Action.NONE) {
    const incident =
      action === Action.ALERT_DOWN
        ? {
            siteUrl,
            failureType: nextState.lastFailureType,
            statusCode: nextState.lastStatusCode,
            consecutiveFailures: nextState.consecutiveFailures,
            intervalMinutes,
            firstFailureAt: nextState.firstFailureAt,
          }
        : {
            siteUrl,
            firstFailureAt: previous.downSince ?? previous.firstFailureAt,
            recoveredAt: nowIso,
          };

    const email =
      action === Action.ALERT_DOWN
        ? buildDownEmail(incident)
        : buildRecoveredEmail(incident);
    const sms =
      action === Action.ALERT_DOWN
        ? buildDownSms(incident)
        : buildRecoveredSms(incident);

    const deliveries = await Promise.allSettled([
      sendEmail({ sender: senderEmail, recipient: alertEmail, ...email }),
      sendSms({ phoneNumber: alertSmsNumber, message: sms }),
    ]);
    const failures = deliveries.filter((d) => d.status === "rejected");
    for (const failure of failures) {
      console.error("alert delivery failed:", failure.reason);
    }
    if (failures.length === deliveries.length) {
      throw new Error(
        "all alert channels failed; state not persisted so the next poll retries",
      );
    }
  }

  await ssm.send(
    new PutParameterCommand({
      Name: stateParameterName,
      Value: JSON.stringify(nextState),
      Type: "String",
      Overwrite: true,
    }),
  );

  return { check, action };
}

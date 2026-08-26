/**
 * Alert delivery via AWS. Thin wrappers around the SDK clients that are
 * bundled with the Node.js Lambda runtime (not installed locally, so this
 * module is deliberately excluded from the unit tests — the live-fire test
 * covers it end-to-end).
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const ses = new SESClient({});
const sns = new SNSClient({});

/** Send an alert email via SES. Recipient/sender come from env config. */
export async function sendEmail({ sender, recipient, subject, body }) {
  await ses.send(
    new SendEmailCommand({
      Source: sender,
      Destination: { ToAddresses: [recipient] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Text: { Data: body, Charset: "UTF-8" } },
      },
    }),
  );
}

/**
 * Send an alert SMS via SNS direct publish. The number comes from the
 * ALERT_SMS_NUMBER env var (a stack parameter) — never hardcoded here.
 * Transactional type: outage alerts must not be throttled as promotional.
 */
export async function sendSms({ phoneNumber, message }) {
  await sns.send(
    new PublishCommand({
      PhoneNumber: phoneNumber,
      Message: message,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional",
        },
      },
    }),
  );
}

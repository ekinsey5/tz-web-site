import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildDownEmail,
  buildDownSms,
  buildRecoveredEmail,
  buildRecoveredSms,
  failureLabel,
  formatDuration,
} from "./alerts.mjs";

const downIncident = {
  siteUrl: "https://tether-zero.com/",
  failureType: "HTTP_ERROR",
  statusCode: 503,
  consecutiveFailures: 3,
  intervalMinutes: 5,
  firstFailureAt: "2026-08-26T14:05:00.000Z",
};

const recoveredIncident = {
  ...downIncident,
  recoveredAt: "2026-08-26T16:20:00.000Z",
};

test("failureLabel renders HTTP status codes and named failures", () => {
  assert.equal(failureLabel("HTTP_ERROR", 503), "HTTP 503");
  assert.equal(failureLabel("TIMEOUT"), "timeout");
  assert.equal(failureLabel("DNS_FAILURE"), "DNS failure");
  assert.equal(failureLabel("TLS_FAILURE"), "TLS failure");
  assert.equal(failureLabel("CONTENT_MISMATCH"), "content-mismatch");
});

test("formatDuration covers minutes, hours, and sub-minute", () => {
  assert.equal(
    formatDuration("2026-08-26T14:05:00Z", "2026-08-26T16:20:00Z"),
    "2h15m",
  );
  assert.equal(
    formatDuration("2026-08-26T14:05:00Z", "2026-08-26T14:50:00Z"),
    "45m",
  );
  assert.equal(
    formatDuration("2026-08-26T14:05:00Z", "2026-08-26T14:05:20Z"),
    "<1m",
  );
});

test("DOWN email contains URL, failure, count, and first-failure time", () => {
  const { subject, body } = buildDownEmail(downIncident);
  assert.equal(subject, "[ALERT] tether-zero.com is DOWN (HTTP 503)");
  assert.match(body, /URL: https:\/\/tether-zero\.com\//);
  assert.match(body, /Failure: HTTP 503/);
  assert.match(body, /Consecutive failed checks: 3 \(approx\. 15 minutes\)/);
  assert.match(body, /First failure detected: 2026-08-26T14:05:00\.000Z/);
  assert.match(body, /fires once per incident/);
});

test("RECOVERED email contains recovery time and downtime duration", () => {
  const { subject, body } = buildRecoveredEmail(recoveredIncident);
  assert.equal(subject, "[RESOLVED] tether-zero.com is back UP");
  assert.match(body, /Back up at: 2026-08-26T16:20:00\.000Z/);
  assert.match(body, /Approximate downtime: 2h15m/);
});

test("DOWN SMS is a single segment and carries the essentials", () => {
  const sms = buildDownSms(downIncident);
  assert.equal(
    sms,
    "ALERT: tether-zero.com DOWN (HTTP 503). 3 consecutive failed checks (~15 min). Since 14:05 UTC.",
  );
  assert.ok(sms.length < 160, `SMS too long: ${sms.length}`);
});

test("RECOVERED SMS is a single segment with time and downtime", () => {
  const sms = buildRecoveredSms(recoveredIncident);
  assert.equal(
    sms,
    "RESOLVED: tether-zero.com back UP at 16:20 UTC. Downtime ~2h15m.",
  );
  assert.ok(sms.length < 160, `SMS too long: ${sms.length}`);
});

test("worst-case DOWN SMS stays under one segment", () => {
  const sms = buildDownSms({
    ...downIncident,
    failureType: "CONTENT_MISMATCH",
    statusCode: null,
    consecutiveFailures: 999,
  });
  assert.ok(sms.length < 160, `SMS too long: ${sms.length}`);
});

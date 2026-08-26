/**
 * Alert message builders for the watchdog.
 *
 * Pure functions only — no AWS imports here so the copy is unit-testable
 * locally without the AWS SDK installed. Sending lives in send.mjs.
 */

const FAILURE_LABELS = {
  HTTP_ERROR: "HTTP error",
  TIMEOUT: "timeout",
  DNS_FAILURE: "DNS failure",
  TLS_FAILURE: "TLS failure",
  CONTENT_MISMATCH: "content-mismatch",
  CONNECTION_ERROR: "connection error",
};

/** Human label for a failure, e.g. "HTTP 503" or "DNS failure". */
export function failureLabel(failureType, statusCode) {
  if (failureType === "HTTP_ERROR" && statusCode) return `HTTP ${statusCode}`;
  return FAILURE_LABELS[failureType] ?? String(failureType);
}

/** "2h15m" | "45m" | "<1m" between two ISO timestamps. */
export function formatDuration(fromIso, toIso) {
  const minutes = Math.round((new Date(toIso) - new Date(fromIso)) / 60000);
  if (minutes < 1) return "<1m";
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}m`;
}

const hhmmUtc = (iso) => new Date(iso).toISOString().slice(11, 16);

/**
 * @param {object} incident
 *   siteUrl, failureType, statusCode, consecutiveFailures,
 *   intervalMinutes, firstFailureAt (ISO), recoveredAt (ISO; recovery only)
 */
export function buildDownEmail(incident) {
  const label = failureLabel(incident.failureType, incident.statusCode);
  const minutes = incident.consecutiveFailures * incident.intervalMinutes;
  return {
    subject: `[ALERT] tether-zero.com is DOWN (${label})`,
    body: [
      "Tether-Zero marketing site is DOWN.",
      "",
      `URL: ${incident.siteUrl}`,
      `Failure: ${label}`,
      `Consecutive failed checks: ${incident.consecutiveFailures} (approx. ${minutes} minutes)`,
      `First failure detected: ${incident.firstFailureAt}`,
      "",
      "This alert fires once per incident. A recovery notice will follow when the site is reachable again.",
      "",
      "— Tether-Zero uptime watchdog (tether-zero-monitoring stack)",
    ].join("\n"),
  };
}

export function buildRecoveredEmail(incident) {
  return {
    subject: "[RESOLVED] tether-zero.com is back UP",
    body: [
      "Tether-Zero marketing site has RECOVERED.",
      "",
      `URL: ${incident.siteUrl}`,
      `Back up at: ${incident.recoveredAt}`,
      `Approximate downtime: ${formatDuration(incident.firstFailureAt, incident.recoveredAt)}`,
      "",
      "— Tether-Zero uptime watchdog (tether-zero-monitoring stack)",
    ].join("\n"),
  };
}

/** Single-segment (<160 char) SMS bodies. */
export function buildDownSms(incident) {
  const label = failureLabel(incident.failureType, incident.statusCode);
  const minutes = incident.consecutiveFailures * incident.intervalMinutes;
  return (
    `ALERT: tether-zero.com DOWN (${label}). ` +
    `${incident.consecutiveFailures} consecutive failed checks (~${minutes} min). ` +
    `Since ${hhmmUtc(incident.firstFailureAt)} UTC.`
  );
}

export function buildRecoveredSms(incident) {
  return (
    `RESOLVED: tether-zero.com back UP at ${hhmmUtc(incident.recoveredAt)} UTC. ` +
    `Downtime ~${formatDuration(incident.firstFailureAt, incident.recoveredAt)}.`
  );
}

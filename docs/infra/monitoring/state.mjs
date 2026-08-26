/**
 * Outage state machine for the watchdog.
 *
 * Pure transition logic: given the previous persisted state and the latest
 * check result, decide the next state and whether an alert should fire.
 * Guarantees exactly one ALERT_DOWN and one ALERT_RECOVERED per incident —
 * a multi-hour outage produces no additional actions on intermediate polls.
 */

export const Action = Object.freeze({
  NONE: "NONE",
  ALERT_DOWN: "ALERT_DOWN",
  ALERT_RECOVERED: "ALERT_RECOVERED",
});

export function initialState() {
  return {
    status: "UP",
    consecutiveFailures: 0,
    firstFailureAt: null, // ISO-8601; start of the current failure streak
    downSince: null, // ISO-8601; set when the DOWN alert fires
    lastFailureType: null,
    lastStatusCode: null,
  };
}

/** Parse persisted state defensively; any malformed input resets to UP. */
export function parseState(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.status === "UP" || parsed?.status === "DOWN") {
      return { ...initialState(), ...parsed };
    }
  } catch {
    // fall through
  }
  return initialState();
}

/**
 * @param {object} prev - previous state (shape of initialState())
 * @param {object} check - result from checkUrl()
 * @param {string} nowIso - current time, ISO-8601
 * @param {number} threshold - consecutive failures required to go DOWN
 * @returns {{ nextState: object, action: string }}
 */
export function transition(prev, check, nowIso, threshold) {
  if (check.ok) {
    const recovered = prev.status === "DOWN";
    return {
      nextState: initialState(),
      action: recovered ? Action.ALERT_RECOVERED : Action.NONE,
    };
  }

  const consecutiveFailures = prev.consecutiveFailures + 1;
  const firstFailureAt = prev.firstFailureAt ?? nowIso;
  const goingDown = prev.status === "UP" && consecutiveFailures >= threshold;

  return {
    nextState: {
      status: goingDown ? "DOWN" : prev.status,
      consecutiveFailures,
      firstFailureAt,
      downSince: goingDown ? firstFailureAt : prev.downSince,
      lastFailureType: check.failureType,
      lastStatusCode: check.statusCode ?? null,
    },
    action: goingDown ? Action.ALERT_DOWN : Action.NONE,
  };
}

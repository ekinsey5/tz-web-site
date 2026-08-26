import { test } from "node:test";
import assert from "node:assert/strict";
import { Action, initialState, parseState, transition } from "./state.mjs";

const THRESHOLD = 3;
const ok = { ok: true, statusCode: 200 };
const fail = (failureType = "HTTP_ERROR", statusCode = 503) => ({
  ok: false,
  failureType,
  statusCode,
});

// Drive a sequence of check results through the machine, collecting actions.
function run(results, threshold = THRESHOLD) {
  let state = initialState();
  const actions = [];
  results.forEach((result, i) => {
    const { nextState, action } = transition(
      state,
      result,
      `2026-08-26T00:${String(i).padStart(2, "0")}:00Z`,
      threshold,
    );
    state = nextState;
    actions.push(action);
  });
  return { state, actions };
}

test("healthy polls produce no actions", () => {
  const { actions } = run([ok, ok, ok, ok]);
  assert.deepEqual(actions, Array(4).fill(Action.NONE));
});

test("alert fires only when the threshold is reached", () => {
  const { state, actions } = run([fail(), fail(), fail()]);
  assert.deepEqual(actions, [Action.NONE, Action.NONE, Action.ALERT_DOWN]);
  assert.equal(state.status, "DOWN");
  assert.equal(state.consecutiveFailures, 3);
  // downSince points at the START of the failure streak, not the alert time.
  assert.equal(state.downSince, "2026-08-26T00:00:00Z");
});

test("single blip below threshold never alerts and resets cleanly", () => {
  const { state, actions } = run([fail(), ok, fail(), fail(), ok]);
  assert.ok(!actions.includes(Action.ALERT_DOWN));
  assert.equal(state.status, "UP");
  assert.equal(state.consecutiveFailures, 0);
  assert.equal(state.firstFailureAt, null);
});

test("multi-hour outage yields exactly one DOWN and one RECOVERED", () => {
  const outage = [fail(), fail(), fail(), ...Array(36).fill(fail()), ok];
  const { actions } = run(outage);
  assert.equal(
    actions.filter((a) => a === Action.ALERT_DOWN).length,
    1,
    "exactly one DOWN alert",
  );
  assert.equal(
    actions.filter((a) => a === Action.ALERT_RECOVERED).length,
    1,
    "exactly one RECOVERED notice",
  );
  assert.equal(actions.at(-1), Action.ALERT_RECOVERED);
});

test("flapping after recovery requires a fresh threshold breach", () => {
  const { actions } = run([
    fail(),
    fail(),
    fail(), // DOWN
    ok, // RECOVERED
    fail(),
    fail(), // below threshold again — silent
    ok,
  ]);
  assert.deepEqual(actions, [
    Action.NONE,
    Action.NONE,
    Action.ALERT_DOWN,
    Action.ALERT_RECOVERED,
    Action.NONE,
    Action.NONE,
    Action.NONE,
  ]);
});

test("failure type is tracked and updated while down", () => {
  const { state } = run([fail("TIMEOUT"), fail("TIMEOUT"), fail("DNS_FAILURE", null)]);
  assert.equal(state.lastFailureType, "DNS_FAILURE");
  assert.equal(state.lastStatusCode, null);
});

test("recovery resets to a clean initial state", () => {
  const { state } = run([fail(), fail(), fail(), ok]);
  assert.deepEqual(state, initialState());
});

test("threshold of 1 alerts on the first failure", () => {
  const { actions } = run([fail()], 1);
  assert.deepEqual(actions, [Action.ALERT_DOWN]);
});

test("parseState round-trips valid state", () => {
  const down = {
    ...initialState(),
    status: "DOWN",
    consecutiveFailures: 5,
    downSince: "2026-08-26T00:00:00Z",
  };
  assert.deepEqual(parseState(JSON.stringify(down)), down);
});

test("parseState resets on garbage, empty, or wrong-shaped input", () => {
  for (const raw of ["", "not json", "{}", '{"status":"WAT"}', "null", undefined]) {
    assert.deepEqual(parseState(raw), initialState(), String(raw));
  }
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { checkUrl, classifyFetchError, FailureType } from "./check.mjs";

const htmlResponse = (status, body) =>
  new Response(body, { status, headers: { "content-type": "text/html" } });

const fetchReturning = (response) => async () => response;
const fetchThrowing = (err) => async () => {
  throw err;
};

test("healthy 200 page containing the marker is OK", async () => {
  const result = await checkUrl("https://example.com/", {
    markerText: "Tether-Zero",
    fetchImpl: fetchReturning(htmlResponse(200, "<html>Tether-Zero</html>")),
  });
  assert.deepEqual(result, { ok: true, statusCode: 200 });
});

test("healthy 200 with no marker configured is OK without reading body", async () => {
  const result = await checkUrl("https://example.com/", {
    fetchImpl: fetchReturning(htmlResponse(200, "")),
  });
  assert.equal(result.ok, true);
});

test("5xx classifies as HTTP_ERROR with status code", async () => {
  const result = await checkUrl("https://example.com/", {
    markerText: "Tether-Zero",
    fetchImpl: fetchReturning(htmlResponse(503, "Service Unavailable")),
  });
  assert.equal(result.ok, false);
  assert.equal(result.failureType, FailureType.HTTP_ERROR);
  assert.equal(result.statusCode, 503);
});

test("404 classifies as HTTP_ERROR", async () => {
  const result = await checkUrl("https://example.com/", {
    fetchImpl: fetchReturning(htmlResponse(404, "not found")),
  });
  assert.equal(result.failureType, FailureType.HTTP_ERROR);
  assert.equal(result.statusCode, 404);
});

test("200 page missing the marker classifies as CONTENT_MISMATCH", async () => {
  const result = await checkUrl("https://example.com/", {
    markerText: "Tether-Zero",
    fetchImpl: fetchReturning(htmlResponse(200, "<html>blank error page</html>")),
  });
  assert.equal(result.ok, false);
  assert.equal(result.failureType, FailureType.CONTENT_MISMATCH);
  assert.equal(result.statusCode, 200);
});

test("timeout abort classifies as TIMEOUT", async () => {
  const err = new DOMException("The operation timed out", "TimeoutError");
  const result = await checkUrl("https://example.com/", {
    fetchImpl: fetchThrowing(err),
  });
  assert.equal(result.failureType, FailureType.TIMEOUT);
});

test("real slow server triggers the timeout signal", async () => {
  const hangingFetch = (url, { signal }) =>
    new Promise((_, reject) => {
      signal.addEventListener("abort", () => reject(signal.reason));
    });
  const result = await checkUrl("https://example.com/", {
    timeoutMs: 20,
    fetchImpl: hangingFetch,
  });
  assert.equal(result.failureType, FailureType.TIMEOUT);
});

test("ENOTFOUND classifies as DNS_FAILURE", async () => {
  const err = new TypeError("fetch failed");
  err.cause = Object.assign(new Error("getaddrinfo ENOTFOUND"), {
    code: "ENOTFOUND",
  });
  const result = await checkUrl("https://nope.invalid/", {
    fetchImpl: fetchThrowing(err),
  });
  assert.equal(result.failureType, FailureType.DNS_FAILURE);
});

test("certificate errors classify as TLS_FAILURE", async () => {
  for (const code of [
    "CERT_HAS_EXPIRED",
    "DEPTH_ZERO_SELF_SIGNED_CERT",
    "ERR_TLS_CERT_ALTNAME_INVALID",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  ]) {
    const err = new TypeError("fetch failed");
    err.cause = Object.assign(new Error(code), { code });
    assert.equal(classifyFetchError(err), FailureType.TLS_FAILURE, code);
  }
});

test("connection refused falls back to CONNECTION_ERROR", async () => {
  const err = new TypeError("fetch failed");
  err.cause = Object.assign(new Error("connect ECONNREFUSED"), {
    code: "ECONNREFUSED",
  });
  const result = await checkUrl("https://example.com/", {
    fetchImpl: fetchThrowing(err),
  });
  assert.equal(result.failureType, FailureType.CONNECTION_ERROR);
});

test("checkUrl never rejects on unknown errors", async () => {
  const result = await checkUrl("https://example.com/", {
    fetchImpl: fetchThrowing(new Error("something exotic")),
  });
  assert.equal(result.ok, false);
  assert.equal(result.failureType, FailureType.CONNECTION_ERROR);
});

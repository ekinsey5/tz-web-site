/**
 * Black-box reachability check for the marketing site.
 *
 * Pure detection logic: fetches a URL the way a real visitor would and
 * classifies the outcome. No AWS dependencies — unit-testable in isolation
 * (inject `fetchImpl` to simulate failures).
 */

export const FailureType = Object.freeze({
  HTTP_ERROR: "HTTP_ERROR",
  TIMEOUT: "TIMEOUT",
  DNS_FAILURE: "DNS_FAILURE",
  TLS_FAILURE: "TLS_FAILURE",
  CONTENT_MISMATCH: "CONTENT_MISMATCH",
  CONNECTION_ERROR: "CONNECTION_ERROR",
});

const DNS_CODES = new Set(["ENOTFOUND", "EAI_AGAIN"]);

// OpenSSL verification failures whose codes don't mention CERT/TLS/SSL.
const TLS_CODES = new Set([
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "HOSTNAME_MISMATCH",
]);

/** Classify a fetch()/undici error into a FailureType. */
export function classifyFetchError(err) {
  if (err?.name === "TimeoutError" || err?.name === "AbortError") {
    return FailureType.TIMEOUT;
  }
  // undici wraps network errors in a TypeError whose `cause` carries the code.
  const code = err?.cause?.code ?? err?.code ?? "";
  if (DNS_CODES.has(code)) return FailureType.DNS_FAILURE;
  if (
    code.startsWith("ERR_TLS_") ||
    code.startsWith("ERR_SSL_") ||
    code.includes("CERT") ||
    TLS_CODES.has(code)
  ) {
    return FailureType.TLS_FAILURE;
  }
  return FailureType.CONNECTION_ERROR;
}

/**
 * Check one URL. Resolves to:
 *   { ok: true,  statusCode }
 *   { ok: false, failureType, statusCode?, detail }
 * Never rejects — every failure mode is classified.
 */
export async function checkUrl(
  url,
  { markerText, timeoutMs = 10000, fetchImpl = fetch } = {},
) {
  let response;
  try {
    response = await fetchImpl(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
      headers: { "user-agent": "tether-zero-watchdog/1.0" },
    });
  } catch (err) {
    return {
      ok: false,
      failureType: classifyFetchError(err),
      detail: err?.cause?.code ?? err?.message ?? String(err),
    };
  }

  if (response.status < 200 || response.status >= 300) {
    return {
      ok: false,
      failureType: FailureType.HTTP_ERROR,
      statusCode: response.status,
      detail: `HTTP ${response.status}`,
    };
  }

  if (markerText) {
    const body = await response.text();
    if (!body.includes(markerText)) {
      return {
        ok: false,
        failureType: FailureType.CONTENT_MISMATCH,
        statusCode: response.status,
        detail: `2xx response but marker text ${JSON.stringify(markerText)} not found`,
      };
    }
  }

  return { ok: true, statusCode: response.status };
}

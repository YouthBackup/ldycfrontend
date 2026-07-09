const KEY = "ldyc_checkout";

export function saveCheckout({ reference, authorizationUrl, payerEmail, participantSummary }) {
  sessionStorage.setItem(
    KEY,
    JSON.stringify({ reference, authorizationUrl, payerEmail, participantSummary })
  );
}

export function getCheckout() {
  return JSON.parse(sessionStorage.getItem(KEY) || "null");
}

export function clearCheckout() {
  sessionStorage.removeItem(KEY);
}

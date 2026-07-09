const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+234|0)[789][01]\d{8}$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value || "").trim());
}

export function isValidPhone(value) {
  return PHONE_REGEX.test(String(value || "").trim());
}

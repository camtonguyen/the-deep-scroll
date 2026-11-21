import { MAX_DEPTH } from "./sea";

/** A visitor's depth as a whole number of metres from the surface to the bottom. */
export function visitorDepth(depth: number): number {
  return Math.round(Math.min(Math.max(depth, 0), MAX_DEPTH));
}

/** Long names get smaller type, down to `min`, so they stay on a line or two: `size` fits up to `fits` characters. */
export function fitFontSize(text: string, size: number, min: number, fits = 16): number {
  return Math.max(min, Math.floor(size * Math.min(1, fits / Math.max(text.length, 1))));
}

export const NAME_MAX = 60;
export const EMAIL_MAX = 120;
export const DATE_MAX = 40;

/** Control characters (tabs, newlines, NUL, the C1 range) are never wanted in a name or date. */
// eslint-disable-next-line no-control-regex -- matching control characters is the point
export const CONTROL_CHARS = /[\u0000-\u001f\u007f-\u009f]/g;
/** Deliberately loose: one @, a dot in the domain, no spaces. The welcome email's provider is the real check. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGES = {
  nameRequired: "Please type your name.",
  nameLong: `Keep your name to ${NAME_MAX} characters.`,
  emailBad: "That email doesn't look right.",
  emailLong: `Keep your email to ${EMAIL_MAX} characters.`,
  dateLong: `Keep the date to ${DATE_MAX} characters.`,
} as const;

/** Control characters out, runs of whitespace into one space, ends trimmed. */
export function cleanText(value: unknown): string {
  return typeof value === "string" ? value.replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim() : "";
}

export interface CertificateRequest {
  name: string;
  email: string;
  date: string;
}

export type Validation = { ok: true; value: CertificateRequest } | { ok: false; errors: Partial<Record<keyof CertificateRequest, string>> };

/** The one rule set for the certificate form: the page's script runs the same rules (it is given these constants) and the server runs this again. A blank date means today. */
export function validateCertificateRequest(input: unknown, today: string): Validation {
  const raw = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const value = { name: cleanText(raw.name), email: cleanText(raw.email), date: cleanText(raw.date) || today };
  const errors: Partial<Record<keyof CertificateRequest, string>> = {};
  if (!value.name) errors.name = MESSAGES.nameRequired;
  else if (value.name.length > NAME_MAX) errors.name = MESSAGES.nameLong;
  if (value.email.length > EMAIL_MAX) errors.email = MESSAGES.emailLong;
  else if (value.email && !EMAIL_PATTERN.test(value.email)) errors.email = MESSAGES.emailBad;
  if (value.date.length > DATE_MAX) errors.date = MESSAGES.dateLong;
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

/** "HS-10935-04217": the depth, then five digits from a hash of the name and date, so the same dive always gets the same number. */
export function certificateNumber(name: string, depth: number, date: string): string {
  let hash = 2166136261;
  for (const ch of `${name}|${date}`) hash = Math.imul(hash ^ ch.codePointAt(0)!, 16777619) >>> 0;
  return `HS-${visitorDepth(depth)}-${String(hash % 100000).padStart(5, "0")}`;
}

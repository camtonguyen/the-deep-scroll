import { checkVisitor, type Validation, type VisitorRules } from "./portable";

export type { Validation, VisitorFields } from "./portable";

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
  emailRequired: "Please type an email address.",
  emailBad: "That email doesn't look right.",
  emailLong: `Keep your email to ${EMAIL_MAX} characters.`,
  dateLong: `Keep the date to ${DATE_MAX} characters.`,
} as const;

/** The form's rules as data: the server passes them to checkVisitor, and the page's script is given the same object. */
export const VISITOR_RULES: VisitorRules = {
  nameMax: NAME_MAX,
  emailMax: EMAIL_MAX,
  dateMax: DATE_MAX,
  control: CONTROL_CHARS.source,
  email: EMAIL_PATTERN.source,
  messages: MESSAGES,
};

/** Control characters out, runs of whitespace into one space, ends trimmed. */
export function cleanText(value: unknown): string {
  return typeof value === "string" ? value.replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim() : "";
}

/** The one rule set for the name and email form (the page runs this same function). A blank date means today. */
export function validateCertificateRequest(input: unknown, today: string, requireEmail = false): Validation {
  return checkVisitor(input, today, VISITOR_RULES, requireEmail);
}

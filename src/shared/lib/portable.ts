/**
 * Rules that run in two places: called here on the server, and pasted as source text into the page's script.
 * So each function must stand alone: no imports, no names from outside, no inner named functions or `const f = () =>`
 * (the page has none of this module's scope, and tsx adds a `__name` helper to those). Data comes in as arguments.
 * The page binds each source to its name (`var f = <source>`), so a minifier renaming them is safe. portable.test.ts runs the source the way the page does.
 */

/** Pairs of [from, to, px per metre] → depth in metres at `y` px from the surface. */
export function scaleToDepth(y: number, scale: readonly (readonly number[])[], max: number): number {
  let top = 0;
  for (let i = 0; i < scale.length; i++) {
    const bottom = top + (scale[i][1] - scale[i][0]) * scale[i][2];
    if (y <= bottom) return scale[i][0] + (y - top) / scale[i][2];
    top = bottom;
  }
  return max;
}

/** [depth, °C] rows, read in between by straight lines; the first row above the top, the last below the bottom. */
export function tempAt(depth: number, table: readonly (readonly number[])[]): number {
  if (!(depth > table[0][0])) return table[0][1];
  for (let i = 1; i < table.length; i++) {
    if (table[i][0] >= depth) {
      return table[i - 1][1] + ((table[i][1] - table[i - 1][1]) * (depth - table[i - 1][0])) / (table[i][0] - table[i - 1][0]);
    }
  }
  return table[table.length - 1][1];
}

/** [from depth, label] rows → the label of the deepest row at or above `depth`. */
export function lightAt(depth: number, table: readonly (readonly [number, string])[]): string {
  let label = table[0][1];
  for (let i = 0; i < table.length; i++) if (depth >= table[i][0]) label = table[i][1];
  return label;
}

/** Hydrostatic pressure, roughly: 1 atm at the surface + 1 atm per `metresPerAtm`. */
export function atmAt(metres: number, metresPerAtm: number): number {
  return 1 + metres / metresPerAtm;
}

export interface VisitorRules {
  nameMax: number;
  emailMax: number;
  dateMax: number;
  /** Source of the control-character pattern and of the email pattern (the page rebuilds them with `new RegExp`). */
  control: string;
  email: string;
  messages: Record<"nameRequired" | "nameLong" | "emailRequired" | "emailBad" | "emailLong" | "dateLong", string>;
}

export interface VisitorFields {
  name: string;
  email: string;
  date: string;
}

export type Validation = { ok: true; value: VisitorFields } | { ok: false; errors: Partial<Record<keyof VisitorFields, string>> };

/**
 * Clean the three fields (control characters out, whitespace runs into one space, ends trimmed) and check them.
 * A blank date means `today`; a blank email is an error only when `requireEmail`.
 */
export function checkVisitor(input: unknown, today: string, rules: VisitorRules, requireEmail: boolean): Validation {
  const raw = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const [name, email, date] = [raw.name, raw.email, raw.date].map((v) =>
    typeof v === "string" ? v.replace(new RegExp(rules.control, "g"), " ").replace(/\s+/g, " ").trim() : "",
  );
  const errors: Partial<Record<keyof VisitorFields, string>> = {};
  if (!name) errors.name = rules.messages.nameRequired;
  else if (name.length > rules.nameMax) errors.name = rules.messages.nameLong;
  if (email.length > rules.emailMax) errors.email = rules.messages.emailLong;
  else if (!email && requireEmail) errors.email = rules.messages.emailRequired;
  else if (email && !new RegExp(rules.email).test(email)) errors.email = rules.messages.emailBad;
  if (date.length > rules.dateMax) errors.date = rules.messages.dateLong;
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: { name, email, date: date || today } };
}

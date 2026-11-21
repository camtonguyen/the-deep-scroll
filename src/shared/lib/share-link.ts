import { MAX_DEPTH } from "./sea";
import { cleanText, NAME_MAX } from "./visitor-form";
import { visitorDepth } from "./visitor";

/** The `name` a share link carries: cleaned, "" when absent, null when too long to be a name. */
export function shareName(value: string | null): string | null {
  const name = cleanText(value);
  return name.length > NAME_MAX ? null : name;
}

/** The `depth` a share link carries: whole metres, the bottom when absent or not a number. */
export function shareDepth(value: string | null): number {
  const metres = value ? Number(value) : NaN;
  return Number.isFinite(metres) ? visitorDepth(metres) : MAX_DEPTH;
}

import { colors } from "@/shared/theme/tokens";

/** The stroke every drawing shares: a 2.5 px outline, aqua on the dark sea (navy where it sits on light). `fill` first, as the shapes list it. */
export const outline = (fill: string, stroke: string = colors.aqua) => ({ fill, stroke, strokeWidth: 2.5 }) as const;

/** An outline with no fill, for detail lines. */
export const open = outline("transparent");

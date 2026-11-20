import { CONTENT_WIDTH, PAGE_WIDTH } from "@/shared/theme/tokens";

/**
 * Art wider than the content is drawn in a window-wide Svg, centred and
 * clipped by the page. This is its viewBox: the drawing's left edge lands
 * `x` px from the left of the content width (negative runs off to the left).
 */
export const bleedViewBox = (x: number, height: number) => `${-((PAGE_WIDTH - CONTENT_WIDTH) / 2 + x)} 0 ${PAGE_WIDTH} ${height}`;

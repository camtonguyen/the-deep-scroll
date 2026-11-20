import { Circle, Path, Svg } from "@hyper-elements/react";
import { bleedViewBox } from "@/shared/lib/bleed";
import { PAGE_WIDTH, art, colors, sea } from "@/shared/theme/tokens";

/** Where the whale's head starts, px from the left of the content width. */
export const BLUE_WHALE_X = 520;

/**
 * Too long for the page: the tail runs off the right edge. It's drawn in a
 * window-wide Svg (centred, clipped by the page) so it can pass the content
 * width; the viewBox puts the drawing's left edge at BLUE_WHALE_X.
 */
export function BlueWhale() {
  return (
    <Svg width={PAGE_WIDTH} height={170} viewBox={bleedViewBox(BLUE_WHALE_X, 170)} title="A blue whale, too long to fit on the page">
      <Path
        d="M300 122 C 320 156, 362 164, 404 152 C 372 142, 344 130, 322 118 Z"
        style={{ fill: art.whaleBody, stroke: colors.navy, strokeWidth: 3 }}
      />
      <Path d="M790 54 C 820 32, 846 36, 856 60 Z" style={{ fill: art.whaleBody, stroke: colors.navy, strokeWidth: 3 }} />
      <Path
        d="M18 80 C 28 40, 120 20, 260 22 C 520 26, 820 50, 1100 68 L1100 100 C 820 112, 520 142, 260 140 C 120 138, 28 122, 18 80 Z"
        style={{ fill: art.whaleBody, stroke: colors.navy, strokeWidth: 3 }}
      />
      <Path d="M22 86 C 80 94, 160 98, 232 93" style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 3 }} />
      <Path
        d="M50 104 C 130 120, 220 126, 330 124 M64 114 C 140 128, 220 132, 300 132"
        style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 2 }}
      />
      <Circle cx={122} cy={74} r={6.5} style={{ fill: sea.shallow }} />
      <Circle cx={122} cy={74} r={4.5} style={{ fill: colors.navy }} />
      <Circle cx={420} cy={60} r={5} style={{ fill: sea.shallow, stroke: colors.navy, strokeWidth: 2 }} />
      <Circle cx={610} cy={74} r={4} style={{ fill: sea.shallow, stroke: colors.navy, strokeWidth: 2 }} />
    </Svg>
  );
}

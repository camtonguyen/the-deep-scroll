import { Circle, Path, Svg } from "@hyper-elements/react";
import { bleedViewBox } from "@/shared/lib/bleed";
import { PAGE_WIDTH, art, colors } from "@/shared/theme/tokens";

/** Where the plain's left edge is, px from the left of the content width. */
export const ABYSSAL_PLAIN_X = -900;

/** The abyssal plain: flat, muddy seafloor that runs off the left edge. */
export function AbyssalPlain() {
  return (
    <Svg width={PAGE_WIDTH} height={560} viewBox={bleedViewBox(ABYSSAL_PLAIN_X, 560)} title="">
      <Path
        d="M0 20 L880 20 Q940 14 1020 22 Q1140 26 1260 18 Q1380 14 1500 20 L1488 120 L1500 260 L1484 400 L1494 520 L1430 540 L1320 520 L1200 548 L1060 524 L920 550 L780 528 L640 546 L500 530 L0 540 Z"
        style={{ fill: art.seabed, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Circle cx={1080} cy={60} r={3} style={{ fill: art.seabedGrain }} />
      <Circle cx={1200} cy={120} r={4} style={{ fill: art.seabedGrain }} />
      <Circle cx={1340} cy={80} r={3} style={{ fill: art.seabedGrain }} />
      <Circle cx={1000} cy={200} r={4} style={{ fill: art.seabedGrain }} />
      <Circle cx={1400} cy={300} r={3} style={{ fill: art.seabedGrain }} />
      <Circle cx={1150} cy={380} r={4} style={{ fill: art.seabedGrain }} />
    </Svg>
  );
}

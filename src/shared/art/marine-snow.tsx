import { Circle, Svg } from "@hyper-elements/react";
import { depthToY, MAX_DEPTH } from "@/shared/lib/sea";
import { seededRandom } from "@/shared/lib/seeded-random";
import { colors, PAGE_WIDTH } from "@/shared/theme/tokens";

/** Where the snow starts (m): it falls through the dark water only. */
export const SNOW_FROM_DEPTH = 1000;
const DOTS = 360;

/** Tiny pale dots at seeded positions, so every render is identical. */
export function MarineSnow() {
  const height = Math.round(depthToY(MAX_DEPTH) - depthToY(SNOW_FROM_DEPTH) - 40);
  const random = seededRandom(7);
  const dots = Array.from({ length: DOTS }, (_, i) => ({
    key: i,
    cx: Math.round(random() * PAGE_WIDTH),
    cy: Math.round(random() * height),
    r: random() < 0.3 ? 1.5 : 1,
    opacity: Number((0.25 + random() * 0.35).toFixed(2)),
  }));
  return (
    <Svg width={PAGE_WIDTH} height={height} viewBox={`0 0 ${PAGE_WIDTH} ${height}`} title="">
      {dots.map(({ key, ...dot }) => (
        <Circle key={key} cx={dot.cx} cy={dot.cy} r={dot.r} style={{ fill: colors.aqua, opacity: dot.opacity }} />
      ))}
    </Svg>
  );
}

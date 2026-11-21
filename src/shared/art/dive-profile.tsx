import { Circle, Path, Rect, Svg } from "@hyper-elements/react";
import { BANDS } from "@/shared/data/zones";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { colors } from "@/shared/theme/tokens";

export const PROFILE_WIDTH = 250;
export const PROFILE_HEIGHT = 300;

/** A hand-drawn descent line, as [x, y] on the chart: slow at the top, then steeper (y runs with depth, linearly). */
const LINE: readonly (readonly [number, number])[] = [
  [8, 1],
  [40, 1],
  [60, 8],
  [80, 22],
  [120, 104],
  [170, 243],
  [232, 299],
];

/** Where a depth falls on the chart, px from its top (the chart is linear in depth). */
export const profileY = (depth: number) => (depth / MAX_DEPTH) * (PROFILE_HEIGHT - 1);

/** The line down to `depth`, with the last segment cut where it passes that depth. */
function lineTo(depth: number): [number, number][] {
  const limit = profileY(depth);
  const points: [number, number][] = [];
  for (let i = 0; i < LINE.length; i++) {
    const [x, y] = LINE[i];
    if (y <= limit) {
      points.push([x, y]);
      continue;
    }
    const [px, py] = LINE[i - 1];
    points.push([px + ((x - px) * (limit - py)) / (y - py), limit]);
    break;
  }
  return points;
}

/** A 250×300 dive profile: the page's 11 bands squeezed linearly, and a yellow line down to how deep the visitor got. Markers sit at the Titanic and Everest if they were passed. */
export function DiveProfile({ depth }: { depth: number }) {
  const points = lineTo(depth);
  const end = points.at(-1)!;
  return (
    <Svg
      width={PROFILE_WIDTH}
      height={PROFILE_HEIGHT}
      viewBox={`0 0 ${PROFILE_WIDTH} ${PROFILE_HEIGHT}`}
      title="Dive profile from the surface down to the visitor's depth"
    >
      {BANDS.map((band) => {
        const top = Math.round(profileY(band.from));
        return (
          <Rect
            key={band.from}
            x={0}
            y={top}
            width={PROFILE_WIDTH}
            height={Math.max(2, Math.round(profileY(band.to)) - top + 1)}
            style={{ fill: band.color }}
          />
        );
      })}
      <Path d={`M${points.map(([x, y]) => `${x} ${y}`).join(" L")}`} style={{ fill: "transparent", stroke: colors.glow, strokeWidth: 3 }} />
      {LINE.slice(4, 6)
        .filter(([, y]) => y <= end[1])
        .map(([x, y]) => (
          <Circle key={y} cx={x} cy={y} r={4} style={{ fill: colors.glow }} />
        ))}
      <Circle cx={end[0]} cy={Math.min(end[1], PROFILE_HEIGHT - 4)} r={5} style={{ fill: colors.glow }} />
    </Svg>
  );
}

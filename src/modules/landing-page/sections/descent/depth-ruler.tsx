import { Line, Svg } from "@hyper-elements/react";
import { inkAt } from "@/shared/data/zones";
import { depthToY, MAX_DEPTH, SEA_HEIGHT } from "@/shared/lib/depth-scale";

export const RULER_WIDTH = 44;
const X = 24;

/** The depth ruler: a line with a tick every 100 m, longer every 500 m. Its labels are placed items. */
export function DepthRuler() {
  const ticks = [];
  for (let depth = 0; depth <= MAX_DEPTH; depth += 100) {
    const y = depthToY(depth);
    const major = depth % 500 === 0;
    ticks.push(
      <Line
        key={depth}
        x1={X}
        y1={y}
        x2={X + (major ? 18 : 8)}
        y2={y}
        style={{ stroke: inkAt(depth), strokeWidth: 1, opacity: major ? 1 : 0.6 }}
      />,
    );
  }
  const flip = depthToY(200);

  return (
    <Svg width={RULER_WIDTH} height={SEA_HEIGHT} title="Depth ruler">
      <Line x1={X} y1={0} x2={X} y2={flip} style={{ stroke: inkAt(0), strokeWidth: 1 }} />
      <Line x1={X} y1={flip} x2={X} y2={SEA_HEIGHT} style={{ stroke: inkAt(200), strokeWidth: 1 }} />
      {ticks}
    </Svg>
  );
}

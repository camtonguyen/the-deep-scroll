import { Line, Svg } from "@hyper-elements/react";
import { inkAt } from "@/shared/data/zones";
import { formatDepth } from "@/shared/lib/format";
import { depthToY, MAX_DEPTH, SEA_HEIGHT, ticks } from "@/shared/lib/sea";
import { readoutText } from "@/shared/lib/readout";
import { MonoLabel } from "@/shared/ui/mono-label";
import { Positioned } from "@/shared/ui/positioned";

export const RULER_WIDTH = 44;
const X = 24;
/** A tick every 100 m; every 500 m a longer tick and a depth label. */
const TICK_STEP = 100;
const LABEL_STEP = 500;
const LABEL_LEFT = 50;
/** Pressure, temperature and light under every 1,000 m label. */
const READOUT_STEP = 1000;

/** The depth ruler: the line, its ticks and its labels, all from the sea's scale. Put it inside the sea's `Layer`: the labels are `Positioned`. */
export function DepthRuler() {
  const flip = depthToY(200);

  return (
    <>
      <Svg width={RULER_WIDTH} height={SEA_HEIGHT} title="Depth ruler">
        <Line x1={X} y1={0} x2={X} y2={flip} style={{ stroke: inkAt(0), strokeWidth: 1 }} />
        <Line x1={X} y1={flip} x2={X} y2={SEA_HEIGHT} style={{ stroke: inkAt(200), strokeWidth: 1 }} />
        {ticks(TICK_STEP).map(({ depth, y }) => {
          const major = depth % LABEL_STEP === 0;
          return (
            <Line
              key={depth}
              x1={X}
              y1={y}
              x2={X + (major ? 18 : 8)}
              y2={y}
              style={{ stroke: inkAt(depth), strokeWidth: 1, opacity: major ? 1 : 0.6 }}
            />
          );
        })}
      </Svg>
      {ticks(LABEL_STEP)
        .filter(({ depth }) => depth > 0 && depth < MAX_DEPTH)
        .map(({ depth, y }) => (
          <Positioned key={depth} top={y - 8} left={LABEL_LEFT}>
            <MonoLabel color={inkAt(depth)} size={12}>
              {formatDepth(depth)}
            </MonoLabel>
          </Positioned>
        ))}
      {ticks(READOUT_STEP)
        .filter(({ depth }) => depth > 0 && depth < MAX_DEPTH)
        .map(({ depth, y }) => (
          <Positioned key={`readout-${depth}`} top={y + 8} left={LABEL_LEFT}>
            <MonoLabel color={inkAt(depth)} size={12}>
              {readoutText(depth)}
            </MonoLabel>
          </Positioned>
        ))}
    </>
  );
}

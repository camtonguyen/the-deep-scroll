import { Circle, Ellipse, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** A sea cucumber walking on tube-feet legs. */
export function SeaPig() {
  return (
    <Svg width={100} height={44} viewBox="0 0 100 44" title="A sea pig, a sea cucumber walking on tube-feet legs">
      <Path d="M30 16 L26 4 M42 13 L40 2 M54 13 L58 3" style={{ stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Ellipse cx={20} cy={38} rx={4} ry={6} style={{ fill: art.seaPigLegs, stroke: colors.aqua, strokeWidth: 2 }} />
      <Ellipse cx={36} cy={39} rx={4} ry={6} style={{ fill: art.seaPigLegs, stroke: colors.aqua, strokeWidth: 2 }} />
      <Ellipse cx={52} cy={39} rx={4} ry={6} style={{ fill: art.seaPigLegs, stroke: colors.aqua, strokeWidth: 2 }} />
      <Ellipse cx={68} cy={39} rx={4} ry={6} style={{ fill: art.seaPigLegs, stroke: colors.aqua, strokeWidth: 2 }} />
      <Path
        d="M8 34 C 6 18, 30 12, 60 14 C 84 16, 96 24, 92 34 Z"
        style={{ fill: art.seaPigBody, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Circle cx={84} cy={26} r={2} style={{ fill: colors.navy }} />
    </Svg>
  );
}

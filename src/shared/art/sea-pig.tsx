import { Circle, Ellipse, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

const leg = { fill: art.seaPigLegs, stroke: colors.aqua, strokeWidth: 2 } as const;

/** A sea cucumber walking on tube-feet legs. */
export function SeaPig() {
  return (
    <Svg width={100} height={44} viewBox="0 0 100 44" title="A sea pig, a sea cucumber walking on tube-feet legs">
      <Path d="M26 16 L21 3 M38 12 L36 1 M52 12 L56 2 M66 15 L72 5" style={{ stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Ellipse cx={18} cy={38} rx={4} ry={6} style={leg} />
      <Ellipse cx={33} cy={39} rx={4} ry={6} style={leg} />
      <Ellipse cx={48} cy={39} rx={4} ry={6} style={leg} />
      <Ellipse cx={63} cy={39} rx={4} ry={6} style={leg} />
      <Ellipse cx={77} cy={38} rx={4} ry={6} style={leg} />
      <Path
        d="M6 34 C 4 18, 28 11, 58 13 C 82 14, 96 22, 94 34 Z"
        style={{ fill: art.seaPigBody, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path d="M8 30 L92 30 L94 34 L6 34 Z" style={{ fill: art.seaPigLegs }} />
      <Path d="M22 22 Q 40 17 58 19 M30 27 Q 52 23 78 25" style={{ fill: "transparent", stroke: art.seaPigLegs, strokeWidth: 1.5 }} />
      <Path d="M92 26 L99 22 M92 30 L100 31" style={{ stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Circle cx={84} cy={24} r={2.2} style={{ fill: colors.navy }} />
    </Svg>
  );
}

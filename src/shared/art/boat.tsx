import { Circle, Line, Path, Rect, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

const ink = { stroke: colors.navy, strokeWidth: 2.5 } as const;
const line = (width: number) => ({ stroke: colors.navy, strokeWidth: width }) as const;

/** The research boat R/V HADAL with a person waving. The hull name is a label placed over it (Svg has no text). */
export function Boat() {
  return (
    <Svg width={240} height={150} viewBox="0 0 240 150" title="A small research boat with a person waving">
      <Line x1={110} y1={10} x2={110} y2={62} style={line(3)} />
      <Path d="M111 12 L148 21 L111 31 Z" style={{ fill: art.boatBlue, ...ink }} />
      <Path d="M68 92 L70 60 L142 61 L140 92 Z" style={{ fill: art.boatBlue, ...ink }} />
      <Rect x={82} y={68} width={16} height={12} rx={2} style={{ fill: colors.aqua, stroke: colors.navy, strokeWidth: 2 }} />
      <Rect x={108} y={68} width={16} height={12} rx={2} style={{ fill: colors.aqua, stroke: colors.navy, strokeWidth: 2 }} />
      <Path d="M30 60 L46 40 L50 92" style={{ fill: "transparent", ...line(3) }} />
      <Line x1={46} y1={42} x2={40} y2={110} style={line(1.5)} />
      <Circle cx={176} cy={58} r={8} style={{ fill: colors.hull, ...ink }} />
      <Line x1={176} y1={66} x2={177} y2={90} style={line(3)} />
      <Line x1={176} y1={72} x2={193} y2={55} style={line(3)} />
      <Line x1={176} y1={73} x2={166} y2={84} style={line(3)} />
      <Path d="M199 47 q4 -4 0 -9 M206 51 q6 -6 0 -13" style={{ fill: "transparent", ...line(2) }} />
      <Path
        d="M12 90 L227 87 Q214 118 197 128 Q120 135 40 127 Q23 112 12 90 Z"
        style={{ fill: colors.hull, stroke: colors.navy, strokeWidth: 3 }}
      />
      <Path d="M24 105 Q120 113 220 101" style={{ fill: "transparent", ...line(3) }} />
    </Svg>
  );
}

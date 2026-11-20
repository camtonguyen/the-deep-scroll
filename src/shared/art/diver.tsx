import { Circle, Path, Rect, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

const ink = { stroke: colors.navy, strokeWidth: 2.5 } as const;

export function Diver() {
  return (
    <Svg width={160} height={70} title="A scuba diver">
      <Circle cx={150} cy={14} r={3} style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 2 }} />
      <Circle cx={156} cy={6} r={2} style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 2 }} />
      <Path d="M31 32 L3 19 L7 35 Z M31 38 L5 51 L9 37 Z" style={{ fill: art.diverFin, ...ink }} />
      <Path d="M30 31 C 40 22, 110 22, 128 30 C 133 38, 110 45, 40 43 C 30 41, 26 35, 30 31 Z" style={{ fill: colors.navy, ...ink }} />
      <Rect x={44} y={14} width={60} height={13} rx={6} style={{ fill: colors.hull, ...ink }} />
      <Path d="M112 40 L132 52" style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 5 }} />
      <Circle cx={138} cy={32} r={10} style={{ fill: colors.navy }} />
      <Rect x={137} y={26} width={15} height={9} rx={3} style={{ fill: colors.aqua, stroke: colors.navy, strokeWidth: 2 }} />
    </Svg>
  );
}

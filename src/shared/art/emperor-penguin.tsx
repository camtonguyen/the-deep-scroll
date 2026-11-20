import { Circle, Ellipse, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

/** Diving head first. */
export function EmperorPenguin() {
  return (
    <Svg width={64} height={104} viewBox="0 0 64 104" title="An emperor penguin diving head first">
      <Circle cx={40} cy={6} r={2.5} style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 1.5 }} />
      <Circle cx={46} cy={14} r={1.8} style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 1.5 }} />
      <Path d="M32 22 L26 14 L38 14 Z" style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2 }} />
      <Ellipse cx={32} cy={52} rx={20} ry={34} style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Ellipse cx={35} cy={54} rx={11} ry={26} style={{ fill: "#F4F7F8" }} />
      <Path d="M13 44 L4 70 M51 44 L60 70" style={{ stroke: colors.aqua, strokeWidth: 3 }} />
      <Circle cx={32} cy={88} r={11} style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Ellipse cx={40} cy={84} rx={4} ry={6} style={{ fill: "#F2A33A" }} />
      <Path d="M28 97 L32 104 L35 97 Z" style={{ fill: "#F2A33A", stroke: colors.aqua, strokeWidth: 1.5 }} />
    </Svg>
  );
}

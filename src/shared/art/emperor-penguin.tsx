import { Circle, Ellipse, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** Diving head first. */
export function EmperorPenguin() {
  return (
    <Svg width={64} height={104} viewBox="0 0 64 104" title="An emperor penguin diving head first">
      <Circle cx={40} cy={6} r={2.5} style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 1.5 }} />
      <Circle cx={46} cy={14} r={1.8} style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 1.5 }} />
      <Path d="M28 21 L22 12 L32 14 Z M36 21 L34 14 L44 12 Z" style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2 }} />
      <Ellipse cx={32} cy={52} rx={20} ry={34} style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Ellipse cx={35} cy={54} rx={11} ry={26} style={{ fill: art.penguinBelly }} />
      <Path d="M14 42 C 4 52, 2 66, 6 74 C 12 66, 16 54, 18 46 Z" style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2 }} />
      <Path d="M50 42 C 60 52, 62 66, 58 74 C 52 66, 48 54, 46 46 Z" style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2 }} />
      <Circle cx={32} cy={88} r={11} style={{ fill: colors.navy, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Ellipse cx={40} cy={84} rx={4} ry={6} style={{ fill: art.penguinBeak }} />
      <Path d="M28 97 L32 104 L35 97 Z" style={{ fill: art.penguinBeak, stroke: colors.aqua, strokeWidth: 1.5 }} />
    </Svg>
  );
}

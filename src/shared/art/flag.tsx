import { Line, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

/** A small flag planted in the seafloor. */
export function Flag() {
  return (
    <Svg width={44} height={60} viewBox="0 0 44 60" title="A small flag planted in the seafloor">
      <Line x1={4} y1={2} x2={4} y2={60} style={{ stroke: colors.aqua, strokeWidth: 3 }} />
      <Path d="M5 3 C 16 7, 26 5, 40 10 C 28 14, 18 16, 5 20 Z" style={{ fill: colors.glow, stroke: colors.aqua, strokeWidth: 2 }} />
    </Svg>
  );
}

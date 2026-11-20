import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** A tiny scavenger. */
export function Amphipod() {
  return (
    <Svg width={24} height={16} viewBox="0 0 24 16" title="A tiny amphipod">
      <Path d="M3 12 L1 15 M8 13 L7 16 M13 13 L13 16 M19 2 L23 0" style={{ stroke: colors.aqua, strokeWidth: 1.2 }} />
      <Path d="M2 9 C 4 2, 15 1, 21 5 C 19 11, 10 14, 3 12 Z" style={{ fill: art.amphipodShell, stroke: colors.aqua, strokeWidth: 1.5 }} />
      <Path d="M8 4 L7 12 M13 3 L12 13 M17 5 L16 11" style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 0.8 }} />
      <Circle cx={19} cy={7} r={1} style={{ fill: colors.navy }} />
    </Svg>
  );
}

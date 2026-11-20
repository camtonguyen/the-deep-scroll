import { Circle, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

/** Cuvier's beaked whale. */
export function CuviersWhale() {
  return (
    <Svg width={262} height={66} viewBox="0 0 262 66" title="A Cuvier's beaked whale">
      <Path d="M170 23 L186 9 L191 24 Z" style={{ fill: "#7A6656", stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path d="M232 36 L256 22 L250 40 L258 56 L232 44 Z" style={{ fill: "#7A6656", stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path
        d="M8 38 C 30 30, 46 26, 70 24 C 140 18, 200 24, 236 34 L236 44 C 200 52, 120 56, 70 52 C 46 50, 28 46, 8 40 Z"
        style={{ fill: "#7A6656", stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path d="M84 30 l34 5 M100 42 l40 -3 M150 30 l30 6 M128 46 l24 -2" style={{ stroke: colors.aqua, strokeWidth: 1.5 }} />
      <Circle cx={44} cy={35} r={2.5} style={{ fill: colors.aqua }} />
    </Svg>
  );
}

import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** A soft, tadpole-shaped hadal snailfish. */
export function Snailfish() {
  return (
    <Svg width={140} height={56} title="A hadal snailfish">
      <Path
        d="M44 34 C 42 50, 28 54, 18 49 C 28 46, 33 40, 35 31 Z"
        style={{ fill: art.snailfishFin, stroke: colors.aqua, strokeWidth: 2 }}
      />
      <Path
        d="M8 28 C 8 12, 26 6, 44 9 C 78 14, 112 20, 130 27 L138 21 L136 28 L138 35 L130 29 C 112 36, 78 42, 44 46 C 26 48, 8 44, 8 28 Z"
        style={{ fill: art.snailfishBody, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path
        d="M52 11 C 84 15, 112 21, 130 27 C 112 24, 84 22, 56 20 Z M52 44 C 84 40, 112 34, 130 29 C 112 31, 84 33, 56 36 Z"
        style={{ fill: art.snailfishFin }}
      />
      <Path d="M10 33 Q 18 38 26 34" style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 2 }} />
      <Circle cx={24} cy={22} r={4.5} style={{ fill: colors.navy }} />
      <Circle cx={25.6} cy={20.4} r={1.4} style={{ fill: colors.white }} />
    </Svg>
  );
}

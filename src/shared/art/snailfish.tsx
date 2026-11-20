import { Circle, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

export function Snailfish() {
  return (
    <Svg width={140} height={56} title="A hadal snailfish">
      <Path d="M44 36 C 40 50, 26 54, 18 48 C 28 46, 34 40, 36 34 Z" style={{ fill: "#E9B8C3", stroke: colors.aqua, strokeWidth: 2 }} />
      <Path
        d="M10 28 C 10 12, 30 6, 46 10 C 80 16, 110 22, 136 28 C 110 34, 80 40, 46 44 C 28 46, 10 42, 10 28 Z"
        style={{ fill: "#F2C6CF", stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path
        d="M60 12 C 90 16, 116 22, 134 27 M60 43 C 90 38, 116 32, 134 29"
        style={{ fill: "transparent", stroke: "#E9B8C3", strokeWidth: 2 }}
      />
      <Circle cx={24} cy={22} r={3.5} style={{ fill: colors.navy }} />
    </Svg>
  );
}

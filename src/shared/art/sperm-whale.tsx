import { Circle, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

/** Hunting a squid. */
export function SpermWhale() {
  return (
    <Svg width={520} height={140} viewBox="0 0 520 140" title="A sperm whale hunting a squid">
      <Path d="M458 70 L508 48 L498 90 L514 118 L458 96 Z" style={{ fill: "#3D4A57", stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path
        d="M10 40 C 10 18, 30 10, 160 12 C 260 14, 360 40, 462 70 L462 96 C 360 118, 220 128, 120 120 C 60 116, 14 100, 10 80 Z"
        style={{ fill: "#3D4A57", stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path d="M26 98 C 80 112, 140 114, 196 104" style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path
        d="M250 36 C 290 40, 330 48, 360 56 M240 104 C 300 104, 340 98, 380 90"
        style={{ fill: "transparent", stroke: "#5E6E7E", strokeWidth: 2 }}
      />
      <Circle cx={200} cy={72} r={4} style={{ fill: colors.aqua }} />
      <Path
        d="M220 110 C 230 128, 260 134, 280 124 C 262 120, 246 114, 236 106 Z"
        style={{ fill: "#3D4A57", stroke: colors.aqua, strokeWidth: 2.5 }}
      />
    </Svg>
  );
}

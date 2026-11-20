import { Circle, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

const line = { stroke: colors.aqua, strokeWidth: 2.5 } as const;
const open = { fill: "transparent", ...line } as const;

/** The glow is flat circles at falling opacity: no blur, no gradients. */
export function Anglerfish({ glow = colors.glow }: { glow?: string }) {
  return (
    <Svg width={290} height={180} title="A deep-sea anglerfish with a glowing lure">
      <Circle cx={50} cy={38} r={36} style={{ fill: glow, opacity: 0.08 }} />
      <Circle cx={50} cy={38} r={24} style={{ fill: glow, opacity: 0.16 }} />
      <Circle cx={50} cy={38} r={14} style={{ fill: glow, opacity: 0.32 }} />
      <Path d="M150 40 C 132 4, 72 2, 52 32" style={{ ...open, strokeWidth: 3 }} />
      <Circle cx={50} cy={38} r={6.5} style={{ fill: glow }} />
      <Path d="M240 110 L272 86 L280 142 L240 124 Z" style={{ fill: "#12202B", ...line }} />
      <Path
        d="M80 92 C 80 42, 150 22, 200 40 C 240 56, 252 92, 240 116 C 222 152, 150 162, 110 142 C 90 132, 80 114, 80 92 Z"
        style={{ fill: "#12202B", ...line }}
      />
      <Path d="M82 96 C 100 124, 132 132, 166 116" style={open} />
      <Path d="M88 94 l5 13 l6 -11 l5 13 l6 -11 l5 13 l6 -11 l5 12" style={{ fill: "transparent", stroke: colors.hull, strokeWidth: 2 }} />
      <Path d="M100 124 l4 -9 l5 9 l4 -9 l5 9" style={{ fill: "transparent", stroke: colors.hull, strokeWidth: 2 }} />
      <Circle cx={152} cy={70} r={7} style={{ fill: colors.aqua }} />
      <Circle cx={150} cy={70} r={3} style={{ fill: colors.abyss }} />
      <Path d="M190 120 C 200 140, 186 150, 176 146" style={open} />
    </Svg>
  );
}

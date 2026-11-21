import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";
import { open, outline } from "./styles";

/** The glow is flat circles at falling opacity: no blur, no gradients. */
export function Anglerfish({ glow = colors.glow }: { glow?: string }) {
  return (
    <Svg width={290} height={180} title="A deep-sea anglerfish with a glowing lure">
      <Circle cx={50} cy={38} r={36} style={{ fill: glow, opacity: 0.08 }} />
      <Circle cx={50} cy={38} r={24} style={{ fill: glow, opacity: 0.16 }} />
      <Circle cx={50} cy={38} r={14} style={{ fill: glow, opacity: 0.32 }} />
      <Path d="M150 40 C 132 4, 72 2, 52 32" style={{ ...open, strokeWidth: 3 }} />
      <Circle cx={50} cy={38} r={6.5} style={{ fill: glow }} />
      <Path d="M196 40 C 206 16, 228 18, 238 52 Z" style={outline(art.anglerSpot)} />
      <Path d="M240 110 L272 86 L280 142 L240 124 Z" style={outline(art.anglerBody)} />
      <Path
        d="M246 112 L268 98 M248 118 L276 116 M246 124 L270 136"
        style={{ fill: "transparent", stroke: art.anglerSpot, strokeWidth: 2 }}
      />
      <Path
        d="M80 92 C 80 42, 150 22, 200 40 C 240 56, 252 92, 240 116 C 222 152, 150 162, 110 142 C 90 132, 80 114, 80 92 Z"
        style={outline(art.anglerBody)}
      />
      <Circle cx={120} cy={60} r={3} style={{ fill: art.anglerSpot }} />
      <Circle cx={176} cy={52} r={4} style={{ fill: art.anglerSpot }} />
      <Circle cx={200} cy={92} r={5} style={{ fill: art.anglerSpot }} />
      <Circle cx={170} cy={130} r={4} style={{ fill: art.anglerSpot }} />
      <Circle cx={216} cy={118} r={3} style={{ fill: art.anglerSpot }} />
      <Path d="M82 96 C 100 124, 132 132, 166 116" style={open} />
      <Path d="M88 94 l5 13 l6 -11 l5 13 l6 -11 l5 13 l6 -11 l5 12" style={{ fill: "transparent", stroke: colors.hull, strokeWidth: 2 }} />
      <Path d="M100 124 l4 -9 l5 9 l4 -9 l5 9" style={{ fill: "transparent", stroke: colors.hull, strokeWidth: 2 }} />
      <Circle cx={152} cy={70} r={7} style={{ fill: colors.aqua }} />
      <Circle cx={150} cy={70} r={3.5} style={{ fill: colors.abyss }} />
      <Circle cx={148.5} cy={68.5} r={1.2} style={{ fill: colors.white }} />
      <Path d="M190 120 C 200 140, 186 150, 176 146" style={open} />
    </Svg>
  );
}

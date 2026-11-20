import { Circle, Path, Rect, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

const HULL = "M10 40 C 10 20, 40 14, 120 14 L220 16 C 246 18, 256 30, 252 44 C 248 58, 230 62, 200 62 L40 62 C 20 62, 10 54, 10 40 Z";
const edge = { fill: "transparent", stroke: colors.aqua, strokeWidth: 2.5 } as const;

/** The bathyscaphe Trieste: a big float with a small crew sphere slung beneath. Its name is a label placed over the hull (Svg has no text). */
export function TriesteSub() {
  return (
    <Svg width={262} height={110} viewBox="0 0 262 110" title="The bathyscaphe Trieste resting on the seafloor">
      <Path d="M60 60 L50 106 M200 60 L210 106 M44 106 L58 106 M204 106 L218 106" style={{ stroke: colors.aqua, strokeWidth: 3 }} />
      <Rect x={100} y={2} width={42} height={16} rx={3} style={{ fill: art.triesteHull, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path d="M112 10 L130 10" style={{ stroke: art.triesteLight, strokeWidth: 2 }} />
      <Path d={HULL} style={{ fill: art.triesteHull }} />
      <Path d="M10 44 L252 44 C 248 58, 230 62, 200 62 L40 62 C 20 62, 10 56, 10 44 Z" style={{ fill: art.triesteShade }} />
      <Path d="M24 26 C 44 21, 76 20, 120 20 L218 22" style={{ fill: "transparent", stroke: art.triesteLight, strokeWidth: 3 }} />
      <Path
        d="M56 17 L56 61 M180 16 L180 62 M222 20 L222 60 M18 46 L246 46"
        style={{ fill: "transparent", stroke: art.triesteLight, strokeWidth: 1.5 }}
      />
      <Path d="M252 36 L260 30 L260 52 L250 48" style={{ fill: art.triesteHull, stroke: colors.aqua, strokeWidth: 2 }} />
      <Path d={HULL} style={edge} />
      <Rect x={112} y={60} width={20} height={9} style={{ fill: art.triesteHull, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Circle cx={122} cy={84} r={22} style={{ fill: art.triesteWindow, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path d="M106 72 C 112 66, 120 64, 128 65" style={{ fill: "transparent", stroke: art.triesteLight, strokeWidth: 3 }} />
      <Circle cx={110} cy={86} r={11} style={{ fill: colors.cyan, opacity: 0.2 }} />
      <Circle cx={110} cy={86} r={5} style={{ fill: colors.cyan }} />
    </Svg>
  );
}

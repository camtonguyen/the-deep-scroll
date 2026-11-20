import { Circle, Path, Rect, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** The bathyscaphe Trieste. Its name is a label placed over the hull (Svg has no text). */
export function TriesteSub() {
  return (
    <Svg width={262} height={110} viewBox="0 0 262 110" title="The bathyscaphe Trieste resting on the seafloor">
      <Path d="M60 60 L50 106 M200 60 L210 106" style={{ stroke: colors.aqua, strokeWidth: 3 }} />
      <Rect x={100} y={2} width={42} height={16} rx={3} style={{ fill: art.triesteHull, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path
        d="M10 40 C 10 20, 40 14, 120 14 L220 16 C 246 18, 256 30, 252 44 C 248 58, 230 62, 200 62 L40 62 C 20 62, 10 54, 10 40 Z"
        style={{ fill: art.triesteHull, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Circle cx={122} cy={84} r={22} style={{ fill: art.triesteWindow, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Circle cx={110} cy={86} r={11} style={{ fill: colors.cyan, opacity: 0.2 }} />
      <Circle cx={110} cy={86} r={5} style={{ fill: colors.cyan }} />
    </Svg>
  );
}

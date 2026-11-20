import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

const line = { fill: "transparent", stroke: colors.aqua, strokeWidth: 2.5 } as const;
const BODY =
  "M26 62 C 22 28, 44 16, 61 16 C 78 16, 100 28, 96 62 C 102 80, 108 94, 104 102 Q 94 96 88 104 Q 80 94 74 106 Q 68 94 61 106 Q 54 94 48 106 Q 42 94 34 104 Q 28 96 18 102 C 14 94, 20 80, 26 62 Z";

/** Flapping its ear-like fins. */
export function DumboOctopus() {
  return (
    <Svg width={122} height={112} viewBox="0 0 122 112" title="A dumbo octopus flapping its ear-like fins">
      <Path
        d="M11.01 37.5 A15 9 -30 1 0 36.99 22.5 A15 9 -30 1 0 11.01 37.5 Z"
        style={{ fill: art.dumboFin, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path d="M16 33 Q 24 27 33 25" style={{ fill: "transparent", stroke: art.dumboWeb, strokeWidth: 2 }} />
      <Path
        d="M85.01 22.5 A15 9 30 1 0 110.99 37.5 A15 9 30 1 0 85.01 22.5 Z"
        style={{ fill: art.dumboFin, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path d="M106 33 Q 98 27 89 25" style={{ fill: "transparent", stroke: art.dumboWeb, strokeWidth: 2 }} />
      <Path d={BODY} style={{ fill: art.dumboFin }} />
      <Path
        d="M26.6 64 Q 61 74 95.4 64 C 102 80, 108 94, 104 102 Q 94 96 88 104 Q 80 94 74 106 Q 68 94 61 106 Q 54 94 48 106 Q 42 94 34 104 Q 28 96 18 102 C 14 94, 20 80, 26.6 64 Z"
        style={{ fill: art.dumboBelly }}
      />
      <Path
        d="M46 76 Q 44 90 48 102 M61 78 L61 104 M76 76 Q 78 90 74 102"
        style={{ fill: "transparent", stroke: art.dumboWeb, strokeWidth: 1.8 }}
      />
      <Path d={BODY} style={line} />
      <Circle cx={57} cy={27} r={2} style={{ fill: art.dumboBelly }} />
      <Circle cx={65} cy={25} r={2} style={{ fill: art.dumboBelly }} />
      <Circle cx={73} cy={28} r={2} style={{ fill: art.dumboBelly }} />
      <Circle cx={48} cy={46} r={7} style={{ fill: colors.white }} />
      <Circle cx={74} cy={46} r={7} style={{ fill: colors.white }} />
      <Circle cx={49} cy={47} r={3.8} style={{ fill: colors.navy }} />
      <Circle cx={73} cy={47} r={3.8} style={{ fill: colors.navy }} />
    </Svg>
  );
}

import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** Flapping its ear-like fins. */
export function DumboOctopus() {
  return (
    <Svg width={122} height={112} viewBox="0 0 122 112" title="A dumbo octopus flapping its ear-like fins">
      <Path
        d="M11.01 37.5 A15 9 -30 1 0 36.99 22.5 A15 9 -30 1 0 11.01 37.5 Z"
        style={{ fill: art.dumboFin, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path
        d="M85.01 22.5 A15 9 30 1 0 110.99 37.5 A15 9 30 1 0 85.01 22.5 Z"
        style={{ fill: art.dumboFin, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path
        d="M28 54 Q10 80 18 100 Q34 88 42 104 Q54 90 61 106 Q68 90 80 104 Q88 88 104 100 Q112 80 94 54 Z"
        style={{ fill: art.dumboBelly, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path d="M27 58 C 24 20, 98 20, 95 58 Z" style={{ fill: art.dumboFin, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Circle cx={49} cy={46} r={5} style={{ fill: colors.navy }} />
      <Circle cx={73} cy={46} r={5} style={{ fill: colors.navy }} />
    </Svg>
  );
}

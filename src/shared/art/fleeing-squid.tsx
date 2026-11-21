import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";
import { outline } from "./styles";

const edge = outline(art.squidBody);

/** The squid the sperm whale is after: jetting away, arms trailing. */
export function FleeingSquid() {
  return (
    <Svg width={110} height={40} viewBox="0 0 110 40" title="A squid fleeing">
      <Path
        d="M30 16 L6 8 M30 18 L2 15 M30 22 L2 25 M30 24 L6 33 M32 19 L10 20"
        style={{ fill: "transparent", stroke: art.squidBody, strokeWidth: 2.5 }}
      />
      <Path d="M80 14 L100 4 L106 20 L100 36 L80 26 Z" style={{ fill: art.squidFin, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path d="M40 13 C 60 9, 84 12, 104 20 C 84 28, 60 31, 40 27 Z" style={edge} />
      <Path d="M28 15 C 34 11, 42 12, 42 20 C 42 28, 34 29, 28 25 Z" style={edge} />
      <Path d="M46 15 C 64 12, 82 15, 96 19" style={{ fill: "transparent", stroke: art.squidFin, strokeWidth: 2 }} />
      <Circle cx={54} cy={23} r={1.6} style={{ fill: art.squidFin }} />
      <Circle cx={64} cy={22} r={1.6} style={{ fill: art.squidFin }} />
      <Circle cx={74} cy={21} r={1.6} style={{ fill: art.squidFin }} />
      <Circle cx={37} cy={19} r={4.5} style={{ fill: colors.aqua }} />
      <Circle cx={38} cy={19} r={2.2} style={{ fill: colors.navy }} />
    </Svg>
  );
}

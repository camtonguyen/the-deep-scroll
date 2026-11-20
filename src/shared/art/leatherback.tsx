import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors, sea } from "@/shared/theme/tokens";

const edge = { fill: art.turtleHead, stroke: colors.navy, strokeWidth: 2.5 } as const;

/** Leatherback sea turtle: ridged shell, long front flippers. */
export function Leatherback() {
  return (
    <Svg width={112} height={62} viewBox="0 0 112 62" title="A leatherback sea turtle">
      <Path d="M70 20 C 82 8, 96 5, 106 8 C 98 14, 88 18, 80 25 Z" style={edge} />
      <Path d="M72 38 C 84 52, 72 61, 46 59 C 56 54, 60 48, 60 40 Z" style={edge} />
      <Path d="M30 38 C 26 46, 18 50, 6 50 C 14 44, 16 40, 20 33 Z" style={edge} />
      <Path
        d="M16 30 C 18 12, 66 6, 90 22 C 96 30, 88 40, 66 44 C 44 48, 14 44, 16 30 Z"
        style={{ fill: art.turtleShell, stroke: colors.navy, strokeWidth: 2.5 }}
      />
      <Path
        d="M24 25 C 46 15, 72 15, 87 23 M20 31 C 44 25, 72 25, 90 29 M22 37 C 44 34, 70 34, 86 35"
        style={{ fill: "transparent", stroke: sea.shallow, strokeWidth: 1.8 }}
      />
      <Circle cx={100} cy={28} r={9} style={edge} />
      <Circle cx={103} cy={25} r={1.8} style={{ fill: colors.aqua }} />
    </Svg>
  );
}

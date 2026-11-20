import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors, sea } from "@/shared/theme/tokens";

/** Leatherback sea turtle. */
export function Leatherback() {
  return (
    <Svg width={112} height={62} viewBox="0 0 112 62" title="A leatherback sea turtle">
      <Path
        d="M60 40 C 70 58, 50 61, 37 54 Z M26 40 L10 52 L22 44 Z"
        style={{ fill: art.turtleHead, stroke: colors.navy, strokeWidth: 2.5 }}
      />
      <Circle cx={100} cy={27} r={8} style={{ fill: art.turtleHead, stroke: colors.navy, strokeWidth: 2.5 }} />
      <Path
        d="M20 30 C 20 12, 70 6, 92 24 C 96 31, 90 40, 70 44 C 50 48, 24 44, 20 30 Z"
        style={{ fill: art.turtleShell, stroke: colors.navy, strokeWidth: 2.5 }}
      />
      <Path
        d="M28 26 C 50 18, 76 18, 90 26 M26 34 C 50 30, 76 30, 88 33"
        style={{ fill: "transparent", stroke: sea.shallow, strokeWidth: 2 }}
      />
    </Svg>
  );
}

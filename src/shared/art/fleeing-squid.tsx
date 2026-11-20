import { Circle, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

/** The squid the sperm whale is after. */
export function FleeingSquid() {
  return (
    <Svg width={110} height={40} viewBox="0 0 110 40" title="A squid fleeing">
      <Path d="M40 18 L4 10 M40 20 L2 22 M40 22 L6 32" style={{ stroke: "#A8483A", strokeWidth: 3 }} />
      <Path d="M38 12 C 60 8, 90 12, 106 20 C 90 28, 60 32, 38 28 Z" style={{ fill: "#A8483A", stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Circle cx={46} cy={19} r={3} style={{ fill: colors.aqua }} />
    </Svg>
  );
}

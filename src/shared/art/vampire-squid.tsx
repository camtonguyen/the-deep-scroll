import { Circle, Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

/** Glowing arm tips (flat circles at low opacity). */
export function VampireSquid() {
  return (
    <Svg width={164} height={128} viewBox="0 0 164 128" title="A vampire squid with glowing arm tips">
      <Path
        d="M39.35 33.46 A13 7 -35 1 0 60.65 18.54 A13 7 -35 1 0 39.35 33.46 Z"
        style={{ fill: "#6B1E2E", stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path
        d="M103.35 18.54 A13 7 35 1 0 124.65 33.46 A13 7 35 1 0 103.35 18.54 Z"
        style={{ fill: "#6B1E2E", stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path
        d="M58 16 C 58 4, 106 4, 106 16 L110 60 L150 102 Q120 94 112 116 Q96 98 82 120 Q68 98 52 116 Q44 94 14 102 L54 60 Z"
        style={{ fill: "#6B1E2E", stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Circle cx={70} cy={46} r={9} style={{ fill: colors.aqua }} />
      <Circle cx={94} cy={46} r={9} style={{ fill: colors.aqua }} />
      <Circle cx={71} cy={47} r={4} style={{ fill: colors.navy }} />
      <Circle cx={93} cy={47} r={4} style={{ fill: colors.navy }} />
      <Circle cx={14} cy={102} r={9} style={{ fill: colors.cyan, opacity: 0.18 }} />
      <Circle cx={14} cy={102} r={3.5} style={{ fill: colors.cyan }} />
      <Circle cx={52} cy={116} r={9} style={{ fill: colors.cyan, opacity: 0.18 }} />
      <Circle cx={52} cy={116} r={3.5} style={{ fill: colors.cyan }} />
      <Circle cx={82} cy={120} r={9} style={{ fill: colors.cyan, opacity: 0.18 }} />
      <Circle cx={82} cy={120} r={3.5} style={{ fill: colors.cyan }} />
      <Circle cx={112} cy={116} r={9} style={{ fill: colors.cyan, opacity: 0.18 }} />
      <Circle cx={112} cy={116} r={3.5} style={{ fill: colors.cyan }} />
      <Circle cx={150} cy={102} r={9} style={{ fill: colors.cyan, opacity: 0.18 }} />
      <Circle cx={150} cy={102} r={3.5} style={{ fill: colors.cyan }} />
    </Svg>
  );
}

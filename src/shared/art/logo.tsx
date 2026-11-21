import { Circle, Line, Path, Svg } from "@hyper-elements/react";
import { colors, sea } from "@/shared/theme/tokens";

/** The Hadal Society's mark: a sea-blue disc, a wave across it and a plumb line. `ring` is the disc's outline (navy on light, aqua on dark). */
export function Logo({ size = 34, ring = colors.navy }: { size?: number; ring?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" title="">
      <Circle cx={18} cy={18} r={15} style={{ fill: sea.shallow, stroke: ring, strokeWidth: 2.5 }} />
      <Path d="M5 15 q4 -3 8 0 t8 0 t8 0 t6 0" style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 2 }} />
      <Line x1={18} y1={15} x2={18} y2={29} style={{ stroke: colors.navy, strokeWidth: 2 }} />
      <Circle cx={18} cy={29} r={2.5} style={{ fill: colors.navy }} />
    </Svg>
  );
}

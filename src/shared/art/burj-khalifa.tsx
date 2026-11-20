import { Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";
import { depthToY } from "@/shared/lib/sea";

/** Upside down, hung from the surface; its spire tip stops at this depth. */
export const BURJ_TIP_DEPTH = 828;

export function BurjKhalifa() {
  const height = Math.round(depthToY(BURJ_TIP_DEPTH));
  return (
    <Svg width={60} height={height} viewBox={`0 0 60 ${height}`} title="The Burj Khalifa, upside down, hanging from the surface">
      <Path
        d={`M2 0 L58 0 L53 150 L49 300 L45 440 L41 560 L37 680 L34 790 L32 880 L31 960 L30 ${height} L29 960 L28 880 L26 790 L23 680 L19 560 L15 440 L11 300 L7 150 Z`}
        style={{ fill: colors.aqua, stroke: colors.navy, strokeWidth: 2 }}
      />
      <Path
        d="M7 150 H53 M11 300 H49 M15 440 H45 M19 560 H41 M23 680 H37 M26 790 H34"
        style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 1.5 }}
      />
    </Svg>
  );
}

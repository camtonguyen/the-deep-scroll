import { Circle, Ellipse, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** Its tentacles reach across the depth ruler. */
export function GiantSquid() {
  return (
    <Svg width={720} height={140} viewBox="0 0 720 140" title="A giant squid whose tentacles reach across the depth ruler">
      <Path d="M440 66 C 360 56, 260 34, 160 48 S 40 70, 8 56" style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 9 }} />
      <Path d="M440 66 C 360 56, 260 34, 160 48 S 40 70, 8 56" style={{ fill: "transparent", stroke: art.squidBody, strokeWidth: 4.5 }} />
      <Path d="M440 78 C 360 90, 280 112, 180 100 S 70 86, 30 98" style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 9 }} />
      <Path
        d="M440 78 C 360 90, 280 112, 180 100 S 70 86, 30 98"
        style={{ fill: "transparent", stroke: art.squidBody, strokeWidth: 4.5 }}
      />
      <Path
        d="M446 62 C 400 50, 360 52, 330 46 M446 70 C 400 66, 350 70, 310 64 M446 76 C 400 80, 350 84, 320 92 M446 84 C 410 94, 380 100, 350 110"
        style={{ fill: "transparent", stroke: colors.aqua, strokeWidth: 11 }}
      />
      <Path
        d="M446 62 C 400 50, 360 52, 330 46 M446 70 C 400 66, 350 70, 310 64 M446 76 C 400 80, 350 84, 320 92 M446 84 C 410 94, 380 100, 350 110"
        style={{ fill: "transparent", stroke: art.squidBody, strokeWidth: 6.5 }}
      />
      <Ellipse cx={12} cy={55} rx={12} ry={6} style={{ fill: art.squidBody, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Ellipse cx={32} cy={98} rx={12} ry={6} style={{ fill: art.squidBody, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path d="M650 56 L700 28 L714 70 L700 112 L650 84 Z" style={{ fill: art.squidFin, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path
        d="M488 46 C 560 36, 640 48, 704 70 C 640 92, 560 104, 488 94 Z"
        style={{ fill: art.squidBody, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Ellipse cx={468} cy={70} rx={30} ry={24} style={{ fill: art.squidBody, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Circle cx={470} cy={64} r={11} style={{ fill: colors.aqua, stroke: colors.navy, strokeWidth: 2 }} />
      <Circle cx={466} cy={64} r={5} style={{ fill: colors.navy }} />
    </Svg>
  );
}

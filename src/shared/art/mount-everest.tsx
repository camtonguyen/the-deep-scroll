import { Path, Svg } from "@hyper-elements/react";
import { depthToY } from "@/shared/lib/sea";
import { art, colors } from "@/shared/theme/tokens";

/** Upside down, hung from the surface; its summit stops at 8,849 m. */
/** The summit end, hung from the surface: it starts at 6,000 m on the page and its tip stops at 8,849 m. */
export const EVEREST_TOP_DEPTH = 6000;
export const EVEREST_TIP_DEPTH = 8849;

export function MountEverest() {
  const height = Math.round(depthToY(EVEREST_TIP_DEPTH) - depthToY(EVEREST_TOP_DEPTH));
  return (
    <Svg
      width={340}
      height={height}
      viewBox={`0 0 340 ${height}`}
      title="The summit end of Mount Everest, upside down, reaching down to 8,849 metres"
    >
      <Path
        d={`M0 0 L340 0 L300 160 L270 300 L240 420 L214 560 L198 680 L186 780 L176 860 L170 ${height} L162 860 L150 790 L132 690 L112 560 L90 430 L64 300 L40 160 Z`}
        style={{ fill: art.everestRock, stroke: colors.aqua, strokeWidth: 2.5 }}
      />
      <Path
        d={`M198 680 L186 780 L176 860 L170 ${height} L162 860 L150 790 L132 690 L150 724 L166 700 L182 732 Z`}
        style={{ fill: colors.aqua }}
      />
      <Path d="M0 1 L340 1" style={{ stroke: art.everestRock, strokeWidth: 3 }} />
      <Path
        d="M0 1 H8 M14 1 H22 M28 1 H36 M42 1 H50 M56 1 H64 M70 1 H78 M84 1 H92 M98 1 H106 M112 1 H120 M126 1 H134 M140 1 H148 M154 1 H162 M168 1 H176 M182 1 H190 M196 1 H204 M210 1 H218 M224 1 H232 M238 1 H246 M252 1 H260 M266 1 H274 M280 1 H288 M294 1 H302 M308 1 H316 M322 1 H330 M336 1 H344"
        style={{ stroke: colors.aqua, strokeWidth: 2 }}
      />
    </Svg>
  );
}

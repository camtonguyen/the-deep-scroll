import { Path, Svg } from "@hyper-elements/react";
import { colors, sea } from "@/shared/theme/tokens";

/** One swell is this wide, px; the page rolls the wave by one period per loop. */
export const WAVE_PERIOD = 120;
const PERIOD = WAVE_PERIOD;

/** The waterline: a wave, one swell per 120 px, at least `width` px wide, with the first sea colour below it. */
export function WaveLine({ width }: { width: number }) {
  const swells = Math.ceil(width / PERIOD);
  width = swells * PERIOD;
  const crest = `M0 20 q30 -14 60 0 ${"t60 0 ".repeat(swells * 2 - 1)}`;
  return (
    <Svg width={width} height={40} viewBox={`0 0 ${width} 40`} title="">
      <Path d={`${crest}L${swells * PERIOD} 40 L0 40 Z`} style={{ fill: sea.shallow }} />
      <Path d={crest} style={{ fill: "transparent", stroke: colors.navy, strokeWidth: 2.5 }} />
    </Svg>
  );
}

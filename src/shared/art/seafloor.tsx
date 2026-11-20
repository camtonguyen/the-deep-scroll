import { Path, Svg } from "@hyper-elements/react";
import { PAGE_WIDTH, art, colors } from "@/shared/theme/tokens";

/** Gentle bumps across the whole window: one gentle swell every `step` px, left to right, with the floor below. */
function floorPath(width: number, height: number) {
  const step = 128;
  const bumps = [16, 14, 20, 12, 18, 14, 22, 14, 18, 12, 20, 14, 18, 12, 20, 14, 18, 12, 18, 14];
  let d = `M0 ${bumps[0]}`;
  for (let x = step, i = 1; x <= width + step; x += step, i++) {
    // the control point alternates above and below the line, so the floor rolls gently
    d += ` Q${x - step / 2} ${i % 2 ? 8 : 26} ${x} ${bumps[i % bumps.length]}`;
  }
  return `${d} L${width + step} ${height} L0 ${height} Z`;
}

/** The seafloor of the Challenger Deep, the full width of the window. */
export function Seafloor() {
  return (
    <Svg width={PAGE_WIDTH} height={178} viewBox={`0 0 ${PAGE_WIDTH} 178`} title="">
      <Path d={floorPath(PAGE_WIDTH, 178)} style={{ fill: art.seabed, stroke: colors.aqua, strokeWidth: 2.5 }} />
    </Svg>
  );
}

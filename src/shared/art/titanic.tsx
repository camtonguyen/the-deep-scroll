import { Circle, Path, Svg } from "@hyper-elements/react";
import { art, colors } from "@/shared/theme/tokens";

/** The bow, upright on the seafloor. */
export function Titanic() {
  return (
    <Svg width={370} height={130} viewBox="0 0 370 130" title="The bow of the Titanic resting upright on the seafloor">
      <Path d="M0 116 C 60 100, 300 100, 370 116 L370 130 L0 130 Z" style={{ fill: art.seabed, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path d="M20 38 L300 34 L352 24 L332 110 L20 112 Z" style={{ fill: art.titanicHull, stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path d="M22 54 L340 50" style={{ stroke: colors.aqua, strokeWidth: 1.5 }} />
      <Circle cx={60} cy={70} r={3.5} style={{ fill: colors.aqua }} />
      <Circle cx={96} cy={70} r={3.5} style={{ fill: colors.aqua }} />
      <Circle cx={132} cy={69} r={3.5} style={{ fill: colors.aqua }} />
      <Circle cx={168} cy={69} r={3.5} style={{ fill: colors.aqua }} />
      <Circle cx={204} cy={68} r={3.5} style={{ fill: colors.aqua }} />
      <Circle cx={240} cy={68} r={3.5} style={{ fill: colors.aqua }} />
      {[56, 92, 128, 164, 200, 236, 272].map((cx) => (
        <Circle key={cx} cx={cx} cy={92} r={3} style={{ fill: colors.aqua }} />
      ))}
      <Path d="M200 34 L188 6 M300 34 L330 14" style={{ stroke: colors.aqua, strokeWidth: 2.5 }} />
      <Path
        d="M40 112 l3 -10 l3 10 M110 112 l2 -8 l3 8 M250 111 l3 -12 l3 12"
        style={{ fill: "transparent", stroke: art.titanicRust, strokeWidth: 2 }}
      />
    </Svg>
  );
}

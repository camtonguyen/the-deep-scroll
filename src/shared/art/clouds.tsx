import { Path, Svg } from "@hyper-elements/react";
import { colors } from "@/shared/theme/tokens";

const cloud = { fill: "#FFFFFF", stroke: colors.navy, strokeWidth: 2.5 } as const;

export function CloudLarge() {
  return (
    <Svg width={150} height={50} viewBox="0 0 150 50" title="">
      <Path d="M12 40 C 4 40, 4 26, 18 26 C 20 12, 44 10, 52 22 C 60 8, 92 10, 94 26 C 110 22, 128 30, 122 40 Z" style={cloud} />
    </Svg>
  );
}

export function CloudSmall() {
  return (
    <Svg width={110} height={40} viewBox="0 0 110 40" title="">
      <Path d="M10 32 C 2 32, 4 20, 16 21 C 20 8, 44 8, 48 20 C 58 10, 84 12, 84 24 C 98 22, 106 32, 96 33 Z" style={cloud} />
    </Svg>
  );
}

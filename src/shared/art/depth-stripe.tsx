import { Rect, Svg } from "@hyper-elements/react";
import { BANDS } from "@/shared/data/zones";
import { depthToY, SEA_HEIGHT } from "@/shared/lib/depth-scale";

/**
 * The whole sea squeezed into one stripe: the same band list and scale as
 * the page, so the certificate and share card always match it.
 */
export function DepthStripe({ width, height }: { width: number; height: number }) {
  const k = height / SEA_HEIGHT;
  return (
    <Svg width={width} height={height} title="The ocean's colour, from the surface to 10,935 m">
      {BANDS.map((band) => {
        const y = depthToY(band.from) * k;
        return <Rect key={band.from} x={0} y={y} width={width} height={depthToY(band.to) * k - y + 1} style={{ fill: band.color }} />;
      })}
    </Svg>
  );
}

import { Rect, Svg } from "@hyper-elements/react";
import { bandRects } from "@/shared/lib/sea";

/**
 * The whole sea squeezed into one stripe: the same bands and scale as
 * the page, so the certificate and share card always match it.
 */
export function DepthStripe({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height} title="The ocean's colour, from the surface to 10,935 m">
      {bandRects(height, { overlap: 1 }).map(({ band, y, height: h }) => (
        <Rect key={band.from} x={0} y={y} width={width} height={h} style={{ fill: band.color }} />
      ))}
    </Svg>
  );
}

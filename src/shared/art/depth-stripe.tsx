import { Polygon, Rect, Svg } from "@hyper-elements/react";
import { bandRects, depthToY, SEA_HEIGHT } from "@/shared/lib/sea";
import { colors } from "@/shared/theme/tokens";

/**
 * The whole sea squeezed into one stripe: the same bands and scale as
 * the page, so the certificate and share card always match it. Give it a
 * `depth` to mark how far a visitor got.
 */
export function DepthStripe({ width, height, depth }: { width: number; height: number; depth?: number }) {
  const markY = depth === undefined ? undefined : Math.min(height - 3, Math.round((depthToY(depth) * height) / SEA_HEIGHT));
  return (
    <Svg width={width} height={height} title="The ocean's colour, from the surface to 10,935 m">
      {bandRects(height, { overlap: 1 }).map(({ band, y, height: h }) => (
        <Rect key={band.from} x={0} y={y} width={width} height={h} style={{ fill: band.color }} />
      ))}
      {markY !== undefined && (
        <>
          <Rect x={0} y={markY} width={width} height={3} style={{ fill: colors.glow }} />
          <Polygon points={`${width},${markY - 9} ${width - 14},${markY + 1.5} ${width},${markY + 12}`} style={{ fill: colors.glow }} />
        </>
      )}
    </Svg>
  );
}

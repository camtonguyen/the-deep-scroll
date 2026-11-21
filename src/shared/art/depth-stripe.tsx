import { Polygon, Rect, Svg } from "@hyper-elements/react";
import { BANDS } from "@/shared/data/zones";
import { bandRects, depthToY, SEA_HEIGHT } from "@/shared/lib/sea";
import { colors } from "@/shared/theme/tokens";

/**
 * The whole sea squeezed into one stripe: the same bands and scale as
 * the page, so the certificate and share card always match it. Give it a
 * `depth` to mark how far a visitor got. `equal` gives every band the same
 * height (the share card: the dark bands stay readable) instead of the page's scale.
 */
export function DepthStripe({ width, height, depth, equal = false }: { width: number; height: number; depth?: number; equal?: boolean }) {
  const step = height / BANDS.length;
  const rects = equal ? BANDS.map((band, i) => ({ band, y: i * step, height: step + 1 })) : bandRects(height, { overlap: 1 });
  const at = (metres: number) => {
    if (!equal) return (depthToY(metres) * height) / SEA_HEIGHT;
    const i = Math.max(0, BANDS.filter((band) => band.from <= metres).length - 1);
    return (i + Math.min(1, (metres - BANDS[i].from) / (BANDS[i].to - BANDS[i].from))) * step;
  };
  const markY = depth === undefined ? undefined : Math.min(height - 3, Math.round(at(depth)));
  return (
    <Svg width={width} height={height} title="The ocean's colour, from the surface to 10,935 m">
      {rects.map(({ band, y, height: h }) => (
        <Rect key={band.from} x={0} y={y} width={width} height={h} style={{ fill: band.color }} />
      ))}
      {equal && <Rect x={width - 3} y={0} width={3} height={height} style={{ fill: colors.white }} />}
      {markY !== undefined && (
        <>
          <Rect x={0} y={markY} width={width} height={3} style={{ fill: colors.glow }} />
          <Polygon points={`${width},${markY - 9} ${width - 14},${markY + 1.5} ${width},${markY + 12}`} style={{ fill: colors.glow }} />
        </>
      )}
    </Svg>
  );
}

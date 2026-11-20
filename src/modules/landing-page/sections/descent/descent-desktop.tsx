import { Column, Layer, Section } from "@hyper-elements/react";
import { bandRects, SEA_HEIGHT } from "@/shared/lib/sea";
import { colors, CONTENT_WIDTH } from "@/shared/theme/tokens";
import { Positioned } from "@/shared/ui/positioned";
import { DepthRuler } from "./depth-ruler";
import type { PlacedItem } from "./place-items";

/** Full-bleed colour bands with hard edges (no gradients), surface to seafloor. */
function Bands() {
  return (
    <Column>
      {bandRects().map(({ band, height }) => (
        <Column key={band.from} style={{ height, backgroundColor: band.color }} />
      ))}
    </Column>
  );
}

/**
 * Desktop: the page is the sea, to scale. One Layer stacks
 *   1. the colour bands, full window width;
 *   2. a centred CONTENT_WIDTH layer with the ruler and every item at its depth.
 * Because it's one Layer, nothing is clipped at a band's edge.
 */
export function DescentDesktop({ items }: { items: PlacedItem[] }) {
  return (
    <Section id="dive" hidden={{ mobile: true }} style={{ backgroundColor: colors.abyss, padding: 0 }}>
      <Layer style={{ height: SEA_HEIGHT }}>
        <Bands />
        <Column style={{ alignItems: "center", overflow: "hidden" }}>
          <Layer style={{ width: "100%", maxWidth: CONTENT_WIDTH, height: SEA_HEIGHT }}>
            <DepthRuler />
            {items
              .filter((item) => !item.bleed)
              .map((item) => (
                <Positioned key={item.key} top={item.y} left={item.left}>
                  {item.node}
                </Positioned>
              ))}
          </Layer>
        </Column>
        {items
          .filter((item) => item.bleed)
          .map((item) => (
            <Column key={item.key} style={{ alignItems: "center", overflow: "hidden", padding: { top: Math.round(item.y) } }}>
              {item.node}
            </Column>
          ))}
      </Layer>
    </Section>
  );
}

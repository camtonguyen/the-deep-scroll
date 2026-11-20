import { Fragment } from "react";
import { Section } from "@hyper-elements/react";
import { BANDS } from "@/shared/data/zones";
import type { PlacedItem } from "./place-items";

/** Right-hand room, px, so the fixed diver (see dive-computer) never covers the text. */
const DIVER_GUTTER = 56;

/**
 * Phones: no room for a to-scale sea, so each colour band is a Section
 * and its items stack in depth order.
 */
export function DescentMobile({ items }: { items: PlacedItem[] }) {
  const forPhone = items.filter((item) => !item.desktopOnly);

  return (
    <>
      {BANDS.map((band) => {
        const inBand = forPhone.filter((item) => item.depth >= band.from && item.depth < band.to);
        if (inBand.length === 0) return null;
        return (
          <Section
            key={band.from}
            id={band.from === 0 ? "dive-mobile" : undefined}
            hidden={{ desktop: true }}
            style={{ backgroundColor: band.color, padding: [40, DIVER_GUTTER, 40, 20], gap: 32 }}
          >
            {inBand.map((item) => (
              <Fragment key={item.key}>{item.phoneNode ?? item.node}</Fragment>
            ))}
          </Section>
        );
      })}
    </>
  );
}

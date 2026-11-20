import { Heading } from "@hyper-elements/react";
import type { ReactNode } from "react";
import { ART, type ArtPlacement, BurjKhalifa } from "@/shared/art";
import { STOPS } from "@/shared/data/stops";
import { inkAt, SCALE_NOTES, ZONES } from "@/shared/data/zones";
import { depthToY } from "@/shared/lib/sea";
import { formatDepth } from "@/shared/lib/format";
import { colors } from "@/shared/theme/tokens";
import { Fact } from "@/shared/ui/fact";
import { MonoLabel } from "@/shared/ui/mono-label";

/** Something drawn at a y position on the sea (px from the surface). */
export interface PlacedItem {
  key: string;
  /** Real depth, for ordering and colour. */
  depth: number;
  /** Position on the desktop page, px from the surface. */
  y: number;
  /** Left edge on the desktop page, px within the content width. */
  left: number;
  node: ReactNode;
  /** Shown on desktop only (e.g. ruler labels, which phones don't have room for). */
  desktopOnly?: boolean;
  /** Drawn across the whole window rather than inside the content width. */
  bleed?: boolean;
}

export const COLUMNS = {
  left: 180,
  right: 700,
  scaleNote: 960,
  /** The first zone title sits top-right, clear of the surface stops. */
  surfaceZone: 560,
  /** The Burj Khalifa hangs from the surface at the right edge. */
  burj: 1128,
} as const;

/** Every item on the way down, built from the data files, sorted by depth. */
export function placeItems(): PlacedItem[] {
  const items: PlacedItem[] = [];

  for (const zone of ZONES) {
    const y = depthToY(zone.depth);
    items.push({
      key: `zone-${zone.id}`,
      depth: zone.depth,
      y: y + 16,
      left: zone.depth === 0 ? COLUMNS.surfaceZone : COLUMNS.left,
      node: (
        <Heading
          level={2}
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1,
            textTransform: "uppercase",
            color: inkAt(zone.depth),
            mobile: { fontSize: 40 },
          }}
        >
          {zone.name}
        </Heading>
      ),
    });
    if (zone.note) {
      items.push({
        key: `zone-note-${zone.id}`,
        depth: zone.depth,
        y: y + 96,
        left: COLUMNS.left,
        node: (
          <Fact
            label={`${formatDepth(zone.depth)} · ${zone.name.toUpperCase()} BEGINS`}
            body={zone.note}
            color={inkAt(zone.depth)}
            width={460}
          />
        ),
      });
    }
  }

  for (const note of SCALE_NOTES) {
    items.push({
      key: `scale-${note.depth}`,
      depth: note.depth,
      y: depthToY(note.depth) + 10,
      left: COLUMNS.scaleNote,
      desktopOnly: true,
      node: (
        <MonoLabel color={colors.cyan} size={12}>
          {note.text}
        </MonoLabel>
      ),
    });
  }

  for (const stop of STOPS) {
    const y = depthToY(stop.depth) + (stop.nudge ?? 0);
    for (const id of stop.art === undefined ? [] : [stop.art].flat()) {
      const { Component, x, dy, desktopOnly, bleed }: ArtPlacement = ART[id];
      items.push({ key: `${stop.id}-${id}`, depth: stop.depth, y: y + dy, left: x, desktopOnly, bleed, node: <Component /> });
    }
    items.push({
      key: stop.id,
      depth: stop.depth,
      y,
      left: stop.x ?? (stop.side === "left" ? COLUMNS.left : COLUMNS.right),
      node: <Fact {...stop} color={inkAt(stop.depth)} />,
    });
  }

  items.push({ key: "burj-khalifa-art", depth: 0, y: 0, left: COLUMNS.burj, desktopOnly: true, node: <BurjKhalifa /> });

  return items.sort((a, b) => a.depth - b.depth || a.y - b.y);
}

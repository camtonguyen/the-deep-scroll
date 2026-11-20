import { Column, Row } from "@hyper-elements/react";
import type { Swatch } from "@/shared/data/stops";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "./mono-label";

const chip = { width: 58, height: 26, border: `2px solid ${colors.navy}` } as const;

/** What a colour looks like as light is lost: true colour above, as seen at depth below. */
export function Swatches({ swatches }: { swatches: readonly Swatch[] }) {
  return (
    <Row style={{ gap: 10 }} stackOnMobile={false}>
      {swatches.map((swatch) => (
        <Column key={swatch.label} style={{ flex: "none", gap: 0 }}>
          <Column style={{ ...chip, backgroundColor: swatch.truth }} />
          <Column style={{ ...chip, backgroundColor: swatch.seen }} />
          <MonoLabel size={11}>{swatch.label}</MonoLabel>
        </Column>
      ))}
    </Row>
  );
}

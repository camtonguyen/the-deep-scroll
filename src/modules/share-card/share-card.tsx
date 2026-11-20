import { Canvas, Column, Heading, Row } from "@hyper-elements/react";
import { Anglerfish } from "@/shared/art/anglerfish";
import { DepthStripe } from "@/shared/art/depth-stripe";
import { SITE } from "@/shared/data/site";
import { theme } from "@/shared/theme/theme";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";

/** 1200×630 social card, written as PNG by scripts/render.tsx. */
export default function ShareCard() {
  return (
    <Canvas theme={theme} width={1200} height={630} style={{ backgroundColor: colors.abyss, color: colors.aqua }}>
      <Row style={{ height: 630 }}>
        <DepthStripe width={120} height={630} />
        <Column style={{ height: 630, padding: [72, 72], gap: 28, justifyContent: "space-between" }}>
          <MonoLabel color={colors.cyan} size={18}>
            10,935 m · CHALLENGER DEEP
          </MonoLabel>
          <Heading level={1} style={{ fontSize: 76, lineHeight: 0.98, fontWeight: 800 }}>
            I scrolled 10,935 m to the bottom of the ocean.
          </Heading>
          <Row style={{ justifyContent: "space-between", alignItems: "end" }}>
            <MonoLabel size={18}>{SITE.name}</MonoLabel>
            <Anglerfish />
          </Row>
        </Column>
      </Row>
    </Canvas>
  );
}

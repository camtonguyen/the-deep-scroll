import { Canvas, Column, Heading, Row, Text } from "@hyper-elements/react";
import { Anglerfish } from "@/shared/art/anglerfish";
import { DepthStripe } from "@/shared/art/depth-stripe";
import { SAMPLE_DIVER, SITE, type Visitor } from "@/shared/data/site";
import { zoneAt } from "@/shared/data/zones";
import { formatDepth } from "@/shared/lib/format";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { fitFontSize, visitorDepth } from "@/shared/lib/visitor";
import { theme } from "@/shared/theme/theme";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";

/** 1200×630 social card for one visitor, written as PNG by scripts/render.tsx. */
export default function ShareCard({ name = SAMPLE_DIVER.name, depth = SAMPLE_DIVER.depth }: Partial<Visitor>) {
  const metres = visitorDepth(depth);
  const bottom = metres >= MAX_DEPTH;
  return (
    <Canvas theme={theme} width={1200} height={630} style={{ backgroundColor: colors.abyss, color: colors.aqua }}>
      <Row style={{ height: 630 }}>
        <DepthStripe width={120} height={630} depth={metres} />
        <Column style={{ height: 630, padding: [72, 72], gap: 28, justifyContent: "space-between" }}>
          <MonoLabel color={colors.cyan} size={18}>
            {`${formatDepth(metres)} · ${bottom ? "CHALLENGER DEEP" : zoneAt(metres).name.toUpperCase()}`}
          </MonoLabel>
          <Column style={{ gap: 20 }}>
            <Heading level={1} style={{ fontSize: 76, lineHeight: 0.98, fontWeight: 700 }}>
              {bottom
                ? `I scrolled ${formatDepth(metres)} to the bottom of the ocean.`
                : `I scrolled ${formatDepth(metres)} down the ocean.`}
            </Heading>
            <Text style={{ fontSize: fitFontSize(name, 30, 20, 28), fontWeight: 700 }}>{name}</Text>
          </Column>
          <Row style={{ justifyContent: "space-between", alignItems: "end" }}>
            <MonoLabel size={18}>{SITE.name}</MonoLabel>
            <Anglerfish />
          </Row>
        </Column>
      </Row>
    </Canvas>
  );
}

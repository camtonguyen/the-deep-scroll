import { Canvas, Column, Heading, Layer, Row, Span, Text } from "@hyper-elements/react";
import { Anglerfish } from "@/shared/art/anglerfish";
import { DepthStripe } from "@/shared/art/depth-stripe";
import { Logo } from "@/shared/art/logo";
import { SITE, type Visitor } from "@/shared/data/site";
import { formatDepth, formatNumber, pressureAtm } from "@/shared/lib/format";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { fitFontSize, visitorDepth } from "@/shared/lib/visitor";
import { theme } from "@/shared/theme/theme";
import { colors, fonts } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";
import { Positioned } from "@/shared/ui/positioned";

const STRIPE = 150;

/** "≈1,000+ atm" at the bottom; "≈26 atm" above it. */
function pressure(metres: number): string {
  const atm = Math.round(pressureAtm(metres));
  return `≈${atm >= 1000 ? "1,000+" : formatNumber(atm)} atm`;
}

/** 1200×630 social card, written as PNG by scripts/render.tsx and /api/share-card. A `name` adds a line under the headline; without one the card is anonymous. */
export default function ShareCard({ name = "", depth = MAX_DEPTH }: Partial<Visitor>) {
  const metres = visitorDepth(depth);
  const bottom = metres >= MAX_DEPTH;
  return (
    <Canvas theme={theme} width={1200} height={630} style={{ backgroundColor: colors.abyss, color: colors.aqua }}>
      <Layer style={{ height: 630 }}>
        <Row style={{ height: 630 }}>
          <DepthStripe width={STRIPE} height={630} depth={bottom ? undefined : metres} equal />
          <Column style={{ height: 630, padding: [64, 72], justifyContent: "space-between" }}>
            <Column style={{ gap: 52 }}>
              <Row style={{ alignItems: "center", gap: 12 }}>
                <Logo size={30} ring={colors.aqua} />
                <Text style={{ fontSize: 22, fontWeight: 700 }}>{SITE.name}</Text>
              </Row>
              <Column style={{ gap: 20 }}>
                <Heading level={1} style={{ maxWidth: 680, fontSize: 76, lineHeight: 1, fontWeight: 700, letterSpacing: -2 }}>
                  {"I scrolled\u00a0"}
                  <Span style={{ color: colors.cyan }}>{formatDepth(metres)}</Span>
                  {bottom ? " to the bottom of the ocean." : " down the ocean."}
                </Heading>
                {name && <Text style={{ fontSize: fitFontSize(name, 30, 20, 28), fontWeight: 700 }}>{name}</Text>}
              </Column>
            </Column>
            <Text style={{ fontFamily: fonts.mono, fontSize: 15, letterSpacing: 1, textTransform: "uppercase" }}>
              {`The Deep Scroll · Pressure survived ${pressure(metres)}`}
            </Text>
          </Column>
        </Row>
        <Positioned top={16} left={16}>
          <MonoLabel color={colors.navy} size={14}>
            0 m
          </MonoLabel>
        </Positioned>
        <Positioned top={596} left={16}>
          <MonoLabel color={bottom ? colors.cyan : colors.aqua} size={14}>
            {formatDepth(MAX_DEPTH)}
          </MonoLabel>
        </Positioned>
        <Positioned top={325} left={865}>
          <Anglerfish />
        </Positioned>
      </Layer>
    </Canvas>
  );
}

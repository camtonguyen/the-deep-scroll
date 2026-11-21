import { Button, Column, Heading, Row, Section, Span, Text } from "@hyper-elements/react";
import { BOTTOM_FACTS, SITE } from "@/shared/data/site";
import { colors } from "@/shared/theme/tokens";
import { Container } from "@/shared/ui/container";
import { MonoLabel } from "@/shared/ui/mono-label";
import { CertificateDialog } from "./certificate-dialog";
import { Footer } from "./footer";
import { TierCards } from "./tier-cards";

/** 10,935 m: arrival, why it matters, and how to support the next dive. */
export function TheBottom() {
  return (
    <>
      <Section id="the-bottom" style={{ backgroundColor: colors.abyss, color: colors.aqua, padding: [110, 24, 64], alignItems: "center" }}>
        <Container style={{ gap: 56 }}>
          <Column style={{ gap: 24 }}>
            <MonoLabel color={colors.cyan} size={14}>
              10,935 m · CHALLENGER DEEP · MARIANA TRENCH · ≈1,070 atm · ~2.5°C
            </MonoLabel>
            <Heading level={2} style={{ fontSize: 112, lineHeight: 0.94, fontWeight: 700, letterSpacing: -3.5, mobile: { fontSize: 54 } }}>
              You made it. <Span style={{ color: colors.cyan }}>10,935</Span> metres.
            </Heading>
            <Text style={{ fontSize: 26, lineHeight: 1.35 }}>
              Only a few dozen people have ever been here. More people have been to space.
            </Text>
          </Column>

          <Row style={{ gap: 20, alignItems: "stretch" }}>
            {BOTTOM_FACTS.map((fact) => (
              <Column key={fact.value} style={{ border: `2px solid ${colors.aqua}`, borderRadius: 14, padding: 22, gap: 4 }}>
                <MonoLabel color={colors.cyan} size={34}>
                  {fact.value}
                </MonoLabel>
                <MonoLabel size={14}>{fact.text}</MonoLabel>
              </Column>
            ))}
          </Row>

          <Row style={{ alignItems: "center", gap: 28 }}>
            {/* the yellow button's glow, as in the welcome email: one flat rounded box, 10 px around it; its left edge lines up with the cards */}
            <Column style={{ flex: "none", backgroundColor: colors.glowHaloInner, borderRadius: 22, padding: 10 }}>
              <Button
                href="#tiers"
                attrs={{ class: "btn" }}
                style={{
                  backgroundColor: colors.glow,
                  color: colors.abyss,
                  fontSize: 23,
                  fontWeight: 700,
                  borderRadius: 14,
                  padding: [18, 36],
                }}
              >
                {SITE.cta.text}
              </Button>
            </Column>
            <Column style={{ flex: "none" }}>
              <CertificateDialog />
            </Column>
          </Row>

          <TierCards />

          <Footer />
        </Container>
      </Section>
      <Section style={{ backgroundColor: colors.abyss, color: colors.aqua, padding: [28, 24], alignItems: "center", textAlign: "center" }}>
        <MonoLabel>{SITE.copyright}</MonoLabel>
      </Section>
    </>
  );
}

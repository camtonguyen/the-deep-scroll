import { Button, Column, Grid, Heading, Layer, Row, Section, Span, Text } from "@hyper-elements/react";
import { Logo } from "@/shared/art";
import { BOTTOM_FACTS, SITE, TIERS } from "@/shared/data/site";
import { colors, fonts } from "@/shared/theme/tokens";
import { Container } from "@/shared/ui/container";
import { MonoLabel } from "@/shared/ui/mono-label";
import { CertificateDialog } from "./certificate-dialog";

const card = { backgroundColor: colors.deepCard, borderRadius: 16, padding: 26, gap: 10 } as const;

/** 10,935 m: arrival, why it matters, and how to support the next dive. */
export function TheBottom() {
  return (
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
          {/* the yellow button's glow: two flat, rounded layers behind it (no real shadows) */}
          <Layer style={{ flex: "none" }}>
            <Column style={{ backgroundColor: colors.glowHalo, borderRadius: 30 }} />
            <Column style={{ padding: 10 }}>
              <Column style={{ backgroundColor: colors.glowHaloInner, borderRadius: 22 }} />
            </Column>
            <Column style={{ padding: 24 }}>
              <Button
                href="#tiers"
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
          </Layer>
          <Column style={{ flex: "none" }}>
            <CertificateDialog />
          </Column>
        </Row>

        <Row id="tiers" style={{ gap: 20, alignItems: "stretch" }}>
          {TIERS.map((tier) => (
            <Column
              key={tier.name}
              style={{ ...card, justifyContent: "space-between", ...(tier.featured && { border: `3px solid ${colors.glow}` }) }}
            >
              <Column style={{ gap: 10 }}>
                <MonoLabel color={tier.featured ? colors.glow : colors.cyan}>{tier.depthLabel}</MonoLabel>
                <Heading level={3} style={{ fontSize: 28, fontWeight: 700 }}>
                  {tier.name}
                </Heading>
                <Text style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>{tier.price}</Text>
                <Text style={{ fontSize: 17, lineHeight: 1.4 }}>{tier.perk}</Text>
              </Column>
              <Button
                href="#"
                style={{
                  backgroundColor: tier.featured ? colors.glow : colors.deepCard,
                  color: tier.featured ? colors.abyss : colors.aqua,
                  border: `2px solid ${colors.aqua}`,
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: [13, 24],
                }}
              >
                {`Give ${tier.price}`}
              </Button>
            </Column>
          ))}
        </Row>

        <Row style={{ gap: 32, justifyContent: "space-between", alignItems: "start" }}>
          <Column style={{ gap: 12 }}>
            <Row style={{ alignItems: "center", gap: 10 }} stackOnMobile={false}>
              <Logo size={30} ring={colors.aqua} />
              <Text style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                {SITE.name}
              </Text>
            </Row>
            <MonoLabel>{SITE.footer}</MonoLabel>
            <MonoLabel>Scale: 1 px = 1 m, mostly. The ruler shows where we cheated.</MonoLabel>
            <MonoLabel>{SITE.copyright}</MonoLabel>
          </Column>
          <Grid columns={2} stackOnMobile={false} style={{ gap: 12 }}>
            {[...SITE.links, SITE.backToSurface].map((link) => (
              <Button
                key={link.text}
                href={link.href}
                attrs={{ class: "flink" }} /* underline on hover: see certificate-dialog styles */
                style={{
                  backgroundColor: "transparent",
                  color: colors.aqua,
                  fontSize: 16,
                  textAlign: "left",
                  textDecoration: "none",
                  padding: [13, 0],
                }}
              >
                {link.text}
              </Button>
            ))}
          </Grid>
        </Row>
      </Container>
    </Section>
  );
}

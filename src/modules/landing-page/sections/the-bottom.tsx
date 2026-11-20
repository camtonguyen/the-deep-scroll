import { Button, Column, Grid, Heading, Link, Row, Section, Span, Text } from "@hyper-elements/react";
import { BOTTOM_FACTS, SITE, TIERS } from "@/shared/data/site";
import { colors } from "@/shared/theme/tokens";
import { Container } from "@/shared/ui/container";
import { MonoLabel } from "@/shared/ui/mono-label";

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

        <Button
          href="#tiers"
          style={{ backgroundColor: colors.glow, color: colors.abyss, fontSize: 23, fontWeight: 700, borderRadius: 14, padding: [20, 36] }}
        >
          {SITE.cta.text}
        </Button>

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
                }}
              >
                {`Give ${tier.price}`}
              </Button>
            </Column>
          ))}
        </Row>

        <Row style={{ gap: 32, justifyContent: "space-between", alignItems: "start" }}>
          <Column style={{ gap: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 700 }}>{SITE.name}</Text>
            <MonoLabel>{SITE.footer}</MonoLabel>
            <MonoLabel>Scale: 1 px = 1 m, mostly. The ruler shows where we cheated.</MonoLabel>
          </Column>
          <Grid columns={2} stackOnMobile={false} style={{ gap: 12 }}>
            {[...SITE.links, SITE.backToSurface].map((link) => (
              <Column key={link.text} style={{ padding: [10, 0] }}>
                <Link href={link.href} style={{ color: colors.aqua, fontSize: 16 }}>
                  {link.text}
                </Link>
              </Column>
            ))}
          </Grid>
        </Row>
      </Container>
    </Section>
  );
}

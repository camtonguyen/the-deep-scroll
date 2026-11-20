import { Button, Column, Grid, Heading, Link, Section, Span, Text } from "@hyper-elements/react";
import { BOTTOM_FACTS, SITE, TIERS } from "@/shared/data/site";
import { colors } from "@/shared/theme/tokens";
import { Container } from "@/shared/ui/container";
import { MonoLabel } from "@/shared/ui/mono-label";

const card = { backgroundColor: colors.deepCard, borderRadius: 16, padding: 26, gap: 10 } as const;

/** 10,935 m: arrival, why it matters, and how to support the next dive. */
export function TheBottom() {
  return (
    <Section style={{ backgroundColor: colors.abyss, color: colors.aqua, padding: [110, 24, 64], alignItems: "center" }}>
      <Container style={{ gap: 56 }}>
        <Column style={{ gap: 24 }}>
          <MonoLabel color={colors.cyan} size={14}>
            10,935 m · CHALLENGER DEEP · MARIANA TRENCH · ≈1,070 atm · ~2.5°C
          </MonoLabel>
          <Heading level={2} style={{ fontSize: 112, lineHeight: 0.94, fontWeight: 800, letterSpacing: -3.5, mobile: { fontSize: 54 } }}>
            You made it. <Span style={{ color: colors.cyan }}>10,935</Span> metres.
          </Heading>
          <Text style={{ fontSize: 26, lineHeight: 1.35 }}>
            Only a few dozen people have ever been here. More people have been to space.
          </Text>
        </Column>

        <Grid columns={3} style={{ gap: 20 }}>
          {BOTTOM_FACTS.map((fact) => (
            <Column key={fact.value} style={{ border: `2px solid ${colors.aqua}`, borderRadius: 14, padding: 22, gap: 4 }}>
              <MonoLabel color={colors.cyan} size={34}>
                {fact.value}
              </MonoLabel>
              <MonoLabel size={14}>{fact.text}</MonoLabel>
            </Column>
          ))}
        </Grid>

        <Button
          href="#tiers"
          style={{ backgroundColor: colors.glow, color: colors.abyss, fontSize: 23, fontWeight: 800, borderRadius: 14, padding: [20, 36] }}
        >
          {SITE.cta.text}
        </Button>

        <Grid columns={3} style={{ gap: 20 }}>
          {TIERS.map((tier) => (
            <Column key={tier.name} style={tier.featured ? { ...card, border: `3px solid ${colors.glow}` } : card}>
              <MonoLabel color={tier.featured ? colors.glow : colors.cyan}>{tier.depthLabel}</MonoLabel>
              <Heading level={3} style={{ fontSize: 28, fontWeight: 800 }}>
                {tier.name}
              </Heading>
              <Text style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{tier.price}</Text>
              <Text style={{ fontSize: 17, lineHeight: 1.4 }}>{tier.perk}</Text>
              <Button
                href="#"
                style={{
                  backgroundColor: tier.featured ? colors.glow : colors.deepCard,
                  color: tier.featured ? colors.abyss : colors.aqua,
                  border: `2px solid ${colors.aqua}`,
                  borderRadius: 12,
                  fontWeight: 800,
                }}
              >
                {`Give ${tier.price}`}
              </Button>
            </Column>
          ))}
        </Grid>

        <Column style={{ gap: 8 }}>
          <MonoLabel>{SITE.footer}</MonoLabel>
          <MonoLabel>Scale: 1 px = 1 m, mostly. The ruler shows where we cheated.</MonoLabel>
          <Link href="#top" style={{ color: colors.aqua }}>
            ↑ Back to the surface (it's a long swim)
          </Link>
        </Column>
      </Container>
    </Section>
  );
}

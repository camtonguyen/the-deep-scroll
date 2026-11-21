import { Button, Column, Heading, Row, Text } from "@hyper-elements/react";
import { TIERS } from "@/shared/data/site";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";

const card = { backgroundColor: colors.deepCard, borderRadius: 16, padding: 26, gap: 10 } as const;

/** The three ways to give. The last (featured) one is yellow; hover lives in shared/ui/hover.ts (#tiers). */
export function TierCards() {
  return (
    <Row id="tiers" style={{ gap: 20, alignItems: "stretch" }}>
      {TIERS.map((tier) => (
        <Column
          key={tier.name}
          style={{
            ...card,
            justifyContent: "space-between",
            ...(tier.featured && { border: `3px solid ${colors.glow}`, padding: 23 }),
          }}
        >
          <Column style={{ gap: 10 }}>
            <MonoLabel color={tier.featured ? colors.glow : colors.cyan} size={12}>
              {tier.depthLabel}
            </MonoLabel>
            <Heading level={3} style={{ fontSize: 28, fontWeight: 700 }}>
              {tier.name}
            </Heading>
            <Text style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>{tier.price}</Text>
            <Text style={{ fontSize: 17, lineHeight: 1.4 }}>{tier.perk}</Text>
          </Column>
          <Button
            href="#"
            attrs={{ class: "btn" }}
            style={{
              backgroundColor: tier.featured ? colors.glow : colors.deepCard,
              color: tier.featured ? colors.abyss : colors.aqua,
              // design: 48 px of content; the outlined ones add their 2 px border, the yellow one has none
              border: tier.featured ? undefined : `2px solid ${colors.aqua}`,
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 16,
              lineHeight: "20px",
              width: "100%",
              padding: [14, 24],
            }}
          >
            {`Give ${tier.price}`}
          </Button>
        </Column>
      ))}
    </Row>
  );
}

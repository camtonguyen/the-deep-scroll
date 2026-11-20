import { Column, Heading, Link, Row, Section, Text } from "@hyper-elements/react";
import { SITE } from "@/shared/data/site";
import { colors } from "@/shared/theme/tokens";
import { Container } from "@/shared/ui/container";
import { MonoLabel } from "@/shared/ui/mono-label";

/** 0 m: sky, corner logo and readout (no nav) and the question. TODO: clouds, boat and wave line from the design. */
export function Surface() {
  return (
    <Section id="top" style={{ backgroundColor: colors.sky, color: colors.navy, padding: [28, 24, 120], alignItems: "center" }}>
      <Container style={{ gap: 96 }}>
        <Row style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }} stackOnMobile={false}>
          <Text style={{ fontSize: 21, fontWeight: 700 }}>{SITE.name}</Text>
          <MonoLabel size={20}>{SITE.readout}</MonoLabel>
        </Row>

        <Column style={{ gap: 22, maxWidth: 880 }}>
          <MonoLabel size={14}>ALTITUDE 0 m · 1 atm · 15°C-ish · LIGHT 100%</MonoLabel>
          <Heading level={1} style={{ fontSize: 104, lineHeight: 0.94, fontWeight: 700, letterSpacing: -3.5, mobile: { fontSize: 54 } }}>
            How deep does the ocean go?
          </Heading>
          <Text style={{ fontSize: 26, lineHeight: 1.35 }}>Scroll down to find out. It takes a while.</Text>
          <Link href="#dive" hidden={{ mobile: true }} style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>
            ↓ Start diving
          </Link>
          <Link href="#dive-mobile" hidden={{ desktop: true }} style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>
            ↓ Start diving
          </Link>
        </Column>
      </Container>
    </Section>
  );
}

import { Button, Column, Grid, Row, Text } from "@hyper-elements/react";
import { Logo } from "@/shared/art";
import { SITE } from "@/shared/data/site";
import { colors, fonts } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";
import { ShareLinks } from "./share-links";

/** Logo, share row and the footer links. */
export function Footer() {
  return (
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
        <ShareLinks />
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
  );
}

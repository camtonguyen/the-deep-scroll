import { Button, Column, Email, Heading, Image, LineBreak, Link, Row, Section, Span, Text } from "@hyper-elements/react";
import { MAIL, SAMPLE_DIVER, SITE, type Visitor } from "@/shared/data/site";
import { formatNumber } from "@/shared/lib/format";
import { visitorDepth } from "@/shared/lib/visitor";
import { webFonts } from "@/shared/theme/fonts";
import { theme } from "@/shared/theme/theme";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";
import { EMAIL_ART, type EmailArtId } from "./email-art";

/** "Ada Marlowe" → "Ada". */
export const firstName = (name: string) => name.split(" ")[0];

/** An Email can't hold Svg, so each picture is a PNG from /api/email-art, shown at half its size (sharp on phones). */
const art = (id: EmailArtId) => ({
  src: `${SITE.url}/api/email-art?id=${id}`,
  style: { width: EMAIL_ART[id].width, maxWidth: "100%" as const },
});

/** Welcome email for one visitor (600 px), laid out as in the design. */
export default function WelcomeEmail({ depth = SAMPLE_DIVER.depth }: Partial<Visitor>) {
  const metres = visitorDepth(depth);

  return (
    <Email theme={theme} width={600} previewText={MAIL.preheader} fonts={[...webFonts]} style={{ backgroundColor: colors.abyss }}>
      <Section style={{ backgroundColor: colors.sky, color: colors.navy, padding: [12, 32, 0], gap: 0 }}>
        <MonoLabel>{MAIL.preheader}</MonoLabel>
        <Row style={{ padding: [18, 0, 26], gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <Image src={art("logo").src} alt="" style={{ width: 28, flex: "none" }} />
          <Text style={{ fontSize: 18, fontWeight: 700 }}>{SITE.name}</Text>
        </Row>
        <Column style={{ padding: [8, 0, 0], gap: 14 }}>
          <Heading level={1} style={{ fontSize: 52, fontWeight: 700, lineHeight: 0.96, letterSpacing: -1.5, mobile: { fontSize: 40 } }}>
            {MAIL.headline}
          </Heading>
          <Text style={{ fontSize: 18, lineHeight: 1.45 }}>{MAIL.intro(`${formatNumber(metres)} metres`)}</Text>
        </Column>
      </Section>
      <Section style={{ backgroundColor: colors.sky, padding: 0 }}>
        <Image {...art("hero")} alt="A boat with a line dropping through the ocean zones to the bottom" />
      </Section>
      <Section style={{ backgroundColor: colors.abyss, color: colors.aqua, padding: [36, 32, 48], gap: 0 }}>
        <Text style={{ fontSize: 18, lineHeight: 1.55 }}>{MAIL.lede}</Text>
        <Column style={{ padding: [36, 0, 0], gap: 12 }}>
          <MonoLabel color={colors.cyan}>{MAIL.neighboursLabel}</MonoLabel>
          <Row style={{ gap: 12, alignItems: "stretch" }}>
            {MAIL.neighbours.map((fish) => (
              <Column key={fish.id} style={{ backgroundColor: colors.deepCard, borderRadius: 14, padding: 16, gap: 8 }}>
                <Image {...art(fish.id)} alt={fish.name} />
                <Text style={{ fontSize: 18, fontWeight: 700 }}>{fish.name}</Text>
                <MonoLabel>{fish.depth}</MonoLabel>
              </Column>
            ))}
          </Row>
        </Column>
        {/* the yellow button's glow: one flat, rounded box around it (no real shadows) */}
        <Column style={{ padding: [40, 0, 0] }}>
          <Column style={{ backgroundColor: colors.glowHaloInner, borderRadius: 22, padding: 10, width: 346, alignItems: "stretch" }}>
            <Button
              href={SITE.url}
              style={{
                backgroundColor: colors.glow,
                color: colors.abyss,
                fontSize: 19,
                fontWeight: 700,
                borderRadius: 14,
                padding: [18, 28],
              }}
            >
              {MAIL.cta.replaceAll(" ", "\u00a0")}
            </Button>
          </Column>
        </Column>
        <Column style={{ padding: [34, 0, 0] }}>
          <Text style={{ fontSize: 17, lineHeight: 1.55 }}>
            {MAIL.signoff}
            <LineBreak />
            <Span style={{ fontWeight: 700 }}>{SITE.name}</Span>
          </Text>
        </Column>
        <Column style={{ padding: [44, 0, 0] }}>
          <Column style={{ border: { top: { width: 1, style: "solid", color: colors.rule } }, padding: [22, 0, 0], gap: 0 }}>
            <MonoLabel>{SITE.footer}</MonoLabel>
            <MonoLabel>
              {`${MAIL.why} `}
              <Link href={SITE.url} style={{ color: colors.aqua, textDecoration: "underline" }}>
                {MAIL.unsubscribe}
              </Link>{" "}
              {MAIL.unsubscribeNote}
            </MonoLabel>
          </Column>
        </Column>
      </Section>
    </Email>
  );
}

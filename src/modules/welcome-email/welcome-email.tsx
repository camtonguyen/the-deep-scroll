import { Button, Column, Email, Heading, Row, Section, Text } from "@hyper-elements/react";
import { SAMPLE_DIVER, SITE, type Visitor } from "@/shared/data/site";
import { STOPS } from "@/shared/data/stops";
import { formatDepth } from "@/shared/lib/format";
import { visitorDepth } from "@/shared/lib/visitor";
import { webFonts } from "@/shared/theme/fonts";
import { theme } from "@/shared/theme/theme";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";

const FAVOURITES = ["anglerfish", "dumbo", "snailfish"];

/** Welcome email for one visitor (600 px). Emails can't hold Svg, so it's type and colour only. */
export default function WelcomeEmail({ name = SAMPLE_DIVER.name, depth = SAMPLE_DIVER.depth }: Partial<Visitor>) {
  const metres = visitorDepth(depth);
  const favourites = STOPS.filter((stop) => FAVOURITES.includes(stop.id));

  return (
    <Email
      theme={theme}
      width={600}
      previewText={`You scrolled ${formatDepth(metres)}. Welcome aboard.`}
      fonts={[...webFonts]}
      style={{ backgroundColor: colors.abyss }}
    >
      <Section style={{ backgroundColor: colors.sky, padding: [32, 32], gap: 12 }}>
        <MonoLabel>{SITE.name.toUpperCase()}</MonoLabel>
        <Heading level={1} style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>
          {`Welcome aboard, ${name.split(" ")[0]}.`}
        </Heading>
      </Section>
      <Section style={{ backgroundColor: colors.abyss, color: colors.aqua, padding: [32, 32], gap: 20 }}>
        <Text>{`You went ${formatDepth(metres)} down. Here are three of our favourite neighbours from the trip:`}</Text>
        <Row style={{ gap: 12, alignItems: "stretch" }}>
          {favourites.map((stop) => (
            <Column key={stop.id} style={{ backgroundColor: colors.deepCard, borderRadius: 12, padding: 16, gap: 4 }}>
              <MonoLabel color={colors.cyan}>{stop.label}</MonoLabel>
              <Text style={{ fontWeight: 700, fontSize: 18 }}>{stop.title}</Text>
            </Column>
          ))}
        </Row>
        <Button href={SITE.url} style={{ backgroundColor: colors.glow, color: colors.abyss, fontWeight: 700, borderRadius: 12 }}>
          Back to the page
        </Button>
        <MonoLabel>{SITE.footer}</MonoLabel>
      </Section>
    </Email>
  );
}

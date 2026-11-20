import { Button, Column, Email, Heading, Section, Text } from "@hyper-elements/react";
import { SAMPLE_DIVER, SITE } from "@/shared/data/site";
import { STOPS } from "@/shared/data/stops";
import { theme, webFonts } from "@/shared/theme/theme";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";

const FAVOURITES = ["anglerfish", "dumbo", "snailfish"];

/** Welcome email (600 px). Emails can't hold Svg, so it's type and colour only. */
export default function WelcomeEmail({ name = SAMPLE_DIVER.name }: { name?: string }) {
  const favourites = STOPS.filter((stop) => FAVOURITES.includes(stop.id));

  return (
    <Email
      theme={theme}
      width={600}
      previewText="You scrolled 10,935 m. Welcome aboard."
      fonts={[...webFonts]}
      style={{ backgroundColor: colors.abyss }}
    >
      <Section style={{ backgroundColor: colors.sky, padding: [32, 32], gap: 12 }}>
        <MonoLabel>{SITE.name.toUpperCase()}</MonoLabel>
        <Heading level={1} style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>
          {`Welcome aboard, ${name.split(" ")[0]}.`}
        </Heading>
      </Section>
      <Section style={{ backgroundColor: colors.abyss, color: colors.aqua, padding: [32, 32], gap: 20 }}>
        <Text>You went all the way down. Here are three of our favourite neighbours from the trip:</Text>
        {favourites.map((stop) => (
          <Column key={stop.id} style={{ backgroundColor: colors.deepCard, borderRadius: 12, padding: 20, gap: 4 }}>
            <MonoLabel color={colors.cyan}>{stop.label}</MonoLabel>
            <Text style={{ fontWeight: 800, fontSize: 20 }}>{stop.title}</Text>
            <Text>{stop.body}</Text>
          </Column>
        ))}
        <Button href={SITE.url} style={{ backgroundColor: colors.glow, color: colors.abyss, fontWeight: 800, borderRadius: 12 }}>
          Read your first expedition log
        </Button>
        <MonoLabel>{SITE.footer}</MonoLabel>
      </Section>
    </Email>
  );
}

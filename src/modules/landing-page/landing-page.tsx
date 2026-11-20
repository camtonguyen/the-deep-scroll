import { Page } from "@hyper-elements/react";
import { SITE } from "@/shared/data/site";
import { webFonts } from "@/shared/theme/fonts";
import { theme } from "@/shared/theme/theme";
import { PAGE_WIDTH } from "@/shared/theme/tokens";
import { Descent } from "./sections/descent";
import { Surface } from "./sections/surface";
import { TheBottom } from "./sections/the-bottom";

/** The page, top to bottom. Build and preview one section at a time with `?only=<id>`. */
const SECTIONS = {
  surface: Surface,
  descent: Descent,
  "the-bottom": TheBottom,
};

export type SectionId = keyof typeof SECTIONS;

function isSectionId(id: string | undefined): id is SectionId {
  return id !== undefined && id in SECTIONS;
}

/** The landing page: surface → descent (generated from data) → the bottom. */
export default function LandingPage({ only }: { only?: string }) {
  const ids = isSectionId(only) ? [only] : (Object.keys(SECTIONS) as SectionId[]);
  return (
    <Page theme={theme} width={PAGE_WIDTH} title={SITE.title} description={SITE.description} lang="en" fonts={[...webFonts]}>
      {ids.map((id) => {
        const Section = SECTIONS[id];
        return <Section key={id} />;
      })}
    </Page>
  );
}

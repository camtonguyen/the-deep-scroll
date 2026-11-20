import { Column, Layer, Row, Section, Text } from "@hyper-elements/react";
import { Boat, CloudLarge, CloudSmall, WAVE_PERIOD, WaveLine } from "@/shared/art";
import { SITE } from "@/shared/data/site";
import { colors, CONTENT_WIDTH, fonts, PAGE_WIDTH } from "@/shared/theme/tokens";
import { Positioned } from "@/shared/ui/positioned";
import { Title } from "./title";

const HEIGHT = 760;
const BOAT_TOP = HEIGHT - 6 - 150;

/** 0 m: sky, clouds, the title, the boat on the waterline. No nav: the logo and the readout sit in the corners. */
export function Surface() {
  return (
    <Section id="top" style={{ backgroundColor: colors.sky, color: colors.navy, padding: 0, alignItems: "center" }}>
      <Layer style={{ height: HEIGHT }}>
        <Column style={{ alignItems: "center", overflow: "hidden" }}>
          <Layer style={{ width: "100%", maxWidth: CONTENT_WIDTH, height: HEIGHT }}>
            <Column hidden={{ mobile: true }}>
              <Positioned top={150} left={115}>
                <CloudLarge />
              </Positioned>
            </Column>
            <Column hidden={{ mobile: true }}>
              <Positioned top={250} left={980}>
                <CloudSmall />
              </Positioned>
            </Column>

            <Column style={{ padding: [96, 24, 0] }}>
              <Title />
              <Text style={{ fontSize: 24, lineHeight: 1.35, textAlign: "center", padding: [26, 0, 0] }}>
                How deep does the ocean go? You're the diver. It takes a while.
              </Text>
            </Column>

            <Positioned top={BOAT_TOP} left={0}>
              <Boat />
            </Positioned>
            <Positioned top={BOAT_TOP + 109} left={150}>
              <Text style={{ fontFamily: fonts.mono, fontSize: 11, fontWeight: 700, color: colors.navy }}>R/V HADAL</Text>
            </Positioned>
          </Layer>
        </Column>

        <Column style={{ padding: [HEIGHT - 40, 0, 0], overflow: "hidden" }}>
          {/* one swell short of the page, so rolling it by one swell (see dive-computer) leaves no gap */}
          <WaveLine width={PAGE_WIDTH - WAVE_PERIOD} />
        </Column>

        <Row style={{ justifyContent: "space-between", alignItems: "center", padding: [22, 28, 0] }} stackOnMobile={false}>
          <Text
            style={{
              fontFamily: fonts.mono,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              mobile: { fontSize: 16 },
            }}
          >
            {SITE.name}
          </Text>
          <Text style={{ fontFamily: fonts.mono, fontSize: 20, fontWeight: 700, textAlign: "right" }}>{SITE.readout}</Text>
        </Row>
      </Layer>
    </Section>
  );
}

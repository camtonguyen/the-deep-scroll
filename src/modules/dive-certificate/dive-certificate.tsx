import { Circle, Column, Divider, Document, Heading, Layer, Path, Row, Span, Svg, Text } from "@hyper-elements/react";
import { DiveProfile, profileY } from "@/shared/art/dive-profile";
import { Logo } from "@/shared/art/logo";
import { SAMPLE_DIVER, SITE, type Visitor } from "@/shared/data/site";
import { zoneAt } from "@/shared/data/zones";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { formatDepth, formatNumber, pressureAtm } from "@/shared/lib/format";
import { certificateNumber, fitFontSize, visitorDepth } from "@/shared/lib/visitor";
import { theme } from "@/shared/theme/theme";
import { colors, fonts, sea } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";
import { Positioned } from "@/shared/ui/positioned";

const SEAL = 128;
const ink = { stroke: colors.navy, strokeWidth: 2.5 } as const;

/** Concentric rings with the depth in the middle (Svg can't hold text, so the words sit in a Layer over it). */
function Seal({ depth }: { depth: number }) {
  const c = SEAL / 2;
  return (
    <Layer style={{ width: SEAL, height: SEAL }}>
      <Svg width={SEAL} height={SEAL} viewBox={`0 0 ${SEAL} ${SEAL}`} title="Seal of the Hadal Society">
        <Circle cx={c} cy={c} r={62} style={{ fill: sea.shallow, ...ink }} />
        <Circle cx={c} cy={c} r={52} style={{ fill: sea.blue, ...ink, strokeWidth: 2 }} />
        <Circle cx={c} cy={c} r={42} style={{ fill: sea.twilightDeep, ...ink, strokeWidth: 2 }} />
        <Circle cx={c} cy={c} r={32} style={{ fill: colors.navy }} />
        <Circle cx={c} cy={c} r={22} style={{ fill: colors.abyss, stroke: colors.glow, strokeWidth: 2 }} />
      </Svg>
      <Column style={{ height: SEAL, alignItems: "center", justifyContent: "center", gap: 1 }}>
        <Text style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 700, color: colors.glow, textAlign: "center" }}>
          {formatNumber(depth)}
        </Text>
        <Text style={{ fontFamily: fonts.mono, fontSize: 7, color: colors.aqua, textAlign: "center" }}>METRES</Text>
      </Column>
    </Layer>
  );
}

/** The chart, its border and the labels down its right side (0 m, the Titanic, Everest, and where the dive ended). */
function Profile({ depth }: { depth: number }) {
  const bottom = depth >= MAX_DEPTH;
  const labels = [
    { top: 0, text: ["0 m"], show: true },
    { top: 100, text: ["Titanic", "3,800 m"], show: depth >= 3800 },
    { top: 238, text: ["Everest", "8,849 m"], show: depth >= 8849 },
    {
      top: bottom ? 282 : Math.min(282, Math.max(0, Math.round(profileY(depth)) - 14)),
      text: bottom ? ["Bottom", "10,935 m"] : ["You", formatDepth(depth)],
      show: true,
    },
  ];
  return (
    <Column style={{ width: 360, gap: 8 }}>
      <MonoLabel size={12}>DIVE PROFILE · 0 → {formatDepth(MAX_DEPTH)}</MonoLabel>
      <Layer style={{ width: 360, height: 304 }}>
        <Column style={{ width: 254, height: 304, border: `2px solid ${colors.navy}`, overflow: "hidden" }}>
          <DiveProfile depth={depth} />
        </Column>
        {labels
          .filter((l) => l.show)
          .map((l, i, all) => (
            <Positioned key={l.text[0]} top={l.top} left={266}>
              <Column>
                {l.text.map((line) => (
                  <Text
                    key={line}
                    style={{ fontFamily: fonts.mono, fontSize: 12, lineHeight: 1.2, fontWeight: i === all.length - 1 ? 700 : 400 }}
                  >
                    {line}
                  </Text>
                ))}
              </Column>
            </Positioned>
          ))}
      </Layer>
    </Column>
  );
}

/** A4 landscape certificate for one visitor, written as PDF by scripts/render.tsx. */
export default function DiveCertificate({
  name = SAMPLE_DIVER.name,
  depth = SAMPLE_DIVER.depth,
  date = SAMPLE_DIVER.date,
}: Partial<Visitor>) {
  const metres = visitorDepth(depth);
  const bottom = metres >= MAX_DEPTH;
  return (
    <Document
      theme={theme}
      size="A4"
      orientation="landscape"
      margin={0}
      title="Dive certificate"
      style={{ backgroundColor: colors.paper, color: colors.navy }}
    >
      <Column style={{ height: 794, padding: 40 }}>
        <Column style={{ height: 714, border: `3px solid ${colors.navy}`, borderRadius: 6, padding: 8 }}>
          <Column style={{ height: 692, border: `1px solid ${colors.navy}`, padding: [36, 44], justifyContent: "space-between" }}>
            <Column style={{ gap: 30 }}>
              <Row style={{ justifyContent: "space-between", alignItems: "center" }} stackOnMobile={false}>
                <Row style={{ alignItems: "center", gap: 10, flex: "none" }} stackOnMobile={false}>
                  <Logo size={30} />
                  <Text style={{ fontSize: 19, fontWeight: 700 }}>{SITE.name}</Text>
                </Row>
                <Column style={{ flex: "none" }}>
                  <MonoLabel size={13}>CERTIFICATE No. {certificateNumber(name, metres, date)}</MonoLabel>
                </Column>
              </Row>
              <Row style={{ gap: 48, alignItems: "start" }} stackOnMobile={false}>
                <Column style={{ flex: 1, gap: 6 }}>
                  <Heading level={1} style={{ fontSize: 54, lineHeight: 1, fontWeight: 700, letterSpacing: -1.6 }}>
                    Certificate of Descent
                  </Heading>
                  <Column style={{ padding: { top: 24 } }}>
                    <MonoLabel size={14}>THIS CERTIFIES THAT</MonoLabel>
                  </Column>
                  <Text style={{ fontSize: fitFontSize(name, 68, 32, 11), lineHeight: 1.05, fontWeight: 700, letterSpacing: -1.3 }}>
                    {name}
                  </Text>
                  <Divider style={{ borderTop: { width: 2, style: "dashed", color: colors.navy } }} />
                  <Column style={{ padding: { top: 12 }, width: 520 }}>
                    <Text style={{ fontSize: 24, lineHeight: 1.35 }}>
                      {bottom ? (
                        <>
                          scrolled <Span style={{ fontWeight: 700 }}>{formatDepth(metres).replace(" m", " metres")}</Span> to the bottom of
                          the Challenger Deep, past one blue whale, one upside-down Everest and a great deal of nothing.
                        </>
                      ) : (
                        <>
                          scrolled <Span style={{ fontWeight: 700 }}>{formatDepth(metres).replace(" m", " metres")}</Span> down into the{" "}
                          {zoneAt(metres).name.toLowerCase()}, past a great deal of nothing.
                        </>
                      )}
                    </Text>
                  </Column>
                </Column>
                <Profile depth={metres} />
              </Row>
            </Column>

            <Row style={{ justifyContent: "space-between", alignItems: "end", gap: 32 }} stackOnMobile={false}>
              <Column style={{ flex: "none" }}>
                <Seal depth={metres} />
              </Column>
              <Column style={{ flex: 1, maxWidth: 340, gap: 6 }}>
                <Svg width={220} height={48} viewBox="0 0 220 48" title="">
                  <Path
                    d="M6 34 C 20 6, 30 6, 30 30 C 30 40, 40 12, 54 18 C 64 22, 58 38, 70 32 C 86 24, 92 10, 104 26 C 112 36, 124 20, 140 24 C 156 28, 170 34, 212 18"
                    style={{ fill: "transparent", ...ink }}
                  />
                </Svg>
                <Divider style={{ borderTop: { width: 2, style: "solid", color: colors.navy } }} />
                <Text style={{ fontSize: 15 }}>Chief Scientist, {SITE.name}</Text>
              </Column>
              <Column style={{ gap: 4, alignItems: "end", flex: "none" }}>
                <Text style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: 0.8, textAlign: "right" }}>
                  DATE OF DESCENT: {date}
                </Text>
                <Text style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: 0.8, textAlign: "right" }}>
                  PRESSURE SURVIVED: ≈{formatNumber(pressureAtm(metres))} atm
                </Text>
                <Text style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: 0.8, textAlign: "right" }}>
                  SCALE: 1 px = 1 m (mostly)
                </Text>
                <Text style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 0.8, textAlign: "right", padding: { top: 6 } }}>
                  {SITE.footer}
                </Text>
              </Column>
            </Row>
          </Column>
        </Column>
      </Column>
    </Document>
  );
}

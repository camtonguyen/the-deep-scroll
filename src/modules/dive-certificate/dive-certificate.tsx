import { Circle, Column, Divider, Document, Heading, Layer, Row, Svg, Text } from "@hyper-elements/react";
import { DepthStripe } from "@/shared/art/depth-stripe";
import { SAMPLE_DIVER, SITE, type Visitor } from "@/shared/data/site";
import { zoneAt } from "@/shared/data/zones";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { formatDepth, formatNumber, pressureAtm } from "@/shared/lib/format";
import { fitFontSize, visitorDepth } from "@/shared/lib/visitor";
import { theme } from "@/shared/theme/theme";
import { colors, sea } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";

const SEAL = 150;

/** A round seal: concentric rings with the depth in the middle (Svg can't hold text, so the words sit in a Layer over it). */
function Seal({ depth }: { depth: number }) {
  const c = SEAL / 2;
  return (
    <Layer style={{ width: SEAL, height: SEAL }}>
      <Svg width={SEAL} height={SEAL} title="Seal of the Hadal Society">
        <Circle cx={c} cy={c} r={c - 3} style={{ fill: colors.navy }} />
        <Circle cx={c} cy={c} r={c - 12} style={{ fill: "transparent", stroke: colors.glow, strokeWidth: 2 }} />
        <Circle cx={c} cy={c} r={c - 20} style={{ fill: "transparent", stroke: sea.shallow, strokeWidth: 1 }} />
        <Circle cx={c} cy={c} r={c - 30} style={{ fill: sea.dusk }} />
      </Svg>
      <Column style={{ height: SEAL, alignItems: "center", justifyContent: "center", color: colors.white }}>
        <Text style={{ fontFamily: "Roboto Condensed", fontSize: 22, fontWeight: 700, textAlign: "center" }}>{formatNumber(depth)}</Text>
        <Text style={{ fontFamily: "Roboto Condensed", fontSize: 13, letterSpacing: 2, textAlign: "center" }}>METRES</Text>
      </Column>
    </Layer>
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
      style={{ backgroundColor: colors.hull, color: colors.navy }}
    >
      <Row style={{ height: 794 }}>
        <DepthStripe width={90} height={794} depth={metres} />
        <Column style={{ padding: 64, gap: 24, justifyContent: "space-between" }}>
          <Column style={{ gap: 24 }}>
            <MonoLabel>{SITE.name.toUpperCase()} · CERTIFICATE OF DESCENT</MonoLabel>
            <Text style={{ fontSize: 22 }}>This certifies that</Text>
            <Heading level={1} style={{ fontSize: fitFontSize(name, 64, 34), fontWeight: 700, lineHeight: 1.05 }}>
              {name}
            </Heading>
            <Text style={{ fontSize: 22, lineHeight: 1.4 }}>
              {bottom
                ? `scrolled ${formatDepth(metres)} to the bottom of the Challenger Deep, Mariana Trench.`
                : `scrolled ${formatDepth(metres)} down into the ${zoneAt(metres).name.toLowerCase()}.`}
            </Text>
          </Column>
          <Column style={{ gap: 24 }}>
            <Divider />
            <Row style={{ gap: 48, alignItems: "center", justifyContent: "space-between" }}>
              <Column style={{ gap: 10 }}>
                <MonoLabel>DATE · {date}</MonoLabel>
                <MonoLabel>DEPTH · {formatDepth(metres)}</MonoLabel>
                <MonoLabel>PRESSURE SURVIVED · ≈{formatNumber(pressureAtm(metres))} atm</MonoLabel>
              </Column>
              <Seal depth={metres} />
            </Row>
          </Column>
        </Column>
      </Row>
    </Document>
  );
}

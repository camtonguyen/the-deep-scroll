import { Column, Divider, Document, Heading, Row, Text } from "@hyper-elements/react";
import { DepthStripe } from "@/shared/art/depth-stripe";
import { SAMPLE_DIVER, SITE } from "@/shared/data/site";
import { MAX_DEPTH } from "@/shared/lib/depth-scale";
import { formatDepth, formatNumber, pressureAtm } from "@/shared/lib/format";
import { theme } from "@/shared/theme/theme";
import { colors } from "@/shared/theme/tokens";
import { MonoLabel } from "@/shared/ui/mono-label";

interface DiveCertificateProps {
  diver?: { name: string; date: string };
}

/** A4 landscape certificate, written as PDF by scripts/render.tsx. */
export default function DiveCertificate({ diver = SAMPLE_DIVER }: DiveCertificateProps) {
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
        <DepthStripe width={90} height={794} />
        <Column style={{ padding: 64, gap: 24 }}>
          <MonoLabel>{SITE.name.toUpperCase()} · CERTIFICATE OF DESCENT</MonoLabel>
          <Text style={{ fontSize: 22 }}>This certifies that</Text>
          <Heading level={1} style={{ fontSize: 64, fontWeight: 800, lineHeight: 1 }}>
            {diver.name}
          </Heading>
          <Text style={{ fontSize: 22, lineHeight: 1.4 }}>
            scrolled {formatDepth(MAX_DEPTH)} to the bottom of the Challenger Deep, Mariana Trench.
          </Text>
          <Divider />
          <Row style={{ gap: 48 }}>
            <MonoLabel>DATE · {diver.date}</MonoLabel>
            <MonoLabel>PRESSURE SURVIVED · ≈{formatNumber(pressureAtm(MAX_DEPTH))} atm</MonoLabel>
          </Row>
          {/* TODO: depth-profile graphic and the concentric-circle seal from the design. */}
        </Column>
      </Row>
    </Document>
  );
}

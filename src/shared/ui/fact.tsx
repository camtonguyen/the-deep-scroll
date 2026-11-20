import { Column, Heading, Text } from "@hyper-elements/react";
import type { Swatch } from "@/shared/data/stops";
import { MonoLabel } from "./mono-label";
import { Swatches } from "./swatches";

interface FactProps {
  label: string;
  title?: string;
  body?: string;
  joke?: string;
  swatches?: readonly Swatch[];
  color: string;
  width?: number;
  small?: boolean;
}

/** One stop on the way down: mono depth label, bold name, one-line fact, small joke. */
export function Fact({ label, title, body, joke, swatches, color, width = 360, small }: FactProps) {
  return (
    <Column style={{ width, gap: 6, color, mobile: { width: "100%" } }}>
      <MonoLabel color={color}>{label}</MonoLabel>
      {title && (
        <Heading level={3} style={{ fontSize: small ? 20 : 24, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </Heading>
      )}
      {body && <Text style={{ fontSize: small ? 16 : 17, lineHeight: 1.42 }}>{body}</Text>}
      {swatches && <Swatches swatches={swatches} />}
      {joke && <MonoLabel color={color}>{joke}</MonoLabel>}
    </Column>
  );
}

import { Column, Heading, Text } from "@hyper-elements/react";
import { MonoLabel } from "./mono-label";

interface FactProps {
  label: string;
  title?: string;
  body?: string;
  joke?: string;
  color: string;
  width?: number;
}

/** One stop on the way down: mono depth label, bold name, one-line fact, small joke. */
export function Fact({ label, title, body, joke, color, width = 360 }: FactProps) {
  return (
    <Column style={{ width, gap: 6, color, mobile: { width: "100%" } }}>
      <MonoLabel color={color}>{label}</MonoLabel>
      {title && (
        <Heading level={3} style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
        </Heading>
      )}
      {body && <Text style={{ fontSize: 17, lineHeight: 1.42 }}>{body}</Text>}
      {joke && <MonoLabel color={color}>{joke}</MonoLabel>}
    </Column>
  );
}

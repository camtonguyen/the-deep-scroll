import { Column } from "@hyper-elements/react";
import type { ReactNode } from "react";

interface PositionedProps {
  top: number;
  left: number;
  children: ReactNode;
}

/**
 * Hyper Elements has no absolute positioning, but a Layer stacks its
 * children in one grid cell. Inside a Layer, a Column padded by
 * (top, left) behaves like `position: absolute; top; left`.
 */
export function Positioned({ top, left, children }: PositionedProps) {
  return <Column style={{ padding: { top: Math.max(0, Math.round(top)), left } }}>{children}</Column>;
}

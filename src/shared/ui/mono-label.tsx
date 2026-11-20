import { Text } from "@hyper-elements/react";
import type { ReactNode } from "react";
import { fonts } from "@/shared/theme/tokens";

interface MonoLabelProps {
  children: ReactNode;
  color?: string;
  size?: number;
}

/** Depths, pressures, footnotes: the small IBM Plex Mono voice of the page. */
export function MonoLabel({ children, color, size = 13 }: MonoLabelProps) {
  return <Text style={{ fontFamily: fonts.mono, fontSize: size, letterSpacing: 0.5, color }}>{children}</Text>;
}

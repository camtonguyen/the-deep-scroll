import { Column } from "@hyper-elements/react";
import type { ComponentProps } from "react";
import { CONTENT_WIDTH } from "@/shared/theme/tokens";

type ContainerProps = ComponentProps<typeof Column>;

/**
 * Centres content at CONTENT_WIDTH inside a full-bleed Page (PAGE_WIDTH).
 * Put one directly inside a Section: <Section style={{ alignItems: "center" }}>.
 */
export function Container({ style, ...props }: ContainerProps) {
  return <Column {...props} style={{ width: "100%", maxWidth: CONTENT_WIDTH, ...style }} />;
}

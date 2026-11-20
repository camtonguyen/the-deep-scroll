import type { ReactElement } from "react";
import DiveCertificate from "@/modules/dive-certificate";
import LandingPage from "@/modules/landing-page";
import ShareCard from "@/modules/share-card";
import WelcomeEmail from "@/modules/welcome-email";

/**
 * The four outputs, one per Hyper Elements root. The studio previews them
 * and scripts/render.tsx writes them to out/. Add an output here and both
 * pick it up.
 */
export interface Output {
  id: string;
  label: string;
  root: "Page" | "Email" | "Document" | "Canvas";
  /** Preview width in px. */
  width: number;
  /** `only` picks one part of the output (the landing page: a section id). */
  element: (only?: string) => ReactElement;
}

export const OUTPUTS: readonly Output[] = [
  { id: "landing-page", label: "Landing page", root: "Page", width: 1440, element: (only) => <LandingPage only={only} /> },
  { id: "welcome-email", label: "Welcome email", root: "Email", width: 680, element: () => <WelcomeEmail /> },
  { id: "dive-certificate", label: "Dive certificate", root: "Document", width: 1123, element: () => <DiveCertificate /> },
  { id: "share-card", label: "Share card", root: "Canvas", width: 1200, element: () => <ShareCard /> },
];

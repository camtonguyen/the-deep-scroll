/** Copy and links shared by every output. The Hadal Society is fictional. */
export const SITE = {
  name: "The Hadal Society",
  title: "The Deep Scroll · The Hadal Society",
  description: "Scroll from the sea surface to the bottom of the Challenger Deep, 10,935 m down.",
  url: "https://example.org/the-deep-scroll", // TODO: replace with the deployed URL
  /** The page has no nav bar: every link lives in the footer. */
  links: [
    { text: "Expeditions", href: "#" },
    { text: "Science", href: "#" },
    { text: "Donate", href: "#tiers" },
    { text: "Fund the next dive", href: "#tiers" },
    { text: "Dive certificate", href: "#certificate" },
  ],
  backToSurface: { text: "↑ Back to the surface (it's a long swim)", href: "#top" },
  /** Top-right readout on the surface. */
  readout: "28°C · 0 m",
  /** The title screen: three lines, sized to stack (px, desktop / phone). */
  titleLines: [
    { text: "THE", size: 64, mobileSize: 30 },
    { text: "DEEP", size: 200, mobileSize: 72 },
    { text: "SCROLL", size: 128, mobileSize: 72 },
  ],
  /** Widest window, in px, that gets the stacked layout (the Page and the title both use it). The to-scale sea needs the 1,200 px content width, so anything narrower stacks. */
  phoneWidth: 1199,
  cta: { text: "Fund the next dive", href: "#tiers" },
  footer: "The Hadal Society is fictional. The depths are real.",
  copyright: "© 2026 The Hadal Society. All rights reserved.",
} as const;

/** The welcome email: its subject and the line that says why it was sent. */
export const MAIL = {
  subject: (firstName: string) => `Welcome aboard, ${firstName}.`,
  why: "You are getting this one email because you asked for a dive certificate. We used your address only to send it and did not keep it.",
  formNote: "Used only to send this one email.",
} as const;

/** Sharing: the LinkedIn dialog, the card route, and the words the phone share sheet gets. */
export const SHARE = {
  linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
  cardRoute: "/api/share-card",
  cardSize: { width: 1200, height: 630 },
  text: "I scrolled to the bottom of the ocean.",
} as const;

export interface Tier {
  depthLabel: string;
  name: string;
  price: string;
  perk: string;
  featured?: boolean;
}

export const TIERS: readonly Tier[] = [
  { depthLabel: "DEPTH: 0 m", name: "Snorkeler", price: "$5", perk: "Your name on the expedition's dive log." },
  { depthLabel: "DEPTH: 40 m", name: "Diver", price: "$25", perk: "The dive log, plus a postcard mailed from the ship." },
  {
    depthLabel: "DEPTH: 10,935 m",
    name: "Hadal Explorer",
    price: "$100",
    perk: "All of that, plus a live call from the control room on dive day.",
    featured: true,
  },
];

export const BOTTOM_FACTS: readonly { value: string; text: string }[] = [
  { value: "~75%", text: "of the seafloor still isn't mapped in high resolution." },
  { value: "1960", text: "first visit (Trieste). 2012: first solo dive, by James Cameron." },
  { value: "4 h 47 min", text: "how long Trieste took to sink this far. You did it in one scroll." },
];

/** What the certificate, email and share card are made for: one visitor's dive. */
export interface Visitor {
  name: string;
  /** Deepest depth reached, metres. */
  depth: number;
  /** Already formatted for reading, e.g. "29 November 2026". */
  date: string;
}

/** Sample recipient: what `pnpm render` writes. */
export const SAMPLE_DIVER: Visitor = {
  name: "Ada Marlowe",
  depth: 10935,
  date: "29 November 2026",
};

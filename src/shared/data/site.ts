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
    { text: "Get postcards", href: "#pc-form" },
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
  footer: "The Hadal Society is fictional. The depths are real.",
  copyright: "© 2026 The Hadal Society. All rights reserved.",
} as const;

/** The welcome email: its subject and the line that says why it was sent. */
export const MAIL = {
  subject: (firstName: string) => `Welcome aboard, ${firstName}.`,
  preheader: "Your postcards start with the next expedition.",
  headline: "Welcome aboard, diver.",
  intro: (metres: string) => `You scrolled ${metres}. Most people stop at 40.`,
  lede: "Every few months a ship goes out, a robot goes down, and you get a postcard from wherever it lands. First stop: a trench we haven't mapped yet. There are plenty.",
  neighboursLabel: "THREE NEIGHBOURS YOU MET ON THE WAY DOWN",
  neighbours: [
    { id: "anglerfish", name: "Anglerfish", depth: "~1,000–2,000 m" },
    { id: "dumbo", name: "Dumbo octopus", depth: "~4,000 m" },
    { id: "snailfish", name: "Snailfish", depth: "8,336 m" },
  ],
  cta: "Download your dive certificate",
  signoff: "See you at the bottom,",
  why: "You're getting this because you asked for postcards.",
  unsubscribe: "Unsubscribe",
  unsubscribeNote: "(resurface).",
} as const;

/** The postcard form at the bottom of the page. */
export const POSTCARD = {
  heading: "Get a postcard from every expedition.",
  namePlaceholder: "Your name",
  emailPlaceholder: "you@surface.com",
  button: "Send me postcards",
  note: "We'll email you a welcome postcard, with your dive certificate in it. Your address is used only for these emails.",
  sending: "Sending…",
  success: "Check your inbox. Your welcome postcard and dive certificate are on their way.",
  failed: "Something went wrong. Try again.",
  offline: "Could not reach the server. Check your connection and try again.",
} as const;

/** Sharing: the LinkedIn dialog, the card route, and the words the phone share sheet gets. */
export const SHARE = {
  linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=",
  cardRoute: "/api/share-card",
  cardSize: { width: 1200, height: 630 },
  text: "I scrolled to the bottom of the ocean.",
} as const;

/** The underwater loop that plays while the diver moves: the route that serves it, and the key that remembers "off". */
export const SOUND = {
  route: "/api/sound",
  storageKey: "deep-scroll-sound",
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
  { value: "~73%", text: "of the seafloor still isn't mapped to modern standards (Seabed 2030, 2025)." },
  { value: "1960", text: "first visit (Trieste). 2012: first solo dive, by James Cameron." },
  { value: "~5 hours", text: "how long Trieste took to sink this far. You did it in one scroll." },
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

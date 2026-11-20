/** Copy and links shared by every output. The Hadal Society is fictional. */
export const SITE = {
  name: "The Hadal Society",
  title: "The Deep Scroll · The Hadal Society",
  description: "Scroll from the sea surface to the bottom of the Challenger Deep, 10,935 m down.",
  url: "https://example.org/the-deep-scroll", // TODO: replace with the deployed URL
  nav: [
    { text: "Expeditions", href: "#" },
    { text: "Science", href: "#" },
    { text: "Donate", href: "#give" },
  ],
  cta: { text: "Fund the next dive", href: "#give" },
  footer: "The Hadal Society is fictional. The depths are real.",
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

/** Sample recipient for the certificate, email and share card. */
export const SAMPLE_DIVER = {
  name: "Ada Marlowe",
  date: "29 November 2026",
} as const;

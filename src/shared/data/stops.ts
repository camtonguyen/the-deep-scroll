import type { ArtId } from "@/shared/art";
import { lightLoss } from "@/shared/theme/tokens";

/**
 * Every fact on the way down. A stop is placed at its real depth by the
 * depth scale; change `depth` and the stop moves on every output.
 *
 * Every claim has a source line in docs/sources.md, or is marked approximate (~) in the copy.
 */
export interface Stop {
  id: string;
  /** Real depth in metres. */
  depth: number;
  /** Small px adjustment after the scale, to avoid collisions. */
  nudge?: number;
  /** Left or right text column. */
  side: "left" | "right";
  /** Exact left edge in px, when the design places it off the column. */
  x?: number;
  /** Smaller title and body, as the design sets the crowded stops. */
  small?: boolean;
  /** Text column width in px, where the design narrows it (default 360). */
  width?: number;
  /** Mono label above the title, e.g. "~2,000 m". */
  label: string;
  title?: string;
  body?: string;
  /** Small mono aside. */
  joke?: string;
  /** Drawings shown next to the stop (shared/art). */
  art?: ArtId | readonly ArtId[];
  /** Colour chips: the true colour above, how it looks at this depth below. */
  swatches?: readonly Swatch[];
}

export interface Swatch {
  label: string;
  truth: string;
  seen: string;
}

export const STOPS: readonly Stop[] = [
  {
    id: "red-light",
    depth: 5,
    side: "left",
    label: "5 m",
    title: "Red light is already fading.",
    joke: "Your red swimsuit now looks brown.",
    swatches: [
      { label: "RED ~10 m", truth: lightLoss.red.truth, seen: lightLoss.red.seen },
      { label: "ORNG ~25 m", truth: lightLoss.orange.truth, seen: lightLoss.orange.seen },
      { label: "YLW ~45 m", truth: lightLoss.yellow.truth, seen: lightLoss.yellow.seen },
      { label: "GRN ~100 m", truth: lightLoss.green.truth, seen: lightLoss.green.seen },
    ],
  },
  {
    id: "scuba",
    depth: 40,
    side: "right",
    x: 780,
    label: "40 m",
    title: "Recreational scuba limit",
    body: "Most humans stop here.",
    joke: "Sensible.",
    art: "diver",
  },
  {
    id: "blue-whale",
    depth: 100,
    side: "left",
    label: "~100 m",
    title: "Blue whale",
    body: "The largest animal known to have ever lived. Feeds mostly in the top 300 m.",
    joke: "It doesn't fit. It keeps going →",
    art: "blueWhale",
  },
  {
    id: "leatherback",
    depth: 155,
    nudge: 100, // below the whale's tail fin, in the darker water, so the text is light
    small: true,
    side: "right",
    x: 910,
    width: 210,
    label: "~150 m",
    title: "Leatherback turtle",
    body: "Record dive: about 1,280 m.",
    art: "leatherback",
  },
  {
    id: "giant-squid",
    depth: 300,
    nudge: 52, // clears the 200 m scale note
    side: "right",
    x: 730, // the art starts at 0 (the design has it at -30, which a Positioned can't do), so its text moves 30 right
    label: "~300–1,000 m",
    title: "Giant squid",
    body: "Eyes up to ~27 cm across, the largest in the animal kingdom alongside the colossal squid. First filmed alive in the deep in 2012.",
    joke: "Its tentacles are on the ruler. Ignore them.",
    art: "giantSquid",
  },
  {
    id: "emperor-penguin",
    depth: 564,
    side: "left",
    width: 300,
    x: 262,
    label: "564 m",
    title: "Emperor penguin",
    body: "Deepest recorded dive of any bird.",
    joke: "“how is it down here”",
    art: "emperorPenguin",
  },
  {
    id: "vampire-squid",
    depth: 700,
    side: "right",
    width: 300,
    x: 800,
    label: "~600–900 m",
    title: "Vampire squid",
    body: "Not a squid, doesn't drink blood. It eats marine snow: falling bits of dead stuff.",
    art: "vampireSquid",
  },
  {
    id: "burj-khalifa",
    depth: 828,
    nudge: 12,
    side: "right",
    label: "828 m ↑",
    title: "Burj Khalifa",
    body: "The world's tallest building, hung upside-down from the surface. Its spire stops here.",
  },
  {
    id: "anglerfish",
    depth: 1500,
    side: "left",
    label: "~1,000–2,000 m",
    title: "Deep-sea anglerfish",
    body: "The lure glows because bacteria live inside it. In some species the tiny male fuses to the female, for good.",
    joke: "First glow of the trip. Don't swim toward it.",
    art: "anglerfish",
  },
  {
    id: "sperm-whale",
    depth: 2000,
    side: "left",
    label: "down to ~1,000 m or more",
    title: "Sperm whale",
    body: "Hunts squid in total darkness by echolocation. Its clicks are the loudest sounds made by any animal.",
    joke: "Can hold its breath for over an hour. Show-off.",
    art: ["spermWhale", "fleeingSquid"],
  },
  { id: "snow", depth: 2520, side: "right", label: "Nothing here but snow. ·  ·   ·" },
  {
    id: "cuvier",
    depth: 2992,
    side: "left",
    label: "2,992 m",
    title: "Cuvier's beaked whale",
    body: "The deepest dive ever recorded for a mammal. Its longest recorded dive lasted over two hours.",
    joke: "Breath held: yes.",
    art: "cuviersWhale",
  },
  { id: "doing-great", depth: 3400, side: "right", label: "You're doing great." },
  {
    id: "average-depth",
    depth: 3682,
    nudge: 8,
    side: "left",
    label: "~3,700 m · AVERAGE OCEAN DEPTH",
    body: "Below average from here on.",
  },
  {
    id: "titanic",
    depth: 3800,
    nudge: 4,
    side: "left",
    label: "~3,800 m",
    title: "RMS Titanic",
    body: "The bow and the stern lie roughly 600 to 800 m apart.",
    art: "titanic",
  },
  {
    id: "dumbo",
    depth: 4200,
    side: "right",
    width: 320,
    x: 840,
    label: "~4,000 m (seen down to 6,957 m)",
    title: "Dumbo octopus",
    body: "Swims by flapping two ear-like fins. The deepest octopus ever filmed was one.",
    joke: "Named after the elephant, sorry.",
    art: "dumboOctopus",
  },
  {
    id: "abyssal-plain",
    depth: 4800,
    nudge: 12,
    side: "right",
    label: "~4,800 m · THE ABYSSAL PLAIN",
    body: "Flat, muddy, and it covers about 70% of the seafloor. The trench is still ahead.",
    art: ["abyssalPlain", "seaPig"],
  },
  { id: "scroll-wheel", depth: 5300, side: "right", label: "Your scroll wheel is fine." },
  { id: "still-going", depth: 7000, side: "left", label: "Still going." },
  {
    id: "snailfish",
    depth: 8336,
    side: "left",
    label: "8,336 m",
    title: "Snailfish",
    body: "The deepest fish ever filmed (2022). Pink, soft, and doing fine.",
    art: "snailfish",
  },
  {
    id: "everest",
    depth: 8849,
    nudge: 16,
    side: "right",
    label: "8,849 m ↑",
    title: "Mount Everest",
    body: "Hang it upside-down from the surface and the summit stops here. Stand it on the bottom and 2 km of water still covers the peak.",
  },
  {
    id: "pressure",
    depth: 9500,
    side: "left",
    label: "~9,500 m · PRESSURE CHECK",
    title: "≈1,000 atm",
    body: "About a tonne on every square centimetre. Like a small car parked on your thumbnail.",
  },
  {
    id: "amphipod",
    small: true,
    depth: 10500,
    nudge: 26,
    side: "right",
    width: 280,
    x: 896,
    label: "down to ~10,900 m",
    title: "Amphipod (Hirondellea gigas)",
    body: "A shrimp-ish scavenger living at the very bottom. It can digest sunken wood.",
    art: "amphipod",
  },
  {
    id: "trieste",
    small: true,
    depth: 10935,
    nudge: -210,
    side: "left",
    width: 320,
    label: "23 JANUARY 1960",
    title: "Trieste",
    body: "Jacques Piccard and Don Walsh, first to the bottom. Nearly five hours down, 20 min at the bottom.",
    art: ["triesteSub", "flag"],
  },
];

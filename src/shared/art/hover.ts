import { LAYERS } from "@/shared/theme/layers";

/**
 * Each creature moves once when the pointer rests on it, the way the animal moves, then settles back.
 * The whole drawing's shapes move (not the svg box), so the box under the pointer stays put and the hover holds.
 * Svg allows no transform in the drawing, so this is CSS on the rendered shapes, found by the drawing's label.
 * Off for touch and for reduced motion. One rule per animal below; `--dx/--dy/--r` are how far it travels.
 */
const art = (label: string) => `svg[aria-label^="${label}"]`;

/** [drawing label, how it moves, extra CSS for its parts]. */
const MOVES: readonly (readonly [label: string, vars: string, parts?: string])[] = [
  // the lure swells and flares
  [
    "A deep-sea anglerfish",
    "--dx:-6px;--dy:-5px;--r:-2deg;--t:2s",
    `circle[cx="50"][cy="38"]{animation:hv-move 2s,hv-lure 1.6s ease-in-out !important;transform-box:fill-box;transform-origin:center}`,
  ],
  // jets backwards, then drifts
  ["A giant squid", "--dx:-26px;--t:1.8s"],
  // pulls its arms over its body (the pavilion pose); the arm tips flash
  [
    "A vampire squid",
    "--t:1.8s;--a:hv-curl;transform-origin:82px 20px",
    `circle[r="3.5"]{animation:hv-curl 1.8s,hv-flash 1.8s !important}`,
  ],
  // flaps its ear-like fins while it rises
  [
    "A dumbo octopus",
    "--dy:-9px;--t:1.6s",
    `path[d^="M11.01"],path[d^="M16 33"]{animation:hv-move 1.6s,hv-flap-l 1.6s ease-in-out !important;transform-origin:34px 30px}
path[d^="M85.01"],path[d^="M106 33"]{animation:hv-move 1.6s,hv-flap-r 1.6s ease-in-out !important;transform-origin:88px 30px}`,
  ],
  // walks on its tube feet: each foot lifts in turn
  [
    "A sea pig",
    "--dx:9px;--t:1.5s",
    `ellipse{animation:hv-move 1.5s,hv-step .5s ease-in-out backwards !important;transform-box:fill-box;transform-origin:50% 100%}
ellipse:nth-of-type(2){animation-delay:0s,.15s !important}ellipse:nth-of-type(3){animation-delay:0s,.3s !important}ellipse:nth-of-type(4){animation-delay:0s,.45s !important}ellipse:nth-of-type(5){animation-delay:0s,.6s !important}`,
  ],
  // a lazy glide with a slow tail wave
  ["A hadal snailfish", "--dx:8px;--dy:-3px;--r:3deg;--t:2.2s"],
  // a scavenger: a quick scurry
  ["A tiny amphipod", "--dx:14px;--dy:-3px;--t:.9s"],
  // paddles with its long front flippers
  [
    "A leatherback sea turtle",
    "--dx:9px;--dy:-4px;--r:-3deg;--t:1.8s",
    `path[d^="M70 20"]{animation:hv-move 1.8s,hv-paddle 1.8s ease-in-out !important;transform-origin:72px 22px}
path[d^="M72 38"]{animation:hv-move 1.8s,hv-paddle-b 1.8s ease-in-out !important;transform-origin:64px 40px}
path[d^="M30 38"]{animation:hv-move 1.8s,hv-paddle-b 1.8s ease-in-out !important;transform-origin:22px 36px}`,
  ],
  // dives on, head first
  ["An emperor penguin", "--dy:16px;--r:5deg;--t:1.6s"],
  // a slow sweep of the fluke
  ["A blue whale", "--dy:9px;--r:.5deg;--t:2.6s;transform-origin:25% 50%"],
  // lunges at its prey
  ["A sperm whale", "--dx:18px;--r:-1.5deg;--t:1.8s"],
  // rises to breathe-free depth: a slow upward turn
  ["A Cuvier's beaked whale", "--dx:-10px;--dy:-9px;--r:-3deg;--t:2s"],
  // two quick jets, arms trailing, then it drifts back
  ["A squid fleeing", "--dx:56px;--t:1.6s;--e:cubic-bezier(.1,.8,.3,1)"],
  // the wreck creaks as it settles
  ["The bow of the Titanic", "--r:-.9deg;--t:2.4s;transform-origin:50% 100%"],
  // drops ballast and lifts, then settles
  ["The bathyscaphe Trieste", "--dy:-12px;--t:1.9s"],
  // the flag ripples in the current
  ["A small flag", "--r:7deg;--t:1.1s;transform-origin:50% 100%"],
  // a fin kick
  ["A scuba diver", "--dx:8px;--dy:-4px;--r:-5deg;--t:1.3s"],
];

const rules = MOVES.map(
  ([label, vars, parts = ""]) =>
    `${art(label)}:hover>*{${vars};animation:var(--a,hv-move) var(--t) var(--e,ease-in-out)}${parts
      .split("\n")
      .filter(Boolean)
      .map((p) => `${art(label)}:hover ${p}`)
      .join("")}`,
).join("\n");

export const CREATURE_HOVER = `
svg[role="img"]{overflow:visible}
/* each item sits in a full-width box and later items lie over earlier ones: let the pointer through the boxes, and catch it on the art and text */
:is(#dive,#dive-mobile) div[style*="grid-area"]{pointer-events:none}
:is(#dive,#dive-mobile) :is(svg,p,h2,h3,span,a,button){pointer-events:auto}
:is(#dive,#dive-mobile) svg[aria-label=""]{pointer-events:none}
/* the turtle sits under a text column on desktop: lift it above so it can be hovered */
#dive svg[aria-label^="A leatherback sea turtle"]{position:relative;z-index:${LAYERS.lifted}}
svg[role="img"]>*{transform-box:view-box;transform-origin:50% 50%}
@keyframes hv-move{0%,100%{translate:0 0;rotate:0deg;scale:1}28%{translate:var(--dx,0) var(--dy,0);rotate:var(--r,0deg)}}
@keyframes hv-curl{0%,100%{scale:1}35%,65%{scale:.9 .8}}
@keyframes hv-flash{0%,100%{opacity:1}20%,60%{opacity:.25}40%,80%{opacity:1}}
@keyframes hv-lure{0%,100%{scale:1}30%{scale:1.8}55%{scale:1.15}75%{scale:1.5}}
@keyframes hv-flap-l{0%,100%{rotate:0deg}15%,55%{rotate:-24deg}35%,75%{rotate:14deg}}
@keyframes hv-flap-r{0%,100%{rotate:0deg}15%,55%{rotate:24deg}35%,75%{rotate:-14deg}}
@keyframes hv-step{0%,100%{scale:1}50%{scale:1 .55}}
@keyframes hv-paddle{0%,100%{rotate:0deg}30%{rotate:-26deg}65%{rotate:14deg}}
@keyframes hv-paddle-b{0%,100%{rotate:0deg}30%{rotate:20deg}65%{rotate:-12deg}}
@media (hover:hover) and (prefers-reduced-motion:no-preference){
${rules}
}
`;

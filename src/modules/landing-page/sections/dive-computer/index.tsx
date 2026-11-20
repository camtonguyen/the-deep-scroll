import { Html } from "@hyper-elements/react";
import { MARINE_SNOW_HEIGHT, WAVE_PERIOD } from "@/shared/art";
import { SITE } from "@/shared/data/site";
import { art, colors, fonts, sea } from "@/shared/theme/tokens";
import { diveScript } from "./script";

const RULER_X = 24;
const CONTENT = 1200;

/** Hyper Elements renders static HTML, so the live parts are one Html block: CSS for the motion, a short script for the counter and the diver. */
const STYLE = `
@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
html{overscroll-behavior:none}
#dc-diver{position:fixed;z-index:50;pointer-events:none;opacity:0}
#dc-diver.on{opacity:1;transition:opacity .3s}
#dc{position:fixed;z-index:50;pointer-events:none;opacity:0;left:50%;bottom:16px;translate:-50% 0;width:min(92vw,560px);display:grid;grid-template-columns:repeat(4,1fr);gap:4px 12px;padding:12px 18px;box-sizing:border-box;border-radius:14px;background:${sea.abyssal0};border:2px solid ${colors.aqua};color:${colors.aqua};font-family:${fonts.mono}}
#dc.on{opacity:1;transition:opacity .3s}
#dc small{display:block;font-size:11px;letter-spacing:1px;opacity:.7}
#dc b{display:block;font-size:20px;line-height:1.2;font-weight:700;color:${colors.white};white-space:nowrap}
#dc-diver{top:50%;left:calc(max(0px,(100vw - ${CONTENT}px) / 2) + ${RULER_X - 36}px);margin-top:-35px;width:200px}
#dc-diver svg{display:block;width:100%;height:auto}
#dc-diver .beam{opacity:0;transition:opacity .4s}
#dc-diver.lit .beam{opacity:.3}
#dc-diver .you{position:absolute;left:46px;top:-16px;font:700 12px ${fonts.mono};letter-spacing:1px;color:${colors.navy};background:${colors.aqua};border-radius:6px;padding:1px 6px}
@media (max-width:${SITE.phoneWidth}px){#dc-diver{left:auto;right:-37px;width:130px;margin-top:-17px}#dc-diver svg{transform:rotate(90deg);transition:transform .3s}#dc-diver.up svg{transform:rotate(-90deg)}#dc-diver .you{left:8px;top:4px}#dc{grid-template-columns:repeat(2,1fr);bottom:8px}}
@media (prefers-reduced-motion:no-preference){
#top svg[height="40"]{animation:roll 7s linear infinite}
#top svg[aria-label^="A small research boat"]{transform-origin:50% 90%;animation:bobboat 5s ease-in-out infinite}
#dive svg[height="${MARINE_SNOW_HEIGHT}"]{animation:drift 22s ease-in-out infinite alternate}
}
@keyframes roll{to{translate:-${WAVE_PERIOD}px 0}}
@keyframes bobboat{0%,100%{translate:0 0;rotate:-1deg}50%{translate:0 5px;rotate:1deg}}
@keyframes drift{from{translate:0 0}to{translate:0 36px}}
`;

/** The diver, ported from shared/art/diver.tsx (an Html block can't hold a component) plus a headlamp beam. */
const DIVER = `<svg viewBox="0 0 260 70" aria-hidden="true">
<polygon class="beam" points="150,34 258,6 258,62" fill="${colors.glow}"/>
<g stroke="${colors.navy}" stroke-width="2.5">
<path d="M31 32 L3 19 L7 35 Z M31 38 L5 51 L9 37 Z" fill="${art.diverFin}"/>
<path d="M30 31 C 40 22, 110 22, 128 30 C 133 38, 110 45, 40 43 C 30 41, 26 35, 30 31 Z" fill="${colors.navy}"/>
<rect x="44" y="14" width="60" height="13" rx="6" fill="${colors.hull}"/>
<path d="M112 40 L132 52" fill="none" stroke-width="5"/>
<circle cx="138" cy="32" r="10" fill="${colors.navy}"/>
<rect x="137" y="26" width="15" height="9" rx="3" fill="${colors.aqua}" stroke-width="2"/>
</g></svg>`;

const PANEL = [
  ["DEPTH", "dc-depth", "0 m"],
  ["TEMP", "dc-temp", "28 °C"],
  ["PRESSURE", "dc-atm", "1 atm"],
  ["LIGHT", "dc-light", "sunlight"],
]
  .map(([label, id, start]) => `<div><small>${label}</small><b id="${id}">${start}</b></div>`)
  .join("");

/** The sticky diver and the live dive computer. Without script (or before the sea), they stay hidden and the page keeps its printed ruler. */
export function DiveComputer() {
  const html = `<style>${STYLE}</style><div id="dc-diver" aria-hidden="true"><span class="you">YOU</span>${DIVER}</div><div id="dc" role="status" aria-label="Dive computer">${PANEL}</div><script>${diveScript()}</script>`;
  return <Html html={html} text="" />;
}

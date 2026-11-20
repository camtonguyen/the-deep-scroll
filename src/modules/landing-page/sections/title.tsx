import { Html } from "@hyper-elements/react";
import { SITE } from "@/shared/data/site";
import { colors, sea } from "@/shared/theme/tokens";

/** Hyper Elements has no text stroke, tilt or keyframes, so the title is one Html block of plain CSS (no script). */
const STYLE = `
.ttl{font-family:'Roboto Condensed',Roboto,sans-serif;font-weight:700;line-height:.9;letter-spacing:.01em;text-align:center;margin:0;white-space:nowrap}
.ttl span.line{display:block}
.ltr{position:relative;display:inline-block;animation:drop .7s cubic-bezier(.3,1.5,.5,1) both,bob 3.4s ease-in-out infinite}
.ltr .bk{position:absolute;left:.045em;top:.06em;color:${sea.light};-webkit-text-stroke:3px ${colors.navy}}
.ltr .fr{position:relative;color:${colors.white};-webkit-text-stroke:3px ${colors.navy};paint-order:stroke fill}
.go{display:flex;justify-content:center;align-items:center;gap:16px;margin-top:18px;min-height:48px;font-family:'Roboto Condensed',Roboto,sans-serif;font-size:34px;color:${colors.navy};text-decoration:none}
.go.ph{display:none}
.nudge{display:inline-block;animation:nudge 1.4s ease-in-out infinite}
.bub{position:absolute;border:2.5px solid ${colors.navy};border-radius:50%;background:${colors.white};animation:rise 6s linear infinite}
@keyframes drop{from{opacity:0;translate:0 -60px}to{opacity:1;translate:0 0}}
@keyframes bob{0%,100%{translate:0 0}50%{translate:0 -10px}}
@keyframes rise{0%{translate:0 0;opacity:0}15%{opacity:1}100%{translate:0 -120px;opacity:0}}
@keyframes nudge{0%,100%{translate:0 0}50%{translate:0 8px}}
@media (prefers-reduced-motion: reduce){.ltr,.bub,.nudge{animation:none}}
@media (max-width:${SITE.phoneWidth}px){.go.dk{display:none}.go.ph{display:flex}${SITE.titleLines.map((l, i) => `.l${i}{font-size:${l.mobileSize}px !important}`).join("")}}
`;

const TILTS = [-4, 3, -2, 4, -3];
const BUBBLES = [
  { left: "18%", top: 200, size: 14, delay: 0 },
  { left: "22%", top: 320, size: 9, delay: 1.6 },
  { left: "77%", top: 160, size: 12, delay: 0.8 },
  { left: "82%", top: 300, size: 18, delay: 2.4 },
  { left: "70%", top: 380, size: 8, delay: 3.4 },
  { left: "28%", top: 420, size: 11, delay: 4.2 },
];

function titleHtml() {
  let n = 0;
  const lines = SITE.titleLines
    .map(({ text, size }, i) => {
      const letters = [...text]
        .map((ch) => {
          const delay = (n * 0.12).toFixed(2);
          const tilt = TILTS[n++ % TILTS.length];
          return `<span class="ltr" style="animation-delay:${delay}s,${(+delay + 0.8).toFixed(2)}s;rotate:${tilt}deg"><span class="bk" aria-hidden="true">${ch}</span><span class="fr">${ch}</span></span>`;
        })
        .join("");
      return `<span class="line l${i}" style="font-size:${size}px">${letters}</span>`;
    })
    .join("");
  const bubbles = BUBBLES.map(
    (b) => `<div class="bub" style="left:${b.left};top:${b.top}px;width:${b.size}px;height:${b.size}px;animation-delay:${b.delay}s"></div>`,
  ).join("");
  const down = `<span class="nudge" aria-hidden="true">↓</span>Scroll Down!<span class="nudge" aria-hidden="true">↓</span>`;
  return `<style>${STYLE}</style><div style="position:relative"><div aria-hidden="true">${bubbles}</div><h1 class="ttl" aria-label="The Deep Scroll">${lines}</h1><a class="go dk" href="#dive">${down}</a><a class="go ph" href="#dive-mobile">${down}</a></div>`;
}

export function Title() {
  return <Html html={titleHtml()} text="THE DEEP SCROLL. Scroll down!" />;
}

import { Html } from "@hyper-elements/react";
import { SHARE } from "@/shared/data/site";
import { colors, fonts } from "@/shared/theme/tokens";
import { shareScript } from "./script";

const STYLE = `
.sh-label{margin:0;font:14px ${fonts.mono};letter-spacing:.5px;color:${colors.aqua}}
.sh-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.sh-icons{display:flex;gap:12px}
.sh-icon{display:flex;align-items:center;justify-content:center;width:36px;height:36px;padding:0;box-sizing:border-box;border:2px solid ${colors.aqua};border-radius:10px;background:transparent;color:${colors.aqua};cursor:pointer}
.sh-icon:hover{background:${colors.deepCard}}
.sh-icon svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
`;

const ICONS = `
<a class="sh-icon" data-sh="linkedin" href="${SHARE.linkedin}" target="_blank" rel="noopener" aria-label="Share on LinkedIn" title="Share on LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M12 13a2.5 2.5 0 0 1 5 0v3"/></svg></a>
<a class="sh-icon" data-sh="card" href="${SHARE.cardRoute}" download="dive-card.png" aria-label="Download share card" title="Download share card"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg></a>`;

/** A row of icons below the footer: share on LinkedIn, download the card. */
export function ShareLinks() {
  const html = `<style>${STYLE}</style><div class="sh-row" role="group" aria-labelledby="sh-label"><span class="sh-label" id="sh-label">Share your dive card</span><div class="sh-icons">${ICONS}</div></div><script>${shareScript()}</script>`;
  return <Html html={html} text="Share on LinkedIn · Download card" />;
}

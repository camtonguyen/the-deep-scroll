import { Html } from "@hyper-elements/react";
import { formatDepth } from "@/shared/lib/format";
import { MAX_DEPTH } from "@/shared/lib/sea";
import { DATE_MAX, EMAIL_MAX, NAME_MAX } from "@/shared/lib/visitor";
import { colors, fonts } from "@/shared/theme/tokens";
import { certificateScript } from "./script";

const STYLE = `
/* the footer links (class flink) have no underline; a pointer that can hover gets one on hover, and touch screens never do, so none sticks after a tap */
.flink{text-decoration:none}
@media (hover:hover){.flink:hover{text-decoration:underline}}
.cd-open{display:inline-flex;align-items:center;min-height:64px;padding:0 30px;box-sizing:border-box;border:2px solid ${colors.aqua};border-radius:14px;background:transparent;color:${colors.aqua};font:700 20px/1.2 ${fonts.display};cursor:pointer}
.cd-open:focus-visible,#cd button:focus-visible,#cd input:focus-visible{outline:3px solid ${colors.cyan};outline-offset:2px}
#cd{position:fixed;inset:0;margin:auto;height:fit-content;width:min(92vw,440px);max-height:92dvh;overflow:auto;padding:24px;box-sizing:border-box;border:2px solid ${colors.aqua};border-radius:16px;background:${colors.deepCard};color:${colors.aqua};font-family:${fonts.display}}
#cd::backdrop{background:${colors.abyss};opacity:.75}
#cd .x{position:absolute;top:10px;right:10px;display:flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;border:0;border-radius:10px;background:transparent;color:${colors.aqua};cursor:pointer}
#cd .x:hover{background:${colors.abyss}}
#cd h2{margin:0 0 4px;padding-right:40px;font-size:26px;line-height:1.15;color:${colors.white}}
#cd p{margin:0 0 16px;font:15px/1.4 ${fonts.mono};letter-spacing:.5px}
#cd label{display:block;margin:0 0 4px;font:700 14px ${fonts.mono};letter-spacing:1px}
#cd input{display:block;width:100%;box-sizing:border-box;min-height:44px;padding:10px 12px;border:2px solid ${colors.aqua};border-radius:10px;background:${colors.abyss};color:${colors.white};font:17px ${fonts.display}}
#cd input[aria-invalid=true]{border-color:${colors.glow}}
#cd .field{margin:0 0 14px}
#cd .err{min-height:1.2em;margin:4px 0 0;font:14px ${fonts.mono};color:${colors.glow}}
#cd .row{display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:center;margin-top:8px}
#cd .go,#cd .no{display:flex;align-items:center;justify-content:center;box-sizing:border-box;height:52px;margin:0;padding:0 28px;font:700 18px ${fonts.display}}
#cd .go{border:0;border-radius:12px;background:${colors.glow};color:${colors.abyss};cursor:pointer}
#cd .go:disabled{opacity:.6;cursor:wait}
#cd .no{border:2px solid ${colors.aqua};border-radius:12px;background:transparent;color:${colors.aqua};cursor:pointer}
#cd #cd-status{min-height:1.4em;margin:12px 0 0;font:15px ${fonts.mono};color:${colors.cyan}}
#cd #cd-status.bad{color:${colors.glow}}
`;

function field(id: string, label: string, attrs: string, hint = "") {
  return `<div class="field"><label for="cd-${id}">${label}</label><input id="cd-${id}" name="${id}" ${attrs} aria-describedby="cd-${id}-err" aria-invalid="false"><div class="err" id="cd-${id}-err" role="alert"></div>${hint}</div>`;
}

const DIALOG = `<dialog id="cd" aria-labelledby="cd-title"><form id="cd-form" novalidate>
<button class="x" id="cd-x" type="button" aria-label="Close"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><path d="M5 5 L17 17 M17 5 L5 17" fill="none" stroke="${colors.aqua}" stroke-width="2.5" stroke-linecap="round"/></svg></button>
<h2 id="cd-title">Your dive certificate</h2>
<p>Depth reached: ${formatDepth(MAX_DEPTH)}, the bottom of the Challenger Deep.</p>
${field("name", "YOUR NAME", `type="text" autocomplete="name" required maxlength="${NAME_MAX}"`)}
${field("email", "EMAIL (OPTIONAL, FOR A WELCOME EMAIL)", `type="email" autocomplete="email" inputmode="email" maxlength="${EMAIL_MAX}"`)}
${field("date", "DATE", `type="text" autocomplete="off" maxlength="${DATE_MAX}"`)}
<div class="row"><button class="go" id="cd-send" type="submit">Download PDF</button><button class="no" id="cd-close" type="button">Cancel</button></div>
<div id="cd-status" role="status" aria-live="polite"></div>
</form></dialog>`;

/** The "Get your dive certificate" button and its popup: a native `<dialog>` (focus trap, Esc to close, focus returns), so it needs only a short script. Without script the button does nothing and the page is unchanged. */
export function CertificateDialog() {
  const html = `<style>${STYLE}</style><button class="cd-open" id="cd-open" type="button" aria-haspopup="dialog">Get your dive certificate</button>${DIALOG}<script>${certificateScript()}</script>`;
  return <Html html={html} text="Get your dive certificate" />;
}

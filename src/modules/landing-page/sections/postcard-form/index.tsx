import { Html } from "@hyper-elements/react";
import { POSTCARD, SITE } from "@/shared/data/site";
import { EMAIL_MAX, NAME_MAX } from "@/shared/lib/visitor";
import { colors, fonts } from "@/shared/theme/tokens";
import { postcardScript } from "./script";

// Desktop: name, email and button on one row. Phones (the same width the page stacks at): one item per line.
const STYLE = `
#pc-form{display:flex;flex-direction:column;gap:14px;font-family:${fonts.display};color:${colors.aqua}}
#pc-form h3{margin:0;font-size:22px;line-height:1.2;font-weight:700;color:${colors.aqua}}
#pc-form .row{display:flex;gap:16px;align-items:center}
#pc-form .f{flex:3;min-width:0;position:relative}
#pc-form .f:first-child{flex:2}
#pc-form label{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
#pc-form input{display:block;width:100%;box-sizing:border-box;height:52px;padding:0 16px;border:2px solid ${colors.aqua};border-radius:12px;background:${colors.abyss};color:${colors.white};font:17px ${fonts.display}}
#pc-form input::placeholder{color:${colors.aqua};opacity:.6}
#pc-form input[aria-invalid=true]{border-color:${colors.glow}}
#pc-form .err{position:absolute;left:0;top:100%;margin-top:4px;font:14px ${fonts.mono};letter-spacing:.5px;color:${colors.glow}}
#pc-form .err:empty{display:none}
#pc-form .go{flex:none;margin-top:0;height:52px;box-sizing:border-box;padding:0 26px;border:0;border-radius:12px;background:${colors.sky};color:${colors.abyss};font:700 17px ${fonts.display};cursor:pointer}
#pc-form .go:disabled{opacity:.6;cursor:wait}
#pc-form .note{margin:0;padding-top:14px;font:14px/1.4 ${fonts.mono};letter-spacing:.5px}
#pc-status{min-height:1.4em;font:15px ${fonts.mono};color:${colors.cyan}}
#pc-status:empty{display:none}
#pc-status.bad{color:${colors.glow}}
@media (max-width:${SITE.phoneWidth}px){#pc-form .row{flex-direction:column;align-items:stretch}#pc-form .go{width:100%}}
`;

function field(id: string, placeholder: string, attrs: string) {
  return `<div class="f"><label for="pc-${id}">${placeholder}</label><input id="pc-${id}" name="${id}" placeholder="${placeholder}" ${attrs} required aria-describedby="pc-${id}-err" aria-invalid="false"><div class="err" id="pc-${id}-err" role="alert"></div></div>`;
}

const FORM = `<form id="pc-form" novalidate aria-labelledby="pc-title">
<h3 id="pc-title">${POSTCARD.heading}</h3>
<div class="row">
${field("name", POSTCARD.namePlaceholder, `type="text" autocomplete="name" maxlength="${NAME_MAX}"`)}
${field("email", POSTCARD.emailPlaceholder, `type="email" autocomplete="email" inputmode="email" maxlength="${EMAIL_MAX}"`)}
<button class="go btn" id="pc-send" type="submit">${POSTCARD.button}</button>
</div>
<p class="note">${POSTCARD.note}</p>
<div id="pc-status" role="status" aria-live="polite"></div>
</form>`;

/** "Get a postcard from every expedition": name + email, then the welcome email (which carries the dive certificate). Without script the form does nothing. */
export function PostcardForm() {
  const html = `<style>${STYLE}</style>${FORM}<script>${postcardScript()}</script>`;
  return <Html html={html} text={POSTCARD.heading} />;
}

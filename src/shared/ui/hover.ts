import { colors } from "@/shared/theme/tokens";

/**
 * Hover for every link, button, tier card and share icon on the page. One rule for all: a small lift,
 * a brighter face and the yellow halo. Only for a pointer that can hover, so a tap never leaves one stuck;
 * the focus rings are untouched. Classes: btn (buttons), sh-icon, cd-open, flink (footer links).
 */
export const HOVER_CSS = `
@media (hover:hover){
.btn,#tiers>*,.sh-icon,.cd-open,.flink,#cd .go,#cd .no,#cd .x,#top .go,#snd{transition:translate .2s ease,filter .2s ease,box-shadow .2s ease,background-color .2s ease,opacity .3s ease,visibility .3s}
.btn:hover,.sh-icon:hover,.cd-open:hover,#cd .go:hover,#cd .no:hover,#snd:hover{translate:0 -2px;filter:brightness(1.15);box-shadow:0 6px 18px ${colors.glowHaloInner}}
#tiers>*:hover{translate:0 -4px;box-shadow:0 0 0 2px ${colors.cyan},0 14px 30px ${colors.glowHaloInner}}
.btn:active,.sh-icon:active,.cd-open:active,#cd .go:active,#cd .no:active,#snd:active,#tiers>*:active{translate:0 0}
#cd .x:hover{filter:brightness(1.3)}
.flink:hover{translate:4px 0;color:${colors.white} !important}
#top .go:hover{translate:0 3px}
}
@media (prefers-reduced-motion:reduce){.btn,#tiers>*,.sh-icon,.cd-open,.flink,#cd .go,#cd .no,#cd .x,#top .go,#snd{transition:none}.btn:hover,.sh-icon:hover,.cd-open:hover,#cd .go:hover,#cd .no:hover,#snd:hover,#tiers>*:hover,.flink:hover,#top .go:hover{translate:0 0}}
`;

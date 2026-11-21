import { LAYERS } from "@/shared/theme/layers";
import { colors } from "@/shared/theme/tokens";

/** The speaker button, fixed top-right below the header. It shows only while the diver does (the same `on` as the dive computer). Waves show while the sound is on; a slash while it is off. The dive script finds #snd and wires it (dive-computer/script.ts). */
export const SOUND_STYLE = `
#snd{position:fixed;z-index:${LAYERS.control};top:64px;right:16px;display:flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;box-sizing:border-box;border:2px solid ${colors.aqua};border-radius:10px;background:${colors.abyss};color:${colors.aqua};cursor:pointer}
#snd[hidden]{display:none}
#snd:not(.on){visibility:hidden;opacity:0;pointer-events:none}
#snd.on{opacity:1}
#snd svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#snd[aria-pressed=true] .off,#snd[aria-pressed=false] .on{display:none}
`;

/** Hidden until the script runs, so a page without script shows no dead button. */
export const SOUND_BUTTON = `<button id="snd" type="button" hidden aria-pressed="true" aria-label="Dive sound" title="Dive sound"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><g class="on"><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></g><path class="off" d="M17 9l5 6M22 9l-5 6"/></svg></button>`;

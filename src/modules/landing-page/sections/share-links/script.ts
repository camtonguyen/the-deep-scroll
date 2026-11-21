import { SHARE } from "@/shared/data/site";
import { NAME_MAX } from "@/shared/lib/visitor";

/** Share links carry `?name=` (read from the postcard form, if filled) so the card shows the visitor. The links are set when the visitor reaches for them. */
export function shareScript(): string {
  return `(function(){
var S=${JSON.stringify({ ...SHARE, nameMax: NAME_MAX })};
var name=function(){var n=document.getElementById('pc-name');return n?n.value.replace(/\\s+/g,' ').trim().slice(0,S.nameMax):''};
var q=function(){var n=name();return n?'?name='+encodeURIComponent(n):''};
var link=function(){return location.origin+location.pathname+q()};
function set(el){
  var a=el.closest&&el.closest('[data-sh]');if(!a)return a;
  if(a.dataset.sh==='linkedin')a.href=S.linkedin+encodeURIComponent(link());
  if(a.dataset.sh==='card')a.href=S.cardRoute+q();
  return a
}
['pointerdown','focusin'].forEach(function(t){document.addEventListener(t,function(ev){set(ev.target)})});
})();`;
}

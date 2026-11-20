import { MAX_DEPTH, SCALE, SEA_HEIGHT } from "@/shared/lib/sea";
import { METRES_PER_ATM } from "@/shared/lib/format";
import { LIGHT, TEMPERATURES } from "@/shared/lib/readout";

/** Everything the script needs, from the shared scale and tables: nothing is retyped in the script. */
export const DIVE_DATA = {
  scale: SCALE,
  max: MAX_DEPTH,
  seaHeight: SEA_HEIGHT,
  temps: TEMPERATURES,
  light: LIGHT,
  metresPerAtm: METRES_PER_ATM,
  /** The headlamp comes on where the light goes dim. */
  lampDepth: LIGHT[1][0],
};

/** The maths, as plain JS (it runs in the browser). `D` is DIVE_DATA. Tested against shared/lib. */
export const MATHS = `
function yToDepth(y){var top=0,S=D.scale;for(var i=0;i<S.length;i++){var b=top+(S[i][1]-S[i][0])*S[i][2];if(y<=b)return S[i][0]+(y-top)/S[i][2];top=b}return D.max}
function temp(d){var T=D.temps;for(var i=1;i<T.length;i++)if(T[i][0]>=d)return T[i-1][1]+(T[i][1]-T[i-1][1])*(d-T[i-1][0])/(T[i][0]-T[i-1][0]);return T[T.length-1][1]}
function light(d){var L=D.light,r=L[0][1];for(var i=0;i<L.length;i++)if(d>=L[i][0])r=L[i][1];return r}
function atm(d){return 1+d/D.metresPerAtm}
`;

/**
 * Scroll position → the depth line at mid-screen → the counter and the diver, as on neal.fun/space-elevator:
 * the diver and counter are fixed, the sea scrolls past, and nothing lags. One passive scroll listener; the
 * frame is drawn once per animation frame at most.
 */
export function diveScript(): string {
  return `(function(){
var D=${JSON.stringify(DIVE_DATA)};
${MATHS}
var $=function(id){return document.getElementById(id)};
var panel=$('dc'),diver=$('dc-diver'),sea=$('dive'),mob=$('dive-mobile'),end=$('the-bottom');
var out={d:$('dc-depth'),t:$('dc-temp'),p:$('dc-atm'),l:$('dc-light')};
var fmt=function(n){return Math.round(n).toLocaleString('en-US')};
var raf=0,shown=false,lit=false,up=false,py=0,last={};
function put(k,v){if(last[k]!==v){last[k]=v;out[k].textContent=v}}
function measure(){
  var mid=innerHeight/2;
  if(sea&&sea.offsetParent!==null){var r=sea.getBoundingClientRect();return{y:mid-r.top,on:r.top<mid&&mid-r.top<D.seaHeight}}
  if(mob&&end){var t=mob.getBoundingClientRect().top,b=end.getBoundingClientRect().top;return{y:(mid-t)/(b-t)*D.seaHeight,on:t<mid&&b>mid}}
  return{y:0,on:false}
}
function frame(){
  raf=0;
  var m=measure(),d=Math.max(0,Math.min(D.max,yToDepth(m.y)));
  put('d',fmt(d)+' m');put('t',Math.round(temp(d))+' °C');put('p',fmt(atm(d))+' atm');put('l',light(d));
  if(m.on!==shown){shown=m.on;panel.classList.toggle('on',shown);diver.classList.toggle('on',shown)}
  if(m.y!==py){var u=m.y<py;py=m.y;if(u!==up){up=u;diver.classList.toggle('up',up)}}
  var l=d>=D.lampDepth;if(l!==lit){lit=l;diver.classList.toggle('lit',lit)}
}
function kick(){if(!raf)raf=requestAnimationFrame(frame)}
addEventListener('scroll',kick,{passive:true});addEventListener('resize',kick);kick();
})();`;
}

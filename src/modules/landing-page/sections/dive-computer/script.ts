import { MARINE_SNOW_HEIGHT } from "@/shared/art";
import { SOUND } from "@/shared/data/site";
import { STOPS } from "@/shared/data/stops";
import { depthToY, MAX_DEPTH, SCALE, SEA_HEIGHT } from "@/shared/lib/sea";
import { METRES_PER_ATM } from "@/shared/lib/format";
import { atmAt, lightAt, scaleToDepth, tempAt } from "@/shared/lib/portable";
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
  /** Where the stops sit on the sea (px from the surface): the wheel slows a little as the diver passes each. */
  stopYs: STOPS.map((stop) => depthToY(stop.depth) + (stop.nudge ?? 0)),
  slowZone: 140,
  slowMin: 0.55,
  /** The water darkens (a flat veil, up to `tintMax`) over the first `tintDepth` m. */
  tintDepth: 1000,
  tintMax: 0.2,
  snowHeight: MARINE_SNOW_HEIGHT,
  /** How the dive feels. Times in ms, speeds in px/s, tilt in degrees. */
  feel: {
    /** Scrolling counts as moving for this long after the last scroll event. */
    moveMs: 120,
    /** The measured speed follows the real one with this time constant. */
    speedTau: 120,
    /** The sound fades in and out with this time constant (about 200 ms to settle). */
    fadeTau: 70,
    /** The mouse wheel glides to its target with this time constant. */
    glideTau: 110,
    /** The diver's tilt follows speed with this time constant, up to tiltMax at tiltSpeed. */
    tiltTau: 220,
    tiltMax: 10,
    tiltSpeed: 1500,
    /** Below this speed the sound is off; it is `floor` quiet at once and full at `fullSpeed`. */
    silentBelow: 5,
    floor: 0.35,
    fullSpeed: 1200,
    /** Marine snow drifts against the scroll: `snowBase` of the scroll, more with depth up to `snowBase + snowGain` at `snowDepth`. */
    snowBase: 0.12,
    snowGain: 0.2,
    snowDepth: 4000,
  },
  sound: { src: SOUND.route, key: SOUND.storageKey },
};

/** The maths, as plain JS (it runs in the browser). `D` is DIVE_DATA. The shared rules are pasted in from shared/lib/portable; the rest is only here. */
export const MATHS = `
${scaleToDepth}${tempAt}${lightAt}${atmAt}
function yToDepth(y){return scaleToDepth(y,D.scale,D.max)}
function temp(d){return tempAt(d,D.temps)}
function light(d){return lightAt(d,D.light)}
function atm(d){return atmAt(d,D.metresPerAtm)}
function loud(v){var f=D.feel;return v<f.silentBelow?0:Math.min(1,f.floor+(1-f.floor)*v/f.fullSpeed)}
function slow(y){var S=D.stopYs,m=1e9;for(var i=0;i<S.length;i++)m=Math.min(m,Math.abs(y-S[i]));return m>=D.slowZone?1:D.slowMin+(1-D.slowMin)*m/D.slowZone}
function tint(d){return D.tintMax*Math.min(1,d/D.tintDepth)}
function approach(c,t,dt,tau){return c+(t-c)*(1-Math.exp(-dt/tau))}
`;

/**
 * One scroll position drives everything, as on neal.fun/space-elevator: the diver and counter are fixed, the sea
 * scrolls past. The counter reads the real scroll position, so it is never behind. Around it:
 *  - a mouse wheel glides (eased) and slows a little at each stop; touch and keys keep the browser's own scrolling;
 *  - the water darkens with depth, the diver tilts with its speed and blows bubbles while moving, marine snow drifts faster;
 *  - the bubble sound plays only while the diver is moving in the sea: it fades in and out, and stops at the bottom.
 * One rAF loop, running only while something is moving. Reduced motion: no glide, tilt, bubbles or drift (the sound stays).
 */
export function diveScript(): string {
  return `(function(){
var D=${JSON.stringify(DIVE_DATA)};
${MATHS}
var $=function(id){return document.getElementById(id)};
var panel=$('dc'),diver=$('dc-diver'),veil=$('dc-tint'),btn=$('snd'),sea=$('dive'),mob=$('dive-mobile'),end=$('the-bottom');
var snow=document.querySelector('#dive svg[height="'+D.snowHeight+'"]');
var out={d:$('dc-depth'),t:$('dc-temp'),p:$('dc-atm'),l:$('dc-light')};
var fmt=function(n){return Math.round(n).toLocaleString('en-US')};
var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var raf=0,shown=false,lit=false,up=false,py=0,last={},tintNow=-1;
var wrote=0,prev=0,lastY=scrollY,lastMove=0,v=0,tilt=0,aim=null,snowC=null;
var audio=null,vol=0,muted=false,blocked=false,starting=false,onSea=false;
try{muted=localStorage.getItem(D.sound.key)==='off'}catch(e){}
function put(k,val){if(last[k]!==val){last[k]=val;out[k].textContent=val}}
function measure(){
  var mid=innerHeight/2;
  if(sea&&sea.offsetParent!==null){var r=sea.getBoundingClientRect();return{y:mid-r.top,on:r.top<mid&&mid-r.top<D.seaHeight,top:r.top+scrollY}}
  if(mob&&end){var t=mob.getBoundingClientRect().top,b=end.getBoundingClientRect().top;return{y:(mid-t)/(b-t)*D.seaHeight,on:t<mid&&b>mid,top:t+scrollY}}
  return{y:0,on:false,top:0}
}
function paintBtn(){if(btn){btn.hidden=false;btn.setAttribute('aria-pressed',String(!muted))}}
function toggle(){
  muted=!muted;paintBtn();try{localStorage.setItem(D.sound.key,muted?'off':'on')}catch(e){}
  kick()
}
function unlock(){if(blocked){blocked=false;kick()}}
function mix(now,dt,want){
  var goal=want?loud(v):0;
  vol=approach(vol,goal,dt,D.feel.fadeTau);
  if(!goal&&vol<.01){vol=0;if(audio&&!audio.paused)audio.pause();return}
  if(!audio){audio=new Audio(D.sound.src);audio.loop=true;audio.preload='auto'}
  audio.volume=Math.min(1,vol);
  if(goal&&audio.paused&&!starting&&!blocked){
    starting=true;
    var p=audio.play();
    if(p&&p.catch)p.then(function(){starting=false},function(){starting=false;blocked=true});else starting=false
  }
}
function frame(now){
  raf=0;
  var dt=Math.min(64,prev?now-prev:16);prev=now;
  var m=measure(),d=Math.max(0,Math.min(D.max,yToDepth(m.y)));
  put('d',fmt(d)+' m');put('t',Math.round(temp(d))+' °C');put('p',fmt(atm(d))+' atm');put('l',light(d));
  if(m.on!==shown){shown=m.on;panel.classList.toggle('on',shown);diver.classList.toggle('on',shown);if(btn)btn.classList.toggle('on',shown)}
  var dy=scrollY-lastY;lastY=scrollY;
  if(dy){lastMove=now;if(m.y!==py){var u=m.y<py;py=m.y;if(u!==up){up=u;diver.classList.toggle('up',up)}}}
  var moving=now-lastMove<D.feel.moveMs;
  v=approach(v,moving&&dt?Math.abs(dy)/dt*1000:0,dt,D.feel.speedTau);
  var l=d>=D.lampDepth;if(l!==lit){lit=l;diver.classList.toggle('lit',lit)}
  var tn=Math.round(tint(d)*200);if(tn!==tintNow){tintNow=tn;veil.style.opacity=tn/200}
  if(aim!==null&&Math.abs(scrollY-wrote)>3)aim=null;
  if(aim!==null){
    var s=approach(scrollY,aim,dt,D.feel.glideTau);
    if(Math.abs(aim-s)<1){s=aim;aim=null}
    wrote=s;scrollTo({top:s,behavior:'instant'})
  }
  if(!calm){
    tilt=approach(tilt,moving&&dy?Math.max(-1,Math.min(1,dy/dt*1000/D.feel.tiltSpeed))*D.feel.tiltMax:0,dt,D.feel.tiltTau);
    diver.style.rotate=tilt.toFixed(1)+'deg';
    diver.classList.toggle('mv',moving&&shown);
    if(snow){
      if(snowC===null)snowC=snow.getBoundingClientRect().top-(sea.getBoundingClientRect().top)+snow.offsetHeight/2-(parseFloat(snow.dataset.off)||0);
      var off=m.on?-(m.y-snowC)*(D.feel.snowBase+D.feel.snowGain*Math.min(1,d/D.feel.snowDepth)):0;
      snow.dataset.off=off;snow.style.transform='translateY('+off.toFixed(0)+'px)'
    }
  }
  mix(now,dt,m.on&&moving&&!muted&&!document.hidden);
  if(moving||v>1||vol>0||aim!==null||Math.abs(tilt)>.05){raf=requestAnimationFrame(frame)}else prev=0
}
function kick(){if(!raf)raf=requestAnimationFrame(frame)}
if(!calm&&matchMedia('(pointer:fine)').matches){
  addEventListener('wheel',function(e){
    var t=e.target;
    if(e.ctrlKey||!e.deltaY||e.deltaMode!==0||(t.closest&&t.closest('dialog[open]')))return;
    e.preventDefault();
    var m=measure(),cur=aim===null?(wrote=scrollY):aim;
    var k=m.on?slow(cur+innerHeight/2-m.top):1;
    aim=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,cur+e.deltaY*k));
    kick()
  },{passive:false});
  ['keydown','pointerdown','touchstart'].forEach(function(n){addEventListener(n,function(){aim=null},{passive:true})})
}
['pointerdown','keydown','touchend'].forEach(function(n){addEventListener(n,unlock,{passive:true})});
if(btn)btn.addEventListener('click',toggle);
document.addEventListener('visibilitychange',function(){if(document.hidden&&audio){audio.pause();vol=0}else kick()});
addEventListener('scroll',kick,{passive:true});addEventListener('resize',function(){snowC=null;kick()});
paintBtn();kick();
})();`;
}

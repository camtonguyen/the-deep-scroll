import { CONTROL_CHARS, EMAIL_MAX, EMAIL_PATTERN, MESSAGES, NAME_MAX } from "@/shared/lib/visitor";
import { POSTCARD } from "@/shared/data/site";

/** The form's rules, from the same constants the server uses: nothing is retyped in the script. */
const FORM_DATA = {
  nameMax: NAME_MAX,
  emailMax: EMAIL_MAX,
  control: CONTROL_CHARS.source,
  email: EMAIL_PATTERN.source,
  messages: MESSAGES,
  text: POSTCARD,
  route: "/api/welcome",
};

/** Check the two fields, POST them to /api/welcome, show the answer. Errors show next to the field. */
export function postcardScript(): string {
  return `(function(){
var D=${JSON.stringify(FORM_DATA)};
var $=function(id){return document.getElementById(id)};
var form=$('pc-form');if(!form)return;
var f={name:$('pc-name'),email:$('pc-email')},status=$('pc-status'),send=$('pc-send'),busy=false;
var control=new RegExp(D.control,'g'),email=new RegExp(D.email);
var clean=function(s){return String(s).replace(control,' ').replace(/\\s+/g,' ').trim()};
function say(t,bad){status.textContent=t;status.className=bad?'bad':''}
function show(errors){
  ['name','email'].forEach(function(k){
    var m=errors&&errors[k];$('pc-'+k+'-err').textContent=m||'';f[k].setAttribute('aria-invalid',m?'true':'false')
  });
  var first=errors&&['name','email'].filter(function(k){return errors[k]})[0];if(first)f[first].focus({preventScroll:true})
}
function check(){
  var v={name:clean(f.name.value),email:clean(f.email.value)},e={};
  if(!v.name)e.name=D.messages.nameRequired;else if(v.name.length>D.nameMax)e.name=D.messages.nameLong;
  if(!v.email)e.email=D.messages.emailBad;else if(v.email.length>D.emailMax)e.email=D.messages.emailLong;else if(!email.test(v.email))e.email=D.messages.emailBad;
  return{v:v,e:e,ok:!Object.keys(e).length}
}
form.addEventListener('submit',function(ev){
  ev.preventDefault();if(busy)return;say('');
  var c=check();show(c.e);if(!c.ok)return;
  busy=true;send.disabled=true;say(D.text.sending);
  fetch(D.route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(c.v)})
    .then(function(r){return r.json().catch(function(){return{}}).then(function(j){
      if(r.ok&&j.sent===false)say(j.message||D.text.failed,true);
      else if(r.ok){say(D.text.success);form.reset()}
      else if(j.errors){show(j.errors);say('')}
      else say(j.error||D.text.failed,true)
    })})
    .catch(function(){say(D.text.offline,true)})
    .then(function(){busy=false;send.disabled=false})
});
})();`;
}

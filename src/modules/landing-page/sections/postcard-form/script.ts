import { checkVisitor } from "@/shared/lib/portable";
import { VISITOR_RULES } from "@/shared/lib/visitor-form";
import { POSTCARD } from "@/shared/data/site";

/** The form's rules, from the same object and the same function the server runs: nothing is retyped in the script. */
const FORM_DATA = { rules: VISITOR_RULES, text: POSTCARD, route: "/api/welcome" };

/** Check the two fields, POST them to /api/welcome, show the answer. Errors show next to the field. */
export function postcardScript(): string {
  return `(function(){
var D=${JSON.stringify(FORM_DATA)};
var checkVisitor=${checkVisitor};
var $=function(id){return document.getElementById(id)};
var form=$('pc-form');if(!form)return;
var f={name:$('pc-name'),email:$('pc-email')},status=$('pc-status'),send=$('pc-send'),busy=false;
function say(t,bad){status.textContent=t;status.className=bad?'bad':''}
function show(errors){
  ['name','email'].forEach(function(k){
    var m=errors&&errors[k];$('pc-'+k+'-err').textContent=m||'';f[k].setAttribute('aria-invalid',m?'true':'false')
  });
  var first=errors&&['name','email'].filter(function(k){return errors[k]})[0];if(first)f[first].focus({preventScroll:true})
}
function check(){var r=checkVisitor({name:f.name.value,email:f.email.value},'',D.rules,true);return r.ok?{v:r.value,e:{},ok:true}:{v:null,e:r.errors,ok:false}}
form.addEventListener('submit',function(ev){
  ev.preventDefault();if(busy)return;say('');
  var c=check();show(c.e);if(!c.ok)return;
  busy=true;send.disabled=true;say(D.text.sending);
  fetch(D.route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:c.v.name,email:c.v.email})})
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

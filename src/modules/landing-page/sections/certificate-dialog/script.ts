import { CONTROL_CHARS, DATE_MAX, EMAIL_MAX, EMAIL_PATTERN, MESSAGES, NAME_MAX } from "@/shared/lib/visitor";

/** The form's rules, from the same constants the server uses: nothing is retyped in the script. */
export const FORM_DATA = {
  nameMax: NAME_MAX,
  emailMax: EMAIL_MAX,
  dateMax: DATE_MAX,
  control: CONTROL_CHARS.source,
  email: EMAIL_PATTERN.source,
  messages: MESSAGES,
  route: "/api/certificate",
  welcomeRoute: "/api/welcome",
};

/** Open the dialog (from the button or any `#certificate` link), check the form, POST it, save the PDF. Errors show next to the field. */
export function certificateScript(): string {
  return `(function(){
var D=${JSON.stringify(FORM_DATA)};
var $=function(id){return document.getElementById(id)};
var dlg=$('cd');if(!dlg||!dlg.showModal)return;
var at=[0,0],form=$('cd-form'),f={name:$('cd-name'),email:$('cd-email'),date:$('cd-date')},status=$('cd-status'),send=$('cd-send'),opener=null,busy=false;
var control=new RegExp(D.control,'g'),email=new RegExp(D.email);
var clean=function(s){return String(s).replace(control,' ').replace(/\\s+/g,' ').trim()};
var today=function(){return new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})};
function show(errors){
  ['name','email','date'].forEach(function(k){
    var m=errors&&errors[k];$('cd-'+k+'-err').textContent=m||'';f[k].setAttribute('aria-invalid',m?'true':'false')
  });
  var first=errors&&['name','email','date'].filter(function(k){return errors[k]})[0];if(first)f[first].focus({preventScroll:true})
}
function check(){
  var v={name:clean(f.name.value),email:clean(f.email.value),date:clean(f.date.value)||today()},e={};
  if(!v.name)e.name=D.messages.nameRequired;else if(v.name.length>D.nameMax)e.name=D.messages.nameLong;
  if(v.email.length>D.emailMax)e.email=D.messages.emailLong;else if(v.email&&!email.test(v.email))e.email=D.messages.emailBad;
  if(v.date.length>D.dateMax)e.date=D.messages.dateLong;
  return{v:v,e:e,ok:!Object.keys(e).length}
}
function done(){setTimeout(function(){dlg.close()},2500)}
function welcome(v){
  say('Your certificate is downloading. Sending your welcome email…');
  return fetch(D.welcomeRoute,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:v.name,email:v.email})})
    .then(function(r){return r.json().catch(function(){return{}}).then(function(j){
      if(r.ok){say('Your certificate is downloading. '+(j.message||'Welcome email on its way.'));done()}
      else if(j.errors&&j.errors.email){show(j.errors);say('Your certificate downloaded, but we could not send the email.',true)}
      else say('Your certificate downloaded. '+(j.error||'The welcome email could not be sent.'),true)
    })},function(){say('Your certificate downloaded. The welcome email could not be sent.',true)})
}
function say(t,bad){status.textContent=t;status.className=bad?'bad':''}
function open(ev){ev&&ev.preventDefault();at=[scrollX,scrollY];opener=document.activeElement;if(!f.date.value)f.date.value=today();say('');show(null);dlg.showModal();f.name.focus({preventScroll:true});scrollTo({left:at[0],top:at[1],behavior:'instant'})}
function save(blob){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='dive-certificate.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},4000)}
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('#cd-open,a[href="#certificate"]');if(t)open(ev)});
$('cd-close').addEventListener('click',function(){dlg.close()});$('cd-x').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('click',function(ev){if(ev.target===dlg&&!busy)dlg.close()});
dlg.addEventListener('close',function(){if(opener&&opener.focus)opener.focus({preventScroll:true});scrollTo({left:at[0],top:at[1],behavior:'instant'})});
if(location.hash==='#certificate')open();
form.addEventListener('submit',function(ev){
  ev.preventDefault();if(busy)return;say('');
  var c=check();show(c.e);if(!c.ok)return;
  busy=true;send.disabled=true;say('Making your certificate…');
  fetch(D.route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(c.v)})
    .then(function(r){
      if(r.ok)return r.blob().then(function(b){save(b);say('Your certificate is downloading. Well done.');return c.v.email?welcome(c.v):done()});
      return r.json().then(function(j){if(j.errors){show(j.errors);say('')}else say(j.error||'Something went wrong. Try again.',true)},function(){say('Something went wrong. Try again.',true)})
    })
    .catch(function(){say('Could not reach the server. Check your connection and try again.',true)})
    .then(function(){busy=false;send.disabled=false})
});
})();`;
}

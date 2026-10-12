const R=$('#root');let D,tab='Profile';
const P=[['name','Name'],['tagline','Tagline','t'],['college','College'],['about','About','t'],['email','Email'],['github','GitHub URL'],['linkedin','LinkedIn URL'],['resume','Resume URL (or upload below)','f']];
const TABS={Profile:{f:P,lists:[['roles','Typing roles (one per line)'],['skills','Skills (one per line)'],['learning','Currently learning (one per line)']]},
Projects:{k:'projects',f:[['title','Title'],['tag','Type'],['tech','Tech (comma separated)'],['desc','Description','t'],['repo','Repo URL'],['live','Live URL']]},
Journey:{k:'journey',f:[['title','Title'],['org','Organisation'],['period','Period'],['desc','Description','t']]},
Certificates:{k:'certs',f:[['title','Certificate title'],['issuer','Issued by'],['year','Year'],['file','Certificate image/PDF','f']]},
FAQ:{k:'faqs',f:[['q','Question'],['a','Answer','t']]},
Profiles:{k:'profiles',f:[['name','Platform'],['url','URL'],['note','Note']]}};
function fld(o,[k,l,t]){const wrap=h('div',{},h('label',{},l));const e=t==='t'?h('textarea'):h('input');e.value=o[k]||'';e.oninput=()=>o[k]=e.value;wrap.append(e);
 if(t==='f'){const f=h('input',{type:'file'}),s=h('small',{});f.onchange=async()=>{const x=f.files[0];if(!x)return;s.textContent='Uploading...';const path=Date.now()+'-'+x.name.replace(/[^\w.-]/g,'_');const{error}=await sb.storage.from('uploads').upload(path,x);if(error){s.textContent='Upload failed: '+error.message;return}e.value=o[k]=sb.storage.from('uploads').getPublicUrl(path).data.publicUrl;s.textContent='Uploaded. Press Save.'};wrap.append(f,s)}return wrap}
function ta(key,l){const w=h('div',{},h('label',{},l)),e=h('textarea');e.value=(D[key]||[]).join('\n');e.oninput=()=>D[key]=e.value.split('\n').map(x=>x.trim()).filter(Boolean);w.append(e);return w}
function draw(){
 R.innerHTML='';const st=h('span',{class:'mu',style:'font-size:15px;margin-left:12px'},'');
 const nav=h('div',{class:'sb'},...Object.keys(TABS).map(t=>h('button',{class:t===tab?'on':'',onclick:()=>{tab=t;draw()}},t)),h('button',{onclick:()=>sb.auth.signOut().then(init)},'Logout'));
 const T=TABS[tab],mn=h('div',{class:'mn'},h('h2',{style:'font-size:36px'},tab));
 if(!T.k){T.f.forEach(f=>mn.append(fld(D,f)));T.lists.forEach(([k,l])=>mn.append(ta(k,l)))}
 else{D[T.k]=D[T.k]||[];D[T.k].forEach((it,i)=>{const b=h('div',{class:'it'},h('b',{},'#'+(i+1)));T.f.forEach(f=>b.append(fld(it,f)));b.append(h('p',{},h('button',{class:'b',onclick:()=>{D[T.k].splice(i,1);draw()}},'Delete'),' ',i?h('button',{class:'b',onclick:()=>{[D[T.k][i-1],D[T.k][i]]=[D[T.k][i],D[T.k][i-1]];draw()}},'↑'):''));mn.append(b)});
  mn.append(h('button',{class:'b',onclick:()=>{D[T.k].push({});draw()}},'+ Add'))}
 mn.append(h('p',{},h('button',{class:'b p',onclick:async()=>{st.textContent='Saving...';const{error}=await sb.from('site').upsert({id:1,data:D});st.textContent=error?'Error: '+error.message:'Saved! Live on your site.'}},'Save'),st,' ',h('a',{href:'index.html',class:'mu',style:'font-size:15px'},'View site')));
 R.append(h('div',{class:'ad'},nav,mn));
}
async function init(){
 R.innerHTML='';const{data:{session}}=await sb.auth.getSession();
 if(session&&session.user.email===CFG.adminEmail){D=await loadData();return draw()}
 const em=h('input',{value:CFG.adminEmail}),pw=h('input',{type:'password',placeholder:'Password'}),m=h('small',{});
 R.append(h('div',{class:'lg'},h('h2',{style:'font-size:32px;margin:0'},'Admin login'),em,pw,h('button',{class:'b p',onclick:async()=>{m.textContent='Signing in...';const{error}=await sb.auth.signInWithPassword({email:em.value,password:pw.value});error?m.textContent=error.message:init()}},'Login'),m));
}
init();

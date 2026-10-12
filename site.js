const $=s=>document.querySelector(s);
const h=(t,p={},...k)=>{const e=document.createElement(t);for(const a in p)a==='class'?e.className=p[a]:a==='onclick'?e.onclick=p[a]:e.setAttribute(a,p[a]);k.flat().forEach(c=>e.append(c));return e};
const safe=u=>/^(https?:|mailto:)/i.test(u||'')?u:'#';
const sb=window.supabase?supabase.createClient(CFG.url,CFG.key):null;
async function loadData(){try{const{data,error}=await sb.from('site').select('data').eq('id',1).single();if(error)throw error;return{...DEFAULT,...(data.data||{})}}catch(e){return DEFAULT}}
const GR=['#7c5cff,#18e0c1','#ff5c8a,#7c5cff','#18a0e0,#18e0c1','#ff9d4d,#ff5c8a'];
function typer(el,roles){let i=0,j=0,d=false;(function t(){const r=roles[i%roles.length]||'';j+=d?-1:1;el.textContent=r.slice(0,j);let w=d?35:70;if(!d&&j>=r.length){d=true;w=1400}else if(d&&j<=0){d=false;i++;w=300}setTimeout(t,w)})()}
const sec=(id,eb,t,...k)=>h('section',{id},h('div',{class:'eb'},eb),h('h2',{},t),...k);
function render(S){
 const n=S.name.split(' '),mail='mailto:'+S.email,A=$('#app'),role=h('b'),w=h('div',{class:'w'});
 A.append(h('nav',{},h('div',{class:'w'},h('a',{class:'logo',href:'#'},n[0],h('i',{},'.')),h('div',{class:'nl'},['about','projects','certificates','faq','contact'].map(x=>h('a',{href:'#'+x},x[0].toUpperCase()+x.slice(1)))))));
 w.append(h('div',{class:'hero'},h('span',{class:'pill'},'Open to learn & build'),h('h1',{},n[0],h('br'),h('span',{class:'gr'},n.slice(1).join(' '))),h('div',{class:'role'},role,h('span',{},'▍')),h('p',{class:'lead'},S.tagline),
  h('div',{class:'btns'},h('a',{class:'b p',href:'#projects'},'View my work'),h('a',{class:'b',href:safe(S.github),target:'_blank',rel:'noopener'},'GitHub'),h('a',{class:'b',href:safe(S.linkedin),target:'_blank',rel:'noopener'},'LinkedIn'),h('a',{class:'b',href:mail},'Email'),S.resume?h('a',{class:'b',href:safe(S.resume),target:'_blank',rel:'noopener'},'Resume'):''))); 
 w.append(sec('about','About','Curious by nature.',h('p',{class:'mu'},S.about),h('p',{class:'mu'},'🎓 '+S.college)));
 w.append(sec('skills','Skills','Tools I work with.',h('div',{class:'chips'},S.skills.map(s=>h('span',{class:'chip'},s)))));
 if(S.learning.length)w.append(sec('learning','Now','Currently learning.',h('div',{class:'chips'},S.learning.map(s=>h('span',{class:'chip'},'📘 '+s)))));
 w.append(sec('projects','Projects','Things I\'ve built.',h('div',{class:'grid'},S.projects.map((p,i)=>h('div',{class:'card'},h('div',{class:'ph',style:'background:linear-gradient(135deg,'+GR[i%4]+')'},String(i+1).padStart(2,'0')),h('div',{class:'cb'},h('h3',{},p.title),h('div',{class:'tg'},[p.tag,...(p.tech||'').split(',')].map(x=>x.trim()).filter(Boolean).map(x=>h('span',{},x))),h('p',{},p.desc),h('div',{class:'lk'},p.repo?h('a',{href:safe(p.repo),target:'_blank',rel:'noopener'},'Source ↗'):'',p.live?h('a',{href:safe(p.live),target:'_blank',rel:'noopener'},'Live ↗'):'')))))));
 if(S.journey.length)w.append(sec('journey','Journey','My journey.',h('div',{class:'tl'},S.journey.map(x=>h('div',{class:'ti'},h('small',{},x.period),h('h3',{},x.title),h('b',{},x.org),h('p',{},x.desc))))));
 w.append(sec('certificates','Certificates','Certificates.',S.certs.length?h('div',{class:'grid'},S.certs.map(c=>h('div',{class:'card'},/\.(png|jpe?g|webp|gif)$/i.test(c.file||'')?h('img',{src:safe(c.file),alt:c.title,loading:'lazy'}):'',h('div',{class:'cb'},h('h3',{},c.title),h('p',{},[c.issuer,c.year].filter(Boolean).join(' · ')),c.file?h('div',{class:'lk'},h('a',{href:safe(c.file),target:'_blank',rel:'noopener'},'View certificate ↗')):'')))):h('p',{class:'mu'},'Certificates coming soon.')));
 if(S.profiles.length)w.append(sec('profiles','Profiles','Find me online.',h('div',{class:'grid'},S.profiles.map(p=>h('a',{class:'card cb',href:safe(p.url),target:'_blank',rel:'noopener'},h('h3',{},p.name+' ↗'),h('p',{},p.note))))));
 if(S.faqs.length)w.append(sec('faq','FAQ','Questions & answers.',...S.faqs.map(f=>h('details',{},h('summary',{},f.q),h('p',{},f.a)))));
 const nm=h('input',{placeholder:'Your name'}),em=h('input',{placeholder:'Your email'}),ms=h('textarea',{placeholder:'Your message'});
 w.append(sec('contact','Contact','Let\'s build something.',h('div',{class:'ct'},h('p',{},'Have an idea or an opportunity? Send me a message.'),h('div',{class:'fm'},nm,em,ms,h('button',{class:'b p',onclick:()=>{if(!ms.value.trim())return ms.focus();location.href=mail+'?subject='+encodeURIComponent('Portfolio message from '+(nm.value||'a visitor'))+'&body='+encodeURIComponent(ms.value+'\n\n- '+nm.value+' ('+em.value+')')}},'Send message')))));
 A.append(w,h('footer',{},h('div',{class:'w'},h('span',{},'© '+new Date().getFullYear()+' '+S.name),h('a',{href:'admin.html'},'Admin'))));
 typer(role,S.roles);
}
if($('#app'))loadData().then(render);

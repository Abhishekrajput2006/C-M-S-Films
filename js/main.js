(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const hdr=$('.hdr');const sc=()=>hdr&&hdr.classList.toggle('solid',scrollY>60);sc();addEventListener('scroll',sc,{passive:true});
// mobile menu
const mn=$('.mnav'),sh=$('.shade');const tog=o=>{mn.classList.toggle('open',o);sh.classList.toggle('on',o)};
$$('[data-menu]').forEach(b=>b.addEventListener('click',()=>tog(true)));$('.mnav .x').addEventListener('click',()=>tog(false));sh.addEventListener('click',()=>tog(false));
// hero slider
const sl=$$('.hero .sl'),dots=$('.dots');let ci=0,tm;
if(sl.length){sl.forEach((_,i)=>{const d=document.createElement('i');d.onclick=()=>go(i);dots.appendChild(d)});
const cap=$('.hero .cap'),h1=$('.hero h1'),T=h1.dataset.t.split(';');
function anim(i){const [a,b]=T[i%T.length].split('|');let n=0;h1.innerHTML=[a,b].map(l=>l.split(' ').map(w=>`<span class="w"><i style="--d:${n++}">${w}</i></span>`).join(' ')).join('<br>');cap.classList.remove('go');void cap.offsetWidth;cap.classList.add('go')}
function go(i){ci=i;anim(i);sl.forEach((s,k)=>{s.classList.remove('on');if(k===i){void s.offsetWidth;s.classList.add('on')}});$$('i',dots).forEach((d,k)=>d.classList.toggle('on',k===i));clearInterval(tm);tm=setInterval(()=>go((ci+1)%sl.length),6000)}go(0)}
// portfolio filter
const fb=$$('.filters button');fb.forEach(b=>b.addEventListener('click',()=>{fb.forEach(x=>x.classList.remove('on'));b.classList.add('on');const f=b.dataset.f;$$('.grid .card').forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.cat!==f))}));
// lightbox
const figs=$$('.gal figure');
if(figs.length){const lb=document.createElement('div');lb.className='lb';lb.innerHTML='<button class="c" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><button class="n" aria-label="Next">›</button><div class="t"></div>';document.body.appendChild(lb);
let k=0;const im=$('img',lb),t=$('.t',lb);const show=i=>{k=(i+figs.length)%figs.length;const f=figs[k];im.src=f.dataset.full||$('img',f).src;im.alt=$('img',f).alt;t.textContent=($('figcaption',f)||{}).textContent||''};
figs.forEach((f,i)=>f.addEventListener('click',()=>{show(i);lb.classList.add('on')}));
$('.c',lb).onclick=()=>lb.classList.remove('on');$('.p',lb).onclick=()=>show(k-1);$('.n',lb).onclick=()=>show(k+1);lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('on')});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')show(k-1);if(e.key==='ArrowRight')show(k+1)})}
// quotes slider
const q=$$('.say [data-q]');if(q.length){let qi=0;const set=i=>{qi=(i+q.length)%q.length;$('.say q').textContent=q[qi].dataset.q;$('.say .who').textContent=q[qi].dataset.w};set(0);
$('.say .l').onclick=()=>set(qi-1);$('.say .r').onclick=()=>set(qi+1);setInterval(()=>set(qi+1),7000)}
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.rv').forEach(e=>io.observe(e));
// enquiry form -> WhatsApp (no backend needed)
$$('form[data-wa]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);
const m=`Hello CMS Films, I would like to enquire.%0AName: ${enc(d.get('name'))}%0APhone: ${enc(d.get('phone'))}%0AEmail: ${enc(d.get('email'))}%0ALocation: ${enc(d.get('place'))}%0ADate: ${enc(d.get('date'))}%0AService: ${enc(d.get('service'))}%0AMessage: ${enc(d.get('msg'))}`;
open('https://wa.me/916370920218?text='+m,'_blank')}));
function enc(v){return encodeURIComponent((v||'-').toString())}
$$('[data-y]').forEach(e=>e.textContent=new Date().getFullYear());
})();

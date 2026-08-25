(()=>{
'use strict';
const clean=s=>s.replace(/\s+/g,'');
const text=async path=>{const r=await fetch(path+'?v=hq4',{cache:'no-store'});if(!r.ok)throw new Error(path+' '+r.status);return clean(await r.text());};
const join=async paths=>clean((await Promise.all(paths.map(text))).join(''));
const setImage=async(selector,promise,mime)=>{const img=document.querySelector(selector);if(!img)return;try{const b64=await promise;img.src=`data:${mime};base64,${b64}`;await img.decode();img.dataset.hq='ok';}catch(err){console.error('HQ image load failed',selector,err);img.dataset.hq='error';}};
for(let i=1;i<=6;i++)setImage(`section[data-slide="${i-1}"] img`,text(`hq-final/slide${i}.b64`),'image/avif');
setImage('section[data-slide="6"] img',join(['asset-b64/assets1/0.txt','asset-b64/assets1/1.txt','asset-b64/assets1/2.txt']),'image/webp');
setImage('section[data-slide="7"] img',join(['asset-b64/assets2/0.txt','asset-b64/assets2/1.txt','asset-b64/assets2/2.txt']),'image/webp');
})();

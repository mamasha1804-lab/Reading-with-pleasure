(()=>{
const apps=['app/0.txt','app/1.txt','app/2.txt','app/3.txt'];
const assets={
 'assets/slide3.webp':['asset-b64/slide3/0.txt','asset-b64/slide3/1.txt','asset-b64/slide3/2.txt','asset-b64/slide3/3.txt'],
 'assets/slide4.webp':['asset-b64/slide4/0.txt','asset-b64/slide4/1.txt','asset-b64/slide4/2.txt','asset-b64/slide4/3.txt'],
 'assets/assets1.webp':['asset-b64/assets1/0.txt','asset-b64/assets1/1.txt','asset-b64/assets1/2.txt'],
 'assets/assets2.webp':['asset-b64/assets2/0.txt','asset-b64/assets2/1.txt','asset-b64/assets2/2.txt']
};
const get=async paths=>(await Promise.all(paths.map(f=>fetch(f).then(r=>{if(!r.ok)throw new Error(f);return r.text()})))).join('');
(async()=>{try{
 await Promise.all([...document.images].map(async img=>{const p=img.getAttribute('src'),parts=assets[p];if(parts){img.src='data:image/webp;base64,'+await get(parts);if(img.decode)await img.decode().catch(()=>{})}}));
 await Promise.all([...document.images].map(img=>img.complete?Promise.resolve():new Promise(res=>{img.addEventListener('load',res,{once:true});img.addEventListener('error',res,{once:true})})));
 const js=await get(apps);(0,eval)(js);
}catch(e){document.body.innerHTML='<main style="font-family:system-ui;padding:30px"><h1>English Mode</h1><p>Не удалось загрузить урок. Обновите страницу.</p><pre>'+String(e)+'</pre></main>'}})();
})();
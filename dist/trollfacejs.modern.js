const t="trollfacejs-v0.0.1";"undefined"!=typeof window&&(window.trollfacejs=(()=>{let e=null,o=null,r=null;return(async()=>{try{const e=window.localStorage.getItem(t);if(e)return e;const o=await fetch("https://raw.githubusercontent.com/nlswtlr/trollfacejs/master/src/assets/trollface.txt"),r=await o.text();return window.localStorage.setItem(t,r),r}catch(t){console.log(t)}})().then(t=>{r=t}).catch(t=>console.error(t)),{start:()=>{(()=>{const t=document.querySelector("body");t||console.error("could not find that body - wtf?!"),document.querySelector("#thetrollface")&&console.error("trollface is already attached!"),r||console.error("trollface was not fetch yet - lulz"),t.insertAdjacentHTML("beforeend",r),o=document.querySelector("#thetrollface"),(()=>{const t={position:"fixed",left:0,bottom:0,transform:{translate3d:{x:0,y:50}},opacity:1};let r=null,n="right";r||(r=t);const a=()=>{const l=o.getBoundingClientRect(),s=(i=r.transform.translate3d.x+l.width,"right"===(c=n)&&i>=window.innerWidth?"left":"left"===c&&i<=200?"right":c);var c,i;n=s,t.transform.translate3d.x="left"===n?r.transform.translate3d.x-18:r.transform.translate3d.x+18;const f={position:`${t.position}`,left:`${t.left}px`,bottom:`${t.bottom}`,transform:`translate3d(${t.transform.translate3d.x}px,${t.transform.translate3d.y}%,0)`,opacity:`${t.opacity}`};for(const t in f)o.style[t]=f[t];r=t,e=requestAnimationFrame(a)};e=requestAnimationFrame(a)})()})()},stop:()=>{cancelAnimationFrame(e),o.remove()}}})());

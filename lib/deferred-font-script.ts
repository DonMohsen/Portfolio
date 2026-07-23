import { IRANYEKAN_BASE, IRANYEKAN_DEFERRED } from "@/lib/iranyekan-weights";

/** Inline script — load remaining IRANYekan Fn weights after idle. */
export function getDeferredFontScript(): string {
  const deferred = JSON.stringify(IRANYEKAN_DEFERRED);
  const base = IRANYEKAN_BASE;

  return `(function(){var D=${deferred},BASE=${JSON.stringify(base)},FAMILY="IRANYekanFn";function loadOne(o){try{var face=new FontFace(FAMILY,'url("'+BASE+'/'+o.file+'") format("woff2")',{weight:o.weight,style:"normal",display:"swap"});return face.load().then(function(loaded){document.fonts.add(loaded)}).catch(function(){})}catch(e){return Promise.resolve()}}function loadDeferred(){D.forEach(loadOne)}function idle(cb){if(typeof requestIdleCallback==="function"){requestIdleCallback(cb,{timeout:8000});return}setTimeout(cb,2500)}function start(){setTimeout(function(){idle(loadDeferred)},1500)}if(document.readyState==="complete"){start()}else{window.addEventListener("load",start,{once:true})}})();`;
}

import {
  IRANYEKAN_BASE,
  IRANYEKAN_BOLD,
  IRANYEKAN_DEFERRED,
} from "@/lib/iranyekan-weights";

/** Inline script — no React client chunk for deferred font loading. */
export function getDeferredFontScript(): string {
  const deferred = JSON.stringify(IRANYEKAN_DEFERRED);
  const bold = JSON.stringify(IRANYEKAN_BOLD);
  const base = IRANYEKAN_BASE;

  return `(function(){var D=${deferred},B=${bold},BASE=${JSON.stringify(base)};function family(){try{var raw=getComputedStyle(document.documentElement).getPropertyValue("--font-iranyekan").trim();return raw.split(",")[0].replace(/['"]/g,"").trim()||null}catch(e){return null}}function loadOne(f,o,display){try{var face=new FontFace(f,'url("'+BASE+'/'+o.file+'") format("truetype")',{weight:o.weight,style:"normal",display:display||"optional"});return face.load().then(function(loaded){document.fonts.add(loaded)}).catch(function(){})}catch(e){return Promise.resolve()}}function loadDeferred(){var f=family();if(!f)return;D.forEach(function(o){loadOne(f,o,"optional")})}function loadBold(){var f=family();if(!f)return;loadOne(f,B,"swap")}function idle(cb){if(typeof requestIdleCallback==="function"){requestIdleCallback(cb,{timeout:12000});return}setTimeout(cb,3000)}var deferredDone=false;function scheduleDeferredWeights(){if(deferredDone)return;deferredDone=true;idle(loadDeferred)}var boldDone=false;function armBold(){if(boldDone)return;boldDone=true;idle(loadBold);window.removeEventListener("pointerdown",armBold);window.removeEventListener("keydown",armBold);window.removeEventListener("scroll",armBold)}window.addEventListener("pointerdown",armBold,{once:true,passive:true});window.addEventListener("keydown",armBold,{once:true});window.addEventListener("scroll",armBold,{once:true,passive:true});setTimeout(scheduleDeferredWeights,12000)})();`;
}

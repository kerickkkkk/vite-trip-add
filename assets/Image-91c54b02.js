import{m as r,b as a,c as n,n as o,p as i,k as m}from"./index-93194d17.js";const p=["src","alt"],u={key:1,class:"d-flex justify-content-center align-items-center w-100 h-100"},f={__name:"Image",props:{src:{type:String,default:""},className:{type:String,default:""},style:{type:Object,default:{}},alt:{type:String,default:""}},setup(l){const e=l,c=r(()=>{const t=Object.keys(e.style);return t.length>0?t.map(s=>`${s} : ${e.style[s]}`).join(" ;"):""});return(t,s)=>e.src!==""?(a(),n("img",{key:0,src:e.src,class:o(e.className),style:i(m(c)),alt:e.alt},null,14,p)):(a(),n("div",u," not found "))}};export{f as _};

import{k as c,i as m,f as p,g as h,r as v,o as f,c as g,e as n,a as t,b as d,t as l,w as x}from"./index-b3e54e60.js";import{a as k}from"./axios-a900fd7e.js";import{_ as w}from"./Image-7d277328.js";const b={class:"container"},N={class:"card mb-3"},$={class:"row g-0"},B={class:"col-md-4"},V={class:"col-md-8"},y={class:"card-body"},C={class:"card-title"},P={class:"card-text"},M={__name:"Product",setup(U){const i=c(),r="https://ttshop-server.onrender.com";c();const _=m("$swal"),o=p([]),u=()=>{const{id:a}=i.params;k.get(`${r}/products/${a}`).then(({data:s})=>{o.value=s}).catch(s=>{var e;console.dir(s),_((e=s==null?void 0:s.response)==null?void 0:e.data)})};return h(()=>{u()}),(a,s)=>{const e=v("router-link");return f(),g("div",null,[n(" 景點詳細 "),t("div",b,[t("div",N,[t("div",$,[t("div",B,[d(w,{src:o.value.imageUrl,className:"img-fluid rounded-start",alt:o.value.title},null,8,["src","alt"])]),t("div",V,[t("div",y,[t("h5",C,l(o.value.title),1),t("p",P,l(o.value.content),1),d(e,{to:"/products"},{default:x(()=>[n(" 返回列表 ")]),_:1})])])])])])])}}};export{M as default};
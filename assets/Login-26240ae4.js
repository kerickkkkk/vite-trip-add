import{p as h,i as w,f as c,r as g,o as k,c as x,a as o,q as m,v as d,e as p,b as y,w as V}from"./index-b3e54e60.js";import{a as N}from"./axios-a900fd7e.js";import{u as S}from"./users-35aa6e36.js";const B={class:"bg-light p-4"},C={class:"mb-3"},T=o("label",{for:"email",class:"form-label"},"信箱",-1),U={class:"mb-3"},$=o("label",{for:"password",class:"form-label"},"Password",-1),D={__name:"Login",setup(H){const n=S(),u=h(),_=w("$swal"),f="https://ttshop-server.onrender.com",a=c("admin@mail.com"),l=c("123456"),b=()=>{const i={email:a.value,password:l.value};N.post(`${f}/login`,i).then(({data:s})=>{var r;const{accessToken:t,user:e}=s,v={user:e,token:t};localStorage.setItem("ttshop",JSON.stringify(v)),n.user=e,n.token=t,u.push({name:`${(r=e==null?void 0:e.role)!=null&&r.includes("admin")?"admin":"app"}`})}).catch(s=>{var t;console.dir(s),_((t=s==null?void 0:s.response)==null?void 0:t.data)})};return(i,s)=>{const t=g("router-link");return k(),x("div",null,[o("form",B,[o("div",C,[T,m(o("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>a.value=e),type:"email",class:"form-control",id:"email","aria-describedby":"emailHelp"},null,512),[[d,a.value]])]),o("div",U,[$,m(o("input",{"onUpdate:modelValue":s[1]||(s[1]=e=>l.value=e),type:"password",class:"form-control",id:"password"},null,512),[[d,l.value]])]),o("button",{onClick:b,type:"submit",class:"btn btn-primary"},"送出"),o("div",null,[p("沒有帳號嗎？ "),y(t,{to:"/register"},{default:V(()=>[p("註冊去")]),_:1})])])])}}};export{D as default};

import{p as v,i as b,f as a,r as h,o as w,c as V,a as s,q as r,v as n,s as E,e as p,b as g,w as k}from"./index-b3e54e60.js";import{a as x}from"./axios-a900fd7e.js";const y=s("h2",null,"註冊",-1),B={class:"bg-light p-4"},R={class:"mb-3"},U=s("label",{for:"email",class:"form-label"},"信箱",-1),C={class:"mb-3"},D=s("label",{for:"password",class:"form-label"},"輸入密碼",-1),P={class:"mb-3"},T=s("label",{for:"confirmPassword",class:"form-label"},"輸入確認密碼",-1),A=["onClick"],S={__name:"Register",setup(L){const u=v(),i=b("$swal"),{VITE_BASE_URL:m}={VITE_BASE_URL:"https://ttshop-server.onrender.com",BASE_URL:"/vite-trip-add/",MODE:"production",DEV:!1,PROD:!0},t=a(""),l=a(""),d=a(""),_=()=>{const c={email:t.value,password:l.value};x.post(`${m}/register`,c).then(e=>{i("註冊成功!").then(()=>{u.push({name:"login"})})}).catch(e=>{i(e.response.data)})};return(c,e)=>{const f=h("router-link");return w(),V("div",null,[y,s("form",B,[s("div",R,[U,r(s("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>t.value=o),type:"email",class:"form-control",id:"email","aria-describedby":"emailHelp",placeholder:"請輸入信箱"},null,512),[[n,t.value]])]),s("div",C,[D,r(s("input",{"onUpdate:modelValue":e[1]||(e[1]=o=>l.value=o),type:"password",class:"form-control",id:"password",placeholder:"請輸入密碼"},null,512),[[n,l.value]])]),s("div",P,[T,r(s("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>d.value=o),type:"password",class:"form-control",id:"confirmPassword",placeholder:"請再次輸入"},null,512),[[n,d.value]])]),s("button",{onClick:E(_,["prevent"]),type:"submit",class:"btn btn-primary"},"送出",8,A),s("div",null,[p(" 有帳號嗎？ "),g(f,{to:"/login"},{default:k(()=>[p("登入")]),_:1})])])])}}};export{S as default};

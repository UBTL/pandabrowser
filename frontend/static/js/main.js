!function(e){function t(t){for(var n,c,o=t[0],i=t[1],u=t[2],m=0,f=[];m<o.length;m++)c=o[m],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&f.push(r[c][0]),r[c]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(s&&s(t);f.length;)f.shift()();return l.push.apply(l,u||[]),a()}function a(){for(var e,t=0;t<l.length;t++){for(var a=l[t],n=!0,o=1;o<a.length;o++){var i=a[o];0!==r[i]&&(n=!1)}n&&(l.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},r={0:0},l=[];function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var o=window.webpackJsonp=window.webpackJsonp||[],i=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var s=i;l.push([172,1]),a()}({121:function(e,t,a){e.exports={table:"_37EqdUbY",thead:"_1MtS1meH"}},124:function(e,t,a){e.exports={container:"_1SoVcTVT",total:"_1LLqocFh"}},170:function(e,t){e.exports={dbPath:"db",dbHost:"localhost",dbPort:3306,dbName:"panda",dbUser:"root",dbPass:"69",port:8880,cors:!1,corsOrigin:"*",webui:!0,webuiPath:"frontend",features:{personal:!1}}},172:function(e,t,a){e.exports=a(403)},2:function(e,t,a){e.exports={container:"_3-9VQfqo",coverWrap:"hhPx3rv5",cover:"W4DvY4tL",meta:"_12jj0_4S",metaSingleItem:"_3ZH36c3b",metaItem:"_1ta_wKV8",metaLabel:"_2OraVs29",metaValue:"_34Tw5ZWy",category:"_2c5_uep9 _13IVoRK_",main:"_3e3VgX4r",header:"_1h0HBybM",title:"_2YCabwxv",subtitle:"_2h0e6HjR",tags:"_2y-UWAeb",tagLine:"jKUT37sn",tagType:"_2iai6FUT",tagList:"Z9AyIeNx",content:"_PbvVRSI",note:"_2-hiuOD3",personal:"_2BytTkKl",checkbox:"_2aHvqEyw",torrentLink:"_1OEZ7m0n"}},403:function(e,t,a){"use strict";a.r(t);a(173),a(392);var n=a(0),r=a.n(n),l=a(167),c=a.n(l),o=a(171),i=a(119),u=a(47),s=a(120),m=a.n(s),f=[{name:"Doujinshi",value:2,color:"#9e2720"},{name:"Manga",value:4,color:"#db6c24"},{name:"Artist CG",value:8,color:"#d38f1d"},{name:"Game CG",value:16,color:"#617c63"},{name:"Western",value:512,color:"#ab9f60"},{name:"Non-H",value:256,color:"#5fa9cf"},{name:"Image Set",value:32,color:"#325ca2"},{name:"Cosplay",value:64,color:"#6a32a2"},{name:"Asian Porn",value:128,color:"#a23282"},{name:"Misc",value:1,color:"#777777"},{name:"private",value:1024,color:"#000000",visible:!1}],p=f.reduce((function(e,t){return e[t.name]=t,e}),{}),d=f,b=a(5),v=a.n(b),g=a(39),y=a.n(g),h=a(46),E=a.n(h);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l,c,o=[],i=!0,u=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;i=!1}else for(;!(i=(n=l.call(a)).done)&&(o.push(n.value),o.length!==t);i=!0);}catch(e){u=!0,r=e}finally{try{if(!i&&null!=a.return&&(c=a.return(),Object(c)!==c))return}finally{if(u)throw r}}return o}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(Object(a),!0).forEach((function(t){k(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function k(e,t,a){return(t=function(e){var t=function(e,t){if("object"!==O(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!==O(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===O(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var x=function(e){var t=e.options,a=void 0===t?{}:t,l=e.onSearch,c=e.onFileSearch,o={category:1023,keyword:"",expunged:1,replaced:0,removed:1,minpage:"",maxpage:"",minrating:"",limit:10,mindate:"",maxdate:"",advance:0,fileSearch:0,applyOptionsToFileSearch:0,personally:{have:!1,done:!1,want:!1}},i=JSON.parse(localStorage.getItem("searchOptions"))||{},u=w(w(w({},o),i),a),s=S(Object(n.useState)(+u.category),2),m=s[0],f=s[1],p=S(Object(n.useState)(u.keyword),2),b=p[0],g=p[1],h=S(Object(n.useState)(+u.expunged),2),O=h[0],j=h[1],N=S(Object(n.useState)(+u.replaced),2),x=N[0],_=N[1],P=S(Object(n.useState)(+u.removed),2),I=P[0],C=P[1],A=S(Object(n.useState)(u.minpage),2),D=A[0],M=A[1],L=S(Object(n.useState)(u.maxpage),2),T=L[0],F=L[1],V=S(Object(n.useState)(u.minrating),2),H=V[0],Y=V[1],R=S(Object(n.useState)(u.limit),2),U=R[0],B=R[1],K=S(Object(n.useState)(u.mindate),2),W=K[0],J=K[1],$=S(Object(n.useState)(u.maxdate),2),q=$[0],z=$[1],G=S(Object(n.useState)(+u.advance),2),Z=G[0],X=G[1],Q=S(Object(n.useState)(u.personally),2),ee=Q[0],te=Q[1],ae=S(Object(n.useState)(+u.fileSearch),2),ne=ae[0],re=ae[1],le=S(Object(n.useState)(!1),2),ce=le[0],oe=le[1],ie=!1,ue=function(e){if(e.getModifierState("Alt")){ie=!0;var t=+e.target.value;f(e.target.checked?1023:t)}},se=function(e){if(ie)ie=!1;else{var t=+e.target.value;f(m+(e.target.checked?t:-t))}},me=function(){return{category:m,keyword:b,expunged:O,replaced:x,removed:I,minpage:D,maxpage:T,minrating:H,limit:U,mindate:W,maxdate:q,advance:+Z,personally:ee}};return Object(n.useEffect)((function(){var e=w(w(w({},o),i),a);f(+e.category),g(e.keyword),j(+e.expunged),_(+e.replaced),C(+e.removed),M(e.minpage),F(e.maxpage),Y(e.minrating),B(e.limit),J(e.mindate),z(e.maxdate),X(+e.advance)}),[a]),r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{id:"imagePreview",src:"",alt:"Image Preview",className:v.a.imagePreview}),r.a.createElement("form",{className:v.a.container,onSubmit:function(e){e.preventDefault(),l&&l(me())}},r.a.createElement("div",{className:v.a.category},d.filter((function(e){return!1!==e.visible})).map((function(e){return r.a.createElement("label",{key:e.value,className:v.a.item},r.a.createElement("input",{type:"checkbox",checked:m&e.value,value:e.value,onChange:se,onClick:ue,className:v.a.checkbox}),r.a.createElement("span",{className:v.a.name,style:{background:e.color}},e.name))}))),r.a.createElement("div",{className:v.a.search},r.a.createElement("input",{value:b,onChange:function(e){g(e.target.value)},className:v.a.input}),r.a.createElement("button",{className:v.a.button},"Search")),r.a.createElement("div",{className:v.a.toggle},r.a.createElement("a",{onClick:function(){X(!Z)}},Z?"Hide Advanced Options":"Show Advanced Options"),r.a.createElement("span",null," | "),r.a.createElement("a",{onClick:function(){re(!ne)}},ne?"Hide File Search":"Show File Search"),r.a.createElement("span",null," | "),r.a.createElement("a",{onClick:function(e){localStorage.setItem("searchOptions",JSON.stringify(me())),e.target.classList.add(v.a.highlight),setTimeout((function(){e.target.classList.remove(v.a.highlight)}),2e3)}},"Save options as default")),Z?r.a.createElement("div",{className:v.a.advance},r.a.createElement("span",{className:v.a.advanceItem},r.a.createElement("label",null,"Show"),r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",checked:O,onChange:function(e){j(+e.target.checked)}}),"Expunged"),r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",checked:I,onChange:function(e){C(+e.target.checked)}}),"Removed"),r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",checked:x,onChange:function(e){_(+e.target.checked)}}),"Replaced")),E.a.isEnabled("personal")&&r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:v.a.advanceItem},r.a.createElement("label",null,"Personally"),Object.entries({have:"Have",done:"Read",want:"Want"}).map((function(e){var t,a=S(e,2),n=a[0],l=a[1];return r.a.createElement("label",{key:n},r.a.createElement("input",{type:"checkbox",checked:!!ee[n],onChange:(t=n,function(e){te(w(w({},ee),{},k({},t,e.target.checked)))})}),l)}))),r.a.createElement("span",{className:v.a.advanceItem})),r.a.createElement("label",{className:v.a.advanceItem},"Show",r.a.createElement("select",{value:U,onChange:function(e){B(+e.target.value)},className:v.a.select},new Array(5).fill("").map((function(e,t){return r.a.createElement("option",{value:5*(t+1),key:t},5*(t+1))}))),"galleries per page"),r.a.createElement("label",{className:v.a.advanceItem},"Minimum Rating",r.a.createElement("select",{value:H,onChange:function(e){Y(+e.target.value)},className:v.a.select},new Array(5).fill("").map((function(e,t){return r.a.createElement("option",{value:t+1,key:t},t+1)})))),r.a.createElement("label",{className:v.a.advanceItem},"Between",r.a.createElement("input",{type:"number",className:v.a.inputNumber,value:D,onChange:function(e){M(+e.target.value)}}),"and",r.a.createElement("input",{type:"number",className:v.a.inputNumber,value:T,onChange:function(e){F(+e.target.value)}}),"pages"),r.a.createElement("label",{className:v.a.advanceItem},"Post after",r.a.createElement("input",{type:"datetime-local",className:v.a.date,value:W?y()(1e3*W).format("YYYY-MM-DDTHH:mm"):"",onChange:function(e){J(Math.floor(y()(e.target.value).valueOf()/1e3))}})),r.a.createElement("label",{className:v.a.advanceItem},"Post before",r.a.createElement("input",{type:"datetime-local",className:v.a.date,value:q?y()(1e3*q).format("YYYY-MM-DDTHH:mm"):"",onChange:function(e){z(Math.floor(y()(e.target.value).valueOf()/1e3))}}))):null),ne?r.a.createElement("form",{className:v.a.container,onSubmit:function(e){if(e.preventDefault(),c){var t=document.getElementById("searchFile").files[0],a=new FormData;a.append("file",t),c(a,ce?me():void 0)}}},r.a.createElement("div",null,"Select a file to upload, then hit File Search. Similarity score is calculated and compared to all the known cover thumbnails."),r.a.createElement("div",{className:v.a.advance},r.a.createElement("label",{className:v.a.advanceItem},r.a.createElement("input",{type:"file",id:"searchFile",onChange:function(e){var t=e.target.files[0];if(t){var a=new FileReader;a.onload=function(e){var t=document.getElementById("imagePreview");t.src=e.target.result,t.style.display="block"},a.readAsDataURL(t)}}})),r.a.createElement("span",{className:v.a.advanceItem},r.a.createElement("span",{className:v.a.advanceItem},r.a.createElement("input",{type:"submit",value:"File Search"})),r.a.createElement("span",{className:v.a.advanceItem},r.a.createElement("label",{title:"Except pages and tags"},r.a.createElement("input",{type:"checkbox",onChange:function(e){oe(+e.target.checked)}})," Apply search options"))))):null)},_=function(e){for(var t=["B","KB","MB","GB","TB"],a=e;a>=1024;)a/=1024,t.shift();return"".concat(a.toFixed(2)," ").concat(t[0])},P=a(2),I=a.n(P),C=a(93),A=a.n(C),D=function(e){var t=e.half,a=void 0!==t&&t,n=e.full,l=void 0!==n&&n,c=e.onClick,o=void 0===c?void 0:c;return r.a.createElement("span",{onClick:o,className:"".concat(A.a.star," ").concat(a?A.a.half:l?A.a.full:"").trim()})};function M(){return(M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var L=function(e){var t=e.value,a=void 0===t?0:t,n=e.onClick,l=void 0===n?void 0:n,c=+a+1;return new Array(5).fill("").map((function(){return(c-=1)<.25?{}:c<.75?{half:!0}:{full:!0}})).map((function(e,t){return r.a.createElement(D,M({key:t,onClick:function(){return l&&l(t+1)}},e))}))},T=document.createElement("textarea"),F=function(e){return T.innerHTML=e,T.value},V=a(94),H=a.n(V),Y=function(e){var t=e.visible,a=e.onClose,n=e.children;return t?r.a.createElement("div",{className:H.a.container},r.a.createElement("div",{className:H.a.outer,onClick:a}),r.a.createElement("div",{className:H.a.content},n)):null},R=a(121),U=a.n(R),B=function(e){var t=e.torrents,a=e.gid;return r.a.createElement("table",{className:U.a.table},r.a.createElement("colgroup",null,r.a.createElement("col",{style:{width:"90px"}}),r.a.createElement("col",null),r.a.createElement("col",{style:{width:"100px"}}),r.a.createElement("col",{style:{width:"150px"}}),r.a.createElement("col",{style:{width:"130px"}})),r.a.createElement("thead",{className:U.a.thead},r.a.createElement("tr",null,r.a.createElement("th",null,"Torrent ID"),r.a.createElement("th",null,"File Name"),r.a.createElement("th",null,"File Size"),r.a.createElement("th",null,"Uploader"),r.a.createElement("th",null,"Upload Date"))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement("tr",{key:e.id||e.hash},r.a.createElement("td",null,e.id),r.a.createElement("td",null,r.a.createElement("a",{href:"magnet:?xt=urn:btih:".concat(e.hash,"&dn=").concat(encodeURIComponent(e.name)).concat(a?"tr=http%3a%2f%2fehtracker.org%2f".concat(a,"%2fannounce"):"")},e.name)),r.a.createElement("td",null,e.fsizestr),r.a.createElement("td",null,e.uploader),r.a.createElement("td",null,e.addedstr&&y()("".concat(e.addedstr,"+00:00")).format("YYYY-MM-DD HH:mm")))}))))};function K(e){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function W(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function J(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?W(Object(a),!0).forEach((function(t){$(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):W(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function $(e,t,a){return(t=function(e){var t=function(e,t){if("object"!==K(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!==K(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===K(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function q(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l,c,o=[],i=!0,u=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;i=!1}else for(;!(i=(n=l.call(a)).done)&&(o.push(n.value),o.length!==t);i=!0);}catch(e){u=!0,r=e}finally{try{if(!i&&null!=a.return&&(c=a.return(),Object(c)!==c))return}finally{if(u)throw r}}return o}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return z(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var G=Object(u.e)((function(e){var t=e.thumb,a=e.category,l=e.uploader,c=e.posted,o=e.expunged,i=e.removed,u=e.replaced,s=e.filesize,m=e.filecount,f=e.title,d=e.title_jpn,b=e.rating,v=e.tags,g=void 0===v?[]:v,h=e.gid,O=e.token,S=e.torrents,j=e.personal,N=e.onSearch,w=void 0===N?function(){}:N,k=e.onPersonal,x=void 0===k?function(){}:k,P=q(Object(n.useState)(!1),2),C=P[0],A=P[1],D=q(Object(n.useState)(!1),2),M=D[0],T=D[1],V=q(Object(n.useState)(j),2),H=V[0],R=V[1],U=q(Object(n.useState)((null==j?void 0:j.note)||""),2),K=U[0],W=U[1],$=function(){return A(!C)},z=function(e){R(J(J({},H),e)),x(J(J(J({},H),e),{},{gid:h}))},G={};g.forEach((function(e){var t=q(["misc"].concat(e.split(":",2)).slice(-2),2),a=t[0],n=t[1];G[a]||(G[a]=[]),G[a].push(n)}));var Z=(t.includes("/")||t.length<5?t:"pandathumbs/".concat(t.slice(0,2),"/").concat(t.slice(2,4),"/").concat(t)).replace(/_l\./,"_250.");return r.a.createElement("div",{className:I.a.container},r.a.createElement("div",{className:I.a.coverWrap},r.a.createElement("img",{src:Z,className:I.a.cover})),r.a.createElement("div",{className:I.a.meta},r.a.createElement("div",{className:I.a.metaSingleItem},r.a.createElement("div",{className:I.a.category,style:{background:p[a].color},onClick:function(){return w({category:p[a].value})}},a)),r.a.createElement("div",{className:I.a.metaSingleItem},r.a.createElement("a",{onClick:function(e){return w({keyword:"uploader:".concat(/\s/.test(l)?'"'.concat(l,'$"'):"".concat(l,"$"))},{append:e.ctrlKey})}},l)),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"Gallery ID:"),r.a.createElement("span",{className:I.a.metaValue},r.a.createElement("a",{title:"Search galleries belongs to the ID",onClick:function(e){e.ctrlKey?(e.preventDefault(),e.stopPropagation(),window.open("https://e".concat(e.altKey?"x":"-","hentai.org/g/").concat(h,"/").concat(O,"/"),"_blank","noreferrer")):w({keyword:"gid:".concat(h,"$")},{append:e.ctrlKey})}},h))),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"Token:"),r.a.createElement("span",{className:I.a.metaValue},O)),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"Posted:"),r.a.createElement("span",{className:I.a.metaValue},y()(1e3*c).format("YYYY-MM-DD HH:mm:ss"))),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"Visible:"),r.a.createElement("span",{className:I.a.metaValue},o?"No (Expunged)":i?"No (Removed)":u?"No (Replaced)":"private"===a.toLowerCase()?"No (Private)":"Yes")),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"File Size:"),r.a.createElement("span",{className:I.a.metaValue},_(s))),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"File Length:"),r.a.createElement("span",{className:I.a.metaValue},m," ",m>1?"pages":"page")),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"Torrents:"),r.a.createElement("span",{className:I.a.metaValue},r.a.createElement("a",{className:I.a.torrentLink,onClick:S.length?$:null,disabled:!S.length},S.length))),r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"Rating:"),r.a.createElement("span",{className:I.a.metaValue},r.a.createElement(L,{value:b}),b)),E.a.isEnabled("personal")&&r.a.createElement("div",{className:I.a.metaItem},r.a.createElement("span",{className:I.a.metaLabel},"My Rating:"),r.a.createElement("span",{className:I.a.metaValue},r.a.createElement(L,{value:null==H?void 0:H.rating,onClick:function(e){return z({rating:e})}}),null==H?void 0:H.rating)),j&&(E.a.isEnabled("personal")&&j?r.a.createElement("div",{className:I.a.personal},r.a.createElement("div",{className:I.a.metaSingleItem},r.a.createElement("label",{className:I.a.checkbox},r.a.createElement("input",{type:"checkbox",checked:!(null==H||!H.have),onChange:function(e){return z({have:e.target.checked})}}),r.a.createElement("span",null,"Have")),r.a.createElement("label",{className:I.a.checkbox},r.a.createElement("input",{type:"checkbox",checked:!(null==H||!H.done),onChange:function(e){return z({done:e.target.checked})}}),r.a.createElement("span",null,"Read")),r.a.createElement("label",{className:I.a.checkbox},r.a.createElement("input",{type:"checkbox",checked:!(null==H||!H.want),onChange:function(e){return z({want:e.target.checked})}}),r.a.createElement("span",null,"Want"))),r.a.createElement("div",{className:I.a.metaSingleItem},(null==H?void 0:H.have)&&r.a.createElement("a",{href:"panda://".concat(h)},"Open cbz"))):null)),r.a.createElement("div",{className:I.a.main},r.a.createElement("div",{className:I.a.header},r.a.createElement("h2",{className:I.a.title},F(f)),r.a.createElement("h3",{className:I.a.subtitle},F(d))),r.a.createElement("div",{className:I.a.content},r.a.createElement("div",{className:I.a.tags},Object.entries(G).map((function(e){var t=q(e,2),a=t[0],n=t[1];return r.a.createElement("div",{className:I.a.tagLine,key:a},r.a.createElement("div",{className:I.a.tagType},a,":"),r.a.createElement("div",{className:I.a.tagList},n.map((function(e){return r.a.createElement("a",{key:e,onClick:function(t){return w({keyword:"".concat("misc"===a?"":"".concat(a,":")).concat(/\s/.test(e)?'"'.concat(e,'$"'):"".concat(e,"$"))},{append:t.ctrlKey})}},e)}))))}))),E.a.isEnabled("personal")&&r.a.createElement("div",{className:I.a.note},r.a.createElement("a",{onClick:function(){return T(!M)}},M?"Cancel":"Edit note"),M?r.a.createElement(r.a.Fragment,null,r.a.createElement("textarea",{rows:5,cols:22,onChange:function(e){return W(e.target.value)},value:K}),r.a.createElement("a",{onClick:function(){z({note:K}),T(!1)}},"save")):K&&r.a.createElement("div",null,K)))),r.a.createElement(Y,{visible:C,onClose:$},r.a.createElement(B,{torrents:S,gid:h})))})),Z=a(95),X=a.n(Z);function Q(){return(Q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var ee=function(e){var t=e.list,a=void 0===t?[]:t,n=e.loading,l=void 0!==n&&n,c=e.onSearch,o=e.onPersonal;return r.a.createElement("div",{className:[X.a.container,l?X.a.loading:""].join(" ").trim()},a.map((function(e){return r.a.createElement("div",{className:X.a.item,key:e.gid},r.a.createElement(G,Q({},e,{onSearch:c,onPersonal:o})))})))},te=a(124),ae=a.n(te),ne=a(60),re=a.n(ne);function le(e){return function(e){if(Array.isArray(e))return ce(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return ce(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return ce(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ce(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var oe=function(e){var t,a=e.page,n=e.total,l=e.onChange,c=a-1,o=a+1;if(a<=4)t=new Array(Math.min(7,n)).fill("").map((function(e,t){return t+1})),n>7&&(n>8&&t.push("..."),t.push(n));else if(a>=n-3){var i=n-6;t=new Array(Math.min(7,n)).fill("").map((function(e,t){return n-t})).reverse(),i>1&&(i>2&&t.unshift("..."),t.unshift(1))}else t=[1,"..."].concat(le(new Array(5).fill("").map((function(e,t){return a-2+t}))),["...",n]);return r.a.createElement("div",{className:re.a.container},r.a.createElement("a",{className:1===a?re.a.disabled:"",onClick:function(){return l(c)}},"<"),t.map((function(e,t){return r.a.createElement("a",{className:[e===a?re.a.active:"",e===a?re.a.disabled:""].join(" "),disabled:e===a,onClick:function(){return l("..."===e?Math.min(Math.max(1,prompt("Jump to: (1-".concat(n,")"))||a),n):e)},key:t},e)})),r.a.createElement("a",{className:a===n?re.a.disabled:"",onClick:function(){return l(o)}},">"))};function ie(e){return(ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ue(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function se(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ue(Object(a),!0).forEach((function(t){me(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ue(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function me(e,t,a){return(t=function(e){var t=function(e,t){if("object"!==ie(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!==ie(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===ie(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function fe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l,c,o=[],i=!0,u=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;i=!1}else for(;!(i=(n=l.call(a)).done)&&(o.push(n.value),o.length!==t);i=!0);}catch(e){u=!0,r=e}finally{try{if(!i&&null!=a.return&&(c=a.return(),Object(c)!==c))return}finally{if(u)throw r}}return o}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return pe(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return pe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function pe(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var de=function(e){var t,a=e.history,l=fe(Object(n.useState)([]),2),c=l[0],o=l[1],i=fe(Object(n.useState)(!1),2),u=i[0],s=i[1],f=fe(Object(n.useState)(0),2),d=f[0],b=f[1],v=fe(Object(n.useState)(0),2),g=v[0],y=v[1],h=fe(Object(n.useState)(0),2),E=h[0],O=h[1],S=fe(Object(n.useState)(!1),2),j=S[0],N=S[1],w=Object(n.useRef)(),k=Object(n.useRef)(),_=m.a.parse(a.location.search.substr(1));"string"==typeof _.personally&&(_.personally=null===(t=_.personally)||void 0===t?void 0:t.split(",").reduce((function(e,t){return e[t]=!0,e}),{}));var P=_.page,I=void 0===P?1:P,C=_.limit,A=void 0===C?10:C,D=Math.ceil(d/+A),M=function(e){var t=Object.keys(e).sort().reduce((function(t,a){if(""!==e[a])if("personally"===a){var n=Object.keys(e[a]).filter((function(t){return e[a][t]}));n.length>0&&(t[a]=n.join(","))}else t[a]=e[a];return t}),{});a.push("/?".concat(m.a.stringify(t)))},L=function(e){M(se(se({},_),{},{page:e}))};return Object(n.useEffect)((function(){var e=document.querySelector("#imagePreview");e&&(e.style.display="none"),N(!0),s(!0),y(Date.now()),w.current&&w.current.abort();var t=new AbortController;w.current=t;var n=t.signal;fetch("/api/search".concat(a.location.search),{signal:n}).then((function(e){return e.json()})).then((function(e){var t=e.data,a=e.total,n=e.code,r=e.message;w.current=null,O(Date.now()),200===n?(o(t),b(a),s(!1),k.current&&k.current.scrollIntoView({behavior:"smooth",block:"nearest"})):alert("Request error: "+(r||"unknown"))})).catch((function(e){"AbortError"!==e.name&&(w.current=null,s(!1),alert("Request error: "+((e||{}).message||"unknown")))}))}),[a.location]),r.a.createElement("div",{className:ae.a.container},r.a.createElement(x,{options:_,onSearch:M,onFileSearch:function(e,t){N(!1),s(!0),y(Date.now()),fetch("/api/searchImage",{method:"POST",body:e}).then((function(e){if(s(!1),O(Date.now()),e.ok)return e.json();throw new Error("File upload failed")})).then((function(e){var a=e.data,n=t?a.filter((function(e){var a=new Date(1e3*e.posted),n=p[e.category].value;return t.category&n&&(!t.minrating||e.rating>=t.minrating)&&(!e.replaced||t.replaced)&&(!e.expunged||t.expunged)&&(!e.removed||t.removed)&&(!t.mindate||a>=new Date(1e3*+t.mindate))&&(!t.maxdate||a<=new Date(1e3*+t.maxdate))})):a;o(n),b(n.length)})).catch((function(e){console.error("Error:",e)}))}}),r.a.createElement("p",{className:ae.a.total,ref:k},u?"Loading...":"Matches ".concat(null==d?void 0:d.toLocaleString()," ").concat(d>1?"results":"result"),!u&&r.a.createElement("span",null," (",(E-g)/1e3," sec)")),c.length?r.a.createElement(r.a.Fragment,null,j&&r.a.createElement(oe,{page:+I,total:D,onChange:L}),r.a.createElement(ee,{list:c,loading:u,onSearch:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.append,n=se({},_);delete n.page,Object.keys(e).forEach((function(t){a?("keyword"===t&&e[t].startsWith("uploader:")&&n[t]&&(n[t]=n[t].replace(/\s*uploader:(?:"[\s\S]+?\$"|.+?\$)/,"")),n[t]=[n[t],e[t]].filter((function(e){return e})).join(" ")):n[t]=e[t]}),{}),M(n)},onPersonal:function(e){fetch("/api/personal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){console.log(e)}))}}),j&&r.a.createElement(oe,{page:+I,total:D,onChange:L})):null)},be=a(170),ve=a.n(be);E.a.initialize(ve.a.features);var ge=Object(o.hot)((function(){return r.a.createElement(i.a,null,r.a.createElement(u.a,{path:"/",component:de}))}));c.a.render(r.a.createElement(ge,null),document.getElementById("root"))},46:function(e,t){e.exports={get flags(){return JSON.parse(localStorage.getItem("featureFlags"))||{}},set flags(e){localStorage.setItem("featureFlags",JSON.stringify(e))},isEnabled:function(e){return!0===this.flags[e]},setFlag:function(e,t){this.flags[e]=t,localStorage.setItem("featureFlags",JSON.stringify(this.flags))},initialize:function(e){localStorage.setItem("featureFlags",JSON.stringify(e))}}},5:function(e,t,a){e.exports={container:"_2ij_qKOV",category:"_9334G8pj",item:"_19XdIk3S",checkbox:"_1ASBBxob",name:"_13IVoRK_",search:"_3uJ9Bks1",input:"_12rd_aeG",button:"_3QP0rwgA",advance:"_36usUk4W",advanceItem:"_3sz3mYjU",select:"_1xAlNiHx",inputNumber:"_16scLqOi",date:"_2biGlKsH",toggle:"_6rtk_FEo",imagePreview:"_1r3ExWUM",highlight:"_2nX8fVMV",clickAnimation:"_2k-Tr8ai"}},60:function(e,t,a){e.exports={container:"_36VbAFYV",disabled:"_2rZBK32t",active:"_5BjRpu6n"}},93:function(e,t,a){e.exports={star:"_3nDexP2V",full:"_2pLWSHt1",half:"LTXbD3m3"}},94:function(e,t,a){e.exports={container:"_34dVbr5A",outer:"_3bSwy8oz",content:"_27su4Zj_"}},95:function(e,t,a){e.exports={container:"_2SKsULxg",loading:"_3DEX7sOp",item:"_1IxWeOgx"}}});
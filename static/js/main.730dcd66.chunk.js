(this["webpackJsonpvoice-of-cards-viewer"]=this["webpackJsonpvoice-of-cards-viewer"]||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a,c,s,r,i=n(1),d=n.n(i),o=n(9),l=n.n(o),u=n(5),f=n.n(u),m=n(3),p=n(4),b=n(2),v=n(8),j=(n(15),n.p+"static/media/card_name_text.fec19df2.csv"),h=n.p+"static/media/card_desc_text.c00bd60b.csv",O=n.p+"static/media/card_mst.28478861.csv",g=n.p+"static/media/item_mst.48b34c28.csv",y=n.p+"static/media/collection_mst.8344759d.csv",I=n.p+"static/media/skill_mst.bb35f108.csv",x=n(0);function C(e){return k.apply(this,arguments)}function k(){return(k=Object(v.a)(f.a.mark((function e(t){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return e.next=4,e.sent.text();case 4:return n=e.sent,a=w(n),e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){var t=0,n=[],a=[];for(e=e.replaceAll("\r\n","\n");t<e.length;){var c=e.indexOf(",",t),s=e.indexOf("\n",t),r=c<0?e.length:c,i=s<0?e.length:s,d=Math.min(r,i);if('"'===e[t]){for(var o=e.indexOf('"',t+1);'"'===e[o+1];)o=e.indexOf('"',o+2);a.push(e.substring(t+1,o).replaceAll('""','"')),t=o+1}else a.push(e.substring(t,d)),t=d+1;(i<r||t>=e.length)&&(n.push(a),a=[])}return n}function M(e,t){return e=(e=(e=e.replace(/{CARDNAME:(\d+)}/g,(function(e,n){var a;return null!==(a=t.get(parseInt(n)))&&void 0!==a?a:""}))).replace(/<IME(\d+)>/g,"")).replace(/<highlight>(.*)<\/highlight>/g,(function(e,t){return"<b>".concat(t,"</b>")}))}function N(e){return e?parseInt(e,10):0}function E(e){return e?e.split("@").map((function(e){return N(e)})):[]}function _(e,t){return"children"===e&&t?Array.isArray(t)?t.map((function(e){return e.props})):t.props:t}function S(e,t){return JSON.stringify(e,_)===JSON.stringify(t,_)}function A(e,t,n){var a,c,s,r,i=M(null!==(a=null!==(c=e.nameId?t.get(e.nameId):null)&&void 0!==c?c:t.get(e.id))&&void 0!==a?a:"",t),d=M(null!==(s=null!==(r=e.descId?n.get(e.descId):null)&&void 0!==r?r:n.get(e.id))&&void 0!==s?s:"",t);return{front:{type:e.type,name:i,desc:d,images:[e.land,e.front]},back:{type:e.type,name:"",desc:"",images:[e.back]}}}!function(e){e[e.Character=1]="Character",e[e.Monster=2]="Monster",e[e.Skill=3]="Skill",e[e.Item=4]="Item",e[e.Land=5]="Land",e[e.Equipment=9]="Equipment",e[e.Status=10]="Status",e[e.Ending=11]="Ending",e[e.Passive=12]="Passive",e[e.Dialogue=20]="Dialogue",e[e.Info=30]="Info",e[e.Popup=31]="Popup",e[e.Mystery=35]="Mystery",e[e.Money=41]="Money",e[e.MysteryHint=42]="MysteryHint",e[e.Customization=45]="Customization",e[e.Chapter=46]="Chapter",e[e.Objective=50]="Objective",e[e.CustomizeOff=62]="CustomizeOff",e[e.PlayingCard=70]="PlayingCard",e[e.PlayingEvent=71]="PlayingEvent",e[e.Menu=98]="Menu",e[e.BattleResult=99]="BattleResult",e[e.CustomizeDesc=111]="CustomizeDesc",e[e.CustomizeInfo=140]="CustomizeInfo"}(a||(a={})),function(e){e[e.Items=0]="Items",e[e.Equipment=1]="Equipment",e[e.KeyItems=2]="KeyItems",e[e.KeyItemsAlt=12]="KeyItemsAlt",e[e.Characters=3]="Characters",e[e.CharactersAlt=13]="CharactersAlt",e[e.Monsters=4]="Monsters",e[e.Skills=5]="Skills",e[e.Ending=6]="Ending",e[e.Movies=7]="Movies"}(c||(c={})),function(e){e[e.Item=1]="Item",e[e.Equipment=2]="Equipment",e[e.KeyItem=3]="KeyItem",e[e.Customization=4]="Customization"}(s||(s={})),function(e){e[e.None=0]="None",e[e.Fire=1]="Fire",e[e.Water=2]="Water",e[e.Bolt=3]="Bolt",e[e.Wind=4]="Wind",e[e.Light=5]="Light",e[e.Dark=6]="Dark"}(r||(r={}));var z=Object(i.memo)((function(e){var t=e.card,n=e.side;return Object(x.jsxs)("div",{className:"".concat(n," CardType").concat(t.type),children:[t.images.map((function(e){return e?Object(x.jsx)("img",{src:"images/".concat(e,".png"),alt:""},e):null})),t.name&&Object(x.jsx)("div",{className:"CardName",dangerouslySetInnerHTML:{__html:t.name}}),t.desc&&Object(x.jsx)("div",{className:"CardDesc",dangerouslySetInnerHTML:{__html:t.desc}}),void 0!==t.atk&&Object(x.jsx)("div",{className:"CardATK",children:"".concat(t.atk>=0?"+":"").concat(t.atk)}),void 0!==t.def&&Object(x.jsx)("div",{className:"CardDEF",children:"".concat(t.def>=0?"+":"").concat(t.def)}),void 0!==t.spd&&Object(x.jsx)("div",{className:"CardSPD",children:"".concat(t.spd>=0?"+":"").concat(t.spd)}),void 0!==t.vit&&Object(x.jsx)("div",{className:"CardVIT",children:"".concat(t.vit>=0?"+":"").concat(t.vit)}),t.gems&&Object(x.jsx)("div",{className:"CardGems",children:new Array(t.gems).fill(0).map((function(e,t){return Object(x.jsx)("div",{className:"CardGem"},t)}))})]})}),S),L=Object(i.memo)((function(e){var t=e.front,n=e.back,a=e.flip,c=e.zoom,s=e.onClick,r=e.children;return Object(x.jsxs)("div",{className:"CardBox ".concat(c?"zoom":""),onClick:function(){return null===s||void 0===s?void 0:s()},style:{transform:"rotate(".concat(4*Math.random()-2,"deg)")},children:[r,Object(x.jsxs)("div",{className:"Card ".concat(a?"flip":""),children:[t&&Object(x.jsx)(z,{side:"front",card:t}),n&&Object(x.jsx)(z,{side:"back",card:n})]})]})}),S),D=Object(i.memo)((function(e){var t,n,s,r=e.item,d=e.cards,o=e.items,l=e.skills,u=e.names,f=e.descs,m=Object(i.useState)(!1),v=Object(b.a)(m,2),j=v[0],h=v[1],O=d.get(r.cardId);if(!O)return null;var g=A(O,u,f),y=g.front,I=g.back,C=!1;switch(r.type){case c.Characters:case c.Monsters:case c.KeyItemsAlt:y.name="",y.desc="";break;case c.CharactersAlt:C=!0;break;case c.Ending:var k=d.get(r.cardIdBack);k&&(I=A(k,u,f).front),C=!0;break;case c.Equipment:var w=o.get(r.cardId);w&&(y=Object(p.a)(Object(p.a)({},y),{},{atk:w.atk,def:w.def,spd:w.spd,vit:w.vit}));break;case c.Skills:var N=l.get(r.cardId);N&&(y.gems=N.cost)}var E,_,S,z="",D="",T="";switch(r.type){case c.Characters:case c.CharactersAlt:case c.Monsters:z=M(null!==(t=u.get(r.nameId))&&void 0!==t?t:"",u),D=M(null!==(n=f.get(r.descId))&&void 0!==n?n:"",u),T=M(null!==(s=f.get(r.descIdBack))&&void 0!==s?s:"",u)}return Object(x.jsx)(L,{front:y,back:C?I:null,flip:j&&C,zoom:!0,onClick:function(){return[c.Characters,c.CharactersAlt,c.Monsters,c.Ending].includes(r.type)&&h((function(e){return!e}))},children:z||D||T?Object(x.jsx)("div",{className:"InfoCard",children:Object(x.jsx)(L,Object(p.a)(Object(p.a)({},(E=z,_=D,S=T,{front:{type:a.Info,name:E,desc:_,images:["ca-01_img_card_text-01-02"]},back:{type:a.Info,name:E,desc:S,images:["ca-01_img_card_text-01-02"]}})),{},{flip:j}))}):null})}),S);var T=function(){var e=Object(i.useState)(new Map),t=Object(b.a)(e,2),n=t[0],s=t[1],r=Object(i.useState)(new Map),d=Object(b.a)(r,2),o=d[0],l=d[1],u=Object(i.useState)(new Map),k=Object(b.a)(u,2),w=k[0],M=k[1],_=Object(i.useState)(new Map),S=Object(b.a)(_,2),A=S[0],z=S[1],T=Object(i.useState)(new Map),B=Object(b.a)(T,2),P=B[0],K=B[1],q=Object(i.useState)([]),R=Object(b.a)(q,2),F=R[0],H=R[1],J=Object(i.useState)(window.location.hash?window.location.hash.substr(1):c[c.Items]),W=Object(b.a)(J,2),G=W[0],Q=W[1];return Object(i.useEffect)((function(){Object(v.a)(f.a.mark((function e(){var t,n,a,c,r,i,d,o,u,p,b,v,x,k,w,_,S,A,L,D,T,B,P,q,R,F,J,W,G,Q;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(j);case 2:t=e.sent,n=new Map,a=Object(m.a)(t);try{for(a.s();!(c=a.n()).done;)r=c.value,n.set(N(r[0]),r[1])}catch(f){a.e(f)}finally{a.f()}return s(n),e.next=9,C(h);case 9:i=e.sent,d=new Map,o=Object(m.a)(i);try{for(o.s();!(u=o.n()).done;)p=u.value,d.set(N(p[0]),p[1])}catch(f){o.e(f)}finally{o.f()}return l(d),e.next=16,C(O);case 16:b=e.sent,v=new Map,x=Object(m.a)(b);try{for(x.s();!(k=x.n()).done;)w=k.value,v.set(N(w[0]),{id:N(w[0]),type:N(w[1]),nameId:N(w[3]),descId:N(w[4]),land:w[5],front:w[6],overlays:w[7].split("@"),back:w[8],backOverlays:w[9].split("@"),field2:N(w[2]),field10:"1"===w[10]})}catch(f){x.e(f)}finally{x.f()}return M(v),e.next=23,C(g);case 23:_=e.sent,S=new Map,A=Object(m.a)(_);try{for(A.s();!(L=A.n()).done;)D=L.value,S.set(N(D[0]),{id:N(D[0]),cardId:N(D[1]),isTorch:"1"===D[2],type:N(D[3]),field4:N(D[4]),buy:N(D[5]),sell:N(D[6]),useType:N(D[7]),field8:N(D[8]),atk:N(D[9]),def:N(D[10]),spd:N(D[11]),vit:N(D[12]),field13:E(D[13]),users:E(D[14])})}catch(f){A.e(f)}finally{A.f()}return z(S),e.next=30,C(I);case 30:T=e.sent,B=new Map,P=Object(m.a)(T);try{for(P.s();!(q=P.n()).done;)R=q.value,B.set(N(R[1]),{id:N(R[0]),cardId:N(R[1]),element:N(R[2]),cost:R[3]?N(R[3].split(":")[1]):0,field4:N(R[4]),field5:N(R[5]),field6:N(R[6]),field7:N(R[7])})}catch(f){P.e(f)}finally{P.f()}return K(B),e.next=37,C(y);case 37:F=e.sent,J=[],W=Object(m.a)(F);try{for(W.s();!(G=W.n()).done;)Q=G.value,J.push({id:N(Q[0]),type:N(Q[1]),cardId:N(Q[2]),cardIdBack:N(Q[3]),nameId:N(Q[4]),descId:N(Q[6]),descIdBack:N(Q[7]),fields:Q})}catch(f){W.e(f)}finally{W.f()}H(J);case 42:case"end":return e.stop()}}),e)})))()}),[]),Object(i.useEffect)((function(){var e=function(){Q(window.location.hash?window.location.hash.substr(1):c[c.Items]),window.scrollTo(0,0)};return window.addEventListener("hashchange",e),function(){window.removeEventListener("hashchange",e)}}),[]),Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)("div",{className:"LeftMenu",children:Object.values(c).filter((function(e){return e<10})).reverse().map((function(e){return Object(x.jsx)("a",{href:"#".concat(c[e]),className:"MenuCard",children:Object(x.jsx)(L,Object(p.a)(Object(p.a)({},(n=e,s=c,t=s[n].replace(/([a-z])([A-Z])/g,(function(e,t,n){return"".concat(t," ").concat(n)})),{front:{type:a.Menu,name:t,desc:"",images:["ca-01_img_menu_front"]},back:{type:a.Menu,name:t,desc:"",images:["ca-01_img_menu_reverse"]}})),{},{flip:G!==c[e],onClick:function(){window.location.hash=c[e],window.scrollTo(0,0)}}))},e);var t,n,s}))}),(G===c[c.Characters]||G===c[c.Monsters])&&Object(x.jsx)("div",{className:"RightMenu"}),Object(x.jsx)("div",{className:"Content",children:Object(x.jsx)("div",{id:"".concat(G,"List"),className:"CardList",children:F.filter((function(e){return c[e.type%10]===G})).map((function(e){return Object(x.jsx)(D,{item:e,cards:w,items:A,skills:P,names:n,descs:o},e.id)}))},G)}),Object(x.jsx)("div",{className:"Footer",children:"This website is a fan-produced derivative work. All artwork, text, iconography, and other content are copyright \xa9 2021 SQUARE ENIX CO., LTD."})]})};l.a.render(Object(x.jsx)(d.a.StrictMode,{children:Object(x.jsx)(T,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.730dcd66.chunk.js.map
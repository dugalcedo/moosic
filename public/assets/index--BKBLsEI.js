var A=Object.defineProperty;var I=(e,t,n)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var g=(e,t,n)=>(I(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();function a(){}function L(e){return e()}function E(){return Object.create(null)}function p(e){e.forEach(L)}function P(e){return typeof e=="function"}function B(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function M(e){return Object.keys(e).length===0}function q(e,t,n){e.insertBefore(t,n||null)}function S(e){e.parentNode&&e.parentNode.removeChild(e)}function F(e){return document.createElement(e)}function H(e){return Array.from(e.childNodes)}let b;function h(e){b=e}const l=[],k=[];let d=[];const N=[],K=Promise.resolve();let y=!1;function R(){y||(y=!0,K.then(j))}function $(e){d.push(e)}const m=new Set;let u=0;function j(){if(u!==0)return;const e=b;do{try{for(;u<l.length;){const t=l[u];u++,h(t),U(t.$$)}}catch(t){throw l.length=0,u=0,t}for(h(null),l.length=0,u=0;k.length;)k.pop()();for(let t=0;t<d.length;t+=1){const n=d[t];m.has(n)||(m.add(n),n())}d.length=0}while(l.length);for(;N.length;)N.pop()();y=!1,m.clear(),h(e)}function U(e){if(e.fragment!==null){e.update(),p(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach($)}}function V(e){const t=[],n=[];d.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),d=t}const z=new Set;function D(e,t){e&&e.i&&(z.delete(e),e.i(t))}function G(e,t,n){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),$(()=>{const c=e.$$.on_mount.map(L).filter(P);e.$$.on_destroy?e.$$.on_destroy.push(...c):p(c),e.$$.on_mount=[]}),r.forEach($)}function J(e,t){const n=e.$$;n.fragment!==null&&(V(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(e,t){e.$$.dirty[0]===-1&&(l.push(e),R(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function T(e,t,n,o,r,c,f=null,C=[-1]){const _=b;h(e);const i=e.$$={fragment:null,ctx:[],props:c,update:a,not_equal:r,bound:E(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(_?_.$$.context:[])),callbacks:E(),dirty:C,skip_bound:!1,root:t.target||_.$$.root};f&&f(i.root);let w=!1;if(i.ctx=n?n(e,t.props||{},(s,x,...v)=>{const O=v.length?v[0]:x;return i.ctx&&r(i.ctx[s],i.ctx[s]=O)&&(!i.skip_bound&&i.bound[s]&&i.bound[s](O),w&&Q(e,s)),x}):[],i.update(),w=!0,p(i.before_update),i.fragment=o?o(i.ctx):!1,t.target){if(t.hydrate){const s=H(t.target);i.fragment&&i.fragment.l(s),s.forEach(S)}else i.fragment&&i.fragment.c();t.intro&&D(e.$$.fragment),G(e,t.target,t.anchor),j()}h(_)}class W{constructor(){g(this,"$$");g(this,"$$set")}$destroy(){J(this,1),this.$destroy=a}$on(t,n){if(!P(n))return a;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!M(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const X="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(X);function Y(e){let t;return{c(){t=F("h1"),t.textContent="Hello"},m(n,o){q(n,t,o)},p:a,i:a,o:a,d(n){n&&S(t)}}}class Z extends W{constructor(t){super(),T(this,t,null,Y,B,{})}}new Z({target:document.body});
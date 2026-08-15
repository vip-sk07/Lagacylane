(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function dx(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var cm={exports:{}},_l={},um={exports:{}},Xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ra=Symbol.for("react.element"),fx=Symbol.for("react.portal"),hx=Symbol.for("react.fragment"),px=Symbol.for("react.strict_mode"),mx=Symbol.for("react.profiler"),gx=Symbol.for("react.provider"),xx=Symbol.for("react.context"),vx=Symbol.for("react.forward_ref"),_x=Symbol.for("react.suspense"),yx=Symbol.for("react.memo"),Sx=Symbol.for("react.lazy"),Ef=Symbol.iterator;function Mx(t){return t===null||typeof t!="object"?null:(t=Ef&&t[Ef]||t["@@iterator"],typeof t=="function"?t:null)}var dm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},fm=Object.assign,hm={};function Ls(t,e,n){this.props=t,this.context=e,this.refs=hm,this.updater=n||dm}Ls.prototype.isReactComponent={};Ls.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ls.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function pm(){}pm.prototype=Ls.prototype;function od(t,e,n){this.props=t,this.context=e,this.refs=hm,this.updater=n||dm}var ld=od.prototype=new pm;ld.constructor=od;fm(ld,Ls.prototype);ld.isPureReactComponent=!0;var wf=Array.isArray,mm=Object.prototype.hasOwnProperty,cd={current:null},gm={key:!0,ref:!0,__self:!0,__source:!0};function xm(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)mm.call(e,i)&&!gm.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:Ra,type:t,key:s,ref:a,props:r,_owner:cd.current}}function Ex(t,e){return{$$typeof:Ra,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ud(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ra}function wx(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Tf=/\/+/g;function ql(t,e){return typeof t=="object"&&t!==null&&t.key!=null?wx(""+t.key):e.toString(36)}function Co(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Ra:case fx:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+ql(a,0):i,wf(r)?(n="",t!=null&&(n=t.replace(Tf,"$&/")+"/"),Co(r,e,n,"",function(c){return c})):r!=null&&(ud(r)&&(r=Ex(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Tf,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",wf(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+ql(s,o);a+=Co(s,e,n,l,r)}else if(l=Mx(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+ql(s,o++),a+=Co(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function Ba(t,e,n){if(t==null)return t;var i=[],r=0;return Co(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Tx(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Zt={current:null},Ro={transition:null},bx={ReactCurrentDispatcher:Zt,ReactCurrentBatchConfig:Ro,ReactCurrentOwner:cd};function vm(){throw Error("act(...) is not supported in production builds of React.")}Xe.Children={map:Ba,forEach:function(t,e,n){Ba(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ba(t,function(){e++}),e},toArray:function(t){return Ba(t,function(e){return e})||[]},only:function(t){if(!ud(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Xe.Component=Ls;Xe.Fragment=hx;Xe.Profiler=mx;Xe.PureComponent=od;Xe.StrictMode=px;Xe.Suspense=_x;Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bx;Xe.act=vm;Xe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=fm({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=cd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)mm.call(e,l)&&!gm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:Ra,type:t.type,key:r,ref:s,props:i,_owner:a}};Xe.createContext=function(t){return t={$$typeof:xx,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:gx,_context:t},t.Consumer=t};Xe.createElement=xm;Xe.createFactory=function(t){var e=xm.bind(null,t);return e.type=t,e};Xe.createRef=function(){return{current:null}};Xe.forwardRef=function(t){return{$$typeof:vx,render:t}};Xe.isValidElement=ud;Xe.lazy=function(t){return{$$typeof:Sx,_payload:{_status:-1,_result:t},_init:Tx}};Xe.memo=function(t,e){return{$$typeof:yx,type:t,compare:e===void 0?null:e}};Xe.startTransition=function(t){var e=Ro.transition;Ro.transition={};try{t()}finally{Ro.transition=e}};Xe.unstable_act=vm;Xe.useCallback=function(t,e){return Zt.current.useCallback(t,e)};Xe.useContext=function(t){return Zt.current.useContext(t)};Xe.useDebugValue=function(){};Xe.useDeferredValue=function(t){return Zt.current.useDeferredValue(t)};Xe.useEffect=function(t,e){return Zt.current.useEffect(t,e)};Xe.useId=function(){return Zt.current.useId()};Xe.useImperativeHandle=function(t,e,n){return Zt.current.useImperativeHandle(t,e,n)};Xe.useInsertionEffect=function(t,e){return Zt.current.useInsertionEffect(t,e)};Xe.useLayoutEffect=function(t,e){return Zt.current.useLayoutEffect(t,e)};Xe.useMemo=function(t,e){return Zt.current.useMemo(t,e)};Xe.useReducer=function(t,e,n){return Zt.current.useReducer(t,e,n)};Xe.useRef=function(t){return Zt.current.useRef(t)};Xe.useState=function(t){return Zt.current.useState(t)};Xe.useSyncExternalStore=function(t,e,n){return Zt.current.useSyncExternalStore(t,e,n)};Xe.useTransition=function(){return Zt.current.useTransition()};Xe.version="18.3.1";um.exports=Xe;var be=um.exports;const Ax=dx(be);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cx=be,Rx=Symbol.for("react.element"),Px=Symbol.for("react.fragment"),Lx=Object.prototype.hasOwnProperty,Nx=Cx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Dx={key:!0,ref:!0,__self:!0,__source:!0};function _m(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)Lx.call(e,i)&&!Dx.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Rx,type:t,key:s,ref:a,props:r,_owner:Nx.current}}_l.Fragment=Px;_l.jsx=_m;_l.jsxs=_m;cm.exports=_l;var g=cm.exports,tu={},ym={exports:{}},_n={},Sm={exports:{}},Mm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,H){var P=I.length;I.push(H);e:for(;0<P;){var C=P-1>>>1,Y=I[C];if(0<r(Y,H))I[C]=H,I[P]=Y,P=C;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var H=I[0],P=I.pop();if(P!==H){I[0]=P;e:for(var C=0,Y=I.length,re=Y>>>1;C<re;){var U=2*(C+1)-1,W=I[U],ee=U+1,ne=I[ee];if(0>r(W,P))ee<Y&&0>r(ne,W)?(I[C]=ne,I[ee]=P,C=ee):(I[C]=W,I[U]=P,C=U);else if(ee<Y&&0>r(ne,P))I[C]=ne,I[ee]=P,C=ee;else break e}}return H}function r(I,H){var P=I.sortIndex-H.sortIndex;return P!==0?P:I.id-H.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],d=1,f=null,h=3,x=!1,_=!1,S=!1,p=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(I){for(var H=n(c);H!==null;){if(H.callback===null)i(c);else if(H.startTime<=I)i(c),H.sortIndex=H.expirationTime,e(l,H);else break;H=n(c)}}function M(I){if(S=!1,m(I),!_)if(n(l)!==null)_=!0,G(R);else{var H=n(c);H!==null&&te(M,H.startTime-I)}}function R(I,H){_=!1,S&&(S=!1,u(N),N=-1),x=!0;var P=h;try{for(m(H),f=n(l);f!==null&&(!(f.expirationTime>H)||I&&!A());){var C=f.callback;if(typeof C=="function"){f.callback=null,h=f.priorityLevel;var Y=C(f.expirationTime<=H);H=t.unstable_now(),typeof Y=="function"?f.callback=Y:f===n(l)&&i(l),m(H)}else i(l);f=n(l)}if(f!==null)var re=!0;else{var U=n(c);U!==null&&te(M,U.startTime-H),re=!1}return re}finally{f=null,h=P,x=!1}}var T=!1,w=null,N=-1,O=5,y=-1;function A(){return!(t.unstable_now()-y<O)}function V(){if(w!==null){var I=t.unstable_now();y=I;var H=!0;try{H=w(!0,I)}finally{H?Z():(T=!1,w=null)}}else T=!1}var Z;if(typeof v=="function")Z=function(){v(V)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,K=D.port2;D.port1.onmessage=V,Z=function(){K.postMessage(null)}}else Z=function(){p(V,0)};function G(I){w=I,T||(T=!0,Z())}function te(I,H){N=p(function(){I(t.unstable_now())},H)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_continueExecution=function(){_||x||(_=!0,G(R))},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(I){switch(h){case 1:case 2:case 3:var H=3;break;default:H=h}var P=h;h=H;try{return I()}finally{h=P}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(I,H){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var P=h;h=I;try{return H()}finally{h=P}},t.unstable_scheduleCallback=function(I,H,P){var C=t.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?C+P:C):P=C,I){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=P+Y,I={id:d++,callback:H,priorityLevel:I,startTime:P,expirationTime:Y,sortIndex:-1},P>C?(I.sortIndex=P,e(c,I),n(l)===null&&I===n(c)&&(S?(u(N),N=-1):S=!0,te(M,P-C))):(I.sortIndex=Y,e(l,I),_||x||(_=!0,G(R))),I},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(I){var H=h;return function(){var P=h;h=H;try{return I.apply(this,arguments)}finally{h=P}}}})(Mm);Sm.exports=Mm;var Ix=Sm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ux=be,vn=Ix;function se(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Em=new Set,da={};function Pr(t,e){_s(t,e),_s(t+"Capture",e)}function _s(t,e){for(da[t]=e,t=0;t<e.length;t++)Em.add(e[t])}var mi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),nu=Object.prototype.hasOwnProperty,Fx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,bf={},Af={};function kx(t){return nu.call(Af,t)?!0:nu.call(bf,t)?!1:Fx.test(t)?Af[t]=!0:(bf[t]=!0,!1)}function Ox(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function zx(t,e,n,i){if(e===null||typeof e>"u"||Ox(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Qt(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){kt[t]=new Qt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];kt[e]=new Qt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){kt[t]=new Qt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){kt[t]=new Qt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){kt[t]=new Qt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){kt[t]=new Qt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){kt[t]=new Qt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){kt[t]=new Qt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){kt[t]=new Qt(t,5,!1,t.toLowerCase(),null,!1,!1)});var dd=/[\-:]([a-z])/g;function fd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(dd,fd);kt[e]=new Qt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(dd,fd);kt[e]=new Qt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(dd,fd);kt[e]=new Qt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){kt[t]=new Qt(t,1,!1,t.toLowerCase(),null,!1,!1)});kt.xlinkHref=new Qt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){kt[t]=new Qt(t,1,!1,t.toLowerCase(),null,!0,!0)});function hd(t,e,n,i){var r=kt.hasOwnProperty(e)?kt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(zx(e,n,r,i)&&(n=null),i||r===null?kx(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var _i=Ux.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ha=Symbol.for("react.element"),Kr=Symbol.for("react.portal"),Zr=Symbol.for("react.fragment"),pd=Symbol.for("react.strict_mode"),iu=Symbol.for("react.profiler"),wm=Symbol.for("react.provider"),Tm=Symbol.for("react.context"),md=Symbol.for("react.forward_ref"),ru=Symbol.for("react.suspense"),su=Symbol.for("react.suspense_list"),gd=Symbol.for("react.memo"),Ai=Symbol.for("react.lazy"),bm=Symbol.for("react.offscreen"),Cf=Symbol.iterator;function ks(t){return t===null||typeof t!="object"?null:(t=Cf&&t[Cf]||t["@@iterator"],typeof t=="function"?t:null)}var gt=Object.assign,Yl;function Zs(t){if(Yl===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Yl=e&&e[1]||""}return`
`+Yl+t}var $l=!1;function Kl(t,e){if(!t||$l)return"";$l=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{$l=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Zs(t):""}function Bx(t){switch(t.tag){case 5:return Zs(t.type);case 16:return Zs("Lazy");case 13:return Zs("Suspense");case 19:return Zs("SuspenseList");case 0:case 2:case 15:return t=Kl(t.type,!1),t;case 11:return t=Kl(t.type.render,!1),t;case 1:return t=Kl(t.type,!0),t;default:return""}}function au(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Zr:return"Fragment";case Kr:return"Portal";case iu:return"Profiler";case pd:return"StrictMode";case ru:return"Suspense";case su:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Tm:return(t.displayName||"Context")+".Consumer";case wm:return(t._context.displayName||"Context")+".Provider";case md:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case gd:return e=t.displayName||null,e!==null?e:au(t.type)||"Memo";case Ai:e=t._payload,t=t._init;try{return au(t(e))}catch{}}return null}function Hx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return au(e);case 8:return e===pd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Xi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Am(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Gx(t){var e=Am(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ga(t){t._valueTracker||(t._valueTracker=Gx(t))}function Cm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Am(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Go(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ou(t,e){var n=e.checked;return gt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Rf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Xi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Rm(t,e){e=e.checked,e!=null&&hd(t,"checked",e,!1)}function lu(t,e){Rm(t,e);var n=Xi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?cu(t,e.type,n):e.hasOwnProperty("defaultValue")&&cu(t,e.type,Xi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Pf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function cu(t,e,n){(e!=="number"||Go(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Qs=Array.isArray;function ds(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Xi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function uu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(se(91));return gt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Lf(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(se(92));if(Qs(n)){if(1<n.length)throw Error(se(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Xi(n)}}function Pm(t,e){var n=Xi(e.value),i=Xi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Nf(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Lm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function du(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Lm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Va,Nm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Va=Va||document.createElement("div"),Va.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Va.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function fa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ta={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Vx=["Webkit","ms","Moz","O"];Object.keys(ta).forEach(function(t){Vx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ta[e]=ta[t]})});function Dm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ta.hasOwnProperty(t)&&ta[t]?(""+e).trim():e+"px"}function Im(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Dm(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var jx=gt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function fu(t,e){if(e){if(jx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(se(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(se(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(se(61))}if(e.style!=null&&typeof e.style!="object")throw Error(se(62))}}function hu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pu=null;function xd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var mu=null,fs=null,hs=null;function Df(t){if(t=Na(t)){if(typeof mu!="function")throw Error(se(280));var e=t.stateNode;e&&(e=wl(e),mu(t.stateNode,t.type,e))}}function Um(t){fs?hs?hs.push(t):hs=[t]:fs=t}function Fm(){if(fs){var t=fs,e=hs;if(hs=fs=null,Df(t),e)for(t=0;t<e.length;t++)Df(e[t])}}function km(t,e){return t(e)}function Om(){}var Zl=!1;function zm(t,e,n){if(Zl)return t(e,n);Zl=!0;try{return km(t,e,n)}finally{Zl=!1,(fs!==null||hs!==null)&&(Om(),Fm())}}function ha(t,e){var n=t.stateNode;if(n===null)return null;var i=wl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(se(231,e,typeof n));return n}var gu=!1;if(mi)try{var Os={};Object.defineProperty(Os,"passive",{get:function(){gu=!0}}),window.addEventListener("test",Os,Os),window.removeEventListener("test",Os,Os)}catch{gu=!1}function Wx(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var na=!1,Vo=null,jo=!1,xu=null,Xx={onError:function(t){na=!0,Vo=t}};function qx(t,e,n,i,r,s,a,o,l){na=!1,Vo=null,Wx.apply(Xx,arguments)}function Yx(t,e,n,i,r,s,a,o,l){if(qx.apply(this,arguments),na){if(na){var c=Vo;na=!1,Vo=null}else throw Error(se(198));jo||(jo=!0,xu=c)}}function Lr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Bm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function If(t){if(Lr(t)!==t)throw Error(se(188))}function $x(t){var e=t.alternate;if(!e){if(e=Lr(t),e===null)throw Error(se(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return If(r),t;if(s===i)return If(r),e;s=s.sibling}throw Error(se(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(se(189))}}if(n.alternate!==i)throw Error(se(190))}if(n.tag!==3)throw Error(se(188));return n.stateNode.current===n?t:e}function Hm(t){return t=$x(t),t!==null?Gm(t):null}function Gm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Gm(t);if(e!==null)return e;t=t.sibling}return null}var Vm=vn.unstable_scheduleCallback,Uf=vn.unstable_cancelCallback,Kx=vn.unstable_shouldYield,Zx=vn.unstable_requestPaint,yt=vn.unstable_now,Qx=vn.unstable_getCurrentPriorityLevel,vd=vn.unstable_ImmediatePriority,jm=vn.unstable_UserBlockingPriority,Wo=vn.unstable_NormalPriority,Jx=vn.unstable_LowPriority,Wm=vn.unstable_IdlePriority,yl=null,Kn=null;function ev(t){if(Kn&&typeof Kn.onCommitFiberRoot=="function")try{Kn.onCommitFiberRoot(yl,t,void 0,(t.current.flags&128)===128)}catch{}}var Bn=Math.clz32?Math.clz32:iv,tv=Math.log,nv=Math.LN2;function iv(t){return t>>>=0,t===0?32:31-(tv(t)/nv|0)|0}var ja=64,Wa=4194304;function Js(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Xo(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Js(o):(s&=a,s!==0&&(i=Js(s)))}else a=n&~r,a!==0?i=Js(a):s!==0&&(i=Js(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Bn(e),r=1<<n,i|=t[n],e&=~r;return i}function rv(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sv(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Bn(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=rv(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function vu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Xm(){var t=ja;return ja<<=1,!(ja&4194240)&&(ja=64),t}function Ql(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Pa(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Bn(e),t[e]=n}function av(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Bn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function _d(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Bn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var et=0;function qm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Ym,yd,$m,Km,Zm,_u=!1,Xa=[],Ui=null,Fi=null,ki=null,pa=new Map,ma=new Map,Ri=[],ov="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ff(t,e){switch(t){case"focusin":case"focusout":Ui=null;break;case"dragenter":case"dragleave":Fi=null;break;case"mouseover":case"mouseout":ki=null;break;case"pointerover":case"pointerout":pa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ma.delete(e.pointerId)}}function zs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Na(e),e!==null&&yd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function lv(t,e,n,i,r){switch(e){case"focusin":return Ui=zs(Ui,t,e,n,i,r),!0;case"dragenter":return Fi=zs(Fi,t,e,n,i,r),!0;case"mouseover":return ki=zs(ki,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return pa.set(s,zs(pa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ma.set(s,zs(ma.get(s)||null,t,e,n,i,r)),!0}return!1}function Qm(t){var e=pr(t.target);if(e!==null){var n=Lr(e);if(n!==null){if(e=n.tag,e===13){if(e=Bm(n),e!==null){t.blockedOn=e,Zm(t.priority,function(){$m(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Po(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=yu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);pu=i,n.target.dispatchEvent(i),pu=null}else return e=Na(n),e!==null&&yd(e),t.blockedOn=n,!1;e.shift()}return!0}function kf(t,e,n){Po(t)&&n.delete(e)}function cv(){_u=!1,Ui!==null&&Po(Ui)&&(Ui=null),Fi!==null&&Po(Fi)&&(Fi=null),ki!==null&&Po(ki)&&(ki=null),pa.forEach(kf),ma.forEach(kf)}function Bs(t,e){t.blockedOn===e&&(t.blockedOn=null,_u||(_u=!0,vn.unstable_scheduleCallback(vn.unstable_NormalPriority,cv)))}function ga(t){function e(r){return Bs(r,t)}if(0<Xa.length){Bs(Xa[0],t);for(var n=1;n<Xa.length;n++){var i=Xa[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Ui!==null&&Bs(Ui,t),Fi!==null&&Bs(Fi,t),ki!==null&&Bs(ki,t),pa.forEach(e),ma.forEach(e),n=0;n<Ri.length;n++)i=Ri[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ri.length&&(n=Ri[0],n.blockedOn===null);)Qm(n),n.blockedOn===null&&Ri.shift()}var ps=_i.ReactCurrentBatchConfig,qo=!0;function uv(t,e,n,i){var r=et,s=ps.transition;ps.transition=null;try{et=1,Sd(t,e,n,i)}finally{et=r,ps.transition=s}}function dv(t,e,n,i){var r=et,s=ps.transition;ps.transition=null;try{et=4,Sd(t,e,n,i)}finally{et=r,ps.transition=s}}function Sd(t,e,n,i){if(qo){var r=yu(t,e,n,i);if(r===null)lc(t,e,i,Yo,n),Ff(t,i);else if(lv(r,t,e,n,i))i.stopPropagation();else if(Ff(t,i),e&4&&-1<ov.indexOf(t)){for(;r!==null;){var s=Na(r);if(s!==null&&Ym(s),s=yu(t,e,n,i),s===null&&lc(t,e,i,Yo,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else lc(t,e,i,null,n)}}var Yo=null;function yu(t,e,n,i){if(Yo=null,t=xd(i),t=pr(t),t!==null)if(e=Lr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Bm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Yo=t,null}function Jm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qx()){case vd:return 1;case jm:return 4;case Wo:case Jx:return 16;case Wm:return 536870912;default:return 16}default:return 16}}var Ni=null,Md=null,Lo=null;function e0(){if(Lo)return Lo;var t,e=Md,n=e.length,i,r="value"in Ni?Ni.value:Ni.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Lo=r.slice(t,1<i?1-i:void 0)}function No(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function qa(){return!0}function Of(){return!1}function yn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?qa:Of,this.isPropagationStopped=Of,this}return gt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=qa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=qa)},persist:function(){},isPersistent:qa}),e}var Ns={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ed=yn(Ns),La=gt({},Ns,{view:0,detail:0}),fv=yn(La),Jl,ec,Hs,Sl=gt({},La,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Hs&&(Hs&&t.type==="mousemove"?(Jl=t.screenX-Hs.screenX,ec=t.screenY-Hs.screenY):ec=Jl=0,Hs=t),Jl)},movementY:function(t){return"movementY"in t?t.movementY:ec}}),zf=yn(Sl),hv=gt({},Sl,{dataTransfer:0}),pv=yn(hv),mv=gt({},La,{relatedTarget:0}),tc=yn(mv),gv=gt({},Ns,{animationName:0,elapsedTime:0,pseudoElement:0}),xv=yn(gv),vv=gt({},Ns,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),_v=yn(vv),yv=gt({},Ns,{data:0}),Bf=yn(yv),Sv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Mv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ev={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wv(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Ev[t])?!!e[t]:!1}function wd(){return wv}var Tv=gt({},La,{key:function(t){if(t.key){var e=Sv[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=No(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Mv[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wd,charCode:function(t){return t.type==="keypress"?No(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?No(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),bv=yn(Tv),Av=gt({},Sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Hf=yn(Av),Cv=gt({},La,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wd}),Rv=yn(Cv),Pv=gt({},Ns,{propertyName:0,elapsedTime:0,pseudoElement:0}),Lv=yn(Pv),Nv=gt({},Sl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Dv=yn(Nv),Iv=[9,13,27,32],Td=mi&&"CompositionEvent"in window,ia=null;mi&&"documentMode"in document&&(ia=document.documentMode);var Uv=mi&&"TextEvent"in window&&!ia,t0=mi&&(!Td||ia&&8<ia&&11>=ia),Gf=" ",Vf=!1;function n0(t,e){switch(t){case"keyup":return Iv.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function i0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Qr=!1;function Fv(t,e){switch(t){case"compositionend":return i0(e);case"keypress":return e.which!==32?null:(Vf=!0,Gf);case"textInput":return t=e.data,t===Gf&&Vf?null:t;default:return null}}function kv(t,e){if(Qr)return t==="compositionend"||!Td&&n0(t,e)?(t=e0(),Lo=Md=Ni=null,Qr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return t0&&e.locale!=="ko"?null:e.data;default:return null}}var Ov={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Ov[t.type]:e==="textarea"}function r0(t,e,n,i){Um(i),e=$o(e,"onChange"),0<e.length&&(n=new Ed("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ra=null,xa=null;function zv(t){m0(t,0)}function Ml(t){var e=ts(t);if(Cm(e))return t}function Bv(t,e){if(t==="change")return e}var s0=!1;if(mi){var nc;if(mi){var ic="oninput"in document;if(!ic){var Wf=document.createElement("div");Wf.setAttribute("oninput","return;"),ic=typeof Wf.oninput=="function"}nc=ic}else nc=!1;s0=nc&&(!document.documentMode||9<document.documentMode)}function Xf(){ra&&(ra.detachEvent("onpropertychange",a0),xa=ra=null)}function a0(t){if(t.propertyName==="value"&&Ml(xa)){var e=[];r0(e,xa,t,xd(t)),zm(zv,e)}}function Hv(t,e,n){t==="focusin"?(Xf(),ra=e,xa=n,ra.attachEvent("onpropertychange",a0)):t==="focusout"&&Xf()}function Gv(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ml(xa)}function Vv(t,e){if(t==="click")return Ml(e)}function jv(t,e){if(t==="input"||t==="change")return Ml(e)}function Wv(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Gn=typeof Object.is=="function"?Object.is:Wv;function va(t,e){if(Gn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!nu.call(e,r)||!Gn(t[r],e[r]))return!1}return!0}function qf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Yf(t,e){var n=qf(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=qf(n)}}function o0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?o0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function l0(){for(var t=window,e=Go();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Go(t.document)}return e}function bd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Xv(t){var e=l0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&o0(n.ownerDocument.documentElement,n)){if(i!==null&&bd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Yf(n,s);var a=Yf(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var qv=mi&&"documentMode"in document&&11>=document.documentMode,Jr=null,Su=null,sa=null,Mu=!1;function $f(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mu||Jr==null||Jr!==Go(i)||(i=Jr,"selectionStart"in i&&bd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),sa&&va(sa,i)||(sa=i,i=$o(Su,"onSelect"),0<i.length&&(e=new Ed("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Jr)))}function Ya(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var es={animationend:Ya("Animation","AnimationEnd"),animationiteration:Ya("Animation","AnimationIteration"),animationstart:Ya("Animation","AnimationStart"),transitionend:Ya("Transition","TransitionEnd")},rc={},c0={};mi&&(c0=document.createElement("div").style,"AnimationEvent"in window||(delete es.animationend.animation,delete es.animationiteration.animation,delete es.animationstart.animation),"TransitionEvent"in window||delete es.transitionend.transition);function El(t){if(rc[t])return rc[t];if(!es[t])return t;var e=es[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in c0)return rc[t]=e[n];return t}var u0=El("animationend"),d0=El("animationiteration"),f0=El("animationstart"),h0=El("transitionend"),p0=new Map,Kf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ki(t,e){p0.set(t,e),Pr(e,[t])}for(var sc=0;sc<Kf.length;sc++){var ac=Kf[sc],Yv=ac.toLowerCase(),$v=ac[0].toUpperCase()+ac.slice(1);Ki(Yv,"on"+$v)}Ki(u0,"onAnimationEnd");Ki(d0,"onAnimationIteration");Ki(f0,"onAnimationStart");Ki("dblclick","onDoubleClick");Ki("focusin","onFocus");Ki("focusout","onBlur");Ki(h0,"onTransitionEnd");_s("onMouseEnter",["mouseout","mouseover"]);_s("onMouseLeave",["mouseout","mouseover"]);_s("onPointerEnter",["pointerout","pointerover"]);_s("onPointerLeave",["pointerout","pointerover"]);Pr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Pr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Pr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Pr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Pr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Pr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ea="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Kv=new Set("cancel close invalid load scroll toggle".split(" ").concat(ea));function Zf(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Yx(i,e,void 0,t),t.currentTarget=null}function m0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Zf(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Zf(r,o,c),s=l}}}if(jo)throw t=xu,jo=!1,xu=null,t}function at(t,e){var n=e[Au];n===void 0&&(n=e[Au]=new Set);var i=t+"__bubble";n.has(i)||(g0(e,t,2,!1),n.add(i))}function oc(t,e,n){var i=0;e&&(i|=4),g0(n,t,i,e)}var $a="_reactListening"+Math.random().toString(36).slice(2);function _a(t){if(!t[$a]){t[$a]=!0,Em.forEach(function(n){n!=="selectionchange"&&(Kv.has(n)||oc(n,!1,t),oc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[$a]||(e[$a]=!0,oc("selectionchange",!1,e))}}function g0(t,e,n,i){switch(Jm(e)){case 1:var r=uv;break;case 4:r=dv;break;default:r=Sd}n=r.bind(null,e,n,t),r=void 0,!gu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function lc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=pr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}zm(function(){var c=s,d=xd(n),f=[];e:{var h=p0.get(t);if(h!==void 0){var x=Ed,_=t;switch(t){case"keypress":if(No(n)===0)break e;case"keydown":case"keyup":x=bv;break;case"focusin":_="focus",x=tc;break;case"focusout":_="blur",x=tc;break;case"beforeblur":case"afterblur":x=tc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=zf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=pv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Rv;break;case u0:case d0:case f0:x=xv;break;case h0:x=Lv;break;case"scroll":x=fv;break;case"wheel":x=Dv;break;case"copy":case"cut":case"paste":x=_v;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Hf}var S=(e&4)!==0,p=!S&&t==="scroll",u=S?h!==null?h+"Capture":null:h;S=[];for(var v=c,m;v!==null;){m=v;var M=m.stateNode;if(m.tag===5&&M!==null&&(m=M,u!==null&&(M=ha(v,u),M!=null&&S.push(ya(v,M,m)))),p)break;v=v.return}0<S.length&&(h=new x(h,_,null,n,d),f.push({event:h,listeners:S}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",x=t==="mouseout"||t==="pointerout",h&&n!==pu&&(_=n.relatedTarget||n.fromElement)&&(pr(_)||_[gi]))break e;if((x||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,x?(_=n.relatedTarget||n.toElement,x=c,_=_?pr(_):null,_!==null&&(p=Lr(_),_!==p||_.tag!==5&&_.tag!==6)&&(_=null)):(x=null,_=c),x!==_)){if(S=zf,M="onMouseLeave",u="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(S=Hf,M="onPointerLeave",u="onPointerEnter",v="pointer"),p=x==null?h:ts(x),m=_==null?h:ts(_),h=new S(M,v+"leave",x,n,d),h.target=p,h.relatedTarget=m,M=null,pr(d)===c&&(S=new S(u,v+"enter",_,n,d),S.target=m,S.relatedTarget=p,M=S),p=M,x&&_)t:{for(S=x,u=_,v=0,m=S;m;m=Dr(m))v++;for(m=0,M=u;M;M=Dr(M))m++;for(;0<v-m;)S=Dr(S),v--;for(;0<m-v;)u=Dr(u),m--;for(;v--;){if(S===u||u!==null&&S===u.alternate)break t;S=Dr(S),u=Dr(u)}S=null}else S=null;x!==null&&Qf(f,h,x,S,!1),_!==null&&p!==null&&Qf(f,p,_,S,!0)}}e:{if(h=c?ts(c):window,x=h.nodeName&&h.nodeName.toLowerCase(),x==="select"||x==="input"&&h.type==="file")var R=Bv;else if(jf(h))if(s0)R=jv;else{R=Gv;var T=Hv}else(x=h.nodeName)&&x.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(R=Vv);if(R&&(R=R(t,c))){r0(f,R,n,d);break e}T&&T(t,h,c),t==="focusout"&&(T=h._wrapperState)&&T.controlled&&h.type==="number"&&cu(h,"number",h.value)}switch(T=c?ts(c):window,t){case"focusin":(jf(T)||T.contentEditable==="true")&&(Jr=T,Su=c,sa=null);break;case"focusout":sa=Su=Jr=null;break;case"mousedown":Mu=!0;break;case"contextmenu":case"mouseup":case"dragend":Mu=!1,$f(f,n,d);break;case"selectionchange":if(qv)break;case"keydown":case"keyup":$f(f,n,d)}var w;if(Td)e:{switch(t){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else Qr?n0(t,n)&&(N="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(t0&&n.locale!=="ko"&&(Qr||N!=="onCompositionStart"?N==="onCompositionEnd"&&Qr&&(w=e0()):(Ni=d,Md="value"in Ni?Ni.value:Ni.textContent,Qr=!0)),T=$o(c,N),0<T.length&&(N=new Bf(N,t,null,n,d),f.push({event:N,listeners:T}),w?N.data=w:(w=i0(n),w!==null&&(N.data=w)))),(w=Uv?Fv(t,n):kv(t,n))&&(c=$o(c,"onBeforeInput"),0<c.length&&(d=new Bf("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=w))}m0(f,e)})}function ya(t,e,n){return{instance:t,listener:e,currentTarget:n}}function $o(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ha(t,n),s!=null&&i.unshift(ya(t,s,r)),s=ha(t,e),s!=null&&i.push(ya(t,s,r))),t=t.return}return i}function Dr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Qf(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=ha(n,s),l!=null&&a.unshift(ya(n,l,o))):r||(l=ha(n,s),l!=null&&a.push(ya(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Zv=/\r\n?/g,Qv=/\u0000|\uFFFD/g;function Jf(t){return(typeof t=="string"?t:""+t).replace(Zv,`
`).replace(Qv,"")}function Ka(t,e,n){if(e=Jf(e),Jf(t)!==e&&n)throw Error(se(425))}function Ko(){}var Eu=null,wu=null;function Tu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var bu=typeof setTimeout=="function"?setTimeout:void 0,Jv=typeof clearTimeout=="function"?clearTimeout:void 0,eh=typeof Promise=="function"?Promise:void 0,e_=typeof queueMicrotask=="function"?queueMicrotask:typeof eh<"u"?function(t){return eh.resolve(null).then(t).catch(t_)}:bu;function t_(t){setTimeout(function(){throw t})}function cc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),ga(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);ga(e)}function Oi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function th(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ds=Math.random().toString(36).slice(2),Yn="__reactFiber$"+Ds,Sa="__reactProps$"+Ds,gi="__reactContainer$"+Ds,Au="__reactEvents$"+Ds,n_="__reactListeners$"+Ds,i_="__reactHandles$"+Ds;function pr(t){var e=t[Yn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[gi]||n[Yn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=th(t);t!==null;){if(n=t[Yn])return n;t=th(t)}return e}t=n,n=t.parentNode}return null}function Na(t){return t=t[Yn]||t[gi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ts(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(se(33))}function wl(t){return t[Sa]||null}var Cu=[],ns=-1;function Zi(t){return{current:t}}function lt(t){0>ns||(t.current=Cu[ns],Cu[ns]=null,ns--)}function rt(t,e){ns++,Cu[ns]=t.current,t.current=e}var qi={},jt=Zi(qi),an=Zi(!1),Mr=qi;function ys(t,e){var n=t.type.contextTypes;if(!n)return qi;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function on(t){return t=t.childContextTypes,t!=null}function Zo(){lt(an),lt(jt)}function nh(t,e,n){if(jt.current!==qi)throw Error(se(168));rt(jt,e),rt(an,n)}function x0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(se(108,Hx(t)||"Unknown",r));return gt({},n,i)}function Qo(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||qi,Mr=jt.current,rt(jt,t),rt(an,an.current),!0}function ih(t,e,n){var i=t.stateNode;if(!i)throw Error(se(169));n?(t=x0(t,e,Mr),i.__reactInternalMemoizedMergedChildContext=t,lt(an),lt(jt),rt(jt,t)):lt(an),rt(an,n)}var oi=null,Tl=!1,uc=!1;function v0(t){oi===null?oi=[t]:oi.push(t)}function r_(t){Tl=!0,v0(t)}function Qi(){if(!uc&&oi!==null){uc=!0;var t=0,e=et;try{var n=oi;for(et=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}oi=null,Tl=!1}catch(r){throw oi!==null&&(oi=oi.slice(t+1)),Vm(vd,Qi),r}finally{et=e,uc=!1}}return null}var is=[],rs=0,Jo=null,el=0,wn=[],Tn=0,Er=null,ui=1,di="";function lr(t,e){is[rs++]=el,is[rs++]=Jo,Jo=t,el=e}function _0(t,e,n){wn[Tn++]=ui,wn[Tn++]=di,wn[Tn++]=Er,Er=t;var i=ui;t=di;var r=32-Bn(i)-1;i&=~(1<<r),n+=1;var s=32-Bn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,ui=1<<32-Bn(e)+r|n<<r|i,di=s+t}else ui=1<<s|n<<r|i,di=t}function Ad(t){t.return!==null&&(lr(t,1),_0(t,1,0))}function Cd(t){for(;t===Jo;)Jo=is[--rs],is[rs]=null,el=is[--rs],is[rs]=null;for(;t===Er;)Er=wn[--Tn],wn[Tn]=null,di=wn[--Tn],wn[Tn]=null,ui=wn[--Tn],wn[Tn]=null}var xn=null,gn=null,dt=!1,kn=null;function y0(t,e){var n=bn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function rh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,xn=t,gn=Oi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,xn=t,gn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Er!==null?{id:ui,overflow:di}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=bn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,xn=t,gn=null,!0):!1;default:return!1}}function Ru(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Pu(t){if(dt){var e=gn;if(e){var n=e;if(!rh(t,e)){if(Ru(t))throw Error(se(418));e=Oi(n.nextSibling);var i=xn;e&&rh(t,e)?y0(i,n):(t.flags=t.flags&-4097|2,dt=!1,xn=t)}}else{if(Ru(t))throw Error(se(418));t.flags=t.flags&-4097|2,dt=!1,xn=t}}}function sh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;xn=t}function Za(t){if(t!==xn)return!1;if(!dt)return sh(t),dt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Tu(t.type,t.memoizedProps)),e&&(e=gn)){if(Ru(t))throw S0(),Error(se(418));for(;e;)y0(t,e),e=Oi(e.nextSibling)}if(sh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(se(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){gn=Oi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}gn=null}}else gn=xn?Oi(t.stateNode.nextSibling):null;return!0}function S0(){for(var t=gn;t;)t=Oi(t.nextSibling)}function Ss(){gn=xn=null,dt=!1}function Rd(t){kn===null?kn=[t]:kn.push(t)}var s_=_i.ReactCurrentBatchConfig;function Gs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(se(309));var i=n.stateNode}if(!i)throw Error(se(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(se(284));if(!n._owner)throw Error(se(290,t))}return t}function Qa(t,e){throw t=Object.prototype.toString.call(e),Error(se(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ah(t){var e=t._init;return e(t._payload)}function M0(t){function e(u,v){if(t){var m=u.deletions;m===null?(u.deletions=[v],u.flags|=16):m.push(v)}}function n(u,v){if(!t)return null;for(;v!==null;)e(u,v),v=v.sibling;return null}function i(u,v){for(u=new Map;v!==null;)v.key!==null?u.set(v.key,v):u.set(v.index,v),v=v.sibling;return u}function r(u,v){return u=Gi(u,v),u.index=0,u.sibling=null,u}function s(u,v,m){return u.index=m,t?(m=u.alternate,m!==null?(m=m.index,m<v?(u.flags|=2,v):m):(u.flags|=2,v)):(u.flags|=1048576,v)}function a(u){return t&&u.alternate===null&&(u.flags|=2),u}function o(u,v,m,M){return v===null||v.tag!==6?(v=xc(m,u.mode,M),v.return=u,v):(v=r(v,m),v.return=u,v)}function l(u,v,m,M){var R=m.type;return R===Zr?d(u,v,m.props.children,M,m.key):v!==null&&(v.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Ai&&ah(R)===v.type)?(M=r(v,m.props),M.ref=Gs(u,v,m),M.return=u,M):(M=zo(m.type,m.key,m.props,null,u.mode,M),M.ref=Gs(u,v,m),M.return=u,M)}function c(u,v,m,M){return v===null||v.tag!==4||v.stateNode.containerInfo!==m.containerInfo||v.stateNode.implementation!==m.implementation?(v=vc(m,u.mode,M),v.return=u,v):(v=r(v,m.children||[]),v.return=u,v)}function d(u,v,m,M,R){return v===null||v.tag!==7?(v=_r(m,u.mode,M,R),v.return=u,v):(v=r(v,m),v.return=u,v)}function f(u,v,m){if(typeof v=="string"&&v!==""||typeof v=="number")return v=xc(""+v,u.mode,m),v.return=u,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ha:return m=zo(v.type,v.key,v.props,null,u.mode,m),m.ref=Gs(u,null,v),m.return=u,m;case Kr:return v=vc(v,u.mode,m),v.return=u,v;case Ai:var M=v._init;return f(u,M(v._payload),m)}if(Qs(v)||ks(v))return v=_r(v,u.mode,m,null),v.return=u,v;Qa(u,v)}return null}function h(u,v,m,M){var R=v!==null?v.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return R!==null?null:o(u,v,""+m,M);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Ha:return m.key===R?l(u,v,m,M):null;case Kr:return m.key===R?c(u,v,m,M):null;case Ai:return R=m._init,h(u,v,R(m._payload),M)}if(Qs(m)||ks(m))return R!==null?null:d(u,v,m,M,null);Qa(u,m)}return null}function x(u,v,m,M,R){if(typeof M=="string"&&M!==""||typeof M=="number")return u=u.get(m)||null,o(v,u,""+M,R);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Ha:return u=u.get(M.key===null?m:M.key)||null,l(v,u,M,R);case Kr:return u=u.get(M.key===null?m:M.key)||null,c(v,u,M,R);case Ai:var T=M._init;return x(u,v,m,T(M._payload),R)}if(Qs(M)||ks(M))return u=u.get(m)||null,d(v,u,M,R,null);Qa(v,M)}return null}function _(u,v,m,M){for(var R=null,T=null,w=v,N=v=0,O=null;w!==null&&N<m.length;N++){w.index>N?(O=w,w=null):O=w.sibling;var y=h(u,w,m[N],M);if(y===null){w===null&&(w=O);break}t&&w&&y.alternate===null&&e(u,w),v=s(y,v,N),T===null?R=y:T.sibling=y,T=y,w=O}if(N===m.length)return n(u,w),dt&&lr(u,N),R;if(w===null){for(;N<m.length;N++)w=f(u,m[N],M),w!==null&&(v=s(w,v,N),T===null?R=w:T.sibling=w,T=w);return dt&&lr(u,N),R}for(w=i(u,w);N<m.length;N++)O=x(w,u,N,m[N],M),O!==null&&(t&&O.alternate!==null&&w.delete(O.key===null?N:O.key),v=s(O,v,N),T===null?R=O:T.sibling=O,T=O);return t&&w.forEach(function(A){return e(u,A)}),dt&&lr(u,N),R}function S(u,v,m,M){var R=ks(m);if(typeof R!="function")throw Error(se(150));if(m=R.call(m),m==null)throw Error(se(151));for(var T=R=null,w=v,N=v=0,O=null,y=m.next();w!==null&&!y.done;N++,y=m.next()){w.index>N?(O=w,w=null):O=w.sibling;var A=h(u,w,y.value,M);if(A===null){w===null&&(w=O);break}t&&w&&A.alternate===null&&e(u,w),v=s(A,v,N),T===null?R=A:T.sibling=A,T=A,w=O}if(y.done)return n(u,w),dt&&lr(u,N),R;if(w===null){for(;!y.done;N++,y=m.next())y=f(u,y.value,M),y!==null&&(v=s(y,v,N),T===null?R=y:T.sibling=y,T=y);return dt&&lr(u,N),R}for(w=i(u,w);!y.done;N++,y=m.next())y=x(w,u,N,y.value,M),y!==null&&(t&&y.alternate!==null&&w.delete(y.key===null?N:y.key),v=s(y,v,N),T===null?R=y:T.sibling=y,T=y);return t&&w.forEach(function(V){return e(u,V)}),dt&&lr(u,N),R}function p(u,v,m,M){if(typeof m=="object"&&m!==null&&m.type===Zr&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Ha:e:{for(var R=m.key,T=v;T!==null;){if(T.key===R){if(R=m.type,R===Zr){if(T.tag===7){n(u,T.sibling),v=r(T,m.props.children),v.return=u,u=v;break e}}else if(T.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===Ai&&ah(R)===T.type){n(u,T.sibling),v=r(T,m.props),v.ref=Gs(u,T,m),v.return=u,u=v;break e}n(u,T);break}else e(u,T);T=T.sibling}m.type===Zr?(v=_r(m.props.children,u.mode,M,m.key),v.return=u,u=v):(M=zo(m.type,m.key,m.props,null,u.mode,M),M.ref=Gs(u,v,m),M.return=u,u=M)}return a(u);case Kr:e:{for(T=m.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===m.containerInfo&&v.stateNode.implementation===m.implementation){n(u,v.sibling),v=r(v,m.children||[]),v.return=u,u=v;break e}else{n(u,v);break}else e(u,v);v=v.sibling}v=vc(m,u.mode,M),v.return=u,u=v}return a(u);case Ai:return T=m._init,p(u,v,T(m._payload),M)}if(Qs(m))return _(u,v,m,M);if(ks(m))return S(u,v,m,M);Qa(u,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,v!==null&&v.tag===6?(n(u,v.sibling),v=r(v,m),v.return=u,u=v):(n(u,v),v=xc(m,u.mode,M),v.return=u,u=v),a(u)):n(u,v)}return p}var Ms=M0(!0),E0=M0(!1),tl=Zi(null),nl=null,ss=null,Pd=null;function Ld(){Pd=ss=nl=null}function Nd(t){var e=tl.current;lt(tl),t._currentValue=e}function Lu(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ms(t,e){nl=t,Pd=ss=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(sn=!0),t.firstContext=null)}function Rn(t){var e=t._currentValue;if(Pd!==t)if(t={context:t,memoizedValue:e,next:null},ss===null){if(nl===null)throw Error(se(308));ss=t,nl.dependencies={lanes:0,firstContext:t}}else ss=ss.next=t;return e}var mr=null;function Dd(t){mr===null?mr=[t]:mr.push(t)}function w0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Dd(e)):(n.next=r.next,r.next=n),e.interleaved=n,xi(t,i)}function xi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Ci=!1;function Id(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function T0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function pi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function zi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ke&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,xi(t,n)}return r=i.interleaved,r===null?(e.next=e,Dd(i)):(e.next=r.next,r.next=e),i.interleaved=e,xi(t,n)}function Do(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,_d(t,n)}}function oh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function il(t,e,n,i){var r=t.updateQueue;Ci=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==a&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;a=0,d=c=l=null,o=s;do{var h=o.lane,x=o.eventTime;if((i&h)===h){d!==null&&(d=d.next={eventTime:x,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var _=t,S=o;switch(h=e,x=n,S.tag){case 1:if(_=S.payload,typeof _=="function"){f=_.call(x,f,h);break e}f=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=S.payload,h=typeof _=="function"?_.call(x,f,h):_,h==null)break e;f=gt({},f,h);break e;case 2:Ci=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else x={eventTime:x,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=x,l=f):d=d.next=x,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(d===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Tr|=a,t.lanes=a,t.memoizedState=f}}function lh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(se(191,r));r.call(i)}}}var Da={},Zn=Zi(Da),Ma=Zi(Da),Ea=Zi(Da);function gr(t){if(t===Da)throw Error(se(174));return t}function Ud(t,e){switch(rt(Ea,e),rt(Ma,t),rt(Zn,Da),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:du(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=du(e,t)}lt(Zn),rt(Zn,e)}function Es(){lt(Zn),lt(Ma),lt(Ea)}function b0(t){gr(Ea.current);var e=gr(Zn.current),n=du(e,t.type);e!==n&&(rt(Ma,t),rt(Zn,n))}function Fd(t){Ma.current===t&&(lt(Zn),lt(Ma))}var ht=Zi(0);function rl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var dc=[];function kd(){for(var t=0;t<dc.length;t++)dc[t]._workInProgressVersionPrimary=null;dc.length=0}var Io=_i.ReactCurrentDispatcher,fc=_i.ReactCurrentBatchConfig,wr=0,pt=null,wt=null,Pt=null,sl=!1,aa=!1,wa=0,a_=0;function zt(){throw Error(se(321))}function Od(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Gn(t[n],e[n]))return!1;return!0}function zd(t,e,n,i,r,s){if(wr=s,pt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Io.current=t===null||t.memoizedState===null?u_:d_,t=n(i,r),aa){s=0;do{if(aa=!1,wa=0,25<=s)throw Error(se(301));s+=1,Pt=wt=null,e.updateQueue=null,Io.current=f_,t=n(i,r)}while(aa)}if(Io.current=al,e=wt!==null&&wt.next!==null,wr=0,Pt=wt=pt=null,sl=!1,e)throw Error(se(300));return t}function Bd(){var t=wa!==0;return wa=0,t}function Wn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pt===null?pt.memoizedState=Pt=t:Pt=Pt.next=t,Pt}function Pn(){if(wt===null){var t=pt.alternate;t=t!==null?t.memoizedState:null}else t=wt.next;var e=Pt===null?pt.memoizedState:Pt.next;if(e!==null)Pt=e,wt=t;else{if(t===null)throw Error(se(310));wt=t,t={memoizedState:wt.memoizedState,baseState:wt.baseState,baseQueue:wt.baseQueue,queue:wt.queue,next:null},Pt===null?pt.memoizedState=Pt=t:Pt=Pt.next=t}return Pt}function Ta(t,e){return typeof e=="function"?e(t):e}function hc(t){var e=Pn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=wt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var d=c.lane;if((wr&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=f,a=i):l=l.next=f,pt.lanes|=d,Tr|=d}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,Gn(i,e.memoizedState)||(sn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,pt.lanes|=s,Tr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function pc(t){var e=Pn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);Gn(s,e.memoizedState)||(sn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function A0(){}function C0(t,e){var n=pt,i=Pn(),r=e(),s=!Gn(i.memoizedState,r);if(s&&(i.memoizedState=r,sn=!0),i=i.queue,Hd(L0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Pt!==null&&Pt.memoizedState.tag&1){if(n.flags|=2048,ba(9,P0.bind(null,n,i,r,e),void 0,null),Nt===null)throw Error(se(349));wr&30||R0(n,e,r)}return r}function R0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=pt.updateQueue,e===null?(e={lastEffect:null,stores:null},pt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function P0(t,e,n,i){e.value=n,e.getSnapshot=i,N0(e)&&D0(t)}function L0(t,e,n){return n(function(){N0(e)&&D0(t)})}function N0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Gn(t,n)}catch{return!0}}function D0(t){var e=xi(t,1);e!==null&&Hn(e,t,1,-1)}function ch(t){var e=Wn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ta,lastRenderedState:t},e.queue=t,t=t.dispatch=c_.bind(null,pt,t),[e.memoizedState,t]}function ba(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=pt.updateQueue,e===null?(e={lastEffect:null,stores:null},pt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function I0(){return Pn().memoizedState}function Uo(t,e,n,i){var r=Wn();pt.flags|=t,r.memoizedState=ba(1|e,n,void 0,i===void 0?null:i)}function bl(t,e,n,i){var r=Pn();i=i===void 0?null:i;var s=void 0;if(wt!==null){var a=wt.memoizedState;if(s=a.destroy,i!==null&&Od(i,a.deps)){r.memoizedState=ba(e,n,s,i);return}}pt.flags|=t,r.memoizedState=ba(1|e,n,s,i)}function uh(t,e){return Uo(8390656,8,t,e)}function Hd(t,e){return bl(2048,8,t,e)}function U0(t,e){return bl(4,2,t,e)}function F0(t,e){return bl(4,4,t,e)}function k0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function O0(t,e,n){return n=n!=null?n.concat([t]):null,bl(4,4,k0.bind(null,e,t),n)}function Gd(){}function z0(t,e){var n=Pn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Od(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function B0(t,e){var n=Pn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Od(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function H0(t,e,n){return wr&21?(Gn(n,e)||(n=Xm(),pt.lanes|=n,Tr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,sn=!0),t.memoizedState=n)}function o_(t,e){var n=et;et=n!==0&&4>n?n:4,t(!0);var i=fc.transition;fc.transition={};try{t(!1),e()}finally{et=n,fc.transition=i}}function G0(){return Pn().memoizedState}function l_(t,e,n){var i=Hi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},V0(t))j0(e,n);else if(n=w0(t,e,n,i),n!==null){var r=Kt();Hn(n,t,i,r),W0(n,e,i)}}function c_(t,e,n){var i=Hi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(V0(t))j0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,Gn(o,a)){var l=e.interleaved;l===null?(r.next=r,Dd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=w0(t,e,r,i),n!==null&&(r=Kt(),Hn(n,t,i,r),W0(n,e,i))}}function V0(t){var e=t.alternate;return t===pt||e!==null&&e===pt}function j0(t,e){aa=sl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function W0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,_d(t,n)}}var al={readContext:Rn,useCallback:zt,useContext:zt,useEffect:zt,useImperativeHandle:zt,useInsertionEffect:zt,useLayoutEffect:zt,useMemo:zt,useReducer:zt,useRef:zt,useState:zt,useDebugValue:zt,useDeferredValue:zt,useTransition:zt,useMutableSource:zt,useSyncExternalStore:zt,useId:zt,unstable_isNewReconciler:!1},u_={readContext:Rn,useCallback:function(t,e){return Wn().memoizedState=[t,e===void 0?null:e],t},useContext:Rn,useEffect:uh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Uo(4194308,4,k0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Uo(4194308,4,t,e)},useInsertionEffect:function(t,e){return Uo(4,2,t,e)},useMemo:function(t,e){var n=Wn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Wn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=l_.bind(null,pt,t),[i.memoizedState,t]},useRef:function(t){var e=Wn();return t={current:t},e.memoizedState=t},useState:ch,useDebugValue:Gd,useDeferredValue:function(t){return Wn().memoizedState=t},useTransition:function(){var t=ch(!1),e=t[0];return t=o_.bind(null,t[1]),Wn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=pt,r=Wn();if(dt){if(n===void 0)throw Error(se(407));n=n()}else{if(n=e(),Nt===null)throw Error(se(349));wr&30||R0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,uh(L0.bind(null,i,s,t),[t]),i.flags|=2048,ba(9,P0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Wn(),e=Nt.identifierPrefix;if(dt){var n=di,i=ui;n=(i&~(1<<32-Bn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=wa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=a_++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},d_={readContext:Rn,useCallback:z0,useContext:Rn,useEffect:Hd,useImperativeHandle:O0,useInsertionEffect:U0,useLayoutEffect:F0,useMemo:B0,useReducer:hc,useRef:I0,useState:function(){return hc(Ta)},useDebugValue:Gd,useDeferredValue:function(t){var e=Pn();return H0(e,wt.memoizedState,t)},useTransition:function(){var t=hc(Ta)[0],e=Pn().memoizedState;return[t,e]},useMutableSource:A0,useSyncExternalStore:C0,useId:G0,unstable_isNewReconciler:!1},f_={readContext:Rn,useCallback:z0,useContext:Rn,useEffect:Hd,useImperativeHandle:O0,useInsertionEffect:U0,useLayoutEffect:F0,useMemo:B0,useReducer:pc,useRef:I0,useState:function(){return pc(Ta)},useDebugValue:Gd,useDeferredValue:function(t){var e=Pn();return wt===null?e.memoizedState=t:H0(e,wt.memoizedState,t)},useTransition:function(){var t=pc(Ta)[0],e=Pn().memoizedState;return[t,e]},useMutableSource:A0,useSyncExternalStore:C0,useId:G0,unstable_isNewReconciler:!1};function Un(t,e){if(t&&t.defaultProps){e=gt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Nu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:gt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Al={isMounted:function(t){return(t=t._reactInternals)?Lr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Kt(),r=Hi(t),s=pi(i,r);s.payload=e,n!=null&&(s.callback=n),e=zi(t,s,r),e!==null&&(Hn(e,t,r,i),Do(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Kt(),r=Hi(t),s=pi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=zi(t,s,r),e!==null&&(Hn(e,t,r,i),Do(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Kt(),i=Hi(t),r=pi(n,i);r.tag=2,e!=null&&(r.callback=e),e=zi(t,r,i),e!==null&&(Hn(e,t,i,n),Do(e,t,i))}};function dh(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!va(n,i)||!va(r,s):!0}function X0(t,e,n){var i=!1,r=qi,s=e.contextType;return typeof s=="object"&&s!==null?s=Rn(s):(r=on(e)?Mr:jt.current,i=e.contextTypes,s=(i=i!=null)?ys(t,r):qi),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Al,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function fh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Al.enqueueReplaceState(e,e.state,null)}function Du(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Id(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Rn(s):(s=on(e)?Mr:jt.current,r.context=ys(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Nu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Al.enqueueReplaceState(r,r.state,null),il(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ws(t,e){try{var n="",i=e;do n+=Bx(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function mc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Iu(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var h_=typeof WeakMap=="function"?WeakMap:Map;function q0(t,e,n){n=pi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){ll||(ll=!0,ju=i),Iu(t,e)},n}function Y0(t,e,n){n=pi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Iu(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Iu(t,e),typeof i!="function"&&(Bi===null?Bi=new Set([this]):Bi.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function hh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new h_;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=A_.bind(null,t,e,n),e.then(t,t))}function ph(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function mh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=pi(-1,1),e.tag=2,zi(n,e,1))),n.lanes|=1),t)}var p_=_i.ReactCurrentOwner,sn=!1;function Yt(t,e,n,i){e.child=t===null?E0(e,null,n,i):Ms(e,t.child,n,i)}function gh(t,e,n,i,r){n=n.render;var s=e.ref;return ms(e,r),i=zd(t,e,n,i,s,r),n=Bd(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,vi(t,e,r)):(dt&&n&&Ad(e),e.flags|=1,Yt(t,e,i,r),e.child)}function xh(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Kd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,$0(t,e,s,i,r)):(t=zo(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:va,n(a,i)&&t.ref===e.ref)return vi(t,e,r)}return e.flags|=1,t=Gi(s,i),t.ref=e.ref,t.return=e,e.child=t}function $0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(va(s,i)&&t.ref===e.ref)if(sn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(sn=!0);else return e.lanes=t.lanes,vi(t,e,r)}return Uu(t,e,n,i,r)}function K0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},rt(os,pn),pn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,rt(os,pn),pn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,rt(os,pn),pn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,rt(os,pn),pn|=i;return Yt(t,e,r,n),e.child}function Z0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Uu(t,e,n,i,r){var s=on(n)?Mr:jt.current;return s=ys(e,s),ms(e,r),n=zd(t,e,n,i,s,r),i=Bd(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,vi(t,e,r)):(dt&&i&&Ad(e),e.flags|=1,Yt(t,e,n,r),e.child)}function vh(t,e,n,i,r){if(on(n)){var s=!0;Qo(e)}else s=!1;if(ms(e,r),e.stateNode===null)Fo(t,e),X0(e,n,i),Du(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Rn(c):(c=on(n)?Mr:jt.current,c=ys(e,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&fh(e,a,i,c),Ci=!1;var h=e.memoizedState;a.state=h,il(e,i,a,r),l=e.memoizedState,o!==i||h!==l||an.current||Ci?(typeof d=="function"&&(Nu(e,n,d,i),l=e.memoizedState),(o=Ci||dh(e,n,o,i,h,l,c))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,T0(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Un(e.type,o),a.props=c,f=e.pendingProps,h=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Rn(l):(l=on(n)?Mr:jt.current,l=ys(e,l));var x=n.getDerivedStateFromProps;(d=typeof x=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==f||h!==l)&&fh(e,a,i,l),Ci=!1,h=e.memoizedState,a.state=h,il(e,i,a,r);var _=e.memoizedState;o!==f||h!==_||an.current||Ci?(typeof x=="function"&&(Nu(e,n,x,i),_=e.memoizedState),(c=Ci||dh(e,n,c,i,h,_,l)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,_,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,_,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),a.props=i,a.state=_,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Fu(t,e,n,i,s,r)}function Fu(t,e,n,i,r,s){Z0(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&ih(e,n,!1),vi(t,e,s);i=e.stateNode,p_.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Ms(e,t.child,null,s),e.child=Ms(e,null,o,s)):Yt(t,e,o,s),e.memoizedState=i.state,r&&ih(e,n,!0),e.child}function Q0(t){var e=t.stateNode;e.pendingContext?nh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&nh(t,e.context,!1),Ud(t,e.containerInfo)}function _h(t,e,n,i,r){return Ss(),Rd(r),e.flags|=256,Yt(t,e,n,i),e.child}var ku={dehydrated:null,treeContext:null,retryLane:0};function Ou(t){return{baseLanes:t,cachePool:null,transitions:null}}function J0(t,e,n){var i=e.pendingProps,r=ht.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),rt(ht,r&1),t===null)return Pu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Pl(a,i,0,null),t=_r(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ou(n),e.memoizedState=ku,t):Vd(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return m_(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Gi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=Gi(o,s):(s=_r(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Ou(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=ku,i}return s=t.child,t=s.sibling,i=Gi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Vd(t,e){return e=Pl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ja(t,e,n,i){return i!==null&&Rd(i),Ms(e,t.child,null,n),t=Vd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function m_(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=mc(Error(se(422))),Ja(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Pl({mode:"visible",children:i.children},r,0,null),s=_r(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ms(e,t.child,null,a),e.child.memoizedState=Ou(a),e.memoizedState=ku,s);if(!(e.mode&1))return Ja(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(se(419)),i=mc(s,i,void 0),Ja(t,e,a,i)}if(o=(a&t.childLanes)!==0,sn||o){if(i=Nt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,xi(t,r),Hn(i,t,r,-1))}return $d(),i=mc(Error(se(421))),Ja(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=C_.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,gn=Oi(r.nextSibling),xn=e,dt=!0,kn=null,t!==null&&(wn[Tn++]=ui,wn[Tn++]=di,wn[Tn++]=Er,ui=t.id,di=t.overflow,Er=e),e=Vd(e,i.children),e.flags|=4096,e)}function yh(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Lu(t.return,e,n)}function gc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function eg(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Yt(t,e,i.children,n),i=ht.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&yh(t,n,e);else if(t.tag===19)yh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(rt(ht,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&rl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),gc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&rl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}gc(e,!0,n,null,s);break;case"together":gc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Fo(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function vi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Tr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(se(153));if(e.child!==null){for(t=e.child,n=Gi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Gi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function g_(t,e,n){switch(e.tag){case 3:Q0(e),Ss();break;case 5:b0(e);break;case 1:on(e.type)&&Qo(e);break;case 4:Ud(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;rt(tl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(rt(ht,ht.current&1),e.flags|=128,null):n&e.child.childLanes?J0(t,e,n):(rt(ht,ht.current&1),t=vi(t,e,n),t!==null?t.sibling:null);rt(ht,ht.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return eg(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),rt(ht,ht.current),i)break;return null;case 22:case 23:return e.lanes=0,K0(t,e,n)}return vi(t,e,n)}var tg,zu,ng,ig;tg=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};zu=function(){};ng=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,gr(Zn.current);var s=null;switch(n){case"input":r=ou(t,r),i=ou(t,i),s=[];break;case"select":r=gt({},r,{value:void 0}),i=gt({},i,{value:void 0}),s=[];break;case"textarea":r=uu(t,r),i=uu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Ko)}fu(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(da.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(da.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&at("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};ig=function(t,e,n,i){n!==i&&(e.flags|=4)};function Vs(t,e){if(!dt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Bt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function x_(t,e,n){var i=e.pendingProps;switch(Cd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Bt(e),null;case 1:return on(e.type)&&Zo(),Bt(e),null;case 3:return i=e.stateNode,Es(),lt(an),lt(jt),kd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Za(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,kn!==null&&(qu(kn),kn=null))),zu(t,e),Bt(e),null;case 5:Fd(e);var r=gr(Ea.current);if(n=e.type,t!==null&&e.stateNode!=null)ng(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(se(166));return Bt(e),null}if(t=gr(Zn.current),Za(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Yn]=e,i[Sa]=s,t=(e.mode&1)!==0,n){case"dialog":at("cancel",i),at("close",i);break;case"iframe":case"object":case"embed":at("load",i);break;case"video":case"audio":for(r=0;r<ea.length;r++)at(ea[r],i);break;case"source":at("error",i);break;case"img":case"image":case"link":at("error",i),at("load",i);break;case"details":at("toggle",i);break;case"input":Rf(i,s),at("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},at("invalid",i);break;case"textarea":Lf(i,s),at("invalid",i)}fu(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Ka(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Ka(i.textContent,o,t),r=["children",""+o]):da.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&at("scroll",i)}switch(n){case"input":Ga(i),Pf(i,s,!0);break;case"textarea":Ga(i),Nf(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Ko)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Lm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[Yn]=e,t[Sa]=i,tg(t,e,!1,!1),e.stateNode=t;e:{switch(a=hu(n,i),n){case"dialog":at("cancel",t),at("close",t),r=i;break;case"iframe":case"object":case"embed":at("load",t),r=i;break;case"video":case"audio":for(r=0;r<ea.length;r++)at(ea[r],t);r=i;break;case"source":at("error",t),r=i;break;case"img":case"image":case"link":at("error",t),at("load",t),r=i;break;case"details":at("toggle",t),r=i;break;case"input":Rf(t,i),r=ou(t,i),at("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=gt({},i,{value:void 0}),at("invalid",t);break;case"textarea":Lf(t,i),r=uu(t,i),at("invalid",t);break;default:r=i}fu(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Im(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Nm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&fa(t,l):typeof l=="number"&&fa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(da.hasOwnProperty(s)?l!=null&&s==="onScroll"&&at("scroll",t):l!=null&&hd(t,s,l,a))}switch(n){case"input":Ga(t),Pf(t,i,!1);break;case"textarea":Ga(t),Nf(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Xi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ds(t,!!i.multiple,s,!1):i.defaultValue!=null&&ds(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Ko)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Bt(e),null;case 6:if(t&&e.stateNode!=null)ig(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(se(166));if(n=gr(Ea.current),gr(Zn.current),Za(e)){if(i=e.stateNode,n=e.memoizedProps,i[Yn]=e,(s=i.nodeValue!==n)&&(t=xn,t!==null))switch(t.tag){case 3:Ka(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ka(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Yn]=e,e.stateNode=i}return Bt(e),null;case 13:if(lt(ht),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(dt&&gn!==null&&e.mode&1&&!(e.flags&128))S0(),Ss(),e.flags|=98560,s=!1;else if(s=Za(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(se(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(se(317));s[Yn]=e}else Ss(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Bt(e),s=!1}else kn!==null&&(qu(kn),kn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||ht.current&1?Tt===0&&(Tt=3):$d())),e.updateQueue!==null&&(e.flags|=4),Bt(e),null);case 4:return Es(),zu(t,e),t===null&&_a(e.stateNode.containerInfo),Bt(e),null;case 10:return Nd(e.type._context),Bt(e),null;case 17:return on(e.type)&&Zo(),Bt(e),null;case 19:if(lt(ht),s=e.memoizedState,s===null)return Bt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)Vs(s,!1);else{if(Tt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=rl(t),a!==null){for(e.flags|=128,Vs(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return rt(ht,ht.current&1|2),e.child}t=t.sibling}s.tail!==null&&yt()>Ts&&(e.flags|=128,i=!0,Vs(s,!1),e.lanes=4194304)}else{if(!i)if(t=rl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Vs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!dt)return Bt(e),null}else 2*yt()-s.renderingStartTime>Ts&&n!==1073741824&&(e.flags|=128,i=!0,Vs(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=yt(),e.sibling=null,n=ht.current,rt(ht,i?n&1|2:n&1),e):(Bt(e),null);case 22:case 23:return Yd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?pn&1073741824&&(Bt(e),e.subtreeFlags&6&&(e.flags|=8192)):Bt(e),null;case 24:return null;case 25:return null}throw Error(se(156,e.tag))}function v_(t,e){switch(Cd(e),e.tag){case 1:return on(e.type)&&Zo(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Es(),lt(an),lt(jt),kd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Fd(e),null;case 13:if(lt(ht),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(se(340));Ss()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return lt(ht),null;case 4:return Es(),null;case 10:return Nd(e.type._context),null;case 22:case 23:return Yd(),null;case 24:return null;default:return null}}var eo=!1,Vt=!1,__=typeof WeakSet=="function"?WeakSet:Set,_e=null;function as(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){vt(t,e,i)}else n.current=null}function Bu(t,e,n){try{n()}catch(i){vt(t,e,i)}}var Sh=!1;function y_(t,e){if(Eu=qo,t=l0(),bd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,d=0,f=t,h=null;t:for(;;){for(var x;f!==n||r!==0&&f.nodeType!==3||(o=a+r),f!==s||i!==0&&f.nodeType!==3||(l=a+i),f.nodeType===3&&(a+=f.nodeValue.length),(x=f.firstChild)!==null;)h=f,f=x;for(;;){if(f===t)break t;if(h===n&&++c===r&&(o=a),h===s&&++d===i&&(l=a),(x=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=x}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(wu={focusedElem:t,selectionRange:n},qo=!1,_e=e;_e!==null;)if(e=_e,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,_e=t;else for(;_e!==null;){e=_e;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var S=_.memoizedProps,p=_.memoizedState,u=e.stateNode,v=u.getSnapshotBeforeUpdate(e.elementType===e.type?S:Un(e.type,S),p);u.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var m=e.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(M){vt(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,_e=t;break}_e=e.return}return _=Sh,Sh=!1,_}function oa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Bu(e,n,s)}r=r.next}while(r!==i)}}function Cl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Hu(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function rg(t){var e=t.alternate;e!==null&&(t.alternate=null,rg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Yn],delete e[Sa],delete e[Au],delete e[n_],delete e[i_])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function sg(t){return t.tag===5||t.tag===3||t.tag===4}function Mh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||sg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Gu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ko));else if(i!==4&&(t=t.child,t!==null))for(Gu(t,e,n),t=t.sibling;t!==null;)Gu(t,e,n),t=t.sibling}function Vu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Vu(t,e,n),t=t.sibling;t!==null;)Vu(t,e,n),t=t.sibling}var It=null,Fn=!1;function yi(t,e,n){for(n=n.child;n!==null;)ag(t,e,n),n=n.sibling}function ag(t,e,n){if(Kn&&typeof Kn.onCommitFiberUnmount=="function")try{Kn.onCommitFiberUnmount(yl,n)}catch{}switch(n.tag){case 5:Vt||as(n,e);case 6:var i=It,r=Fn;It=null,yi(t,e,n),It=i,Fn=r,It!==null&&(Fn?(t=It,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):It.removeChild(n.stateNode));break;case 18:It!==null&&(Fn?(t=It,n=n.stateNode,t.nodeType===8?cc(t.parentNode,n):t.nodeType===1&&cc(t,n),ga(t)):cc(It,n.stateNode));break;case 4:i=It,r=Fn,It=n.stateNode.containerInfo,Fn=!0,yi(t,e,n),It=i,Fn=r;break;case 0:case 11:case 14:case 15:if(!Vt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Bu(n,e,a),r=r.next}while(r!==i)}yi(t,e,n);break;case 1:if(!Vt&&(as(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){vt(n,e,o)}yi(t,e,n);break;case 21:yi(t,e,n);break;case 22:n.mode&1?(Vt=(i=Vt)||n.memoizedState!==null,yi(t,e,n),Vt=i):yi(t,e,n);break;default:yi(t,e,n)}}function Eh(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new __),e.forEach(function(i){var r=R_.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Ln(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:It=o.stateNode,Fn=!1;break e;case 3:It=o.stateNode.containerInfo,Fn=!0;break e;case 4:It=o.stateNode.containerInfo,Fn=!0;break e}o=o.return}if(It===null)throw Error(se(160));ag(s,a,r),It=null,Fn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){vt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)og(e,t),e=e.sibling}function og(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Ln(e,t),jn(t),i&4){try{oa(3,t,t.return),Cl(3,t)}catch(S){vt(t,t.return,S)}try{oa(5,t,t.return)}catch(S){vt(t,t.return,S)}}break;case 1:Ln(e,t),jn(t),i&512&&n!==null&&as(n,n.return);break;case 5:if(Ln(e,t),jn(t),i&512&&n!==null&&as(n,n.return),t.flags&32){var r=t.stateNode;try{fa(r,"")}catch(S){vt(t,t.return,S)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Rm(r,s),hu(o,a);var c=hu(o,s);for(a=0;a<l.length;a+=2){var d=l[a],f=l[a+1];d==="style"?Im(r,f):d==="dangerouslySetInnerHTML"?Nm(r,f):d==="children"?fa(r,f):hd(r,d,f,c)}switch(o){case"input":lu(r,s);break;case"textarea":Pm(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var x=s.value;x!=null?ds(r,!!s.multiple,x,!1):h!==!!s.multiple&&(s.defaultValue!=null?ds(r,!!s.multiple,s.defaultValue,!0):ds(r,!!s.multiple,s.multiple?[]:"",!1))}r[Sa]=s}catch(S){vt(t,t.return,S)}}break;case 6:if(Ln(e,t),jn(t),i&4){if(t.stateNode===null)throw Error(se(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(S){vt(t,t.return,S)}}break;case 3:if(Ln(e,t),jn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ga(e.containerInfo)}catch(S){vt(t,t.return,S)}break;case 4:Ln(e,t),jn(t);break;case 13:Ln(e,t),jn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Xd=yt())),i&4&&Eh(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(Vt=(c=Vt)||d,Ln(e,t),Vt=c):Ln(e,t),jn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(_e=t,d=t.child;d!==null;){for(f=_e=d;_e!==null;){switch(h=_e,x=h.child,h.tag){case 0:case 11:case 14:case 15:oa(4,h,h.return);break;case 1:as(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(S){vt(i,n,S)}}break;case 5:as(h,h.return);break;case 22:if(h.memoizedState!==null){Th(f);continue}}x!==null?(x.return=h,_e=x):Th(f)}d=d.sibling}e:for(d=null,f=t;;){if(f.tag===5){if(d===null){d=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=f.stateNode,l=f.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Dm("display",a))}catch(S){vt(t,t.return,S)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(S){vt(t,t.return,S)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Ln(e,t),jn(t),i&4&&Eh(t);break;case 21:break;default:Ln(e,t),jn(t)}}function jn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(sg(n)){var i=n;break e}n=n.return}throw Error(se(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(fa(r,""),i.flags&=-33);var s=Mh(t);Vu(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Mh(t);Gu(t,o,a);break;default:throw Error(se(161))}}catch(l){vt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function S_(t,e,n){_e=t,lg(t)}function lg(t,e,n){for(var i=(t.mode&1)!==0;_e!==null;){var r=_e,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||eo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||Vt;o=eo;var c=Vt;if(eo=a,(Vt=l)&&!c)for(_e=r;_e!==null;)a=_e,l=a.child,a.tag===22&&a.memoizedState!==null?bh(r):l!==null?(l.return=a,_e=l):bh(r);for(;s!==null;)_e=s,lg(s),s=s.sibling;_e=r,eo=o,Vt=c}wh(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,_e=s):wh(t)}}function wh(t){for(;_e!==null;){var e=_e;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Vt||Cl(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Vt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Un(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&lh(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}lh(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&ga(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}Vt||e.flags&512&&Hu(e)}catch(h){vt(e,e.return,h)}}if(e===t){_e=null;break}if(n=e.sibling,n!==null){n.return=e.return,_e=n;break}_e=e.return}}function Th(t){for(;_e!==null;){var e=_e;if(e===t){_e=null;break}var n=e.sibling;if(n!==null){n.return=e.return,_e=n;break}_e=e.return}}function bh(t){for(;_e!==null;){var e=_e;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Cl(4,e)}catch(l){vt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){vt(e,r,l)}}var s=e.return;try{Hu(e)}catch(l){vt(e,s,l)}break;case 5:var a=e.return;try{Hu(e)}catch(l){vt(e,a,l)}}}catch(l){vt(e,e.return,l)}if(e===t){_e=null;break}var o=e.sibling;if(o!==null){o.return=e.return,_e=o;break}_e=e.return}}var M_=Math.ceil,ol=_i.ReactCurrentDispatcher,jd=_i.ReactCurrentOwner,An=_i.ReactCurrentBatchConfig,Ke=0,Nt=null,Mt=null,Ft=0,pn=0,os=Zi(0),Tt=0,Aa=null,Tr=0,Rl=0,Wd=0,la=null,tn=null,Xd=0,Ts=1/0,ai=null,ll=!1,ju=null,Bi=null,to=!1,Di=null,cl=0,ca=0,Wu=null,ko=-1,Oo=0;function Kt(){return Ke&6?yt():ko!==-1?ko:ko=yt()}function Hi(t){return t.mode&1?Ke&2&&Ft!==0?Ft&-Ft:s_.transition!==null?(Oo===0&&(Oo=Xm()),Oo):(t=et,t!==0||(t=window.event,t=t===void 0?16:Jm(t.type)),t):1}function Hn(t,e,n,i){if(50<ca)throw ca=0,Wu=null,Error(se(185));Pa(t,n,i),(!(Ke&2)||t!==Nt)&&(t===Nt&&(!(Ke&2)&&(Rl|=n),Tt===4&&Pi(t,Ft)),ln(t,i),n===1&&Ke===0&&!(e.mode&1)&&(Ts=yt()+500,Tl&&Qi()))}function ln(t,e){var n=t.callbackNode;sv(t,e);var i=Xo(t,t===Nt?Ft:0);if(i===0)n!==null&&Uf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Uf(n),e===1)t.tag===0?r_(Ah.bind(null,t)):v0(Ah.bind(null,t)),e_(function(){!(Ke&6)&&Qi()}),n=null;else{switch(qm(i)){case 1:n=vd;break;case 4:n=jm;break;case 16:n=Wo;break;case 536870912:n=Wm;break;default:n=Wo}n=gg(n,cg.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function cg(t,e){if(ko=-1,Oo=0,Ke&6)throw Error(se(327));var n=t.callbackNode;if(gs()&&t.callbackNode!==n)return null;var i=Xo(t,t===Nt?Ft:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=ul(t,i);else{e=i;var r=Ke;Ke|=2;var s=dg();(Nt!==t||Ft!==e)&&(ai=null,Ts=yt()+500,vr(t,e));do try{T_();break}catch(o){ug(t,o)}while(!0);Ld(),ol.current=s,Ke=r,Mt!==null?e=0:(Nt=null,Ft=0,e=Tt)}if(e!==0){if(e===2&&(r=vu(t),r!==0&&(i=r,e=Xu(t,r))),e===1)throw n=Aa,vr(t,0),Pi(t,i),ln(t,yt()),n;if(e===6)Pi(t,i);else{if(r=t.current.alternate,!(i&30)&&!E_(r)&&(e=ul(t,i),e===2&&(s=vu(t),s!==0&&(i=s,e=Xu(t,s))),e===1))throw n=Aa,vr(t,0),Pi(t,i),ln(t,yt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(se(345));case 2:cr(t,tn,ai);break;case 3:if(Pi(t,i),(i&130023424)===i&&(e=Xd+500-yt(),10<e)){if(Xo(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Kt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=bu(cr.bind(null,t,tn,ai),e);break}cr(t,tn,ai);break;case 4:if(Pi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-Bn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=yt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*M_(i/1960))-i,10<i){t.timeoutHandle=bu(cr.bind(null,t,tn,ai),i);break}cr(t,tn,ai);break;case 5:cr(t,tn,ai);break;default:throw Error(se(329))}}}return ln(t,yt()),t.callbackNode===n?cg.bind(null,t):null}function Xu(t,e){var n=la;return t.current.memoizedState.isDehydrated&&(vr(t,e).flags|=256),t=ul(t,e),t!==2&&(e=tn,tn=n,e!==null&&qu(e)),t}function qu(t){tn===null?tn=t:tn.push.apply(tn,t)}function E_(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Gn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Pi(t,e){for(e&=~Wd,e&=~Rl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Bn(e),i=1<<n;t[n]=-1,e&=~i}}function Ah(t){if(Ke&6)throw Error(se(327));gs();var e=Xo(t,0);if(!(e&1))return ln(t,yt()),null;var n=ul(t,e);if(t.tag!==0&&n===2){var i=vu(t);i!==0&&(e=i,n=Xu(t,i))}if(n===1)throw n=Aa,vr(t,0),Pi(t,e),ln(t,yt()),n;if(n===6)throw Error(se(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,cr(t,tn,ai),ln(t,yt()),null}function qd(t,e){var n=Ke;Ke|=1;try{return t(e)}finally{Ke=n,Ke===0&&(Ts=yt()+500,Tl&&Qi())}}function br(t){Di!==null&&Di.tag===0&&!(Ke&6)&&gs();var e=Ke;Ke|=1;var n=An.transition,i=et;try{if(An.transition=null,et=1,t)return t()}finally{et=i,An.transition=n,Ke=e,!(Ke&6)&&Qi()}}function Yd(){pn=os.current,lt(os)}function vr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Jv(n)),Mt!==null)for(n=Mt.return;n!==null;){var i=n;switch(Cd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Zo();break;case 3:Es(),lt(an),lt(jt),kd();break;case 5:Fd(i);break;case 4:Es();break;case 13:lt(ht);break;case 19:lt(ht);break;case 10:Nd(i.type._context);break;case 22:case 23:Yd()}n=n.return}if(Nt=t,Mt=t=Gi(t.current,null),Ft=pn=e,Tt=0,Aa=null,Wd=Rl=Tr=0,tn=la=null,mr!==null){for(e=0;e<mr.length;e++)if(n=mr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}mr=null}return t}function ug(t,e){do{var n=Mt;try{if(Ld(),Io.current=al,sl){for(var i=pt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}sl=!1}if(wr=0,Pt=wt=pt=null,aa=!1,wa=0,jd.current=null,n===null||n.return===null){Tt=1,Aa=e,Mt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Ft,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=o,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var x=ph(a);if(x!==null){x.flags&=-257,mh(x,a,o,s,e),x.mode&1&&hh(s,c,e),e=x,l=c;var _=e.updateQueue;if(_===null){var S=new Set;S.add(l),e.updateQueue=S}else _.add(l);break e}else{if(!(e&1)){hh(s,c,e),$d();break e}l=Error(se(426))}}else if(dt&&o.mode&1){var p=ph(a);if(p!==null){!(p.flags&65536)&&(p.flags|=256),mh(p,a,o,s,e),Rd(ws(l,o));break e}}s=l=ws(l,o),Tt!==4&&(Tt=2),la===null?la=[s]:la.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=q0(s,l,e);oh(s,u);break e;case 1:o=l;var v=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Bi===null||!Bi.has(m)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=Y0(s,o,e);oh(s,M);break e}}s=s.return}while(s!==null)}hg(n)}catch(R){e=R,Mt===n&&n!==null&&(Mt=n=n.return);continue}break}while(!0)}function dg(){var t=ol.current;return ol.current=al,t===null?al:t}function $d(){(Tt===0||Tt===3||Tt===2)&&(Tt=4),Nt===null||!(Tr&268435455)&&!(Rl&268435455)||Pi(Nt,Ft)}function ul(t,e){var n=Ke;Ke|=2;var i=dg();(Nt!==t||Ft!==e)&&(ai=null,vr(t,e));do try{w_();break}catch(r){ug(t,r)}while(!0);if(Ld(),Ke=n,ol.current=i,Mt!==null)throw Error(se(261));return Nt=null,Ft=0,Tt}function w_(){for(;Mt!==null;)fg(Mt)}function T_(){for(;Mt!==null&&!Kx();)fg(Mt)}function fg(t){var e=mg(t.alternate,t,pn);t.memoizedProps=t.pendingProps,e===null?hg(t):Mt=e,jd.current=null}function hg(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=v_(n,e),n!==null){n.flags&=32767,Mt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Tt=6,Mt=null;return}}else if(n=x_(n,e,pn),n!==null){Mt=n;return}if(e=e.sibling,e!==null){Mt=e;return}Mt=e=t}while(e!==null);Tt===0&&(Tt=5)}function cr(t,e,n){var i=et,r=An.transition;try{An.transition=null,et=1,b_(t,e,n,i)}finally{An.transition=r,et=i}return null}function b_(t,e,n,i){do gs();while(Di!==null);if(Ke&6)throw Error(se(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(se(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(av(t,s),t===Nt&&(Mt=Nt=null,Ft=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||to||(to=!0,gg(Wo,function(){return gs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=An.transition,An.transition=null;var a=et;et=1;var o=Ke;Ke|=4,jd.current=null,y_(t,n),og(n,t),Xv(wu),qo=!!Eu,wu=Eu=null,t.current=n,S_(n),Zx(),Ke=o,et=a,An.transition=s}else t.current=n;if(to&&(to=!1,Di=t,cl=r),s=t.pendingLanes,s===0&&(Bi=null),ev(n.stateNode),ln(t,yt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(ll)throw ll=!1,t=ju,ju=null,t;return cl&1&&t.tag!==0&&gs(),s=t.pendingLanes,s&1?t===Wu?ca++:(ca=0,Wu=t):ca=0,Qi(),null}function gs(){if(Di!==null){var t=qm(cl),e=An.transition,n=et;try{if(An.transition=null,et=16>t?16:t,Di===null)var i=!1;else{if(t=Di,Di=null,cl=0,Ke&6)throw Error(se(331));var r=Ke;for(Ke|=4,_e=t.current;_e!==null;){var s=_e,a=s.child;if(_e.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(_e=c;_e!==null;){var d=_e;switch(d.tag){case 0:case 11:case 15:oa(8,d,s)}var f=d.child;if(f!==null)f.return=d,_e=f;else for(;_e!==null;){d=_e;var h=d.sibling,x=d.return;if(rg(d),d===c){_e=null;break}if(h!==null){h.return=x,_e=h;break}_e=x}}}var _=s.alternate;if(_!==null){var S=_.child;if(S!==null){_.child=null;do{var p=S.sibling;S.sibling=null,S=p}while(S!==null)}}_e=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,_e=a;else e:for(;_e!==null;){if(s=_e,s.flags&2048)switch(s.tag){case 0:case 11:case 15:oa(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,_e=u;break e}_e=s.return}}var v=t.current;for(_e=v;_e!==null;){a=_e;var m=a.child;if(a.subtreeFlags&2064&&m!==null)m.return=a,_e=m;else e:for(a=v;_e!==null;){if(o=_e,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Cl(9,o)}}catch(R){vt(o,o.return,R)}if(o===a){_e=null;break e}var M=o.sibling;if(M!==null){M.return=o.return,_e=M;break e}_e=o.return}}if(Ke=r,Qi(),Kn&&typeof Kn.onPostCommitFiberRoot=="function")try{Kn.onPostCommitFiberRoot(yl,t)}catch{}i=!0}return i}finally{et=n,An.transition=e}}return!1}function Ch(t,e,n){e=ws(n,e),e=q0(t,e,1),t=zi(t,e,1),e=Kt(),t!==null&&(Pa(t,1,e),ln(t,e))}function vt(t,e,n){if(t.tag===3)Ch(t,t,n);else for(;e!==null;){if(e.tag===3){Ch(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Bi===null||!Bi.has(i))){t=ws(n,t),t=Y0(e,t,1),e=zi(e,t,1),t=Kt(),e!==null&&(Pa(e,1,t),ln(e,t));break}}e=e.return}}function A_(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Kt(),t.pingedLanes|=t.suspendedLanes&n,Nt===t&&(Ft&n)===n&&(Tt===4||Tt===3&&(Ft&130023424)===Ft&&500>yt()-Xd?vr(t,0):Wd|=n),ln(t,e)}function pg(t,e){e===0&&(t.mode&1?(e=Wa,Wa<<=1,!(Wa&130023424)&&(Wa=4194304)):e=1);var n=Kt();t=xi(t,e),t!==null&&(Pa(t,e,n),ln(t,n))}function C_(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),pg(t,n)}function R_(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(se(314))}i!==null&&i.delete(e),pg(t,n)}var mg;mg=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||an.current)sn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return sn=!1,g_(t,e,n);sn=!!(t.flags&131072)}else sn=!1,dt&&e.flags&1048576&&_0(e,el,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Fo(t,e),t=e.pendingProps;var r=ys(e,jt.current);ms(e,n),r=zd(null,e,i,t,r,n);var s=Bd();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,on(i)?(s=!0,Qo(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Id(e),r.updater=Al,e.stateNode=r,r._reactInternals=e,Du(e,i,t,n),e=Fu(null,e,i,!0,s,n)):(e.tag=0,dt&&s&&Ad(e),Yt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Fo(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=L_(i),t=Un(i,t),r){case 0:e=Uu(null,e,i,t,n);break e;case 1:e=vh(null,e,i,t,n);break e;case 11:e=gh(null,e,i,t,n);break e;case 14:e=xh(null,e,i,Un(i.type,t),n);break e}throw Error(se(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),Uu(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),vh(t,e,i,r,n);case 3:e:{if(Q0(e),t===null)throw Error(se(387));i=e.pendingProps,s=e.memoizedState,r=s.element,T0(t,e),il(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=ws(Error(se(423)),e),e=_h(t,e,i,n,r);break e}else if(i!==r){r=ws(Error(se(424)),e),e=_h(t,e,i,n,r);break e}else for(gn=Oi(e.stateNode.containerInfo.firstChild),xn=e,dt=!0,kn=null,n=E0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ss(),i===r){e=vi(t,e,n);break e}Yt(t,e,i,n)}e=e.child}return e;case 5:return b0(e),t===null&&Pu(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Tu(i,r)?a=null:s!==null&&Tu(i,s)&&(e.flags|=32),Z0(t,e),Yt(t,e,a,n),e.child;case 6:return t===null&&Pu(e),null;case 13:return J0(t,e,n);case 4:return Ud(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ms(e,null,i,n):Yt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),gh(t,e,i,r,n);case 7:return Yt(t,e,e.pendingProps,n),e.child;case 8:return Yt(t,e,e.pendingProps.children,n),e.child;case 12:return Yt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,rt(tl,i._currentValue),i._currentValue=a,s!==null)if(Gn(s.value,a)){if(s.children===r.children&&!an.current){e=vi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=pi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Lu(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(se(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Lu(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}Yt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,ms(e,n),r=Rn(r),i=i(r),e.flags|=1,Yt(t,e,i,n),e.child;case 14:return i=e.type,r=Un(i,e.pendingProps),r=Un(i.type,r),xh(t,e,i,r,n);case 15:return $0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Un(i,r),Fo(t,e),e.tag=1,on(i)?(t=!0,Qo(e)):t=!1,ms(e,n),X0(e,i,r),Du(e,i,r,n),Fu(null,e,i,!0,t,n);case 19:return eg(t,e,n);case 22:return K0(t,e,n)}throw Error(se(156,e.tag))};function gg(t,e){return Vm(t,e)}function P_(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bn(t,e,n,i){return new P_(t,e,n,i)}function Kd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function L_(t){if(typeof t=="function")return Kd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===md)return 11;if(t===gd)return 14}return 2}function Gi(t,e){var n=t.alternate;return n===null?(n=bn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function zo(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Kd(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Zr:return _r(n.children,r,s,e);case pd:a=8,r|=8;break;case iu:return t=bn(12,n,e,r|2),t.elementType=iu,t.lanes=s,t;case ru:return t=bn(13,n,e,r),t.elementType=ru,t.lanes=s,t;case su:return t=bn(19,n,e,r),t.elementType=su,t.lanes=s,t;case bm:return Pl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case wm:a=10;break e;case Tm:a=9;break e;case md:a=11;break e;case gd:a=14;break e;case Ai:a=16,i=null;break e}throw Error(se(130,t==null?t:typeof t,""))}return e=bn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function _r(t,e,n,i){return t=bn(7,t,i,e),t.lanes=n,t}function Pl(t,e,n,i){return t=bn(22,t,i,e),t.elementType=bm,t.lanes=n,t.stateNode={isHidden:!1},t}function xc(t,e,n){return t=bn(6,t,null,e),t.lanes=n,t}function vc(t,e,n){return e=bn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function N_(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ql(0),this.expirationTimes=Ql(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ql(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Zd(t,e,n,i,r,s,a,o,l){return t=new N_(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=bn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Id(s),t}function D_(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kr,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function xg(t){if(!t)return qi;t=t._reactInternals;e:{if(Lr(t)!==t||t.tag!==1)throw Error(se(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(on(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(se(171))}if(t.tag===1){var n=t.type;if(on(n))return x0(t,n,e)}return e}function vg(t,e,n,i,r,s,a,o,l){return t=Zd(n,i,!0,t,r,s,a,o,l),t.context=xg(null),n=t.current,i=Kt(),r=Hi(n),s=pi(i,r),s.callback=e??null,zi(n,s,r),t.current.lanes=r,Pa(t,r,i),ln(t,i),t}function Ll(t,e,n,i){var r=e.current,s=Kt(),a=Hi(r);return n=xg(n),e.context===null?e.context=n:e.pendingContext=n,e=pi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=zi(r,e,a),t!==null&&(Hn(t,r,a,s),Do(t,r,a)),a}function dl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Rh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Qd(t,e){Rh(t,e),(t=t.alternate)&&Rh(t,e)}function I_(){return null}var _g=typeof reportError=="function"?reportError:function(t){console.error(t)};function Jd(t){this._internalRoot=t}Nl.prototype.render=Jd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(se(409));Ll(t,e,null,null)};Nl.prototype.unmount=Jd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;br(function(){Ll(null,t,null,null)}),e[gi]=null}};function Nl(t){this._internalRoot=t}Nl.prototype.unstable_scheduleHydration=function(t){if(t){var e=Km();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ri.length&&e!==0&&e<Ri[n].priority;n++);Ri.splice(n,0,t),n===0&&Qm(t)}};function ef(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Dl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Ph(){}function U_(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=dl(a);s.call(c)}}var a=vg(e,i,t,0,null,!1,!1,"",Ph);return t._reactRootContainer=a,t[gi]=a.current,_a(t.nodeType===8?t.parentNode:t),br(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=dl(l);o.call(c)}}var l=Zd(t,0,!1,null,null,!1,!1,"",Ph);return t._reactRootContainer=l,t[gi]=l.current,_a(t.nodeType===8?t.parentNode:t),br(function(){Ll(e,l,n,i)}),l}function Il(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=dl(a);o.call(l)}}Ll(e,a,t,r)}else a=U_(n,e,t,r,i);return dl(a)}Ym=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Js(e.pendingLanes);n!==0&&(_d(e,n|1),ln(e,yt()),!(Ke&6)&&(Ts=yt()+500,Qi()))}break;case 13:br(function(){var i=xi(t,1);if(i!==null){var r=Kt();Hn(i,t,1,r)}}),Qd(t,1)}};yd=function(t){if(t.tag===13){var e=xi(t,134217728);if(e!==null){var n=Kt();Hn(e,t,134217728,n)}Qd(t,134217728)}};$m=function(t){if(t.tag===13){var e=Hi(t),n=xi(t,e);if(n!==null){var i=Kt();Hn(n,t,e,i)}Qd(t,e)}};Km=function(){return et};Zm=function(t,e){var n=et;try{return et=t,e()}finally{et=n}};mu=function(t,e,n){switch(e){case"input":if(lu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=wl(i);if(!r)throw Error(se(90));Cm(i),lu(i,r)}}}break;case"textarea":Pm(t,n);break;case"select":e=n.value,e!=null&&ds(t,!!n.multiple,e,!1)}};km=qd;Om=br;var F_={usingClientEntryPoint:!1,Events:[Na,ts,wl,Um,Fm,qd]},js={findFiberByHostInstance:pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},k_={bundleType:js.bundleType,version:js.version,rendererPackageName:js.rendererPackageName,rendererConfig:js.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:_i.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Hm(t),t===null?null:t.stateNode},findFiberByHostInstance:js.findFiberByHostInstance||I_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var no=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!no.isDisabled&&no.supportsFiber)try{yl=no.inject(k_),Kn=no}catch{}}_n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F_;_n.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ef(e))throw Error(se(200));return D_(t,e,null,n)};_n.createRoot=function(t,e){if(!ef(t))throw Error(se(299));var n=!1,i="",r=_g;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Zd(t,1,!1,null,null,n,!1,i,r),t[gi]=e.current,_a(t.nodeType===8?t.parentNode:t),new Jd(e)};_n.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(se(188)):(t=Object.keys(t).join(","),Error(se(268,t)));return t=Hm(e),t=t===null?null:t.stateNode,t};_n.flushSync=function(t){return br(t)};_n.hydrate=function(t,e,n){if(!Dl(e))throw Error(se(200));return Il(null,t,e,!0,n)};_n.hydrateRoot=function(t,e,n){if(!ef(t))throw Error(se(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=_g;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=vg(e,null,t,1,n??null,r,!1,s,a),t[gi]=e.current,_a(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Nl(e)};_n.render=function(t,e,n){if(!Dl(e))throw Error(se(200));return Il(null,t,e,!1,n)};_n.unmountComponentAtNode=function(t){if(!Dl(t))throw Error(se(40));return t._reactRootContainer?(br(function(){Il(null,null,t,!1,function(){t._reactRootContainer=null,t[gi]=null})}),!0):!1};_n.unstable_batchedUpdates=qd;_n.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Dl(n))throw Error(se(200));if(t==null||t._reactInternals===void 0)throw Error(se(38));return Il(t,e,n,!1,i)};_n.version="18.3.1-next-f1338f8080-20240426";function yg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yg)}catch(t){console.error(t)}}yg(),ym.exports=_n;var O_=ym.exports,Lh=O_;tu.createRoot=Lh.createRoot,tu.hydrateRoot=Lh.hydrateRoot;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const tf="162",z_=0,Nh=1,B_=2,Sg=1,H_=2,si=3,Yi=0,cn=1,mn=2,Vi=0,xs=1,Yu=2,Dh=3,Ih=4,G_=5,fr=100,V_=101,j_=102,Uh=103,Fh=104,W_=200,X_=201,q_=202,Y_=203,$u=204,Ku=205,$_=206,K_=207,Z_=208,Q_=209,J_=210,ey=211,ty=212,ny=213,iy=214,ry=0,sy=1,ay=2,fl=3,oy=4,ly=5,cy=6,uy=7,Mg=0,dy=1,fy=2,ji=0,hy=1,py=2,my=3,gy=4,xy=5,vy=6,_y=7,Eg=300,bs=301,As=302,Zu=303,Qu=304,Ul=306,Ju=1e3,On=1001,ed=1002,$t=1003,kh=1004,Ws=1005,en=1006,_c=1007,xr=1008,Wi=1009,yy=1010,Sy=1011,nf=1012,wg=1013,Ii=1014,li=1015,Ca=1016,Tg=1017,bg=1018,yr=1020,My=1021,zn=1023,Ey=1024,wy=1025,Sr=1026,Cs=1027,Ty=1028,Ag=1029,by=1030,Cg=1031,Rg=1033,yc=33776,Sc=33777,Mc=33778,Ec=33779,Oh=35840,zh=35841,Bh=35842,Hh=35843,Pg=36196,Gh=37492,Vh=37496,jh=37808,Wh=37809,Xh=37810,qh=37811,Yh=37812,$h=37813,Kh=37814,Zh=37815,Qh=37816,Jh=37817,ep=37818,tp=37819,np=37820,ip=37821,wc=36492,rp=36494,sp=36495,Ay=36283,ap=36284,op=36285,lp=36286,Cy=3200,Ry=3201,Lg=0,Py=1,Li="",Xn="srgb",Ji="srgb-linear",rf="display-p3",Fl="display-p3-linear",hl="linear",ot="srgb",pl="rec709",ml="p3",Ir=7680,cp=519,Ly=512,Ny=513,Dy=514,Ng=515,Iy=516,Uy=517,Fy=518,ky=519,up=35044,dp="300 es",td=1035,fi=2e3,gl=2001;class Is{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tc=Math.PI/180,xl=180/Math.PI;function Ia(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[t&255]+Ht[t>>8&255]+Ht[t>>16&255]+Ht[t>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[n&63|128]+Ht[n>>8&255]+"-"+Ht[n>>16&255]+Ht[n>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function nn(t,e,n){return Math.max(e,Math.min(n,t))}function Oy(t,e){return(t%e+e)%e}function bc(t,e,n){return(1-n)*t+n*e}function fp(t){return(t&t-1)===0&&t!==0}function nd(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Xs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Jt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Ge{constructor(e=0,n=0){Ge.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,n,i,r,s,a,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],f=i[7],h=i[2],x=i[5],_=i[8],S=r[0],p=r[3],u=r[6],v=r[1],m=r[4],M=r[7],R=r[2],T=r[5],w=r[8];return s[0]=a*S+o*v+l*R,s[3]=a*p+o*m+l*T,s[6]=a*u+o*M+l*w,s[1]=c*S+d*v+f*R,s[4]=c*p+d*m+f*T,s[7]=c*u+d*M+f*w,s[2]=h*S+x*v+_*R,s[5]=h*p+x*m+_*T,s[8]=h*u+x*M+_*w,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*a*d-n*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=d*a-o*c,h=o*l-d*s,x=c*s-a*l,_=n*f+i*h+r*x;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=f*S,e[1]=(r*c-d*i)*S,e[2]=(o*i-r*a)*S,e[3]=h*S,e[4]=(d*n-r*l)*S,e[5]=(r*s-o*n)*S,e[6]=x*S,e[7]=(i*l-c*n)*S,e[8]=(a*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(Ac.makeScale(e,n)),this}rotate(e){return this.premultiply(Ac.makeRotation(-e)),this}translate(e,n){return this.premultiply(Ac.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ac=new He;function Dg(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function vl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function zy(){const t=vl("canvas");return t.style.display="block",t}const hp={};function By(t){t in hp||(hp[t]=!0,console.warn(t))}const pp=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),mp=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),io={[Ji]:{transfer:hl,primaries:pl,toReference:t=>t,fromReference:t=>t},[Xn]:{transfer:ot,primaries:pl,toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Fl]:{transfer:hl,primaries:ml,toReference:t=>t.applyMatrix3(mp),fromReference:t=>t.applyMatrix3(pp)},[rf]:{transfer:ot,primaries:ml,toReference:t=>t.convertSRGBToLinear().applyMatrix3(mp),fromReference:t=>t.applyMatrix3(pp).convertLinearToSRGB()}},Hy=new Set([Ji,Fl]),tt={enabled:!0,_workingColorSpace:Ji,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!Hy.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=io[e].toReference,r=io[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return io[t].primaries},getTransfer:function(t){return t===Li?hl:io[t].transfer}};function vs(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Cc(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ur;class Ig{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ur===void 0&&(Ur=vl("canvas")),Ur.width=e.width,Ur.height=e.height;const i=Ur.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ur}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=vl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=vs(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(vs(n[i]/255)*255):n[i]=vs(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gy=0;class Ug{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gy++}),this.uuid=Ia(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Rc(r[a].image)):s.push(Rc(r[a]))}else s=Rc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Rc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Ig.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vy=0;class un extends Is{constructor(e=un.DEFAULT_IMAGE,n=un.DEFAULT_MAPPING,i=On,r=On,s=en,a=xr,o=zn,l=Wi,c=un.DEFAULT_ANISOTROPY,d=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vy++}),this.uuid=Ia(),this.name="",this.source=new Ug(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Eg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ju:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case ed:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ju:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case ed:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=Eg;un.DEFAULT_ANISOTROPY=1;class Lt{constructor(e=0,n=0,i=0,r=1){Lt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],f=l[8],h=l[1],x=l[5],_=l[9],S=l[2],p=l[6],u=l[10];if(Math.abs(d-h)<.01&&Math.abs(f-S)<.01&&Math.abs(_-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(f+S)<.1&&Math.abs(_+p)<.1&&Math.abs(c+x+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const m=(c+1)/2,M=(x+1)/2,R=(u+1)/2,T=(d+h)/4,w=(f+S)/4,N=(_+p)/4;return m>M&&m>R?m<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(m),r=T/i,s=w/i):M>R?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=T/r,s=N/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=w/s,r=N/s),this.set(i,r,s,n),this}let v=Math.sqrt((p-_)*(p-_)+(f-S)*(f-S)+(h-d)*(h-d));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(f-S)/v,this.z=(h-d)/v,this.w=Math.acos((c+x+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jy extends Is{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Lt(0,0,e,n),this.scissorTest=!1,this.viewport=new Lt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},i);const s=new un(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Ug(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ar extends jy{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Fg extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wy extends un{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ua{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],f=i[r+3];const h=s[a+0],x=s[a+1],_=s[a+2],S=s[a+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f;return}if(o===1){e[n+0]=h,e[n+1]=x,e[n+2]=_,e[n+3]=S;return}if(f!==S||l!==h||c!==x||d!==_){let p=1-o;const u=l*h+c*x+d*_+f*S,v=u>=0?1:-1,m=1-u*u;if(m>Number.EPSILON){const R=Math.sqrt(m),T=Math.atan2(R,u*v);p=Math.sin(p*T)/R,o=Math.sin(o*T)/R}const M=o*v;if(l=l*p+h*M,c=c*p+x*M,d=d*p+_*M,f=f*p+S*M,p===1-o){const R=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=R,c*=R,d*=R,f*=R}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],f=s[a],h=s[a+1],x=s[a+2],_=s[a+3];return e[n]=o*_+d*f+l*x-c*h,e[n+1]=l*_+d*h+c*f-o*x,e[n+2]=c*_+d*x+o*h-l*f,e[n+3]=d*_-o*f-l*h-c*x,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),f=o(s/2),h=l(i/2),x=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*d*f+c*x*_,this._y=c*x*f-h*d*_,this._z=c*d*_+h*x*f,this._w=c*d*f-h*x*_;break;case"YXZ":this._x=h*d*f+c*x*_,this._y=c*x*f-h*d*_,this._z=c*d*_-h*x*f,this._w=c*d*f+h*x*_;break;case"ZXY":this._x=h*d*f-c*x*_,this._y=c*x*f+h*d*_,this._z=c*d*_+h*x*f,this._w=c*d*f-h*x*_;break;case"ZYX":this._x=h*d*f-c*x*_,this._y=c*x*f+h*d*_,this._z=c*d*_-h*x*f,this._w=c*d*f+h*x*_;break;case"YZX":this._x=h*d*f+c*x*_,this._y=c*x*f+h*d*_,this._z=c*d*_-h*x*f,this._w=c*d*f-h*x*_;break;case"XZY":this._x=h*d*f-c*x*_,this._y=c*x*f-h*d*_,this._z=c*d*_+h*x*f,this._w=c*d*f+h*x*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],d=n[6],f=n[10],h=i+o+f;if(h>0){const x=.5/Math.sqrt(h+1);this._w=.25/x,this._x=(d-l)*x,this._y=(s-c)*x,this._z=(a-r)*x}else if(i>o&&i>f){const x=2*Math.sqrt(1+i-o-f);this._w=(d-l)/x,this._x=.25*x,this._y=(r+a)/x,this._z=(s+c)/x}else if(o>f){const x=2*Math.sqrt(1+o-i-f);this._w=(s-c)/x,this._x=(r+a)/x,this._y=.25*x,this._z=(l+d)/x}else{const x=2*Math.sqrt(1+f-i-o);this._w=(a-r)/x,this._x=(s+c)/x,this._y=(l+d)/x,this._z=.25*x}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const x=1-n;return this._w=x*a+n*this._w,this._x=x*i+n*this._x,this._y=x*r+n*this._y,this._z=x*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),f=Math.sin((1-n)*d)/c,h=Math.sin(n*d)/c;return this._w=a*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,n=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(gp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(gp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*n-s*r),f=2*(s*i-a*n);return this.x=n+l*c+a*f-o*d,this.y=i+l*d+o*c-s*f,this.z=r+l*f+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Pc.copy(this).projectOnVector(e),this.sub(Pc)}reflect(e){return this.sub(Pc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(nn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pc=new z,gp=new Ua;class Fa{constructor(e=new z(1/0,1/0,1/0),n=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Nn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Nn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Nn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Nn):Nn.fromBufferAttribute(s,a),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ro.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ro.copy(i.boundingBox)),ro.applyMatrix4(e.matrixWorld),this.union(ro)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),so.subVectors(this.max,qs),Fr.subVectors(e.a,qs),kr.subVectors(e.b,qs),Or.subVectors(e.c,qs),Si.subVectors(kr,Fr),Mi.subVectors(Or,kr),nr.subVectors(Fr,Or);let n=[0,-Si.z,Si.y,0,-Mi.z,Mi.y,0,-nr.z,nr.y,Si.z,0,-Si.x,Mi.z,0,-Mi.x,nr.z,0,-nr.x,-Si.y,Si.x,0,-Mi.y,Mi.x,0,-nr.y,nr.x,0];return!Lc(n,Fr,kr,Or,so)||(n=[1,0,0,0,1,0,0,0,1],!Lc(n,Fr,kr,Or,so))?!1:(ao.crossVectors(Si,Mi),n=[ao.x,ao.y,ao.z],Lc(n,Fr,kr,Or,so))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ei=[new z,new z,new z,new z,new z,new z,new z,new z],Nn=new z,ro=new Fa,Fr=new z,kr=new z,Or=new z,Si=new z,Mi=new z,nr=new z,qs=new z,so=new z,ao=new z,ir=new z;function Lc(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){ir.fromArray(t,s);const o=r.x*Math.abs(ir.x)+r.y*Math.abs(ir.y)+r.z*Math.abs(ir.z),l=e.dot(ir),c=n.dot(ir),d=i.dot(ir);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Xy=new Fa,Ys=new z,Nc=new z;class ka{constructor(e=new z,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Xy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ys.subVectors(e,this.center);const n=Ys.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ys,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ys.copy(e.center).add(Nc)),this.expandByPoint(Ys.copy(e.center).sub(Nc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ti=new z,Dc=new z,oo=new z,Ei=new z,Ic=new z,lo=new z,Uc=new z;class sf{constructor(e=new z,n=new z(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ti.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,n),ti.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Dc.copy(e).add(n).multiplyScalar(.5),oo.copy(n).sub(e).normalize(),Ei.copy(this.origin).sub(Dc);const s=e.distanceTo(n)*.5,a=-this.direction.dot(oo),o=Ei.dot(this.direction),l=-Ei.dot(oo),c=Ei.lengthSq(),d=Math.abs(1-a*a);let f,h,x,_;if(d>0)if(f=a*l-o,h=a*o-l,_=s*d,f>=0)if(h>=-_)if(h<=_){const S=1/d;f*=S,h*=S,x=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),x=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),x=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),x=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),x=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),x=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),x=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Dc).addScaledVector(oo,h),x}intersectSphere(e,n){ti.subVectors(e.center,this.origin);const i=ti.dot(this.direction),r=ti.dot(ti)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),d>=0?(s=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,n,i,r,s){Ic.subVectors(n,e),lo.subVectors(i,e),Uc.crossVectors(Ic,lo);let a=this.direction.dot(Uc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ei.subVectors(this.origin,e);const l=o*this.direction.dot(lo.crossVectors(Ei,lo));if(l<0)return null;const c=o*this.direction.dot(Ic.cross(Ei));if(c<0||l+c>a)return null;const d=-o*Ei.dot(Uc);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,n,i,r,s,a,o,l,c,d,f,h,x,_,S,p){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,d,f,h,x,_,S,p)}set(e,n,i,r,s,a,o,l,c,d,f,h,x,_,S,p){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=f,u[14]=h,u[3]=x,u[7]=_,u[11]=S,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/zr.setFromMatrixColumn(e,0).length(),s=1/zr.setFromMatrixColumn(e,1).length(),a=1/zr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*d,x=a*f,_=o*d,S=o*f;n[0]=l*d,n[4]=-l*f,n[8]=c,n[1]=x+_*c,n[5]=h-S*c,n[9]=-o*l,n[2]=S-h*c,n[6]=_+x*c,n[10]=a*l}else if(e.order==="YXZ"){const h=l*d,x=l*f,_=c*d,S=c*f;n[0]=h+S*o,n[4]=_*o-x,n[8]=a*c,n[1]=a*f,n[5]=a*d,n[9]=-o,n[2]=x*o-_,n[6]=S+h*o,n[10]=a*l}else if(e.order==="ZXY"){const h=l*d,x=l*f,_=c*d,S=c*f;n[0]=h-S*o,n[4]=-a*f,n[8]=_+x*o,n[1]=x+_*o,n[5]=a*d,n[9]=S-h*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const h=a*d,x=a*f,_=o*d,S=o*f;n[0]=l*d,n[4]=_*c-x,n[8]=h*c+S,n[1]=l*f,n[5]=S*c+h,n[9]=x*c-_,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const h=a*l,x=a*c,_=o*l,S=o*c;n[0]=l*d,n[4]=S-h*f,n[8]=_*f+x,n[1]=f,n[5]=a*d,n[9]=-o*d,n[2]=-c*d,n[6]=x*f+_,n[10]=h-S*f}else if(e.order==="XZY"){const h=a*l,x=a*c,_=o*l,S=o*c;n[0]=l*d,n[4]=-f,n[8]=c*d,n[1]=h*f+S,n[5]=a*d,n[9]=x*f-_,n[2]=_*f-x,n[6]=o*d,n[10]=S*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qy,e,Yy)}lookAt(e,n,i){const r=this.elements;return fn.subVectors(e,n),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),wi.crossVectors(i,fn),wi.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),wi.crossVectors(i,fn)),wi.normalize(),co.crossVectors(fn,wi),r[0]=wi.x,r[4]=co.x,r[8]=fn.x,r[1]=wi.y,r[5]=co.y,r[9]=fn.y,r[2]=wi.z,r[6]=co.z,r[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],f=i[5],h=i[9],x=i[13],_=i[2],S=i[6],p=i[10],u=i[14],v=i[3],m=i[7],M=i[11],R=i[15],T=r[0],w=r[4],N=r[8],O=r[12],y=r[1],A=r[5],V=r[9],Z=r[13],D=r[2],K=r[6],G=r[10],te=r[14],I=r[3],H=r[7],P=r[11],C=r[15];return s[0]=a*T+o*y+l*D+c*I,s[4]=a*w+o*A+l*K+c*H,s[8]=a*N+o*V+l*G+c*P,s[12]=a*O+o*Z+l*te+c*C,s[1]=d*T+f*y+h*D+x*I,s[5]=d*w+f*A+h*K+x*H,s[9]=d*N+f*V+h*G+x*P,s[13]=d*O+f*Z+h*te+x*C,s[2]=_*T+S*y+p*D+u*I,s[6]=_*w+S*A+p*K+u*H,s[10]=_*N+S*V+p*G+u*P,s[14]=_*O+S*Z+p*te+u*C,s[3]=v*T+m*y+M*D+R*I,s[7]=v*w+m*A+M*K+R*H,s[11]=v*N+m*V+M*G+R*P,s[15]=v*O+m*Z+M*te+R*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],f=e[6],h=e[10],x=e[14],_=e[3],S=e[7],p=e[11],u=e[15];return _*(+s*l*f-r*c*f-s*o*h+i*c*h+r*o*x-i*l*x)+S*(+n*l*x-n*c*h+s*a*h-r*a*x+r*c*d-s*l*d)+p*(+n*c*f-n*o*x-s*a*f+i*a*x+s*o*d-i*c*d)+u*(-r*o*d-n*l*f+n*o*h+r*a*f-i*a*h+i*l*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=e[9],h=e[10],x=e[11],_=e[12],S=e[13],p=e[14],u=e[15],v=f*p*c-S*h*c+S*l*x-o*p*x-f*l*u+o*h*u,m=_*h*c-d*p*c-_*l*x+a*p*x+d*l*u-a*h*u,M=d*S*c-_*f*c+_*o*x-a*S*x-d*o*u+a*f*u,R=_*f*l-d*S*l-_*o*h+a*S*h+d*o*p-a*f*p,T=n*v+i*m+r*M+s*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return e[0]=v*w,e[1]=(S*h*s-f*p*s-S*r*x+i*p*x+f*r*u-i*h*u)*w,e[2]=(o*p*s-S*l*s+S*r*c-i*p*c-o*r*u+i*l*u)*w,e[3]=(f*l*s-o*h*s-f*r*c+i*h*c+o*r*x-i*l*x)*w,e[4]=m*w,e[5]=(d*p*s-_*h*s+_*r*x-n*p*x-d*r*u+n*h*u)*w,e[6]=(_*l*s-a*p*s-_*r*c+n*p*c+a*r*u-n*l*u)*w,e[7]=(a*h*s-d*l*s+d*r*c-n*h*c-a*r*x+n*l*x)*w,e[8]=M*w,e[9]=(_*f*s-d*S*s-_*i*x+n*S*x+d*i*u-n*f*u)*w,e[10]=(a*S*s-_*o*s+_*i*c-n*S*c-a*i*u+n*o*u)*w,e[11]=(d*o*s-a*f*s-d*i*c+n*f*c+a*i*x-n*o*x)*w,e[12]=R*w,e[13]=(d*S*r-_*f*r+_*i*h-n*S*h-d*i*p+n*f*p)*w,e[14]=(_*o*r-a*S*r-_*i*l+n*S*l+a*i*p-n*o*p)*w,e[15]=(a*f*r-d*o*r+d*i*l-n*f*l-a*i*h+n*o*h)*w,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,d=a+a,f=o+o,h=s*c,x=s*d,_=s*f,S=a*d,p=a*f,u=o*f,v=l*c,m=l*d,M=l*f,R=i.x,T=i.y,w=i.z;return r[0]=(1-(S+u))*R,r[1]=(x+M)*R,r[2]=(_-m)*R,r[3]=0,r[4]=(x-M)*T,r[5]=(1-(h+u))*T,r[6]=(p+v)*T,r[7]=0,r[8]=(_+m)*w,r[9]=(p-v)*w,r[10]=(1-(h+S))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=zr.set(r[0],r[1],r[2]).length();const a=zr.set(r[4],r[5],r[6]).length(),o=zr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Dn.copy(this);const c=1/s,d=1/a,f=1/o;return Dn.elements[0]*=c,Dn.elements[1]*=c,Dn.elements[2]*=c,Dn.elements[4]*=d,Dn.elements[5]*=d,Dn.elements[6]*=d,Dn.elements[8]*=f,Dn.elements[9]*=f,Dn.elements[10]*=f,n.setFromRotationMatrix(Dn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=fi){const l=this.elements,c=2*s/(n-e),d=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let x,_;if(o===fi)x=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===gl)x=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=fi){const l=this.elements,c=1/(n-e),d=1/(i-r),f=1/(a-s),h=(n+e)*c,x=(i+r)*d;let _,S;if(o===fi)_=(a+s)*f,S=-2*f;else if(o===gl)_=s*f,S=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-x,l[2]=0,l[6]=0,l[10]=S,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const zr=new z,Dn=new mt,qy=new z(0,0,0),Yy=new z(1,1,1),wi=new z,co=new z,fn=new z,xp=new mt,vp=new Ua;class Qn{constructor(e=0,n=0,i=0,r=Qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],f=r[2],h=r[6],x=r[10];switch(n){case"XYZ":this._y=Math.asin(nn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,x),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,x),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(nn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,x),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-nn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,x),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(nn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,x));break;case"XZY":this._z=Math.asin(-nn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,x),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return xp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return vp.setFromEuler(this),this.setFromQuaternion(vp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qn.DEFAULT_ORDER="XYZ";class kg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $y=0;const _p=new z,Br=new Ua,ni=new mt,uo=new z,$s=new z,Ky=new z,Zy=new Ua,yp=new z(1,0,0),Sp=new z(0,1,0),Mp=new z(0,0,1),Qy={type:"added"},Jy={type:"removed"},Fc={type:"childadded",child:null},kc={type:"childremoved",child:null};class Et extends Is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$y++}),this.uuid=Ia(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new z,n=new Qn,i=new Ua,r=new z(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new He}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Br.setFromAxisAngle(e,n),this.quaternion.multiply(Br),this}rotateOnWorldAxis(e,n){return Br.setFromAxisAngle(e,n),this.quaternion.premultiply(Br),this}rotateX(e){return this.rotateOnAxis(yp,e)}rotateY(e){return this.rotateOnAxis(Sp,e)}rotateZ(e){return this.rotateOnAxis(Mp,e)}translateOnAxis(e,n){return _p.copy(e).applyQuaternion(this.quaternion),this.position.add(_p.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(yp,e)}translateY(e){return this.translateOnAxis(Sp,e)}translateZ(e){return this.translateOnAxis(Mp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?uo.copy(e):uo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt($s,uo,this.up):ni.lookAt(uo,$s,this.up),this.quaternion.setFromRotationMatrix(ni),r&&(ni.extractRotation(r.matrixWorld),Br.setFromRotationMatrix(ni),this.quaternion.premultiply(Br.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Qy),Fc.child=e,this.dispatchEvent(Fc),Fc.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Jy),kc.child=e,this.dispatchEvent(kc),kc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,Ky),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,Zy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),h=a(e.skeletons),x=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),x.length>0&&(i.animations=x),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Et.DEFAULT_UP=new z(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new z,ii=new z,Oc=new z,ri=new z,Hr=new z,Gr=new z,Ep=new z,zc=new z,Bc=new z,Hc=new z;class $n{constructor(e=new z,n=new z,i=new z){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),In.subVectors(e,n),r.cross(In);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){In.subVectors(r,n),ii.subVectors(i,n),Oc.subVectors(e,n);const a=In.dot(In),o=In.dot(ii),l=In.dot(Oc),c=ii.dot(ii),d=ii.dot(Oc),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,x=(c*l-o*d)*h,_=(a*d-o*l)*h;return s.set(1-x-_,_,x)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ri.x),l.addScaledVector(a,ri.y),l.addScaledVector(o,ri.z),l)}static isFrontFacing(e,n,i,r){return In.subVectors(i,n),ii.subVectors(e,n),In.cross(ii).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),In.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return $n.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return $n.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Hr.subVectors(r,i),Gr.subVectors(s,i),zc.subVectors(e,i);const l=Hr.dot(zc),c=Gr.dot(zc);if(l<=0&&c<=0)return n.copy(i);Bc.subVectors(e,r);const d=Hr.dot(Bc),f=Gr.dot(Bc);if(d>=0&&f<=d)return n.copy(r);const h=l*f-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),n.copy(i).addScaledVector(Hr,a);Hc.subVectors(e,s);const x=Hr.dot(Hc),_=Gr.dot(Hc);if(_>=0&&x<=_)return n.copy(s);const S=x*c-l*_;if(S<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(Gr,o);const p=d*_-x*f;if(p<=0&&f-d>=0&&x-_>=0)return Ep.subVectors(s,r),o=(f-d)/(f-d+(x-_)),n.copy(r).addScaledVector(Ep,o);const u=1/(p+S+h);return a=S*u,o=h*u,n.copy(i).addScaledVector(Hr,a).addScaledVector(Gr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Og={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},fo={h:0,s:0,l:0};function Gc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ye{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=tt.workingColorSpace){if(e=Oy(e,1),n=nn(n,0,1),i=nn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Gc(a,s,e+1/3),this.g=Gc(a,s,e),this.b=Gc(a,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,n=Xn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Xn){const i=Og[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}copyLinearToSRGB(e){return this.r=Cc(e.r),this.g=Cc(e.g),this.b=Cc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xn){return tt.fromWorkingColorSpace(Gt.copy(this),e),Math.round(nn(Gt.r*255,0,255))*65536+Math.round(nn(Gt.g*255,0,255))*256+Math.round(nn(Gt.b*255,0,255))}getHexString(e=Xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.fromWorkingColorSpace(Gt.copy(this),n);const i=Gt.r,r=Gt.g,s=Gt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=tt.workingColorSpace){return tt.fromWorkingColorSpace(Gt.copy(this),n),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Xn){tt.fromWorkingColorSpace(Gt.copy(this),e);const n=Gt.r,i=Gt.g,r=Gt.b;return e!==Xn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ti),this.setHSL(Ti.h+e,Ti.s+n,Ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ti),e.getHSL(fo);const i=bc(Ti.h,fo.h,n),r=bc(Ti.s,fo.s,n),s=bc(Ti.l,fo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Ye;Ye.NAMES=Og;let eS=0;class Nr extends Is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eS++}),this.uuid=Ia(),this.name="",this.type="Material",this.blending=xs,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$u,this.blendDst=Ku,this.blendEquation=fr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=fl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ir,this.stencilZFail=Ir,this.stencilZPass=Ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==xs&&(i.blending=this.blending),this.side!==Yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==$u&&(i.blendSrc=this.blendSrc),this.blendDst!==Ku&&(i.blendDst=this.blendDst),this.blendEquation!==fr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ir&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ir&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ir&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Rs extends Nr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Mg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new z,ho=new Ge;class Cn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=up,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return By("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ho.fromBufferAttribute(this,n),ho.applyMatrix3(e),this.setXY(n,ho.x,ho.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyMatrix3(e),this.setXYZ(n,St.x,St.y,St.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyMatrix4(e),this.setXYZ(n,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyNormalMatrix(e),this.setXYZ(n,St.x,St.y,St.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.transformDirection(e),this.setXYZ(n,St.x,St.y,St.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Xs(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Jt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Xs(n,this.array)),n}setX(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Xs(n,this.array)),n}setY(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Xs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Xs(n,this.array)),n}setW(e,n){return this.normalized&&(n=Jt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Jt(n,this.array),i=Jt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Jt(n,this.array),i=Jt(i,this.array),r=Jt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Jt(n,this.array),i=Jt(i,this.array),r=Jt(r,this.array),s=Jt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==up&&(e.usage=this.usage),e}}class zg extends Cn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Bg extends Cn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class st extends Cn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let tS=0;const En=new mt,Vc=new Et,Vr=new z,hn=new Fa,Ks=new Fa,Rt=new z;class Wt extends Is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tS++}),this.uuid=Ia(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dg(e)?Bg:zg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,n,i){return En.makeTranslation(e,n,i),this.applyMatrix4(En),this}scale(e,n,i){return En.makeScale(e,n,i),this.applyMatrix4(En),this}lookAt(e){return Vc.lookAt(e),Vc.updateMatrix(),this.applyMatrix4(Vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vr).negate(),this.translate(Vr.x,Vr.y,Vr.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new st(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fa);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];hn.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ka);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(hn.min,Ks.min),hn.expandByPoint(Rt),Rt.addVectors(hn.max,Ks.max),hn.expandByPoint(Rt)):(hn.expandByPoint(Ks.min),hn.expandByPoint(Ks.max))}hn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Rt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Rt.fromBufferAttribute(o,c),l&&(Vr.fromBufferAttribute(e,c),Rt.add(Vr)),r=Math.max(r,i.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Cn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let N=0;N<i.count;N++)o[N]=new z,l[N]=new z;const c=new z,d=new z,f=new z,h=new Ge,x=new Ge,_=new Ge,S=new z,p=new z;function u(N,O,y){c.fromBufferAttribute(i,N),d.fromBufferAttribute(i,O),f.fromBufferAttribute(i,y),h.fromBufferAttribute(s,N),x.fromBufferAttribute(s,O),_.fromBufferAttribute(s,y),d.sub(c),f.sub(c),x.sub(h),_.sub(h);const A=1/(x.x*_.y-_.x*x.y);isFinite(A)&&(S.copy(d).multiplyScalar(_.y).addScaledVector(f,-x.y).multiplyScalar(A),p.copy(f).multiplyScalar(x.x).addScaledVector(d,-_.x).multiplyScalar(A),o[N].add(S),o[O].add(S),o[y].add(S),l[N].add(p),l[O].add(p),l[y].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let N=0,O=v.length;N<O;++N){const y=v[N],A=y.start,V=y.count;for(let Z=A,D=A+V;Z<D;Z+=3)u(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const m=new z,M=new z,R=new z,T=new z;function w(N){R.fromBufferAttribute(r,N),T.copy(R);const O=o[N];m.copy(O),m.sub(R.multiplyScalar(R.dot(O))).normalize(),M.crossVectors(T,O);const A=M.dot(l[N])<0?-1:1;a.setXYZW(N,m.x,m.y,m.z,A)}for(let N=0,O=v.length;N<O;++N){const y=v[N],A=y.start,V=y.count;for(let Z=A,D=A+V;Z<D;Z+=3)w(e.getX(Z+0)),w(e.getX(Z+1)),w(e.getX(Z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Cn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,x=i.count;h<x;h++)i.setXYZ(h,0,0,0);const r=new z,s=new z,a=new z,o=new z,l=new z,c=new z,d=new z,f=new z;if(e)for(let h=0,x=e.count;h<x;h+=3){const _=e.getX(h+0),S=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,S),a.fromBufferAttribute(n,p),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,p),o.add(d),l.add(d),c.add(d),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,x=n.count;h<x;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),d.subVectors(a,s),f.subVectors(r,s),d.cross(f),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Rt.fromBufferAttribute(e,n),Rt.normalize(),e.setXYZ(n,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,f=o.normalized,h=new c.constructor(l.length*d);let x=0,_=0;for(let S=0,p=l.length;S<p;S++){o.isInterleavedBufferAttribute?x=l[S]*o.data.stride+o.offset:x=l[S]*d;for(let u=0;u<d;u++)h[_++]=c[x++]}return new Cn(h,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Wt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,f=c.length;d<f;d++){const h=c[d],x=e(h,i);l.push(x)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,h=c.length;f<h;f++){const x=c[f];d.push(x.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],f=s[c];for(let h=0,x=f.length;h<x;h++)d.push(f[h].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wp=new mt,rr=new sf,po=new ka,Tp=new z,jr=new z,Wr=new z,Xr=new z,jc=new z,mo=new z,go=new Ge,xo=new Ge,vo=new Ge,bp=new z,Ap=new z,Cp=new z,_o=new z,yo=new z;class Je extends Et{constructor(e=new Wt,n=new Rs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){mo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],f=s[l];d!==0&&(jc.fromBufferAttribute(f,e),a?mo.addScaledVector(jc,d):mo.addScaledVector(jc.sub(n),d))}n.add(mo)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),po.copy(i.boundingSphere),po.applyMatrix4(s),rr.copy(e.ray).recast(e.near),!(po.containsPoint(rr.origin)===!1&&(rr.intersectSphere(po,Tp)===null||rr.origin.distanceToSquared(Tp)>(e.far-e.near)**2))&&(wp.copy(s).invert(),rr.copy(e.ray).applyMatrix4(wp),!(i.boundingBox!==null&&rr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,rr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,f=s.attributes.normal,h=s.groups,x=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=h.length;_<S;_++){const p=h[_],u=a[p.materialIndex],v=Math.max(p.start,x.start),m=Math.min(o.count,Math.min(p.start+p.count,x.start+x.count));for(let M=v,R=m;M<R;M+=3){const T=o.getX(M),w=o.getX(M+1),N=o.getX(M+2);r=So(this,u,e,i,c,d,f,T,w,N),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,x.start),S=Math.min(o.count,x.start+x.count);for(let p=_,u=S;p<u;p+=3){const v=o.getX(p),m=o.getX(p+1),M=o.getX(p+2);r=So(this,a,e,i,c,d,f,v,m,M),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,S=h.length;_<S;_++){const p=h[_],u=a[p.materialIndex],v=Math.max(p.start,x.start),m=Math.min(l.count,Math.min(p.start+p.count,x.start+x.count));for(let M=v,R=m;M<R;M+=3){const T=M,w=M+1,N=M+2;r=So(this,u,e,i,c,d,f,T,w,N),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,x.start),S=Math.min(l.count,x.start+x.count);for(let p=_,u=S;p<u;p+=3){const v=p,m=p+1,M=p+2;r=So(this,a,e,i,c,d,f,v,m,M),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function nS(t,e,n,i,r,s,a,o){let l;if(e.side===cn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Yi,o),l===null)return null;yo.copy(o),yo.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(yo);return c<n.near||c>n.far?null:{distance:c,point:yo.clone(),object:t}}function So(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,jr),t.getVertexPosition(l,Wr),t.getVertexPosition(c,Xr);const d=nS(t,e,n,i,jr,Wr,Xr,_o);if(d){r&&(go.fromBufferAttribute(r,o),xo.fromBufferAttribute(r,l),vo.fromBufferAttribute(r,c),d.uv=$n.getInterpolation(_o,jr,Wr,Xr,go,xo,vo,new Ge)),s&&(go.fromBufferAttribute(s,o),xo.fromBufferAttribute(s,l),vo.fromBufferAttribute(s,c),d.uv1=$n.getInterpolation(_o,jr,Wr,Xr,go,xo,vo,new Ge)),a&&(bp.fromBufferAttribute(a,o),Ap.fromBufferAttribute(a,l),Cp.fromBufferAttribute(a,c),d.normal=$n.getInterpolation(_o,jr,Wr,Xr,bp,Ap,Cp,new z),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new z,materialIndex:0};$n.getNormal(jr,Wr,Xr,f.normal),d.face=f}return d}class Cr extends Wt{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],f=[];let h=0,x=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(d,3)),this.setAttribute("uv",new st(f,2));function _(S,p,u,v,m,M,R,T,w,N,O){const y=M/w,A=R/N,V=M/2,Z=R/2,D=T/2,K=w+1,G=N+1;let te=0,I=0;const H=new z;for(let P=0;P<G;P++){const C=P*A-Z;for(let Y=0;Y<K;Y++){const re=Y*y-V;H[S]=re*v,H[p]=C*m,H[u]=D,c.push(H.x,H.y,H.z),H[S]=0,H[p]=0,H[u]=T>0?1:-1,d.push(H.x,H.y,H.z),f.push(Y/w),f.push(1-P/N),te+=1}}for(let P=0;P<N;P++)for(let C=0;C<w;C++){const Y=h+C+K*P,re=h+C+K*(P+1),U=h+(C+1)+K*(P+1),W=h+(C+1)+K*P;l.push(Y,re,W),l.push(re,U,W),I+=6}o.addGroup(x,I,O),x+=I,h+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ps(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function qt(t){const e={};for(let n=0;n<t.length;n++){const i=Ps(t[n]);for(const r in i)e[r]=i[r]}return e}function iS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Hg(t){return t.getRenderTarget()===null?t.outputColorSpace:tt.workingColorSpace}const rS={clone:Ps,merge:qt};var sS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $i extends Nr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sS,this.fragmentShader=aS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=iS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Gg extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=fi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bi=new z,Rp=new Ge,Pp=new Ge;class rn extends Gg{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=xl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xl*2*Math.atan(Math.tan(Tc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bi.x,bi.y).multiplyScalar(-e/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bi.x,bi.y).multiplyScalar(-e/bi.z)}getViewSize(e,n){return this.getViewBounds(e,Rp,Pp),n.subVectors(Pp,Rp)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Tc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const qr=-90,Yr=1;class oS extends Et{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new rn(qr,Yr,e,n);r.layers=this.layers,this.add(r);const s=new rn(qr,Yr,e,n);s.layers=this.layers,this.add(s);const a=new rn(qr,Yr,e,n);a.layers=this.layers,this.add(a);const o=new rn(qr,Yr,e,n);o.layers=this.layers,this.add(o);const l=new rn(qr,Yr,e,n);l.layers=this.layers,this.add(l);const c=new rn(qr,Yr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===fi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),x=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(f,h,x),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Vg extends un{constructor(e,n,i,r,s,a,o,l,c,d){e=e!==void 0?e:[],n=n!==void 0?n:bs,super(e,n,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lS extends Ar{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Vg(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:en}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Cr(5,5,5),s=new $i({name:"CubemapFromEquirect",uniforms:Ps(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Vi});s.uniforms.tEquirect.value=n;const a=new Je(r,s),o=n.minFilter;return n.minFilter===xr&&(n.minFilter=en),new oS(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const Wc=new z,cS=new z,uS=new He;class ur{constructor(e=new z(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Wc.subVectors(i,n).cross(cS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Wc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||uS.getNormalMatrix(e),r=this.coplanarPoint(Wc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const sr=new ka,Mo=new z;class af{constructor(e=new ur,n=new ur,i=new ur,r=new ur,s=new ur,a=new ur){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=fi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],d=r[5],f=r[6],h=r[7],x=r[8],_=r[9],S=r[10],p=r[11],u=r[12],v=r[13],m=r[14],M=r[15];if(i[0].setComponents(l-s,h-c,p-x,M-u).normalize(),i[1].setComponents(l+s,h+c,p+x,M+u).normalize(),i[2].setComponents(l+a,h+d,p+_,M+v).normalize(),i[3].setComponents(l-a,h-d,p-_,M-v).normalize(),i[4].setComponents(l-o,h-f,p-S,M-m).normalize(),n===fi)i[5].setComponents(l+o,h+f,p+S,M+m).normalize();else if(n===gl)i[5].setComponents(o,f,S,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(sr)}intersectsSprite(e){return sr.center.set(0,0,0),sr.radius=.7071067811865476,sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(sr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Mo.x=r.normal.x>0?e.max.x:e.min.x,Mo.y=r.normal.y>0?e.max.y:e.min.y,Mo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Mo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jg(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function dS(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,d){const f=c.array,h=c.usage,x=f.byteLength,_=t.createBuffer();t.bindBuffer(d,_),t.bufferData(d,f,h),c.onUploadCallback();let S;if(f instanceof Float32Array)S=t.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)S=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else S=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)S=t.SHORT;else if(f instanceof Uint32Array)S=t.UNSIGNED_INT;else if(f instanceof Int32Array)S=t.INT;else if(f instanceof Int8Array)S=t.BYTE;else if(f instanceof Uint8Array)S=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)S=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:_,type:S,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:x}}function s(c,d,f){const h=d.array,x=d._updateRange,_=d.updateRanges;if(t.bindBuffer(f,c),x.count===-1&&_.length===0&&t.bufferSubData(f,0,h),_.length!==0){for(let S=0,p=_.length;S<p;S++){const u=_[S];n?t.bufferSubData(f,u.start*h.BYTES_PER_ELEMENT,h,u.start,u.count):t.bufferSubData(f,u.start*h.BYTES_PER_ELEMENT,h.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}x.count!==-1&&(n?t.bufferSubData(f,x.offset*h.BYTES_PER_ELEMENT,h,x.offset,x.count):t.bufferSubData(f,x.offset*h.BYTES_PER_ELEMENT,h.subarray(x.offset,x.offset+x.count)),x.count=-1),d.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);d&&(t.deleteBuffer(d.buffer),i.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,d));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,d),f.version=c.version}}return{get:a,remove:o,update:l}}class hi extends Wt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,f=e/o,h=n/l,x=[],_=[],S=[],p=[];for(let u=0;u<d;u++){const v=u*h-a;for(let m=0;m<c;m++){const M=m*f-s;_.push(M,-v,0),S.push(0,0,1),p.push(m/o),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let v=0;v<o;v++){const m=v+c*u,M=v+c*(u+1),R=v+1+c*(u+1),T=v+1+c*u;x.push(m,M,T),x.push(M,R,T)}this.setIndex(x),this.setAttribute("position",new st(_,3)),this.setAttribute("normal",new st(S,3)),this.setAttribute("uv",new st(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.width,e.height,e.widthSegments,e.heightSegments)}}var fS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_S=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yS=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,SS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,MS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ES=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,TS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,AS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,CS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,RS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,PS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,LS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,NS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,DS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,IS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,US=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,FS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,OS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,BS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,HS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,GS="gl_FragColor = linearToOutputTexel( gl_FragColor );",VS=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,jS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,WS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,XS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,YS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$S=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,KS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ZS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,QS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,JS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eM=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,tM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,iM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,aM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gM=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,vM=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,_M=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,SM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,MM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,EM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,TM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bM=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,AM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,CM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,RM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,PM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,LM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,NM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,IM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,UM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,FM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,OM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,BM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,HM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,GM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,VM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,WM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,$M=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,KM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ZM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,QM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,JM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,e1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,t1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,n1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,i1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,a1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,o1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,l1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,u1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const f1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,h1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,y1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,S1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,M1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,E1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,T1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,A1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,L1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,D1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,I1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,k1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,z1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,H1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,j1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:fS,alphahash_pars_fragment:hS,alphamap_fragment:pS,alphamap_pars_fragment:mS,alphatest_fragment:gS,alphatest_pars_fragment:xS,aomap_fragment:vS,aomap_pars_fragment:_S,batching_pars_vertex:yS,batching_vertex:SS,begin_vertex:MS,beginnormal_vertex:ES,bsdfs:wS,iridescence_fragment:TS,bumpmap_pars_fragment:bS,clipping_planes_fragment:AS,clipping_planes_pars_fragment:CS,clipping_planes_pars_vertex:RS,clipping_planes_vertex:PS,color_fragment:LS,color_pars_fragment:NS,color_pars_vertex:DS,color_vertex:IS,common:US,cube_uv_reflection_fragment:FS,defaultnormal_vertex:kS,displacementmap_pars_vertex:OS,displacementmap_vertex:zS,emissivemap_fragment:BS,emissivemap_pars_fragment:HS,colorspace_fragment:GS,colorspace_pars_fragment:VS,envmap_fragment:jS,envmap_common_pars_fragment:WS,envmap_pars_fragment:XS,envmap_pars_vertex:qS,envmap_physical_pars_fragment:sM,envmap_vertex:YS,fog_vertex:$S,fog_pars_vertex:KS,fog_fragment:ZS,fog_pars_fragment:QS,gradientmap_pars_fragment:JS,lightmap_fragment:eM,lightmap_pars_fragment:tM,lights_lambert_fragment:nM,lights_lambert_pars_fragment:iM,lights_pars_begin:rM,lights_toon_fragment:aM,lights_toon_pars_fragment:oM,lights_phong_fragment:lM,lights_phong_pars_fragment:cM,lights_physical_fragment:uM,lights_physical_pars_fragment:dM,lights_fragment_begin:fM,lights_fragment_maps:hM,lights_fragment_end:pM,logdepthbuf_fragment:mM,logdepthbuf_pars_fragment:gM,logdepthbuf_pars_vertex:xM,logdepthbuf_vertex:vM,map_fragment:_M,map_pars_fragment:yM,map_particle_fragment:SM,map_particle_pars_fragment:MM,metalnessmap_fragment:EM,metalnessmap_pars_fragment:wM,morphinstance_vertex:TM,morphcolor_vertex:bM,morphnormal_vertex:AM,morphtarget_pars_vertex:CM,morphtarget_vertex:RM,normal_fragment_begin:PM,normal_fragment_maps:LM,normal_pars_fragment:NM,normal_pars_vertex:DM,normal_vertex:IM,normalmap_pars_fragment:UM,clearcoat_normal_fragment_begin:FM,clearcoat_normal_fragment_maps:kM,clearcoat_pars_fragment:OM,iridescence_pars_fragment:zM,opaque_fragment:BM,packing:HM,premultiplied_alpha_fragment:GM,project_vertex:VM,dithering_fragment:jM,dithering_pars_fragment:WM,roughnessmap_fragment:XM,roughnessmap_pars_fragment:qM,shadowmap_pars_fragment:YM,shadowmap_pars_vertex:$M,shadowmap_vertex:KM,shadowmask_pars_fragment:ZM,skinbase_vertex:QM,skinning_pars_vertex:JM,skinning_vertex:e1,skinnormal_vertex:t1,specularmap_fragment:n1,specularmap_pars_fragment:i1,tonemapping_fragment:r1,tonemapping_pars_fragment:s1,transmission_fragment:a1,transmission_pars_fragment:o1,uv_pars_fragment:l1,uv_pars_vertex:c1,uv_vertex:u1,worldpos_vertex:d1,background_vert:f1,background_frag:h1,backgroundCube_vert:p1,backgroundCube_frag:m1,cube_vert:g1,cube_frag:x1,depth_vert:v1,depth_frag:_1,distanceRGBA_vert:y1,distanceRGBA_frag:S1,equirect_vert:M1,equirect_frag:E1,linedashed_vert:w1,linedashed_frag:T1,meshbasic_vert:b1,meshbasic_frag:A1,meshlambert_vert:C1,meshlambert_frag:R1,meshmatcap_vert:P1,meshmatcap_frag:L1,meshnormal_vert:N1,meshnormal_frag:D1,meshphong_vert:I1,meshphong_frag:U1,meshphysical_vert:F1,meshphysical_frag:k1,meshtoon_vert:O1,meshtoon_frag:z1,points_vert:B1,points_frag:H1,shadow_vert:G1,shadow_frag:V1,sprite_vert:j1,sprite_frag:W1},he={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},qn={basic:{uniforms:qt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:qt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:qt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:qt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:qt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:qt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:qt([he.points,he.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:qt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:qt([he.common,he.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:qt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:qt([he.sprite,he.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:qt([he.common,he.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:qt([he.lights,he.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};qn.physical={uniforms:qt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Eo={r:0,b:0,g:0},ar=new Qn,X1=new mt;function q1(t,e,n,i,r,s,a){const o=new Ye(0);let l=s===!0?0:1,c,d,f=null,h=0,x=null;function _(p,u){let v=!1,m=u.isScene===!0?u.background:null;m&&m.isTexture&&(m=(u.backgroundBlurriness>0?n:e).get(m)),m===null?S(o,l):m&&m.isColor&&(S(m,1),v=!0);const M=t.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||v)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),m&&(m.isCubeTexture||m.mapping===Ul)?(d===void 0&&(d=new Je(new Cr(1,1,1),new $i({name:"BackgroundCubeMaterial",uniforms:Ps(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),ar.copy(u.backgroundRotation),ar.x*=-1,ar.y*=-1,ar.z*=-1,m.isCubeTexture&&m.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),d.material.uniforms.envMap.value=m,d.material.uniforms.flipEnvMap.value=m.isCubeTexture&&m.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(X1.makeRotationFromEuler(ar)),d.material.toneMapped=tt.getTransfer(m.colorSpace)!==ot,(f!==m||h!==m.version||x!==t.toneMapping)&&(d.material.needsUpdate=!0,f=m,h=m.version,x=t.toneMapping),d.layers.enableAll(),p.unshift(d,d.geometry,d.material,0,0,null)):m&&m.isTexture&&(c===void 0&&(c=new Je(new hi(2,2),new $i({name:"BackgroundMaterial",uniforms:Ps(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=m,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=tt.getTransfer(m.colorSpace)!==ot,m.matrixAutoUpdate===!0&&m.updateMatrix(),c.material.uniforms.uvTransform.value.copy(m.matrix),(f!==m||h!==m.version||x!==t.toneMapping)&&(c.material.needsUpdate=!0,f=m,h=m.version,x=t.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function S(p,u){p.getRGB(Eo,Hg(t)),i.buffers.color.setClear(Eo.r,Eo.g,Eo.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),l=u,S(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,S(o,l)},render:_}}function Y1(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=p(null);let c=l,d=!1;function f(D,K,G,te,I){let H=!1;if(a){const P=S(te,G,K);c!==P&&(c=P,x(c.object)),H=u(D,te,G,I),H&&v(D,te,G,I)}else{const P=K.wireframe===!0;(c.geometry!==te.id||c.program!==G.id||c.wireframe!==P)&&(c.geometry=te.id,c.program=G.id,c.wireframe=P,H=!0)}I!==null&&n.update(I,t.ELEMENT_ARRAY_BUFFER),(H||d)&&(d=!1,N(D,K,G,te),I!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(I).buffer))}function h(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function x(D){return i.isWebGL2?t.bindVertexArray(D):s.bindVertexArrayOES(D)}function _(D){return i.isWebGL2?t.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function S(D,K,G){const te=G.wireframe===!0;let I=o[D.id];I===void 0&&(I={},o[D.id]=I);let H=I[K.id];H===void 0&&(H={},I[K.id]=H);let P=H[te];return P===void 0&&(P=p(h()),H[te]=P),P}function p(D){const K=[],G=[],te=[];for(let I=0;I<r;I++)K[I]=0,G[I]=0,te[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:K,enabledAttributes:G,attributeDivisors:te,object:D,attributes:{},index:null}}function u(D,K,G,te){const I=c.attributes,H=K.attributes;let P=0;const C=G.getAttributes();for(const Y in C)if(C[Y].location>=0){const U=I[Y];let W=H[Y];if(W===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(W=D.instanceColor)),U===void 0||U.attribute!==W||W&&U.data!==W.data)return!0;P++}return c.attributesNum!==P||c.index!==te}function v(D,K,G,te){const I={},H=K.attributes;let P=0;const C=G.getAttributes();for(const Y in C)if(C[Y].location>=0){let U=H[Y];U===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(U=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(U=D.instanceColor));const W={};W.attribute=U,U&&U.data&&(W.data=U.data),I[Y]=W,P++}c.attributes=I,c.attributesNum=P,c.index=te}function m(){const D=c.newAttributes;for(let K=0,G=D.length;K<G;K++)D[K]=0}function M(D){R(D,0)}function R(D,K){const G=c.newAttributes,te=c.enabledAttributes,I=c.attributeDivisors;G[D]=1,te[D]===0&&(t.enableVertexAttribArray(D),te[D]=1),I[D]!==K&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,K),I[D]=K)}function T(){const D=c.newAttributes,K=c.enabledAttributes;for(let G=0,te=K.length;G<te;G++)K[G]!==D[G]&&(t.disableVertexAttribArray(G),K[G]=0)}function w(D,K,G,te,I,H,P){P===!0?t.vertexAttribIPointer(D,K,G,I,H):t.vertexAttribPointer(D,K,G,te,I,H)}function N(D,K,G,te){if(i.isWebGL2===!1&&(D.isInstancedMesh||te.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;m();const I=te.attributes,H=G.getAttributes(),P=K.defaultAttributeValues;for(const C in H){const Y=H[C];if(Y.location>=0){let re=I[C];if(re===void 0&&(C==="instanceMatrix"&&D.instanceMatrix&&(re=D.instanceMatrix),C==="instanceColor"&&D.instanceColor&&(re=D.instanceColor)),re!==void 0){const U=re.normalized,W=re.itemSize,ee=n.get(re);if(ee===void 0)continue;const ne=ee.buffer,ae=ee.type,le=ee.bytesPerElement,Me=i.isWebGL2===!0&&(ae===t.INT||ae===t.UNSIGNED_INT||re.gpuType===wg);if(re.isInterleavedBufferAttribute){const ge=re.data,F=ge.stride,je=re.offset;if(ge.isInstancedInterleavedBuffer){for(let ue=0;ue<Y.locationSize;ue++)R(Y.location+ue,ge.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let ue=0;ue<Y.locationSize;ue++)M(Y.location+ue);t.bindBuffer(t.ARRAY_BUFFER,ne);for(let ue=0;ue<Y.locationSize;ue++)w(Y.location+ue,W/Y.locationSize,ae,U,F*le,(je+W/Y.locationSize*ue)*le,Me)}else{if(re.isInstancedBufferAttribute){for(let ge=0;ge<Y.locationSize;ge++)R(Y.location+ge,re.meshPerAttribute);D.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ge=0;ge<Y.locationSize;ge++)M(Y.location+ge);t.bindBuffer(t.ARRAY_BUFFER,ne);for(let ge=0;ge<Y.locationSize;ge++)w(Y.location+ge,W/Y.locationSize,ae,U,W*le,W/Y.locationSize*ge*le,Me)}}else if(P!==void 0){const U=P[C];if(U!==void 0)switch(U.length){case 2:t.vertexAttrib2fv(Y.location,U);break;case 3:t.vertexAttrib3fv(Y.location,U);break;case 4:t.vertexAttrib4fv(Y.location,U);break;default:t.vertexAttrib1fv(Y.location,U)}}}}T()}function O(){V();for(const D in o){const K=o[D];for(const G in K){const te=K[G];for(const I in te)_(te[I].object),delete te[I];delete K[G]}delete o[D]}}function y(D){if(o[D.id]===void 0)return;const K=o[D.id];for(const G in K){const te=K[G];for(const I in te)_(te[I].object),delete te[I];delete K[G]}delete o[D.id]}function A(D){for(const K in o){const G=o[K];if(G[D.id]===void 0)continue;const te=G[D.id];for(const I in te)_(te[I].object),delete te[I];delete G[D.id]}}function V(){Z(),d=!0,c!==l&&(c=l,x(c.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:V,resetDefaultState:Z,dispose:O,releaseStatesOfGeometry:y,releaseStatesOfProgram:A,initAttributes:m,enableAttribute:M,disableUnusedAttributes:T}}function $1(t,e,n,i){const r=i.isWebGL2;let s;function a(d){s=d}function o(d,f){t.drawArrays(s,d,f),n.update(f,s,1)}function l(d,f,h){if(h===0)return;let x,_;if(r)x=t,_="drawArraysInstanced";else if(x=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",x===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[_](s,d,f,h),n.update(f,s,h)}function c(d,f,h){if(h===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let _=0;_<h;_++)this.render(d[_],f[_]);else{x.multiDrawArraysWEBGL(s,d,0,f,0,h);let _=0;for(let S=0;S<h;S++)_+=f[S];n.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function K1(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(w){if(w==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let o=n.precision!==void 0?n.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),d=n.logarithmicDepthBuffer===!0,f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),h=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),S=t.getParameter(t.MAX_VERTEX_ATTRIBS),p=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),u=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),m=h>0,M=a||e.has("OES_texture_float"),R=m&&M,T=a?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:d,maxTextures:f,maxVertexTextures:h,maxTextureSize:x,maxCubemapSize:_,maxAttributes:S,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:m,floatFragmentTextures:M,floatVertexTextures:R,maxSamples:T}}function Z1(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new ur,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const x=f.length!==0||h||i!==0||r;return r=h,i=f.length,x},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=d(f,h,0)},this.setState=function(f,h,x){const _=f.clippingPlanes,S=f.clipIntersection,p=f.clipShadows,u=t.get(f);if(!r||_===null||_.length===0||s&&!p)s?d(null):c();else{const v=s?0:i,m=v*4;let M=u.clippingState||null;l.value=M,M=d(_,h,m,x);for(let R=0;R!==m;++R)M[R]=n[R];u.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,h,x,_){const S=f!==null?f.length:0;let p=null;if(S!==0){if(p=l.value,_!==!0||p===null){const u=x+S*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<u)&&(p=new Float32Array(u));for(let m=0,M=x;m!==S;++m,M+=4)a.copy(f[m]).applyMatrix4(v,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}function Q1(t){let e=new WeakMap;function n(a,o){return o===Zu?a.mapping=bs:o===Qu&&(a.mapping=As),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Zu||o===Qu)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new lS(l.height);return c.fromEquirectangularTexture(t,a),e.set(a,c),a.addEventListener("dispose",r),n(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Wg extends Gg{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const ls=4,Lp=[.125,.215,.35,.446,.526,.582],hr=20,Xc=new Wg,Np=new Ye;let qc=null,Yc=0,$c=0;const dr=(1+Math.sqrt(5))/2,$r=1/dr,Dp=[new z(1,1,1),new z(-1,1,1),new z(1,1,-1),new z(-1,1,-1),new z(0,dr,$r),new z(0,dr,-$r),new z($r,0,dr),new z(-$r,0,dr),new z(dr,$r,0),new z(-dr,$r,0)];class Ip{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){qc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qc,Yc,$c),e.scissorTest=!1,wo(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===bs||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:Ca,format:zn,colorSpace:Ji,depthBuffer:!1},r=Up(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Up(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=J1(s)),this._blurMaterial=eE(s,e,n)}return r}_compileMaterial(e){const n=new Je(this._lodPlanes[0],e);this._renderer.compile(n,Xc)}_sceneToCubeUV(e,n,i,r){const o=new rn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Np),d.toneMapping=ji,d.autoClear=!1;const x=new Rs({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),_=new Je(new Cr,x);let S=!1;const p=e.background;p?p.isColor&&(x.color.copy(p),e.background=null,S=!0):(x.color.copy(Np),S=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):v===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const m=this._cubeSize;wo(r,v*m,u>2?m:0,m,m),d.setRenderTarget(r),S&&d.render(_,o),d.render(e,o)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===bs||e.mapping===As;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fp());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Je(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;wo(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,Xc)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Dp[(r-1)%Dp.length];this._blur(e,r-1,r,s,a)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new Je(this._lodPlanes[r],c),h=c.uniforms,x=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*x):2*Math.PI/(2*hr-1),S=s/_,p=isFinite(s)?1+Math.floor(d*S):hr;p>hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hr}`);const u=[];let v=0;for(let w=0;w<hr;++w){const N=w/S,O=Math.exp(-N*N/2);u.push(O),w===0?v+=O:w<p&&(v+=2*O)}for(let w=0;w<u.length;w++)u[w]=u[w]/v;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=u,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:m}=this;h.dTheta.value=_,h.mipInt.value=m-i;const M=this._sizeLods[r],R=3*M*(r>m-ls?r-m+ls:0),T=4*(this._cubeSize-M);wo(n,R,T,3*M,2*M),l.setRenderTarget(n),l.render(f,Xc)}}function J1(t){const e=[],n=[],i=[];let r=t;const s=t-ls+1+Lp.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-ls?l=Lp[a-t+ls-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,f=1+c,h=[d,d,f,d,f,f,d,d,f,f,d,f],x=6,_=6,S=3,p=2,u=1,v=new Float32Array(S*_*x),m=new Float32Array(p*_*x),M=new Float32Array(u*_*x);for(let T=0;T<x;T++){const w=T%3*2/3-1,N=T>2?0:-1,O=[w,N,0,w+2/3,N,0,w+2/3,N+1,0,w,N,0,w+2/3,N+1,0,w,N+1,0];v.set(O,S*_*T),m.set(h,p*_*T);const y=[T,T,T,T,T,T];M.set(y,u*_*T)}const R=new Wt;R.setAttribute("position",new Cn(v,S)),R.setAttribute("uv",new Cn(m,p)),R.setAttribute("faceIndex",new Cn(M,u)),e.push(R),r>ls&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Up(t,e,n){const i=new Ar(t,e,n);return i.texture.mapping=Ul,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wo(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function eE(t,e,n){const i=new Float32Array(hr),r=new z(0,1,0);return new $i({name:"SphericalGaussianBlur",defines:{n:hr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:of(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function Fp(){return new $i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:of(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function kp(){return new $i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:of(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function of(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function tE(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Zu||l===Qu,d=l===bs||l===As;if(c||d)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return n===null&&(n=new Ip(t)),f=c?n.fromEquirectangular(o,f):n.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(c&&f&&f.height>0||d&&f&&r(f)){n===null&&(n=new Ip(t));const h=c?n.fromEquirectangular(o):n.fromCubemap(o);return e.set(o,h),o.addEventListener("dispose",s),h.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function nE(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function iE(t,e,n,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const S=h.morphAttributes[_];for(let p=0,u=S.length;p<u;p++)e.remove(S[p])}h.removeEventListener("dispose",a),delete r[h.id];const x=s.get(h);x&&(e.remove(x),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const x=f.morphAttributes;for(const _ in x){const S=x[_];for(let p=0,u=S.length;p<u;p++)e.update(S[p],t.ARRAY_BUFFER)}}function c(f){const h=[],x=f.index,_=f.attributes.position;let S=0;if(x!==null){const v=x.array;S=x.version;for(let m=0,M=v.length;m<M;m+=3){const R=v[m+0],T=v[m+1],w=v[m+2];h.push(R,T,T,w,w,R)}}else if(_!==void 0){const v=_.array;S=_.version;for(let m=0,M=v.length/3-1;m<M;m+=3){const R=m+0,T=m+1,w=m+2;h.push(R,T,T,w,w,R)}}else return;const p=new(Dg(h)?Bg:zg)(h,1);p.version=S;const u=s.get(f);u&&e.remove(u),s.set(f,p)}function d(f){const h=s.get(f);if(h){const x=f.index;x!==null&&h.version<x.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function rE(t,e,n,i){const r=i.isWebGL2;let s;function a(x){s=x}let o,l;function c(x){o=x.type,l=x.bytesPerElement}function d(x,_){t.drawElements(s,_,o,x*l),n.update(_,s,1)}function f(x,_,S){if(S===0)return;let p,u;if(r)p=t,u="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](s,_,o,x*l,S),n.update(_,s,S)}function h(x,_,S){if(S===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<S;u++)this.render(x[u]/l,_[u]);else{p.multiDrawElementsWEBGL(s,_,0,o,x,0,S);let u=0;for(let v=0;v<S;v++)u+=_[v];n.update(u,s,1)}}this.setMode=a,this.setIndex=c,this.render=d,this.renderInstances=f,this.renderMultiDraw=h}function sE(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function aE(t,e){return t[0]-e[0]}function oE(t,e){return Math.abs(e[1])-Math.abs(t[1])}function lE(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,a=new Lt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,d,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,S=_!==void 0?_.length:0;let p=s.get(d);if(p===void 0||p.count!==S){let Z=function(){A.dispose(),s.delete(d),d.removeEventListener("dispose",Z)};var x=Z;p!==void 0&&p.texture.dispose();const u=d.morphAttributes.position!==void 0,v=d.morphAttributes.normal!==void 0,m=d.morphAttributes.color!==void 0,M=d.morphAttributes.position||[],R=d.morphAttributes.normal||[],T=d.morphAttributes.color||[];let w=0;u===!0&&(w=1),v===!0&&(w=2),m===!0&&(w=3);let N=d.attributes.position.count*w,O=1;N>e.maxTextureSize&&(O=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const y=new Float32Array(N*O*4*S),A=new Fg(y,N,O,S);A.type=li,A.needsUpdate=!0;const V=w*4;for(let D=0;D<S;D++){const K=M[D],G=R[D],te=T[D],I=N*O*4*D;for(let H=0;H<K.count;H++){const P=H*V;u===!0&&(a.fromBufferAttribute(K,H),y[I+P+0]=a.x,y[I+P+1]=a.y,y[I+P+2]=a.z,y[I+P+3]=0),v===!0&&(a.fromBufferAttribute(G,H),y[I+P+4]=a.x,y[I+P+5]=a.y,y[I+P+6]=a.z,y[I+P+7]=0),m===!0&&(a.fromBufferAttribute(te,H),y[I+P+8]=a.x,y[I+P+9]=a.y,y[I+P+10]=a.z,y[I+P+11]=te.itemSize===4?a.w:1)}}p={count:S,texture:A,size:new Ge(N,O)},s.set(d,p),d.addEventListener("dispose",Z)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)f.getUniforms().setValue(t,"morphTexture",c.morphTexture,n);else{let u=0;for(let m=0;m<h.length;m++)u+=h[m];const v=d.morphTargetsRelative?1:1-u;f.getUniforms().setValue(t,"morphTargetBaseInfluence",v),f.getUniforms().setValue(t,"morphTargetInfluences",h)}f.getUniforms().setValue(t,"morphTargetsTexture",p.texture,n),f.getUniforms().setValue(t,"morphTargetsTextureSize",p.size)}else{const _=h===void 0?0:h.length;let S=i[d.id];if(S===void 0||S.length!==_){S=[];for(let M=0;M<_;M++)S[M]=[M,0];i[d.id]=S}for(let M=0;M<_;M++){const R=S[M];R[0]=M,R[1]=h[M]}S.sort(oE);for(let M=0;M<8;M++)M<_&&S[M][1]?(o[M][0]=S[M][0],o[M][1]=S[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(aE);const p=d.morphAttributes.position,u=d.morphAttributes.normal;let v=0;for(let M=0;M<8;M++){const R=o[M],T=R[0],w=R[1];T!==Number.MAX_SAFE_INTEGER&&w?(p&&d.getAttribute("morphTarget"+M)!==p[T]&&d.setAttribute("morphTarget"+M,p[T]),u&&d.getAttribute("morphNormal"+M)!==u[T]&&d.setAttribute("morphNormal"+M,u[T]),r[M]=w,v+=w):(p&&d.hasAttribute("morphTarget"+M)===!0&&d.deleteAttribute("morphTarget"+M),u&&d.hasAttribute("morphNormal"+M)===!0&&d.deleteAttribute("morphNormal"+M),r[M]=0)}const m=d.morphTargetsRelative?1:1-v;f.getUniforms().setValue(t,"morphTargetBaseInfluence",m),f.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function cE(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:a}}class Xg extends un{constructor(e,n,i,r,s,a,o,l,c,d){if(d=d!==void 0?d:Sr,d!==Sr&&d!==Cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Sr&&(i=Ii),i===void 0&&d===Cs&&(i=yr),super(null,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:$t,this.minFilter=l!==void 0?l:$t,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const qg=new un,Yg=new Xg(1,1);Yg.compareFunction=Ng;const $g=new Fg,Kg=new Wy,Zg=new Vg,Op=[],zp=[],Bp=new Float32Array(16),Hp=new Float32Array(9),Gp=new Float32Array(4);function Us(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Op[r];if(s===void 0&&(s=new Float32Array(r),Op[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function bt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function At(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function kl(t,e){let n=zp[e];n===void 0&&(n=new Int32Array(e),zp[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function uE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function dE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(bt(n,e))return;t.uniform2fv(this.addr,e),At(n,e)}}function fE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(bt(n,e))return;t.uniform3fv(this.addr,e),At(n,e)}}function hE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(bt(n,e))return;t.uniform4fv(this.addr,e),At(n,e)}}function pE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(bt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),At(n,e)}else{if(bt(n,i))return;Gp.set(i),t.uniformMatrix2fv(this.addr,!1,Gp),At(n,i)}}function mE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(bt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),At(n,e)}else{if(bt(n,i))return;Hp.set(i),t.uniformMatrix3fv(this.addr,!1,Hp),At(n,i)}}function gE(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(bt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),At(n,e)}else{if(bt(n,i))return;Bp.set(i),t.uniformMatrix4fv(this.addr,!1,Bp),At(n,i)}}function xE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function vE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(bt(n,e))return;t.uniform2iv(this.addr,e),At(n,e)}}function _E(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(bt(n,e))return;t.uniform3iv(this.addr,e),At(n,e)}}function yE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(bt(n,e))return;t.uniform4iv(this.addr,e),At(n,e)}}function SE(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function ME(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(bt(n,e))return;t.uniform2uiv(this.addr,e),At(n,e)}}function EE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(bt(n,e))return;t.uniform3uiv(this.addr,e),At(n,e)}}function wE(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(bt(n,e))return;t.uniform4uiv(this.addr,e),At(n,e)}}function TE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);const s=this.type===t.SAMPLER_2D_SHADOW?Yg:qg;n.setTexture2D(e||s,r)}function bE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Kg,r)}function AE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Zg,r)}function CE(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||$g,r)}function RE(t){switch(t){case 5126:return uE;case 35664:return dE;case 35665:return fE;case 35666:return hE;case 35674:return pE;case 35675:return mE;case 35676:return gE;case 5124:case 35670:return xE;case 35667:case 35671:return vE;case 35668:case 35672:return _E;case 35669:case 35673:return yE;case 5125:return SE;case 36294:return ME;case 36295:return EE;case 36296:return wE;case 35678:case 36198:case 36298:case 36306:case 35682:return TE;case 35679:case 36299:case 36307:return bE;case 35680:case 36300:case 36308:case 36293:return AE;case 36289:case 36303:case 36311:case 36292:return CE}}function PE(t,e){t.uniform1fv(this.addr,e)}function LE(t,e){const n=Us(e,this.size,2);t.uniform2fv(this.addr,n)}function NE(t,e){const n=Us(e,this.size,3);t.uniform3fv(this.addr,n)}function DE(t,e){const n=Us(e,this.size,4);t.uniform4fv(this.addr,n)}function IE(t,e){const n=Us(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function UE(t,e){const n=Us(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function FE(t,e){const n=Us(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function kE(t,e){t.uniform1iv(this.addr,e)}function OE(t,e){t.uniform2iv(this.addr,e)}function zE(t,e){t.uniform3iv(this.addr,e)}function BE(t,e){t.uniform4iv(this.addr,e)}function HE(t,e){t.uniform1uiv(this.addr,e)}function GE(t,e){t.uniform2uiv(this.addr,e)}function VE(t,e){t.uniform3uiv(this.addr,e)}function jE(t,e){t.uniform4uiv(this.addr,e)}function WE(t,e,n){const i=this.cache,r=e.length,s=kl(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||qg,s[a])}function XE(t,e,n){const i=this.cache,r=e.length,s=kl(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||Kg,s[a])}function qE(t,e,n){const i=this.cache,r=e.length,s=kl(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||Zg,s[a])}function YE(t,e,n){const i=this.cache,r=e.length,s=kl(n,r);bt(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||$g,s[a])}function $E(t){switch(t){case 5126:return PE;case 35664:return LE;case 35665:return NE;case 35666:return DE;case 35674:return IE;case 35675:return UE;case 35676:return FE;case 5124:case 35670:return kE;case 35667:case 35671:return OE;case 35668:case 35672:return zE;case 35669:case 35673:return BE;case 5125:return HE;case 36294:return GE;case 36295:return VE;case 36296:return jE;case 35678:case 36198:case 36298:case 36306:case 35682:return WE;case 35679:case 36299:case 36307:return XE;case 35680:case 36300:case 36308:case 36293:return qE;case 36289:case 36303:case 36311:case 36292:return YE}}class KE{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=RE(n.type)}}class ZE{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=$E(n.type)}}class QE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Kc=/(\w+)(\])?(\[|\.)?/g;function Vp(t,e){t.seq.push(e),t.map[e.id]=e}function JE(t,e,n){const i=t.name,r=i.length;for(Kc.lastIndex=0;;){const s=Kc.exec(i),a=Kc.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Vp(n,c===void 0?new KE(o,t,e):new ZE(o,t,e));break}else{let f=n.map[o];f===void 0&&(f=new QE(o),Vp(n,f)),n=f}}}class Bo{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);JE(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function jp(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const ew=37297;let tw=0;function nw(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}function iw(t){const e=tt.getPrimaries(tt.workingColorSpace),n=tt.getPrimaries(t);let i;switch(e===n?i="":e===ml&&n===pl?i="LinearDisplayP3ToLinearSRGB":e===pl&&n===ml&&(i="LinearSRGBToLinearDisplayP3"),t){case Ji:case Fl:return[i,"LinearTransferOETF"];case Xn:case rf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Wp(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+nw(t.getShaderSource(e),a)}else return r}function rw(t,e){const n=iw(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function sw(t,e){let n;switch(e){case hy:n="Linear";break;case py:n="Reinhard";break;case my:n="OptimizedCineon";break;case gy:n="ACESFilmic";break;case vy:n="AgX";break;case _y:n="Neutral";break;case xy:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function aw(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.alphaToCoverage||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(cs).join(`
`)}function ow(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cs).join(`
`)}function lw(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function cw(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function cs(t){return t!==""}function Xp(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qp(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uw=/^[ \t]*#include +<([\w\d./]+)>/gm;function id(t){return t.replace(uw,fw)}const dw=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function fw(t,e){let n=Be[e];if(n===void 0){const i=dw.get(e);if(i!==void 0)n=Be[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return id(n)}const hw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yp(t){return t.replace(hw,pw)}function pw(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function $p(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	`;return t.isWebGL2&&(e+=`precision ${t.precision} sampler3D;
		precision ${t.precision} sampler2DArray;
		precision ${t.precision} sampler2DShadow;
		precision ${t.precision} samplerCubeShadow;
		precision ${t.precision} sampler2DArrayShadow;
		precision ${t.precision} isampler2D;
		precision ${t.precision} isampler3D;
		precision ${t.precision} isamplerCube;
		precision ${t.precision} isampler2DArray;
		precision ${t.precision} usampler2D;
		precision ${t.precision} usampler3D;
		precision ${t.precision} usamplerCube;
		precision ${t.precision} usampler2DArray;
		`),t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function mw(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Sg?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===H_?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===si&&(e="SHADOWMAP_TYPE_VSM"),e}function gw(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case bs:case As:e="ENVMAP_TYPE_CUBE";break;case Ul:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xw(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case As:e="ENVMAP_MODE_REFRACTION";break}return e}function vw(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Mg:e="ENVMAP_BLENDING_MULTIPLY";break;case dy:e="ENVMAP_BLENDING_MIX";break;case fy:e="ENVMAP_BLENDING_ADD";break}return e}function _w(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function yw(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=mw(n),c=gw(n),d=xw(n),f=vw(n),h=_w(n),x=n.isWebGL2?"":aw(n),_=ow(n),S=lw(s),p=r.createProgram();let u,v,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(cs).join(`
`),u.length>0&&(u+=`
`),v=[x,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S].filter(cs).join(`
`),v.length>0&&(v+=`
`)):(u=[$p(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cs).join(`
`),v=[x,$p(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,S,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ji?"#define TONE_MAPPING":"",n.toneMapping!==ji?Be.tonemapping_pars_fragment:"",n.toneMapping!==ji?sw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,rw("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(cs).join(`
`)),a=id(a),a=Xp(a,n),a=qp(a,n),o=id(o),o=Xp(o,n),o=qp(o,n),a=Yp(a),o=Yp(o),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,u=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===dp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===dp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=m+u+a,R=m+v+o,T=jp(r,r.VERTEX_SHADER,M),w=jp(r,r.FRAGMENT_SHADER,R);r.attachShader(p,T),r.attachShader(p,w),n.index0AttributeName!==void 0?r.bindAttribLocation(p,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function N(V){if(t.debug.checkShaderErrors){const Z=r.getProgramInfoLog(p).trim(),D=r.getShaderInfoLog(T).trim(),K=r.getShaderInfoLog(w).trim();let G=!0,te=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(G=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,p,T,w);else{const I=Wp(r,T,"vertex"),H=Wp(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+Z+`
`+I+`
`+H)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(D===""||K==="")&&(te=!1);te&&(V.diagnostics={runnable:G,programLog:Z,vertexShader:{log:D,prefix:u},fragmentShader:{log:K,prefix:v}})}r.deleteShader(T),r.deleteShader(w),O=new Bo(r,p),y=cw(r,p)}let O;this.getUniforms=function(){return O===void 0&&N(this),O};let y;this.getAttributes=function(){return y===void 0&&N(this),y};let A=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=r.getProgramParameter(p,ew)),A},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=tw++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=T,this.fragmentShader=w,this}let Sw=0;class Mw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new Ew(e),n.set(e,i)),i}}class Ew{constructor(e){this.id=Sw++,this.code=e,this.usedTimes=0}}function ww(t,e,n,i,r,s,a){const o=new kg,l=new Mw,c=new Set,d=[],f=r.isWebGL2,h=r.logarithmicDepthBuffer,x=r.vertexTextures;let _=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return c.add(y),y===0?"uv":`uv${y}`}function u(y,A,V,Z,D){const K=Z.fog,G=D.geometry,te=y.isMeshStandardMaterial?Z.environment:null,I=(y.isMeshStandardMaterial?n:e).get(y.envMap||te),H=I&&I.mapping===Ul?I.image.height:null,P=S[y.type];y.precision!==null&&(_=r.getMaxPrecision(y.precision),_!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",_,"instead."));const C=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Y=C!==void 0?C.length:0;let re=0;G.morphAttributes.position!==void 0&&(re=1),G.morphAttributes.normal!==void 0&&(re=2),G.morphAttributes.color!==void 0&&(re=3);let U,W,ee,ne;if(P){const nt=qn[P];U=nt.vertexShader,W=nt.fragmentShader}else U=y.vertexShader,W=y.fragmentShader,l.update(y),ee=l.getVertexShaderID(y),ne=l.getFragmentShaderID(y);const ae=t.getRenderTarget(),le=D.isInstancedMesh===!0,Me=D.isBatchedMesh===!0,ge=!!y.map,F=!!y.matcap,je=!!I,ue=!!y.aoMap,Te=!!y.lightMap,ye=!!y.bumpMap,Le=!!y.normalMap,Ce=!!y.displacementMap,Ne=!!y.emissiveMap,Qe=!!y.metalnessMap,L=!!y.roughnessMap,E=y.anisotropy>0,Q=y.clearcoat>0,J=y.iridescence>0,oe=y.sheen>0,ie=y.transmission>0,Ue=E&&!!y.anisotropyMap,Re=Q&&!!y.clearcoatMap,de=Q&&!!y.clearcoatNormalMap,pe=Q&&!!y.clearcoatRoughnessMap,Ie=J&&!!y.iridescenceMap,ce=J&&!!y.iridescenceThicknessMap,xt=oe&&!!y.sheenColorMap,We=oe&&!!y.sheenRoughnessMap,Ae=!!y.specularMap,Se=!!y.specularColorMap,Ee=!!y.specularIntensityMap,$e=ie&&!!y.transmissionMap,ke=ie&&!!y.thicknessMap,ct=!!y.gradientMap,k=!!y.alphaMap,me=y.alphaTest>0,X=!!y.alphaHash,fe=!!y.extensions;let xe=ji;y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(xe=t.toneMapping);const qe={isWebGL2:f,shaderID:P,shaderType:y.type,shaderName:y.name,vertexShader:U,fragmentShader:W,defines:y.defines,customVertexShaderID:ee,customFragmentShaderID:ne,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:_,batching:Me,instancing:le,instancingColor:le&&D.instanceColor!==null,instancingMorph:le&&D.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:ae===null?t.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Ji,alphaToCoverage:!!y.alphaToCoverage,map:ge,matcap:F,envMap:je,envMapMode:je&&I.mapping,envMapCubeUVHeight:H,aoMap:ue,lightMap:Te,bumpMap:ye,normalMap:Le,displacementMap:x&&Ce,emissiveMap:Ne,normalMapObjectSpace:Le&&y.normalMapType===Py,normalMapTangentSpace:Le&&y.normalMapType===Lg,metalnessMap:Qe,roughnessMap:L,anisotropy:E,anisotropyMap:Ue,clearcoat:Q,clearcoatMap:Re,clearcoatNormalMap:de,clearcoatRoughnessMap:pe,iridescence:J,iridescenceMap:Ie,iridescenceThicknessMap:ce,sheen:oe,sheenColorMap:xt,sheenRoughnessMap:We,specularMap:Ae,specularColorMap:Se,specularIntensityMap:Ee,transmission:ie,transmissionMap:$e,thicknessMap:ke,gradientMap:ct,opaque:y.transparent===!1&&y.blending===xs&&y.alphaToCoverage===!1,alphaMap:k,alphaTest:me,alphaHash:X,combine:y.combine,mapUv:ge&&p(y.map.channel),aoMapUv:ue&&p(y.aoMap.channel),lightMapUv:Te&&p(y.lightMap.channel),bumpMapUv:ye&&p(y.bumpMap.channel),normalMapUv:Le&&p(y.normalMap.channel),displacementMapUv:Ce&&p(y.displacementMap.channel),emissiveMapUv:Ne&&p(y.emissiveMap.channel),metalnessMapUv:Qe&&p(y.metalnessMap.channel),roughnessMapUv:L&&p(y.roughnessMap.channel),anisotropyMapUv:Ue&&p(y.anisotropyMap.channel),clearcoatMapUv:Re&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:de&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:We&&p(y.sheenRoughnessMap.channel),specularMapUv:Ae&&p(y.specularMap.channel),specularColorMapUv:Se&&p(y.specularColorMap.channel),specularIntensityMapUv:Ee&&p(y.specularIntensityMap.channel),transmissionMapUv:$e&&p(y.transmissionMap.channel),thicknessMapUv:ke&&p(y.thicknessMap.channel),alphaMapUv:k&&p(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Le||E),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!G.attributes.uv&&(ge||k),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:D.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:re,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&V.length>0,shadowMapType:t.shadowMap.type,toneMapping:xe,useLegacyLights:t._useLegacyLights,decodeVideoTexture:ge&&y.map.isVideoTexture===!0&&tt.getTransfer(y.map.colorSpace)===ot,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===mn,flipSided:y.side===cn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:fe&&y.extensions.derivatives===!0,extensionFragDepth:fe&&y.extensions.fragDepth===!0,extensionDrawBuffers:fe&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:fe&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:fe&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:fe&&y.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionFragDepth:f||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:f||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:f||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return qe.vertexUv1s=c.has(1),qe.vertexUv2s=c.has(2),qe.vertexUv3s=c.has(3),c.clear(),qe}function v(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const V in y.defines)A.push(V),A.push(y.defines[V]);return y.isRawShaderMaterial===!1&&(m(A,y),M(A,y),A.push(t.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function m(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function M(y,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.instancingMorph&&o.enable(4),A.matcap&&o.enable(5),A.envMap&&o.enable(6),A.normalMapObjectSpace&&o.enable(7),A.normalMapTangentSpace&&o.enable(8),A.clearcoat&&o.enable(9),A.iridescence&&o.enable(10),A.alphaTest&&o.enable(11),A.vertexColors&&o.enable(12),A.vertexAlphas&&o.enable(13),A.vertexUv1s&&o.enable(14),A.vertexUv2s&&o.enable(15),A.vertexUv3s&&o.enable(16),A.vertexTangents&&o.enable(17),A.anisotropy&&o.enable(18),A.alphaHash&&o.enable(19),A.batching&&o.enable(20),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.alphaToCoverage&&o.enable(20),y.push(o.mask)}function R(y){const A=S[y.type];let V;if(A){const Z=qn[A];V=rS.clone(Z.uniforms)}else V=y.uniforms;return V}function T(y,A){let V;for(let Z=0,D=d.length;Z<D;Z++){const K=d[Z];if(K.cacheKey===A){V=K,++V.usedTimes;break}}return V===void 0&&(V=new yw(t,A,y,s),d.push(V)),V}function w(y){if(--y.usedTimes===0){const A=d.indexOf(y);d[A]=d[d.length-1],d.pop(),y.destroy()}}function N(y){l.remove(y)}function O(){l.dispose()}return{getParameters:u,getProgramCacheKey:v,getUniforms:R,acquireProgram:T,releaseProgram:w,releaseShaderCache:N,programs:d,dispose:O}}function Tw(){let t=new WeakMap;function e(s){let a=t.get(s);return a===void 0&&(a={},t.set(s,a)),a}function n(s){t.delete(s)}function i(s,a,o){t.get(s)[a]=o}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function bw(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Kp(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Zp(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(f,h,x,_,S,p){let u=t[e];return u===void 0?(u={id:f.id,object:f,geometry:h,material:x,groupOrder:_,renderOrder:f.renderOrder,z:S,group:p},t[e]=u):(u.id=f.id,u.object=f,u.geometry=h,u.material=x,u.groupOrder=_,u.renderOrder=f.renderOrder,u.z=S,u.group=p),e++,u}function o(f,h,x,_,S,p){const u=a(f,h,x,_,S,p);x.transmission>0?i.push(u):x.transparent===!0?r.push(u):n.push(u)}function l(f,h,x,_,S,p){const u=a(f,h,x,_,S,p);x.transmission>0?i.unshift(u):x.transparent===!0?r.unshift(u):n.unshift(u)}function c(f,h){n.length>1&&n.sort(f||bw),i.length>1&&i.sort(h||Kp),r.length>1&&r.sort(h||Kp)}function d(){for(let f=e,h=t.length;f<h;f++){const x=t[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:d,sort:c}}function Aw(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Zp,t.set(i,[a])):r>=s.length?(a=new Zp,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function Cw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new z,color:new Ye};break;case"SpotLight":n={position:new z,direction:new z,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new z,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":n={direction:new z,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":n={color:new Ye,position:new z,halfWidth:new z,halfHeight:new z};break}return t[e.id]=n,n}}}function Rw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let Pw=0;function Lw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Nw(t,e){const n=new Cw,i=Rw(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new z);const s=new z,a=new mt,o=new mt;function l(d,f){let h=0,x=0,_=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let S=0,p=0,u=0,v=0,m=0,M=0,R=0,T=0,w=0,N=0,O=0;d.sort(Lw);const y=f===!0?Math.PI:1;for(let V=0,Z=d.length;V<Z;V++){const D=d[V],K=D.color,G=D.intensity,te=D.distance,I=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=K.r*G*y,x+=K.g*G*y,_+=K.b*G*y;else if(D.isLightProbe){for(let H=0;H<9;H++)r.probe[H].addScaledVector(D.sh.coefficients[H],G);O++}else if(D.isDirectionalLight){const H=n.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity*y),D.castShadow){const P=D.shadow,C=i.get(D);C.shadowBias=P.bias,C.shadowNormalBias=P.normalBias,C.shadowRadius=P.radius,C.shadowMapSize=P.mapSize,r.directionalShadow[S]=C,r.directionalShadowMap[S]=I,r.directionalShadowMatrix[S]=D.shadow.matrix,M++}r.directional[S]=H,S++}else if(D.isSpotLight){const H=n.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(K).multiplyScalar(G*y),H.distance=te,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,r.spot[u]=H;const P=D.shadow;if(D.map&&(r.spotLightMap[w]=D.map,w++,P.updateMatrices(D),D.castShadow&&N++),r.spotLightMatrix[u]=P.matrix,D.castShadow){const C=i.get(D);C.shadowBias=P.bias,C.shadowNormalBias=P.normalBias,C.shadowRadius=P.radius,C.shadowMapSize=P.mapSize,r.spotShadow[u]=C,r.spotShadowMap[u]=I,T++}u++}else if(D.isRectAreaLight){const H=n.get(D);H.color.copy(K).multiplyScalar(G),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),r.rectArea[v]=H,v++}else if(D.isPointLight){const H=n.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity*y),H.distance=D.distance,H.decay=D.decay,D.castShadow){const P=D.shadow,C=i.get(D);C.shadowBias=P.bias,C.shadowNormalBias=P.normalBias,C.shadowRadius=P.radius,C.shadowMapSize=P.mapSize,C.shadowCameraNear=P.camera.near,C.shadowCameraFar=P.camera.far,r.pointShadow[p]=C,r.pointShadowMap[p]=I,r.pointShadowMatrix[p]=D.shadow.matrix,R++}r.point[p]=H,p++}else if(D.isHemisphereLight){const H=n.get(D);H.skyColor.copy(D.color).multiplyScalar(G*y),H.groundColor.copy(D.groundColor).multiplyScalar(G*y),r.hemi[m]=H,m++}}v>0&&(e.isWebGL2?t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=he.LTC_FLOAT_1,r.rectAreaLTC2=he.LTC_FLOAT_2):(r.rectAreaLTC1=he.LTC_HALF_1,r.rectAreaLTC2=he.LTC_HALF_2):t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=he.LTC_FLOAT_1,r.rectAreaLTC2=he.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=he.LTC_HALF_1,r.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=x,r.ambient[2]=_;const A=r.hash;(A.directionalLength!==S||A.pointLength!==p||A.spotLength!==u||A.rectAreaLength!==v||A.hemiLength!==m||A.numDirectionalShadows!==M||A.numPointShadows!==R||A.numSpotShadows!==T||A.numSpotMaps!==w||A.numLightProbes!==O)&&(r.directional.length=S,r.spot.length=u,r.rectArea.length=v,r.point.length=p,r.hemi.length=m,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=R,r.pointShadowMap.length=R,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=R,r.spotLightMatrix.length=T+w-N,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=N,r.numLightProbes=O,A.directionalLength=S,A.pointLength=p,A.spotLength=u,A.rectAreaLength=v,A.hemiLength=m,A.numDirectionalShadows=M,A.numPointShadows=R,A.numSpotShadows=T,A.numSpotMaps=w,A.numLightProbes=O,r.version=Pw++)}function c(d,f){let h=0,x=0,_=0,S=0,p=0;const u=f.matrixWorldInverse;for(let v=0,m=d.length;v<m;v++){const M=d[v];if(M.isDirectionalLight){const R=r.directional[h];R.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(u),h++}else if(M.isSpotLight){const R=r.spot[_];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(u),R.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(u),_++}else if(M.isRectAreaLight){const R=r.rectArea[S];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(u),o.identity(),a.copy(M.matrixWorld),a.premultiply(u),o.extractRotation(a),R.halfWidth.set(M.width*.5,0,0),R.halfHeight.set(0,M.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),S++}else if(M.isPointLight){const R=r.point[x];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(u),x++}else if(M.isHemisphereLight){const R=r.hemi[p];R.direction.setFromMatrixPosition(M.matrixWorld),R.direction.transformDirection(u),p++}}}return{setup:l,setupView:c,state:r}}function Qp(t,e){const n=new Nw(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(f){i.push(f)}function o(f){r.push(f)}function l(f){n.setup(i,f)}function c(f){n.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Dw(t,e){let n=new WeakMap;function i(s,a=0){const o=n.get(s);let l;return o===void 0?(l=new Qp(t,e),n.set(s,[l])):a>=o.length?(l=new Qp(t,e),o.push(l)):l=o[a],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class Iw extends Nr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Uw extends Nr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Fw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ow(t,e,n){let i=new af;const r=new Ge,s=new Ge,a=new Lt,o=new Iw({depthPacking:Ry}),l=new Uw,c={},d=n.maxTextureSize,f={[Yi]:cn,[cn]:Yi,[mn]:mn},h=new $i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:Fw,fragmentShader:kw}),x=h.clone();x.defines.HORIZONTAL_PASS=1;const _=new Wt;_.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Je(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sg;let u=this.type;this.render=function(T,w,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const O=t.getRenderTarget(),y=t.getActiveCubeFace(),A=t.getActiveMipmapLevel(),V=t.state;V.setBlending(Vi),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const Z=u!==si&&this.type===si,D=u===si&&this.type!==si;for(let K=0,G=T.length;K<G;K++){const te=T[K],I=te.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const H=I.getFrameExtents();if(r.multiply(H),s.copy(I.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/H.x),r.x=s.x*H.x,I.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/H.y),r.y=s.y*H.y,I.mapSize.y=s.y)),I.map===null||Z===!0||D===!0){const C=this.type!==si?{minFilter:$t,magFilter:$t}:{};I.map!==null&&I.map.dispose(),I.map=new Ar(r.x,r.y,C),I.map.texture.name=te.name+".shadowMap",I.camera.updateProjectionMatrix()}t.setRenderTarget(I.map),t.clear();const P=I.getViewportCount();for(let C=0;C<P;C++){const Y=I.getViewport(C);a.set(s.x*Y.x,s.y*Y.y,s.x*Y.z,s.y*Y.w),V.viewport(a),I.updateMatrices(te,C),i=I.getFrustum(),M(w,N,I.camera,te,this.type)}I.isPointLightShadow!==!0&&this.type===si&&v(I,N),I.needsUpdate=!1}u=this.type,p.needsUpdate=!1,t.setRenderTarget(O,y,A)};function v(T,w){const N=e.update(S);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,x.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,x.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ar(r.x,r.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(w,null,N,h,S,null),x.uniforms.shadow_pass.value=T.mapPass.texture,x.uniforms.resolution.value=T.mapSize,x.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(w,null,N,x,S,null)}function m(T,w,N,O){let y=null;const A=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)y=A;else if(y=N.isPointLight===!0?l:o,t.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=y.uuid,Z=w.uuid;let D=c[V];D===void 0&&(D={},c[V]=D);let K=D[Z];K===void 0&&(K=y.clone(),D[Z]=K,w.addEventListener("dispose",R)),y=K}if(y.visible=w.visible,y.wireframe=w.wireframe,O===si?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:f[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,N.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const V=t.properties.get(y);V.light=N}return y}function M(T,w,N,O,y){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===si)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const Z=e.update(T),D=T.material;if(Array.isArray(D)){const K=Z.groups;for(let G=0,te=K.length;G<te;G++){const I=K[G],H=D[I.materialIndex];if(H&&H.visible){const P=m(T,H,O,y);T.onBeforeShadow(t,T,w,N,Z,P,I),t.renderBufferDirect(N,null,Z,P,T,I),T.onAfterShadow(t,T,w,N,Z,P,I)}}}else if(D.visible){const K=m(T,D,O,y);T.onBeforeShadow(t,T,w,N,Z,K,null),t.renderBufferDirect(N,null,Z,K,T,null),T.onAfterShadow(t,T,w,N,Z,K,null)}}const V=T.children;for(let Z=0,D=V.length;Z<D;Z++)M(V[Z],w,N,O,y)}function R(T){T.target.removeEventListener("dispose",R);for(const N in c){const O=c[N],y=T.target.uuid;y in O&&(O[y].dispose(),delete O[y])}}}function zw(t,e,n){const i=n.isWebGL2;function r(){let k=!1;const me=new Lt;let X=null;const fe=new Lt(0,0,0,0);return{setMask:function(xe){X!==xe&&!k&&(t.colorMask(xe,xe,xe,xe),X=xe)},setLocked:function(xe){k=xe},setClear:function(xe,qe,nt,Dt,Sn){Sn===!0&&(xe*=Dt,qe*=Dt,nt*=Dt),me.set(xe,qe,nt,Dt),fe.equals(me)===!1&&(t.clearColor(xe,qe,nt,Dt),fe.copy(me))},reset:function(){k=!1,X=null,fe.set(-1,0,0,0)}}}function s(){let k=!1,me=null,X=null,fe=null;return{setTest:function(xe){xe?le(t.DEPTH_TEST):Me(t.DEPTH_TEST)},setMask:function(xe){me!==xe&&!k&&(t.depthMask(xe),me=xe)},setFunc:function(xe){if(X!==xe){switch(xe){case ry:t.depthFunc(t.NEVER);break;case sy:t.depthFunc(t.ALWAYS);break;case ay:t.depthFunc(t.LESS);break;case fl:t.depthFunc(t.LEQUAL);break;case oy:t.depthFunc(t.EQUAL);break;case ly:t.depthFunc(t.GEQUAL);break;case cy:t.depthFunc(t.GREATER);break;case uy:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}X=xe}},setLocked:function(xe){k=xe},setClear:function(xe){fe!==xe&&(t.clearDepth(xe),fe=xe)},reset:function(){k=!1,me=null,X=null,fe=null}}}function a(){let k=!1,me=null,X=null,fe=null,xe=null,qe=null,nt=null,Dt=null,Sn=null;return{setTest:function(it){k||(it?le(t.STENCIL_TEST):Me(t.STENCIL_TEST))},setMask:function(it){me!==it&&!k&&(t.stencilMask(it),me=it)},setFunc:function(it,Xt,Vn){(X!==it||fe!==Xt||xe!==Vn)&&(t.stencilFunc(it,Xt,Vn),X=it,fe=Xt,xe=Vn)},setOp:function(it,Xt,Vn){(qe!==it||nt!==Xt||Dt!==Vn)&&(t.stencilOp(it,Xt,Vn),qe=it,nt=Xt,Dt=Vn)},setLocked:function(it){k=it},setClear:function(it){Sn!==it&&(t.clearStencil(it),Sn=it)},reset:function(){k=!1,me=null,X=null,fe=null,xe=null,qe=null,nt=null,Dt=null,Sn=null}}}const o=new r,l=new s,c=new a,d=new WeakMap,f=new WeakMap;let h={},x={},_=new WeakMap,S=[],p=null,u=!1,v=null,m=null,M=null,R=null,T=null,w=null,N=null,O=new Ye(0,0,0),y=0,A=!1,V=null,Z=null,D=null,K=null,G=null;const te=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,H=0;const P=t.getParameter(t.VERSION);P.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(P)[1]),I=H>=1):P.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),I=H>=2);let C=null,Y={};const re=t.getParameter(t.SCISSOR_BOX),U=t.getParameter(t.VIEWPORT),W=new Lt().fromArray(re),ee=new Lt().fromArray(U);function ne(k,me,X,fe){const xe=new Uint8Array(4),qe=t.createTexture();t.bindTexture(k,qe),t.texParameteri(k,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(k,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let nt=0;nt<X;nt++)i&&(k===t.TEXTURE_3D||k===t.TEXTURE_2D_ARRAY)?t.texImage3D(me,0,t.RGBA,1,1,fe,0,t.RGBA,t.UNSIGNED_BYTE,xe):t.texImage2D(me+nt,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,xe);return qe}const ae={};ae[t.TEXTURE_2D]=ne(t.TEXTURE_2D,t.TEXTURE_2D,1),ae[t.TEXTURE_CUBE_MAP]=ne(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ae[t.TEXTURE_2D_ARRAY]=ne(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ae[t.TEXTURE_3D]=ne(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),le(t.DEPTH_TEST),l.setFunc(fl),Ce(!1),Ne(Nh),le(t.CULL_FACE),ye(Vi);function le(k){h[k]!==!0&&(t.enable(k),h[k]=!0)}function Me(k){h[k]!==!1&&(t.disable(k),h[k]=!1)}function ge(k,me){return x[k]!==me?(t.bindFramebuffer(k,me),x[k]=me,i&&(k===t.DRAW_FRAMEBUFFER&&(x[t.FRAMEBUFFER]=me),k===t.FRAMEBUFFER&&(x[t.DRAW_FRAMEBUFFER]=me)),!0):!1}function F(k,me){let X=S,fe=!1;if(k){X=_.get(me),X===void 0&&(X=[],_.set(me,X));const xe=k.textures;if(X.length!==xe.length||X[0]!==t.COLOR_ATTACHMENT0){for(let qe=0,nt=xe.length;qe<nt;qe++)X[qe]=t.COLOR_ATTACHMENT0+qe;X.length=xe.length,fe=!0}}else X[0]!==t.BACK&&(X[0]=t.BACK,fe=!0);if(fe)if(n.isWebGL2)t.drawBuffers(X);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(X);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function je(k){return p!==k?(t.useProgram(k),p=k,!0):!1}const ue={[fr]:t.FUNC_ADD,[V_]:t.FUNC_SUBTRACT,[j_]:t.FUNC_REVERSE_SUBTRACT};if(i)ue[Uh]=t.MIN,ue[Fh]=t.MAX;else{const k=e.get("EXT_blend_minmax");k!==null&&(ue[Uh]=k.MIN_EXT,ue[Fh]=k.MAX_EXT)}const Te={[W_]:t.ZERO,[X_]:t.ONE,[q_]:t.SRC_COLOR,[$u]:t.SRC_ALPHA,[J_]:t.SRC_ALPHA_SATURATE,[Z_]:t.DST_COLOR,[$_]:t.DST_ALPHA,[Y_]:t.ONE_MINUS_SRC_COLOR,[Ku]:t.ONE_MINUS_SRC_ALPHA,[Q_]:t.ONE_MINUS_DST_COLOR,[K_]:t.ONE_MINUS_DST_ALPHA,[ey]:t.CONSTANT_COLOR,[ty]:t.ONE_MINUS_CONSTANT_COLOR,[ny]:t.CONSTANT_ALPHA,[iy]:t.ONE_MINUS_CONSTANT_ALPHA};function ye(k,me,X,fe,xe,qe,nt,Dt,Sn,it){if(k===Vi){u===!0&&(Me(t.BLEND),u=!1);return}if(u===!1&&(le(t.BLEND),u=!0),k!==G_){if(k!==v||it!==A){if((m!==fr||T!==fr)&&(t.blendEquation(t.FUNC_ADD),m=fr,T=fr),it)switch(k){case xs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Yu:t.blendFunc(t.ONE,t.ONE);break;case Dh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Ih:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case xs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Yu:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Dh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Ih:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}M=null,R=null,w=null,N=null,O.set(0,0,0),y=0,v=k,A=it}return}xe=xe||me,qe=qe||X,nt=nt||fe,(me!==m||xe!==T)&&(t.blendEquationSeparate(ue[me],ue[xe]),m=me,T=xe),(X!==M||fe!==R||qe!==w||nt!==N)&&(t.blendFuncSeparate(Te[X],Te[fe],Te[qe],Te[nt]),M=X,R=fe,w=qe,N=nt),(Dt.equals(O)===!1||Sn!==y)&&(t.blendColor(Dt.r,Dt.g,Dt.b,Sn),O.copy(Dt),y=Sn),v=k,A=!1}function Le(k,me){k.side===mn?Me(t.CULL_FACE):le(t.CULL_FACE);let X=k.side===cn;me&&(X=!X),Ce(X),k.blending===xs&&k.transparent===!1?ye(Vi):ye(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),l.setFunc(k.depthFunc),l.setTest(k.depthTest),l.setMask(k.depthWrite),o.setMask(k.colorWrite);const fe=k.stencilWrite;c.setTest(fe),fe&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),L(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?le(t.SAMPLE_ALPHA_TO_COVERAGE):Me(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(k){V!==k&&(k?t.frontFace(t.CW):t.frontFace(t.CCW),V=k)}function Ne(k){k!==z_?(le(t.CULL_FACE),k!==Z&&(k===Nh?t.cullFace(t.BACK):k===B_?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Me(t.CULL_FACE),Z=k}function Qe(k){k!==D&&(I&&t.lineWidth(k),D=k)}function L(k,me,X){k?(le(t.POLYGON_OFFSET_FILL),(K!==me||G!==X)&&(t.polygonOffset(me,X),K=me,G=X)):Me(t.POLYGON_OFFSET_FILL)}function E(k){k?le(t.SCISSOR_TEST):Me(t.SCISSOR_TEST)}function Q(k){k===void 0&&(k=t.TEXTURE0+te-1),C!==k&&(t.activeTexture(k),C=k)}function J(k,me,X){X===void 0&&(C===null?X=t.TEXTURE0+te-1:X=C);let fe=Y[X];fe===void 0&&(fe={type:void 0,texture:void 0},Y[X]=fe),(fe.type!==k||fe.texture!==me)&&(C!==X&&(t.activeTexture(X),C=X),t.bindTexture(k,me||ae[k]),fe.type=k,fe.texture=me)}function oe(){const k=Y[C];k!==void 0&&k.type!==void 0&&(t.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ie(){try{t.compressedTexImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ue(){try{t.compressedTexImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Re(){try{t.texSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function de(){try{t.texSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pe(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ie(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ce(){try{t.texStorage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function xt(){try{t.texStorage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function We(){try{t.texImage2D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ae(){try{t.texImage3D.apply(t,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Se(k){W.equals(k)===!1&&(t.scissor(k.x,k.y,k.z,k.w),W.copy(k))}function Ee(k){ee.equals(k)===!1&&(t.viewport(k.x,k.y,k.z,k.w),ee.copy(k))}function $e(k,me){let X=f.get(me);X===void 0&&(X=new WeakMap,f.set(me,X));let fe=X.get(k);fe===void 0&&(fe=t.getUniformBlockIndex(me,k.name),X.set(k,fe))}function ke(k,me){const fe=f.get(me).get(k);d.get(me)!==fe&&(t.uniformBlockBinding(me,fe,k.__bindingPointIndex),d.set(me,fe))}function ct(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},C=null,Y={},x={},_=new WeakMap,S=[],p=null,u=!1,v=null,m=null,M=null,R=null,T=null,w=null,N=null,O=new Ye(0,0,0),y=0,A=!1,V=null,Z=null,D=null,K=null,G=null,W.set(0,0,t.canvas.width,t.canvas.height),ee.set(0,0,t.canvas.width,t.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:le,disable:Me,bindFramebuffer:ge,drawBuffers:F,useProgram:je,setBlending:ye,setMaterial:Le,setFlipSided:Ce,setCullFace:Ne,setLineWidth:Qe,setPolygonOffset:L,setScissorTest:E,activeTexture:Q,bindTexture:J,unbindTexture:oe,compressedTexImage2D:ie,compressedTexImage3D:Ue,texImage2D:We,texImage3D:Ae,updateUBOMapping:$e,uniformBlockBinding:ke,texStorage2D:ce,texStorage3D:xt,texSubImage2D:Re,texSubImage3D:de,compressedTexSubImage2D:pe,compressedTexSubImage3D:Ie,scissor:Se,viewport:Ee,reset:ct}}function Bw(t,e,n,i,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Ge,f=new WeakMap;let h;const x=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(L,E){return _?new OffscreenCanvas(L,E):vl("canvas")}function p(L,E,Q,J){let oe=1;const ie=Qe(L);if((ie.width>J||ie.height>J)&&(oe=J/Math.max(ie.width,ie.height)),oe<1||E===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Ue=E?nd:Math.floor,Re=Ue(oe*ie.width),de=Ue(oe*ie.height);h===void 0&&(h=S(Re,de));const pe=Q?S(Re,de):h;return pe.width=Re,pe.height=de,pe.getContext("2d").drawImage(L,0,0,Re,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Re+"x"+de+")."),pe}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),L;return L}function u(L){const E=Qe(L);return fp(E.width)&&fp(E.height)}function v(L){return o?!1:L.wrapS!==On||L.wrapT!==On||L.minFilter!==$t&&L.minFilter!==en}function m(L,E){return L.generateMipmaps&&E&&L.minFilter!==$t&&L.minFilter!==en}function M(L){t.generateMipmap(L)}function R(L,E,Q,J,oe=!1){if(o===!1)return E;if(L!==null){if(t[L]!==void 0)return t[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ie=E;if(E===t.RED&&(Q===t.FLOAT&&(ie=t.R32F),Q===t.HALF_FLOAT&&(ie=t.R16F),Q===t.UNSIGNED_BYTE&&(ie=t.R8)),E===t.RED_INTEGER&&(Q===t.UNSIGNED_BYTE&&(ie=t.R8UI),Q===t.UNSIGNED_SHORT&&(ie=t.R16UI),Q===t.UNSIGNED_INT&&(ie=t.R32UI),Q===t.BYTE&&(ie=t.R8I),Q===t.SHORT&&(ie=t.R16I),Q===t.INT&&(ie=t.R32I)),E===t.RG&&(Q===t.FLOAT&&(ie=t.RG32F),Q===t.HALF_FLOAT&&(ie=t.RG16F),Q===t.UNSIGNED_BYTE&&(ie=t.RG8)),E===t.RG_INTEGER&&(Q===t.UNSIGNED_BYTE&&(ie=t.RG8UI),Q===t.UNSIGNED_SHORT&&(ie=t.RG16UI),Q===t.UNSIGNED_INT&&(ie=t.RG32UI),Q===t.BYTE&&(ie=t.RG8I),Q===t.SHORT&&(ie=t.RG16I),Q===t.INT&&(ie=t.RG32I)),E===t.RGBA){const Ue=oe?hl:tt.getTransfer(J);Q===t.FLOAT&&(ie=t.RGBA32F),Q===t.HALF_FLOAT&&(ie=t.RGBA16F),Q===t.UNSIGNED_BYTE&&(ie=Ue===ot?t.SRGB8_ALPHA8:t.RGBA8),Q===t.UNSIGNED_SHORT_4_4_4_4&&(ie=t.RGBA4),Q===t.UNSIGNED_SHORT_5_5_5_1&&(ie=t.RGB5_A1)}return(ie===t.R16F||ie===t.R32F||ie===t.RG16F||ie===t.RG32F||ie===t.RGBA16F||ie===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function T(L,E,Q){return m(L,Q)===!0||L.isFramebufferTexture&&L.minFilter!==$t&&L.minFilter!==en?Math.log2(Math.max(E.width,E.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?E.mipmaps.length:1}function w(L){return L===$t||L===kh||L===Ws?t.NEAREST:t.LINEAR}function N(L){const E=L.target;E.removeEventListener("dispose",N),y(E),E.isVideoTexture&&f.delete(E)}function O(L){const E=L.target;E.removeEventListener("dispose",O),V(E)}function y(L){const E=i.get(L);if(E.__webglInit===void 0)return;const Q=L.source,J=x.get(Q);if(J){const oe=J[E.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&A(L),Object.keys(J).length===0&&x.delete(Q)}i.remove(L)}function A(L){const E=i.get(L);t.deleteTexture(E.__webglTexture);const Q=L.source,J=x.get(Q);delete J[E.__cacheKey],a.memory.textures--}function V(L){const E=i.get(L);if(L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let oe=0;oe<E.__webglFramebuffer[J].length;oe++)t.deleteFramebuffer(E.__webglFramebuffer[J][oe]);else t.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)t.deleteFramebuffer(E.__webglFramebuffer[J]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const Q=L.textures;for(let J=0,oe=Q.length;J<oe;J++){const ie=i.get(Q[J]);ie.__webglTexture&&(t.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(Q[J])}i.remove(L)}let Z=0;function D(){Z=0}function K(){const L=Z;return L>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+r.maxTextures),Z+=1,L}function G(L){const E=[];return E.push(L.wrapS),E.push(L.wrapT),E.push(L.wrapR||0),E.push(L.magFilter),E.push(L.minFilter),E.push(L.anisotropy),E.push(L.internalFormat),E.push(L.format),E.push(L.type),E.push(L.generateMipmaps),E.push(L.premultiplyAlpha),E.push(L.flipY),E.push(L.unpackAlignment),E.push(L.colorSpace),E.join()}function te(L,E){const Q=i.get(L);if(L.isVideoTexture&&Ce(L),L.isRenderTargetTexture===!1&&L.version>0&&Q.__version!==L.version){const J=L.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(Q,L,E);return}}n.bindTexture(t.TEXTURE_2D,Q.__webglTexture,t.TEXTURE0+E)}function I(L,E){const Q=i.get(L);if(L.version>0&&Q.__version!==L.version){ee(Q,L,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,Q.__webglTexture,t.TEXTURE0+E)}function H(L,E){const Q=i.get(L);if(L.version>0&&Q.__version!==L.version){ee(Q,L,E);return}n.bindTexture(t.TEXTURE_3D,Q.__webglTexture,t.TEXTURE0+E)}function P(L,E){const Q=i.get(L);if(L.version>0&&Q.__version!==L.version){ne(Q,L,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,Q.__webglTexture,t.TEXTURE0+E)}const C={[Ju]:t.REPEAT,[On]:t.CLAMP_TO_EDGE,[ed]:t.MIRRORED_REPEAT},Y={[$t]:t.NEAREST,[kh]:t.NEAREST_MIPMAP_NEAREST,[Ws]:t.NEAREST_MIPMAP_LINEAR,[en]:t.LINEAR,[_c]:t.LINEAR_MIPMAP_NEAREST,[xr]:t.LINEAR_MIPMAP_LINEAR},re={[Ly]:t.NEVER,[ky]:t.ALWAYS,[Ny]:t.LESS,[Ng]:t.LEQUAL,[Dy]:t.EQUAL,[Fy]:t.GEQUAL,[Iy]:t.GREATER,[Uy]:t.NOTEQUAL};function U(L,E,Q){if(E.type===li&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===en||E.magFilter===_c||E.magFilter===Ws||E.magFilter===xr||E.minFilter===en||E.minFilter===_c||E.minFilter===Ws||E.minFilter===xr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),Q?(t.texParameteri(L,t.TEXTURE_WRAP_S,C[E.wrapS]),t.texParameteri(L,t.TEXTURE_WRAP_T,C[E.wrapT]),(L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY)&&t.texParameteri(L,t.TEXTURE_WRAP_R,C[E.wrapR]),t.texParameteri(L,t.TEXTURE_MAG_FILTER,Y[E.magFilter]),t.texParameteri(L,t.TEXTURE_MIN_FILTER,Y[E.minFilter])):(t.texParameteri(L,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(L,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY)&&t.texParameteri(L,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(E.wrapS!==On||E.wrapT!==On)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(L,t.TEXTURE_MAG_FILTER,w(E.magFilter)),t.texParameteri(L,t.TEXTURE_MIN_FILTER,w(E.minFilter)),E.minFilter!==$t&&E.minFilter!==en&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),E.compareFunction&&(t.texParameteri(L,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(L,t.TEXTURE_COMPARE_FUNC,re[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===$t||E.minFilter!==Ws&&E.minFilter!==xr||E.type===li&&e.has("OES_texture_float_linear")===!1||o===!1&&E.type===Ca&&e.has("OES_texture_half_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");t.texParameterf(L,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function W(L,E){let Q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,E.addEventListener("dispose",N));const J=E.source;let oe=x.get(J);oe===void 0&&(oe={},x.set(J,oe));const ie=G(E);if(ie!==L.__cacheKey){oe[ie]===void 0&&(oe[ie]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,Q=!0),oe[ie].usedTimes++;const Ue=oe[L.__cacheKey];Ue!==void 0&&(oe[L.__cacheKey].usedTimes--,Ue.usedTimes===0&&A(E)),L.__cacheKey=ie,L.__webglTexture=oe[ie].texture}return Q}function ee(L,E,Q){let J=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=t.TEXTURE_3D);const oe=W(L,E),ie=E.source;n.bindTexture(J,L.__webglTexture,t.TEXTURE0+Q);const Ue=i.get(ie);if(ie.version!==Ue.__version||oe===!0){n.activeTexture(t.TEXTURE0+Q);const Re=tt.getPrimaries(tt.workingColorSpace),de=E.colorSpace===Li?null:tt.getPrimaries(E.colorSpace),pe=E.colorSpace===Li||Re===de?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Ie=v(E)&&u(E.image)===!1;let ce=p(E.image,Ie,!1,r.maxTextureSize);ce=Ne(E,ce);const xt=u(ce)||o,We=s.convert(E.format,E.colorSpace);let Ae=s.convert(E.type),Se=R(E.internalFormat,We,Ae,E.colorSpace,E.isVideoTexture);U(J,E,xt);let Ee;const $e=E.mipmaps,ke=o&&E.isVideoTexture!==!0&&Se!==Pg,ct=Ue.__version===void 0||oe===!0,k=ie.dataReady,me=T(E,ce,xt);if(E.isDepthTexture)Se=t.DEPTH_COMPONENT,o?E.type===li?Se=t.DEPTH_COMPONENT32F:E.type===Ii?Se=t.DEPTH_COMPONENT24:E.type===yr?Se=t.DEPTH24_STENCIL8:Se=t.DEPTH_COMPONENT16:E.type===li&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),E.format===Sr&&Se===t.DEPTH_COMPONENT&&E.type!==nf&&E.type!==Ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),E.type=Ii,Ae=s.convert(E.type)),E.format===Cs&&Se===t.DEPTH_COMPONENT&&(Se=t.DEPTH_STENCIL,E.type!==yr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),E.type=yr,Ae=s.convert(E.type))),ct&&(ke?n.texStorage2D(t.TEXTURE_2D,1,Se,ce.width,ce.height):n.texImage2D(t.TEXTURE_2D,0,Se,ce.width,ce.height,0,We,Ae,null));else if(E.isDataTexture)if($e.length>0&&xt){ke&&ct&&n.texStorage2D(t.TEXTURE_2D,me,Se,$e[0].width,$e[0].height);for(let X=0,fe=$e.length;X<fe;X++)Ee=$e[X],ke?k&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,Ee.width,Ee.height,We,Ae,Ee.data):n.texImage2D(t.TEXTURE_2D,X,Se,Ee.width,Ee.height,0,We,Ae,Ee.data);E.generateMipmaps=!1}else ke?(ct&&n.texStorage2D(t.TEXTURE_2D,me,Se,ce.width,ce.height),k&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ce.width,ce.height,We,Ae,ce.data)):n.texImage2D(t.TEXTURE_2D,0,Se,ce.width,ce.height,0,We,Ae,ce.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ke&&ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,me,Se,$e[0].width,$e[0].height,ce.depth);for(let X=0,fe=$e.length;X<fe;X++)Ee=$e[X],E.format!==zn?We!==null?ke?k&&n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,Ee.width,Ee.height,ce.depth,We,Ee.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,X,Se,Ee.width,Ee.height,ce.depth,0,Ee.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?k&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,Ee.width,Ee.height,ce.depth,We,Ae,Ee.data):n.texImage3D(t.TEXTURE_2D_ARRAY,X,Se,Ee.width,Ee.height,ce.depth,0,We,Ae,Ee.data)}else{ke&&ct&&n.texStorage2D(t.TEXTURE_2D,me,Se,$e[0].width,$e[0].height);for(let X=0,fe=$e.length;X<fe;X++)Ee=$e[X],E.format!==zn?We!==null?ke?k&&n.compressedTexSubImage2D(t.TEXTURE_2D,X,0,0,Ee.width,Ee.height,We,Ee.data):n.compressedTexImage2D(t.TEXTURE_2D,X,Se,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?k&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,Ee.width,Ee.height,We,Ae,Ee.data):n.texImage2D(t.TEXTURE_2D,X,Se,Ee.width,Ee.height,0,We,Ae,Ee.data)}else if(E.isDataArrayTexture)ke?(ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,me,Se,ce.width,ce.height,ce.depth),k&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,We,Ae,ce.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,Se,ce.width,ce.height,ce.depth,0,We,Ae,ce.data);else if(E.isData3DTexture)ke?(ct&&n.texStorage3D(t.TEXTURE_3D,me,Se,ce.width,ce.height,ce.depth),k&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,We,Ae,ce.data)):n.texImage3D(t.TEXTURE_3D,0,Se,ce.width,ce.height,ce.depth,0,We,Ae,ce.data);else if(E.isFramebufferTexture){if(ct)if(ke)n.texStorage2D(t.TEXTURE_2D,me,Se,ce.width,ce.height);else{let X=ce.width,fe=ce.height;for(let xe=0;xe<me;xe++)n.texImage2D(t.TEXTURE_2D,xe,Se,X,fe,0,We,Ae,null),X>>=1,fe>>=1}}else if($e.length>0&&xt){if(ke&&ct){const X=Qe($e[0]);n.texStorage2D(t.TEXTURE_2D,me,Se,X.width,X.height)}for(let X=0,fe=$e.length;X<fe;X++)Ee=$e[X],ke?k&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,We,Ae,Ee):n.texImage2D(t.TEXTURE_2D,X,Se,We,Ae,Ee);E.generateMipmaps=!1}else if(ke){if(ct){const X=Qe(ce);n.texStorage2D(t.TEXTURE_2D,me,Se,X.width,X.height)}k&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,We,Ae,ce)}else n.texImage2D(t.TEXTURE_2D,0,Se,We,Ae,ce);m(E,xt)&&M(J),Ue.__version=ie.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function ne(L,E,Q){if(E.image.length!==6)return;const J=W(L,E),oe=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,L.__webglTexture,t.TEXTURE0+Q);const ie=i.get(oe);if(oe.version!==ie.__version||J===!0){n.activeTexture(t.TEXTURE0+Q);const Ue=tt.getPrimaries(tt.workingColorSpace),Re=E.colorSpace===Li?null:tt.getPrimaries(E.colorSpace),de=E.colorSpace===Li||Ue===Re?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const pe=E.isCompressedTexture||E.image[0].isCompressedTexture,Ie=E.image[0]&&E.image[0].isDataTexture,ce=[];for(let X=0;X<6;X++)!pe&&!Ie?ce[X]=p(E.image[X],!1,!0,r.maxCubemapSize):ce[X]=Ie?E.image[X].image:E.image[X],ce[X]=Ne(E,ce[X]);const xt=ce[0],We=u(xt)||o,Ae=s.convert(E.format,E.colorSpace),Se=s.convert(E.type),Ee=R(E.internalFormat,Ae,Se,E.colorSpace),$e=o&&E.isVideoTexture!==!0,ke=ie.__version===void 0||J===!0,ct=oe.dataReady;let k=T(E,xt,We);U(t.TEXTURE_CUBE_MAP,E,We);let me;if(pe){$e&&ke&&n.texStorage2D(t.TEXTURE_CUBE_MAP,k,Ee,xt.width,xt.height);for(let X=0;X<6;X++){me=ce[X].mipmaps;for(let fe=0;fe<me.length;fe++){const xe=me[fe];E.format!==zn?Ae!==null?$e?ct&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe,0,0,xe.width,xe.height,Ae,xe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe,Ee,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?ct&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe,0,0,xe.width,xe.height,Ae,Se,xe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe,Ee,xe.width,xe.height,0,Ae,Se,xe.data)}}}else{if(me=E.mipmaps,$e&&ke){me.length>0&&k++;const X=Qe(ce[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,k,Ee,X.width,X.height)}for(let X=0;X<6;X++)if(Ie){$e?ct&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ce[X].width,ce[X].height,Ae,Se,ce[X].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ee,ce[X].width,ce[X].height,0,Ae,Se,ce[X].data);for(let fe=0;fe<me.length;fe++){const qe=me[fe].image[X].image;$e?ct&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe+1,0,0,qe.width,qe.height,Ae,Se,qe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe+1,Ee,qe.width,qe.height,0,Ae,Se,qe.data)}}else{$e?ct&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Ae,Se,ce[X]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ee,Ae,Se,ce[X]);for(let fe=0;fe<me.length;fe++){const xe=me[fe];$e?ct&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe+1,0,0,Ae,Se,xe.image[X]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+X,fe+1,Ee,Ae,Se,xe.image[X])}}}m(E,We)&&M(t.TEXTURE_CUBE_MAP),ie.__version=oe.version,E.onUpdate&&E.onUpdate(E)}L.__version=E.version}function ae(L,E,Q,J,oe,ie){const Ue=s.convert(Q.format,Q.colorSpace),Re=s.convert(Q.type),de=R(Q.internalFormat,Ue,Re,Q.colorSpace);if(!i.get(E).__hasExternalTextures){const Ie=Math.max(1,E.width>>ie),ce=Math.max(1,E.height>>ie);oe===t.TEXTURE_3D||oe===t.TEXTURE_2D_ARRAY?n.texImage3D(oe,ie,de,Ie,ce,E.depth,0,Ue,Re,null):n.texImage2D(oe,ie,de,Ie,ce,0,Ue,Re,null)}n.bindFramebuffer(t.FRAMEBUFFER,L),Le(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,J,oe,i.get(Q).__webglTexture,0,ye(E)):(oe===t.TEXTURE_2D||oe>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,J,oe,i.get(Q).__webglTexture,ie),n.bindFramebuffer(t.FRAMEBUFFER,null)}function le(L,E,Q){if(t.bindRenderbuffer(t.RENDERBUFFER,L),E.depthBuffer&&!E.stencilBuffer){let J=o===!0?t.DEPTH_COMPONENT24:t.DEPTH_COMPONENT16;if(Q||Le(E)){const oe=E.depthTexture;oe&&oe.isDepthTexture&&(oe.type===li?J=t.DEPTH_COMPONENT32F:oe.type===Ii&&(J=t.DEPTH_COMPONENT24));const ie=ye(E);Le(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ie,J,E.width,E.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,ie,J,E.width,E.height)}else t.renderbufferStorage(t.RENDERBUFFER,J,E.width,E.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,L)}else if(E.depthBuffer&&E.stencilBuffer){const J=ye(E);Q&&Le(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,J,t.DEPTH24_STENCIL8,E.width,E.height):Le(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,J,t.DEPTH24_STENCIL8,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,L)}else{const J=E.textures;for(let oe=0;oe<J.length;oe++){const ie=J[oe],Ue=s.convert(ie.format,ie.colorSpace),Re=s.convert(ie.type),de=R(ie.internalFormat,Ue,Re,ie.colorSpace),pe=ye(E);Q&&Le(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,pe,de,E.width,E.height):Le(E)?l.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,pe,de,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,de,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Me(L,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,L),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),te(E.depthTexture,0);const J=i.get(E.depthTexture).__webglTexture,oe=ye(E);if(E.depthTexture.format===Sr)Le(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,J,0,oe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,J,0);else if(E.depthTexture.format===Cs)Le(E)?l.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,J,0,oe):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function ge(L){const E=i.get(L),Q=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!E.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");Me(E.__webglFramebuffer,L)}else if(Q){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]=t.createRenderbuffer(),le(E.__webglDepthbuffer[J],L,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer=t.createRenderbuffer(),le(E.__webglDepthbuffer,L,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function F(L,E,Q){const J=i.get(L);E!==void 0&&ae(J.__webglFramebuffer,L,L.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),Q!==void 0&&ge(L)}function je(L){const E=L.texture,Q=i.get(L),J=i.get(E);L.addEventListener("dispose",O);const oe=L.textures,ie=L.isWebGLCubeRenderTarget===!0,Ue=oe.length>1,Re=u(L)||o;if(Ue||(J.__webglTexture===void 0&&(J.__webglTexture=t.createTexture()),J.__version=E.version,a.memory.textures++),ie){Q.__webglFramebuffer=[];for(let de=0;de<6;de++)if(o&&E.mipmaps&&E.mipmaps.length>0){Q.__webglFramebuffer[de]=[];for(let pe=0;pe<E.mipmaps.length;pe++)Q.__webglFramebuffer[de][pe]=t.createFramebuffer()}else Q.__webglFramebuffer[de]=t.createFramebuffer()}else{if(o&&E.mipmaps&&E.mipmaps.length>0){Q.__webglFramebuffer=[];for(let de=0;de<E.mipmaps.length;de++)Q.__webglFramebuffer[de]=t.createFramebuffer()}else Q.__webglFramebuffer=t.createFramebuffer();if(Ue)if(r.drawBuffers)for(let de=0,pe=oe.length;de<pe;de++){const Ie=i.get(oe[de]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=t.createTexture(),a.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&L.samples>0&&Le(L)===!1){Q.__webglMultisampledFramebuffer=t.createFramebuffer(),Q.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let de=0;de<oe.length;de++){const pe=oe[de];Q.__webglColorRenderbuffer[de]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,Q.__webglColorRenderbuffer[de]);const Ie=s.convert(pe.format,pe.colorSpace),ce=s.convert(pe.type),xt=R(pe.internalFormat,Ie,ce,pe.colorSpace,L.isXRRenderTarget===!0),We=ye(L);t.renderbufferStorageMultisample(t.RENDERBUFFER,We,xt,L.width,L.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.RENDERBUFFER,Q.__webglColorRenderbuffer[de])}t.bindRenderbuffer(t.RENDERBUFFER,null),L.depthBuffer&&(Q.__webglDepthRenderbuffer=t.createRenderbuffer(),le(Q.__webglDepthRenderbuffer,L,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ie){n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture),U(t.TEXTURE_CUBE_MAP,E,Re);for(let de=0;de<6;de++)if(o&&E.mipmaps&&E.mipmaps.length>0)for(let pe=0;pe<E.mipmaps.length;pe++)ae(Q.__webglFramebuffer[de][pe],L,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+de,pe);else ae(Q.__webglFramebuffer[de],L,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(E,Re)&&M(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ue){for(let de=0,pe=oe.length;de<pe;de++){const Ie=oe[de],ce=i.get(Ie);n.bindTexture(t.TEXTURE_2D,ce.__webglTexture),U(t.TEXTURE_2D,Ie,Re),ae(Q.__webglFramebuffer,L,Ie,t.COLOR_ATTACHMENT0+de,t.TEXTURE_2D,0),m(Ie,Re)&&M(t.TEXTURE_2D)}n.unbindTexture()}else{let de=t.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(o?de=L.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(de,J.__webglTexture),U(de,E,Re),o&&E.mipmaps&&E.mipmaps.length>0)for(let pe=0;pe<E.mipmaps.length;pe++)ae(Q.__webglFramebuffer[pe],L,E,t.COLOR_ATTACHMENT0,de,pe);else ae(Q.__webglFramebuffer,L,E,t.COLOR_ATTACHMENT0,de,0);m(E,Re)&&M(de),n.unbindTexture()}L.depthBuffer&&ge(L)}function ue(L){const E=u(L)||o,Q=L.textures;for(let J=0,oe=Q.length;J<oe;J++){const ie=Q[J];if(m(ie,E)){const Ue=L.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Re=i.get(ie).__webglTexture;n.bindTexture(Ue,Re),M(Ue),n.unbindTexture()}}}function Te(L){if(o&&L.samples>0&&Le(L)===!1){const E=L.textures,Q=L.width,J=L.height;let oe=t.COLOR_BUFFER_BIT;const ie=[],Ue=L.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Re=i.get(L),de=E.length>1;if(de)for(let pe=0;pe<E.length;pe++)n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let pe=0;pe<E.length;pe++){ie.push(t.COLOR_ATTACHMENT0+pe),L.depthBuffer&&ie.push(Ue);const Ie=Re.__ignoreDepthValues!==void 0?Re.__ignoreDepthValues:!1;if(Ie===!1&&(L.depthBuffer&&(oe|=t.DEPTH_BUFFER_BIT),L.stencilBuffer&&(oe|=t.STENCIL_BUFFER_BIT)),de&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Re.__webglColorRenderbuffer[pe]),Ie===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[Ue]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[Ue])),de){const ce=i.get(E[pe]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ce,0)}t.blitFramebuffer(0,0,Q,J,0,0,Q,J,oe,t.NEAREST),c&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ie)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),de)for(let pe=0;pe<E.length;pe++){n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,Re.__webglColorRenderbuffer[pe]);const Ie=i.get(E[pe]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Re.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.TEXTURE_2D,Ie,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}}function ye(L){return Math.min(r.maxSamples,L.samples)}function Le(L){const E=i.get(L);return o&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ce(L){const E=a.render.frame;f.get(L)!==E&&(f.set(L,E),L.update())}function Ne(L,E){const Q=L.colorSpace,J=L.format,oe=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===td||Q!==Ji&&Q!==Li&&(tt.getTransfer(Q)===ot?o===!1?e.has("EXT_sRGB")===!0&&J===zn?(L.format=td,L.minFilter=en,L.generateMipmaps=!1):E=Ig.sRGBToLinear(E):(J!==zn||oe!==Wi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),E}function Qe(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(d.width=L.naturalWidth||L.width,d.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(d.width=L.displayWidth,d.height=L.displayHeight):(d.width=L.width,d.height=L.height),d}this.allocateTextureUnit=K,this.resetTextureUnits=D,this.setTexture2D=te,this.setTexture2DArray=I,this.setTexture3D=H,this.setTextureCube=P,this.rebindTextures=F,this.setupRenderTarget=je,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Le}function Hw(t,e,n){const i=n.isWebGL2;function r(s,a=Li){let o;const l=tt.getTransfer(a);if(s===Wi)return t.UNSIGNED_BYTE;if(s===Tg)return t.UNSIGNED_SHORT_4_4_4_4;if(s===bg)return t.UNSIGNED_SHORT_5_5_5_1;if(s===yy)return t.BYTE;if(s===Sy)return t.SHORT;if(s===nf)return t.UNSIGNED_SHORT;if(s===wg)return t.INT;if(s===Ii)return t.UNSIGNED_INT;if(s===li)return t.FLOAT;if(s===Ca)return i?t.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===My)return t.ALPHA;if(s===zn)return t.RGBA;if(s===Ey)return t.LUMINANCE;if(s===wy)return t.LUMINANCE_ALPHA;if(s===Sr)return t.DEPTH_COMPONENT;if(s===Cs)return t.DEPTH_STENCIL;if(s===td)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Ty)return t.RED;if(s===Ag)return t.RED_INTEGER;if(s===by)return t.RG;if(s===Cg)return t.RG_INTEGER;if(s===Rg)return t.RGBA_INTEGER;if(s===yc||s===Sc||s===Mc||s===Ec)if(l===ot)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===yc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Sc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Mc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ec)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===yc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Sc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Mc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ec)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Oh||s===zh||s===Bh||s===Hh)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Oh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===zh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Bh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Hh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Pg)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Gh||s===Vh)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Gh)return l===ot?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Vh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===jh||s===Wh||s===Xh||s===qh||s===Yh||s===$h||s===Kh||s===Zh||s===Qh||s===Jh||s===ep||s===tp||s===np||s===ip)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===jh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Wh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Xh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===qh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Yh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===$h)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Kh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Zh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Qh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Jh)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ep)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===tp)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===np)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ip)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===wc||s===rp||s===sp)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===wc)return l===ot?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===rp)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===sp)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Ay||s===ap||s===op||s===lp)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===wc)return o.COMPRESSED_RED_RGTC1_EXT;if(s===ap)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===op)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===lp)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===yr?i?t.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class Gw extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class us extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vw={type:"move"};class Zc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const S of e.hand.values()){const p=n.getJointPose(S,i),u=this._getHandJoint(c,S);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=d.position.distanceTo(f.position),x=.02,_=.005;c.inputState.pinching&&h>x+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=x-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vw)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new us;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const jw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ww=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new un,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}render(e,n){if(this.texture!==null){if(this.mesh===null){const i=n.cameras[0].viewport,r=new $i({extensions:{fragDepth:!0},vertexShader:jw,fragmentShader:Ww,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Je(new hi(20,20),r)}e.render(this.mesh,n)}}reset(){this.texture=null,this.mesh=null}}class qw extends Is{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,f=null,h=null,x=null,_=null;const S=new Xw,p=n.getContextAttributes();let u=null,v=null;const m=[],M=[],R=new Ge;let T=null;const w=new rn;w.layers.enable(1),w.viewport=new Lt;const N=new rn;N.layers.enable(2),N.viewport=new Lt;const O=[w,N],y=new Gw;y.layers.enable(1),y.layers.enable(2);let A=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let W=m[U];return W===void 0&&(W=new Zc,m[U]=W),W.getTargetRaySpace()},this.getControllerGrip=function(U){let W=m[U];return W===void 0&&(W=new Zc,m[U]=W),W.getGripSpace()},this.getHand=function(U){let W=m[U];return W===void 0&&(W=new Zc,m[U]=W),W.getHandSpace()};function Z(U){const W=M.indexOf(U.inputSource);if(W===-1)return;const ee=m[W];ee!==void 0&&(ee.update(U.inputSource,U.frame,c||a),ee.dispatchEvent({type:U.type,data:U.inputSource}))}function D(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",D),r.removeEventListener("inputsourceschange",K);for(let U=0;U<m.length;U++){const W=M[U];W!==null&&(M[U]=null,m[U].disconnect(W))}A=null,V=null,S.reset(),e.setRenderTarget(u),x=null,h=null,f=null,r=null,v=null,re.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){s=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){o=U,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(U){c=U},this.getBaseLayer=function(){return h!==null?h:x},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(U){if(r=U,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",D),r.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const W={antialias:r.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};x=new XRWebGLLayer(r,n,W),r.updateRenderState({baseLayer:x}),e.setPixelRatio(1),e.setSize(x.framebufferWidth,x.framebufferHeight,!1),v=new Ar(x.framebufferWidth,x.framebufferHeight,{format:zn,type:Wi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let W=null,ee=null,ne=null;p.depth&&(ne=p.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,W=p.stencil?Cs:Sr,ee=p.stencil?yr:Ii);const ae={colorFormat:n.RGBA8,depthFormat:ne,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(ae),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Ar(h.textureWidth,h.textureHeight,{format:zn,type:Wi,depthTexture:new Xg(h.textureWidth,h.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const le=e.properties.get(v);le.__ignoreDepthValues=h.ignoreDepthValues}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),re.setContext(r),re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function K(U){for(let W=0;W<U.removed.length;W++){const ee=U.removed[W],ne=M.indexOf(ee);ne>=0&&(M[ne]=null,m[ne].disconnect(ee))}for(let W=0;W<U.added.length;W++){const ee=U.added[W];let ne=M.indexOf(ee);if(ne===-1){for(let le=0;le<m.length;le++)if(le>=M.length){M.push(ee),ne=le;break}else if(M[le]===null){M[le]=ee,ne=le;break}if(ne===-1)break}const ae=m[ne];ae&&ae.connect(ee)}}const G=new z,te=new z;function I(U,W,ee){G.setFromMatrixPosition(W.matrixWorld),te.setFromMatrixPosition(ee.matrixWorld);const ne=G.distanceTo(te),ae=W.projectionMatrix.elements,le=ee.projectionMatrix.elements,Me=ae[14]/(ae[10]-1),ge=ae[14]/(ae[10]+1),F=(ae[9]+1)/ae[5],je=(ae[9]-1)/ae[5],ue=(ae[8]-1)/ae[0],Te=(le[8]+1)/le[0],ye=Me*ue,Le=Me*Te,Ce=ne/(-ue+Te),Ne=Ce*-ue;W.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(Ne),U.translateZ(Ce),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert();const Qe=Me+Ce,L=ge+Ce,E=ye-Ne,Q=Le+(ne-Ne),J=F*ge/L*Qe,oe=je*ge/L*Qe;U.projectionMatrix.makePerspective(E,Q,J,oe,Qe,L),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}function H(U,W){W===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(W.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(r===null)return;S.texture!==null&&(U.near=S.depthNear,U.far=S.depthFar),y.near=N.near=w.near=U.near,y.far=N.far=w.far=U.far,(A!==y.near||V!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),A=y.near,V=y.far,w.near=A,w.far=V,N.near=A,N.far=V,w.updateProjectionMatrix(),N.updateProjectionMatrix(),U.updateProjectionMatrix());const W=U.parent,ee=y.cameras;H(y,W);for(let ne=0;ne<ee.length;ne++)H(ee[ne],W);ee.length===2?I(y,w,N):y.projectionMatrix.copy(w.projectionMatrix),P(U,y,W)};function P(U,W,ee){ee===null?U.matrix.copy(W.matrixWorld):(U.matrix.copy(ee.matrixWorld),U.matrix.invert(),U.matrix.multiply(W.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(W.projectionMatrix),U.projectionMatrixInverse.copy(W.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=xl*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&x===null))return l},this.setFoveation=function(U){l=U,h!==null&&(h.fixedFoveation=U),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=U)},this.hasDepthSensing=function(){return S.texture!==null};let C=null;function Y(U,W){if(d=W.getViewerPose(c||a),_=W,d!==null){const ee=d.views;x!==null&&(e.setRenderTargetFramebuffer(v,x.framebuffer),e.setRenderTarget(v));let ne=!1;ee.length!==y.cameras.length&&(y.cameras.length=0,ne=!0);for(let le=0;le<ee.length;le++){const Me=ee[le];let ge=null;if(x!==null)ge=x.getViewport(Me);else{const je=f.getViewSubImage(h,Me);ge=je.viewport,le===0&&(e.setRenderTargetTextures(v,je.colorTexture,h.ignoreDepthValues?void 0:je.depthStencilTexture),e.setRenderTarget(v))}let F=O[le];F===void 0&&(F=new rn,F.layers.enable(le),F.viewport=new Lt,O[le]=F),F.matrix.fromArray(Me.transform.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale),F.projectionMatrix.fromArray(Me.projectionMatrix),F.projectionMatrixInverse.copy(F.projectionMatrix).invert(),F.viewport.set(ge.x,ge.y,ge.width,ge.height),le===0&&(y.matrix.copy(F.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ne===!0&&y.cameras.push(F)}const ae=r.enabledFeatures;if(ae&&ae.includes("depth-sensing")){const le=f.getDepthInformation(ee[0]);le&&le.isValid&&le.texture&&S.init(e,le,r.renderState)}}for(let ee=0;ee<m.length;ee++){const ne=M[ee],ae=m[ee];ne!==null&&ae!==void 0&&ae.update(ne,W,c||a)}S.render(e,y),C&&C(U,W),W.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:W}),_=null}const re=new jg;re.setAnimationLoop(Y),this.setAnimationLoop=function(U){C=U},this.dispose=function(){}}}const or=new Qn,Yw=new mt;function $w(t,e){function n(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function i(p,u){u.color.getRGB(p.fogColor.value,Hg(t)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,v,m,M){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),f(p,u)):u.isMeshPhongMaterial?(s(p,u),d(p,u)):u.isMeshStandardMaterial?(s(p,u),h(p,u),u.isMeshPhysicalMaterial&&x(p,u,M)):u.isMeshMatcapMaterial?(s(p,u),_(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),S(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?l(p,u,v,m):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,n(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,n(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===cn&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,n(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===cn&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,n(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,n(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const v=e.get(u),m=v.envMap,M=v.envMapRotation;if(m&&(p.envMap.value=m,or.copy(M),or.x*=-1,or.y*=-1,or.z*=-1,m.isCubeTexture&&m.isRenderTargetTexture===!1&&(or.y*=-1,or.z*=-1),p.envMapRotation.value.setFromMatrix4(Yw.makeRotationFromEuler(or)),p.flipEnvMap.value=m.isCubeTexture&&m.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const R=t._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*R,n(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,n(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,v,m){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*v,p.scale.value=m*.5,u.map&&(p.map.value=u.map,n(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,n(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function d(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function f(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function h(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function x(p,u,v){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===cn&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,u){u.matcap&&(p.matcap.value=u.matcap)}function S(p,u){const v=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Kw(t,e,n,i){let r={},s={},a=[];const o=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,m){const M=m.program;i.uniformBlockBinding(v,M)}function c(v,m){let M=r[v.id];M===void 0&&(_(v),M=d(v),r[v.id]=M,v.addEventListener("dispose",p));const R=m.program;i.updateUBOMapping(v,R);const T=e.render.frame;s[v.id]!==T&&(h(v),s[v.id]=T)}function d(v){const m=f();v.__bindingPointIndex=m;const M=t.createBuffer(),R=v.__size,T=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,R,T),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,m,M),M}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const m=r[v.id],M=v.uniforms,R=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,m);for(let T=0,w=M.length;T<w;T++){const N=Array.isArray(M[T])?M[T]:[M[T]];for(let O=0,y=N.length;O<y;O++){const A=N[O];if(x(A,T,O,R)===!0){const V=A.__offset,Z=Array.isArray(A.value)?A.value:[A.value];let D=0;for(let K=0;K<Z.length;K++){const G=Z[K],te=S(G);typeof G=="number"||typeof G=="boolean"?(A.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,V+D,A.__data)):G.isMatrix3?(A.__data[0]=G.elements[0],A.__data[1]=G.elements[1],A.__data[2]=G.elements[2],A.__data[3]=0,A.__data[4]=G.elements[3],A.__data[5]=G.elements[4],A.__data[6]=G.elements[5],A.__data[7]=0,A.__data[8]=G.elements[6],A.__data[9]=G.elements[7],A.__data[10]=G.elements[8],A.__data[11]=0):(G.toArray(A.__data,D),D+=te.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,V,A.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function x(v,m,M,R){const T=v.value,w=m+"_"+M;if(R[w]===void 0)return typeof T=="number"||typeof T=="boolean"?R[w]=T:R[w]=T.clone(),!0;{const N=R[w];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return R[w]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function _(v){const m=v.uniforms;let M=0;const R=16;for(let w=0,N=m.length;w<N;w++){const O=Array.isArray(m[w])?m[w]:[m[w]];for(let y=0,A=O.length;y<A;y++){const V=O[y],Z=Array.isArray(V.value)?V.value:[V.value];for(let D=0,K=Z.length;D<K;D++){const G=Z[D],te=S(G),I=M%R;I!==0&&R-I<te.boundary&&(M+=R-I),V.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=M,M+=te.storage}}}const T=M%R;return T>0&&(M+=R-T),v.__size=M,v.__cache={},this}function S(v){const m={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(m.boundary=4,m.storage=4):v.isVector2?(m.boundary=8,m.storage=8):v.isVector3||v.isColor?(m.boundary=16,m.storage=12):v.isVector4?(m.boundary=16,m.storage=16):v.isMatrix3?(m.boundary=48,m.storage=48):v.isMatrix4?(m.boundary=64,m.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),m}function p(v){const m=v.target;m.removeEventListener("dispose",p);const M=a.indexOf(m.__bindingPointIndex);a.splice(M,1),t.deleteBuffer(r[m.id]),delete r[m.id],delete s[m.id]}function u(){for(const v in r)t.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}class lf{constructor(e={}){const{canvas:n=zy(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=a;const x=new Uint32Array(4),_=new Int32Array(4);let S=null,p=null;const u=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xn,this._useLegacyLights=!1,this.toneMapping=ji,this.toneMappingExposure=1;const m=this;let M=!1,R=0,T=0,w=null,N=-1,O=null;const y=new Lt,A=new Lt;let V=null;const Z=new Ye(0);let D=0,K=n.width,G=n.height,te=1,I=null,H=null;const P=new Lt(0,0,K,G),C=new Lt(0,0,K,G);let Y=!1;const re=new af;let U=!1,W=!1,ee=null;const ne=new mt,ae=new Ge,le=new z,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ge(){return w===null?te:1}let F=i;function je(b,B){for(let q=0;q<b.length;q++){const $=b[q],j=n.getContext($,B);if(j!==null)return j}return null}try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${tf}`),n.addEventListener("webglcontextlost",ct,!1),n.addEventListener("webglcontextrestored",k,!1),n.addEventListener("webglcontextcreationerror",me,!1),F===null){const B=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&B.shift(),F=je(B,b),F===null)throw je(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ue,Te,ye,Le,Ce,Ne,Qe,L,E,Q,J,oe,ie,Ue,Re,de,pe,Ie,ce,xt,We,Ae,Se,Ee;function $e(){ue=new nE(F),Te=new K1(F,ue,e),ue.init(Te),Ae=new Hw(F,ue,Te),ye=new zw(F,ue,Te),Le=new sE(F),Ce=new Tw,Ne=new Bw(F,ue,ye,Ce,Te,Ae,Le),Qe=new Q1(m),L=new tE(m),E=new dS(F,Te),Se=new Y1(F,ue,E,Te),Q=new iE(F,E,Le,Se),J=new cE(F,Q,E,Le),ce=new lE(F,Te,Ne),de=new Z1(Ce),oe=new ww(m,Qe,L,ue,Te,Se,de),ie=new $w(m,Ce),Ue=new Aw,Re=new Dw(ue,Te),Ie=new q1(m,Qe,L,ye,J,h,l),pe=new Ow(m,J,Te),Ee=new Kw(F,Le,Te,ye),xt=new $1(F,ue,Le,Te),We=new rE(F,ue,Le,Te),Le.programs=oe.programs,m.capabilities=Te,m.extensions=ue,m.properties=Ce,m.renderLists=Ue,m.shadowMap=pe,m.state=ye,m.info=Le}$e();const ke=new qw(m,F);this.xr=ke,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=ue.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ue.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(b){b!==void 0&&(te=b,this.setSize(K,G,!1))},this.getSize=function(b){return b.set(K,G)},this.setSize=function(b,B,q=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=b,G=B,n.width=Math.floor(b*te),n.height=Math.floor(B*te),q===!0&&(n.style.width=b+"px",n.style.height=B+"px"),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(K*te,G*te).floor()},this.setDrawingBufferSize=function(b,B,q){K=b,G=B,te=q,n.width=Math.floor(b*q),n.height=Math.floor(B*q),this.setViewport(0,0,b,B)},this.getCurrentViewport=function(b){return b.copy(y)},this.getViewport=function(b){return b.copy(P)},this.setViewport=function(b,B,q,$){b.isVector4?P.set(b.x,b.y,b.z,b.w):P.set(b,B,q,$),ye.viewport(y.copy(P).multiplyScalar(te).round())},this.getScissor=function(b){return b.copy(C)},this.setScissor=function(b,B,q,$){b.isVector4?C.set(b.x,b.y,b.z,b.w):C.set(b,B,q,$),ye.scissor(A.copy(C).multiplyScalar(te).round())},this.getScissorTest=function(){return Y},this.setScissorTest=function(b){ye.setScissorTest(Y=b)},this.setOpaqueSort=function(b){I=b},this.setTransparentSort=function(b){H=b},this.getClearColor=function(b){return b.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor.apply(Ie,arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha.apply(Ie,arguments)},this.clear=function(b=!0,B=!0,q=!0){let $=0;if(b){let j=!1;if(w!==null){const ve=w.texture.format;j=ve===Rg||ve===Cg||ve===Ag}if(j){const ve=w.texture.type,we=ve===Wi||ve===Ii||ve===nf||ve===yr||ve===Tg||ve===bg,Pe=Ie.getClearColor(),De=Ie.getClearAlpha(),Ve=Pe.r,Fe=Pe.g,Oe=Pe.b;we?(x[0]=Ve,x[1]=Fe,x[2]=Oe,x[3]=De,F.clearBufferuiv(F.COLOR,0,x)):(_[0]=Ve,_[1]=Fe,_[2]=Oe,_[3]=De,F.clearBufferiv(F.COLOR,0,_))}else $|=F.COLOR_BUFFER_BIT}B&&($|=F.DEPTH_BUFFER_BIT),q&&($|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ct,!1),n.removeEventListener("webglcontextrestored",k,!1),n.removeEventListener("webglcontextcreationerror",me,!1),Ue.dispose(),Re.dispose(),Ce.dispose(),Qe.dispose(),L.dispose(),J.dispose(),Se.dispose(),Ee.dispose(),oe.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",Sn),ke.removeEventListener("sessionend",it),ee&&(ee.dispose(),ee=null),Xt.stop()};function ct(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const b=Le.autoReset,B=pe.enabled,q=pe.autoUpdate,$=pe.needsUpdate,j=pe.type;$e(),Le.autoReset=b,pe.enabled=B,pe.autoUpdate=q,pe.needsUpdate=$,pe.type=j}function me(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function X(b){const B=b.target;B.removeEventListener("dispose",X),fe(B)}function fe(b){xe(b),Ce.remove(b)}function xe(b){const B=Ce.get(b).programs;B!==void 0&&(B.forEach(function(q){oe.releaseProgram(q)}),b.isShaderMaterial&&oe.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,q,$,j,ve){B===null&&(B=Me);const we=j.isMesh&&j.matrixWorld.determinant()<0,Pe=ox(b,B,q,$,j);ye.setMaterial($,we);let De=q.index,Ve=1;if($.wireframe===!0){if(De=Q.getWireframeAttribute(q),De===void 0)return;Ve=2}const Fe=q.drawRange,Oe=q.attributes.position;let _t=Fe.start*Ve,dn=(Fe.start+Fe.count)*Ve;ve!==null&&(_t=Math.max(_t,ve.start*Ve),dn=Math.min(dn,(ve.start+ve.count)*Ve)),De!==null?(_t=Math.max(_t,0),dn=Math.min(dn,De.count)):Oe!=null&&(_t=Math.max(_t,0),dn=Math.min(dn,Oe.count));const Ct=dn-_t;if(Ct<0||Ct===1/0)return;Se.setup(j,$,Pe,q,De);let Jn,ft=xt;if(De!==null&&(Jn=E.get(De),ft=We,ft.setIndex(Jn)),j.isMesh)$.wireframe===!0?(ye.setLineWidth($.wireframeLinewidth*ge()),ft.setMode(F.LINES)):ft.setMode(F.TRIANGLES);else if(j.isLine){let ze=$.linewidth;ze===void 0&&(ze=1),ye.setLineWidth(ze*ge()),j.isLineSegments?ft.setMode(F.LINES):j.isLineLoop?ft.setMode(F.LINE_LOOP):ft.setMode(F.LINE_STRIP)}else j.isPoints?ft.setMode(F.POINTS):j.isSprite&&ft.setMode(F.TRIANGLES);if(j.isBatchedMesh)ft.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)ft.renderInstances(_t,Ct,j.count);else if(q.isInstancedBufferGeometry){const ze=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Vl=Math.min(q.instanceCount,ze);ft.renderInstances(_t,Ct,Vl)}else ft.render(_t,Ct)};function qe(b,B,q){b.transparent===!0&&b.side===mn&&b.forceSinglePass===!1?(b.side=cn,b.needsUpdate=!0,za(b,B,q),b.side=Yi,b.needsUpdate=!0,za(b,B,q),b.side=mn):za(b,B,q)}this.compile=function(b,B,q=null){q===null&&(q=b),p=Re.get(q),p.init(),v.push(p),q.traverseVisible(function(j){j.isLight&&j.layers.test(B.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),b!==q&&b.traverseVisible(function(j){j.isLight&&j.layers.test(B.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),p.setupLights(m._useLegacyLights);const $=new Set;return b.traverse(function(j){const ve=j.material;if(ve)if(Array.isArray(ve))for(let we=0;we<ve.length;we++){const Pe=ve[we];qe(Pe,q,j),$.add(Pe)}else qe(ve,q,j),$.add(ve)}),v.pop(),p=null,$},this.compileAsync=function(b,B,q=null){const $=this.compile(b,B,q);return new Promise(j=>{function ve(){if($.forEach(function(we){Ce.get(we).currentProgram.isReady()&&$.delete(we)}),$.size===0){j(b);return}setTimeout(ve,10)}ue.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let nt=null;function Dt(b){nt&&nt(b)}function Sn(){Xt.stop()}function it(){Xt.start()}const Xt=new jg;Xt.setAnimationLoop(Dt),typeof self<"u"&&Xt.setContext(self),this.setAnimationLoop=function(b){nt=b,ke.setAnimationLoop(b),b===null?Xt.stop():Xt.start()},ke.addEventListener("sessionstart",Sn),ke.addEventListener("sessionend",it),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(B),B=ke.getCamera()),b.isScene===!0&&b.onBeforeRender(m,b,B,w),p=Re.get(b,v.length),p.init(),v.push(p),ne.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),re.setFromProjectionMatrix(ne),W=this.localClippingEnabled,U=de.init(this.clippingPlanes,W),S=Ue.get(b,u.length),S.init(),u.push(S),Vn(b,B,0,m.sortObjects),S.finish(),m.sortObjects===!0&&S.sort(I,H),this.info.render.frame++,U===!0&&de.beginShadows();const q=p.state.shadowsArray;if(pe.render(q,b,B),U===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ke.enabled===!1||ke.isPresenting===!1||ke.hasDepthSensing()===!1)&&Ie.render(S,b),p.setupLights(m._useLegacyLights),B.isArrayCamera){const $=B.cameras;for(let j=0,ve=$.length;j<ve;j++){const we=$[j];xf(S,b,we,we.viewport)}}else xf(S,b,B);w!==null&&(Ne.updateMultisampleRenderTarget(w),Ne.updateRenderTargetMipmap(w)),b.isScene===!0&&b.onAfterRender(m,b,B),Se.resetDefaultState(),N=-1,O=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,u.pop(),u.length>0?S=u[u.length-1]:S=null};function Vn(b,B,q,$){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||re.intersectsSprite(b)){$&&le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ne);const we=J.update(b),Pe=b.material;Pe.visible&&S.push(b,we,Pe,q,le.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||re.intersectsObject(b))){const we=J.update(b),Pe=b.material;if($&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),le.copy(b.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),le.copy(we.boundingSphere.center)),le.applyMatrix4(b.matrixWorld).applyMatrix4(ne)),Array.isArray(Pe)){const De=we.groups;for(let Ve=0,Fe=De.length;Ve<Fe;Ve++){const Oe=De[Ve],_t=Pe[Oe.materialIndex];_t&&_t.visible&&S.push(b,we,_t,q,le.z,Oe)}}else Pe.visible&&S.push(b,we,Pe,q,le.z,null)}}const ve=b.children;for(let we=0,Pe=ve.length;we<Pe;we++)Vn(ve[we],B,q,$)}function xf(b,B,q,$){const j=b.opaque,ve=b.transmissive,we=b.transparent;p.setupLightsView(q),U===!0&&de.setGlobalState(m.clippingPlanes,q),ve.length>0&&ax(j,ve,B,q),$&&ye.viewport(y.copy($)),j.length>0&&Oa(j,B,q),ve.length>0&&Oa(ve,B,q),we.length>0&&Oa(we,B,q),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function ax(b,B,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;const ve=Te.isWebGL2;ee===null&&(ee=new Ar(1,1,{generateMipmaps:!0,type:ue.has("EXT_color_buffer_half_float")?Ca:Wi,minFilter:xr,samples:ve?4:0})),m.getDrawingBufferSize(ae),ve?ee.setSize(ae.x,ae.y):ee.setSize(nd(ae.x),nd(ae.y));const we=m.getRenderTarget();m.setRenderTarget(ee),m.getClearColor(Z),D=m.getClearAlpha(),D<1&&m.setClearColor(16777215,.5),m.clear();const Pe=m.toneMapping;m.toneMapping=ji,Oa(b,q,$),Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee);let De=!1;for(let Ve=0,Fe=B.length;Ve<Fe;Ve++){const Oe=B[Ve],_t=Oe.object,dn=Oe.geometry,Ct=Oe.material,Jn=Oe.group;if(Ct.side===mn&&_t.layers.test($.layers)){const ft=Ct.side;Ct.side=cn,Ct.needsUpdate=!0,vf(_t,q,$,dn,Ct,Jn),Ct.side=ft,Ct.needsUpdate=!0,De=!0}}De===!0&&(Ne.updateMultisampleRenderTarget(ee),Ne.updateRenderTargetMipmap(ee)),m.setRenderTarget(we),m.setClearColor(Z,D),m.toneMapping=Pe}function Oa(b,B,q){const $=B.isScene===!0?B.overrideMaterial:null;for(let j=0,ve=b.length;j<ve;j++){const we=b[j],Pe=we.object,De=we.geometry,Ve=$===null?we.material:$,Fe=we.group;Pe.layers.test(q.layers)&&vf(Pe,B,q,De,Ve,Fe)}}function vf(b,B,q,$,j,ve){b.onBeforeRender(m,B,q,$,j,ve),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),j.onBeforeRender(m,B,q,$,b,ve),j.transparent===!0&&j.side===mn&&j.forceSinglePass===!1?(j.side=cn,j.needsUpdate=!0,m.renderBufferDirect(q,B,$,j,b,ve),j.side=Yi,j.needsUpdate=!0,m.renderBufferDirect(q,B,$,j,b,ve),j.side=mn):m.renderBufferDirect(q,B,$,j,b,ve),b.onAfterRender(m,B,q,$,j,ve)}function za(b,B,q){B.isScene!==!0&&(B=Me);const $=Ce.get(b),j=p.state.lights,ve=p.state.shadowsArray,we=j.state.version,Pe=oe.getParameters(b,j.state,ve,B,q),De=oe.getProgramCacheKey(Pe);let Ve=$.programs;$.environment=b.isMeshStandardMaterial?B.environment:null,$.fog=B.fog,$.envMap=(b.isMeshStandardMaterial?L:Qe).get(b.envMap||$.environment),$.envMapRotation=$.environment!==null&&b.envMap===null?B.environmentRotation:b.envMapRotation,Ve===void 0&&(b.addEventListener("dispose",X),Ve=new Map,$.programs=Ve);let Fe=Ve.get(De);if(Fe!==void 0){if($.currentProgram===Fe&&$.lightsStateVersion===we)return yf(b,Pe),Fe}else Pe.uniforms=oe.getUniforms(b),b.onBuild(q,Pe,m),b.onBeforeCompile(Pe,m),Fe=oe.acquireProgram(Pe,De),Ve.set(De,Fe),$.uniforms=Pe.uniforms;const Oe=$.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Oe.clippingPlanes=de.uniform),yf(b,Pe),$.needsLights=cx(b),$.lightsStateVersion=we,$.needsLights&&(Oe.ambientLightColor.value=j.state.ambient,Oe.lightProbe.value=j.state.probe,Oe.directionalLights.value=j.state.directional,Oe.directionalLightShadows.value=j.state.directionalShadow,Oe.spotLights.value=j.state.spot,Oe.spotLightShadows.value=j.state.spotShadow,Oe.rectAreaLights.value=j.state.rectArea,Oe.ltc_1.value=j.state.rectAreaLTC1,Oe.ltc_2.value=j.state.rectAreaLTC2,Oe.pointLights.value=j.state.point,Oe.pointLightShadows.value=j.state.pointShadow,Oe.hemisphereLights.value=j.state.hemi,Oe.directionalShadowMap.value=j.state.directionalShadowMap,Oe.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Oe.spotShadowMap.value=j.state.spotShadowMap,Oe.spotLightMatrix.value=j.state.spotLightMatrix,Oe.spotLightMap.value=j.state.spotLightMap,Oe.pointShadowMap.value=j.state.pointShadowMap,Oe.pointShadowMatrix.value=j.state.pointShadowMatrix),$.currentProgram=Fe,$.uniformsList=null,Fe}function _f(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=Bo.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function yf(b,B){const q=Ce.get(b);q.outputColorSpace=B.outputColorSpace,q.batching=B.batching,q.instancing=B.instancing,q.instancingColor=B.instancingColor,q.instancingMorph=B.instancingMorph,q.skinning=B.skinning,q.morphTargets=B.morphTargets,q.morphNormals=B.morphNormals,q.morphColors=B.morphColors,q.morphTargetsCount=B.morphTargetsCount,q.numClippingPlanes=B.numClippingPlanes,q.numIntersection=B.numClipIntersection,q.vertexAlphas=B.vertexAlphas,q.vertexTangents=B.vertexTangents,q.toneMapping=B.toneMapping}function ox(b,B,q,$,j){B.isScene!==!0&&(B=Me),Ne.resetTextureUnits();const ve=B.fog,we=$.isMeshStandardMaterial?B.environment:null,Pe=w===null?m.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Ji,De=($.isMeshStandardMaterial?L:Qe).get($.envMap||we),Ve=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Fe=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Oe=!!q.morphAttributes.position,_t=!!q.morphAttributes.normal,dn=!!q.morphAttributes.color;let Ct=ji;$.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Ct=m.toneMapping);const Jn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ft=Jn!==void 0?Jn.length:0,ze=Ce.get($),Vl=p.state.lights;if(U===!0&&(W===!0||b!==O)){const Mn=b===O&&$.id===N;de.setState($,b,Mn)}let ut=!1;$.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Vl.state.version||ze.outputColorSpace!==Pe||j.isBatchedMesh&&ze.batching===!1||!j.isBatchedMesh&&ze.batching===!0||j.isInstancedMesh&&ze.instancing===!1||!j.isInstancedMesh&&ze.instancing===!0||j.isSkinnedMesh&&ze.skinning===!1||!j.isSkinnedMesh&&ze.skinning===!0||j.isInstancedMesh&&ze.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&ze.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&ze.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&ze.instancingMorph===!1&&j.morphTexture!==null||ze.envMap!==De||$.fog===!0&&ze.fog!==ve||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==de.numPlanes||ze.numIntersection!==de.numIntersection)||ze.vertexAlphas!==Ve||ze.vertexTangents!==Fe||ze.morphTargets!==Oe||ze.morphNormals!==_t||ze.morphColors!==dn||ze.toneMapping!==Ct||Te.isWebGL2===!0&&ze.morphTargetsCount!==ft)&&(ut=!0):(ut=!0,ze.__version=$.version);let er=ze.currentProgram;ut===!0&&(er=za($,B,j));let Sf=!1,Fs=!1,jl=!1;const Ot=er.getUniforms(),tr=ze.uniforms;if(ye.useProgram(er.program)&&(Sf=!0,Fs=!0,jl=!0),$.id!==N&&(N=$.id,Fs=!0),Sf||O!==b){Ot.setValue(F,"projectionMatrix",b.projectionMatrix),Ot.setValue(F,"viewMatrix",b.matrixWorldInverse);const Mn=Ot.map.cameraPosition;Mn!==void 0&&Mn.setValue(F,le.setFromMatrixPosition(b.matrixWorld)),Te.logarithmicDepthBuffer&&Ot.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Ot.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),O!==b&&(O=b,Fs=!0,jl=!0)}if(j.isSkinnedMesh){Ot.setOptional(F,j,"bindMatrix"),Ot.setOptional(F,j,"bindMatrixInverse");const Mn=j.skeleton;Mn&&(Te.floatVertexTextures?(Mn.boneTexture===null&&Mn.computeBoneTexture(),Ot.setValue(F,"boneTexture",Mn.boneTexture,Ne)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}j.isBatchedMesh&&(Ot.setOptional(F,j,"batchingTexture"),Ot.setValue(F,"batchingTexture",j._matricesTexture,Ne));const Wl=q.morphAttributes;if((Wl.position!==void 0||Wl.normal!==void 0||Wl.color!==void 0&&Te.isWebGL2===!0)&&ce.update(j,q,er),(Fs||ze.receiveShadow!==j.receiveShadow)&&(ze.receiveShadow=j.receiveShadow,Ot.setValue(F,"receiveShadow",j.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(tr.envMap.value=De,tr.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Fs&&(Ot.setValue(F,"toneMappingExposure",m.toneMappingExposure),ze.needsLights&&lx(tr,jl),ve&&$.fog===!0&&ie.refreshFogUniforms(tr,ve),ie.refreshMaterialUniforms(tr,$,te,G,ee),Bo.upload(F,_f(ze),tr,Ne)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Bo.upload(F,_f(ze),tr,Ne),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Ot.setValue(F,"center",j.center),Ot.setValue(F,"modelViewMatrix",j.modelViewMatrix),Ot.setValue(F,"normalMatrix",j.normalMatrix),Ot.setValue(F,"modelMatrix",j.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Mn=$.uniformsGroups;for(let Xl=0,ux=Mn.length;Xl<ux;Xl++)if(Te.isWebGL2){const Mf=Mn[Xl];Ee.update(Mf,er),Ee.bind(Mf,er)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return er}function lx(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function cx(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(b,B,q){Ce.get(b.texture).__webglTexture=B,Ce.get(b.depthTexture).__webglTexture=q;const $=Ce.get(b);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=q===void 0,$.__autoAllocateDepthBuffer||ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,B){const q=Ce.get(b);q.__webglFramebuffer=B,q.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,q=0){w=b,R=B,T=q;let $=!0,j=null,ve=!1,we=!1;if(b){const De=Ce.get(b);De.__useDefaultFramebuffer!==void 0?(ye.bindFramebuffer(F.FRAMEBUFFER,null),$=!1):De.__webglFramebuffer===void 0?Ne.setupRenderTarget(b):De.__hasExternalTextures&&Ne.rebindTextures(b,Ce.get(b.texture).__webglTexture,Ce.get(b.depthTexture).__webglTexture);const Ve=b.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(we=!0);const Fe=Ce.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Fe[B])?j=Fe[B][q]:j=Fe[B],ve=!0):Te.isWebGL2&&b.samples>0&&Ne.useMultisampledRTT(b)===!1?j=Ce.get(b).__webglMultisampledFramebuffer:Array.isArray(Fe)?j=Fe[q]:j=Fe,y.copy(b.viewport),A.copy(b.scissor),V=b.scissorTest}else y.copy(P).multiplyScalar(te).floor(),A.copy(C).multiplyScalar(te).floor(),V=Y;if(ye.bindFramebuffer(F.FRAMEBUFFER,j)&&Te.drawBuffers&&$&&ye.drawBuffers(b,j),ye.viewport(y),ye.scissor(A),ye.setScissorTest(V),ve){const De=Ce.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,De.__webglTexture,q)}else if(we){const De=Ce.get(b.texture),Ve=B||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,De.__webglTexture,q||0,Ve)}N=-1},this.readRenderTargetPixels=function(b,B,q,$,j,ve,we){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&we!==void 0&&(Pe=Pe[we]),Pe){ye.bindFramebuffer(F.FRAMEBUFFER,Pe);try{const De=b.texture,Ve=De.format,Fe=De.type;if(Ve!==zn&&Ae.convert(Ve)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=Fe===Ca&&(ue.has("EXT_color_buffer_half_float")||Te.isWebGL2&&ue.has("EXT_color_buffer_float"));if(Fe!==Wi&&Ae.convert(Fe)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Fe===li&&(Te.isWebGL2||ue.has("OES_texture_float")||ue.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-$&&q>=0&&q<=b.height-j&&F.readPixels(B,q,$,j,Ae.convert(Ve),Ae.convert(Fe),ve)}finally{const De=w!==null?Ce.get(w).__webglFramebuffer:null;ye.bindFramebuffer(F.FRAMEBUFFER,De)}}},this.copyFramebufferToTexture=function(b,B,q=0){const $=Math.pow(2,-q),j=Math.floor(B.image.width*$),ve=Math.floor(B.image.height*$);Ne.setTexture2D(B,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,b.x,b.y,j,ve),ye.unbindTexture()},this.copyTextureToTexture=function(b,B,q,$=0){const j=B.image.width,ve=B.image.height,we=Ae.convert(q.format),Pe=Ae.convert(q.type);Ne.setTexture2D(q,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,q.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,q.unpackAlignment),B.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,$,b.x,b.y,j,ve,we,Pe,B.image.data):B.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,$,b.x,b.y,B.mipmaps[0].width,B.mipmaps[0].height,we,B.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,$,b.x,b.y,we,Pe,B.image),$===0&&q.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),ye.unbindTexture()},this.copyTextureToTexture3D=function(b,B,q,$,j=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ve=Math.round(b.max.x-b.min.x),we=Math.round(b.max.y-b.min.y),Pe=b.max.z-b.min.z+1,De=Ae.convert($.format),Ve=Ae.convert($.type);let Fe;if($.isData3DTexture)Ne.setTexture3D($,0),Fe=F.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)Ne.setTexture2DArray($,0),Fe=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,$.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,$.unpackAlignment);const Oe=F.getParameter(F.UNPACK_ROW_LENGTH),_t=F.getParameter(F.UNPACK_IMAGE_HEIGHT),dn=F.getParameter(F.UNPACK_SKIP_PIXELS),Ct=F.getParameter(F.UNPACK_SKIP_ROWS),Jn=F.getParameter(F.UNPACK_SKIP_IMAGES),ft=q.isCompressedTexture?q.mipmaps[j]:q.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,ft.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ft.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,b.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,b.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,b.min.z),q.isDataTexture||q.isData3DTexture?F.texSubImage3D(Fe,j,B.x,B.y,B.z,ve,we,Pe,De,Ve,ft.data):$.isCompressedArrayTexture?F.compressedTexSubImage3D(Fe,j,B.x,B.y,B.z,ve,we,Pe,De,ft.data):F.texSubImage3D(Fe,j,B.x,B.y,B.z,ve,we,Pe,De,Ve,ft),F.pixelStorei(F.UNPACK_ROW_LENGTH,Oe),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_t),F.pixelStorei(F.UNPACK_SKIP_PIXELS,dn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ct),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Jn),j===0&&$.generateMipmaps&&F.generateMipmap(Fe),ye.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?Ne.setTextureCube(b,0):b.isData3DTexture?Ne.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Ne.setTexture2DArray(b,0):Ne.setTexture2D(b,0),ye.unbindTexture()},this.resetState=function(){R=0,T=0,w=null,ye.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===rf?"display-p3":"srgb",n.unpackColorSpace=tt.workingColorSpace===Fl?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Zw extends lf{}Zw.prototype.isWebGL1Renderer=!0;class Qg extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Jg extends Nr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Jp=new z,em=new z,tm=new mt,Qc=new sf,To=new ka;class Qw extends Et{constructor(e=new Wt,n=new Jg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Jp.fromBufferAttribute(n,r-1),em.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Jp.distanceTo(em);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(r),To.radius+=s,e.ray.intersectsSphere(To)===!1)return;tm.copy(r).invert(),Qc.copy(e.ray).applyMatrix4(tm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new z,d=new z,f=new z,h=new z,x=this.isLineSegments?2:1,_=i.index,p=i.attributes.position;if(_!==null){const u=Math.max(0,a.start),v=Math.min(_.count,a.start+a.count);for(let m=u,M=v-1;m<M;m+=x){const R=_.getX(m),T=_.getX(m+1);if(c.fromBufferAttribute(p,R),d.fromBufferAttribute(p,T),Qc.distanceSqToSegment(c,d,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(h);N<e.near||N>e.far||n.push({distance:N,point:f.clone().applyMatrix4(this.matrixWorld),index:m,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,a.start),v=Math.min(p.count,a.start+a.count);for(let m=u,M=v-1;m<M;m+=x){if(c.fromBufferAttribute(p,m),d.fromBufferAttribute(p,m+1),Qc.distanceSqToSegment(c,d,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const T=e.ray.origin.distanceTo(h);T<e.near||T>e.far||n.push({distance:T,point:f.clone().applyMatrix4(this.matrixWorld),index:m,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const nm=new z,im=new z;class Jw extends Qw{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)nm.fromBufferAttribute(n,r),im.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+nm.distanceTo(im);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ex extends Nr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const rm=new mt,rd=new sf,bo=new ka,Ao=new z;class eT extends Et{constructor(e=new Wt,n=new ex){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),bo.copy(i.boundingSphere),bo.applyMatrix4(r),bo.radius+=s,e.ray.intersectsSphere(bo)===!1)return;rm.copy(r).invert(),rd.copy(e.ray).applyMatrix4(rm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),x=Math.min(c.count,a.start+a.count);for(let _=h,S=x;_<S;_++){const p=c.getX(_);Ao.fromBufferAttribute(f,p),sm(Ao,p,l,r,e,n,this)}}else{const h=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let _=h,S=x;_<S;_++)Ao.fromBufferAttribute(f,_),sm(Ao,_,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function sm(t,e,n,i,r,s,a){const o=rd.distanceSqToPoint(t);if(o<n){const l=new z;rd.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class cf extends Wt{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],a=[],o=[],l=[],c=new z,d=new Ge;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=n;f++,h+=3){const x=i+f/n*r;c.x=e*Math.cos(x),c.y=e*Math.sin(x),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[h]/e+1)/2,d.y=(a[h+1]/e+1)/2,l.push(d.x,d.y)}for(let f=1;f<=n;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(o,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cf(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ci extends Wt{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const d=[],f=[],h=[],x=[];let _=0;const S=[],p=i/2;let u=0;v(),a===!1&&(e>0&&m(!0),n>0&&m(!1)),this.setIndex(d),this.setAttribute("position",new st(f,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(x,2));function v(){const M=new z,R=new z;let T=0;const w=(n-e)/i;for(let N=0;N<=s;N++){const O=[],y=N/s,A=y*(n-e)+e;for(let V=0;V<=r;V++){const Z=V/r,D=Z*l+o,K=Math.sin(D),G=Math.cos(D);R.x=A*K,R.y=-y*i+p,R.z=A*G,f.push(R.x,R.y,R.z),M.set(K,w,G).normalize(),h.push(M.x,M.y,M.z),x.push(Z,1-y),O.push(_++)}S.push(O)}for(let N=0;N<r;N++)for(let O=0;O<s;O++){const y=S[O][N],A=S[O+1][N],V=S[O+1][N+1],Z=S[O][N+1];d.push(y,A,Z),d.push(A,V,Z),T+=6}c.addGroup(u,T,0),u+=T}function m(M){const R=_,T=new Ge,w=new z;let N=0;const O=M===!0?e:n,y=M===!0?1:-1;for(let V=1;V<=r;V++)f.push(0,p*y,0),h.push(0,y,0),x.push(.5,.5),_++;const A=_;for(let V=0;V<=r;V++){const D=V/r*l+o,K=Math.cos(D),G=Math.sin(D);w.x=O*G,w.y=p*y,w.z=O*K,f.push(w.x,w.y,w.z),h.push(0,y,0),T.x=K*.5+.5,T.y=G*.5*y+.5,x.push(T.x,T.y),_++}for(let V=0;V<r;V++){const Z=R+V,D=A+V;M===!0?d.push(D,D+1,Z):d.push(D+1,D,Z),N+=3}c.addGroup(u,N,M===!0?1:2),u+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class uf extends ci{constructor(e=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,n,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new uf(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class df extends Wt{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],a=[];o(r),c(i),d(),this.setAttribute("position",new st(s,3)),this.setAttribute("normal",new st(s.slice(),3)),this.setAttribute("uv",new st(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const m=new z,M=new z,R=new z;for(let T=0;T<n.length;T+=3)x(n[T+0],m),x(n[T+1],M),x(n[T+2],R),l(m,M,R,v)}function l(v,m,M,R){const T=R+1,w=[];for(let N=0;N<=T;N++){w[N]=[];const O=v.clone().lerp(M,N/T),y=m.clone().lerp(M,N/T),A=T-N;for(let V=0;V<=A;V++)V===0&&N===T?w[N][V]=O:w[N][V]=O.clone().lerp(y,V/A)}for(let N=0;N<T;N++)for(let O=0;O<2*(T-N)-1;O++){const y=Math.floor(O/2);O%2===0?(h(w[N][y+1]),h(w[N+1][y]),h(w[N][y])):(h(w[N][y+1]),h(w[N+1][y+1]),h(w[N+1][y]))}}function c(v){const m=new z;for(let M=0;M<s.length;M+=3)m.x=s[M+0],m.y=s[M+1],m.z=s[M+2],m.normalize().multiplyScalar(v),s[M+0]=m.x,s[M+1]=m.y,s[M+2]=m.z}function d(){const v=new z;for(let m=0;m<s.length;m+=3){v.x=s[m+0],v.y=s[m+1],v.z=s[m+2];const M=p(v)/2/Math.PI+.5,R=u(v)/Math.PI+.5;a.push(M,1-R)}_(),f()}function f(){for(let v=0;v<a.length;v+=6){const m=a[v+0],M=a[v+2],R=a[v+4],T=Math.max(m,M,R),w=Math.min(m,M,R);T>.9&&w<.1&&(m<.2&&(a[v+0]+=1),M<.2&&(a[v+2]+=1),R<.2&&(a[v+4]+=1))}}function h(v){s.push(v.x,v.y,v.z)}function x(v,m){const M=v*3;m.x=e[M+0],m.y=e[M+1],m.z=e[M+2]}function _(){const v=new z,m=new z,M=new z,R=new z,T=new Ge,w=new Ge,N=new Ge;for(let O=0,y=0;O<s.length;O+=9,y+=6){v.set(s[O+0],s[O+1],s[O+2]),m.set(s[O+3],s[O+4],s[O+5]),M.set(s[O+6],s[O+7],s[O+8]),T.set(a[y+0],a[y+1]),w.set(a[y+2],a[y+3]),N.set(a[y+4],a[y+5]),R.copy(v).add(m).add(M).divideScalar(3);const A=p(R);S(T,y+0,v,A),S(w,y+2,m,A),S(N,y+4,M,A)}}function S(v,m,M,R){R<0&&v.x===1&&(a[m]=v.x-1),M.x===0&&M.z===0&&(a[m]=R/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function u(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new df(e.vertices,e.indices,e.radius,e.details)}}class Ol extends df{constructor(e=1,n=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,n),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new Ol(e.radius,e.detail)}}class zl extends Wt{constructor(e=.5,n=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],d=[];let f=e;const h=(n-e)/r,x=new z,_=new Ge;for(let S=0;S<=r;S++){for(let p=0;p<=i;p++){const u=s+p/i*a;x.x=f*Math.cos(u),x.y=f*Math.sin(u),l.push(x.x,x.y,x.z),c.push(0,0,1),_.x=(x.x/n+1)/2,_.y=(x.y/n+1)/2,d.push(_.x,_.y)}f+=h}for(let S=0;S<r;S++){const p=S*(i+1);for(let u=0;u<i;u++){const v=u+p,m=v,M=v+i+1,R=v+i+2,T=v+1;o.push(m,M,T),o.push(M,R,T)}}this.setIndex(o),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Bl extends Wt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const d=[],f=new z,h=new z,x=[],_=[],S=[],p=[];for(let u=0;u<=i;u++){const v=[],m=u/i;let M=0;u===0&&a===0?M=.5/n:u===i&&l===Math.PI&&(M=-.5/n);for(let R=0;R<=n;R++){const T=R/n;f.x=-e*Math.cos(r+T*s)*Math.sin(a+m*o),f.y=e*Math.cos(a+m*o),f.z=e*Math.sin(r+T*s)*Math.sin(a+m*o),_.push(f.x,f.y,f.z),h.copy(f).normalize(),S.push(h.x,h.y,h.z),p.push(T+M,1-m),v.push(c++)}d.push(v)}for(let u=0;u<i;u++)for(let v=0;v<n;v++){const m=d[u][v+1],M=d[u][v],R=d[u+1][v],T=d[u+1][v+1];(u!==0||a>0)&&x.push(m,M,T),(u!==i-1||l<Math.PI)&&x.push(M,R,T)}this.setIndex(x),this.setAttribute("position",new st(_,3)),this.setAttribute("normal",new st(S,3)),this.setAttribute("uv",new st(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ut extends Nr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lg,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ff extends Et{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const Jc=new mt,am=new z,om=new z;class tx{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new af,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new Lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;am.setFromMatrixPosition(e.matrixWorld),n.position.copy(am),om.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(om),n.updateMatrixWorld(),Jc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Jc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class tT extends tx{constructor(){super(new rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const n=this.camera,i=xl*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||n.far;(i!==n.fov||r!==n.aspect||s!==n.far)&&(n.fov=i,n.aspect=r,n.far=s,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ho extends ff{constructor(e,n,i=0,r=Math.PI/3,s=0,a=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new tT}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class nT extends tx{constructor(){super(new Wg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class iT extends ff{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new nT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class nx extends ff{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class ix{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=lm();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function lm(){return(typeof performance>"u"?Date:performance).now()}class eu extends Jw{constructor(e=10,n=10,i=4473924,r=8947848){i=new Ye(i),r=new Ye(r);const s=n/2,a=e/n,o=e/2,l=[],c=[];for(let h=0,x=0,_=-o;h<=n;h++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const S=h===s?i:r;S.toArray(c,x),x+=3,S.toArray(c,x),x+=3,S.toArray(c,x),x+=3,S.toArray(c,x),x+=3}const d=new Wt;d.setAttribute("position",new st(l,3)),d.setAttribute("color",new st(c,3));const f=new Jg({vertexColors:!0,toneMapped:!1});super(d,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tf);function rT({sport:t="football"}){const e=be.useRef(null);return be.useEffect(()=>{const n=e.current;if(!n)return;const i=new Qg,r=new rn(60,n.clientWidth/n.clientHeight,.1,1e3);r.position.set(0,22,36),r.lookAt(0,0,0);const s=new lf({alpha:!0,antialias:!0});s.setSize(n.clientWidth,n.clientHeight),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.appendChild(s.domElement);let a=1096065;t==="cricket"?a=2278750:t==="basketball"?a=16347926:t==="journaler"&&(a=440020);const o=new nx(16777215,.45);i.add(o);const l=new Ho(a,4,120,Math.PI/4,.5);l.position.set(0,35,20),i.add(l);const c=new Ho(3900150,2.5,120,Math.PI/4,.5);c.position.set(-30,30,-30),i.add(c);const d=new Ho(16777215,2,120,Math.PI/4,.5);d.position.set(30,30,-30),i.add(d);const f=new us;if(t==="football"){const y=new hi(60,90),A=new Ut({color:403479,roughness:.8,metalness:.1}),V=new Je(y,A);V.rotation.x=-Math.PI/2,f.add(V);const Z=new eu(90,30,2278750,1332013);Z.position.y=.05,f.add(Z);const D=new zl(8,8.4,32),K=new Rs({color:16777215,side:mn}),G=new Je(D,K);G.rotation.x=-Math.PI/2,G.position.y=.08,f.add(G)}else if(t==="cricket"){const y=new cf(42,48),A=new Ut({color:668444,roughness:.7}),V=new Je(y,A);V.rotation.x=-Math.PI/2,f.add(V);const Z=new hi(10,30),D=new Ut({color:11817737,roughness:.9}),K=new Je(Z,D);K.rotation.x=-Math.PI/2,K.position.y=.06,f.add(K);const G=te=>{for(let I=-1;I<=1;I++){const H=new ci(.15,.15,2.5,12),P=new Ut({color:16707722}),C=new Je(H,P);C.position.set(I*.5,1.25,te),f.add(C)}};G(13),G(-13)}else if(t==="basketball"){const y=new hi(55,80),A=new Ut({color:4396039,roughness:.3,metalness:.2}),V=new Je(y,A);V.rotation.x=-Math.PI/2,f.add(V);const Z=new eu(80,20,16347926,8138002);Z.position.y=.05,f.add(Z);const D=new hi(14,20),K=new Rs({color:12730636,side:mn}),G=new Je(D,K);G.rotation.x=-Math.PI/2,G.position.set(0,.07,-25),f.add(G)}else{const y=new eu(100,40,440020,988970);y.position.y=.05,f.add(y)}i.add(f);let h=new Ol(2.8,2),x=new Ut({color:a,wireframe:!0,emissive:a,emissiveIntensity:.5,roughness:.2});t==="cricket"&&(h=new Bl(2.5,24,24),x=new Ut({color:14251782,roughness:.3,metalness:.3,emissive:9584654,emissiveIntensity:.4}));const _=new Je(h,x);_.position.set(0,9,-15),i.add(_);const S=250,p=new Wt,u=new Float32Array(S*3),v=new Float32Array(S*3),m=new Ye(a);for(let y=0;y<S;y++)u[y*3]=(Math.random()-.5)*80,u[y*3+1]=Math.random()*30+1,u[y*3+2]=(Math.random()-.5)*80,v[y*3]=m.r+(Math.random()-.5)*.25,v[y*3+1]=m.g+(Math.random()-.5)*.25,v[y*3+2]=m.b+(Math.random()-.5)*.25;p.setAttribute("position",new Cn(u,3)),p.setAttribute("color",new Cn(v,3));const M=new ex({size:.4,vertexColors:!0,transparent:!0,opacity:.8,blending:Yu}),R=new eT(p,M);i.add(R);let T;const w=new ix,N=()=>{T=requestAnimationFrame(N);const y=w.getElapsedTime();_.rotation.x=y*.4,_.rotation.y=y*.5,_.position.y=9+Math.sin(y*1.5)*1.2;const A=R.geometry.attributes.position.array;for(let V=0;V<S;V++)A[V*3+1]+=Math.sin(y+V)*.012;R.geometry.attributes.position.needsUpdate=!0,r.position.x=Math.sin(y*.25)*3,s.render(i,r)};N();const O=()=>{n&&(r.aspect=n.clientWidth/n.clientHeight,r.updateProjectionMatrix(),s.setSize(n.clientWidth,n.clientHeight))};return window.addEventListener("resize",O),()=>{cancelAnimationFrame(T),window.removeEventListener("resize",O),n.contains(s.domElement)&&n.removeChild(s.domElement),s.dispose()}},[t]),g.jsx("div",{ref:e,className:"fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"})}/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var sT={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aT=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),Ze=(t,e)=>{const n=be.forwardRef(({color:i="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:o="",children:l,...c},d)=>be.createElement("svg",{ref:d,...sT,width:r,height:r,stroke:i,strokeWidth:a?Number(s)*24/Number(r):s,className:["lucide",`lucide-${aT(t)}`,o].join(" "),...c},[...e.map(([f,h])=>be.createElement(f,h)),...Array.isArray(l)?l:[l]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=Ze("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oT=Ze("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=Ze("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lT=Ze("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cT=Ze("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uT=Ze("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dT=Ze("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fT=Ze("Cpu",[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hT=Ze("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pT=Ze("HeartPulse",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"1uw2ng"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mT=Ze("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gT=Ze("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sd=Ze("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=Ze("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xT=Ze("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vT=Ze("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _T=Ze("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yT=Ze("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ST=Ze("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MT=Ze("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ET=Ze("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wT=Ze("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hl=Ze("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rx=Ze("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TT=Ze("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bT=Ze("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=Ze("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AT=Ze("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CT=Ze("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gl=Ze("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sx=Ze("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rr=Ze("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RT=Ze("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),ad={football:{id:"football",name:"Karan Sharma",role:"Athlete",sport:"Football",position:"Central Attacking Midfielder (#10)",team:"Legacy Lane Football Academy / City FC",stats:{matches:48,goals:34,assists:22,mvpCount:12,careerRating:"9.2"},theme:{accent:"from-emerald-500 to-green-600",glow:"rgba(16, 185, 129, 0.4)",bg:"from-slate-950 via-emerald-950/30 to-slate-950",badge:"bg-emerald-500/20 text-emerald-300 border-emerald-500/40",nodeUnlocked:"bg-emerald-500 text-slate-950 shadow-emerald-500/50",line:"stroke-emerald-500",icon:"Trophy"},levels:[{id:1,levelNumber:1,title:"Youth Academy Trials",era:"Youth Era (2018-2020)",date:"2018-09-14",stars:3,status:"completed",matchDetails:"Scored 2 goals on debut trial match. Selected for Academy U-18 squad.",stats:{goals:2,assists:1,rating:"8.9"},tags:["Debut","Trial","High Hopes"],sentiment:.85,media:"https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",content:"The day I walked into the city academy complex with my old boots. The coach called my name in the 60th minute. Two minutes later, I hit the top right corner. A dream started today."},{id:2,levelNumber:2,title:"First Professional Contract",era:"Youth Era (2018-2020)",date:"2020-03-22",stars:3,status:"completed",matchDetails:"Signed official 3-year contract with City FC First Team.",stats:{contractYears:3,squadNo:10},tags:["Contract","Pro Debut","Milestone"],sentiment:.92,media:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",content:"Sat at the signing table with my family. Signed my first professional football contract. Wore jersey #10 for the first time."},{id:3,levelNumber:3,title:"ACL Injury & Mental Struggle",era:"Pro Debut Era (2021-2023)",date:"2021-11-05",stars:2,status:"completed",matchDetails:"Knee injury in 78th min against Rival FC. 8 months rehabilitation.",stats:{recoveryMonths:8,resilience:"100%"},tags:["Injury","Rehab","Mental Resilience"],sentiment:-.42,media:"https://images.unsplash.com/photo-1517649763962-0c6232662000?auto=format&fit=crop&w=800&q=80",content:"Heard a pop in my left knee during a aerial duel. The doctor confirmed ACL tear. Darkest moment of my career, but I promised myself I would come back stronger than ever."},{id:4,levelNumber:4,title:"The Comeback Hattrick",era:"Pro Debut Era (2021-2023)",date:"2022-09-18",stars:3,status:"completed",matchDetails:"Came off bench in 65th minute. Scored 3 goals in 20 minutes!",stats:{goals:3,assists:0,rating:"9.8"},tags:["Hattrick","Comeback","MOTM"],sentiment:.98,media:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",content:"Subbed on after 300 days out. First touch was a volley into the bottom net. Scored two more before the final whistle. The stadium roared my name."},{id:5,levelNumber:5,title:"Championship Winning Goal",era:"Championship Era (2024+)",date:"2024-05-12",stars:3,status:"current",matchDetails:"Free-kick winner in 94th minute of League Final.",stats:{goals:1,assists:1,rating:"9.6"},tags:["Trophy","Champions","Golden Boot"],sentiment:.96,media:"https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80",content:"Curved the free-kick over the wall into the top corner. We are League Champions!"}]},cricket:{id:"cricket",name:"Karan Sharma",role:"Athlete",sport:"Cricket",position:"Fast-Bowling All-Rounder (#7)",team:"State Cricket Academy / Royals XI",stats:{matches:54,wickets:78,runs:1420,highestScore:"108*",careerRating:"9.4"},theme:{accent:"from-green-500 to-lime-600",glow:"rgba(34, 197, 94, 0.4)",bg:"from-slate-950 via-lime-950/30 to-slate-950",badge:"bg-lime-500/20 text-lime-300 border-lime-500/40",nodeUnlocked:"bg-lime-500 text-slate-950 shadow-lime-500/50",line:"stroke-lime-500",icon:"Trophy"},levels:[{id:1,levelNumber:1,title:"Under-19 State Championship Five-Wicket Haul",era:"Youth Era (2018-2020)",date:"2019-01-20",stars:3,status:"completed",matchDetails:"Took 5 wickets for 24 runs on green pitch pitch.",stats:{wickets:5,runsConceded:24,economy:"3.2"},tags:["FiveWicketHaul","U19State","BowlingMagic"],sentiment:.94,media:"https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",content:"Swung the new seam ball both ways. Clean bowled the top order in the first spell. Led our state team into the finals!"},{id:2,levelNumber:2,title:"First-Class Debut & Maiden Century",era:"Pro Debut Era (2021-2023)",date:"2021-12-08",stars:3,status:"completed",matchDetails:"Scored 108* batting at #7 under intense pressure.",stats:{runs:108,fours:12,sixes:4},tags:["MaidenCentury","FirstClass","BattingHero"],sentiment:.96,media:"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",content:"Walked in at 120/5. Played through the evening session. Reached my 100 with a lofted cover drive. Raised my helmet to the pavilion!"},{id:3,levelNumber:3,title:"T20 League Final Last-Ball Six Winner",era:"Championship Era (2024+)",date:"2024-04-28",stars:3,status:"current",matchDetails:"Needed 5 runs off 1 ball. Hit a massive 95m six over long-on!",stats:{runs:34,balls:14,sixes:4},tags:["T20Champions","LastBallSix","MatchWinner"],sentiment:.99,media:"https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",content:"5 needed off the final delivery. Yorker length ball outside off, swung hard over long-on. The crowd erupted into wild celebrations!"}]},basketball:{id:"basketball",name:"Karan Sharma",role:"Athlete",sport:"Basketball",position:"Point Guard (#3)",team:"Legacy Hoops / Metro Vipers",stats:{matches:62,ppg:"26.4",apg:"8.2",rpg:"5.1",careerRating:"9.4"},theme:{accent:"from-amber-500 to-orange-600",glow:"rgba(245, 158, 11, 0.4)",bg:"from-slate-950 via-amber-950/30 to-slate-950",badge:"bg-amber-500/20 text-amber-300 border-amber-500/40",nodeUnlocked:"bg-amber-500 text-slate-950 shadow-amber-500/50",line:"stroke-amber-500",icon:"Activity"},levels:[{id:1,levelNumber:1,title:"High School State Finals MVP",era:"Rookie Days (2019-2021)",date:"2019-03-15",stars:3,status:"completed",matchDetails:"Dropped 42 points in state final win. Hit game-winning buzzer beater.",stats:{points:42,assists:9,rating:"9.9"},tags:["StateChamp","BuzzerBeater","MVP"],sentiment:.95,media:"https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",content:"3 seconds left on the clock. Trailing by 1. Stepped back behind the arc and released the ball as the horn sounded. Swish!"},{id:2,levelNumber:2,title:"College Draft First Round Pick",era:"Rookie Days (2019-2021)",date:"2021-06-25",stars:3,status:"completed",matchDetails:"Drafted #5 overall pick in National Pro League.",stats:{draftPick:"#5",team:"Vipers"},tags:["DraftDay","ProLeague","Pick5"],sentiment:.91,media:"https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80",content:"Heard my name announced on live national broadcast. Put on the team cap and shook hands on stage."},{id:3,levelNumber:3,title:"Rookie of the Year Award",era:"Pro Prime Era (2022-2024)",date:"2022-05-10",stars:3,status:"current",matchDetails:"Averaged 22.5 PPG and 7.8 APG across rookie season.",stats:{ppg:"22.5",apg:"7.8",award:"ROY"},tags:["RookieOfTheYear","StatsLeader"],sentiment:.88,media:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",content:"Awarded Rookie of the Year trophy at the postseason gala."}]},journaler:{id:"journaler",name:"Karan Sharma",role:"Primary User",sport:"Life Journal",position:"Story Creator",team:"Personal Timeline",stats:{memoriesLogged:84,erasRecorded:4,streakDays:45,wellnessIndex:"91/100"},theme:{accent:"from-cyan-500 to-blue-600",glow:"rgba(6, 182, 212, 0.4)",bg:"from-slate-950 via-cyan-950/30 to-slate-950",badge:"bg-cyan-500/20 text-cyan-300 border-cyan-500/40",nodeUnlocked:"bg-cyan-500 text-slate-950 shadow-cyan-500/50",line:"stroke-cyan-500",icon:"BookOpen"},levels:[{id:1,levelNumber:1,title:"First Coding Project Launch",era:"College Days (2018-2022)",date:"2020-02-10",stars:3,status:"completed",matchDetails:"Launched full-stack web application with 1,000 active users.",stats:{users:1e3,linesOfCode:15e3},tags:["Coding","Launch","Milestone"],sentiment:.89,media:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",content:"Pushed final commit to GitHub. First 1,000 users logged in within 48 hours."},{id:2,levelNumber:2,title:"Graduation Day",era:"College Days (2018-2022)",date:"2022-06-15",stars:3,status:"completed",matchDetails:"Graduated with First Class Honors in Software Engineering.",stats:{gpa:"3.9",degree:"B.Tech CS"},tags:["Graduation","Engineering","Family"],sentiment:.94,media:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",content:"Threw graduation cap in the air with all my classmates. Family was cheering in the front row."}]}},PT=[{id:"u2",name:"Alex Rivera",username:"@arivera_11",role:"Football Striker",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",status:"accepted",sharedLevels:4,recentMilestone:"Scored 20th Goal of Season"},{id:"u3",name:"Marcus Vance",username:"@mvance_hoops",role:"Basketball Guard",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",status:"accepted",sharedLevels:6,recentMilestone:"Triple-Double in Semi-Finals"},{id:"u5",name:"Rohan Patel",username:"@rpatel_cricket",role:"Cricket Pace Bowler",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",status:"accepted",sharedLevels:5,recentMilestone:"5-Wicket Haul in Championship Final"}];function LT({activeSport:t,onSportChange:e,currentUser:n,onOpenAuthModal:i,onLogout:r,onOpenAIChat:s,onOpenFollowModal:a,onOpenSentimentModal:o,onOpenAddLevelModal:l,onGoHome:c,pendingRequestsCount:d=1}){return ad[t]||ad.football,g.jsxs("header",{className:"sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("button",{onClick:c,className:"p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all",title:"Back to Home Page",children:g.jsx(mT,{className:"w-5 h-5"})}),g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("h1",{onClick:c,className:"text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent cursor-pointer",children:"LegacyLane"}),g.jsx("span",{className:"text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700",children:"The One Who Lives"})]}),g.jsx("p",{className:"text-xs text-slate-400 font-medium",children:"3D Chronological Ground Roadmap & AI Younger Self"})]})]}),g.jsxs("div",{className:"flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800/80 shadow-inner overflow-x-auto",children:[g.jsxs("button",{onClick:()=>e("football"),className:`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${t==="football"?"bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 shadow-md shadow-emerald-500/30":"text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`,children:[g.jsx("span",{children:"⚽"}),g.jsx("span",{children:"Football Pitch"})]}),g.jsxs("button",{onClick:()=>e("cricket"),className:`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${t==="cricket"?"bg-gradient-to-r from-green-500 to-lime-600 text-slate-950 shadow-md shadow-lime-500/30":"text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`,children:[g.jsx("span",{children:"🏏"}),g.jsx("span",{children:"Cricket Ground"})]}),g.jsxs("button",{onClick:()=>e("basketball"),className:`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${t==="basketball"?"bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/30":"text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`,children:[g.jsx("span",{children:"🏀"}),g.jsx("span",{children:"Basketball Court"})]}),g.jsxs("button",{onClick:()=>e("journaler"),className:`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${t==="journaler"?"bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30":"text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`,children:[g.jsx("span",{children:"📖"}),g.jsx("span",{children:"Life Galaxy"})]})]}),g.jsxs("div",{className:"flex items-center gap-2 md:gap-3",children:[g.jsxs("button",{onClick:l,className:"flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all",children:[g.jsx(ST,{className:"w-4 h-4"}),g.jsx("span",{className:"hidden sm:inline",children:"Add Level Node"})]}),g.jsxs("button",{onClick:s,className:"relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-semibold shadow-lg shadow-purple-950/40 hover:scale-105 active:scale-95 transition-all",children:[g.jsx(ua,{className:"w-4 h-4 text-purple-400 animate-pulse"}),g.jsx("span",{className:"hidden sm:inline",children:"AI Younger Self"}),g.jsx("span",{className:"w-2 h-2 rounded-full bg-purple-400 animate-ping"})]}),g.jsx("button",{onClick:o,className:"p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold hover:text-emerald-400 transition-all",title:"Mental Wellness & Sentiment",children:g.jsx(hf,{className:"w-4 h-4 text-emerald-400"})}),g.jsxs("button",{onClick:a,className:"relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold hover:text-blue-400 transition-all",title:"Connections & Follow Requests",children:[g.jsx(sx,{className:"w-4 h-4 text-blue-400"}),d>0&&g.jsx("span",{className:"absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-black text-[10px] flex items-center justify-center border-2 border-slate-950 shadow-md",children:d})]}),n?g.jsxs("div",{className:"flex items-center gap-2 pl-2 border-l border-slate-800",children:[g.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs",children:[g.jsx(Gl,{className:"w-4 h-4 text-emerald-400"}),g.jsx("span",{className:"font-bold text-white max-w-[100px] truncate",children:n.name})]}),g.jsx("button",{onClick:r,className:"p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-all",title:"Sign Out",children:g.jsx(xT,{className:"w-4 h-4"})})]}):g.jsxs("button",{onClick:i,className:"flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-950/40 transition-all",children:[g.jsx(pf,{className:"w-4 h-4"}),g.jsx("span",{children:"Sign In / Register"})]})]})]})}var gf={};(function t(e,n,i,r){var s=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),a=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var P=new OffscreenCanvas(1,1),C=P.getContext("2d");C.fillRect(0,0,1,1);var Y=P.transferToImageBitmap();C.createPattern(Y,"no-repeat")}catch{return!1}return!0}();function l(){}function c(P){var C=n.exports.Promise,Y=C!==void 0?C:e.Promise;return typeof Y=="function"?new Y(P):(P(l,l),null)}var d=function(P,C){return{transform:function(Y){if(P)return Y;if(C.has(Y))return C.get(Y);var re=new OffscreenCanvas(Y.width,Y.height),U=re.getContext("2d");return U.drawImage(Y,0,0),C.set(Y,re),re},clear:function(){C.clear()}}}(o,new Map),f=function(){var P=Math.floor(16.666666666666668),C,Y,re={},U=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(C=function(W){var ee=Math.random();return re[ee]=requestAnimationFrame(function ne(ae){U===ae||U+P-1<ae?(U=ae,delete re[ee],W()):re[ee]=requestAnimationFrame(ne)}),ee},Y=function(W){re[W]&&cancelAnimationFrame(re[W])}):(C=function(W){return setTimeout(W,P)},Y=function(W){return clearTimeout(W)}),{frame:C,cancel:Y}}(),h=function(){var P,C,Y={};function re(U){function W(ee,ne){U.postMessage({options:ee||{},callback:ne})}U.init=function(ne){var ae=ne.transferControlToOffscreen();U.postMessage({canvas:ae},[ae])},U.fire=function(ne,ae,le){if(C)return W(ne,null),C;var Me=Math.random().toString(36).slice(2);return C=c(function(ge){function F(je){je.data.callback===Me&&(delete Y[Me],U.removeEventListener("message",F),C=null,d.clear(),le(),ge())}U.addEventListener("message",F),W(ne,Me),Y[Me]=F.bind(null,{data:{callback:Me}})}),C},U.reset=function(){U.postMessage({reset:!0});for(var ne in Y)Y[ne](),delete Y[ne]}}return function(){if(P)return P;if(!i&&s){var U=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{P=new Worker(URL.createObjectURL(new Blob([U])))}catch(W){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",W),null}re(P)}return P}}(),x={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function _(P,C){return C?C(P):P}function S(P){return P!=null}function p(P,C,Y){return _(P&&S(P[C])?P[C]:x[C],Y)}function u(P){return P<0?0:Math.floor(P)}function v(P,C){return Math.floor(Math.random()*(C-P))+P}function m(P){return parseInt(P,16)}function M(P){return P.map(R)}function R(P){var C=String(P).replace(/[^0-9a-f]/gi,"");return C.length<6&&(C=C[0]+C[0]+C[1]+C[1]+C[2]+C[2]),{r:m(C.substring(0,2)),g:m(C.substring(2,4)),b:m(C.substring(4,6))}}function T(P){var C=p(P,"origin",Object);return C.x=p(C,"x",Number),C.y=p(C,"y",Number),C}function w(P){P.width=document.documentElement.clientWidth,P.height=document.documentElement.clientHeight}function N(P){var C=P.getBoundingClientRect();P.width=C.width,P.height=C.height}function O(P){var C=document.createElement("canvas");return C.style.position="fixed",C.style.top="0px",C.style.left="0px",C.style.pointerEvents="none",C.style.zIndex=P,C}function y(P,C,Y,re,U,W,ee,ne,ae){P.save(),P.translate(C,Y),P.rotate(W),P.scale(re,U),P.arc(0,0,1,ee,ne,ae),P.restore()}function A(P){var C=P.angle*(Math.PI/180),Y=P.spread*(Math.PI/180);return{x:P.x,y:P.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:P.startVelocity*.5+Math.random()*P.startVelocity,angle2D:-C+(.5*Y-Math.random()*Y),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:P.color,shape:P.shape,tick:0,totalTicks:P.ticks,decay:P.decay,drift:P.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:P.gravity*3,ovalScalar:.6,scalar:P.scalar,flat:P.flat}}function V(P,C){C.x+=Math.cos(C.angle2D)*C.velocity+C.drift,C.y+=Math.sin(C.angle2D)*C.velocity+C.gravity,C.velocity*=C.decay,C.flat?(C.wobble=0,C.wobbleX=C.x+10*C.scalar,C.wobbleY=C.y+10*C.scalar,C.tiltSin=0,C.tiltCos=0,C.random=1):(C.wobble+=C.wobbleSpeed,C.wobbleX=C.x+10*C.scalar*Math.cos(C.wobble),C.wobbleY=C.y+10*C.scalar*Math.sin(C.wobble),C.tiltAngle+=.1,C.tiltSin=Math.sin(C.tiltAngle),C.tiltCos=Math.cos(C.tiltAngle),C.random=Math.random()+2);var Y=C.tick++/C.totalTicks,re=C.x+C.random*C.tiltCos,U=C.y+C.random*C.tiltSin,W=C.wobbleX+C.random*C.tiltCos,ee=C.wobbleY+C.random*C.tiltSin;if(P.fillStyle="rgba("+C.color.r+", "+C.color.g+", "+C.color.b+", "+(1-Y)+")",P.beginPath(),a&&C.shape.type==="path"&&typeof C.shape.path=="string"&&Array.isArray(C.shape.matrix))P.fill(te(C.shape.path,C.shape.matrix,C.x,C.y,Math.abs(W-re)*.1,Math.abs(ee-U)*.1,Math.PI/10*C.wobble));else if(C.shape.type==="bitmap"){var ne=Math.PI/10*C.wobble,ae=Math.abs(W-re)*.1,le=Math.abs(ee-U)*.1,Me=C.shape.bitmap.width*C.scalar,ge=C.shape.bitmap.height*C.scalar,F=new DOMMatrix([Math.cos(ne)*ae,Math.sin(ne)*ae,-Math.sin(ne)*le,Math.cos(ne)*le,C.x,C.y]);F.multiplySelf(new DOMMatrix(C.shape.matrix));var je=P.createPattern(d.transform(C.shape.bitmap),"no-repeat");je.setTransform(F),P.globalAlpha=1-Y,P.fillStyle=je,P.fillRect(C.x-Me/2,C.y-ge/2,Me,ge),P.globalAlpha=1}else if(C.shape==="circle")P.ellipse?P.ellipse(C.x,C.y,Math.abs(W-re)*C.ovalScalar,Math.abs(ee-U)*C.ovalScalar,Math.PI/10*C.wobble,0,2*Math.PI):y(P,C.x,C.y,Math.abs(W-re)*C.ovalScalar,Math.abs(ee-U)*C.ovalScalar,Math.PI/10*C.wobble,0,2*Math.PI);else if(C.shape==="star")for(var ue=Math.PI/2*3,Te=4*C.scalar,ye=8*C.scalar,Le=C.x,Ce=C.y,Ne=5,Qe=Math.PI/Ne;Ne--;)Le=C.x+Math.cos(ue)*ye,Ce=C.y+Math.sin(ue)*ye,P.lineTo(Le,Ce),ue+=Qe,Le=C.x+Math.cos(ue)*Te,Ce=C.y+Math.sin(ue)*Te,P.lineTo(Le,Ce),ue+=Qe;else P.moveTo(Math.floor(C.x),Math.floor(C.y)),P.lineTo(Math.floor(C.wobbleX),Math.floor(U)),P.lineTo(Math.floor(W),Math.floor(ee)),P.lineTo(Math.floor(re),Math.floor(C.wobbleY));return P.closePath(),P.fill(),C.tick<C.totalTicks}function Z(P,C,Y,re,U){var W=C.slice(),ee=P.getContext("2d"),ne,ae,le=c(function(Me){function ge(){ne=ae=null,ee.clearRect(0,0,re.width,re.height),d.clear(),U(),Me()}function F(){i&&!(re.width===r.width&&re.height===r.height)&&(re.width=P.width=r.width,re.height=P.height=r.height),!re.width&&!re.height&&(Y(P),re.width=P.width,re.height=P.height),ee.clearRect(0,0,re.width,re.height),W=W.filter(function(je){return V(ee,je)}),W.length?ne=f.frame(F):ge()}ne=f.frame(F),ae=ge});return{addFettis:function(Me){return W=W.concat(Me),le},canvas:P,promise:le,reset:function(){ne&&f.cancel(ne),ae&&ae()}}}function D(P,C){var Y=!P,re=!!p(C||{},"resize"),U=!1,W=p(C,"disableForReducedMotion",Boolean),ee=s&&!!p(C||{},"useWorker"),ne=ee?h():null,ae=Y?w:N,le=P&&ne?!!P.__confetti_initialized:!1,Me=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,ge;function F(ue,Te,ye){for(var Le=p(ue,"particleCount",u),Ce=p(ue,"angle",Number),Ne=p(ue,"spread",Number),Qe=p(ue,"startVelocity",Number),L=p(ue,"decay",Number),E=p(ue,"gravity",Number),Q=p(ue,"drift",Number),J=p(ue,"colors",M),oe=p(ue,"ticks",Number),ie=p(ue,"shapes"),Ue=p(ue,"scalar"),Re=!!p(ue,"flat"),de=T(ue),pe=Le,Ie=[],ce=P.width*de.x,xt=P.height*de.y;pe--;)Ie.push(A({x:ce,y:xt,angle:Ce,spread:Ne,startVelocity:Qe,color:J[pe%J.length],shape:ie[v(0,ie.length)],ticks:oe,decay:L,gravity:E,drift:Q,scalar:Ue,flat:Re}));return ge?ge.addFettis(Ie):(ge=Z(P,Ie,ae,Te,ye),ge.promise)}function je(ue){var Te=W||p(ue,"disableForReducedMotion",Boolean),ye=p(ue,"zIndex",Number);if(Te&&Me)return c(function(Qe){Qe()});Y&&ge?P=ge.canvas:Y&&!P&&(P=O(ye),document.body.appendChild(P)),re&&!le&&ae(P);var Le={width:P.width,height:P.height};ne&&!le&&ne.init(P),le=!0,ne&&(P.__confetti_initialized=!0);function Ce(){if(ne){var Qe={getBoundingClientRect:function(){if(!Y)return P.getBoundingClientRect()}};ae(Qe),ne.postMessage({resize:{width:Qe.width,height:Qe.height}});return}Le.width=Le.height=null}function Ne(){ge=null,re&&(U=!1,e.removeEventListener("resize",Ce)),Y&&P&&(document.body.contains(P)&&document.body.removeChild(P),P=null,le=!1)}return re&&!U&&(U=!0,e.addEventListener("resize",Ce,!1)),ne?ne.fire(ue,Le,Ne):F(ue,Le,Ne)}return je.reset=function(){ne&&ne.reset(),ge&&ge.reset()},je}var K;function G(){return K||(K=D(null,{useWorker:!0,resize:!0})),K}function te(P,C,Y,re,U,W,ee){var ne=new Path2D(P),ae=new Path2D;ae.addPath(ne,new DOMMatrix(C));var le=new Path2D;return le.addPath(ae,new DOMMatrix([Math.cos(ee)*U,Math.sin(ee)*U,-Math.sin(ee)*W,Math.cos(ee)*W,Y,re])),le}function I(P){if(!a)throw new Error("path confetti are not supported in this browser");var C,Y;typeof P=="string"?C=P:(C=P.path,Y=P.matrix);var re=new Path2D(C),U=document.createElement("canvas"),W=U.getContext("2d");if(!Y){for(var ee=1e3,ne=ee,ae=ee,le=0,Me=0,ge,F,je=0;je<ee;je+=2)for(var ue=0;ue<ee;ue+=2)W.isPointInPath(re,je,ue,"nonzero")&&(ne=Math.min(ne,je),ae=Math.min(ae,ue),le=Math.max(le,je),Me=Math.max(Me,ue));ge=le-ne,F=Me-ae;var Te=10,ye=Math.min(Te/ge,Te/F);Y=[ye,0,0,ye,-Math.round(ge/2+ne)*ye,-Math.round(F/2+ae)*ye]}return{type:"path",path:C,matrix:Y}}function H(P){var C,Y=1,re="#000000",U='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof P=="string"?C=P:(C=P.text,Y="scalar"in P?P.scalar:Y,U="fontFamily"in P?P.fontFamily:U,re="color"in P?P.color:re);var W=10*Y,ee=""+W+"px "+U,ne=new OffscreenCanvas(W,W),ae=ne.getContext("2d");ae.font=ee;var le=ae.measureText(C),Me=Math.ceil(le.actualBoundingBoxRight+le.actualBoundingBoxLeft),ge=Math.ceil(le.actualBoundingBoxAscent+le.actualBoundingBoxDescent),F=2,je=le.actualBoundingBoxLeft+F,ue=le.actualBoundingBoxAscent+F;Me+=F+F,ge+=F+F,ne=new OffscreenCanvas(Me,ge),ae=ne.getContext("2d"),ae.font=ee,ae.fillStyle=re,ae.fillText(C,je,ue);var Te=1/Y;return{type:"bitmap",bitmap:ne.transferToImageBitmap(),matrix:[Te,0,0,Te,-Me*Te/2,-ge*Te/2]}}n.exports=function(){return G().apply(this,arguments)},n.exports.reset=function(){G().reset()},n.exports.create=D,n.exports.shapeFromPath=I,n.exports.shapeFromText=H})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),gf,!1);const NT=gf.exports;gf.exports.create;function DT({profile:t,onSelectLevel:e,onAddLevelClick:n}){const i=a=>{a.status!=="locked"&&(NT({particleCount:40,spread:60,origin:{y:.6}}),e(a))},s=t.sport==="Football"?{border:"#10b981",center:"#34d399",fill:"rgba(16, 185, 129, 0.15)"}:t.sport==="Cricket"?{border:"#84cc16",center:"#a3e635",fill:"rgba(132, 204, 22, 0.15)"}:t.sport==="Basketball"?{border:"#f97316",center:"#fb923c",fill:"rgba(249, 115, 22, 0.15)"}:{border:"#06b6d4",center:"#22d3ee",fill:"rgba(6, 182, 212, 0.15)"};return g.jsxs("div",{className:"relative w-full min-h-[calc(100vh-80px)] px-4 py-8 max-w-6xl mx-auto flex flex-col items-center",children:[g.jsxs("div",{className:"w-full mb-10 glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden",children:[g.jsx("div",{className:"absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20",style:{backgroundColor:t.theme.glow}}),g.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10",children:[g.jsxs("div",{className:"flex items-center gap-4",children:[g.jsx("div",{className:`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.theme.accent} p-1 shadow-xl flex items-center justify-center text-slate-950 font-black text-2xl`,children:g.jsx("div",{className:"w-full h-full rounded-xl bg-slate-950/20 backdrop-blur-sm flex items-center justify-center",children:t.sport==="Football"?"⚽":t.sport==="Cricket"?"🏏":t.sport==="Basketball"?"🏀":"📖"})}),g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("h2",{className:"text-2xl font-black text-white tracking-tight",children:t.name}),g.jsx("span",{className:`text-xs px-2.5 py-1 rounded-full font-extrabold border ${t.theme.badge}`,children:t.position})]}),g.jsxs("p",{className:"text-xs text-slate-400 font-medium mt-0.5",children:[t.team," • Winding ",t.sport," Ground Road"]})]})]}),g.jsxs("div",{className:"flex flex-wrap items-center gap-3 w-full md:w-auto",children:[t.sport==="Football"&&g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Goals"}),g.jsx("span",{className:"text-lg font-black text-emerald-400",children:t.stats.goals})]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Assists"}),g.jsx("span",{className:"text-lg font-black text-emerald-300",children:t.stats.assists})]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Rating"}),g.jsx("span",{className:"text-lg font-black text-amber-400",children:t.stats.careerRating})]})]}),t.sport==="Cricket"&&g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Wickets"}),g.jsx("span",{className:"text-lg font-black text-lime-400",children:t.stats.wickets})]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Runs"}),g.jsx("span",{className:"text-lg font-black text-lime-300",children:t.stats.runs})]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"High Score"}),g.jsx("span",{className:"text-lg font-black text-amber-400",children:t.stats.highestScore})]})]}),t.sport==="Basketball"&&g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"PPG"}),g.jsx("span",{className:"text-lg font-black text-amber-400",children:t.stats.ppg})]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"APG"}),g.jsx("span",{className:"text-lg font-black text-amber-300",children:t.stats.apg})]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Rating"}),g.jsx("span",{className:"text-lg font-black text-amber-400",children:t.stats.careerRating})]})]}),t.sport==="Life Journal"&&g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Memories"}),g.jsx("span",{className:"text-lg font-black text-cyan-400",children:t.stats.memoriesLogged})]}),g.jsxs("div",{className:"bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none",children:[g.jsx("span",{className:"text-[10px] text-slate-400 uppercase tracking-wider font-bold block",children:"Wellness"}),g.jsx("span",{className:"text-lg font-black text-cyan-300",children:t.stats.wellnessIndex})]})]})]})]})]}),g.jsxs("div",{className:"relative w-full max-w-4xl py-6 flex flex-col items-center",children:[g.jsxs("div",{className:"text-center mb-12",children:[g.jsxs("span",{className:"text-xs font-black tracking-widest text-emerald-400 uppercase px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-1.5 w-fit mx-auto",children:[g.jsx(_T,{className:"w-3.5 h-3.5"}),"Score! Hero Connected Ground Road"]}),g.jsx("h3",{className:"text-3xl font-black text-white mt-2",children:"Career Level Journey Road"}),g.jsx("p",{className:"text-xs text-slate-400 max-w-md mx-auto mt-1",children:"Follow the ground road connecting each level node from your youth academy origins to your championship glory."})]}),g.jsxs("div",{className:"relative w-full flex flex-col items-center gap-24 py-6",children:[g.jsxs("svg",{className:"absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0",style:{filter:"drop-shadow(0 10px 20px rgba(0,0,0,0.6))"},children:[g.jsxs("defs",{children:[g.jsxs("linearGradient",{id:"roadBaseGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[g.jsx("stop",{offset:"0%",stopColor:"#0f172a"}),g.jsx("stop",{offset:"50%",stopColor:"#1e293b"}),g.jsx("stop",{offset:"100%",stopColor:"#0f172a"})]}),g.jsxs("linearGradient",{id:"roadGlowGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[g.jsx("stop",{offset:"0%",stopColor:s.border}),g.jsx("stop",{offset:"50%",stopColor:s.center}),g.jsx("stop",{offset:"100%",stopColor:s.border})]}),g.jsxs("pattern",{id:"roadAsphaltPattern",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:[g.jsx("rect",{width:"20",height:"20",fill:"#0f172a"}),g.jsx("circle",{cx:"5",cy:"5",r:"1",fill:"#1e293b"}),g.jsx("circle",{cx:"15",cy:"15",r:"1",fill:"#334155"})]})]}),g.jsx("path",{d:"M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300",fill:"none",stroke:"#090d16",strokeWidth:"68",strokeLinecap:"round"}),g.jsx("path",{d:"M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300",fill:"none",stroke:"url(#roadAsphaltPattern)",strokeWidth:"56",strokeLinecap:"round"}),g.jsx("path",{d:"M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300",fill:"none",stroke:"url(#roadGlowGradient)",strokeWidth:"50",strokeLinecap:"round",opacity:"0.25"}),g.jsx("path",{d:"M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300",fill:"none",stroke:s.border,strokeWidth:"4",strokeLinecap:"round"}),g.jsx("path",{d:"M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300",fill:"none",stroke:"#ffffff",strokeWidth:"3",strokeDasharray:"14 14",opacity:"0.9"})]}),t.levels.map((a,o)=>{const l=o%2===0;return g.jsxs("div",{className:`relative z-10 flex items-center justify-between w-full max-w-2xl px-4 ${l?"flex-row":"flex-row-reverse"}`,children:[g.jsxs("div",{onClick:()=>i(a),className:`w-80 p-5 rounded-3xl glass-card cursor-pointer group relative overflow-hidden transition-all duration-300 ${a.status==="locked"?"opacity-60 grayscale cursor-not-allowed border-slate-800":a.status==="current"?"border-2 border-amber-400/80 shadow-2xl shadow-amber-500/20 scale-[1.02]":"border-slate-700/80 hover:border-emerald-500/60"}`,children:[g.jsxs("div",{className:"flex items-center justify-between gap-2 mb-2",children:[g.jsxs("span",{className:"text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700 flex items-center gap-1",children:[g.jsx(hT,{className:"w-3 h-3 text-emerald-400"}),a.era]}),g.jsx("span",{className:"text-[10px] text-slate-400 font-semibold",children:a.date})]}),g.jsxs("h4",{className:"text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors",children:["Level ",a.levelNumber,": ",a.title]}),g.jsx("p",{className:"text-xs text-slate-300 line-clamp-2 mt-1 font-medium",children:a.matchDetails}),g.jsxs("div",{className:"flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80",children:[g.jsx("div",{className:"flex items-center gap-1",children:[1,2,3].map(c=>g.jsx(rx,{className:`w-3.5 h-3.5 ${c<=a.stars?"text-amber-400 fill-amber-400":"text-slate-700"}`},c))}),g.jsxs("div",{className:"flex items-center gap-1.5 text-xs font-bold",children:[a.status==="completed"&&g.jsxs("span",{className:"flex items-center gap-1 text-emerald-400",children:[g.jsx(cT,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Passed"})]}),a.status==="current"&&g.jsxs("span",{className:"flex items-center gap-1 text-amber-400 animate-pulse",children:[g.jsx(RT,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Active Stage"})]}),a.status==="locked"&&g.jsxs("span",{className:"flex items-center gap-1 text-slate-500",children:[g.jsx(sd,{className:"w-3.5 h-3.5"}),g.jsx("span",{children:"Locked"})]})]})]})]}),g.jsxs("div",{className:"relative flex flex-col items-center",children:[g.jsx("div",{onClick:()=>i(a),className:`hero-level-node z-20 w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer font-black text-xl shadow-2xl transition-all border-4 ${a.status==="locked"?"bg-slate-950 border-slate-800 text-slate-600":a.status==="current"?"bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-yellow-200 text-slate-950 shadow-amber-500/70 animate-bounce":"bg-gradient-to-tr from-emerald-500 via-teal-400 to-green-300 border-emerald-200 text-slate-950 shadow-emerald-500/60"}`,children:a.status==="locked"?g.jsx(sd,{className:"w-7 h-7 text-slate-600"}):g.jsxs(g.Fragment,{children:[g.jsx("span",{className:"text-2xl leading-none",children:a.levelNumber}),g.jsx("span",{className:"text-[9px] uppercase tracking-wider font-extrabold opacity-80",children:"Level"})]})}),g.jsxs("span",{className:"mt-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-black border border-slate-800 shadow-md",children:["STAGE ",a.levelNumber]})]}),g.jsx("div",{className:"w-80 hidden md:block"})]},a.id)})]}),g.jsx("div",{className:"mt-16 text-center z-10",children:g.jsxs("button",{onClick:n,className:"px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto",children:[g.jsx(Hl,{className:"w-5 h-5"}),g.jsx("span",{children:"Unlock & Extend Ground Road"})]})})]})]})}function IT({level:t,onClose:e,onOpenAIChatForEra:n}){var i;return t?g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn",children:g.jsxs("div",{className:"relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col",children:[g.jsxs("div",{className:"p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-500/30",children:t.levelNumber}),g.jsxs("div",{children:[g.jsx("span",{className:"text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",children:t.era}),g.jsx("h3",{className:"text-xl font-extrabold text-white mt-0.5",children:t.title})]})]}),g.jsx("button",{onClick:e,className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",children:g.jsx(Rr,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"p-6 overflow-y-auto space-y-6 flex-1",children:[t.media&&g.jsxs("div",{className:"relative w-full h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group",children:[g.jsx("img",{src:t.media,alt:t.title,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"}),g.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"}),g.jsxs("div",{className:"absolute bottom-3 left-4 flex items-center gap-2 text-xs text-slate-300 font-semibold",children:[g.jsx(gT,{className:"w-4 h-4 text-emerald-400"}),g.jsx("span",{children:"Media Asset Attached"})]})]}),g.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-3",children:[g.jsxs("div",{className:"p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800",children:[g.jsx("span",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-wider block",children:"Date"}),g.jsxs("span",{className:"text-sm font-extrabold text-white flex items-center gap-1.5 mt-1",children:[g.jsx(lT,{className:"w-4 h-4 text-emerald-400"}),t.date]})]}),g.jsxs("div",{className:"p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800",children:[g.jsx("span",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-wider block",children:"Star Rating"}),g.jsx("div",{className:"flex items-center gap-1 mt-1",children:[1,2,3].map(r=>g.jsx(rx,{className:`w-4 h-4 ${r<=t.stars?"text-amber-400 fill-amber-400":"text-slate-700"}`},r))})]}),g.jsxs("div",{className:"p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1",children:[g.jsx("span",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-wider block",children:"Sentiment"}),g.jsxs("span",{className:`text-sm font-extrabold flex items-center gap-1.5 mt-1 ${t.sentiment>=0?"text-emerald-400":"text-red-400"}`,children:[g.jsx(hf,{className:"w-4 h-4"}),t.sentiment>=0?`Positive (+${t.sentiment})`:`Challenging (${t.sentiment})`]})]})]}),g.jsxs("div",{className:"p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80",children:[g.jsx("h4",{className:"text-xs font-bold text-slate-400 uppercase tracking-wider mb-2",children:"Memory Journal Log"}),g.jsxs("p",{className:"text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal",children:['"',t.content,'"']})]}),g.jsxs("div",{children:[g.jsx("h4",{className:"text-xs font-bold text-slate-400 uppercase tracking-wider mb-2",children:"Context & Emotion Tags"}),g.jsx("div",{className:"flex flex-wrap gap-2",children:(i=t.tags)==null?void 0:i.map(r=>g.jsxs("span",{className:"flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold border border-slate-800",children:[g.jsx(TT,{className:"w-3 h-3 text-emerald-400"}),"#",r]},r))})]})]}),g.jsx("div",{className:"p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4",children:g.jsxs("button",{onClick:()=>{e(),n(t.era)},className:"flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]",children:[g.jsx(ua,{className:"w-4 h-4"}),g.jsxs("span",{children:["Chat with AI Younger Self (",t.era,")"]})]})})]})}):null}function UT({onClose:t,onAddLevel:e,currentSport:n}){const[i,r]=be.useState(""),[s,a]=be.useState("Youth Era (2018-2020)"),[o,l]=be.useState(new Date().toISOString().split("T")[0]),[c,d]=be.useState(""),[f,h]=be.useState(""),[x,_]=be.useState(""),[S,p]=be.useState(3),[u,v]=be.useState("Victory, MatchWinner, Championship"),[m,M]=be.useState("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"),[R,T]=be.useState(!1),w=async O=>{const y=O.target.files[0];if(!y)return;T(!0);const A=new FormData;A.append("media",y);try{const Z=await(await fetch("http://localhost:5000/api/upload",{method:"POST",body:A})).json();Z.url&&M(Z.url)}catch(V){console.error("File Upload Error:",V)}finally{T(!1)}},N=O=>{if(O.preventDefault(),!i.trim()||!f.trim())return;const y=x?`${f}

🏆 VICTORY NOTE: "${x}"`:f,A={title:i,era:s,date:o,matchDetails:c||i,content:y,victoryMessage:x,stars:Number(S),tags:u.split(",").map(V=>V.trim()).filter(Boolean),mediaUrl:m||null,sentiment:.95};e(A),t()};return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn",children:g.jsxs("div",{className:"relative w-full max-w-xl glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col",children:[g.jsxs("div",{className:"p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30",children:g.jsx(mf,{className:"w-6 h-6"})}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-lg font-black text-white",children:"Log Victory Milestone & Ground Image"}),g.jsx("p",{className:"text-xs text-slate-400",children:"AI Younger Self automatically ingests and learns your victory note"})]})]}),g.jsx("button",{onClick:t,className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",children:g.jsx(Rr,{className:"w-5 h-5"})})]}),g.jsxs("form",{onSubmit:N,className:"p-6 overflow-y-auto space-y-4 flex-1",children:[g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5",children:"Milestone / Match Victory Title"}),g.jsx("input",{type:"text",required:!0,placeholder:"e.g. Scored Match Winning Goal in League Final",value:i,onChange:O=>r(O.target.value),className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"})]}),g.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5",children:"Conversation Era"}),g.jsxs("select",{value:s,onChange:O=>a(O.target.value),className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none",children:[g.jsx("option",{value:"Youth Era (2018-2020)",children:"Youth Era (2018-2020)"}),g.jsx("option",{value:"Pro Debut Era (2021-2023)",children:"Pro Debut Era (2021-2023)"}),g.jsx("option",{value:"Championship Era (2024+)",children:"Championship Era (2024+)"})]})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5",children:"Date"}),g.jsx("input",{type:"date",value:o,onChange:O=>l(O.target.value),className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"})]})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5",children:"Match Details / Score Summary"}),g.jsx("input",{type:"text",placeholder:"e.g. 2 Goals, 1 Assist | Final Score 3-2",value:c,onChange:O=>d(O.target.value),className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"})]}),g.jsxs("div",{children:[g.jsxs("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-emerald-400",children:[g.jsx(yT,{className:"w-4 h-4"}),g.jsx("span",{children:"Victory Message & Personal Note (AI Ingested)"})]}),g.jsx("input",{type:"text",placeholder:"e.g. Dedicated this victory to my family and academy coaches who believed in me!",value:x,onChange:O=>_(O.target.value),className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none"})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5",children:"Full Memory Journal Entry"}),g.jsx("textarea",{required:!0,rows:3,placeholder:"Write what happened during the match, the stadium environment, and your reflections...",value:f,onChange:O=>h(O.target.value),className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5",children:"Upload Ground Photo / Match Image"}),g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsxs("label",{className:"flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-all border border-slate-700",children:[g.jsx(AT,{className:"w-4 h-4 text-emerald-400"}),g.jsx("span",{children:R?"Uploading...":"Upload Image File"}),g.jsx("input",{type:"file",accept:"image/*",onChange:w,className:"hidden"})]}),g.jsx("span",{className:"text-xs text-slate-500 font-bold",children:"OR URL:"}),g.jsx("input",{type:"text",placeholder:"https://images.unsplash.com/...",value:m,onChange:O=>M(O.target.value),className:"flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none"})]}),m&&g.jsx("div",{className:"mt-2.5 relative w-full h-24 rounded-2xl overflow-hidden border border-slate-800",children:g.jsx("img",{src:m,alt:"Match Preview",className:"w-full h-full object-cover"})})]}),g.jsxs("div",{className:"pt-4 flex justify-end gap-3 border-t border-slate-800",children:[g.jsx("button",{type:"button",onClick:t,className:"px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all",children:"Cancel"}),g.jsxs("button",{type:"submit",className:"px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2",children:[g.jsx(MT,{className:"w-4 h-4"}),g.jsx("span",{children:"Save & Train AI"})]})]})]})]})})}function FT({initialEra:t="Youth Era (2018-2020)",onClose:e,levels:n=[],currentUser:i}){const[r,s]=be.useState(t),[a,o]=be.useState([{id:1,sender:"ai",text:`Hey! I'm your AI Younger Self from the ${t}. I remember tying my boots before the academy trials and dreaming of making it big. What's on your mind today?`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]),[l,c]=be.useState(""),[d,f]=be.useState(!1),[h,x]=be.useState("connecting"),_=be.useRef(null);be.useEffect(()=>{var u;(u=_.current)==null||u.scrollIntoView({behavior:"smooth"})},[a,d]),be.useEffect(()=>{fetch("http://localhost:5000/api/memories/test-connection").then(()=>x("connected")).catch(()=>x("fallback"))},[]);const S=u=>{s(u);const v={id:Date.now(),sender:"ai",text:`Switched era to ${u}! I'm locked in with your memories logged during this period. Ask me about our training, match feelings, or how we handled pressure back then!`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};o(m=>[...m,v])},p=async u=>{if(u.preventDefault(),!l.trim()||d)return;const v={id:Date.now(),sender:"user",text:l,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})};o(M=>[...M,v]);const m=l;c(""),f(!0);try{const T=(await(await fetch("http://localhost:5000/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:(i==null?void 0:i.id)||"",era:r,userMessage:m})})).json()).response||"I remember working hard every single day. We never gave up!";o(w=>[...w,{id:Date.now()+1,sender:"ai",text:T,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}])}catch{o(R=>[...R,{id:Date.now()+1,sender:"ai",text:`I'm right here with you! During ${r}, our focus was 100% on grinding and improving every single day.`,timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}])}finally{f(!1)}};return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn",children:g.jsxs("div",{className:"relative w-full max-w-2xl h-[620px] glass-panel rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-950/50 flex flex-col overflow-hidden",children:[g.jsxs("div",{className:"p-4 md:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30",children:g.jsx(ua,{className:"w-6 h-6 animate-pulse"})}),g.jsxs("div",{children:[g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("h3",{className:"text-lg font-black text-white",children:"AI Younger Self Chat"}),g.jsxs("span",{className:"flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40",children:[g.jsx(fT,{className:"w-3 h-3"}),h==="connected"?"Ollama Llama3 (Live)":"Persona Engine"]})]}),g.jsx("p",{className:"text-xs text-slate-400",children:"Conversational Era Persona Grounded on Logged Memories"})]})]}),g.jsx("button",{onClick:e,className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",children:g.jsx(Rr,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"px-5 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-xs",children:[g.jsx("span",{className:"text-slate-400 font-semibold",children:"Active Era Persona:"}),g.jsxs("select",{value:r,onChange:u=>S(u.target.value),className:"px-3 py-1 rounded-xl bg-slate-950 border border-slate-700 text-purple-300 font-bold focus:outline-none focus:border-purple-400",children:[g.jsx("option",{value:"Youth Era (2018-2020)",children:"Youth Era (2018-2020)"}),g.jsx("option",{value:"Pro Debut Era (2021-2023)",children:"Pro Debut Era (2021-2023)"}),g.jsx("option",{value:"Championship Era (2024+)",children:"Championship Era (2024+)"})]})]}),g.jsxs("div",{className:"flex-1 p-5 overflow-y-auto space-y-4",children:[a.map(u=>g.jsxs("div",{className:`flex items-start gap-3 ${u.sender==="user"?"flex-row-reverse":"flex-row"}`,children:[g.jsx("div",{className:`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${u.sender==="user"?"bg-emerald-500 text-slate-950":"bg-purple-600 text-white"}`,children:u.sender==="user"?g.jsx(Gl,{className:"w-4 h-4"}):g.jsx(ua,{className:"w-4 h-4"})}),g.jsxs("div",{className:`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${u.sender==="user"?"bg-emerald-600 text-white rounded-tr-none":"bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md"}`,children:[g.jsx("p",{className:"font-normal whitespace-pre-wrap",children:u.text}),g.jsx("span",{className:"text-[9px] text-slate-400 font-medium block mt-1.5 text-right",children:u.timestamp})]})]},u.id)),d&&g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center",children:g.jsx(ua,{className:"w-4 h-4 animate-spin"})}),g.jsxs("div",{className:"p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-purple-300 flex items-center gap-2",children:[g.jsx(Hl,{className:"w-3.5 h-3.5 animate-bounce"}),g.jsxs("span",{children:["Thinking back to ",r,"..."]})]})]}),g.jsx("div",{ref:_})]}),g.jsxs("form",{onSubmit:p,className:"p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2",children:[g.jsx("input",{type:"text",placeholder:`Ask your younger self about ${r}...`,value:l,onChange:u=>c(u.target.value),className:"flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-purple-500 focus:outline-none"}),g.jsx("button",{type:"submit",disabled:!l.trim()||d,className:"p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white disabled:opacity-50 transition-all shadow-md shadow-purple-950/40",children:g.jsx(wT,{className:"w-4 h-4"})})]})]})})}function kT({onClose:t,onInspectUser:e}){const[n,i]=be.useState(PT),[r,s]=be.useState(""),[a,o]=be.useState("connections"),l=h=>{i(x=>x.map(_=>_.id===h?{..._,status:"accepted"}:_))},c=h=>{i(x=>x.filter(_=>_.id!==h))},d=n.filter(h=>h.status==="pending"),f=n.filter(h=>h.status==="accepted");return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn",children:g.jsxs("div",{className:"relative w-full max-w-xl h-[560px] glass-panel rounded-3xl border border-blue-500/40 shadow-2xl shadow-blue-950/40 flex flex-col overflow-hidden",children:[g.jsxs("div",{className:"p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30",children:g.jsx(sx,{className:"w-5 h-5"})}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-lg font-black text-white",children:"Athlete Connections & Follows"}),g.jsx("p",{className:"text-xs text-slate-400",children:"Share timeline levels with teammates & competitors"})]})]}),g.jsx("button",{onClick:t,className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",children:g.jsx(Rr,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"p-4 bg-slate-900/60 border-b border-slate-800 space-y-3",children:[g.jsxs("div",{className:"relative",children:[g.jsx(ET,{className:"w-4 h-4 text-slate-500 absolute left-3.5 top-3"}),g.jsx("input",{type:"text",placeholder:"Search athletes by name or username...",value:r,onChange:h=>s(h.target.value),className:"w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"})]}),g.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[g.jsxs("button",{onClick:()=>o("connections"),className:`px-3.5 py-1.5 rounded-xl font-bold transition-all ${a==="connections"?"bg-blue-500 text-slate-950 shadow-md shadow-blue-500/30":"text-slate-400 hover:bg-slate-800"}`,children:["Following (",f.length,")"]}),g.jsxs("button",{onClick:()=>o("requests"),className:`px-3.5 py-1.5 rounded-xl font-bold transition-all relative ${a==="requests"?"bg-blue-500 text-slate-950 shadow-md shadow-blue-500/30":"text-slate-400 hover:bg-slate-800"}`,children:["Requests (",d.length,")",d.length>0&&g.jsx("span",{className:"ml-1.5 px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[9px] font-black",children:d.length})]})]})]}),g.jsxs("div",{className:"flex-1 p-4 overflow-y-auto space-y-3",children:[a==="connections"&&g.jsx(g.Fragment,{children:f.length===0?g.jsx("p",{className:"text-xs text-slate-400 text-center py-8",children:"No connections yet."}):f.map(h=>g.jsxs("div",{className:"p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-all",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("img",{src:h.avatar,alt:h.name,className:"w-10 h-10 rounded-xl object-cover border border-slate-700"}),g.jsxs("div",{children:[g.jsx("h4",{className:"text-xs font-black text-white",children:h.name}),g.jsx("p",{className:"text-[10px] text-blue-400 font-semibold",children:h.role}),g.jsx("span",{className:"text-[10px] text-slate-400 block mt-0.5",children:h.recentMilestone})]})]}),g.jsxs("button",{onClick:()=>e(h),className:"flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold text-xs transition-all",children:[g.jsx("span",{children:"View Map"}),g.jsx(dT,{className:"w-3.5 h-3.5"})]})]},h.id))}),a==="requests"&&g.jsx(g.Fragment,{children:d.length===0?g.jsx("p",{className:"text-xs text-slate-400 text-center py-8",children:"No pending follow requests."}):d.map(h=>g.jsxs("div",{className:"p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("img",{src:h.avatar,alt:h.name,className:"w-10 h-10 rounded-xl object-cover border border-slate-700"}),g.jsxs("div",{children:[g.jsx("h4",{className:"text-xs font-black text-white",children:h.name}),g.jsx("p",{className:"text-[10px] text-blue-400 font-semibold",children:h.role})]})]}),g.jsxs("div",{className:"flex items-center gap-2",children:[g.jsx("button",{onClick:()=>l(h.id),className:"p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all",title:"Accept Follow Request",children:g.jsx(uT,{className:"w-4 h-4"})}),g.jsx("button",{onClick:()=>c(h.id),className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",title:"Decline",children:g.jsx(Rr,{className:"w-4 h-4"})})]})]},h.id))})]})]})})}function OT({onClose:t,profile:e}){return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn",children:g.jsxs("div",{className:"relative w-full max-w-xl glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 flex flex-col overflow-hidden",children:[g.jsxs("div",{className:"p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30",children:g.jsx(hf,{className:"w-5 h-5"})}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-lg font-black text-white",children:"Mental Wellness & Sentiment Insights"}),g.jsx("p",{className:"text-xs text-slate-400",children:"Derived from sentiment analysis of your logged memories"})]})]}),g.jsx("button",{onClick:t,className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",children:g.jsx(Rr,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"p-6 space-y-6 overflow-y-auto",children:[g.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[g.jsxs("div",{className:"p-4 rounded-2xl bg-slate-900/80 border border-slate-800",children:[g.jsx("span",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-wider block",children:"Average Sentiment"}),g.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[g.jsx("span",{className:"text-2xl font-black text-emerald-400",children:"+0.88"}),g.jsx("span",{className:"text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold",children:"Positive"})]})]}),g.jsxs("div",{className:"p-4 rounded-2xl bg-slate-900/80 border border-slate-800",children:[g.jsx("span",{className:"text-[10px] text-slate-400 font-bold uppercase tracking-wider block",children:"Mental Resilience"}),g.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[g.jsx("span",{className:"text-2xl font-black text-cyan-400",children:"96%"}),g.jsx("span",{className:"text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold",children:"High"})]})]})]}),g.jsxs("div",{className:"p-4 rounded-2xl bg-slate-900/60 border border-slate-800",children:[g.jsxs("h4",{className:"text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5",children:[g.jsx(bT,{className:"w-4 h-4 text-emerald-400"}),g.jsx("span",{children:"Career Sentiment Curve Across Eras"})]}),g.jsxs("div",{className:"space-y-3",children:[g.jsxs("div",{children:[g.jsxs("div",{className:"flex justify-between text-xs font-semibold mb-1",children:[g.jsx("span",{className:"text-slate-300",children:"Youth Academy Era (2018-2020)"}),g.jsx("span",{className:"text-emerald-400",children:"+0.85 (High Hope)"})]}),g.jsx("div",{className:"w-full h-2.5 rounded-full bg-slate-800 overflow-hidden",children:g.jsx("div",{className:"h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[85%]"})})]}),g.jsxs("div",{children:[g.jsxs("div",{className:"flex justify-between text-xs font-semibold mb-1",children:[g.jsx("span",{className:"text-slate-300",children:"Pro Debut & Injury Recovery (2021-2023)"}),g.jsx("span",{className:"text-amber-400",children:"+0.68 (Resilient Recovery)"})]}),g.jsx("div",{className:"w-full h-2.5 rounded-full bg-slate-800 overflow-hidden",children:g.jsx("div",{className:"h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[68%]"})})]}),g.jsxs("div",{children:[g.jsxs("div",{className:"flex justify-between text-xs font-semibold mb-1",children:[g.jsx("span",{className:"text-slate-300",children:"Championship Winner Era (2024+)"}),g.jsx("span",{className:"text-emerald-400",children:"+0.96 (Peak Fulfillment)"})]}),g.jsx("div",{className:"w-full h-2.5 rounded-full bg-slate-800 overflow-hidden",children:g.jsx("div",{className:"h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full w-[96%]"})})]})]})]}),g.jsxs("div",{className:"p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3",children:[g.jsx(pT,{className:"w-5 h-5 text-emerald-400 shrink-0 mt-0.5"}),g.jsxs("div",{children:[g.jsx("h5",{className:"text-xs font-black text-emerald-300",children:"Emotional Resilience Highlight"}),g.jsx("p",{className:"text-xs text-slate-300 mt-1 leading-relaxed",children:"Your memory logs show incredible mental fortitude during your 2021 knee rehab period. The transition from frustration to your comeback hattrick reflects a 40% increase in emotional drive."})]})]})]})]})})}function zT({onClose:t,onAuthSuccess:e}){const[n,i]=be.useState(!0),[r,s]=be.useState(""),[a,o]=be.useState(""),[l,c]=be.useState(""),[d,f]=be.useState("Athlete"),[h,x]=be.useState("football"),[_,S]=be.useState("Central Attacking Midfielder (#10)"),[p,u]=be.useState("Legacy Lane Academy XI"),[v,m]=be.useState(""),[M,R]=be.useState(!1),T=async()=>{m(""),R(!0);try{const y=await fetch("http://localhost:5000/api/auth/google",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a||"karan.sharma.athlete@gmail.com",name:r||"Karan Sharma",sportType:h,position:_,teamHistory:p})}),A=await y.json();if(!y.ok){m(A.error||"Google Authentication failed."),R(!1);return}e(A.user),t()}catch{m("Cannot connect to Google Authentication service.")}finally{R(!1)}},w=async N=>{N.preventDefault(),m(""),R(!0);try{if(n){const O=await fetch("http://localhost:5000/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a,password:l})}),y=await O.json();if(!O.ok){m(y.error||"Login failed."),R(!1);return}e(y.user),t()}else{const O=await fetch("http://localhost:5000/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r,email:a,password:l,profileType:d,sportType:h,position:_,teamHistory:p})}),y=await O.json();if(!O.ok){m(y.error||"Account creation failed."),R(!1);return}e(y.user),t()}}catch{m("Cannot connect to database backend API.")}finally{R(!1)}};return g.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn",children:g.jsxs("div",{className:"relative w-full max-w-lg glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col",children:[g.jsxs("div",{className:"p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30",children:g.jsx(mf,{className:"w-6 h-6"})}),g.jsxs("div",{children:[g.jsx("h3",{className:"text-xl font-black text-white",children:n?"Welcome Back":"Create LegacyLane Account"}),g.jsx("p",{className:"text-xs text-slate-400",children:n?"Sign in to access your 3D career roadmap":"Register your athlete passion & customize your 3D ground"})]})]}),g.jsx("button",{onClick:t,className:"p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all",children:g.jsx(Rr,{className:"w-5 h-5"})})]}),g.jsxs("div",{className:"flex border-b border-slate-800 bg-slate-950/60 p-1",children:[g.jsxs("button",{onClick:()=>i(!0),className:`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 ${n?"bg-emerald-500 text-slate-950 shadow-md":"text-slate-400 hover:text-white"}`,children:[g.jsx(pf,{className:"w-4 h-4"}),g.jsx("span",{children:"Sign In"})]}),g.jsxs("button",{onClick:()=>i(!1),className:`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 ${n?"text-slate-400 hover:text-white":"bg-emerald-500 text-slate-950 shadow-md"}`,children:[g.jsx(CT,{className:"w-4 h-4"}),g.jsx("span",{children:"Create Account"})]})]}),g.jsxs("form",{onSubmit:w,className:"p-6 overflow-y-auto space-y-4 max-h-[75vh]",children:[v&&g.jsx("div",{className:"p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold",children:v}),g.jsxs("button",{type:"button",onClick:T,disabled:M,className:"w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] border border-slate-200",children:[g.jsxs("svg",{className:"w-5 h-5",viewBox:"0 0 24 24",children:[g.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),g.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),g.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"}),g.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"})]}),g.jsx("span",{children:"Continue with Google"})]}),g.jsxs("div",{className:"relative flex py-1 items-center",children:[g.jsx("div",{className:"flex-grow border-t border-slate-800"}),g.jsx("span",{className:"flex-shrink mx-4 text-slate-500 text-[10px] uppercase font-bold tracking-wider",children:"or sign in with email"}),g.jsx("div",{className:"flex-grow border-t border-slate-800"})]}),!n&&g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1",children:"Full Name"}),g.jsxs("div",{className:"relative",children:[g.jsx(Gl,{className:"w-4 h-4 text-slate-500 absolute left-3.5 top-3"}),g.jsx("input",{type:"text",required:!0,placeholder:"Karan Sharma",value:r,onChange:N=>s(N.target.value),className:"w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"})]})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1",children:"Email Address"}),g.jsxs("div",{className:"relative",children:[g.jsx(vT,{className:"w-4 h-4 text-slate-500 absolute left-3.5 top-3"}),g.jsx("input",{type:"email",required:!0,placeholder:"karan@legacylane.com",value:a,onChange:N=>o(N.target.value),className:"w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"})]})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1",children:"Password"}),g.jsxs("div",{className:"relative",children:[g.jsx(sd,{className:"w-4 h-4 text-slate-500 absolute left-3.5 top-3"}),g.jsx("input",{type:"password",required:!0,placeholder:"••••••••",value:l,onChange:N=>c(N.target.value),className:"w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"})]})]}),!n&&g.jsxs("div",{className:"space-y-3 pt-2",children:[g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5",children:"Select Your Athlete Passion / Sport Ground"}),g.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[g.jsxs("button",{type:"button",onClick:()=>{x("football"),S("Central Attacking Midfielder (#10)")},className:`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${h==="football"?"bg-emerald-500/20 border-emerald-500 text-emerald-300":"bg-slate-900 border-slate-800 text-slate-400"}`,children:[g.jsx("span",{children:"⚽"})," Football Pitch"]}),g.jsxs("button",{type:"button",onClick:()=>{x("cricket"),S("Fast-Bowling All-Rounder (#7)")},className:`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${h==="cricket"?"bg-lime-500/20 border-lime-500 text-lime-300":"bg-slate-900 border-slate-800 text-slate-400"}`,children:[g.jsx("span",{children:"🏏"})," Cricket Ground"]})]})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1",children:"Player Position / Squad Role"}),g.jsx("input",{type:"text",value:_,onChange:N=>S(N.target.value),placeholder:"e.g. Attacking Midfielder (#10)",className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"})]}),g.jsxs("div",{children:[g.jsx("label",{className:"block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1",children:"Team / Academy Name"}),g.jsx("input",{type:"text",value:p,onChange:N=>u(N.target.value),placeholder:"e.g. City FC Youth Academy",className:"w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"})]})]}),g.jsxs("div",{className:"pt-4 border-t border-slate-800 flex justify-end gap-3",children:[g.jsx("button",{type:"button",onClick:t,className:"px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs",children:"Cancel"}),g.jsxs("button",{type:"submit",disabled:M,className:"px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2",children:[g.jsx(Hl,{className:"w-4 h-4"}),g.jsx("span",{children:n?"Sign In":"Create Account"})]})]})]})]})})}function BT({sport:t="football"}){const e=be.useRef(null);return be.useEffect(()=>{const n=e.current;if(!n)return;const i=new Qg,r=new rn(50,n.clientWidth/n.clientHeight,.1,1e3);r.position.set(0,3.8,11),r.lookAt(0,2.5,0);const s=new lf({alpha:!0,antialias:!0});s.setSize(n.clientWidth,n.clientHeight),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.appendChild(s.domElement);let a=1096065,o=3462041;t==="cricket"&&(a=8702998,o=10741301);const l=new nx(16777215,.7);i.add(l);const c=new iT(16777215,1.2);c.position.set(5,10,7),i.add(c);const d=new Ho(a,3,30,Math.PI/4,.5);d.position.set(-5,8,-5),i.add(d);const f=new us,h=new Bl(.7,24,24),x=new Ut({color:15979957,roughness:.5}),_=new Je(h,x);_.position.y=4.2,f.add(_);const S=new uf(.8,.8,16),p=new Ut({color:1973016,roughness:.8}),u=new Je(S,p);u.position.set(0,4.7,0),u.rotation.x=-.2,f.add(u);const v=new ci(.85,.75,2.2,16),m=new Ut({color:a,roughness:.3,metalness:.1}),M=new Je(v,m);M.position.y=2.7,f.add(M);const R=new hi(.6,.6),T=new Rs({color:16777215,side:mn}),w=new Je(R,T);w.position.set(0,2.8,.86),f.add(w);const N=new ci(.8,.85,.9,16),O=new Ut({color:988970}),y=new Je(N,O);y.position.y=1.45,f.add(y);const A=U=>{const W=new ci(.3,.25,1.4,12),ee=new Ut({color:15979957}),ne=new Je(W,ee);ne.position.set(U,.6,0);const ae=new ci(.31,.28,.8,12),le=new Ut({color:o}),Me=new Je(ae,le);Me.position.set(U,.4,0),f.add(Me);const ge=new Cr(.4,.3,.8),F=new Ut({color:132631}),je=new Je(ge,F);return je.position.set(U,.15,.15),f.add(je),ne};f.add(A(-.4)),f.add(A(.4));const V=new ci(.22,.2,1.5,12),Z=new Ut({color:15979957}),D=new Je(V,Z);D.position.set(-1.05,2.7,0),D.rotation.z=.3,f.add(D);const K=new Je(V,Z);K.position.set(1.05,2.7,0),K.rotation.z=-.3,f.add(K);let G;if(t==="football"){const U=new Ol(.7,2),W=new Ut({color:16777215,wireframe:!0});G=new Je(U,W),G.position.set(.9,.35,.6)}else{const U=new Cr(.3,1.8,.1),W=new Ut({color:13273604});G=new Je(U,W),G.position.set(1.1,1.8,.3),G.rotation.z=-.4}f.add(G);const te=new zl(1.8,2.2,32),I=new Rs({color:a,side:mn}),H=new Je(te,I);H.rotation.x=-Math.PI/2,H.position.y=.02,f.add(H),i.add(f);let P;const C=new ix,Y=()=>{P=requestAnimationFrame(Y);const U=C.getElapsedTime();f.rotation.y=Math.sin(U*.5)*.4,f.position.y=Math.sin(U*1.5)*.08,G&&t==="football"&&(G.rotation.y=U*1.2),s.render(i,r)};Y();const re=()=>{n&&(r.aspect=n.clientWidth/n.clientHeight,r.updateProjectionMatrix(),s.setSize(n.clientWidth,n.clientHeight))};return window.addEventListener("resize",re),()=>{cancelAnimationFrame(P),window.removeEventListener("resize",re),n.contains(s.domElement)&&n.removeChild(s.domElement),s.dispose()}},[t]),g.jsxs("div",{className:"relative w-full h-[380px] rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl flex items-center justify-center my-6",children:[g.jsx("div",{ref:e,className:"w-full h-full"}),g.jsxs("div",{className:"absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 text-xs font-black text-white border border-slate-800 shadow-lg flex items-center gap-2",children:[g.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"}),g.jsxs("span",{children:["3D Score! Hero ",t==="football"?"Footballer":"Cricketer"," #10"]})]}),g.jsx("div",{className:"absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-extrabold border border-slate-800 shadow-md",children:"Dynamically Customized to Registered Athlete"})]})}function HT({onOpenAuthModal:t,currentUser:e,onEnterRoadmap:n}){const i=e?(e.sport||"football").toLowerCase():"football";return g.jsxs("div",{className:"min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans relative overflow-hidden",children:[g.jsx("div",{className:"absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none"}),g.jsxs("nav",{className:"w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20 relative",children:[g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsx("div",{className:"p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20",children:g.jsx(mf,{className:"w-6 h-6"})}),g.jsxs("div",{children:[g.jsx("h1",{className:"text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent",children:"LegacyLane"}),g.jsx("span",{className:"text-[10px] uppercase font-bold text-emerald-400 tracking-wider",children:"The One Who Lives"})]})]}),g.jsx("div",{className:"flex items-center gap-3",children:e?g.jsxs("div",{className:"flex items-center gap-3",children:[g.jsxs("div",{className:"px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold flex items-center gap-2",children:[g.jsx(Gl,{className:"w-4 h-4 text-emerald-400"}),g.jsxs("span",{children:[e.name," (",e.sport,")"]})]}),g.jsxs("button",{onClick:n,className:"px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2",children:[g.jsx("span",{children:"Enter My Ground Roadmap"}),g.jsx(oT,{className:"w-4 h-4"})]})]}):g.jsxs("button",{onClick:t,className:"px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2",children:[g.jsx(pf,{className:"w-4 h-4"}),g.jsx("span",{children:"Sign In / Create Account"})]})})]}),g.jsxs("main",{className:"flex-1 max-w-5xl mx-auto px-6 py-6 flex flex-col items-center justify-center text-center z-10 relative",children:[g.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold mb-4",children:[g.jsx(Hl,{className:"w-4 h-4"}),g.jsx("span",{children:"3D Score! Hero Character & AI Learning Ground Platform"})]}),g.jsx("h2",{className:"text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl leading-tight",children:"Talk to Your Younger Self Across Your Sports Ground Journey."}),g.jsx("p",{className:"text-xs sm:text-sm text-slate-300 max-w-xl mt-3 leading-relaxed font-normal",children:"Log victory notes and match images. Your AI Younger Self automatically learns from every update to converse about your past victories!"}),g.jsx("div",{className:"w-full max-w-3xl mt-6",children:g.jsx(BT,{sport:i})})]}),g.jsx("footer",{className:"w-full border-t border-slate-800/80 py-6 px-6 text-center text-xs text-slate-500 z-20 mt-auto",children:g.jsxs("p",{children:[g.jsx("span",{className:"font-bold text-slate-400",children:"LegacyLane: The One Who Lives"})," • SQLite Database & 3D Career Ground Platform"]})})]})}function GT(){const[t,e]=be.useState("home"),[n,i]=be.useState("football"),[r,s]=be.useState(ad),[a,o]=be.useState(null),[l,c]=be.useState(null),[d,f]=be.useState(!1),[h,x]=be.useState(!1),[_,S]=be.useState("Youth Era (2018-2020)"),[p,u]=be.useState(!1),[v,m]=be.useState(!1),[M,R]=be.useState(!1),T=r[n]||r.football,w=A=>{o(A);const V=(A.sport||"football").toLowerCase();["football","cricket","basketball","journaler"].includes(V)?i(V):i("football"),s(Z=>({...Z,[V||"football"]:{...Z[V||"football"],name:A.name,position:A.position||Z[V||"football"].position,team:A.team||Z[V||"football"].team}})),e("ground")},N=()=>{o(null),e("home")},O=async A=>{if(a)try{await fetch("http://localhost:5000/api/memories",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:a.id,...A})})}catch(V){console.error("Failed to sync memory to SQLite backend:",V)}s(V=>{const Z=V[n],D=Z.levels.length+1,K={...A,id:Date.now(),levelNumber:D,status:"completed",media:A.mediaUrl||A.media};return{...V,[n]:{...Z,levels:[...Z.levels,K]}}})},y=A=>{S(A),x(!0)};return g.jsxs("div",{className:"relative min-h-screen bg-[#070a12] text-slate-100 selection:bg-emerald-500 selection:text-black flex flex-col font-sans",children:[t==="home"?g.jsx(HT,{onEnterRoadmap:()=>e("ground"),onSelectSport:A=>{i(A),e("ground")},onOpenAuthModal:()=>R(!1)||R(!0),currentUser:a,onOpenAIChat:()=>x(!0),onOpenFollowModal:()=>u(!0),onOpenSentimentModal:()=>m(!0)}):g.jsxs(g.Fragment,{children:[g.jsx(rT,{sport:n}),g.jsx(LT,{activeSport:n,onSportChange:i,currentUser:a,onOpenAuthModal:()=>R(!0),onLogout:N,onOpenAIChat:()=>x(!0),onOpenFollowModal:()=>u(!0),onOpenSentimentModal:()=>m(!0),onOpenAddLevelModal:()=>f(!0),onGoHome:()=>e("home")}),g.jsx("main",{className:"flex-1 relative z-10",children:g.jsx(DT,{profile:T,onSelectLevel:c,onAddLevelClick:()=>f(!0)})}),g.jsx("footer",{className:"relative z-10 border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500 glass-panel mt-auto",children:g.jsxs("p",{children:[g.jsx("span",{className:"font-bold text-slate-400",children:"LegacyLane: The One Who Lives"})," • SQLite Database & Dynamic 3D Career Ground Platform"]})})]}),l&&g.jsx(IT,{level:l,onClose:()=>c(null),onOpenAIChatForEra:y}),d&&g.jsx(UT,{onClose:()=>f(!1),onAddLevel:O,currentSport:n}),h&&g.jsx(FT,{initialEra:_,onClose:()=>x(!1),levels:T.levels,currentUser:a}),p&&g.jsx(kT,{onClose:()=>u(!1),onInspectUser:A=>{alert(`Inspecting ${A.name}'s Timeline Roadmap...`),u(!1)}}),v&&g.jsx(OT,{onClose:()=>m(!1),profile:T}),M&&g.jsx(zT,{onClose:()=>R(!1),onAuthSuccess:w})]})}tu.createRoot(document.getElementById("root")).render(g.jsx(Ax.StrictMode,{children:g.jsx(GT,{})}));

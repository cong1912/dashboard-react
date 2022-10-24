"use strict";(self.webpackChunktokyo_free_white_react_admin_dashboard=self.webpackChunktokyo_free_white_react_admin_dashboard||[]).push([[762],{77762:function(e,t,s){s.r(t);s(72791);var a=s(61889),n=s(48550),r=s(36151),i=s(94026),c=s(20269),o=s(56225),l=s(80184),u=(0,o.Z)((function(e){return{root:{"& .MuiFormControl-root":{width:"100%"}}}}));t.default=function(e){var t=e.handleSubmitForm,s=e.name,o=e.setName,d=e.description,f=e.setDescription,h=e.requesting,m=e.handleClose,v=u();return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("form",{className:v.root,onSubmit:t,children:[(0,l.jsx)(i.Z,{children:(0,l.jsxs)(a.ZP,{container:!0,spacing:2,children:[(0,l.jsx)(a.ZP,{item:!0,xs:12,children:(0,l.jsx)(n.Z,{variant:"outlined",label:"Name",name:"name",onChange:function(e){return o(e.target.value)},value:s})}),(0,l.jsx)(a.ZP,{item:!0,xs:12,children:(0,l.jsx)(n.Z,{label:"Description",multiline:!0,rows:5,name:"description",value:d,onChange:function(e){return f(e.target.value)}})})]})}),(0,l.jsxs)(c.Z,{children:[(0,l.jsx)(r.Z,{color:"primary",size:"large",type:"submit",disabled:h,children:"Submit"}),(0,l.jsx)(r.Z,{onClick:m,children:"Cancel"})]})]})})}},20269:function(e,t,s){var a=s(87462),n=s(45987),r=s(72791),i=s(28182),c=s(74561),o=r.forwardRef((function(e,t){var s=e.disableSpacing,c=void 0!==s&&s,o=e.classes,l=e.className,u=(0,n.Z)(e,["disableSpacing","classes","className"]);return r.createElement("div",(0,a.Z)({className:(0,i.Z)(o.root,l,!c&&o.spacing),ref:t},u))}));t.Z=(0,c.Z)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiDialogActions"})(o)},94026:function(e,t,s){var a=s(87462),n=s(45987),r=s(72791),i=s(28182),c=s(74561),o=r.forwardRef((function(e,t){var s=e.classes,c=e.className,o=e.dividers,l=void 0!==o&&o,u=(0,n.Z)(e,["classes","className","dividers"]);return r.createElement("div",(0,a.Z)({className:(0,i.Z)(s.root,c,l&&s.dividers),ref:t},u))}));t.Z=(0,c.Z)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(o)},56225:function(e,t,s){s.d(t,{Z:function(){return w}});var a=s(63366),n=s(87462),r=s(72791),i=s(50931);function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.baseClasses,s=e.newClasses;e.Component;if(!s)return t;var a=(0,n.Z)({},t);return Object.keys(s).forEach((function(e){s[e]&&(a[e]="".concat(t[e]," ").concat(s[e]))})),a}var o={set:function(e,t,s,a){var n=e.get(t);n||(n=new Map,e.set(t,n)),n.set(s,a)},get:function(e,t,s){var a=e.get(t);return a?a.get(s):void 0},delete:function(e,t,s){e.get(t).delete(s)}},l=s(29598),u=s(11670),d=-1e9;function f(){return d+=1}var h=s(82466),m=s(27312),v=["variant"];function p(e){return 0===e.length}function y(e){var t="function"===typeof e;return{create:function(s,r){var i;try{i=t?e(s):e}catch(u){throw u}if(!r||!s.components||!s.components[r]||!s.components[r].styleOverrides&&!s.components[r].variants)return i;var c=s.components[r].styleOverrides||{},o=s.components[r].variants||[],l=(0,n.Z)({},i);return Object.keys(c).forEach((function(e){l[e]=(0,h.Z)(l[e]||{},c[e])})),o.forEach((function(e){var t=function(e){var t=e.variant,s=(0,a.Z)(e,v),n=t||"";return Object.keys(s).sort().forEach((function(t){n+="color"===t?p(n)?e[t]:(0,m.Z)(e[t]):"".concat(p(n)?t:(0,m.Z)(t)).concat((0,m.Z)(e[t].toString()))})),n}(e.props);l[t]=(0,h.Z)(l[t]||{},e.style)})),l},options:{}}}var g={},S=["name","classNamePrefix","Component","defaultTheme"];function C(e,t,s){var a=e.state;if(e.stylesOptions.disableGeneration)return t||{};a.cacheClasses||(a.cacheClasses={value:null,lastProp:null,lastJSS:{}});var n=!1;return a.classes!==a.cacheClasses.lastJSS&&(a.cacheClasses.lastJSS=a.classes,n=!0),t!==a.cacheClasses.lastProp&&(a.cacheClasses.lastProp=t,n=!0),n&&(a.cacheClasses.value=c({baseClasses:a.cacheClasses.lastJSS,newClasses:t,Component:s})),a.cacheClasses.value}function Z(e,t){var s=e.state,a=e.theme,r=e.stylesOptions,l=e.stylesCreator,u=e.name;if(!r.disableGeneration){var d=o.get(r.sheetsManager,l,a);d||(d={refs:0,staticSheet:null,dynamicStyles:null},o.set(r.sheetsManager,l,a,d));var f=(0,n.Z)({},l.options,r,{theme:a,flip:"boolean"===typeof r.flip?r.flip:"rtl"===a.direction});f.generateId=f.serverGenerateClassName||f.generateClassName;var h=r.sheetsRegistry;if(0===d.refs){var m;r.sheetsCache&&(m=o.get(r.sheetsCache,l,a));var v=l.create(a,u);m||((m=r.jss.createStyleSheet(v,(0,n.Z)({link:!1},f))).attach(),r.sheetsCache&&o.set(r.sheetsCache,l,a,m)),h&&h.add(m),d.staticSheet=m,d.dynamicStyles=(0,i._$)(v)}if(d.dynamicStyles){var p=r.jss.createStyleSheet(d.dynamicStyles,(0,n.Z)({link:!0},f));p.update(t),p.attach(),s.dynamicSheet=p,s.classes=c({baseClasses:d.staticSheet.classes,newClasses:p.classes}),h&&h.add(p)}else s.classes=d.staticSheet.classes;d.refs+=1}}function x(e,t){var s=e.state;s.dynamicSheet&&s.dynamicSheet.update(t)}function b(e){var t=e.state,s=e.theme,a=e.stylesOptions,n=e.stylesCreator;if(!a.disableGeneration){var r=o.get(a.sheetsManager,n,s);r.refs-=1;var i=a.sheetsRegistry;0===r.refs&&(o.delete(a.sheetsManager,n,s),a.jss.removeStyleSheet(r.staticSheet),i&&i.remove(r.staticSheet)),t.dynamicSheet&&(a.jss.removeStyleSheet(t.dynamicSheet),i&&i.remove(t.dynamicSheet))}}function j(e,t){var s,a=r.useRef([]),n=r.useMemo((function(){return{}}),t);a.current!==n&&(a.current=n,s=e()),r.useEffect((function(){return function(){s&&s()}}),[n])}function w(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=t.name,i=t.classNamePrefix,c=t.Component,o=t.defaultTheme,d=void 0===o?g:o,h=(0,a.Z)(t,S),m=y(e),v=s||i||"makeStyles";m.options={index:f(),name:s,meta:v,classNamePrefix:v};var p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(0,l.Z)()||d,a=(0,n.Z)({},r.useContext(u.NU),h),i=r.useRef(),o=r.useRef();j((function(){var n={name:s,state:{},stylesCreator:m,stylesOptions:a,theme:t};return Z(n,e),o.current=!1,i.current=n,function(){b(n)}}),[t,m]),r.useEffect((function(){o.current&&x(i.current,e),o.current=!0}));var f=C(i.current,e.classes,c);return f};return p}}}]);
//# sourceMappingURL=762.887c7714.chunk.js.map
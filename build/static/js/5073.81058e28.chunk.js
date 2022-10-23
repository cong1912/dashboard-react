"use strict";(self.webpackChunktokyo_free_white_react_admin_dashboard=self.webpackChunktokyo_free_white_react_admin_dashboard||[]).push([[5073],{55073:function(e,n,t){t.r(n);t(72791);var i=t(48550),r=t(24518),a=t(56225),o=t(10951),s=t(85159),c=t(94026),l=t(1288),d=t(20269),x=t(80184),u=(0,a.Z)((function(e){return{root:{"& .MuiFormControl-root":{width:"100%"}}}}));n.default=function(e){var n=e.open,t=e.handleClose,a=e.handleCreateSession,f=e.requesting,g=e.setTitle,m=e.setSummary,p=e.summary,h=e.title,v=u();return(0,x.jsxs)(o.Z,{open:n,onClose:t,maxWidth:"sm",children:[(0,x.jsx)(s.Z,{children:"T\u1ea1o section m\u1edbi"}),(0,x.jsxs)("form",{className:v.root,onSubmit:a,children:[(0,x.jsx)(c.Z,{children:(0,x.jsxs)(l.Z,{container:!0,spacing:2,children:[(0,x.jsx)(l.Z,{item:!0,xs:12,children:(0,x.jsx)(i.Z,{variant:"outlined",label:"Title",name:"title",onChange:function(e){g(e.target.value)},value:h})}),(0,x.jsx)(l.Z,{item:!0,xs:12,children:(0,x.jsx)(i.Z,{label:"Content",multiline:!0,rows:5,name:"content",value:p,onChange:function(e){return m(e.target.value)}})})]})}),(0,x.jsxs)(d.Z,{children:[(0,x.jsx)(r.Z,{color:"primary",size:"large",type:"submit",disabled:f,children:"Submit"}),(0,x.jsx)(r.Z,{onClick:t,children:"Cancel"})]})]})]})}},1288:function(e,n,t){var i=t(45987),r=t(87462),a=t(72791),o=t(28182),s=t(74561),c=[0,1,2,3,4,5,6,7,8,9,10],l=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function d(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=parseFloat(e);return"".concat(t/n).concat(String(e).replace(String(t),"")||"px")}var x=a.forwardRef((function(e,n){var t=e.alignContent,s=void 0===t?"stretch":t,c=e.alignItems,l=void 0===c?"stretch":c,d=e.classes,x=e.className,u=e.component,f=void 0===u?"div":u,g=e.container,m=void 0!==g&&g,p=e.direction,h=void 0===p?"row":p,v=e.item,w=void 0!==v&&v,j=e.justify,y=e.justifyContent,C=void 0===y?"flex-start":y,b=e.lg,S=void 0!==b&&b,Z=e.md,W=void 0!==Z&&Z,k=e.sm,_=void 0!==k&&k,z=e.spacing,M=void 0===z?0:z,I=e.wrap,G=void 0===I?"wrap":I,N=e.xl,B=void 0!==N&&N,D=e.xs,E=void 0!==D&&D,T=e.zeroMinWidth,F=void 0!==T&&T,q=(0,i.Z)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","justifyContent","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),R=(0,o.Z)(d.root,x,m&&[d.container,0!==M&&d["spacing-xs-".concat(String(M))]],w&&d.item,F&&d.zeroMinWidth,"row"!==h&&d["direction-xs-".concat(String(h))],"wrap"!==G&&d["wrap-xs-".concat(String(G))],"stretch"!==l&&d["align-items-xs-".concat(String(l))],"stretch"!==s&&d["align-content-xs-".concat(String(s))],"flex-start"!==(j||C)&&d["justify-content-xs-".concat(String(j||C))],!1!==E&&d["grid-xs-".concat(String(E))],!1!==_&&d["grid-sm-".concat(String(_))],!1!==W&&d["grid-md-".concat(String(W))],!1!==S&&d["grid-lg-".concat(String(S))],!1!==B&&d["grid-xl-".concat(String(B))]);return a.createElement(f,(0,r.Z)({className:R,ref:n},q))})),u=(0,s.Z)((function(e){return(0,r.Z)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-content-xs-center":{justifyContent:"center"},"justify-content-xs-flex-end":{justifyContent:"flex-end"},"justify-content-xs-space-between":{justifyContent:"space-between"},"justify-content-xs-space-around":{justifyContent:"space-around"},"justify-content-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,n){var t={};return c.forEach((function(i){var r=e.spacing(i);0!==r&&(t["spacing-".concat(n,"-").concat(i)]={margin:"-".concat(d(r,2)),width:"calc(100% + ".concat(d(r),")"),"& > $item":{padding:d(r,2)}})})),t}(e,"xs"),e.breakpoints.keys.reduce((function(n,t){return function(e,n,t){var i={};l.forEach((function(e){var n="grid-".concat(t,"-").concat(e);if(!0!==e)if("auto"!==e){var r="".concat(Math.round(e/12*1e8)/1e6,"%");i[n]={flexBasis:r,flexGrow:0,maxWidth:r}}else i[n]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else i[n]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===t?(0,r.Z)(e,i):e[n.breakpoints.up(t)]=i}(n,e,t),n}),{}))}),{name:"MuiGrid"})(x);n.Z=u}}]);
//# sourceMappingURL=5073.81058e28.chunk.js.map
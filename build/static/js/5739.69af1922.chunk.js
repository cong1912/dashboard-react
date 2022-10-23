"use strict";(self.webpackChunktokyo_free_white_react_admin_dashboard=self.webpackChunktokyo_free_white_react_admin_dashboard||[]).push([[5739],{25739:function(n,e,t){t.r(e);t(72791);var i=t(48550),r=t(24518),a=t(56225),o=t(10951),s=t(85159),c=t(94026),l=t(1288),d=t(20269),x=t(80184),u=(0,a.Z)((function(n){return{root:{"& .MuiFormControl-root":{width:"100%"}}}}));e.default=function(n){var e=n.open,t=n.handleClose,a=n.handleCreateQuestion,f=n.requesting,g=n.setContent,m=n.content,p=n.title,h=n.setTitle,v=u();return(0,x.jsxs)(o.Z,{open:e,onClose:t,maxWidth:"sm",children:[(0,x.jsx)(s.Z,{children:"T\u1ea1o m\u1edbi c\xe2u h\u1ecfi"}),(0,x.jsxs)("form",{className:v.root,onSubmit:a,children:[(0,x.jsx)(c.Z,{children:(0,x.jsxs)(l.Z,{container:!0,spacing:2,children:[(0,x.jsx)(l.Z,{item:!0,xs:12,children:(0,x.jsx)(i.Z,{variant:"outlined",label:"Title",name:"title",onChange:function(n){h(n.target.value)},value:p})}),(0,x.jsx)(l.Z,{item:!0,xs:12,children:(0,x.jsx)(i.Z,{label:"Content",multiline:!0,rows:5,name:"content",value:m,onChange:function(n){return g(n.target.value)}})})]})}),(0,x.jsxs)(d.Z,{children:[(0,x.jsx)(r.Z,{color:"primary",size:"large",type:"submit",disabled:f,children:"Submit"}),(0,x.jsx)(r.Z,{onClick:t,children:"Cancel"})]})]})]})}},1288:function(n,e,t){var i=t(45987),r=t(87462),a=t(72791),o=t(28182),s=t(74561),c=[0,1,2,3,4,5,6,7,8,9,10],l=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function d(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=parseFloat(n);return"".concat(t/e).concat(String(n).replace(String(t),"")||"px")}var x=a.forwardRef((function(n,e){var t=n.alignContent,s=void 0===t?"stretch":t,c=n.alignItems,l=void 0===c?"stretch":c,d=n.classes,x=n.className,u=n.component,f=void 0===u?"div":u,g=n.container,m=void 0!==g&&g,p=n.direction,h=void 0===p?"row":p,v=n.item,w=void 0!==v&&v,j=n.justify,C=n.justifyContent,b=void 0===C?"flex-start":C,y=n.lg,Z=void 0!==y&&y,S=n.md,W=void 0!==S&&S,k=n.sm,_=void 0!==k&&k,z=n.spacing,M=void 0===z?0:z,I=n.wrap,G=void 0===I?"wrap":I,N=n.xl,B=void 0!==N&&N,D=n.xs,E=void 0!==D&&D,T=n.zeroMinWidth,F=void 0!==T&&T,q=(0,i.Z)(n,["alignContent","alignItems","classes","className","component","container","direction","item","justify","justifyContent","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),Q=(0,o.Z)(d.root,x,m&&[d.container,0!==M&&d["spacing-xs-".concat(String(M))]],w&&d.item,F&&d.zeroMinWidth,"row"!==h&&d["direction-xs-".concat(String(h))],"wrap"!==G&&d["wrap-xs-".concat(String(G))],"stretch"!==l&&d["align-items-xs-".concat(String(l))],"stretch"!==s&&d["align-content-xs-".concat(String(s))],"flex-start"!==(j||b)&&d["justify-content-xs-".concat(String(j||b))],!1!==E&&d["grid-xs-".concat(String(E))],!1!==_&&d["grid-sm-".concat(String(_))],!1!==W&&d["grid-md-".concat(String(W))],!1!==Z&&d["grid-lg-".concat(String(Z))],!1!==B&&d["grid-xl-".concat(String(B))]);return a.createElement(f,(0,r.Z)({className:Q,ref:e},q))})),u=(0,s.Z)((function(n){return(0,r.Z)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-content-xs-center":{justifyContent:"center"},"justify-content-xs-flex-end":{justifyContent:"flex-end"},"justify-content-xs-space-between":{justifyContent:"space-between"},"justify-content-xs-space-around":{justifyContent:"space-around"},"justify-content-xs-space-evenly":{justifyContent:"space-evenly"}},function(n,e){var t={};return c.forEach((function(i){var r=n.spacing(i);0!==r&&(t["spacing-".concat(e,"-").concat(i)]={margin:"-".concat(d(r,2)),width:"calc(100% + ".concat(d(r),")"),"& > $item":{padding:d(r,2)}})})),t}(n,"xs"),n.breakpoints.keys.reduce((function(e,t){return function(n,e,t){var i={};l.forEach((function(n){var e="grid-".concat(t,"-").concat(n);if(!0!==n)if("auto"!==n){var r="".concat(Math.round(n/12*1e8)/1e6,"%");i[e]={flexBasis:r,flexGrow:0,maxWidth:r}}else i[e]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else i[e]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===t?(0,r.Z)(n,i):n[e.breakpoints.up(t)]=i}(e,n,t),e}),{}))}),{name:"MuiGrid"})(x);e.Z=u}}]);
//# sourceMappingURL=5739.69af1922.chunk.js.map
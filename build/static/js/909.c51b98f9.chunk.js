"use strict";(self.webpackChunktokyo_free_white_react_admin_dashboard=self.webpackChunktokyo_free_white_react_admin_dashboard||[]).push([[909],{77762:function(e,n,t){t.r(n);t(72791);var r=t(61889),a=t(48550),s=t(36151),i=t(94026),o=t(20269),c=t(56225),u=t(80184),l=(0,c.Z)((function(e){return{root:{"& .MuiFormControl-root":{width:"100%"}}}}));n.default=function(e){var n=e.handleSubmitForm,t=e.name,c=e.setName,d=e.description,h=e.setDescription,m=e.requesting,p=e.handleClose,f=l();return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("form",{className:f.root,onSubmit:n,children:[(0,u.jsx)(i.Z,{children:(0,u.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,u.jsx)(r.ZP,{item:!0,xs:12,children:(0,u.jsx)(a.Z,{variant:"outlined",label:"Name",name:"name",onChange:function(e){return c(e.target.value)},value:t})}),(0,u.jsx)(r.ZP,{item:!0,xs:12,children:(0,u.jsx)(a.Z,{label:"Description",multiline:!0,rows:5,name:"description",value:d,onChange:function(e){return h(e.target.value)}})})]})}),(0,u.jsxs)(o.Z,{children:[(0,u.jsx)(s.Z,{color:"primary",size:"large",type:"submit",disabled:m,children:"Submit"}),(0,u.jsx)(s.Z,{onClick:p,children:"Cancel"})]})]})})}},94747:function(e,n,t){t.r(n);var r=t(74165),a=t(15861),s=t(70885),i=t(72791),o=t(56225),c=t(10951),u=t(85159),l=t(19916),d=t(64133),h=t(54169),m=t(29499),p=t(72419),f=t(75421),x=t(77762),g=t(31815),Z=t(80184),C=(0,o.Z)((function(e){return{root:{"& .MuiFormControl-root":{width:"90%",margin:e.spacing(1)},"& .MuiDialogContent-root":{height:420},"& .MuiBox-root":{width:"90%",margin:e.spacing(1)},"& .quill":{height:180}},btn:{margin:e.spacing(.5)},label:{textTransform:"none",margin:e.spacing(.5)}}}));n.default=function(e){var n=e.open,t=e.setIsOpenUpdateModal,o=e.id,v=(e.sectionId,C(),(0,i.useState)(!1)),b=(0,s.Z)(v,2),j=b[0],S=b[1],_=(0,i.useState)(""),w=(0,s.Z)(_,2),k=w[0],y=w[1],D=(0,i.useState)(""),E=(0,s.Z)(D,2),F=E[0],M=E[1],R=(0,i.useContext)(d.I),U=R.errorsReducer,N=R.successReducer,P=(0,s.Z)(U,2),T=(P[0],P[1]),q=(0,s.Z)(N,2),I=(q[0],q[1]),G=(0,p.ZP)(o?m.Ud+o:null,f.Y).data;console.log("data",G),(0,i.useEffect)((function(){o&&G&&(y(G.name),M(G.description))}),[G,o]);var J=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(n){var a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,a={name:k,description:F},e.next=5,(0,g.y)(a,o);case 5:return I({type:h.s3.SET_SUCCESS,success:"Create Lecture Success"}),e.next=8,(0,p.JG)(m.Ud+o);case 8:return e.next=10,(0,p.JG)(m.Ud);case 10:t(!1),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),T({type:l.Tl.SET_ERROR,error:e.t0.response.data.message}),S(!1);case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(n){return e.apply(this,arguments)}}(),O=function(){t(!1)};return(0,Z.jsxs)(c.Z,{open:n,onClose:O,maxWidth:"sm",children:[(0,Z.jsx)(u.Z,{children:"Ch\u1ec9nh s\u1eeda danh m\u1ee5c"}),(0,Z.jsx)(x.default,{handleSubmitForm:J,handleClose:O,name:k,setName:y,description:F,setDescription:M,requesting:j})]})}}}]);
//# sourceMappingURL=909.c51b98f9.chunk.js.map
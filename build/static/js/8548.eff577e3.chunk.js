"use strict";(self.webpackChunktokyo_free_white_react_admin_dashboard=self.webpackChunktokyo_free_white_react_admin_dashboard||[]).push([[8548],{70932:function(e,t,n){var r=n(72791),a=n(5289),i=n(65661),c=n(39157),o=n(51691),s=n(97123),u=n(24518),l=n(80184),d=function(e){var t=e.open,n=e.name,r=e.handleClose,d=e.handleDelete;return(0,l.jsxs)(a.Z,{"data-testid":"dialogDelete",open:t,onClose:r,"aria-labelledby":"draggable-dialog-title",children:[(0,l.jsxs)(i.Z,{style:{cursor:"move"},id:"draggable-dialog-title",children:["Delete ",n]}),(0,l.jsx)(c.Z,{children:(0,l.jsxs)(o.Z,{children:["Do you want to delete this ",n]})}),(0,l.jsxs)(s.Z,{children:[(0,l.jsx)(u.Z,{autoFocus:!0,onClick:r,children:"Cancel"}),(0,l.jsx)(u.Z,{onClick:d,"data-testid":"btnDelete",children:"Yes"})]})]})};t.Z=r.memo(d)},10173:function(e,t,n){var r=n(66934),a=n(91614),i=n(68870),c=n(20890),o=n(23060),s=n(80184),u=(0,r.ZP)(a.Z)((function(e){var t=e.theme;return"\n        margin-top: ".concat(t.spacing(4),";\n")}));t.Z=function(){return(0,s.jsx)(u,{className:"footer-wrapper",children:(0,s.jsxs)(i.Z,{pb:4,display:{xs:"block",md:"flex"},alignItems:"center",textAlign:{xs:"center",md:"left"},justifyContent:"space-between",children:[(0,s.jsx)(i.Z,{children:(0,s.jsx)(c.Z,{variant:"subtitle1",children:"\xa9 2022 - Tokyo Free White React Typescript Admin Dashboard"})}),(0,s.jsxs)(c.Z,{sx:{pt:{xs:2,md:0}},variant:"subtitle1",children:["Crafted by"," ",(0,s.jsx)(o.Z,{href:"https://bloomui.com",target:"_blank",rel:"noopener noreferrer",children:"BloomUI.com"})]})]})})}},68418:function(e,t,n){var r=n(66934),a=n(68870),i=n(91614),c=n(80184),o=(0,r.ZP)(a.Z)((function(e){var t=e.theme;return"\n        padding: ".concat(t.spacing(4),";\n")}));t.Z=function(e){var t=e.children;return(0,c.jsx)(o,{className:"MuiPageTitle-wrapper",children:(0,c.jsx)(i.Z,{maxWidth:"lg",children:t})})}},29499:function(e,t,n){n.d(t,{R3:function(){return o},Yc:function(){return c},gO:function(){return i},kA:function(){return r},z9:function(){return a}});var r="".concat("http://139.59.104.129:8000/api/v1/","/news/articles/"),a=("".concat("http://139.59.104.129:8000/api/v1/","/categories"),"".concat("http://139.59.104.129:8000/api/v1/","/article_category")),i="".concat("http://139.59.104.129:8000/api/v1/","/courses/"),c="".concat("http://139.59.104.129:8000/api/v1/","/section/"),o="".concat("http://139.59.104.129:8000/api/v1/","/post/")},38548:function(e,t,n){n.r(t),n.d(t,{default:function(){return F}});var r=n(74165),a=n(15861),i=n(29439),c=n(16871),o=n(72791),s=n(6907),u=n(61889),l=n(20890),d=n(24518),h=n(74696),p=n(80184);var f=function(e){var t=e.handleClickOpenDialog;return(0,p.jsxs)(u.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",children:[(0,p.jsx)(u.ZP,{item:!0,children:(0,p.jsx)(l.Z,{variant:"h3",component:"h3",gutterBottom:!0,children:"lectures List"})}),(0,p.jsx)(u.ZP,{item:!0,children:(0,p.jsx)(d.Z,{sx:{mt:{xs:2,md:0}},variant:"contained",startIcon:(0,p.jsx)(h.Z,{fontSize:"small"}),onClick:t,children:"Create New Lecture"})})]})},m=n(68418),Z=n(13239),x=n(91614),g=n(10173),j=n(72419),v=n(29499),w=n(75421),S=n(19916),C=n(64133),b=n(54169),k=n(31199),y=n(4942),I=n(68870),N=n(38147),P=n(43212),_=n(5519),z=n(97639),A=n(13400),O=n(38820),R=n(5397),D=n(15238),J=n(70932),T=(0,o.lazy)((function(){return Promise.all([n.e(504),n.e(9820),n.e(9628),n.e(4441)]).then(n.bind(n,54441))})),B=function(e){var t=e.params,n=(e.rowId,e.setRowId,(0,o.useState)(!1)),c=(0,i.Z)(n,2),s=c[0],u=c[1],l=(0,o.useState)(!1),d=(0,i.Z)(l,2),h=d[0],f=d[1],m=(0,o.useState)(),Z=(0,i.Z)(m,2),x=Z[0],g=Z[1],w=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,D.X4)(t.id);case 2:return e.next=4,(0,j.JG)(v.kA);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(I.Z,{children:[(0,p.jsx)(z.Z,{title:"Edit this lecture",children:(0,p.jsx)(A.Z,{onClick:function(){u(!0),g(t.id)},children:(0,p.jsx)(O.Z,{})})}),(0,p.jsx)(z.Z,{title:"Delete this lecture",children:(0,p.jsx)(A.Z,{onClick:function(){return w(t)},children:(0,p.jsx)(R.Z,{})})})]}),(0,p.jsx)(T,{id:x,open:s,setIsOpenUpdateModal:u}),(0,p.jsx)(J.Z,{open:h,name:"blog",handleClose:function(){f(!1)},handleDelete:function(){f(!0)}})]})},L=function(e){var t=e.lectures,n=(0,o.useState)(t.pageSize),r=(0,i.Z)(n,2),a=r[0],c=r[1],s=(0,o.useState)(null),u=(0,i.Z)(s,2),d=u[0],h=u[1],f=(0,o.useMemo)((function(){return[{field:"id",headerName:"Id",width:220},{field:"name",headerName:"Name",width:170},{field:"content",headerName:"Content",width:400},{field:"price",headerName:"price",width:100},{field:"actions",headerName:"Actions",type:"actions",renderCell:function(e){return(0,p.jsx)(B,{params:e,rowId:d,setRowId:h})}}]}),[d]);return(0,p.jsxs)(I.Z,{sx:{height:600,width:"100%",pb:5},children:[(0,p.jsx)(l.Z,{variant:"h3",component:"h3",sx:{textAlign:"center",mt:3,mb:3},children:"Manage Lectures"}),(0,p.jsx)(N._,{columns:f,rows:t.results,getRowId:function(e){return e.id},rowsPerPageOptions:[5,10,20],pageSize:a,onPageSizeChange:function(e){return c(e)},getRowSpacing:function(e){return{top:e.isFirstVisible?0:5,bottom:e.isLastVisible?0:5}},sx:(0,y.Z)({},"& .".concat(P._.row),{bgcolor:function(e){return"light"===e.palette.mode?_.Z[200]:_.Z[900]}}),onCellEditCommit:function(e){return h(e.id)}})]})},E=(0,o.lazy)((function(){return Promise.all([n.e(504),n.e(9820),n.e(9628),n.e(6879)]).then(n.bind(n,46879))})),F=function(){var e=(0,c.UO)().sectionId,t=(0,o.useState)(!1),n=(0,i.Z)(t,2),l=n[0],d=n[1],h=(0,o.useState)(!1),y=(0,i.Z)(h,2),I=y[0],N=y[1],P=(0,o.useState)(""),_=(0,i.Z)(P,2),z=_[0],A=_[1],O=(0,o.useState)(""),R=(0,i.Z)(O,2),D=R[0],J=R[1],T=(0,o.useState)(0),B=(0,i.Z)(T,2),F=B[0],M=B[1],U=(0,o.useContext)(C.I),Y=U.errorsReducer,V=U.successReducer,W=(0,i.Z)(Y,2),q=(W[0],W[1]),G=(0,i.Z)(V,2),K=(G[0],G[1]),X=(0,j.ZP)(e?v.R3+"?sectionId=".concat(e):null,w.Y).data,H=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(n){var a;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.prev=1,a={name:z,content:D,sectionId:+e,price:+F},t.next=5,(0,k.K)(a);case 5:return K({type:b.s3.SET_SUCCESS,success:"Create Lecture Success"}),t.next=8,(0,j.JG)(v.R3+"?sectionId=".concat(e));case 8:d(!1),J(""),A(""),M(0),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(1),q({type:S.Tl.SET_ERROR,error:t.t0.response.data.message}),N(!1);case 18:case"end":return t.stop()}}),t,null,[[1,14]])})));return function(e){return t.apply(this,arguments)}}();return X?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.ql,{children:(0,p.jsx)("title",{children:"Lectures - Manager"})}),(0,p.jsx)(m.Z,{children:(0,p.jsx)(f,{handleClickOpenDialog:function(){d(!0)}})}),(0,p.jsx)(x.Z,{maxWidth:"lg",children:(0,p.jsx)(u.ZP,{container:!0,direction:"row",justifyContent:"center",alignItems:"stretch",spacing:3,children:(0,p.jsx)(u.ZP,{item:!0,xs:12,children:X?(0,p.jsx)(L,{lectures:X}):(0,p.jsx)(Z.Z,{})})})}),(0,p.jsx)(g.Z,{}),(0,p.jsx)(E,{open:l,setContent:J,setPrice:M,setName:A,price:F,name:z,content:D,requesting:I,handleCreateLecture:H,handleClose:function(){d(!1)}})]}):(0,p.jsx)(Z.Z,{})}},75421:function(e,t,n){n.d(t,{Y:function(){return c},j:function(){return o}});var r=n(74165),a=n(15861),i=n(61044),c=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.parse(localStorage.getItem("token")||"null"),e.next=3,i.Z.get(t,{headers:{Authorization:n}});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),o=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t,n,a,i=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=i.length,n=new Array(t),a=0;a<t;a++)n[a]=i[a];return e.abrupt("return",Promise.allSettled(n.map((function(e){return c(e)}))));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},15238:function(e,t,n){n.d(t,{Vh:function(){return a},X4:function(){return c},zZ:function(){return i}});var r=n(61044),a=function(e){var t=JSON.parse(localStorage.getItem("token")||"null");return(0,r.Z)({method:"post",url:"/news/articles",data:e,headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(t)}})},i=function(e,t){var n=JSON.parse(localStorage.getItem("token")||"null");return(0,r.Z)({method:"put",url:"/news/articles/".concat(t),data:e,headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(n)}})},c=function(e){var t=JSON.parse(localStorage.getItem("token")||"null");return(0,r.Z)({method:"delete",url:"/news/articles/".concat(e),headers:{Authorization:"Bearer ".concat(t)}})}},31199:function(e,t,n){n.d(t,{K:function(){return a},n:function(){return i}});var r=n(61044),a=function(e){var t=JSON.parse(localStorage.getItem("token")||"null");return(0,r.Z)({method:"post",url:"/post",data:e,headers:{Authorization:"Bearer ".concat(t)}})},i=function(e,t){var n=JSON.parse(localStorage.getItem("token")||"null");return(0,r.Z)({method:"put",url:"/post/".concat(t),data:e,headers:{Authorization:"Bearer ".concat(n)}})}}}]);
//# sourceMappingURL=8548.eff577e3.chunk.js.map
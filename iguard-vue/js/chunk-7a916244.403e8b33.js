(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a916244"],{"2ca1":function(e,t,a){"use strict";var s=a("df63"),i=a.n(s);i.a},cf00:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box"},[a("div",{staticClass:"con"},[a("div",{staticClass:"maxBox flex"},[a("p",[e._v("验收依据")]),a("div",{staticClass:"danXuan"},[a("van-radio-group",{attrs:{"icon-size":"15"},on:{change:e.yanShou},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[a("van-radio",{attrs:{name:"1"}},[e._v("现场验收")]),a("van-radio",{attrs:{name:"2"}},[e._v("图片验收")])],1)],1)]),a("div",{staticClass:"maxBox flex"},[a("p",[e._v("验收结论")]),a("div",{staticClass:"danXuan"},[a("van-radio-group",{attrs:{"icon-size":"15"},on:{change:e.verdict},model:{value:e.radio1,callback:function(t){e.radio1=t},expression:"radio1"}},[a("van-radio",{attrs:{name:"1"}},[e._v("合格")]),a("van-radio",{attrs:{name:"2"}},[e._v("不合格")])],1)],1)]),a("van-field",{attrs:{rows:"2",autosize:"",label:"验收描述",type:"textarea",maxlength:"50",placeholder:"请输入留言","show-word-limit":""},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),a("van-uploader",{attrs:{"max-count":6,"after-read":e.afterRead},on:{delete:e.remove},model:{value:e.fileList,callback:function(t){e.fileList=t},expression:"fileList"}}),e.flag?a("p",{staticClass:"cellName"},[e._v("物料核实")]):e._e(),a("van-cell-group",[e.flag?a("van-cell",{attrs:{title:"物料选择",value:e.wuLiaoValue},on:{click:function(t){e.show=!0}}}):e._e()],1),a("van-action-sheet",{attrs:{title:"物料选择"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[e._l(e.wuLiaoList,(function(t,s){return a("van-collapse",{key:s,attrs:{accordion:!0},on:{change:function(a){return e.type(t.id)}},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("van-collapse-item",{attrs:{title:t.typeName,name:t.id}},e._l(e.wuLiaoList1,(function(t,s){return a("div",{key:s,staticClass:"flex"},[a("van-checkbox",{attrs:{"icon-size":"15"},model:{value:t.checked,callback:function(a){e.$set(t,"checked",a)},expression:"item.checked"}},[e._v(e._s(t.materialsName))]),a("van-cell-group",[a("van-field",{attrs:{type:"number",placeholder:"请输入使用量"},on:{blur:function(a){return e.cbx(t.checked,t.id,t.value,t.materialsName)}},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"item.value"}})],1)],1)})),0)],1)})),a("div",{staticClass:"btn1 flex"},[a("van-button",{attrs:{type:"primary",color:"#999"},on:{click:function(t){e.show=!1}}},[e._v("取消")]),a("van-button",{attrs:{type:"primary",color:"#A68E44"},on:{click:function(t){e.show=!1}}},[e._v("确定")])],1)],2),e.flag?a("p",{staticClass:"userName"},[e._v("被评人："+e._s(e.name))]):e._e(),e.flag?a("div",[a("div",{staticClass:"maxBox flex"},[a("p",[e._v(e._s(e.data1[0].assessType))]),a("van-rate",{attrs:{count:10},on:{change:e.pingFen},model:{value:e.data1[0].value,callback:function(t){e.$set(e.data1[0],"value",t)},expression:"data1[0].value"}})],1),a("div",{staticClass:"maxBox flex"},[a("p",[e._v(e._s(e.data1[1].assessType))]),a("van-rate",{attrs:{count:10},on:{change:e.pingFen1},model:{value:e.data1[1].value,callback:function(t){e.$set(e.data1[1],"value",t)},expression:"data1[1].value"}})],1),a("div",{staticClass:"maxBox flex"},[a("p",[e._v(e._s(e.data1[2].assessType))]),a("van-rate",{attrs:{count:10},on:{change:e.pingFen2},model:{value:e.data1[2].value,callback:function(t){e.$set(e.data1[2],"value",t)},expression:"data1[2].value"}})],1)]):e._e()],1),a("div",{staticClass:"btn flex"},[a("van-button",{attrs:{color:"#999"},on:{click:function(t){return e.$router.go(-1)}}},[e._v("取消")]),a("van-button",{attrs:{color:"#A68E44"},on:{click:e.end}},[e._v("确认")])],1)])},i=[],o=(a("5df3"),a("4f7f"),a("75fc")),n=(a("ac6a"),a("7f7f"),a("34ef"),a("4917"),a("28a5"),{components:{},data:function(){return{radio:"",radio1:"",message:"",fileList:[],text:"",text1:"",value:"",activeNames:[],wuLiaoValue:"",wuLiaoValue1:[],checked:!1,num:"",num1:"",name:"",flag:!1,show:!1,wuLiaoList:[],wuLiaoList1:[],meterials_use:[],data1:[],base64:"",base64Arr:[],tuName:"",tuNameArr:[],star_one:"",star_two:"",star_three:""}},mounted:function(){var e=this;this.name=this.$route.query.userName,this.axios.post("/rest/tbMaterialsType/list",{uid:localStorage.getItem("uid"),page:"1",limit:"40"}).then((function(t){console.log(t),e.wuLiaoList=t.rows})),this.axios.post("/rest/tbAssessConfig/list",{uid:localStorage.getItem("uid"),page:"1",limit:"20"}).then((function(t){console.log(t),e.data1=t.rows}))},methods:{dataURLtoFile:function(e,t){var a=e.split(","),s=a[0].match(/:(.*?);/)[1],i=atob(a[1]),o=i.length,n=new Uint8Array(o);while(o--)n[o]=i.charCodeAt(o);return new File([n],t,{type:s})},afterRead:function(e){var t=this,a=document.createElement("canvas"),s=a.getContext("2d"),i=new Image;i.src=e.content,i.onload=function(){a.width=400,a.height=300,s.drawImage(i,0,0,400,300),e.content=a.toDataURL(e.file.type,.92);var o=t.dataURLtoFile(e.content,e.file.name),n=new FormData;n.append("file",o),n.append("code",t.applyNo),n.append("type","chat"),t.base64Arr.push(e.content),t.tuNameArr.push(e.file.name),t.base64=t.base64Arr.join("#"),t.tuName=t.tuNameArr.join(",")}},remove:function(e,t){var a=this;this.base64Arr.forEach((function(s){if(s==e.content)return a.base64Arr.splice(t.index,1)})),this.tuNameArr.forEach((function(s){if(s==e.file.name)return a.tuNameArr.splice(t.index,1)})),this.base64=this.base64Arr.join("#"),this.tuName=this.tuNameArr.join(",")},end:function(){var e=this;""==this.radio?this.$toast("请选择验收依据"):""==this.radio1?this.$toast("请选择验收结论"):"2"==this.num?this.axios.post("/rest/tbEventReport/checkCompleteEvent",{check_according:this.num1,uid:localStorage.getItem("uid"),eventId:sessionStorage.getItem("id"),meterials_use:this.meterials_use.join(","),check_remark:this.message,base64:this.base64,file_name:this.tuName,completeUserId:this.$route.query.userNameId,checkUserId:localStorage.getItem("uid"),check_verdict:this.num,star_one:this.star_one,star_two:this.star_two,star_three:this.star_three}).then((function(t){e.$toast("验收完成"),e.$router.push("/eventList")})):""==this.message?this.$toast("请填写验收描述"):""==this.star_one?this.$toast("请填写第一个评价"):""==this.star_two?this.$toast("请填写第二个评价"):""==this.star_three?this.$toast("请填写第三个评论"):this.axios.post("/rest/tbEventReport/checkCompleteEvent",{check_according:this.num1,uid:localStorage.getItem("uid"),eventId:sessionStorage.getItem("id"),meterials_use:this.meterials_use.join(","),check_remark:this.message,base64:this.base64,file_name:this.tuName,completeUserId:this.$route.query.userNameId,checkUserId:localStorage.getItem("uid"),check_verdict:this.num,star_one:this.star_one,star_two:this.star_two,star_three:this.star_three}).then((function(t){e.$toast("验收完成"),e.$router.push("/eventList")}))},yanShou:function(e){console.log(e),this.num1=e},verdict:function(e){this.num=e,this.flag=1==e},type:function(e){var t=this;console.log(e),this.axios.post("/rest/tbMaterialsManage/list",{materialsTypeId:e}).then((function(e){console.log(e),t.wuLiaoList1=e.rows,t.$set(t.wuLiaoList1,"checked",!1),t.$set(t.wuLiaoList1,"value","")}))},cbx:function(e,t,a,s){if(console.log(e,t,a,s),1==e){var i=t+":"+a;this.meterials_use.push(i),this.meterials_use=Object(o["a"])(new Set(this.meterials_use)),console.log(this.meterials_use.join(","));var n=s+":"+a+"个";this.wuLiaoValue1.push(n),this.wuLiaoValue1=Object(o["a"])(new Set(this.wuLiaoValue1)),this.wuLiaoValue=this.wuLiaoValue1.join(","),console.log(this.wuLiaoValue1.join(","))}else this.wuLiaoValue=""},pingFen:function(e){console.log(e),this.star_one=e},pingFen1:function(e){console.log(e),this.star_two=e},pingFen2:function(e){console.log(e),this.star_three=e}}}),r=n,l=(a("2ca1"),a("2877")),c=Object(l["a"])(r,s,i,!1,null,"651ae58c",null);t["default"]=c.exports},df63:function(e,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70e344a5"],{2090:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"box"},[e("van-nav-bar",{attrs:{"left-text":"返回","left-arrow":"",fixed:!0},on:{"click-left":function(a){return t.$router.push("/login")}}}),e("div",{staticClass:"title"},[t._v("介绍")]),t._m(0),e("div",{staticClass:"flex_c"},[e("van-button",{attrs:{round:"",type:"info",size:"large",color:"#1888F9"},on:{click:t.getUser}},[t._v("开始注册")])],1)],1)},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"registered"},[s("div",{staticClass:"con"},[t._v("感谢您选用i-Guard物业管控平台，当您完成小程序端的注册后，系统将为您和您的企业提供小程序任务看板端和Web管理端两套前端应用。")]),s("div",{staticClass:"con"},[t._v("小程序端通过盈商云服公众号下方“i-Guard物管平台”菜单进入。")]),s("img",{staticClass:"jieshao1",attrs:{src:e("73f7"),alt:""}}),s("div",{staticClass:"con"},[t._v("Web端通过官网首页右上角“管理端登录”菜单进入。")]),s("img",{staticClass:"jieshao2",attrs:{src:e("556e"),alt:""}}),s("div",{staticClass:"con"},[t._v("i-Guard物业管控平台是一套综合了巡更检查、工维报修、设备点检、管理层看板等一系列功能的线上电子流物业管理软件，具体功能可登录官网www.mallmis.com或盈商云股公众号查看产品介绍")]),s("div",{staticClass:"con"},[t._v("根据贵司付费方式不同，i-Guard物业管控平台提供如下功能使用：")]),s("div",{staticClass:"table"},[s("table",{attrs:{border:"1",cellspacing:"0",width:"100%"}},[s("tr",{staticClass:"red"},[s("td",{attrs:{width:"20%"}}),s("td",[t._v("体验版")]),s("td",[t._v("Demo版")]),s("td",[t._v("黄金版")]),s("td",[t._v("白金版")])]),s("tr",{staticClass:"pink"},[s("td",[t._v("系统权限")]),s("td",[t._v("√")]),s("td",[t._v("√")]),s("td",[t._v("√")]),s("td",[t._v("√")])]),s("tr",{staticClass:"lightPink"},[s("td",[t._v("通用管理")]),s("td",[t._v("√")]),s("td",[t._v("√")]),s("td",[t._v("√")]),s("td",[t._v("√")])]),s("tr",{staticClass:"pink"},[s("td",[t._v("巡更管理")]),s("td",[t._v("x")]),s("td",[t._v("x")]),s("td",[t._v("x")]),s("td",[t._v("√")])]),s("tr",{staticClass:"lightPink"},[s("td",[t._v("点检管理")]),s("td",[t._v("10点检任务")]),s("td",[t._v("√")]),s("td",[t._v("√")]),s("td",[t._v("√")])]),s("tr",{staticClass:"pink"},[s("td",[t._v("工维管理")]),s("td",[t._v("10待处理事件")]),s("td",[t._v("√")]),s("td",[t._v("√")]),s("td",[t._v("√")])]),s("tr",{staticClass:"lightPink"},[s("td",[t._v("物料管理")]),s("td",[t._v("x")]),s("td",[t._v("√")]),s("td",[t._v("√")]),s("td",[t._v("√")])]),s("tr",{staticClass:"pink"},[s("td",[t._v("付费方式")]),s("td",[t._v("永久免费")]),s("td",[t._v("付费30天,仅一次")]),s("td",[t._v("年付费")]),s("td",[t._v("年付费")])])])])])}],i=(e("7f7f"),{data:function(){return{}},mounted:function(){},methods:{getUser:function(){var t=this;void 0==this.$cookieStore.getCookie("uid")||""==this.$cookieStore.getCookie("uid")||null==this.$cookieStore.getCookie("uid")?this.$router.push({name:"register1",query:{flag1:!0}}):this.keepAxios.get(this.baseUrl.checkList+"/rest/appUser/getUserByUid",{params:{uid:this.$cookieStore.getCookie("uid")}}).then((function(a){console.log(a),5e4==a.data.code?t.$toast("系统异常"):2e4==a.data.code&&null!=a.data.result?a.data.result.personCount>"2"&&"0"==a.data.result.adminManage&&"1"==a.data.result.applyStatus?t.$router.push({name:"register",params:{name:a.data.result.name,flag:!0,flag1:!1,flag2:!1,flag3:!1,flag4:!1}}):a.data.result.personCount>"2"&&"1"==a.data.result.adminManage?t.$router.push({name:"register",params:{name:a.data.result.name,flag:!1,flag1:!1,flag2:!1,flag3:!0,flag4:!1}}):"0"==a.data.result.adminManage&&"0"==a.data.result.applyStatus?t.$router.push({name:"register",params:{name:a.data.result.name,flag:!1,flag1:!1,flag2:!1,flag3:!1,flag4:!0}}):a.data.result.personCount<"2"&&"0"==a.data.result.adminManage?t.$router.push({name:"register",params:{name:a.data.result.name,flag:!1,flag1:!0,flag2:!1,flag3:!1,flag4:!1}}):a.data.result.personCount<="2"&&"1"==a.data.result.adminManage&&t.$router.push({name:"register",params:{name:a.data.result.name,flag:!1,flag1:!0,flag2:!1,flag3:!1,flag4:!1}}):2e4==a.data.code&&null==a.data.result&&t.$router.push({name:"register1",query:{flag1:!0}})})).catch((function(t){console.log(t)}))}}}),l=i,n=(e("617a"),e("2877")),d=Object(n["a"])(l,s,r,!1,null,"a98aaf9a",null);a["default"]=d.exports},"556e":function(t,a,e){t.exports=e.p+"img/jieshao2.3060f32e.png"},"617a":function(t,a,e){"use strict";var s=e("e2c4"),r=e.n(s);r.a},"73f7":function(t,a,e){t.exports=e.p+"img/jieshao1.124f7074.png"},e2c4:function(t,a,e){}}]);
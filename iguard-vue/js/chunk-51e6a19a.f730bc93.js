(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51e6a19a"],{2090:function(a,e,t){"use strict";t.r(e);var r=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"box"},[t("van-nav-bar",{attrs:{"left-text":"返回","left-arrow":"",fixed:!0},on:{"click-left":function(e){return a.$router.push("/login")}}}),t("div",{staticClass:"title"},[a._v("介绍")]),t("div",{staticClass:"flex_c"},[t("van-button",{attrs:{round:"",type:"info",size:"large",color:"#1888F9"},on:{click:a.getUser}},[a._v("开始注册")])],1)],1)},s=[],n=(t("7f7f"),{data:function(){return{}},mounted:function(){},methods:{getUser:function(){var a=this;void 0==this.$cookieStore.getCookie("uid")||""==this.$cookieStore.getCookie("uid")||null==this.$cookieStore.getCookie("uid")?this.$router.push({name:"register1",query:{flag1:!0}}):this.keepAxios.get(this.baseUrl.checkList+"/rest/appUser/getUserByUid",{params:{uid:this.$cookieStore.getCookie("uid")}}).then((function(e){console.log(e),5e4==e.data.code?a.$toast("系统异常"):2e4==e.data.code&&null!=e.data.result?e.data.result.personCount>"2"&&"0"==e.data.result.adminManage&&"1"==e.data.result.applyStatus?a.$router.push({name:"register",params:{name:e.data.result.name,flag:!0,flag1:!1,flag2:!1,flag3:!1,flag4:!1}}):e.data.result.personCount>"2"&&"1"==e.data.result.adminManage?a.$router.push({name:"register",params:{name:e.data.result.name,flag:!1,flag1:!1,flag2:!1,flag3:!0,flag4:!1}}):"0"==e.data.result.adminManage&&"0"==e.data.result.applyStatus?a.$router.push({name:"register",params:{name:e.data.result.name,flag:!1,flag1:!1,flag2:!1,flag3:!1,flag4:!0}}):e.data.result.personCount<"2"&&"0"==e.data.result.adminManage?a.$router.push({name:"register",params:{name:e.data.result.name,flag:!1,flag1:!0,flag2:!1,flag3:!1,flag4:!1}}):e.data.result.personCount<="2"&&"1"==e.data.result.adminManage&&a.$router.push({name:"register",params:{name:e.data.result.name,flag:!1,flag1:!0,flag2:!1,flag3:!1,flag4:!1}}):2e4==e.data.code&&null==e.data.result&&a.$router.push({name:"register1",query:{flag1:!0}})})).catch((function(a){console.log(a)}))}}}),l=n,o=(t("ccce"),t("2877")),u=Object(o["a"])(l,r,s,!1,null,"7d0e572e",null);e["default"]=u.exports},"3cf7":function(a,e,t){},ccce:function(a,e,t){"use strict";var r=t("3cf7"),s=t.n(r);s.a}}]);
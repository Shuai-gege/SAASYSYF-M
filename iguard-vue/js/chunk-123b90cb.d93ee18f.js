(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-123b90cb"],{"4fd3":function(t,e,n){},"7d47":function(t,e,n){"use strict";var i=n("4fd3"),o=n.n(i);o.a},b089:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("div",{staticClass:"con"},[t._l(t.matterName,(function(e,i){return null!==e.childrens?n("van-cell",{key:i,attrs:{title:e.locationName,"is-link":"","arrow-direction":""},on:{click:function(n){return t.childrens(e.childrens,e.locationName,e)}}}):t._e()})),t._l(t.matterName,(function(e,i){return null==e.childrens?n("van-cell",{key:i,attrs:{title:e.locationName,"is-link":!1,"arrow-direction":""},on:{click:function(n){return t.childrens1(e.locationName,e)}}}):t._e()}))],2)])},o=[],a={components:{},data:function(){return{matterName:[]}},mounted:function(){this.matterName=this.$route.params.children,console.log(this.matterName)},methods:{childrens:function(t,e,n){this.$router.push({name:"matterLocation02",params:{children:t}}),sessionStorage.setItem("locationName",sessionStorage.getItem("locationName")+">"+e),sessionStorage.setItem("buildingId1",n.id)},childrens1:function(t,e){sessionStorage.setItem("locationName",sessionStorage.getItem("locationName")+">"+t),sessionStorage.setItem("buildingId1",e.id),this.$router.push("/ordermatter")}}},s=a,r=(n("7d47"),n("2877")),c=Object(r["a"])(s,i,o,!1,null,"78ad738a",null);e["default"]=c.exports}}]);
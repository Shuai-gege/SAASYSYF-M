(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60da2cb0"],{"0daf":function(t,e,n){"use strict";var a=n("3d47"),i=n.n(a);i.a},"1af6":function(t,e,n){var a=n("63b6");a(a.S,"Array",{isArray:n("9003")})},"20fd":function(t,e,n){"use strict";var a=n("d9f6"),i=n("aebd");t.exports=function(t,e,n){e in t?a.f(t,e,i(0,n)):t[e]=n}},"3d47":function(t,e,n){},"435d":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("van-nav-bar",{attrs:{title:"点检列表","left-text":"首页","left-arrow":""},on:{"click-left":t.onClickHome}}),n("div",{staticClass:"con"},[n("van-tabs",{attrs:{color:"#000",background:"#fff",sticky:!0},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[n("van-tab",{attrs:{title:"待我处理"}},[n("listComp",{attrs:{type:1}})],1),n("van-tab",{attrs:{title:"我已处理"}},[n("listComp",{attrs:{type:2}})],1),n("van-tab",{attrs:{title:"我发起的"}},[n("listComp",{attrs:{type:3}})],1)],1)],1)],1)},i=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"p-list"},[n("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshFlag,callback:function(e){t.refreshFlag=e},expression:"refreshFlag"}},[n("van-list",{attrs:{finished:t.finishFlag,"finished-text":"没有更多了",offset:0},on:{load:t.onLoad},model:{value:t.loadingFlag,callback:function(e){t.loadingFlag=e},expression:"loadingFlag"}},t._l(t.aEventPending,(function(e){return n("div",{key:e.id,staticClass:"minBox",on:{click:function(n){return t.onPendingEvent(e)}}},[n("div",{staticClass:"flex col"},[n("span",[t._v("事件编号")]),n("span",[t._v(t._s(e.checkNo))])]),n("div",{staticClass:"flex col"},[n("span",[t._v("分配人:")]),n("span",[t._v(t._s(e.examinerName))])]),n("div",{staticClass:"flex col"},[n("span",[t._v("执行人:")]),n("span",[t._v(t._s(e.assignerName))])]),n("div",{staticClass:"flex col"},[n("span",[t._v("事件起始时间:")]),n("span",[t._v(t._s(e.startTimeToString))])]),n("div",{staticClass:"flex col"},[n("span",[t._v("事件结束时间:")]),n("span",[t._v(t._s(e.endTimeToString))])]),n("div",{staticClass:"flex col"},[n("span",[t._v("事件状态:")]),0==e.checkStatus?n("div",[n("span",{staticClass:"p-color-red"},[t._v(t._s(t.oStatusMap[e.checkStatus]))]),t._v("(\n            "),n("span",{staticClass:"p-color-red"},[t._v(t._s(e.allDetail-e.complete))]),t._v("/\n            "),n("span",[t._v(t._s(e.allDetail))]),t._v(")\n          ")]):t._e(),1==e.checkStatus?n("div",[n("span",[t._v(t._s(t.oStatusMap[e.checkStatus]))])]):t._e(),2==e.checkStatus?n("div",[n("span",[t._v(t._s(t.oStatusMap[e.checkStatus]))])]):t._e()]),n("div",{staticClass:"flex col"},[n("span",[t._v("逾期状态:")]),n("div",[n("span",{class:[t.fnOverTimeStr(e.actualTime,e.endTimeToString).flag?"p-color-blue":"p-color-red"]},[t._v(t._s(t.fnOverTimeStr(e.actualTime,e.endTimeToString).str))])])]),n("van-divider"),n("div",{staticClass:"flex col",staticStyle:{color:"#f00",display:"flex","justify-content":"flex-end"}},[n("span",[t._v(t._s(t.fnTips(e)))])])],1)})),0)],1)],1)},s=[],o=(n("8e6e"),n("ac6a"),n("456d"),n("75fc")),c=n("bd86"),l=(n("96cf"),n("3b8d")),f=n("9788"),u=n("c1df"),d=n.n(u);function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){Object(c["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var h={0:"未完成",1:"已提交",2:"已完成"},g={props:{type:{required:!0,default:1}},data:function(){return{oStatusMap:h,aEventPending:[],loadingFlag:!1,finishFlag:!1,refreshFlag:!1,oPagination:{page:1,limit:5},userInfo:JSON.parse(localStorage.getItem("userInfo"))||{}}},methods:{apiGetEventList:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(){var e,n,a,i,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={1:f["g"],2:f["h"],3:f["i"]},this.loadingFlag=!1,t.next=4,n[this.type](v({personId:localStorage.getItem("uid")},this.oPagination));case 4:a=t.sent,i=0,r=0,a.hasOwnProperty("dinfolist1")&&(i++,a.dinfolist1.length<this.oPagination.limit&&r++),a.hasOwnProperty("dinfolist2")&&(i++,a.dinfolist2.length<this.oPagination.limit&&r++),a.hasOwnProperty("dinfolist3")&&(i++,a.dinfolist3.length<this.oPagination.limit&&r++),i==r&&(this.finishFlag=!0),s=[].concat(Object(o["a"])(a.dinfolist1||[]),Object(o["a"])(a.dinfolist2||[]),Object(o["a"])(a.dinfolist3||[])),(e=this.aEventPending).push.apply(e,Object(o["a"])(s));case 13:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onPendingEvent:function(t){0==t.checkStatus&&1==this.type&&this.$router.push({name:"checkoutEventDetail",query:{id:t.id}}),1==t.checkStatus&&1==this.type&&this.$router.push({name:"commentEventDetail",query:{id:t.id}}),2!=this.type&&3!=this.type||this.$router.push({name:"commentEventDetail1",query:{id:t.id}})},onRefresh:function(){this.loadingFlag=!0,this.finishFlag=!1,this.oPagination.page=1,this.onLoad()},onLoad:function(){this.refreshFlag?(this.aEventPending=[],this.refreshFlag=!1):this.oPagination.page++,this.apiGetEventList()},fnOverTimeStr:function(t,e){var n=t?d()(t):d()(),a=d()(e);if(n<a){var i=d.a.duration(a.diff(n)).asMinutes();return{flag:!0,str:"未逾期 (剩余".concat(parseInt(i/60),"小时").concat(parseInt(i%60),"分)")}}var r=d.a.duration(a.diff(n)).asMinutes();return{flag:!1,str:"已逾期 (剩余".concat(parseInt(r/60),"小时").concat(parseInt(r%60),"分)")}},fnTips:function(t){return 0==t.checkStatus?"".concat(t.examinerName,"创建了事件，等待").concat(t.assignerName,"处理。"):1==t.checkStatus?"".concat(t.assignerName,"完成事件，等待").concat(t.examinerName,"验收。"):2==t.checkStatus?"".concat(t.examinerName,"验收事件通过，事件结束。"):void 0}},created:function(){this.apiGetEventList()},computed:{}},b=g,m=(n("0daf"),n("2877")),y=Object(m["a"])(b,r,s,!1,null,"5ab43b37",null),_=y.exports,O={components:{listComp:_},data:function(){return{active:0}},created:function(){},methods:{onClickHome:function(){this.$router.push("/")}},mounted:function(){}},x=O,S=(n("ba69"),Object(m["a"])(x,a,i,!1,null,"ac4f04fa",null));e["default"]=S.exports},"549b":function(t,e,n){"use strict";var a=n("d864"),i=n("63b6"),r=n("241e"),s=n("b0dc"),o=n("3702"),c=n("b447"),l=n("20fd"),f=n("7cd6");i(i.S+i.F*!n("4ee1")((function(t){Array.from(t)})),"Array",{from:function(t){var e,n,i,u,d=r(t),p="function"==typeof this?this:Array,v=arguments.length,h=v>1?arguments[1]:void 0,g=void 0!==h,b=0,m=f(d);if(g&&(h=a(h,v>2?arguments[2]:void 0,2)),void 0==m||p==Array&&o(m))for(e=c(d.length),n=new p(e);e>b;b++)l(n,b,g?h(d[b],b):d[b]);else for(u=m.call(d),n=new p;!(i=u.next()).done;b++)l(n,b,g?s(u,h,[i.value,b],!0):i.value);return n.length=b,n}})},"54a1":function(t,e,n){n("6c1c"),n("1654"),t.exports=n("95d5")},"75fc":function(t,e,n){"use strict";var a=n("a745"),i=n.n(a);function r(t){if(i()(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var s=n("774e"),o=n.n(s),c=n("c8bb"),l=n.n(c);function f(t){if(l()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){return r(t)||f(t)||u()}n.d(e,"a",(function(){return d}))},"774e":function(t,e,n){t.exports=n("d2d5")},9003:function(t,e,n){var a=n("6b4c");t.exports=Array.isArray||function(t){return"Array"==a(t)}},"95d5":function(t,e,n){var a=n("40c3"),i=n("5168")("iterator"),r=n("481b");t.exports=n("584a").isIterable=function(t){var e=Object(t);return void 0!==e[i]||"@@iterator"in e||r.hasOwnProperty(a(e))}},a745:function(t,e,n){t.exports=n("f410")},a7b5:function(t,e,n){},ba69:function(t,e,n){"use strict";var a=n("a7b5"),i=n.n(a);i.a},c8bb:function(t,e,n){t.exports=n("54a1")},d2d5:function(t,e,n){n("1654"),n("549b"),t.exports=n("584a").Array.from},f410:function(t,e,n){n("1af6"),t.exports=n("584a").Array.isArray}}]);
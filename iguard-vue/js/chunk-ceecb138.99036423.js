(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ceecb138"],{"2fdb":function(t,e,n){"use strict";var i=n("5ca1"),a=n("d2c8"),r="includes";i(i.P+i.F*n("5147")(r),"String",{includes:function(t){return!!~a(this,t,r).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},5147:function(t,e,n){var i=n("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[i]=!1,!"/./"[t](e)}catch(a){}}return!0}},6762:function(t,e,n){"use strict";var i=n("5ca1"),a=n("c366")(!0);i(i.P,"Array",{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},"7cdf":function(t,e,n){"use strict";var i=n("8f7d"),a=n.n(i);a.a},"8f7d":function(t,e,n){},aa77:function(t,e,n){var i=n("5ca1"),a=n("be13"),r=n("79e5"),s=n("fdef"),o="["+s+"]",c="​",l=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),f=function(t,e,n){var a={},o=r((function(){return!!s[t]()||c[t]()!=c})),l=a[t]=o?e(d):s[t];n&&(a[n]=l),i(i.P+i.F*o,"String",a)},d=f.trim=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=f},c5f6:function(t,e,n){"use strict";var i=n("7726"),a=n("69a8"),r=n("2d95"),s=n("5dbc"),o=n("6a99"),c=n("79e5"),l=n("9093").f,u=n("11e9").f,f=n("86cc").f,d=n("aa77").trim,p="Number",v=i[p],h=v,g=v.prototype,m=r(n("2aeb")(g))==p,E="trim"in String.prototype,I=function(t){var e=o(t,!1);if("string"==typeof e&&e.length>2){e=E?e.trim():d(e,3);var n,i,a,r=e.charCodeAt(0);if(43===r||45===r){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+e}for(var s,c=e.slice(2),l=0,u=c.length;l<u;l++)if(s=c.charCodeAt(l),s<48||s>a)return NaN;return parseInt(c,i)}}return+e};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof v&&(m?c((function(){g.valueOf.call(n)})):r(n)!=p)?s(new h(I(e)),n,v):I(e)};for(var b,_=n("9e1e")?l(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;_.length>k;k++)a(h,b=_[k])&&!a(v,b)&&f(v,b,u(h,b));v.prototype=g,g.constructor=v,n("2aba")(i,p,v)}},d2c8:function(t,e,n){var i=n("aae3"),a=n("be13");t.exports=function(t,e,n){if(i(e))throw TypeError("String#"+n+" doesn't accept regex!");return String(a(t))}},e484:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"checkout-event-detail-container"},[n("van-nav-bar",{staticStyle:{position:"fixed",width:"100%"},attrs:{title:"事件详情","left-arrow":""},on:{"click-left":t.onBack}}),n("div",{staticClass:"content"},[n("div",{staticClass:"top-block"},[n("div",{staticClass:"left"},[n("span",{staticStyle:{"margin-right":"8px"}},[t._v("未完成/总数")]),n("span",{staticClass:"p-danger"},[t._v(t._s(t.oEventInfo.incomplete||0))]),t._v("/\n        "),n("span",[t._v(t._s(t.oEventInfo.allDetail||0))])]),n("div",{staticClass:"right"},[n("span",{staticStyle:{"margin-right":"8px"}},[t._v("异常/总数")]),n("span",{staticClass:"p-danger"},[t._v(t._s(t.oEventInfo.isError||0))]),t._v("/\n        "),n("span",[t._v(t._s(t.oEventInfo.allDetail||0))])])]),n("van-list",{attrs:{finished:t.finishFlag},on:{load:t.onLoad},model:{value:t.loadingFlag,callback:function(e){t.loadingFlag=e},expression:"loadingFlag"}},t._l(t.aEvent,(function(e,i){return n("van-cell",{key:e.id,attrs:{title:e.name,center:""},scopedSlots:t._u([{key:"title",fn:function(){return[n("div",{class:["cell-item",0==e.checkStatus?"p-danger":""],on:{click:function(n){return t.onItemDetail(e)}}},[n("div",{staticClass:"item-index"},[t._v(t._s(i+1))]),n("div",{staticClass:"item-position"},[t._v(t._s(e.buildingName)+"/"+t._s(e.floorName))]),n("div",{staticClass:"item-architecture"},[t._v(t._s(e.name))]),n("div",{class:["item-status",2==e.checkStatus?"p-danger":""]},[t._v(t._s(t.oStatusMap[e.checkStatus]))])])]},proxy:!0}],null,!0)})})),1),"detail"!=t.pageType?n("div",{staticClass:"btn-group"},[n("van-button",{attrs:{type:"default",color:"#A68E44"},on:{click:t.onScanCode}},[t._v("扫描二维码")])],1):t._e()],1),n("van-popup",{model:{value:t.itemVisible,callback:function(e){t.itemVisible=e},expression:"itemVisible"}},[n("div",{staticClass:"pop-content"},[n("div",{staticClass:"title"},[t._v(t._s(t.oEquipmentInfo.name))]),n("van-cell-group",[n("van-cell",{attrs:{title:"设备位置",value:t.oEquipmentInfo.buildingName+"/"+t.oEquipmentInfo.floorName}}),n("van-cell",{attrs:{title:"检查时间",value:t.oEquipmentInfo.checkTime}}),n("van-cell",{attrs:{title:"状态",value:t.oStatusMap[t.oEquipmentInfo.checkStatus]}}),n("van-cell",{attrs:{title:"备注",value:t.oEquipmentInfo.checkRemark}}),n("van-uploader",{attrs:{"show-upload":!1,multiple:""},model:{value:t.fileList,callback:function(e){t.fileList=e},expression:"fileList"}})],1)],1)])],1)},a=[],r=(n("28a5"),n("96cf"),n("3b8d")),s=(n("c5f6"),n("6762"),n("2fdb"),n("9788")),o=n("6e51"),c={0:"-",1:"已检查",2:"异常"},l={components:{},data:function(){return{oStatusMap:c,loadingFlag:!1,finishFlag:!1,refreshFlag:!1,aEvent:[],aEventId:[],oEventInfo:{},itemVisible:!1,oEquipmentInfo:{},fileList:[],pageType:this.$route.query.type}},created:function(){this.apiGetEventDetailList()},mounted:function(){},methods:{onRefresh:function(){this.finishFlag=!1,this.oPagination.page=0,this.onLoad()},onLoad:function(){this.loadingFlag=!1,this.apiGetEventDetailList()},onBack:function(){this.$router.go(-1)},onItemDetail:function(t){"detail"==this.pageType&&(this.itemVisible=!0,this.apiGetEquipmentDetail(t.detailId))},onScanCode:function(t){var e=this;Object(o["b"])((function(t){if(console.log("scanResult:",t.resultStr),console.log("aEventId:",e.aEventId),e.aEventId.includes(Number(t.resultStr))){var n=e.aEvent.filter((function(e){return e.id==t.resultStr}));e.$router.push({name:"checkoutEventEquipmentDetail",query:{detailId:(n[0]||{}).detailId}})}else e.$toast("二维码无效")}))},apiGetEventDetailList:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["f"])({id:this.$route.query.id});case 2:e=t.sent,console.log("getEventDetailListApi:",e),e&&(this.oEventInfo=e.dinfo,this.aEvent=e.dinfolist,this.aEventId=e.dinfolist.map((function(t){return t.id})));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),apiGetEquipmentDetail:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["d"])({detailId:e});case 2:n=t.sent,n&&(this.oEquipmentInfo=n.dinfo,n.dinfo.checkImg?this.fileList=n.dinfo.checkImg.split(",").map((function(t){return{url:t}})):this.fileList=[]),console.log("getEquipmentDetailApi:",n);case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},computed:{}},u=l,f=(n("7cdf"),n("2877")),d=Object(f["a"])(u,i,a,!1,null,"73d71a28",null);e["default"]=d.exports},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-508b351b"],{"07e3":function(t,o){var e={}.hasOwnProperty;t.exports=function(t,o){return e.call(t,o)}},"1bc3":function(t,o,e){var n=e("f772");t.exports=function(t,o){if(!n(t))return t;var e,s;if(o&&"function"==typeof(e=t.toString)&&!n(s=e.call(t)))return s;if("function"==typeof(e=t.valueOf)&&!n(s=e.call(t)))return s;if(!o&&"function"==typeof(e=t.toString)&&!n(s=e.call(t)))return s;throw TypeError("Can't convert object to primitive value")}},"1ec9":function(t,o,e){var n=e("f772"),s=e("e53d").document,i=n(s)&&n(s.createElement);t.exports=function(t){return i?s.createElement(t):{}}},"294c":function(t,o){t.exports=function(t){try{return!!t()}catch(o){return!0}}},"35e8":function(t,o,e){var n=e("d9f6"),s=e("aebd");t.exports=e("8e60")?function(t,o,e){return n.f(t,o,s(1,e))}:function(t,o,e){return t[o]=e,t}},"42ac":function(t,o,e){},"454f":function(t,o,e){e("46a7");var n=e("584a").Object;t.exports=function(t,o,e){return n.defineProperty(t,o,e)}},"46a7":function(t,o,e){var n=e("63b6");n(n.S+n.F*!e("8e60"),"Object",{defineProperty:e("d9f6").f})},"584a":function(t,o){var e=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=e)},"63b6":function(t,o,e){var n=e("e53d"),s=e("584a"),i=e("d864"),r=e("35e8"),l=e("07e3"),a="prototype",c=function(t,o,e){var p,u,h,d=t&c.F,m=t&c.G,f=t&c.S,w=t&c.P,v=t&c.B,g=t&c.W,y=m?s:s[o]||(s[o]={}),D=y[a],b=m?n:f?n[o]:(n[o]||{})[a];for(p in m&&(e=o),e)u=!d&&b&&void 0!==b[p],u&&l(y,p)||(h=u?b[p]:e[p],y[p]=m&&"function"!=typeof b[p]?e[p]:v&&u?i(h,n):g&&b[p]==h?function(t){var o=function(o,e,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(o);case 2:return new t(o,e)}return new t(o,e,n)}return t.apply(this,arguments)};return o[a]=t[a],o}(h):w&&"function"==typeof h?i(Function.call,h):h,w&&((y.virtual||(y.virtual={}))[p]=h,t&c.R&&D&&!D[p]&&r(D,p,h)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},"794b":function(t,o,e){t.exports=!e("8e60")&&!e("294c")((function(){return 7!=Object.defineProperty(e("1ec9")("div"),"a",{get:function(){return 7}}).a}))},"79aa":function(t,o){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},"85f2":function(t,o,e){t.exports=e("454f")},"8d6b":function(t,o,e){"use strict";var n=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{ref:"mescroll",staticClass:"mescroll"},[e("div",[t._t("default")],2)])},s=[],i=e("f868"),r=e.n(i),l=(e("f2fd"),{name:"MeScrollVue",data:function(){return{mescroll:null,lastScrollTop:0,lastBounce:null}},props:{up:Object,down:Object},mounted:function(){this.mescroll=new r.a(this.$refs.mescroll,{up:this.up,down:this.down}),this.$emit("init",this.mescroll)},methods:{beforeRouteEnter:function(){var t=this;this.mescroll&&(this.lastScrollTop&&(this.mescroll.setScrollTop(this.lastScrollTop),setTimeout((function(){t.mescroll.setTopBtnFadeDuration(0)}),16)),null!=this.lastBounce&&this.mescroll.setBounce(this.lastBounce))},beforeRouteLeave:function(){this.mescroll&&(this.lastScrollTop=this.mescroll.getScrollTop(),this.mescroll.hideTopBtn(0),this.lastBounce=this.mescroll.optUp.isBounce,this.mescroll.setBounce(!0))}}}),a=l,c=e("2877"),p=Object(c["a"])(a,n,s,!1,null,null,null);o["a"]=p.exports},"8e60":function(t,o,e){t.exports=!e("294c")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},"972b":function(t,o,e){"use strict";var n=e("42ac"),s=e.n(n);s.a},aebd:function(t,o){t.exports=function(t,o){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:o}}},bd86:function(t,o,e){"use strict";e.d(o,"a",(function(){return i}));var n=e("85f2"),s=e.n(n);function i(t,o,e){return o in t?s()(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}},d864:function(t,o,e){var n=e("79aa");t.exports=function(t,o,e){if(n(t),void 0===o)return t;switch(e){case 1:return function(e){return t.call(o,e)};case 2:return function(e,n){return t.call(o,e,n)};case 3:return function(e,n,s){return t.call(o,e,n,s)}}return function(){return t.apply(o,arguments)}}},d9f6:function(t,o,e){var n=e("e4ae"),s=e("794b"),i=e("1bc3"),r=Object.defineProperty;o.f=e("8e60")?Object.defineProperty:function(t,o,e){if(n(t),o=i(o,!0),n(e),s)try{return r(t,o,e)}catch(l){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[o]=e.value),t}},dbb4:function(t,o,e){"use strict";e.r(o);var n,s=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"box"},[e("van-nav-bar",{attrs:{title:"无任务签到","left-arrow":"",fixed:!0},on:{"click-left":t.onClickLeft},scopedSlots:t._u([{key:"right",fn:function(){return[e("van-icon",{attrs:{name:"filter-o",size:"18"},on:{click:t.isShow}})]},proxy:!0}])}),e("van-popup",{style:{height:"100%"},attrs:{position:"top"},model:{value:t.show,callback:function(o){t.show=o},expression:"show"}},[e("van-cell-group",{staticClass:"flex"},[e("van-field",{attrs:{placeholder:"开始时间",readonly:""},on:{click:t.kaiShi},model:{value:t.time,callback:function(o){t.time=o},expression:"time"}}),t._v("-\n      "),e("van-field",{attrs:{placeholder:"结束时间",readonly:""},on:{click:t.jieShu},model:{value:t.time1,callback:function(o){t.time1=o},expression:"time1"}})],1),t.startTime?e("van-datetime-picker",{attrs:{type:"datetime",title:"选择开始时间","min-date":t.minDate,"max-date":t.maxDate},on:{confirm:t.okTime,cancel:function(o){t.startTime=!1}},model:{value:t.currentDate,callback:function(o){t.currentDate=o},expression:"currentDate"}}):t._e(),t.endTime?e("van-datetime-picker",{attrs:{type:"datetime",title:"选择结束时间","min-date":t.minDate1,"max-date":t.maxDate},on:{confirm:t.overTime1,cancel:function(o){t.endTime=!1}},model:{value:t.currentDate,callback:function(o){t.currentDate=o},expression:"currentDate"}}):t._e(),e("div",{staticClass:"btn1 flex"},[e("van-button",{attrs:{color:"#999"},on:{click:function(o){t.show=!1}}},[t._v("取消")]),e("van-button",{attrs:{color:"#a48f36"},on:{click:t.end}},[t._v("确认")])],1)],1),e("div",{staticClass:"con"},[e("Mescroll-vue",{ref:"mescroll",staticClass:"mescroll",attrs:{up:t.mescrollUp},on:{init:t.mescrollInit}},[e("div",{staticClass:"tab"},[e("div",{staticClass:"flex title1"},[e("span",[t._v("位置")]),e("span",[t._v("设备名称")]),e("span",[t._v("签到时间")])]),t._l(t.list,(function(o,n){return e("div",{key:n,staticClass:"content"},[e("div",{staticClass:"black flex_a"},[e("span",{staticClass:"jianZhu yihang",on:{click:function(e){return t.tiShi(o.buildingName,o.floorName)}}},[t._v(t._s(o.buildingName)+"/"+t._s(o.floorName))]),e("span",{staticClass:"building yihang",on:{click:function(e){return t.tiShi(o.patrolPointName)}}},[t._v(t._s(o.patrolPointName))]),null==o.createTime?e("span",{staticClass:"time"},[t._v("- -")]):e("span",{staticClass:"time"},[t._v(t._s(t._f("timeFilter")(o.createTime)))])]),e("div",{staticClass:"keep flex_r"},["3"==o.faceCheck?e("span",{staticClass:"renLianRed"},[t._v("人脸核验")]):"2"==o.faceCheck?e("span",{staticClass:"renLianGreen"},[t._v("人脸核验")]):"1"==o.faceCheck?e("span",[t._v("人脸核验")]):t._e()])])}))],2)])],1),e("div",{staticClass:"num5000"},[e("van-popup",{staticStyle:{background:"pink"},model:{value:t.show3,callback:function(o){t.show3=o},expression:"show3"}},[e("div",[e("p",[t._v("未检测到巡更点")]),e("p",[t._v("请确认在巡更点的有效范围内")])]),e("div",{staticClass:"num5000Btn"},[e("van-button",{attrs:{color:"#a48f36"},on:{click:function(o){t.show3=!1}}},[t._v("确认")])],1)])],1),e("div",{staticClass:"num5000"},[e("van-popup",{staticStyle:{background:"pink"},model:{value:t.show1,callback:function(o){t.show1=o},expression:"show1"}},[e("div",[e("p",[t._v("无效的巡更点")]),e("p",[t._v("没有检测到本次任务中的巡更点")])]),e("div",{staticClass:"num5000Btn"},[e("van-button",{attrs:{color:"#a48f36"},on:{click:function(o){t.show1=!1}}},[t._v("确认")])],1)])],1),e("div",{staticClass:"num500010"},[e("van-popup",{staticStyle:{background:"rgb(225,252,181)"},model:{value:t.show2,callback:function(o){t.show2=o},expression:"show2"}},[e("div",[e("p",[t._v("签到成功")]),e("p",{staticClass:"hang flex"},[e("span",[t._v("巡更位置：")]),e("span",[t._v(t._s(t.weiZhiName))])]),e("p",{staticClass:"hang flex"},[e("span",[t._v("巡更点：")]),e("span",[t._v(t._s(t.xunGengDian))])])]),e("div",{staticClass:"num5000Btn"},[e("van-button",{attrs:{color:"#a48f36"},on:{click:t.over}},[t._v("确认")])],1)])],1),e("div",{staticClass:"btn"},[e("van-button",{attrs:{type:"primary",size:"large",color:"#a48f36"},on:{click:t.sign}},[t._v("签到")])],1)],1)},i=[],r=e("bd86"),l=(e("7f7f"),e("8d6b")),a=e("6e51"),c={components:{MescrollVue:l["a"]},beforeRouteLeave:function(t,o,e){"keepWatchDetails"!==t.name&&this.mescroll.setBounce(!0),e()},data:function(){var t;return t={zi:"出来吧大哥",show:!1,time:null,time1:null,minDate:new Date(1970,1,1),minDate1:new Date,maxDate:new Date(3e3,10,1),currentDate:new Date,startTime:!1,endTime:!1,flag:!1,taskId:"",mescrollUp:{isBounce:!1,callback:this.upCallback,noMoreSize:1,toTop:{warpId:null,src:"http://www.mescroll.com/img/mescroll-totop.png",html:null,offset:1e3,warpClass:"mescroll-totop",showClass:"mescroll-fade-in",hideClass:"mescroll-fade-out",duration:300,supportTap:!1,btnClick:null}},endNum:{},list:[],qianDao:{beaconsParams:[],uid:localStorage.getItem("uid")}},Object(r["a"])(t,"show",!1),Object(r["a"])(t,"show1",!1),Object(r["a"])(t,"show2",!1),Object(r["a"])(t,"show3",!1),Object(r["a"])(t,"overTime",""),Object(r["a"])(t,"nowTime",new Date),Object(r["a"])(t,"weiZhiName",""),Object(r["a"])(t,"xunGengDian",""),t},mounted:function(){var t=Object(a["e"])("event");if(localStorage.setItem("time",this.$route.query.time),this.overTime=localStorage.getItem("time"),localStorage.setItem("keepWatchId",this.$route.query.id),this.taskId=localStorage.getItem("keepWatchId"),""!==t){var o=JSON.parse(decodeURIComponent(t));console.log("下面是obj1"),this.taskId=o.taskId,console.log(o),this.qianDao.beaconsParams=o.beacons,this.qianDao.taskDetailId=o.taskId,this.overTime=o.time,localStorage.setItem("keepWatchId",o.taskId),console.log("下面是qianDao"),console.log(this.qianDao),this.beacons(this.qianDao)}},methods:(n={p:function(t){return t<10?"0"+t:t},onClickLeft:function(){this.$router.push("/keepWatch")},kaiShi:function(){this.startTime=!0,this.endTime=!1},jieShu:function(){this.startTime=!1,this.endTime=!0},okTime:function(t){var o=new Date(t);this.startTime=!1,this.endTime=!1,this.time=o.getFullYear()+"-"+this.p(o.getMonth()+1)+"-"+this.p(o.getDate())+" "+this.p(o.getHours())+":"+this.p(o.getMinutes())+":00"},overTime1:function(t){var o=new Date(t);this.startTime=!1,this.endTime=!1,this.time1=o.getFullYear()+"-"+this.p(o.getMonth()+1)+"-"+this.p(o.getDate())+" "+this.p(o.getHours())+":"+this.p(o.getMinutes())+":59"},end:function(){console.log("aaa"),console.log(this.time),console.log(this.time1),this.mescroll.resetUpScroll()},isShow:function(){this.show=!0},mescrollInit:function(t){this.mescroll=t},over:function(){this.show2=!1,this.mescroll.resetUpScroll()},over1:function(){this.show3=!1,this.mescroll.resetUpScroll()},upCallback:function(t,o){var e=this,n=t.num-1;this.keepAxios.post(this.baseUrl.keepAxios+"/app/patrolTask/noTaskSignList",{uid:localStorage.getItem("uid"),page:n,pageSize:50,startTime:this.time,endTime:this.time1}).then((function(n){e.show=!1,console.log(n),e.endNum=n.data.data.rows;var s=n.data.data.rows;1===t.num&&(e.list=[]),e.list=e.list.concat(s),e.$nextTick((function(){o.endSuccess(s.length,!0)}))})).catch((function(t){console.log(t)}))}},Object(r["a"])(n,"onClickLeft",(function(){this.$router.push("/keepWatch")})),Object(r["a"])(n,"beacons",(function(t){var o=this;console.log("调用接口的Obj"),console.log(t),this.keepAxios.post(this.baseUrl.keepAxios+"/app/patrolTask/noTaskSign",t).then((function(t){console.log("这个是扫描后掉的接口"),console.log(t),"50005"==t.data.data.status?(console.log("这里是扫描失败或者没扫到"),o.show3=!0,o.show1=!1,o.show2=!1):"50000"==t.data.data.status?(o.$toast("签到失败"),o.show3=!1,o.show1=!0,o.show2=!1):"无任务签到成功"==t.data.msg&&"20000"==t.data.code&&(o.$toast("签到成功"),o.xunGengDian=t.data.data.patrolName,"null"==t.data.data.floorName?o.weiZhiName=t.data.data.buildingName:o.weiZhiName=t.data.data.buildingName+"/"+t.data.data.floorName,o.show3=!1,o.show1=!1,o.show2=!0)}))})),Object(r["a"])(n,"up",(function(){console.log("我是故障上报"),this.$router.push({path:"/fault",query:{taskId:this.taskId}})})),Object(r["a"])(n,"sign",(function(){console.log(this.taskId),Object(a["c"])(this.taskId,this.overTime)})),Object(r["a"])(n,"tiShi",(function(t,o){null==o?this.$toast(t):this.$toast(t+"/"+o)})),n)},p=c,u=(e("972b"),e("2877")),h=Object(u["a"])(p,s,i,!1,null,"72566f1c",null);o["default"]=h.exports},e4ae:function(t,o,e){var n=e("f772");t.exports=function(t){if(!n(t))throw TypeError(t+" is not an object!");return t}},e53d:function(t,o){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},f2fd:function(t,o,e){},f772:function(t,o){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},f868:function(t,o,e){var n,s;(function(i,r){n=r,s="function"===typeof n?n.call(o,e,o,t):n,void 0===s||(t.exports=s)})(0,(function(){var t=function(t,o){var e=this;if(e.version="1.4.0",e.isScrollBody=!t||"body"===t,e.scrollDom=e.isScrollBody?document.body:e.getDomById(t),e.scrollDom){e.options=o||{};var n=navigator.userAgent,s=!!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),i="undefined"===typeof window.orientation,r=n.indexOf("Android")>-1||n.indexOf("Adr")>-1;e.os={ios:s,pc:i,android:r},e.isDownScrolling=!1,e.isUpScrolling=!1;var l=e.options.down&&e.options.down.callback;e.initDownScroll(),e.initUpScroll(),setTimeout((function(){e.optDown.use&&e.optDown.auto&&l&&(e.optDown.autoShowLoading?e.triggerDownScroll():e.optDown.callback&&e.optDown.callback(e)),e.optUp.use&&e.optUp.auto&&!e.isUpAutoLoad&&e.triggerUpScroll()}),30)}};return t.prototype.extendDownScroll=function(o){t.extend(o,{use:!0,auto:!0,autoShowLoading:!1,isLock:!1,isBoth:!1,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,hardwareClass:"mescroll-hardware",mustToTop:!1,warpId:null,warpClass:"mescroll-downwarp",resetClass:"mescroll-downwarp-reset",textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ...",htmlContent:'<p class="downwarp-progress"></p><p class="downwarp-tip"></p>',inited:function(t,o){t.downTipDom=o.getElementsByClassName("downwarp-tip")[0],t.downProgressDom=o.getElementsByClassName("downwarp-progress")[0]},inOffset:function(t){t.downTipDom&&(t.downTipDom.innerHTML=t.optDown.textInOffset),t.downProgressDom&&t.downProgressDom.classList.remove("mescroll-rotate")},outOffset:function(t){t.downTipDom&&(t.downTipDom.innerHTML=t.optDown.textOutOffset)},onMoving:function(t,o,e){if(t.downProgressDom){var n=360*o;t.downProgressDom.style.webkitTransform="rotate("+n+"deg)",t.downProgressDom.style.transform="rotate("+n+"deg)"}},beforeLoading:function(t,o){return!1},showLoading:function(t){t.downTipDom&&(t.downTipDom.innerHTML=t.optDown.textLoading),t.downProgressDom&&t.downProgressDom.classList.add("mescroll-rotate")},afterLoading:function(t){return 0},callback:function(t){t.resetUpScroll()}})},t.prototype.extendUpScroll=function(o){var e=this.os.pc;t.extend(o,{use:!0,auto:!0,isLock:!1,isBoth:!1,isBounce:!0,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,offset:100,toTop:{warpId:null,src:null,html:null,offset:1e3,warpClass:"mescroll-totop",showClass:"mescroll-fade-in",hideClass:"mescroll-fade-out",fadeDuration:.5,duration:300,supportTap:!1,btnClick:null},loadFull:{use:!1,delay:500},empty:{warpId:null,icon:null,tip:"暂无相关数据~",btntext:"",btnClick:null,supportTap:!1},clearId:null,clearEmptyId:null,hardwareClass:"mescroll-hardware",warpId:null,warpClass:"mescroll-upwarp",htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',htmlNodata:'<p class="upwarp-nodata">-- END --</p>',inited:function(t,o){},showLoading:function(t,o){o.innerHTML=t.optUp.htmlLoading},showNoMore:function(t,o){o.innerHTML=t.optUp.htmlNodata},onScroll:null,scrollbar:{use:e,barClass:"mescroll-bar"},lazyLoad:{use:!1,attr:"imgurl",showClass:"mescroll-lazy-in",delay:500,offset:200}})},t.extend=function(o,e){if(!o)return e;for(var n in e)null==o[n]?o[n]=e[n]:"object"===typeof o[n]&&t.extend(o[n],e[n]);return o},t.prototype.initDownScroll=function(){var t=this;if(t.optDown=t.options.down||{},t.extendDownScroll(t.optDown),t.touchstartEvent=function(o){t.isScrollTo&&t.preventDefault(o),t.startPoint=t.getPoint(o),t.lastPoint=t.startPoint,t.maxTouchmoveY=t.getBodyHeight()-t.optDown.bottomOffset,t.inTouchend=!1;var e=t.getScrollTop();t.isKeepTop=0===e,t.os.pc&&e<=0&&(t.scrollDom.addEventListener("mousemove",t.touchmoveEvent,{passive:!1}),document.ondragstart=function(){return!1})},t.scrollDom.addEventListener("mousedown",t.touchstartEvent),t.scrollDom.addEventListener("touchstart",t.touchstartEvent),t.touchmoveEvent=function(o){if(t.startPoint){var e=t.getScrollTop();e>0&&(t.isKeepTop=!1);var n=t.getPoint(o),s=n.y-t.startPoint.y;if(s>0){if(e<=0&&(t.preventDefault(o),t.optDown.use&&!t.inTouchend&&!t.isDownScrolling&&!t.optDown.isLock&&(!t.isUpScrolling||t.isUpScrolling&&t.optUp.isBoth))){if(t.optDown.mustToTop&&!t.isKeepTop)return;var i=Math.abs(t.lastPoint.x-n.x),r=Math.abs(t.lastPoint.y-n.y),l=Math.sqrt(i*i+r*r);if(0!==l){var a=Math.asin(r/l)/Math.PI*180;if(a<t.optDown.minAngle)return}if(t.maxTouchmoveY>0&&n.y>=t.maxTouchmoveY)return t.inTouchend=!0,void t.touchendEvent();var c=n.y-t.lastPoint.y;t.downHight||(t.downHight=0),t.downHight<t.optDown.offset?(1!==t.movetype&&(t.movetype=1,t.optDown.inOffset(t),t.downwarp.classList.remove(t.optDown.resetClass),t.isMoveDown=!0,t.os.ios&&!t.isKeepTop&&(t.scrollDom.classList.add(t.optDown.hardwareClass),t.scrollDom.style.webkitOverflowScrolling="auto",t.isSetScrollAuto=!0)),t.downHight+=c*t.optDown.inOffsetRate):(2!==t.movetype&&(t.movetype=2,t.optDown.outOffset(t),t.downwarp.classList.remove(t.optDown.resetClass),t.isMoveDown=!0,t.os.ios&&!t.isKeepTop&&(t.scrollDom.classList.add(t.optDown.hardwareClass),t.scrollDom.style.webkitOverflowScrolling="auto",t.isSetScrollAuto=!0)),t.downHight+=c>0?c*t.optDown.outOffsetRate:c),t.downwarp.style.height=t.downHight+"px";var p=t.downHight/t.optDown.offset;t.optDown.onMoving(t,p,t.downHight)}}else if(s<0){var u=t.getScrollHeight(),h=t.getClientHeight(),d=u-h-e;!t.optUp.isBounce&&d<=0&&t.preventDefault(o),t.optUp.use&&!t.optUp.isLock&&t.optUp.hasNext&&!t.isUpScrolling&&(!t.isDownScrolling||t.isDownScrolling&&t.optDown.isBoth)&&(h+t.optUp.offset>=u||d<=0)&&t.triggerUpScroll()}t.lastPoint=n}},t.scrollDom.addEventListener("touchmove",t.touchmoveEvent,{passive:!1}),t.touchendEvent=function(){t.optDown.use&&t.isMoveDown&&(t.downHight>=t.optDown.offset?t.triggerDownScroll():(t.downwarp.classList.add(t.optDown.resetClass),t.downHight=0,t.downwarp.style.height=0),t.isSetScrollAuto&&(t.scrollDom.style.webkitOverflowScrolling="touch",t.scrollDom.classList.remove(t.optDown.hardwareClass),t.isSetScrollAuto=!1),t.movetype=0,t.isMoveDown=!1),t.os.pc&&(t.scrollDom.removeEventListener("mousemove",t.touchmoveEvent),document.ondragstart=function(){return!0})},t.scrollDom.addEventListener("mouseup",t.touchendEvent),t.scrollDom.addEventListener("mouseleave",t.touchendEvent),t.scrollDom.addEventListener("touchend",t.touchendEvent),t.scrollDom.addEventListener("touchcancel",t.touchendEvent),t.optDown.use){t.downwarp=document.createElement("div"),t.downwarp.className=t.optDown.warpClass,t.downwarp.innerHTML='<div class="downwarp-content">'+t.optDown.htmlContent+"</div>";var o=t.optDown.warpId?t.getDomById(t.optDown.warpId):t.scrollDom;t.optDown.warpId&&o?o.appendChild(t.downwarp):(o||(o=t.scrollDom),o.insertBefore(t.downwarp,t.scrollDom.firstChild)),setTimeout((function(){t.optDown.inited(t,t.downwarp)}),0)}},t.prototype.preventDefault=function(t){t&&t.cancelable&&!t.defaultPrevented&&t.preventDefault()},t.prototype.getPoint=function(t){return{x:t.touches?t.touches[0].pageX:t.clientX,y:t.touches?t.touches[0].pageY:t.clientY}},t.prototype.triggerDownScroll=function(){this.optDown.beforeLoading(this,this.downwarp)||(this.showDownScroll(),this.optDown.callback&&this.optDown.callback(this))},t.prototype.showDownScroll=function(){this.isDownScrolling=!0,this.optDown.showLoading(this),this.downHight=this.optDown.offset,this.downwarp.classList.add(this.optDown.resetClass),this.downwarp.style.height=this.optDown.offset+"px"},t.prototype.endDownScroll=function(){var t=this,o=function(){t.downHight=0,t.downwarp.style.height=0,t.isDownScrolling=!1,t.downProgressDom&&t.downProgressDom.classList.remove("mescroll-rotate")},e=t.optDown.afterLoading(t);"number"===typeof e&&e>0?setTimeout(o,e):o()},t.prototype.lockDownScroll=function(t){null==t&&(t=!0),this.optDown.isLock=t},t.prototype.initUpScroll=function(){var t,o=this;(o.optUp=o.options.up||{use:!1},o.extendUpScroll(o.optUp),o.optUp.scrollbar.use&&o.scrollDom.classList.add(o.optUp.scrollbar.barClass),o.optUp.isBounce||o.setBounce(!1),!1!==o.optUp.use)&&(o.optUp.hasNext=!0,o.upwarp=document.createElement("div"),o.upwarp.className=o.optUp.warpClass,o.optUp.warpId&&(t=o.getDomById(o.optUp.warpId)),t||(t=o.scrollDom),t.appendChild(o.upwarp),o.preScrollY=0,o.lazyStartTime=(new Date).getTime(),o.lazyTag="mescroll-lazying",o.scrollEvent=function(){var t=o.getScrollTop(),e=t-o.preScrollY>0;if(o.preScrollY=t,!o.isUpScrolling&&(!o.isDownScrolling||o.isDownScrolling&&o.optDown.isBoth)&&!o.optUp.isLock&&o.optUp.hasNext){var n=o.getScrollHeight()-o.getClientHeight()-t;n<=o.optUp.offset&&e&&o.triggerUpScroll()}var s=o.optUp.toTop;if((s.src||s.html)&&(t>=s.offset?o.showTopBtn():o.hideTopBtn()),o.optUp.lazyLoad.use){var i=(new Date).getTime();o.lazyTimer&&clearTimeout(o.lazyTimer),i-o.lazyStartTime>=o.optUp.lazyLoad.delay?(o.lazyStartTime=i,o.lazyLoad(0)):o.lazyTimer=o.lazyLoad()}o.optUp.onScroll&&o.optUp.onScroll(o,t,e)},o.isScrollBody?window.addEventListener("scroll",o.scrollEvent):o.scrollDom.addEventListener("scroll",o.scrollEvent),setTimeout((function(){o.optUp.inited(o,o.upwarp)}),0))},t.prototype.setBounce=function(t){!this.isScrollBody&&this.os.ios&&(!1===t?(this.optUp.isBounce=!1,window.addEventListener("touchmove",this.bounceTouchmove,{passive:!1})):(this.optUp.isBounce=!0,window.removeEventListener("touchmove",this.bounceTouchmove)))},t.prototype.bounceTouchmove=function(t){var o=this,e=t.target,n=!0;while(e!==document.body&&e!==document){var s=e.classList;if(s){if(s.contains("mescroll")||s.contains("mescroll-touch")){n=!1;break}if(s.contains("mescroll-touch-x")||s.contains("mescroll-touch-y")){var i=t.touches?t.touches[0].pageX:t.clientX,r=t.touches?t.touches[0].pageY:t.clientY;o.preWinX||(o.preWinX=i),o.preWinY||(o.preWinY=r);var l=Math.abs(o.preWinX-i),a=Math.abs(o.preWinY-r),c=Math.sqrt(l*l+a*a);if(o.preWinX=i,o.preWinY=r,0!==c){var p=Math.asin(a/c)/Math.PI*180;if(p<=45&&s.contains("mescroll-touch-x")||p>45&&s.contains("mescroll-touch-y")){n=!1;break}}}}e=e.parentNode}n&&t.cancelable&&!t.defaultPrevented&&"function"===typeof t.preventDefault&&t.preventDefault()},t.prototype.triggerUpScroll=function(){this.optUp.callback&&!this.isUpScrolling&&(this.showUpScroll(),this.optUp.page.num++,this.isUpAutoLoad=!0,this.optUp.callback(this.optUp.page,this))},t.prototype.showUpScroll=function(){this.isUpScrolling=!0,this.upwarp.classList.add(this.optUp.hardwareClass),this.upwarp.style.visibility="visible",this.upwarp.style.display="block",this.optUp.showLoading(this,this.upwarp)},t.prototype.showNoMore=function(){this.upwarp.style.visibility="visible",this.upwarp.style.display="block",this.optUp.hasNext=!1,this.optUp.showNoMore(this,this.upwarp)},t.prototype.hideUpScroll=function(t){t?this.upwarp.style.display="none":this.upwarp.style.visibility="hidden",this.upwarp.classList.remove(this.optUp.hardwareClass);var o=this.upwarp.getElementsByClassName("upwarp-progress")[0];o&&o.classList.remove("mescroll-rotate")},t.prototype.endUpScroll=function(t,o){null!=t&&(t?this.showNoMore():this.hideUpScroll(o)),this.isUpScrolling=!1},t.prototype.resetUpScroll=function(t){if(this.optUp&&this.optUp.use){var o=this.optUp.page;this.prePageNum=o.num,this.prePageTime=o.time,o.num=1,o.time=null,this.isDownScrolling||!1===t||(null==t?(this.removeEmpty(),this.clearDataList(),this.showUpScroll()):this.showDownScroll()),this.isUpAutoLoad=!0,this.optUp.callback&&this.optUp.callback(o,this)}},t.prototype.setPageNum=function(t){this.optUp.page.num=t-1},t.prototype.setPageSize=function(t){this.optUp.page.size=t},t.prototype.clearDataList=function(){var t=this.optUp.clearId||this.optUp.clearEmptyId;if(t){var o=this.getDomById(t);o&&(o.innerHTML="")}},t.prototype.endByPage=function(t,o,e){var n;this.optUp.use&&null!=o&&(n=this.optUp.page.num<o),this.endSuccess(t,n,e)},t.prototype.endBySize=function(t,o,e){var n;if(this.optUp.use&&null!=o){var s=(this.optUp.page.num-1)*this.optUp.page.size+t;n=s<o}this.endSuccess(t,n,e)},t.prototype.endSuccess=function(t,o,e){var n=this;if(n.isDownScrolling&&n.endDownScroll(),n.optUp.use){var s;if(null!=t){var i=n.optUp.page.num,r=n.optUp.page.size;if(1===i&&(n.clearDataList(),e&&(n.optUp.page.time=e)),t<r||!1===o)if(n.optUp.hasNext=!1,0===t&&1===i)s=!1,n.showEmpty();else{var l=(i-1)*r+t;s=!(l<n.optUp.noMoreSize),n.removeEmpty()}else s=!1,n.optUp.hasNext=!0,n.removeEmpty()}var a=!n.optUp.hasNext;n.endUpScroll(s,a),n.loadFull(),n.optUp.lazyLoad.use&&n.lazyLoad(16)}},t.prototype.endErr=function(){if(this.isDownScrolling){var t=this.optUp.page;t&&this.prePageNum&&(t.num=this.prePageNum,t.time=this.prePageTime),this.endDownScroll()}this.isUpScrolling&&(this.optUp.page.num--,this.endUpScroll(!1))},t.prototype.loadFull=function(){var t=this;t.optUp.loadFull.use&&!t.optUp.isLock&&t.optUp.hasNext&&t.optUp.callback&&t.getScrollHeight()<=t.getClientHeight()&&setTimeout((function(){t.getScrollHeight()<=t.getClientHeight()&&t.triggerUpScroll()}),t.optUp.loadFull.delay)},t.prototype.lockUpScroll=function(t){null==t&&(t=!0),this.optUp.isLock=t},t.prototype.showEmpty=function(){var t=this,o=t.optUp.empty,e=o.warpId||t.optUp.clearEmptyId;if(null!=e){var n=t.getDomById(e);if(n){t.removeEmpty();var s="";if(o.icon&&(s+='<img class="empty-icon" src="'+o.icon+'"/>'),o.tip&&(s+='<p class="empty-tip">'+o.tip+"</p>"),o.btntext&&(s+='<p class="empty-btn">'+o.btntext+"</p>"),t.emptyDom=document.createElement("div"),t.emptyDom.className="mescroll-empty",t.emptyDom.innerHTML=s,n.appendChild(t.emptyDom),o.btnClick){var i=t.emptyDom.getElementsByClassName("empty-btn")[0];o.supportTap?i.addEventListener("tap",(function(e){e.stopPropagation(),t.preventDefault(e),o.btnClick()})):i.onclick=function(){o.btnClick()}}}}},t.prototype.removeEmpty=function(){this.removeChild(this.emptyDom)},t.prototype.showTopBtn=function(t){if(!this.topBtnShow){this.topBtnShow=!0;var o,e=this,n=e.optUp.toTop;if(null==e.toTopBtn)n.html?(e.toTopBtn=document.createElement("div"),e.toTopBtn.innerHTML=n.html):(e.toTopBtn=document.createElement("img"),e.toTopBtn.src=n.src),e.toTopBtn.className=n.warpClass,n.supportTap?e.toTopBtn.addEventListener("tap",(function(t){t.stopPropagation(),e.preventDefault(t);var o=n.btnClick&&n.btnClick();!0!==o&&e.scrollTo(0,e.optUp.toTop.duration)})):e.toTopBtn.onclick=function(){var t=n.btnClick&&n.btnClick();!0!==t&&e.scrollTo(0,e.optUp.toTop.duration)},n.warpId&&(o=e.getDomById(n.warpId)),o||(o=document.body),o.appendChild(e.toTopBtn);e.toTopBtn.classList.remove(n.hideClass),e.toTopBtn.classList.add(n.showClass),e.setTopBtnFadeDuration(t)}},t.prototype.hideTopBtn=function(t){this.topBtnShow&&this.toTopBtn&&(this.topBtnShow=!1,this.toTopBtn.classList.remove(this.optUp.toTop.showClass),this.toTopBtn.classList.add(this.optUp.toTop.hideClass),this.setTopBtnFadeDuration(t))},t.prototype.setTopBtnFadeDuration=function(t){if(this.toTopBtn){var o=(null!=t?t:this.optUp.toTop.fadeDuration)+"s";this.toTopBtn.style.animationDuration=o,this.toTopBtn.style.webkitAnimationDuration=o}},t.prototype.scrollTo=function(t,o){var e=this,n=e.getScrollTop(),s=t;if(s>0){var i=e.getScrollHeight()-e.getClientHeight();s>i&&(s=i)}else s=0;e.isScrollTo=!0,e.scrollDom.style.webkitOverflowScrolling="auto",e.getStep(n,s,(function(t){e.setScrollTop(t),t===s&&(e.scrollDom.style.webkitOverflowScrolling="touch",e.isScrollTo=!1)}),o)},t.prototype.getStep=function(t,o,e,n,s){var i=o-t;if(0!==n&&0!==i){n=n||300,s=s||30;var r=n/s,l=i/r,a=0,c=window.setInterval((function(){a<r-1?(t+=l,e&&e(t,c),a++):(e&&e(o,c),window.clearInterval(c))}),s)}else e&&e(o)},t.prototype.lazyLoad=function(t){var o=this,e=null!=t?t:o.optUp.lazyLoad.delay,n=setTimeout((function(){for(var t=o.scrollDom.querySelectorAll("["+o.optUp.lazyLoad.attr+"]"),e=t.length,n=0;n<e;n++){var s=t[n];if("true"!==s.getAttribute(o.lazyTag)&&o.isInSee(s,o.optUp.lazyLoad.offset)){var i=s.getAttribute(o.optUp.lazyLoad.attr),r=new Image;r.onload=function(){var t=this.src,e=this.dom,n=o.optUp.lazyLoad.showClass;n&&e.classList.add(n),"IMG"===e.tagName?e.src=t:e.style.backgroundImage="url("+t+")",e.removeAttribute(o.optUp.lazyLoad.attr),e.removeAttribute(o.lazyTag)},r.onerror=function(){this.dom.removeAttribute(o.lazyTag)},r.onabort=function(){this.dom.removeAttribute(o.lazyTag)},r.src=i,s.setAttribute(o.lazyTag,"true"),r.dom=s}}}),e);return n},t.prototype.isInSee=function(t,o){o=o||0;var e=this.getOffsetTop(t),n=this.getScrollTop()-o,s=e+t.offsetHeight,i=n+o+this.getClientHeight()+o;return e<i&&e>=n||s<=i&&s>n},t.prototype.getOffsetTop=function(t){var o=t.offsetTop,e=t.offsetParent;while(null!=e&&e!==this.scrollDom)o+=e.offsetTop+e.clientTop,e=e.offsetParent;return o},t.prototype.getScrollHeight=function(){return this.scrollDom.scrollHeight},t.prototype.getClientHeight=function(){return this.isScrollBody&&"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:this.scrollDom.clientHeight},t.prototype.getBodyHeight=function(){return document.body.clientHeight||document.documentElement.clientHeight},t.prototype.getScrollTop=function(){return this.isScrollBody?document.documentElement.scrollTop||document.body.scrollTop:this.scrollDom.scrollTop},t.prototype.getToBottom=function(){return this.getScrollHeight()-this.getClientHeight()-this.getScrollTop()},t.prototype.setScrollTop=function(t){"number"===typeof t&&(this.isScrollBody?(document.documentElement.scrollTop=t,document.body.scrollTop=t):this.scrollDom.scrollTop=t)},t.prototype.getDomById=function(t){var o;return t&&("string"===typeof t?o=document.getElementById(t):t.nodeType&&(o=t)),o||console.error('the element with id as "'+t+'" can not be found: document.getElementById("'+t+'")==null'),o},t.prototype.removeChild=function(t){if(t){var o=t.parentNode;o&&o.removeChild(t),t=null}},t.prototype.destroy=function(){var t=this;t.scrollDom.removeEventListener("touchstart",t.touchstartEvent),t.scrollDom.removeEventListener("touchmove",t.touchmoveEvent),t.scrollDom.removeEventListener("touchend",t.touchendEvent),t.scrollDom.removeEventListener("touchcancel",t.touchendEvent),t.scrollDom.removeEventListener("mousedown",t.touchstartEvent),t.scrollDom.removeEventListener("mousemove",t.touchmoveEvent),t.scrollDom.removeEventListener("mouseup",t.touchendEvent),t.scrollDom.removeEventListener("mouseleave",t.touchendEvent),t.removeChild(t.downwarp),t.isScrollBody?window.removeEventListener("scroll",t.scrollEvent):t.scrollDom.removeEventListener("scroll",t.scrollEvent),t.removeChild(t.upwarp),t.removeChild(t.toTopBtn),t.setBounce(!0)},t}))}}]);
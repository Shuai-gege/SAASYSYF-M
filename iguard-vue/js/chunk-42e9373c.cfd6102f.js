(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42e9373c"],{"8d6b":function(t,o,e){"use strict";var n=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{ref:"mescroll",staticClass:"mescroll"},[e("div",[t._t("default")],2)])},s=[],i=e("f868"),l=e.n(i),r=(e("f2fd"),{name:"MeScrollVue",data:function(){return{mescroll:null,lastScrollTop:0,lastBounce:null}},props:{up:Object,down:Object},mounted:function(){this.mescroll=new l.a(this.$refs.mescroll,{up:this.up,down:this.down}),this.$emit("init",this.mescroll)},methods:{beforeRouteEnter:function(){var t=this;this.mescroll&&(this.lastScrollTop&&(this.mescroll.setScrollTop(this.lastScrollTop),setTimeout((function(){t.mescroll.setTopBtnFadeDuration(0)}),16)),null!=this.lastBounce&&this.mescroll.setBounce(this.lastBounce))},beforeRouteLeave:function(){this.mescroll&&(this.lastScrollTop=this.mescroll.getScrollTop(),this.mescroll.hideTopBtn(0),this.lastBounce=this.mescroll.optUp.isBounce,this.mescroll.setBounce(!0))}}}),a=r,c=e("2877"),p=Object(c["a"])(a,n,s,!1,null,null,null);o["a"]=p.exports},a49e:function(t,o,e){"use strict";var n=e("f2c9"),s=e.n(n);s.a},ac6a:function(t,o,e){for(var n=e("cadf"),s=e("0d58"),i=e("2aba"),l=e("7726"),r=e("32e9"),a=e("84f2"),c=e("2b4c"),p=c("iterator"),u=c("toStringTag"),d=a.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=s(h),f=0;f<m.length;f++){var v,w=m[f],g=h[w],y=l[w],D=y&&y.prototype;if(D&&(D[p]||r(D,p,d),D[u]||r(D,u,w),a[w]=d,g))for(v in n)D[v]||i(D,v,n[v],!0)}},edc8:function(t,o,e){"use strict";e.r(o);var n=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"box"},[e("van-nav-bar",{attrs:{title:"点检任务","left-text":"首页","left-arrow":""},on:{"click-left":t.onClickLeft},scopedSlots:t._u([{key:"right",fn:function(){return[e("van-icon",{attrs:{name:"filter-o",size:"18"},on:{click:t.isShow}})]},proxy:!0}])}),e("van-popup",{style:{height:"100%"},attrs:{position:"top"},model:{value:t.show,callback:function(o){t.show=o},expression:"show"}},[e("van-cell-group",{staticClass:"flex"},[e("van-field",{attrs:{placeholder:"开始时间",readonly:""},on:{click:t.kaiShi},model:{value:t.time,callback:function(o){t.time=o},expression:"time"}}),t._v("-\n      "),e("van-field",{attrs:{placeholder:"结束时间",readonly:""},on:{click:t.jieShu},model:{value:t.time1,callback:function(o){t.time1=o},expression:"time1"}})],1),t.startTime?e("van-datetime-picker",{attrs:{type:"datetime",title:"选择开始时间","min-date":t.minDate,"max-date":t.maxDate},on:{confirm:t.okTime,cancel:function(o){t.startTime=!1}},model:{value:t.currentDate,callback:function(o){t.currentDate=o},expression:"currentDate"}}):t._e(),t.endTime?e("van-datetime-picker",{attrs:{type:"datetime",title:"选择结束时间","min-date":t.minDate1,"max-date":t.maxDate},on:{confirm:t.overTime,cancel:function(o){t.endTime=!1}},model:{value:t.currentDate,callback:function(o){t.currentDate=o},expression:"currentDate"}}):t._e(),t.tiaoJian?e("div",{staticClass:"baoShiType flex_f"},[e("p",[t._v("报事类型:")]),t._l(t.baoShiType,(function(o,n){return e("span",{key:n,class:{discolor:t.changeLeftBackground==n},on:{click:function(e){return t.leftChange(o.id,n)}}},[t._v(t._s(o.name))])}))],2):t._e(),e("div",{staticClass:"btn flex"},[e("van-button",{attrs:{color:"#999"},on:{click:function(o){t.show=!1}}},[t._v("取消")]),e("van-button",{attrs:{color:"#a48f36"},on:{click:t.end}},[t._v("确认")])],1)],1),e("van-search",{attrs:{"show-action":"",shape:"round",placeholder:"模糊搜索：报事人、描述、编号"},scopedSlots:t._u([{key:"action",fn:function(){return[e("div",{on:{click:t.onSearch}},[t._v("搜索")])]},proxy:!0}]),model:{value:t.value,callback:function(o){t.value=o},expression:"value"}}),e("div",{staticClass:"con"},[e("van-tabs",{attrs:{color:"#000",background:"#fff",sticky:!0},on:{change:t.tab},model:{value:t.active,callback:function(o){t.active=o},expression:"active"}},[e("van-tab",{attrs:{title:"待我处理"}},[e("Mescroll-vue",{ref:"mescroll",staticClass:"mescroll",attrs:{up:t.mescrollUp},on:{init:t.mescrollInit}},[0==t.list.length?e("div",{staticClass:"null"},[t._v("暂无记录~")]):t._e(),t._l(t.list,(function(o,n){return e("div",{key:n,staticClass:"minBox",on:{click:function(e){return t.sign(o)}}},[e("div",{staticClass:"flex col"},[e("span",[t._v("事件编号")]),e("span",[t._v(t._s(o.eventCode))])]),e("div",{staticClass:"flex col"},[e("span",[t._v("申请人")]),e("span",[t._v(t._s(o.applyName))])]),e("div",{staticClass:"flex col"},[e("span",[t._v("申请部门")]),e("span",[t._v(t._s(o.applyDept))])]),e("div",{staticClass:"flex col"},[e("span",[t._v("起止时间")]),e("span",[t._v(t._s(t._f("timeFilter")(o.applyTime,"ymdhm")))])])])}))],2)],1),e("van-tab",{attrs:{title:"我已处理"}},[e("Mescroll-vue",{ref:"mescroll",staticClass:"mescroll",attrs:{up:t.mescrollUp},on:{init:t.mescrollInit}},[0==t.list1.length?e("div",{staticClass:"null"},[t._v("暂无记录~")]):t._e(),t._l(t.list1,(function(o,n){return e("div",{key:n,staticClass:"minBox",on:{click:function(e){return t.sign2(o.id)}}},[e("div",{staticClass:"flex col"},[e("span",[t._v("事件编号")]),e("span",[t._v(t._s(o.eventCode))])]),e("div",{staticClass:"flex col"},[e("span",[t._v("申请人")]),e("span",[t._v(t._s(o.applyName))])]),e("div",{staticClass:"flex col"},[e("span",[t._v("申请部门")]),e("span",[t._v(t._s(o.applyDept))])]),e("div",{staticClass:"flex col"},[e("span",[t._v("起止时间")]),e("span",[t._v(t._s(t._f("timeFilter")(o.applyTime,"ymdhm")))])])])}))],2)],1)],1)],1)],1)},s=[],i=(e("ac6a"),e("7f7f"),e("8d6b")),l={components:{MescrollVue:i["a"]},watch:{$route:function(t,o){"userCheck"==t.name&&(console.log("我刷新一下list"),this.mescroll.resetUpScroll())}},beforeRouteLeave:function(t,o,e){"userCheck"!==t.name&&(console.log("我让ios可以下拉"),this.mescroll.setBounce(!0)),e()},data:function(){return{zu:localStorage.getItem("zu1"),active:0,value:"",mescroll:null,list:[],list1:[],list2:[],list3:[],baoShiType:[{name:"已转交",id:"1"},{name:"已完成",id:"2"},{name:"全部",id:"3"}],changeLeftBackground:-1,mescrollUp:{isBounce:!1,callback:this.upCallback,noMoreSize:1,toTop:{warpId:null,src:"http://www.mescroll.com/img/mescroll-totop.png",html:null,offset:1e3,warpClass:"mescroll-totop",showClass:"mescroll-fade-in",hideClass:"mescroll-fade-out",duration:300,supportTap:!1,btnClick:null}},show:!1,time:"",time1:"",minDate:new Date(1970,1,1),minDate1:new Date,maxDate:new Date(3e3,10,1),currentDate:new Date,startTime:!1,endTime:!1,tiaoJian:!1,checked:!1,checkedFlag:!1}},mounted:function(){console.log(this.active)},methods:{allUserName:function(){var t=this;this.axios.get("/rest/department/getCompanyAllUser",{params:{id:localStorage.getItem("uid")}}).then((function(o){console.log(o),console.log(t.list1);o.forEach((function(o){t.list1.forEach((function(e){o.uid==e.executeUserId&&t.$set(e,"executeUserName1",o.vserName)}))})),console.log(t.list1)}))},out:function(t){var o=this;this.keepAxios.post(this.baseUrl.keepAxios+"/app/patrolTask/cancelDeliver",{uid:localStorage.getItem("uid"),detailIds:t}).then((function(t){console.log(t),2e4==t.data.code?(o.$toast(t.data.msg),o.mescroll.resetUpScroll()):o.$toast(t.data.msg)}))},p:function(t){return t<10?"0"+t:t},onClickLeft:function(){this.$router.push("/")},isShow:function(){this.show=!0},kaiShi:function(){this.startTime=!0,this.endTime=!1},jieShu:function(){this.startTime=!1,this.endTime=!0},okTime:function(t){var o=new Date(t);this.startTime=!1,this.endTime=!1,this.time=o.getFullYear()+"-"+this.p(o.getMonth()+1)+"-"+this.p(o.getDate())+" "+this.p(o.getHours())+":"+this.p(o.getMinutes())+":00"},overTime:function(t){var o=new Date(t);this.startTime=!1,this.endTime=!1,this.time1=o.getFullYear()+"-"+this.p(o.getMonth()+1)+"-"+this.p(o.getDate())+" "+this.p(o.getHours())+":"+this.p(o.getMinutes())+":59"},leftChange:function(t,o){this.changeLeftBackground=o,this.reportEventTypeId=t,console.log(t)},onSearch:function(){this.query()},sign:function(t){console.log(t),this.$router.push({path:"/userCheckDetails",query:{obj:JSON.stringify(t)}})},sign2:function(t){this.$router.push({path:"/userCheckDetails1",query:{val:t}})},tab:function(t){console.log(t),0==t?(this.tiaoJian=!1,this.list=[],this.mescroll.resetUpScroll()):1==t&&(this.tiaoJian=!0,this.list1=[],this.mescroll.resetUpScroll(),this.allUserName())},mescrollInit:function(t){this.mescroll=t},upCallback:function(t,o){var e=this,n=t.num-1;this.keepAxios.get(this.baseUrl.checkList+"/rest/appUser/applyJoinCompany",{params:{page:n,limit:t.size,uid:localStorage.getItem("uid"),status:this.active}}).then((function(n){console.log(n);var s=n.data.result;0==e.active?(1===t.num&&(e.list=[]),e.list=e.list.concat(s),e.list.forEach((function(t){e.$set(t,"checked",!1),e.$set(t,"patrolPointIdsNoCount",t.deviceIdsCount-t.deviceIdsEdCount)})),e.$nextTick((function(){o.endSuccess(s.length,!0)}))):1==e.active?(1===t.num&&(e.list1=[]),e.list1=e.list1.concat(s),e.list1.forEach((function(t){e.$set(t,"checked",!1),e.$set(t,"patrolPointIdsNoCount",t.deviceIdsCount-t.deviceIdsEdCount);var o=(new Date).getFullYear(),n=e.p((new Date).getMonth()+1),s=e.p((new Date).getDate()),i=e.p((new Date).getHours()),l=e.p((new Date).getMinutes()),r=e.p((new Date).getSeconds()),a=o+"/"+n+"/"+s+" "+i+":"+l+":"+r;t.startTime>=a?e.$set(t,"flag",!0):e.$set(t,"flag",!1)})),e.allUserName(),e.$nextTick((function(){o.endSuccess(s.length,!0)}))):2==e.active?(1===t.num&&(e.list2=[]),e.list2=e.list2.concat(s),e.list2.forEach((function(t){e.$set(t,"checked",!1),e.$set(t,"patrolPointIdsNoCount",t.deviceIdsCount-t.deviceIdsEdCount)})),e.$nextTick((function(){o.endSuccess(s.length,!0)}))):3==e.active&&(1===t.num&&(e.list3=[]),e.list3=e.list3.concat(s),e.list3.forEach((function(t){e.$set(t,"checked",!1),e.$set(t,"patrolPointIdsNoCount",t.deviceIdsCount-t.deviceIdsEdCount)})),e.$nextTick((function(){o.endSuccess(s.length,!0)}))),console.log(e.list)})).catch((function(t){console.log(t)}))},checkedFlag1:function(){this.checkedFlag?this.checkedFlag=!1:this.checkedFlag=!0},end:function(){console.log("aaa")},query:function(){}}},r=l,a=(e("a49e"),e("2877")),c=Object(a["a"])(r,n,s,!1,null,"3c83c7b4",null);o["default"]=c.exports},f2c9:function(t,o,e){},f2fd:function(t,o,e){},f868:function(t,o,e){var n,s;(function(i,l){n=l,s="function"===typeof n?n.call(o,e,o,t):n,void 0===s||(t.exports=s)})(0,(function(){var t=function(t,o){var e=this;if(e.version="1.4.0",e.isScrollBody=!t||"body"===t,e.scrollDom=e.isScrollBody?document.body:e.getDomById(t),e.scrollDom){e.options=o||{};var n=navigator.userAgent,s=!!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),i="undefined"===typeof window.orientation,l=n.indexOf("Android")>-1||n.indexOf("Adr")>-1;e.os={ios:s,pc:i,android:l},e.isDownScrolling=!1,e.isUpScrolling=!1;var r=e.options.down&&e.options.down.callback;e.initDownScroll(),e.initUpScroll(),setTimeout((function(){e.optDown.use&&e.optDown.auto&&r&&(e.optDown.autoShowLoading?e.triggerDownScroll():e.optDown.callback&&e.optDown.callback(e)),e.optUp.use&&e.optUp.auto&&!e.isUpAutoLoad&&e.triggerUpScroll()}),30)}};return t.prototype.extendDownScroll=function(o){t.extend(o,{use:!0,auto:!0,autoShowLoading:!1,isLock:!1,isBoth:!1,offset:80,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,hardwareClass:"mescroll-hardware",mustToTop:!1,warpId:null,warpClass:"mescroll-downwarp",resetClass:"mescroll-downwarp-reset",textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ...",htmlContent:'<p class="downwarp-progress"></p><p class="downwarp-tip"></p>',inited:function(t,o){t.downTipDom=o.getElementsByClassName("downwarp-tip")[0],t.downProgressDom=o.getElementsByClassName("downwarp-progress")[0]},inOffset:function(t){t.downTipDom&&(t.downTipDom.innerHTML=t.optDown.textInOffset),t.downProgressDom&&t.downProgressDom.classList.remove("mescroll-rotate")},outOffset:function(t){t.downTipDom&&(t.downTipDom.innerHTML=t.optDown.textOutOffset)},onMoving:function(t,o,e){if(t.downProgressDom){var n=360*o;t.downProgressDom.style.webkitTransform="rotate("+n+"deg)",t.downProgressDom.style.transform="rotate("+n+"deg)"}},beforeLoading:function(t,o){return!1},showLoading:function(t){t.downTipDom&&(t.downTipDom.innerHTML=t.optDown.textLoading),t.downProgressDom&&t.downProgressDom.classList.add("mescroll-rotate")},afterLoading:function(t){return 0},callback:function(t){t.resetUpScroll()}})},t.prototype.extendUpScroll=function(o){var e=this.os.pc;t.extend(o,{use:!0,auto:!0,isLock:!1,isBoth:!1,isBounce:!0,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,offset:100,toTop:{warpId:null,src:null,html:null,offset:1e3,warpClass:"mescroll-totop",showClass:"mescroll-fade-in",hideClass:"mescroll-fade-out",fadeDuration:.5,duration:300,supportTap:!1,btnClick:null},loadFull:{use:!1,delay:500},empty:{warpId:null,icon:null,tip:"暂无相关数据~",btntext:"",btnClick:null,supportTap:!1},clearId:null,clearEmptyId:null,hardwareClass:"mescroll-hardware",warpId:null,warpClass:"mescroll-upwarp",htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',htmlNodata:'<p class="upwarp-nodata">-- END --</p>',inited:function(t,o){},showLoading:function(t,o){o.innerHTML=t.optUp.htmlLoading},showNoMore:function(t,o){o.innerHTML=t.optUp.htmlNodata},onScroll:null,scrollbar:{use:e,barClass:"mescroll-bar"},lazyLoad:{use:!1,attr:"imgurl",showClass:"mescroll-lazy-in",delay:500,offset:200}})},t.extend=function(o,e){if(!o)return e;for(var n in e)null==o[n]?o[n]=e[n]:"object"===typeof o[n]&&t.extend(o[n],e[n]);return o},t.prototype.initDownScroll=function(){var t=this;if(t.optDown=t.options.down||{},t.extendDownScroll(t.optDown),t.touchstartEvent=function(o){t.isScrollTo&&t.preventDefault(o),t.startPoint=t.getPoint(o),t.lastPoint=t.startPoint,t.maxTouchmoveY=t.getBodyHeight()-t.optDown.bottomOffset,t.inTouchend=!1;var e=t.getScrollTop();t.isKeepTop=0===e,t.os.pc&&e<=0&&(t.scrollDom.addEventListener("mousemove",t.touchmoveEvent,{passive:!1}),document.ondragstart=function(){return!1})},t.scrollDom.addEventListener("mousedown",t.touchstartEvent),t.scrollDom.addEventListener("touchstart",t.touchstartEvent),t.touchmoveEvent=function(o){if(t.startPoint){var e=t.getScrollTop();e>0&&(t.isKeepTop=!1);var n=t.getPoint(o),s=n.y-t.startPoint.y;if(s>0){if(e<=0&&(t.preventDefault(o),t.optDown.use&&!t.inTouchend&&!t.isDownScrolling&&!t.optDown.isLock&&(!t.isUpScrolling||t.isUpScrolling&&t.optUp.isBoth))){if(t.optDown.mustToTop&&!t.isKeepTop)return;var i=Math.abs(t.lastPoint.x-n.x),l=Math.abs(t.lastPoint.y-n.y),r=Math.sqrt(i*i+l*l);if(0!==r){var a=Math.asin(l/r)/Math.PI*180;if(a<t.optDown.minAngle)return}if(t.maxTouchmoveY>0&&n.y>=t.maxTouchmoveY)return t.inTouchend=!0,void t.touchendEvent();var c=n.y-t.lastPoint.y;t.downHight||(t.downHight=0),t.downHight<t.optDown.offset?(1!==t.movetype&&(t.movetype=1,t.optDown.inOffset(t),t.downwarp.classList.remove(t.optDown.resetClass),t.isMoveDown=!0,t.os.ios&&!t.isKeepTop&&(t.scrollDom.classList.add(t.optDown.hardwareClass),t.scrollDom.style.webkitOverflowScrolling="auto",t.isSetScrollAuto=!0)),t.downHight+=c*t.optDown.inOffsetRate):(2!==t.movetype&&(t.movetype=2,t.optDown.outOffset(t),t.downwarp.classList.remove(t.optDown.resetClass),t.isMoveDown=!0,t.os.ios&&!t.isKeepTop&&(t.scrollDom.classList.add(t.optDown.hardwareClass),t.scrollDom.style.webkitOverflowScrolling="auto",t.isSetScrollAuto=!0)),t.downHight+=c>0?c*t.optDown.outOffsetRate:c),t.downwarp.style.height=t.downHight+"px";var p=t.downHight/t.optDown.offset;t.optDown.onMoving(t,p,t.downHight)}}else if(s<0){var u=t.getScrollHeight(),d=t.getClientHeight(),h=u-d-e;!t.optUp.isBounce&&h<=0&&t.preventDefault(o),t.optUp.use&&!t.optUp.isLock&&t.optUp.hasNext&&!t.isUpScrolling&&(!t.isDownScrolling||t.isDownScrolling&&t.optDown.isBoth)&&(d+t.optUp.offset>=u||h<=0)&&t.triggerUpScroll()}t.lastPoint=n}},t.scrollDom.addEventListener("touchmove",t.touchmoveEvent,{passive:!1}),t.touchendEvent=function(){t.optDown.use&&t.isMoveDown&&(t.downHight>=t.optDown.offset?t.triggerDownScroll():(t.downwarp.classList.add(t.optDown.resetClass),t.downHight=0,t.downwarp.style.height=0),t.isSetScrollAuto&&(t.scrollDom.style.webkitOverflowScrolling="touch",t.scrollDom.classList.remove(t.optDown.hardwareClass),t.isSetScrollAuto=!1),t.movetype=0,t.isMoveDown=!1),t.os.pc&&(t.scrollDom.removeEventListener("mousemove",t.touchmoveEvent),document.ondragstart=function(){return!0})},t.scrollDom.addEventListener("mouseup",t.touchendEvent),t.scrollDom.addEventListener("mouseleave",t.touchendEvent),t.scrollDom.addEventListener("touchend",t.touchendEvent),t.scrollDom.addEventListener("touchcancel",t.touchendEvent),t.optDown.use){t.downwarp=document.createElement("div"),t.downwarp.className=t.optDown.warpClass,t.downwarp.innerHTML='<div class="downwarp-content">'+t.optDown.htmlContent+"</div>";var o=t.optDown.warpId?t.getDomById(t.optDown.warpId):t.scrollDom;t.optDown.warpId&&o?o.appendChild(t.downwarp):(o||(o=t.scrollDom),o.insertBefore(t.downwarp,t.scrollDom.firstChild)),setTimeout((function(){t.optDown.inited(t,t.downwarp)}),0)}},t.prototype.preventDefault=function(t){t&&t.cancelable&&!t.defaultPrevented&&t.preventDefault()},t.prototype.getPoint=function(t){return{x:t.touches?t.touches[0].pageX:t.clientX,y:t.touches?t.touches[0].pageY:t.clientY}},t.prototype.triggerDownScroll=function(){this.optDown.beforeLoading(this,this.downwarp)||(this.showDownScroll(),this.optDown.callback&&this.optDown.callback(this))},t.prototype.showDownScroll=function(){this.isDownScrolling=!0,this.optDown.showLoading(this),this.downHight=this.optDown.offset,this.downwarp.classList.add(this.optDown.resetClass),this.downwarp.style.height=this.optDown.offset+"px"},t.prototype.endDownScroll=function(){var t=this,o=function(){t.downHight=0,t.downwarp.style.height=0,t.isDownScrolling=!1,t.downProgressDom&&t.downProgressDom.classList.remove("mescroll-rotate")},e=t.optDown.afterLoading(t);"number"===typeof e&&e>0?setTimeout(o,e):o()},t.prototype.lockDownScroll=function(t){null==t&&(t=!0),this.optDown.isLock=t},t.prototype.initUpScroll=function(){var t,o=this;(o.optUp=o.options.up||{use:!1},o.extendUpScroll(o.optUp),o.optUp.scrollbar.use&&o.scrollDom.classList.add(o.optUp.scrollbar.barClass),o.optUp.isBounce||o.setBounce(!1),!1!==o.optUp.use)&&(o.optUp.hasNext=!0,o.upwarp=document.createElement("div"),o.upwarp.className=o.optUp.warpClass,o.optUp.warpId&&(t=o.getDomById(o.optUp.warpId)),t||(t=o.scrollDom),t.appendChild(o.upwarp),o.preScrollY=0,o.lazyStartTime=(new Date).getTime(),o.lazyTag="mescroll-lazying",o.scrollEvent=function(){var t=o.getScrollTop(),e=t-o.preScrollY>0;if(o.preScrollY=t,!o.isUpScrolling&&(!o.isDownScrolling||o.isDownScrolling&&o.optDown.isBoth)&&!o.optUp.isLock&&o.optUp.hasNext){var n=o.getScrollHeight()-o.getClientHeight()-t;n<=o.optUp.offset&&e&&o.triggerUpScroll()}var s=o.optUp.toTop;if((s.src||s.html)&&(t>=s.offset?o.showTopBtn():o.hideTopBtn()),o.optUp.lazyLoad.use){var i=(new Date).getTime();o.lazyTimer&&clearTimeout(o.lazyTimer),i-o.lazyStartTime>=o.optUp.lazyLoad.delay?(o.lazyStartTime=i,o.lazyLoad(0)):o.lazyTimer=o.lazyLoad()}o.optUp.onScroll&&o.optUp.onScroll(o,t,e)},o.isScrollBody?window.addEventListener("scroll",o.scrollEvent):o.scrollDom.addEventListener("scroll",o.scrollEvent),setTimeout((function(){o.optUp.inited(o,o.upwarp)}),0))},t.prototype.setBounce=function(t){!this.isScrollBody&&this.os.ios&&(!1===t?(this.optUp.isBounce=!1,window.addEventListener("touchmove",this.bounceTouchmove,{passive:!1})):(this.optUp.isBounce=!0,window.removeEventListener("touchmove",this.bounceTouchmove)))},t.prototype.bounceTouchmove=function(t){var o=this,e=t.target,n=!0;while(e!==document.body&&e!==document){var s=e.classList;if(s){if(s.contains("mescroll")||s.contains("mescroll-touch")){n=!1;break}if(s.contains("mescroll-touch-x")||s.contains("mescroll-touch-y")){var i=t.touches?t.touches[0].pageX:t.clientX,l=t.touches?t.touches[0].pageY:t.clientY;o.preWinX||(o.preWinX=i),o.preWinY||(o.preWinY=l);var r=Math.abs(o.preWinX-i),a=Math.abs(o.preWinY-l),c=Math.sqrt(r*r+a*a);if(o.preWinX=i,o.preWinY=l,0!==c){var p=Math.asin(a/c)/Math.PI*180;if(p<=45&&s.contains("mescroll-touch-x")||p>45&&s.contains("mescroll-touch-y")){n=!1;break}}}}e=e.parentNode}n&&t.cancelable&&!t.defaultPrevented&&"function"===typeof t.preventDefault&&t.preventDefault()},t.prototype.triggerUpScroll=function(){this.optUp.callback&&!this.isUpScrolling&&(this.showUpScroll(),this.optUp.page.num++,this.isUpAutoLoad=!0,this.optUp.callback(this.optUp.page,this))},t.prototype.showUpScroll=function(){this.isUpScrolling=!0,this.upwarp.classList.add(this.optUp.hardwareClass),this.upwarp.style.visibility="visible",this.upwarp.style.display="block",this.optUp.showLoading(this,this.upwarp)},t.prototype.showNoMore=function(){this.upwarp.style.visibility="visible",this.upwarp.style.display="block",this.optUp.hasNext=!1,this.optUp.showNoMore(this,this.upwarp)},t.prototype.hideUpScroll=function(t){t?this.upwarp.style.display="none":this.upwarp.style.visibility="hidden",this.upwarp.classList.remove(this.optUp.hardwareClass);var o=this.upwarp.getElementsByClassName("upwarp-progress")[0];o&&o.classList.remove("mescroll-rotate")},t.prototype.endUpScroll=function(t,o){null!=t&&(t?this.showNoMore():this.hideUpScroll(o)),this.isUpScrolling=!1},t.prototype.resetUpScroll=function(t){if(this.optUp&&this.optUp.use){var o=this.optUp.page;this.prePageNum=o.num,this.prePageTime=o.time,o.num=1,o.time=null,this.isDownScrolling||!1===t||(null==t?(this.removeEmpty(),this.clearDataList(),this.showUpScroll()):this.showDownScroll()),this.isUpAutoLoad=!0,this.optUp.callback&&this.optUp.callback(o,this)}},t.prototype.setPageNum=function(t){this.optUp.page.num=t-1},t.prototype.setPageSize=function(t){this.optUp.page.size=t},t.prototype.clearDataList=function(){var t=this.optUp.clearId||this.optUp.clearEmptyId;if(t){var o=this.getDomById(t);o&&(o.innerHTML="")}},t.prototype.endByPage=function(t,o,e){var n;this.optUp.use&&null!=o&&(n=this.optUp.page.num<o),this.endSuccess(t,n,e)},t.prototype.endBySize=function(t,o,e){var n;if(this.optUp.use&&null!=o){var s=(this.optUp.page.num-1)*this.optUp.page.size+t;n=s<o}this.endSuccess(t,n,e)},t.prototype.endSuccess=function(t,o,e){var n=this;if(n.isDownScrolling&&n.endDownScroll(),n.optUp.use){var s;if(null!=t){var i=n.optUp.page.num,l=n.optUp.page.size;if(1===i&&(n.clearDataList(),e&&(n.optUp.page.time=e)),t<l||!1===o)if(n.optUp.hasNext=!1,0===t&&1===i)s=!1,n.showEmpty();else{var r=(i-1)*l+t;s=!(r<n.optUp.noMoreSize),n.removeEmpty()}else s=!1,n.optUp.hasNext=!0,n.removeEmpty()}var a=!n.optUp.hasNext;n.endUpScroll(s,a),n.loadFull(),n.optUp.lazyLoad.use&&n.lazyLoad(16)}},t.prototype.endErr=function(){if(this.isDownScrolling){var t=this.optUp.page;t&&this.prePageNum&&(t.num=this.prePageNum,t.time=this.prePageTime),this.endDownScroll()}this.isUpScrolling&&(this.optUp.page.num--,this.endUpScroll(!1))},t.prototype.loadFull=function(){var t=this;t.optUp.loadFull.use&&!t.optUp.isLock&&t.optUp.hasNext&&t.optUp.callback&&t.getScrollHeight()<=t.getClientHeight()&&setTimeout((function(){t.getScrollHeight()<=t.getClientHeight()&&t.triggerUpScroll()}),t.optUp.loadFull.delay)},t.prototype.lockUpScroll=function(t){null==t&&(t=!0),this.optUp.isLock=t},t.prototype.showEmpty=function(){var t=this,o=t.optUp.empty,e=o.warpId||t.optUp.clearEmptyId;if(null!=e){var n=t.getDomById(e);if(n){t.removeEmpty();var s="";if(o.icon&&(s+='<img class="empty-icon" src="'+o.icon+'"/>'),o.tip&&(s+='<p class="empty-tip">'+o.tip+"</p>"),o.btntext&&(s+='<p class="empty-btn">'+o.btntext+"</p>"),t.emptyDom=document.createElement("div"),t.emptyDom.className="mescroll-empty",t.emptyDom.innerHTML=s,n.appendChild(t.emptyDom),o.btnClick){var i=t.emptyDom.getElementsByClassName("empty-btn")[0];o.supportTap?i.addEventListener("tap",(function(e){e.stopPropagation(),t.preventDefault(e),o.btnClick()})):i.onclick=function(){o.btnClick()}}}}},t.prototype.removeEmpty=function(){this.removeChild(this.emptyDom)},t.prototype.showTopBtn=function(t){if(!this.topBtnShow){this.topBtnShow=!0;var o,e=this,n=e.optUp.toTop;if(null==e.toTopBtn)n.html?(e.toTopBtn=document.createElement("div"),e.toTopBtn.innerHTML=n.html):(e.toTopBtn=document.createElement("img"),e.toTopBtn.src=n.src),e.toTopBtn.className=n.warpClass,n.supportTap?e.toTopBtn.addEventListener("tap",(function(t){t.stopPropagation(),e.preventDefault(t);var o=n.btnClick&&n.btnClick();!0!==o&&e.scrollTo(0,e.optUp.toTop.duration)})):e.toTopBtn.onclick=function(){var t=n.btnClick&&n.btnClick();!0!==t&&e.scrollTo(0,e.optUp.toTop.duration)},n.warpId&&(o=e.getDomById(n.warpId)),o||(o=document.body),o.appendChild(e.toTopBtn);e.toTopBtn.classList.remove(n.hideClass),e.toTopBtn.classList.add(n.showClass),e.setTopBtnFadeDuration(t)}},t.prototype.hideTopBtn=function(t){this.topBtnShow&&this.toTopBtn&&(this.topBtnShow=!1,this.toTopBtn.classList.remove(this.optUp.toTop.showClass),this.toTopBtn.classList.add(this.optUp.toTop.hideClass),this.setTopBtnFadeDuration(t))},t.prototype.setTopBtnFadeDuration=function(t){if(this.toTopBtn){var o=(null!=t?t:this.optUp.toTop.fadeDuration)+"s";this.toTopBtn.style.animationDuration=o,this.toTopBtn.style.webkitAnimationDuration=o}},t.prototype.scrollTo=function(t,o){var e=this,n=e.getScrollTop(),s=t;if(s>0){var i=e.getScrollHeight()-e.getClientHeight();s>i&&(s=i)}else s=0;e.isScrollTo=!0,e.scrollDom.style.webkitOverflowScrolling="auto",e.getStep(n,s,(function(t){e.setScrollTop(t),t===s&&(e.scrollDom.style.webkitOverflowScrolling="touch",e.isScrollTo=!1)}),o)},t.prototype.getStep=function(t,o,e,n,s){var i=o-t;if(0!==n&&0!==i){n=n||300,s=s||30;var l=n/s,r=i/l,a=0,c=window.setInterval((function(){a<l-1?(t+=r,e&&e(t,c),a++):(e&&e(o,c),window.clearInterval(c))}),s)}else e&&e(o)},t.prototype.lazyLoad=function(t){var o=this,e=null!=t?t:o.optUp.lazyLoad.delay,n=setTimeout((function(){for(var t=o.scrollDom.querySelectorAll("["+o.optUp.lazyLoad.attr+"]"),e=t.length,n=0;n<e;n++){var s=t[n];if("true"!==s.getAttribute(o.lazyTag)&&o.isInSee(s,o.optUp.lazyLoad.offset)){var i=s.getAttribute(o.optUp.lazyLoad.attr),l=new Image;l.onload=function(){var t=this.src,e=this.dom,n=o.optUp.lazyLoad.showClass;n&&e.classList.add(n),"IMG"===e.tagName?e.src=t:e.style.backgroundImage="url("+t+")",e.removeAttribute(o.optUp.lazyLoad.attr),e.removeAttribute(o.lazyTag)},l.onerror=function(){this.dom.removeAttribute(o.lazyTag)},l.onabort=function(){this.dom.removeAttribute(o.lazyTag)},l.src=i,s.setAttribute(o.lazyTag,"true"),l.dom=s}}}),e);return n},t.prototype.isInSee=function(t,o){o=o||0;var e=this.getOffsetTop(t),n=this.getScrollTop()-o,s=e+t.offsetHeight,i=n+o+this.getClientHeight()+o;return e<i&&e>=n||s<=i&&s>n},t.prototype.getOffsetTop=function(t){var o=t.offsetTop,e=t.offsetParent;while(null!=e&&e!==this.scrollDom)o+=e.offsetTop+e.clientTop,e=e.offsetParent;return o},t.prototype.getScrollHeight=function(){return this.scrollDom.scrollHeight},t.prototype.getClientHeight=function(){return this.isScrollBody&&"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:this.scrollDom.clientHeight},t.prototype.getBodyHeight=function(){return document.body.clientHeight||document.documentElement.clientHeight},t.prototype.getScrollTop=function(){return this.isScrollBody?document.documentElement.scrollTop||document.body.scrollTop:this.scrollDom.scrollTop},t.prototype.getToBottom=function(){return this.getScrollHeight()-this.getClientHeight()-this.getScrollTop()},t.prototype.setScrollTop=function(t){"number"===typeof t&&(this.isScrollBody?(document.documentElement.scrollTop=t,document.body.scrollTop=t):this.scrollDom.scrollTop=t)},t.prototype.getDomById=function(t){var o;return t&&("string"===typeof t?o=document.getElementById(t):t.nodeType&&(o=t)),o||console.error('the element with id as "'+t+'" can not be found: document.getElementById("'+t+'")==null'),o},t.prototype.removeChild=function(t){if(t){var o=t.parentNode;o&&o.removeChild(t),t=null}},t.prototype.destroy=function(){var t=this;t.scrollDom.removeEventListener("touchstart",t.touchstartEvent),t.scrollDom.removeEventListener("touchmove",t.touchmoveEvent),t.scrollDom.removeEventListener("touchend",t.touchendEvent),t.scrollDom.removeEventListener("touchcancel",t.touchendEvent),t.scrollDom.removeEventListener("mousedown",t.touchstartEvent),t.scrollDom.removeEventListener("mousemove",t.touchmoveEvent),t.scrollDom.removeEventListener("mouseup",t.touchendEvent),t.scrollDom.removeEventListener("mouseleave",t.touchendEvent),t.removeChild(t.downwarp),t.isScrollBody?window.removeEventListener("scroll",t.scrollEvent):t.scrollDom.removeEventListener("scroll",t.scrollEvent),t.removeChild(t.upwarp),t.removeChild(t.toTopBtn),t.setBounce(!0)},t}))}}]);
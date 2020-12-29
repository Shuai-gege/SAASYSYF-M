import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './common/filters';
import '@/permission';
import {
    WXInit
} from '@/common/wx_config';
import {
    setCookie,
    getCookie,
    delCookie
} from './common/cookie'
Vue.prototype.$cookieStore = {
        setCookie,
        getCookie,
        delCookie
    }
    // 全局引入axios
import axios from "axios";
Vue.prototype.keepAxios = axios
    // 电子签名
import vueEsign from 'vue-esign'
Vue.use(vueEsign)

import baseUrl from './common/baseurl'
Vue.prototype.baseUrl = baseUrl;
// 生成二维码
// import QRCode from 'qrcodejs2'
import 'lib-flexible/flexible'; //px转为rem

//报事报修axios
import http from './common/axios';
Vue.prototype.axios = http;
console.log(Vue.prototype)
Vue.prototype.$baseConfig = {
    // BASE_URL: 'http://47.100.240.228:8281' //测试环境
    // BASE_URL: 'http://bsbx.mallmis.com:8181' //正式环境
    BASE_URL: 'https://test.mallmis.com/v1' //小程序
};

// 移动端图表工具
import VCharts from 'v-charts'
Vue.use(VCharts)

// 移动端调试神器
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

//
Vue.config.productionTip = false;
// console.log("mian中打印的变量", process.env)
// console.log(process.env.BASE_URL)//这些无用，只是搞着玩


new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
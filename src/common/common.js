import lrz from "lrz";
import {
    Toast
} from "vant";
// 压缩，，这个项目没用这个
export const upImage = async file => {
    const {
        formData
    } = await lrz(file); //压缩后直接使用formdata
    return http.post('/common/uploadali', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
// 微信扫码
import axios from "axios";
const wx = require('weixin-js-sdk')
export function scan() {
    Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: false // 是否显示遮罩层
            // message: "数据加载中..."
    });
    return new Promise((resolve, reject) => {
        axios
            .post(localStorage.getItem("baseURL") + "/api/we_chat/getJSSDK", {
                url: location.href
            })
            .then(res => {
                Toast.clear();
                let data = res.data.data;
                let _this = this;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: localStorage.getItem("appid"), // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    // 9.1.2 扫描二维码并返回结果
                    wx.scanQRCode({
                        needResult: 1,
                        desc: "scanQRCode desc",
                        success: function(res) {
                            Toast.clear();
                            resolve(res.resultStr.split(",")[1]);
                        }
                    });
                });
                //初始化jsapi接口 状态
                wx.error(function(res) {
                    Toast.clear();
                    alert("调用微信jsapi返回的状态:" + res.msg);
                });
            });
    });
}
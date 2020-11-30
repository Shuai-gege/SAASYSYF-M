import wx from 'weixin-js-sdk';
import {
    WXConfigApi
} from '@/api/wxApi';

function WXInitConfig(WxToken) {
    wx.config({
        debug: false,
        appId: WxToken.appId,
        timestamp: WxToken.timestamp,
        nonceStr: WxToken.nonceStr,
        signature: WxToken.signature,
        jsApiList: ['scanQRCode', 'chooseImage', 'getLocalImgData'],
    });
    // error callback
    wx.error(function(result) {
        console.log('WX INIT ERROR:', result, 'color: red; font-size: 20px');
    });
    // ready callback
    wx.ready(function() {});
}

export function WXInit() {
    let WxToken = {};
    WXConfigApi(window.location.href.split('#')[0])
        // url: window.location.href.split('#')[0],
        .then((response) => {
            WxToken = response;
            WXInitConfig(WxToken);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function WXScanQRCode(callback = () => {}) {
    wx.scanQRCode({
        needResult: 1,
        success: function(result) {
            callback(result);
        },
    });
}
// 扫描蓝牙
export function WXsao(id, time) {
    wx.miniProgram.redirectTo({
        url: '../sign/sign?id=' + id + '&time=' + time
    })
}
// 扫描蓝牙
export function WXsao1(id, time, deviceId) {
    wx.miniProgram.redirectTo({
        url: '../sign1/sign1?id=' + id + '&time=' + time + '&deviceId=' + deviceId
    })
}
// 截取Url里的参数
export function getvl(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href))
        return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};
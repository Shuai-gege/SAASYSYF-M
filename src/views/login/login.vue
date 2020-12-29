<template>
  <div class="box">
    <div class="con">
      <div class="ipt">
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
        <!-- 验证码 -->
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button
              size="small"
              type="primary"
              :round="true"
              color="#a68e44"
              @click="phoneSms"
              :disabled="jinXuan"
              v-if="!flag"
            >发送验证码</van-button>
            <van-count-down v-else :time="time" format="ss" @finish="finish" />
          </template>
        </van-field>
        <!-- <div class="inp">
          <span class="left">短信验证码</span>
          <input
            type="tel"
            oninput="if(value.length>6)value=value.slice(0,6)"
            placeholder="请输入短信验证码"
            class="input-noborder"
        />-->
        <!-- 倒计时&发送短信 -->
        <!-- <van-button
            size="small"
            type="primary"
            :round="true"
            color="#a68e44"
            @click="phoneSms"
            :disabled="jinXuan"
            v-if="!flag"
          >发送验证码</van-button>
          <van-count-down v-else :time="time" format="ss" @finish="finish" />
        </div>-->
      </div>
      <!-- btn -->
      <div class="btn">
        <van-button
          type="primary"
          size="large"
          color="#a68e44"
          @click="login"
          :disabled="jinXuan"
        >登陆</van-button>
      </div>
      <!-- 注册&忘记密码 -->
      <div class="res">
        <a @click="$router.push('/introduce')">注册成为i-Guard物管平台用户></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      phone: '', //手机号
      sms: '', //验证码
      err: '', //错误提示
      flag: false,
      openid: '', //获取openid
      jinXuan: false, //是否禁选
      time: 60 * 3000
    }
  },

  mounted() {
    // var code = this.getUrlValue('code')
    // localStorage.setItem('code', code)
    // if (
    //   (!localStorage.getItem('appid') && !localStorage.getItem('wxkey')) ||
    //   code == undefined
    // ) {
    //   axios
    //     .get('https://test.mallmis.com/v1/rest/wxserver/getWxConfig')
    //     .then(data => {
    //       localStorage.setItem('appid', data.data.result[0].wxValue)
    //       localStorage.setItem('wxkey', data.data.result[1].wxValue)
    //       localStorage.setItem('baseUrl', escape(data.data.result[2].wxValue))
    //       if (
    //         code == null ||
    //         code == undefined ||
    //         code == localStorage.getItem('code')
    //       ) {
    //         let baseUrl = window.location.href
    //         location.href =
    //           'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    //           localStorage.getItem('appid') +
    //           '&redirect_uri=' +
    //           escape(baseUrl) +
    //           '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    //       }
    //     })
    // } else {
    //   let appid = localStorage.getItem('appid')
    //   let wxkey = localStorage.getItem('wxkey')
    //   axios({
    //     mothod: 'get',
    //     url: 'https://test.mallmis.com/v1/rest/wxserver/getOpenid',
    //     params: { code: code }
    //   }).then(data => {
    //     if (data.data.result.code == 50000) {
    //       window.localStorage.clear()
    //       window.location.reload()
    //     } else {
    //       localStorage.setItem('openid', data.data.result)
    //       // this.comparison(data.data.result)
    //     }
    //   })
    // }
  },
  methods: {
    tel() {
      if (this.phone == '') {
        this.$toast('请输入手机号')
      } else {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
          this.$toast('手机号码有误，请重填')
        } else {
          this.axios
            .get('/rest/wxserver/checkUser', { params: { phone: this.phone } })
            .then(data => {
              if (data == false) {
                this.$toast('没有此用户')
                this.jinXuan = true
              }
            })
        }
      }
    },
    // 截取url里的参数
    getUrlValue(kValue) {
      var url = window.location.href //当前页面的地址
      var reg = /([^?&=]+)=([^?&=]+)/g,
        obj = {},
        str = url
      url.replace(reg, function() {
        obj[arguments[1]] = arguments[2]
      })
      for (var keyName in obj) {
        if (keyName == kValue) {
          return obj[keyName]
          // break;
        }
      }
    },
    //通过openid看看有没有这个人
    // comparison(openid) {
    //   this.axios
    //     .get('/rest/wxserver/checkUserOpenId', {
    //       params: {
    //         openId: openid
    //         // openId: 'o12DOwIrUCqGUisT_mm3clPMbOi0'
    //       }
    //     })
    //     .then(data => {
    //       if (data == 'null' || data == null) {
    //         return
    //       } else {
    //         console.log(data)
    //         localStorage.setItem('uid', data.uid)
    //         localStorage.setItem('userName', data.vserName)
    //         localStorage.setItem('deptName', data.deptName)
    //         // this.$router.push({ path: '/home', replace: true })
    //       }
    //     })
    // },
    //获取验证码
    phoneSms() {
      if (this.phone == '') {
        this.$toast('请输入手机号')
      } else {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)) {
          this.$toast('手机号码有误，请重填')
        } else {
          this.axios
            .get('/rest/wxserver/checkUser', { params: { phone: this.phone } })
            .then(data => {
              if (data == false) {
                this.$toast('没有此用户')
                this.jinXuan = true
              } else {
                this.axios
                  .get('/rest/wxserver/getSMCode', {
                    params: { phone: this.phone }
                  })
                  .then(data => {
                    console.log(data)
                    if (data == '验证码发送成功') {
                      this.$toast('发送成功')
                      this.flag = true
                      this.time = 60 * 3000
                    } else {
                      this.$toast(data)
                      this.flag = true
                    }
                  })
              }
            })
        }
      }
    },
    //登陆
    login() {
      if (this.phone == '') {
        this.$toast('请输入手机号')
      } else if (this.sms == '') {
        this.$toast('请输入验证码')
      } else {
        axios
          .get('/rest/wxserver/loginByWX', {
            params: {
              phone: this.phone,
              openid: localStorage.getItem('openid'),
              // openid: 'o12DOwIrUCqGUisT_mm3clPMbOi0',
              smCode: this.sms
            }
          })
          .then(data => {
            console.log(data)
            if (data.data.result != null) {
              localStorage.setItem('uid', data.data.result.uid)
              localStorage.setItem('userName', data.data.result.vserName)
              localStorage.setItem('deptName', data.data.result.deptName)
              this.$router.push('/')
            } else {
              this.$toast('入职申请暂未通过！')
            }
          })
      }
    },
    // 按钮倒计时
    finish() {
      this.flag = false
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    .inp {
      background: rgba(255, 255, 255, 0.5);
      .left {
        color: #000;
        font-size: 14px;
        padding: 0 15px;
      }
      .input-noborder {
        width: 135px;
        height: 50px;
        font-size: 14px;
        background: rgba(000, 000, 000, 0);
      }
    }
    min-height: 100vh;
    background: url('../../images/图标/loginBG.jpg') no-repeat;
    background-size: cover;
    padding: 50% 20px;
    .van-cell {
      background-color: transparent;
      background: rgba(255, 255, 255, 0.5);
      height: 45px;
    }
    .van-count-down {
      background: #a68e44;
      height: 33px;
      width: 86px;
      border-radius: 30px;
      text-align: center;
      line-height: 33px;
      color: #fff;
      position: fixed;
      top: 240px;
      right: 30px;
    }
    .btn {
      margin-top: 100px;
    }
    .res {
      text-decoration: underline;
      color: white;
      position: relative;
      top: 50px;
      text-align: center;
      font-weight: 700;
      a {
        color: white;
        font-size: 16px;
      }
    }
  }
}
</style>
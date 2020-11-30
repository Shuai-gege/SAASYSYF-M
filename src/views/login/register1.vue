<template>
  <div class="box">
    <div class="title" v-if="flag1">请填写个人账号信息</div>
    <div class="title" v-else>您还未加入任何企业</div>
    <!-- 填写注册信息 -->
    <div class="con" v-if="flag1">
      <van-form @submit="onSubmit" style="padding:15px;">
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="affirmPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ validator:affirmPSD, message: '两次密码不一致' }]"
        />
        <van-field
          v-model="tel"
          type="tel"
          name="pattern"
          label="手机号"
          placeholder="手机号"
          :rules="[{ pattern, message: '请填写正确的手机号' }]"
        />
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              color="#F5B98B"
              native-type="button"
              @click="smsCode"
              v-if="!flag"
            >发送验证码</van-button>
            <van-count-down v-else :time="time" format="ss" @finish="finish" />
          </template>
        </van-field>
        <van-field name="uploader" label="上传正面照">
          <template #input>
            <van-uploader
              v-model="uploader"
              :max-count="1"
              :after-read="updateImg"
              @delete="remove"
            />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="register">下一步</van-button>
        </div>
      </van-form>
    </div>
    <!-- 下一步 -->
    <div class="step" v-else>
      <!-- 按钮 -->
      <div class="btn">
        <van-button type="primary" size="large" color="#64A5DC" @click="apply">申请加入已有企业</van-button>
        <van-button type="primary" size="large" color="#64A5DC" @click="setUp">创建新的企业</van-button>
        <van-button type="primary" size="large" color="#64A5DC" @click="flag1 = true">上一步</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      affirmPassword: '',
      tel: '',
      sms: '', //验证码
      uploader: [],
      base64: '', //图片格式
      base64Arr: [], //图片格式
      tuName: '', //图片名字
      tuNameArr: [], //图片名字
      flag: false,
      flag1: true,
      time: 60 * 3000,
      pattern: /^1[3|4|5|7|8][0-9]{9}$/, //手机号核验
      regObj: {
        base64: '',
        fileName: '',
        openId: localStorage.getItem('openid'),
        password: '',
        phone: '',
        userName: ''
      }
    }
  },
  mounted() {
    this.flag1 = this.$route.query.flag1
  },
  methods: {
    // 确认密码
    affirmPSD(val) {
      if (val == this.password) {
        return true
      } else {
        return false
      }
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    // 图片压缩
    dataURLtoFile(dataurl, filename) {
      // 将base64转换为file文件
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    updateImg(file) {
      let canvas = document.createElement('canvas') // 创建Canvas对象(画布)
      let context = canvas.getContext('2d')
      let img = new Image()
      img.src = file.content // 指定图片的DataURL(图片的base64编码数据)
      img.onload = () => {
        canvas.width = 400
        canvas.height = 300
        context.drawImage(img, 0, 0, 400, 300)
        file.content = canvas.toDataURL(file.file.type, 0.92) // 0.92为默认压缩质量
        let files = this.dataURLtoFile(file.content, file.file.name)
        const data = new FormData()
        data.append('file', files)
        data.append('code', this.applyNo)
        data.append('type', 'chat')
        this.base64Arr.push(file.content)
        this.tuNameArr.push(file.file.name)
        this.base64 = this.base64Arr.join('#')
        this.tuName = this.tuNameArr.join(',')
        this.keepAxios
          .post(this.baseUrl.checkList + '/rest/appUser/img/upload', {
            base64: this.base64
          })
          .then(data => {
            console.log(data)
            if (data.data.code == 20000) {
              this.regObj.faceImg =
                'http://47.100.240.228:8951/rest/user/img/' + data.data.result
            } else {
              this.$toast(data.data.msg)
            }
          })
      }
    },
    // 删除图片
    remove(file, detail) {
      this.base64Arr.forEach(item => {
        if (item == file.content) {
          return this.base64Arr.splice(detail.index, 1)
        }
      })
      this.tuNameArr.forEach(item => {
        if (item == file.file.name) {
          return this.tuNameArr.splice(detail.index, 1)
        }
      })
      this.base64 = this.base64Arr.join('#')
      this.tuName = this.tuNameArr.join(',')
    },
    // 短信验证码
    smsCode() {
      this.axios
        .get('/rest/wxserver/checkUser', { params: { phone: this.tel } })
        .then(data => {
          if (data == true) {
            this.$toast('此手机号已注册')
            this.flag = false
          } else {
            this.keepAxios
              .get(this.baseUrl.checkList + '/rest/appUser/getSMCode', {
                params: {
                  phone: this.tel
                }
              })
              .then(data => {
                if (data.data.code == 20000) {
                  this.flag = true
                  this.time = 60 * 3000
                  this.$toast(data.data.msg)
                } else {
                  this.$toast(data.data.msg)
                }
              })
          }
        })
    },
    // 按钮倒计时
    finish() {
      this.flag = false
    },
    apply() {
      this.$router.push({
        name: 'joinCompany',
        query: {
          obj: JSON.stringify(this.regObj)
        }
      })
    },
    setUp() {
      this.$router.push({
        name: 'newFirm',
        query: {
          obj: JSON.stringify(this.regObj)
        }
      })
    },
    // 注册
    register() {
      this.regObj.userName = this.username
      this.regObj.password = this.password
      this.regObj.phone = this.tel
      this.regObj.verifyCode = this.sms
      this.keepAxios
        .post(
          this.baseUrl.checkList + '/rest/appUser/accountRegister',
          this.regObj
        )
        .then(data => {
          if (data.data.code == 20000) {
            this.flag1 = false
            this.$toast(data.data.msg)
          } else {
            this.$toast(data.data.msg)
          }
        })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  color: black;
  font-size: 14px;
  background-image: linear-gradient(#fff, rgb(9, 63, 112));
  .title {
    display: flex;
    justify-content: center;
    font-size: 18px;
    padding-top: 30px;
  }
  .con {
    padding-top: 20px;
    .van-count-down {
      min-width: 78px;
      height: 0.8rem;
      background: #f5b98b;
      line-height: 0.8rem;
      text-align: center;
      border-radius: 2px;
    }
  }
  .step {
    .btn {
      margin-top: 100px;
      /deep/.van-button--large {
        margin-top: 50px;
        border-radius: 10px;
      }
    }
  }
}
</style>
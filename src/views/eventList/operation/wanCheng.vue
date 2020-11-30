<template>
  <div class="box">
    <div class="con">
      <!-- 完成事件描述 -->
      <van-radio-group v-model="radio" @change="rad" v-if="flag">
        <van-radio name="确认故障并已修复">确认故障并已修复</van-radio>
        <van-radio name="设备正常无故障">设备正常无故障</van-radio>
      </van-radio-group>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="完成描述:"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <p>请上传图片</p>
      <van-uploader v-model="fileList" :after-read="afterRead" :max-count="6" @delete="remove" />
    </div>
    <div class="btn flex">
      <van-button color="#999" @click="$router.go(-1)">取消</van-button>
      <van-button color="#A68E44" @click="end">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      message: '', //完成事件描述
      show: false, //使用物料弹出窗
      value: '', //模糊搜索
      base64: '', //图片格式
      base64Arr: [], //图片格式
      tuName: '', //图片名字
      tuNameArr: [], //图片名字
      fileList: [],
      radio: '',
      flag: false
    }
  },
  mounted() {
    if (this.$route.query.num == '1') {
      this.flag = true
    } else {
      this.flag = false
    }
  },
  methods: {
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
    // 图片上传
    afterRead(file) {
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
        console.log(this.base64)
      }
      // this.base64Arr.push(file.content)
      // this.tuNameArr.push(file.file.name)
      // this.base64 = this.base64Arr.join('#')
      // this.tuName = this.tuNameArr.join(',')
      // console.log(this.base64)
      // console.log(this.tuName)
    },
    // 点击xx的时候触发
    remove(file, detail) {
      console.log(file)
      console.log(detail)
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
    rad(val) {
      console.log(val)
      this.message = val
    },
    end() {
      //完成、退回。延期
      if (this.message == '') {
        this.$toast('请输入完成描述')
      } else if (this.fileList == '') {
        this.$toast('请上传完成图片')
      } else {
        this.axios
          .post('/rest/tbEventReport/completeEvent', {
            uid: localStorage.getItem('uid'), //登录人ID
            status: '1', //操作状态，1完成，2退回，3延期
            base64: this.base64, //图片
            file_name: this.tuName, //图片名字
            event_id: sessionStorage.getItem('id'), //事件ID
            description: this.message, //描述
            hours: '' //延期时长
          })
          .then(data => {
            this.$toast('完成成功')
            this.$router.push('/eventList')
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    .van-radio {
      padding: 10px;
    }
    .content {
      padding: 16px;
    }
    p {
      font-size: 14px;
      color: #000;
    }
  }
  .btn {
    padding: 50px 30px;
    .van-button--normal {
      padding: 0 1.4rem;
    }
  }
}
</style>
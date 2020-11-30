<template>
  <div class="box">
    <van-nav-bar title="故障上报" @click-left="onClickLeft" left-arrow :fixed="true"></van-nav-bar>
    <div class="con">
      <van-cell title="巡更点" is-link to="spotFault1" :value="faultName" />
      <!-- 上报描述 -->
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="上报描述:"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <!-- 图片上传 -->
      <van-uploader v-model="fileList" :max-count="6" :after-read="updateImg" @delete="remove" />
      <!-- 按钮 -->
      <div class="btn flex">
        <van-button color="#999" @click="out">取消</van-button>
        <van-button color="#a48f36" @click="end">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      fileList: [], //上传图片
      base64: '', //图片格式
      base64Arr: [], //图片格式
      tuName: '', //图片名字
      tuNameArr: [], //图片名字
      faultName: '', //故障点名字
      id: '' //巡更点ID
    }
  },
  mounted() {
    this.id = this.$route.query.faultId
    if (
      this.$route.query.buildingName == undefined ||
      this.$route.query.floorName == undefined ||
      this.$route.query.patrolPointName == undefined
    ) {
      this.faultName = '请选择'
    } else {
      this.faultName =
        this.$route.query.buildingName +
        '/' +
        this.$route.query.floorName +
        '--' +
        this.$route.query.patrolPointName
    }
  },
  methods: {
    // 图片压缩
    updateImg(file) {
      console.log(file)
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
      }
      console.log(this.base64)
      console.log(this.tuName)
    },

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
      console.log(this.base64Arr)
      console.log(this.tuNameArr)
    },
    //确定
    end() {
      if (this.message == '') {
        this.$toast('请填写故障描述')
      } else if (this.base64 == '') {
        this.$toast('请上传图片')
      } else if (this.faultName == '') {
        this.$toast('请选择故障巡更点')
      } else {
        this.keepAxios
          .post(this.baseUrl.keepAxios + '/app/patrolTask/reportDefault', {
            uid: localStorage.getItem('uid'),
            base64: this.base64,
            file_name: this.tuName,
            remark: this.message,
            patrolPointId: this.id,
            taskDetailId: localStorage.getItem('taskDetailId'),
            defaultType: '2'
          })
          .then(data => {
            console.log(data.data)
            if (data.data.code == 20000) {
              this.$toast('上报故障成功')
              this.$router.push('/spotCheck')
            } else {
              this.$toast(data.data.msg)
            }
          })
      }
    },
    out() {
      this.$router.push({
        path: 'keepWatchDetails',
        query: {
          id: localStorage.getItem('keepWatchId')
        }
      })
    },
    onClickLeft() {
      this.$router.push({
        path: 'keepWatchDetails',
        query: {
          id: localStorage.getItem('keepWatchId')
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    padding-top: 45px;
    .btn {
      padding-top: 100px;
      padding-bottom: 30px;
      .van-button--normal {
        margin: 0 30px;
        width: 240px;
      }
    }
  }
}
</style>
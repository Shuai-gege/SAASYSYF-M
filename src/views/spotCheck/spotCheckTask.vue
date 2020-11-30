<template>
  <div class="box">
    <van-nav-bar title="检查项详情" @click-left="onClickLeft" left-arrow :fixed="true"></van-nav-bar>
    <!-- 检查项内容 -->
    <div class="con">
      <!-- 建筑 -->
      <div class="flex_l">位置：{{weiZhi}}</div>
      <!-- 设备类型 -->
      <span class="flex_l">设备类型：{{type}}</span>
      <!-- 设备名称 -->
      <div class="flex_l">设备名称：{{spotName}}</div>
    </div>
    <!-- title -->
    <div class="title">检查过程</div>
    <!-- 检查项 -->
    <div class="check">
      <!-- 第一条检查项 -->
      <div v-for="(item,i) in spotCheck" :key="i">
        <div class="flex_s" v-if="item.checkType == 2">
          <span class="jianChaName">{{i+1}} {{item.checkDescription}}</span>
          <span>
            <van-radio-group v-model="item.inputValue" direction="horizontal">
              <van-radio name="正常">正常</van-radio>
              <van-radio name="异常">异常</van-radio>
            </van-radio-group>
          </span>
        </div>
        <!-- ----------------- -->
        <div class="flex_s" style="height:60px;" v-if="item.checkType == 0">
          <span class="jianChaName1">{{i+1}} {{item.checkDescription}}</span>
          <span>
            <van-field v-model="item.inputValue" type="digit" :placeholder="item.inputTips" />
          </span>
        </div>

        <!-- 000 -->
        <div class="flex_s" style="height:60px;" v-if="item.checkType == 1">
          <span class="jianChaName1">{{i+1}} {{item.checkDescription}}</span>
          <span>
            <van-field v-model="item.inputValue" :placeholder="item.inputTips" />
          </span>
        </div>
      </div>

      <!-- 第四条检查项 -->
      <div class="flex_s">
        巡查结果
        <span style="padding-left:106px;">
          <van-radio-group v-model="radio" direction="horizontal" @change="result">
            <van-radio name="0">正常</van-radio>
            <van-radio name="1">异常</van-radio>
          </van-radio-group>
        </span>
      </div>
      <!-- 描述 -->
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="描述"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
    <!-- 拍照 -->
    <div class="paiZhao">
      <van-uploader v-model="fileList" :max-count="5" :after-read="afterRead" @delete="remove" />
    </div>
    <div class="btn flex">
      <van-button color="#999" @click="$router.go(-1)">取消</van-button>
      <van-button color="#A68E44" @click="end">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '', //单选
      message: '', //描述
      fileList: [], //上传的图片
      base64Datas: [],
      base64: '', //图片格式
      base64Arr: [], //图片格式
      tuName: '', //图片名字
      tuNameArr: [], //图片名字
      spotCheck: [], //检查项的每一项
      weiZhi: '', //设备位置
      type: '', //设备类型
      spotName: '', //设备名称
      checkResult: {
        uid: localStorage.getItem('uid'),
        checkItemList: [],
        fileName: '',
        base64: ''
      }, //完成后的参数
      url: '',
      base64Datas: []
    }
  },
  mounted() {
    var url0 = unescape(localStorage.getItem('baseUrl'))
    this.url = url0.replace('https', 'http')
    // ----------------------
    this.spotCheck = this.$route.params.spotCheck
    this.weiZhi = this.$route.params.weiZhi
    this.type = this.$route.params.type
    this.spotName = this.$route.params.spotName
    this.checkResult.taskDetailId = localStorage.getItem('taskDetailId')
    this.checkResult.deviceId = localStorage.getItem('deviceId')
    this.radio = this.$route.params.radio
    this.message = this.$route.params.remark
    // let img = this.$route.params.imgUrl
    // let imgs = img.split(',')
    // imgs.forEach(item => {
    //   this.fileList.push({ url: this.url + item })
    // })
  },
  methods: {
    // 压缩图片
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
    onClickLeft() {
      this.$router.go(-1)
    },
    ad() {
      console.log('aaa')
    },
    // 图片上传
    afterRead(file) {
      this.show = false
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
        this.checkResult.base64 = this.base64
        this.checkResult.fileName = this.tuName
      }
      console.log(this.fileList)
      // this.base64Arr.push(file.content)
      // this.tuNameArr.push(file.file.name)
      // this.base64 = this.base64Arr.join('#')
      // this.tuName = this.tuNameArr.join(',')
      // console.log(this.base64)
      // console.log(this.tuName)
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
    result(name) {
      console.log(name)
      this.checkResult.deviceResult = name
    },
    end() {
      this.checkResult.remark = this.message
      this.spotCheck.forEach(item => {
        this.checkResult.checkItemList.push({
          dataId: item.id,
          dataValue: item.inputValue
        })
      })
      console.log('xiamian')
      console.log(this.checkResult)
      if (this.fileList.length < 3) {
        this.$toast('请上传3张图片')
      } else if (this.message == '') {
        this.$toast('请输入描述')
      } else if (
        this.checkResult.checkItemList.forEach(item => item.dataValue) == ''
      ) {
        this.$toast('请输入检查项')
      } else {
        this.keepAxios
          .post(
            this.baseUrl.spotCheck + '/app/check/checkSubmit',
            this.checkResult
          )
          .then(data => {
            console.log(data)
            if (data.data.code == 20000) {
              localStorage.setItem(
                'deviceName',
                data.data.data.deviceInfoBean.deviceName
              )

              this.$router.push({
                path: '/spotCheckDetails',
                query: {
                  id: this.checkResult.taskDetailId,
                  patrolPointCheck:
                    data.data.data.checkScanSignInBean.patrolPointCheck,
                  faceCheck: data.data.data.checkScanSignInBean.faceCheck,
                  time: localStorage.getItem('time')
                }
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f5f6f7;
  .con {
    padding: 55px 0 10px;
    background: #fff;
    .flex_l {
      font-size: 13px;
      color: #000;
      padding: 12px 10px;
    }
  }
  .title {
    font-size: 16px;
    color: #000;
    background: #f5f6f7;
    padding: 0 10px;
  }
  .check {
    color: #000;
    background: #fff;
    font-size: 14px;
    padding: 10px;
    width: 100%;
    /deep/.van-field__value {
      border: 1px solid #000;
    }
    /deep/.van-cell {
      padding: 15px 0;
    }
    .flex_s {
      padding: 10px 0;
      .jianChaName {
        // padding-top: 14px;
      }
      .jianChaName1 {
        padding-top: 14px;
      }
    }
  }
  .paiZhao {
    margin-top: 10px;
    padding: 10px 0 0;
    background: #fff;
  }
  .btn {
    padding: 50px 30px;
    .van-button--normal {
      padding: 0 1.4rem;
    }
  }
}
</style>
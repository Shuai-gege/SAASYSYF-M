<template>
  <div class="box">
    <div class="con">
      <!-- 验收依据 -->
      <div class="maxBox flex">
        <p>验收依据</p>
        <div class="danXuan">
          <van-radio-group v-model="radio" icon-size="15" @change="yanShou">
            <van-radio name="1">现场验收</van-radio>
            <van-radio name="2">图片验收</van-radio>
          </van-radio-group>
        </div>
      </div>
      <!-- 验收结论 -->
      <div class="maxBox flex">
        <p>验收结论</p>
        <div class="danXuan">
          <van-radio-group v-model="radio1" icon-size="15" @change="verdict">
            <van-radio name="1">合格</van-radio>
            <van-radio name="2">不合格</van-radio>
          </van-radio-group>
        </div>
      </div>
      <!-- 验收描述 -->
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="验收描述"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <!-- 拍照 -->
      <van-uploader v-model="fileList" :max-count="6" :after-read="afterRead" @delete="remove" />
      <!-- 物料使用核实 -->
      <p class="cellName" v-if="flag">物料核实</p>
      <van-cell-group>
        <van-cell title="物料选择" :value="wuLiaoValue" v-if="flag" @click="show = true" />
      </van-cell-group>
      <!-- 物料选择 -->
      <van-action-sheet v-model="show" title="物料选择">
        <van-collapse
          v-for="(item,i) in wuLiaoList"
          :key="i"
          v-model="activeNames"
          @change="type(item.id)"
          :accordion="true"
        >
          <van-collapse-item :title="item.typeName" :name="item.id">
            <div class="flex" v-for="(item,i) in wuLiaoList1" :key="i">
              <van-checkbox v-model="item.checked" icon-size="15">{{item.materialsName}}</van-checkbox>
              <van-cell-group>
                <van-field
                  v-model="item.value"
                  type="number"
                  placeholder="请输入使用量"
                  @blur="cbx(item.checked,item.id,item.value,item.materialsName)"
                />
              </van-cell-group>
            </div>
          </van-collapse-item>
        </van-collapse>
        <div class="btn1 flex">
          <van-button type="primary" color="#999" @click="show = false">取消</van-button>
          <van-button type="primary" color="#A68E44" @click="show = false">确定</van-button>
        </div>
      </van-action-sheet>
      <!-- 被评价人 -->
      <p class="userName" v-if="flag">被评人：{{name}}</p>
      <!-- 评价 -->
      <div v-if="flag">
        <div class="maxBox flex">
          <p>{{data[0].assessType}}</p>
          <van-rate v-model="data[0].value" :count="10" @change="pingFen" />
        </div>
        <div class="maxBox flex">
          <p>{{data[1].assessType}}</p>
          <van-rate v-model="data[1].value" :count="10" @change="pingFen1" />
        </div>
        <div class="maxBox flex">
          <p>{{data[2].assessType}}</p>
          <van-rate v-model="data[2].value" :count="10" @change="pingFen2" />
        </div>
      </div>
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
      radio: '', //验收依据
      radio1: '', //验收结论
      message: '', //验收描述
      fileList: [], //上传的图片
      text: '', //上传的图片
      text1: '', //上传的图片
      value: '', //物料数量
      activeNames: [],
      wuLiaoValue: '', //物料使用情况
      wuLiaoValue1: [], //物料使用情况
      checked: false,
      num: '', //验收结论，1合格，2不合格
      num1: '', //验收结论，1现场验收，2照片验收
      name: '', //被评价人名字
      flag: false, //验收合格才展示
      show: false, //物料选择
      wuLiaoList: [], //物料类型列表
      wuLiaoList1: [], //物料名字列表
      meterials_use: [], //物料格式
      data: [],
      base64: '', //图片格式
      base64Arr: [], //图片格式
      tuName: '', //图片名字
      tuNameArr: [], //图片名字
      star_one: '', //第一个评价星星数
      star_two: '', //第二个评价星星数
      star_three: '' //第三个评价星星数
    }
  },
  mounted() {
    this.name = this.$route.query.userName
    //物料
    this.axios
      .post('/rest/tbMaterialsType/list', {
        uid: localStorage.getItem('uid'),
        page: '1',
        limit: '40'
      })
      .then(data => {
        console.log(data)
        this.wuLiaoList = data.rows
      })
    //评价类型
    this.axios
      .post('/rest/tbAssessConfig/list', {
        uid: localStorage.getItem('uid'),
        page: '1',
        limit: '20'
      })
      .then(data => {
        console.log(data)
        this.data = data.rows
      })
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
      }
      // this.base64Arr.push(file.content)
      // this.tuNameArr.push(file.file.name)
      // this.base64 = this.base64Arr.join('#')
      // this.tuName = this.tuNameArr.join(',')
      // console.log(this.base64)
      // console.log(this.tuName)
    },
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
    end() {
      if (this.radio == '') {
        this.$toast('请选择验收依据')
      } else if (this.radio1 == '') {
        this.$toast('请选择验收结论')
      } else if (this.num == '2') {
        this.axios
          .post('/rest/tbEventReport/checkCompleteEvent', {
            check_according: this.num1, //验收依据
            uid: localStorage.getItem('uid'), //登录人ID
            eventId: sessionStorage.getItem('id'), //已完成事件ID
            meterials_use: this.meterials_use.join(','), //物料实用
            check_remark: this.message, //完成描述
            base64: this.base64, //图片
            file_name: this.tuName, //图片名字
            completeUserId: this.$route.query.userNameId, //完成人ID
            checkUserId: localStorage.getItem('uid'), //审核人ID
            check_verdict: this.num, //验收结论，1合格，2不合格
            star_one: this.star_one, //第一个评价星星数
            star_two: this.star_two, //第二个评价星星数
            star_three: this.star_three //第三个评价星星数
          })
          .then(data => {
            this.$toast('验收完成')
            this.$router.push('/eventList')
          })
      } else if (this.message == '') {
        this.$toast('请填写验收描述')
      } else if (this.star_one == '') {
        this.$toast('请填写第一个评价')
      } else if (this.star_two == '') {
        this.$toast('请填写第二个评价')
      } else if (this.star_three == '') {
        this.$toast('请填写第三个评论')
      } else {
        this.axios
          .post('/rest/tbEventReport/checkCompleteEvent', {
            check_according: this.num1, //验收依据
            uid: localStorage.getItem('uid'), //登录人ID
            eventId: sessionStorage.getItem('id'), //已完成事件ID
            meterials_use: this.meterials_use.join(','), //物料实用
            check_remark: this.message, //完成描述
            base64: this.base64, //图片
            file_name: this.tuName, //图片名字
            completeUserId: this.$route.query.userNameId, //完成人ID
            checkUserId: localStorage.getItem('uid'), //审核人ID
            check_verdict: this.num, //验收结论，1合格，2不合格
            star_one: this.star_one, //第一个评价星星数
            star_two: this.star_two, //第二个评价星星数
            star_three: this.star_three //第三个评价星星数
          })
          .then(data => {
            this.$toast('验收完成')
            this.$router.push('/eventList')
          })
      }
    },
    // 验收方式
    yanShou(name) {
      console.log(name)
      this.num1 = name
    },
    // 验收结论
    verdict(name) {
      this.num = name
      if (name == 1) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    //选择物料类型
    type(activeNames) {
      console.log(activeNames)
      this.axios
        .post('/rest/tbMaterialsManage/list', { materialsTypeId: activeNames })
        .then(data => {
          console.log(data)
          this.wuLiaoList1 = data.rows
          this.$set(this.wuLiaoList1, 'checked', false)
          this.$set(this.wuLiaoList1, 'value', '')
        })
    },
    //物料选择
    cbx(checked, id, value, wuLiaoName) {
      console.log(checked, id, value, wuLiaoName)
      if (checked == true) {
        var geShi = id + ':' + value
        this.meterials_use.push(geShi)
        this.meterials_use = [...new Set(this.meterials_use)]
        console.log(this.meterials_use.join(','))
        var num = wuLiaoName + ':' + value + '个'
        this.wuLiaoValue1.push(num)
        this.wuLiaoValue1 = [...new Set(this.wuLiaoValue1)]
        this.wuLiaoValue = this.wuLiaoValue1.join(',')
        console.log(this.wuLiaoValue1.join(','))
      } else {
        this.wuLiaoValue = ''
      }
    },
    //评分
    pingFen(value) {
      console.log(value)
      this.star_one = value
    },
    //评分
    pingFen1(value) {
      console.log(value)
      this.star_two = value
    },
    //评分
    pingFen2(value) {
      console.log(value)
      this.star_three = value
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f4f5f6;
  .con {
    .content {
      padding: 16px;
    }
    .van-checkbox {
      padding-left: 10px;
    }
    /deep/.van-checkbox__label {
      margin-left: 3px;
      margin-right: 15px;
    }
    .van-checkbox[data-v-052e3b7f] {
      background: #fff;
      margin-bottom: 5px;
      padding: 5px;
    }
    .cellName {
      font-size: 15px;
      color: #fc4c4c;
    }
    .userName {
      font-size: 15px;
      background-color: #fff;
      color: #000;
      padding: 10px 15px;
    }
    .maxBox {
      color: #000;
      padding: 10px;
      font-size: 14px;
      background: #fff;
      margin: 5px 0 5px 0;

      .danXuan {
        .van-radio-group {
          display: flex;
        }
        /deep/.van-radio__label {
          margin-left: 0;
          margin-right: 15px;
        }
      }
    }
    .btn1 {
      padding: 15px;
      .van-button--normal {
        padding: 0 45px;
      }
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
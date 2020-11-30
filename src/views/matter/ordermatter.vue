<template>
  <div class="manage">
    <van-nav-bar title="我要报事" left-text="首页" left-arrow @click-left="onClickLeft" :fixed="true" />
    <div class="con">
      <van-cell-group>
        <van-cell title="报事人:" :value="iName" />
        <van-cell title="报事企业:" :value="company" @click="show = true" />
        <!-- 选择报事的企业 -->
        <van-action-sheet v-model="show" title="选择要报事的企业:">
          <div class="content">
            <van-radio-group v-model="radio">
              <van-radio
                v-for="(item,i) in comPany"
                :key="i"
                :name="item.companyId"
                icon-size="16"
                @click="qiYe(item.name,item.companyId)"
              >{{item.name}}</van-radio>
            </van-radio-group>
          </div>
        </van-action-sheet>
        <van-cell title="报事位置:" :value="locationName" @click="weiZhi" />
        <!-- 报事位置 -->
        <van-cell title="详细位置描述:" :value="message1" @click="site" />
        <!-- 位置详细描述搜索框 -->
        <van-action-sheet v-model="show1" title="报事详细位置:">
          <van-field
            v-model="message1"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="60"
            placeholder="请输入留言"
            show-word-limit
          />
          <div class="btn flex">
            <van-button color="#A68E44" @click="inDetail">确定</van-button>
            <van-button color="#999" @click="show1 = false">取消</van-button>
          </div>
        </van-action-sheet>
      </van-cell-group>
      <!-- 选择分配人 -->
      <!-- <van-cell title="分配人" :value="fenPeiName" @click="show2 = true" />
      <van-action-sheet v-model="show2" title="分配人">
        <div class="content">
          <van-radio-group v-model="radio">
            <van-radio
              :name="item.uid"
              icon-size="16"
              v-for="(item,i) in userNames"
              :key="i"
              @click="itemName(item.vserName,item.uid)"
            >{{item.vserName}}</van-radio>
          </van-radio-group>
        </div>
      </van-action-sheet>-->
      <!-- 报事类型 -->
      <div class="baoShiType flex_f">
        <p>报事类型:</p>
        <span
          v-for="(item,i) in baoShiType"
          :key="i"
          @click="leftChange(item.id,i)"
          :class="{discolor:changeLeftBackground == i}"
        >{{item.eventType}}</span>
      </div>
      <div style="margin:0.5px 15px"></div>
      <!-- 处理方式 -->
      <div class="baoShiType flex_f">
        <p>处理方式:</p>
        <span
          v-for="(item,i) in dispose"
          :key="i"
          @click="leftChange1(item.name,i)"
          :class="{discolor1:changeLeftBackground1 == i}"
        >{{item.name}}</span>
      </div>
      <p>事件描述</p>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输描述"
        show-word-limit
      />
      <p>添加照片</p>
      <van-uploader v-model="fileList" :max-count="6" :after-read="updateImg" @delete="remove" />
    </div>
    <div class="btn flex">
      <van-button color="#A68E44" @click="end">确定</van-button>
      <van-button color="#999" to="/">取消</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      iName: localStorage.getItem('userName'), //自己的名字
      show: false,
      show1: false, //位置详细搜索
      show2: false, //分配人
      radio: '', //选择要报给的公司
      radio: '', //选择分配人
      userNames: [], //分配人list
      fenPeiUid: '', //分配人ID
      reportEventTypeId: '', //上报事件数据ID
      company: localStorage.getItem('deptName'), //要报给的那个企业
      companyId: '', //报事企业ID
      name: '阿萨德',
      baoShiType: [],
      dispose: [{ name: '指派部门' }, { name: '自行处理' }],
      dispose1: '1', //处理方式
      changeLeftBackground: -1, //报事类型按钮改变颜色
      changeLeftBackground1: 0, //处理方式按钮改变颜色
      message: '', //描述输入框
      message1: '', //详细地址输入框
      fileList: [], //图片上传
      locationName: '选择', //报事位置
      fenPeiName: '选择', //分配人
      base64: '', //图片格式
      base64Arr: [], //图片格式
      tuName: '', //图片名字
      tuNameArr: [], //图片名字
      comPany: [] //公司
    }
  },
  components: {},
  mounted() {
    //当前公司下所有人
    this.allUsers()
    //查询当前登录人下面所有企业/部门
    this.department()
    setTimeout(() => {
      // 事件类型List
      this.tbEventTypeConfig()
    }, 500)
    // 报事位置
    if (sessionStorage.getItem('locationName') == null) {
      this.locationName = '选择'
    } else {
      this.locationName = sessionStorage.getItem('locationName')
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/')
    },
    //报事类型点击改变颜色
    leftChange(id, index) {
      if (this.locationName == '' || this.locationName == '选择') {
        this.$toast('请先选择报事位置')
      } else {
        this.changeLeftBackground = index
        this.reportEventTypeId = id
        console.log(id)
      }
    },
    //处理方式点击改变颜色
    leftChange1(name, index) {
      if (this.locationName == '' || this.locationName == '选择') {
        this.$toast('请先选择报事位置')
      } else {
        this.changeLeftBackground1 = index
        if (name == '指派部门') {
          this.dispose1 = '1'
        } else if (name == '自行处理') {
          this.dispose1 = '2'
        }
      }
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
      }
      console.log(this.base64)
      console.log(this.tuName)
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
    // 查询事件类型
    tbEventTypeConfig() {
      this.axios
        .get('/rest/tbEventTypeConfig/getEventTypes', {
          params: { uid: '', company_id: localStorage.getItem('companyId') }
        })
        .then(data => {
          data.sort(function(a, b) {
            return a.eventType > b.eventType ? 1 : -1
          })
          this.baoShiType = data
          console.log(data)
          this.reportEventTypeId = data[0].id
        })
    },
    //查询同公司下所有人
    allUsers() {
      // this.axios
      //   .get('/rest/department/getCompanyAllUser', {
      //     params: { id: localStorage.getItem('uid') }
      //   })
      //   .then(data => {
      //     console.log(data)
      //     this.userNames = data
      //   })
    },
    // 选中那个人
    itemName(name, uid) {
      console.log(name, uid)
      this.fenPeiName = name
      this.fenPeiUid = uid
      this.show2 = false
    },
    // 当前选中的
    isRadio(name) {
      if (name == 1) {
        this.company = 'xxx公司'
        this.show = false
      } else {
        this.company = 'xxx分公司'
        this.show = false
      }
    },
    // 查询登录人下面所有公司/部门
    department() {
      this.axios
        .get('/rest/department/getCompanyByUid', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          console.log(data)
          this.companyId = data.id
          this.company = data.name
          this.comPany.push({
            companyId: data.id,
            name: data.name
          })
          localStorage.setItem('companyId', data.id)
          this.department1()
        })
    },
    department1() {
      this.axios
        .get('/rest/department/getCompanyDept', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          data.forEach(item => {
            if (item.deptCompany == 2) {
              this.comPany.push({
                companyId: item.id,
                name: item.name
              })
            }
          })
          console.log(this.comPany)
        })
    },
    // 企业传参
    qiYe(name, id) {
      console.log(name, id)
      this.company = name
      // companyId: '' //公司ID
      this.companyId = id
      localStorage.setItem('companyId', id)
      this.show = false
    },
    // 详细地址搜索/选择
    site() {
      this.show1 = true
      this.message1 = ''
    },
    // 详细位置描述
    inDetail() {
      console.log(this.message1)
      this.show1 = false
    },
    // 选择位置
    weiZhi() {
      sessionStorage.clear()
      this.$router.push('/matterLocation')
    },

    //提交报事
    end() {
      console.log(this.reportEventTypeId)
      if (this.company == '') {
        this.$toast('请选择报事企业')
      } else if (this.locationName == '选择') {
        this.$toast('请选择报事位置')
      } else if (
        this.reportEventTypeId == '' ||
        this.changeLeftBackground == -1
      ) {
        this.$toast('请选择报事类型')
      } else if (this.fileList == '') {
        this.$toast('请上传图片')
      } else {
        // this.axios
        //   .post('/rest/tbEventReport/add', {
        //     uid: localStorage.getItem('uid'), //当前登录人ID
        //     reporterId: localStorage.getItem('uid'), //报事人ID
        //     buildingId0: sessionStorage.getItem('buildingId0'), //建筑id
        //     buildingId1: sessionStorage.getItem('buildingId1'), //楼层ID
        //     buildingId2: sessionStorage.getItem('buildingId2'), //房间ID
        //     disposalType: this.dispose1, //处理方式，1指派部门，2自行处理
        //     buildingDescription: this.message1, //详细位置
        //     eventRemark: this.message, //事件描述
        //     base64: this.base64, //图片
        //     file_name: this.tuName, //图片名字
        //     distributeUid: this.fenPeiUid, //分配人id
        //     reportEventTypeId: this.reportEventTypeId, //事件类型ID
        //     companyid: this.companyId //公司ID
        //   })
        //   .then(data => {
        //     this.$toast('报事成功')
        //     sessionStorage.removeItem('buildingId0')
        //     sessionStorage.removeItem('buildingId1')
        //     sessionStorage.removeItem('buildingId2')
        //     sessionStorage.removeItem('locationName')
        //     this.$router.push('/')
        //   })
        this.axios
          .get('/rest/tbEventReport/checkReportEvent', {
            params: { companyId: localStorage.getItem('companyId') }
          })
          .then(data => {
            console.log(data)
            if (data == true) {
              this.axios
                .post('/rest/tbEventReport/add', {
                  uid: localStorage.getItem('uid'), //当前登录人ID
                  reporterId: localStorage.getItem('uid'), //报事人ID
                  buildingId0: sessionStorage.getItem('buildingId0'), //建筑id
                  buildingId1: sessionStorage.getItem('buildingId1'), //楼层ID
                  buildingId2: sessionStorage.getItem('buildingId2'), //房间ID
                  disposalType: this.dispose1, //处理方式，1指派部门，2自行处理
                  buildingDescription: this.message1, //详细位置
                  eventRemark: this.message, //事件描述
                  base64: this.base64, //图片
                  file_name: this.tuName, //图片名字
                  distributeUid: this.fenPeiUid, //分配人id
                  reportEventTypeId: this.reportEventTypeId, //事件类型ID
                  companyid: this.companyId //公司ID
                })
                .then(data => {
                  this.$toast('报事成功')
                  sessionStorage.removeItem('buildingId0')
                  sessionStorage.removeItem('buildingId1')
                  sessionStorage.removeItem('buildingId2')
                  sessionStorage.removeItem('locationName')
                  this.$router.push('/')
                })
            } else {
              this.$toast(
                '当前版本为免费版，您支持的进行中的事件数已满，请联系平台管理员进行版本升级'
              )
            }
          })
      }
    }
  }
}
</script>

<style  lang='less' scoped>
.manage {
  min-height: 92.5vh;
  background: #f4f5f6;
  .con {
    padding-top: 50px;
    p {
      font-size: 14px;
      color: #000;
      // padding-left: 15px;
    }
    .baoShiType {
      padding: 12px 15px;
      background: #fff;
      span {
        background: #999;
        padding: 5px 8px;
        border-radius: 5px;
        color: #fff;
        font-size: 10px;
        margin: 5px 7px;
      }
      .discolor {
        background: #a68e44;
      }
      .discolor1 {
        background: #a68e44;
      }
    }
    .content {
      padding: 16px;
    }
  }
  .btn {
    padding: 15px;
    .van-button--normal {
      border-radius: 6px;
      padding: 0 50px;
    }
  }
}
</style>
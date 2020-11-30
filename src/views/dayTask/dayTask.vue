<template>
  <div class="manage">
    <van-nav-bar title="工作安排" left-text="首页" left-arrow @click-left="onClickLeft" :fixed="true" />
    <div class="con">
      <van-cell-group>
        <van-cell title="分配人:" :value="iName" />
        <van-cell title="企业:" :value="company" @click="show = true" />
        <!-- 选择报事的企业 -->
        <van-action-sheet v-model="show" title="选择要报事的企业:">
          <div class="content">
            <van-radio-group v-model="radio">
              <van-radio
                icon-size="16"
                @click="qiYe(companyList.name,companyList.id)"
              >{{companyList.name}}</van-radio>
            </van-radio-group>
          </div>
        </van-action-sheet>
        <van-cell title="分配位置:" :value="locationName" @click="weiZhi" />
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
      <!-- 选择分配人 -->
      <van-cell title="执行人：" :value="fenPeiName" @click="chaXun" />
      <van-action-sheet v-model="show2" title="执行人人" close-icon>
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
        <div class="content">
          <van-checkbox
            v-for="(item,i) in userNames"
            :key="i"
            v-model="item.checked"
            icon-size="16"
            @change="itemName(item.vserName,item.uid,item.checked)"
          >{{item.vserName}}</van-checkbox>
          <div class="btn flex">
            <van-button color="#999" @click="show2 = false">取消</van-button>
            <van-button color="#A68F43" @click="show2 = false">确定</van-button>
          </div>
        </div>
      </van-action-sheet>
      <!-- 时间选择 -->
      <div class="time">
        <van-cell title="开始时间：" :value="beginTime01" @click="flag = true" />
        <van-datetime-picker
          v-model="currentDate"
          v-if="flag == true"
          type="datetime"
          title="选择完整时间："
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="beginTime"
        />
      </div>
      <!-- 规定工时 -->
      <div class="planTime">
        <van-field v-model="digit" type="digit" label="规定工时：" placeholder="请选择规定工时" />
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
      fenPeiName1: [], //分配人
      companyList: [], //公司list
      base64: '', //图片格式
      base64Arr: [], //图片格式
      tuName: '', //图片名字
      tuNameArr: [], //图片名字
      flag: false,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      beginTime01: '选择开始时间',
      beginTime02: '选择开始时间',
      digit: '', //规定工时
      value: '', //搜索分配人
      checked: false,
      executor: '', //执行人
      uidArr: []
    }
  },
  components: {},
  mounted() {
    this.newTime()
    console.log(this.beginTime02)
    //当前公司下所有人
    // this.allUsers()
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
    // 根据事件类型查人
    chaXun() {
      this.show2 = true
      this.axios
        .post('/rest/tbEventTypeConfig/list', {
          uid: localStorage.getItem('uid'),
          id: this.reportEventTypeId
        })
        .then(data => {
          this.userNames = data.rows[0].getUserInfoExecute
          this.userNames.forEach(item => {
            this.$set(item, 'checked', this.checked)
          })
          console.log(data.rows)
        })
    },
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
    // 查询事件类型
    tbEventTypeConfig() {
      let arr = []
      this.axios
        .get('/rest/tbEventTypeConfig/getEventTypes', {
          params: {
            uid: localStorage.getItem('uid'),
            company_id: localStorage.getItem('companyId')
          }
        })
        .then(data => {
          data.sort(function(a, b) {
            return a.eventType > b.eventType ? 1 : -1
          })

          data.forEach(item => {
            if (
              item.userIdA == localStorage.getItem('uid') ||
              item.finalUserIdB == localStorage.getItem('uid')
            ) {
              this.baoShiType.push(item)
            }
          })
          console.log(this.baoShiType)
          this.reportEventTypeId = this.baoShiType[0].id
        })
    },
    // //查询同公司下所有人
    // allUsers() {
    //   this.axios
    //     .get('/rest/department/getCompanyAllUser', {
    //       params: { id: localStorage.getItem('uid') }
    //     })
    //     .then(data => {
    //       this.userNames = data
    //       this.userNames.forEach(item => {
    //         this.$set(item, 'checked', this.checked)
    //       })
    //       console.log(this.userNames)
    //     })
    // },
    // 选中那个人
    itemName(name, uid, checked) {
      console.log(name, uid)
      console.log(checked)
      if (checked == true) {
        this.fenPeiName1.push(name)
        this.uidArr.push(uid)
      } else if (checked != true) {
        let index = this.uidArr.indexOf(uid)
        let index1 = this.fenPeiName1.indexOf(name)
        if (index !== -1) {
          this.uidArr.splice(index, 1)
        }
        if (index1 !== -1) {
          this.fenPeiName1.splice(index1, 1)
        }
      }
      this.fenPeiName = [...new Set(this.fenPeiName1)].join(',')
      this.executor = [...new Set(this.uidArr)].join(',')
      console.log(this.fenPeiName)
      console.log(this.executor)
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
          this.companyList = data
          this.companyId = data.id
          this.company = data.name
          localStorage.setItem('companyId', data.id)
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
      this.$router.push('/dayTaskLocation')
    },

    //转换时间不够10前面补0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    newTime() {
      var myDate = new Date()
      console.log(myDate)
      // 年月日
      const resDate =
        myDate.getFullYear() +
        '/' +
        this.p(myDate.getMonth() + 1) +
        '/' +
        this.p(myDate.getDate())
      // 时分秒
      const resTime =
        this.p(myDate.getHours()) +
        ':' +
        this.p(myDate.getMinutes()) +
        ':' +
        this.p(myDate.getSeconds())
      this.beginTime01 = resDate + ' ' + resTime
      this.beginTime02 = new Date(this.beginTime01)
      console.log(this.beginTime02)
    },
    // 时间选择
    beginTime(value) {
      const d = value
      // 年月日
      const resDate =
        d.getFullYear() +
        '/' +
        this.p(d.getMonth() + 1) +
        '/' +
        this.p(d.getDate())

      // 时分秒
      const resTime =
        this.p(d.getHours()) +
        ':' +
        this.p(d.getMinutes()) +
        ':' +
        this.p(d.getSeconds())
      this.beginTime01 = resDate + ' ' + resTime
      this.beginTime02 = new Date(this.beginTime01)
      console.log(this.beginTime02)
      this.flag = false
    },
    cancel() {
      this.flag = false
    },
    //查询分配人
    onSearch() {
      console.log(this.value)
      console.log(this.userNames)
      for (var i = 0; i < this.userNames.length; i++) {
        console.log(this.userNames[i].vserName)
      }
    },
    //提交报事
    end() {
      if (this.company == '') {
        this.$toast('请选择报事企业')
      } else if (this.locationName == '选择') {
        this.$toast('请选择报事位置')
      } else if (
        this.reportEventTypeId == '' ||
        this.changeLeftBackground == -1
      ) {
        this.$toast('请选择报事类型')
      } else if (this.executor == '') {
        this.$toast('请选择执行人')
      } else if (this.digit == '') {
        this.$toast('请选择规定工时')
      } else if (this.message == '') {
        this.$toast('请填写事件描述')
      } else {
        // this.axios
        //   .post('/rest/tbEventReport/addRCEvent', {
        //     uid: localStorage.getItem('uid'), //当前登录人ID
        //     buildingId0: sessionStorage.getItem('buildingId0'), //建筑id
        //     buildingId1: sessionStorage.getItem('buildingId1'), //楼层ID
        //     buildingId2: sessionStorage.getItem('buildingId2'), //房间ID
        //     // disposalType: this.dispose1, //处理方式，1指派部门，2自行处理
        //     buildingDescription: this.message1, //详细位置
        //     event_remark: this.message, //事件描述
        //     base64: this.base64, //图片
        //     duration: this.digit, //计划工时
        //     startTime: this.beginTime02, //计划开始时间
        //     file_name: this.tuName, //图片名字
        //     distribute_uid: localStorage.getItem('uid'), //分配人id
        //     report_event_type_id: this.reportEventTypeId, //事件类型ID
        //     company_id: this.companyId, //公司ID
        //     userId: this.executor //执行人
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
            params: { companyId: localStorage.getItem('deptid') }
          })
          .then(data => {
            if (data == true) {
              this.axios
                .post('/rest/tbEventReport/addRCEvent', {
                  uid: localStorage.getItem('uid'), //当前登录人ID
                  buildingId0: sessionStorage.getItem('buildingId0'), //建筑id
                  buildingId1: sessionStorage.getItem('buildingId1'), //楼层ID
                  buildingId2: sessionStorage.getItem('buildingId2'), //房间ID
                  // disposalType: this.dispose1, //处理方式，1指派部门，2自行处理
                  buildingDescription: this.message1, //详细位置
                  event_remark: this.message, //事件描述
                  base64: this.base64, //图片
                  duration: this.digit, //计划工时
                  startTime: this.beginTime02, //计划开始时间
                  file_name: this.tuName, //图片名字
                  distribute_uid: localStorage.getItem('uid'), //分配人id
                  report_event_type_id: this.reportEventTypeId, //事件类型ID
                  company_id: this.companyId, //公司ID
                  userId: this.executor //执行人
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
<template>
  <div class="Home">
    <div class="con">
      <!-- 个人信息看板 -->
      <div class="tlt flex">
        <div @click.stop="my">
          <!-- <img src="../../images/Footer/1-1.png" alt /> -->
          <div class="myName flex_c yihang" @click.stop="my">{{myName}}</div>
        </div>
        <!-- <div :class="this.meMessage.workStatus == 1?'conter':'conter1'">
          <p>{{meMessage.companyName}}</p>
          <p>{{meMessage.mobile}}</p>
          <p>{{meMessage.deptName}}</p>
        </div>-->
        <div class="right" v-if="this.meMessage.workStatus == 1">
          <p>
            状态
            <i v-if="meMessage.nowStatus == '1'">{{status1}}</i>
            <i v-if="meMessage.nowStatus == '2'">{{status2}}</i>
          </p>
          <p v-if="meMessage.nowStatus == '1'" @click="isStatus">状态调整</p>
          <p v-if="meMessage.nowStatus == '2'" @click="isStatus1">状态调整</p>
        </div>

        <van-popup v-model="show">
          <div class="popup">
            请确认本次上岗操作，您将重新获得分配人权限
            <!-- 按钮 -->
            <div class="btn flex">
              <van-button color="#999" @click="show = false">取消</van-button>
              <van-button color="#a48f36" @click="end">确认</van-button>
            </div>
          </div>
        </van-popup>
      </div>
      <!-- 累计报事信息 -->
      <div class="upMatter flex">
        <span>年度</span>
        <div class="one">
          <p v-if="meMessage.totalCompleteEvents != '0'">{{meMessage.totalCompleteEvents}}</p>
          <p v-else>-</p>
          <p>完成报事</p>
        </div>
        <div class="two">
          <p v-if="meMessage.totalCheckEvents !='0'">{{meMessage.totalCheckEvents}}</p>
          <p v-else>-</p>
          <p>验收数量</p>
        </div>
        <div class="three">
          <p v-if="meMessage.totalReportEvents != '0'">{{meMessage.totalReportEvents}}</p>
          <p v-else>-</p>
          <p>报事数</p>
        </div>
        <div class="four">
          <p v-if="meMessage.totalScore !='0.0'">{{meMessage.totalScore}}</p>
          <p v-else>-</p>
          <p>评价总分</p>
        </div>
        <div class="five">
          <p v-if="meMessage.totalAvgScore != '0'">{{meMessage.totalAvgScore}}</p>
          <p v-else>-</p>
          <p>评价均分</p>
        </div>
      </div>
      <!-- 本月报事信息 -->
      <div class="monthMatter flex">
        <span>本月</span>
        <div class="one">
          <p v-if="meMessage.monthCompleteEvents != '0'">{{meMessage.monthCompleteEvents}}</p>
          <p v-else>-</p>
          <p>完成报事</p>
        </div>
        <div class="two">
          <p v-if="meMessage.monthCheckEvents != '0'">{{meMessage.monthCheckEvents}}</p>
          <p v-else>-</p>
          <p>验收数量</p>
        </div>
        <div class="three">
          <p v-if="meMessage.monthReportEvents != '0'">{{meMessage.monthReportEvents}}</p>
          <p v-else>-</p>
          <p>报事数</p>
        </div>
        <div class="four">
          <p v-if="meMessage.monthScore!='0.0'">{{meMessage.monthScore}}</p>
          <p v-else>-</p>
          <p>评价总分</p>
        </div>
        <div class="five">
          <p v-if="meMessage.monthAvgScore != '0'">{{meMessage.monthAvgScore}}</p>
          <p v-else>-</p>
          <p>评价均分</p>
        </div>
      </div>
      <!-- 宫格看板 -->
      <van-grid :column-num="3" icon-size="50" :border="false" gutter="5px">
        <van-grid-item
          icon="https://s1.ax1x.com/2020/03/25/8jQfQH.png"
          text="用户审核"
          @click="$router.push('/userCheck')"
          :badge="JoinCompanyNum"
        />
        <van-grid-item
          icon="https://s1.ax1x.com/2020/03/25/8jQfQH.png"
          text="报事任务"
          @click="eventList"
          :badge="meMessage.totalUntreatedEvent"
        />
        <van-grid-item
          icon="https://s1.ax1x.com/2020/03/25/8j8X40.png"
          text="任务清单"
          @click="taskList"
        />
        <!-- <van-grid-item
          icon="https://s1.ax1x.com/2020/03/25/8j1dbR.png"
          @click="eventDetail"
          text="点检任务"
          :badge="eventNum"
        />-->
        <van-grid-item
          icon="https://s1.ax1x.com/2020/03/25/8j1dbR.png"
          @click="eventDetail"
          text="点检任务"
          :badge="dianJianNum"
        />
        <!-- <van-grid-item
          icon="https://s1.ax1x.com/2020/03/25/8j8zgU.png"
          text="点检任务分配"
          @click="checkoutEvent"
        />-->
        <van-grid-item icon="https://s1.ax1x.com/2020/03/25/8jG5I1.png" to="top" text="我的排行榜" />
        <van-grid-item
          icon="https://s1.ax1x.com/2020/05/09/YQ5UMT.png"
          @click="dayTask"
          text="工作安排"
        />
        <van-grid-item
          icon="https://s1.ax1x.com/2020/05/09/YQ5UMT.png"
          to="keepWatch"
          text="巡更任务"
          :badge="xunGengNum"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import axios from 'axios'
import { getEventNum } from '@/api/eventApi'
export default {
  data() {
    return {
      title: '季帅帅', //账号人姓名
      meMessage: {}, //我的信息
      status1: '在岗', //当前状态
      status2: '脱岗', //当前状态
      show: false,
      myName: '',
      jurisdiction: '', //是否有权限点击日常分配
      eventNum: 0,
      imgs: '',
      xunGengNum: '',
      dianJianNum: '',
      JoinCompanyNum: '' //用户审核数量
    }
  },
  // 监听路由

  components: {},
  created() {
    this.apiGetEventNum()
    this.zuZhang()
    localStorage.removeItem('userBObj')
  },
  mounted() {
    localStorage.setItem('ciShu', 0)
    this.comparison(localStorage.getItem('openid'))
    this.axios
      .get('/rest/tbEventReport/authRcEvent', {
        params: {
          uid: localStorage.getItem('uid')
        }
      })
      .then(data => {
        this.jurisdiction = data
      })
    // 巡更
    this.keepAxios
      .post(
        this.baseUrl.keepAxios +
          '/app/patrolTask/getPatrolTaskDetailStatusList',
        {
          page: 0,
          pageSize: 9999,
          uid: localStorage.getItem('uid'),
          appStatus: 1 //1：待我处理 2: 我已处理 3：尚未开始 4：已经逾期
        }
      )
      .then(data => {
        console.log(data)
        this.xunGengNum = data.data.data.records
      })
    // 点检
    this.keepAxios
      .post(
        this.baseUrl.spotCheck + '/app/check/getCheckTaskDetailStatusList',
        {
          page: 0,
          pageSize: 9999,
          uid: localStorage.getItem('uid'),
          appStatus: 1 //1：待我处理 2: 我已处理 3：尚未开始 4：已经逾期
        }
      )
      .then(data => {
        console.log(data)
        this.dianJianNum = data.data.data.records
      })
    // 用户审核
    this.keepAxios
      .get(this.baseUrl.checkList + '/rest/appUser/applyJoinCompany', {
        params: {
          page: 0,
          limit: 9999,
          uid: localStorage.getItem('uid'),
          status: 0 //0：待我处理 1: 我已处理
        }
      })
      .then(data => {
        this.JoinCompanyNum = data.data.totalCount
        console.log(data)
      })
  },
  methods: {
    ...mapActions(['setEvent']),
    checkoutEvent() {
      this.setEvent({
        startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        details: '',
        assignerId: '',
        aDevice: [],
        duration: ''
      })
      this.$router.push({
        name: 'checkoutEvent'
      })
    },
    eventDetail() {
      // this.$router.push({
      //   name: 'eventList1'
      // })
      this.$router.push({
        name: 'spotCheck'
      })
    },
    // 是否有权限进入日常分配
    dayTask() {
      if (this.jurisdiction) {
        this.$router.push('/dayTask')
      } else {
        this.$toast('你没有权限~')
      }
    },
    my() {
      this.$router.push('my')
    },
    //当前状态点击改变
    isStatus() {
      this.$router.push('types')
    },
    //当前状态点击改变
    isStatus1() {
      this.show = true
    },
    end() {
      this.axios
        .get('/rest/tbEventTypeConfig/updateToWork', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          this.$toast('上岗成功')
          this.flag = '1'
          localStorage.setItem('shangGang', '1')
          console.log(this.flag)
          window.location.reload()
        })
    },
    dian() {
      this.$toast('即将上线，尽情期待~')
    },
    // 查询登录人下面所有公司/部门
    department() {
      this.axios
        .get('/rest/department/getCompanyByUid', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          console.log(data)
          if (data.code == 50000) {
            this.$toast('系统异常')
          } else {
            this.companyList = data
            this.companyId = data.id
            this.company = data.name
            localStorage.setItem('companyId', data.id)
          }
        })
    },
    //通过openid看看有没有这个人
    comparison(open_id) {
      this.axios
        .get('/rest/wxserver/checkUserOpenId', {
          params: {
            openId: open_id
            // openId: 'o12DOwIrUCqGUisT_mm3clPMbOi0'
          }
        })
        .then(data => {
          if (data == 'null' || data == null) {
            this.$router.push('/login')
            return
          } else {
            localStorage.setItem('uid', data.uid)
            localStorage.setItem('userName', data.vserName)
            localStorage.setItem('deptName', data.deptName)
            localStorage.setItem('deptid', data.deptid)
            this.department()
            this.personal()
            if (
              localStorage.getItem('uid') == null ||
              localStorage.getItem('uid') == 'null' ||
              localStorage.getItem('uid') == '' ||
              localStorage.getItem('uid') == undefined
            ) {
              this.$router.push('/login')
            }
            return
          }
        })
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
    personal() {
      this.axios
        .get('/rest/tbEventReport/getAppIndexData', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          if (data.code == 50000) {
            this.$toast('系统异常')
          } else {
            this.meMessage = data
            this.myName = data.userName.substr(data.userName.length - 2, 2)
            localStorage.setItem('userName', data.userName)
          }
        })
    },
    eventList() {
      localStorage.setItem('action1', 0)
      this.$router.push('/eventList')
    },
    taskList() {
      // localStorage.setItem('action', 0)
      this.$router.push('/taskList')
    },
    async apiGetEventNum() {
      let result = await getEventNum({ personId: localStorage.getItem('uid') })
      this.eventNum = result.num
    },
    zuZhang() {
      this.keepAxios
        .post(
          this.baseUrl.keepAxios +
            '/rest/patrolCheckGroup/getPatrolCheckGroupByParam',
          { groupManage: localStorage.getItem('uid') }
        )
        .then(data => {
          console.log(data)
          if (data.data.data.rows.length == 0) {
            localStorage.setItem('zu', false)
            localStorage.setItem('zu1', false)
          } else {
            if (data.data.data.rows[0].groupType == 1) {
              localStorage.setItem('zu', true)
            } else if (data.data.data.rows[0].groupType == 2) {
              localStorage.setItem('zu1', true)
            }
          }
        })
    }
  }
}
</script>
<style lang='less' scoped>
.Home {
  letter-spacing: 1px;
  min-height: 92.5vh;
  background: #f5f5f5;
  .con {
    .yuan {
      position: absolute;
      left: 80px;
      top: 260px;
    }
    //个人信息栏
    .tlt {
      .myName {
        width: 1.5rem;
        height: 1.5rem;
        background: #a68e44;
        color: #fff;
        border-radius: 50%;
        font-size: 20px;
      }
      background: #fff;
      padding: 10px 20px;
      color: #000;
      font-size: 13px;
      .van-popup--center {
        border-radius: 15px;
      }
      .popup {
        padding: 50px;
        .btn {
          padding-top: 20px;
          padding-bottom: 10px;
          .van-button--normal {
            margin: 0 5px;
            width: 100px;
          }
        }
      }
      img {
        width: 50px;
        height: 50px;
      }
      .conter {
        margin-left: -30px;
        p:nth-child(1) {
          padding-bottom: 10px;
        }
      }
      .conter1 {
        margin-right: 180px;
        p:nth-child(1) {
          padding-bottom: 10px;
        }
      }
      .right {
        padding-left: 50px;
        p:nth-child(1) {
          padding-bottom: 10px;
        }
        p:nth-child(2) {
          border: 2px solid #000;
          font-weight: 600;
          text-align: center;
          border-radius: 4px;
        }
      }
    }
    //累计报事信息
    .upMatter {
      background: #fff;
      margin: 20px 10px;
      padding: 10px;
      border-radius: 5px;
      position: relative;
      span {
        font-size: 10px;
        position: absolute;
        left: 0px;
        top: 0px;
        background: #a88f45;
        color: #fff;
        border-radius: 5px 0 5px 0;
      }
      .one {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .two {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .three {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .four {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .five {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
    }
    // 本月报事信息
    .monthMatter {
      background: #fff;
      margin: 10px 10px 20px 10px;
      padding: 10px;
      border-radius: 5px;
      position: relative;
      span {
        font-size: 10px;
        position: absolute;
        left: 0px;
        top: 0px;
        background: #a88f45;
        color: #fff;
        border-radius: 5px 0 5px 0;
      }
      .one {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .two {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .three {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .four {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
      .five {
        p:nth-child(1) {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
      }
    }
  }
}
</style>
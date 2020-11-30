<template>
  <div class="box">
    <van-nav-bar title="无任务签到" @click-left="onClickLeft" left-arrow :fixed="true">
      <template #right>
        <van-icon name="filter-o" size="18" @click="isShow" />
      </template>
    </van-nav-bar>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="top" :style="{ height: '100%' }">
      <van-cell-group class="flex">
        <van-field v-model="time" placeholder="开始时间" readonly @click="kaiShi" />-
        <van-field v-model="time1" placeholder="结束时间" readonly @click="jieShu" />
      </van-cell-group>
      <!-- 时间选择 -->
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择开始时间"
        :min-date="minDate"
        :max-date="maxDate"
        v-if="startTime"
        @confirm="okTime"
        @cancel="startTime = false"
      />
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择结束时间"
        :min-date="minDate1"
        :max-date="maxDate"
        v-if="endTime"
        @confirm="overTime1"
        @cancel="endTime = false"
      />
      <!-- 按钮 -->
      <div class="btn1 flex">
        <van-button color="#999" @click="show = false">取消</van-button>
        <van-button color="#a48f36" @click="end">确认</van-button>
      </div>
    </van-popup>
    <!-- 任务详情 -->
    <div class="con">
      <Mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="mescroll">
        <div class="tab">
          <div class="flex title1">
            <span>位置</span>
            <span>设备名称</span>
            <span>签到时间</span>
          </div>
          <div class="content" v-for="(item,i) in list" :key="i">
            <div class="black flex_a">
              <span
                class="jianZhu yihang"
                @click="tiShi(item.buildingName,item.floorName)"
              >{{item.buildingName}}/{{item.floorName}}</span>
              <span
                @click="tiShi(item.patrolPointName)"
                class="building yihang"
              >{{item.patrolPointName}}</span>
              <span v-if="item.createTime == null" class="time">- -</span>
              <span v-else class="time">{{item.createTime|timeFilter}}</span>
            </div>
            <div class="keep flex_r">
              <span class="renLianRed" v-if="item.faceCheck == '3'">人脸核验</span>
              <span class="renLianGreen" v-else-if="item.faceCheck == '2'">人脸核验</span>
              <span v-else-if="item.faceCheck == '1'">人脸核验</span>
            </div>
          </div>
        </div>
      </Mescroll-vue>
    </div>
    <!-- 扫描完成后的弹出窗 -->
    <div class="num5000">
      <van-popup v-model="show3" style="background:pink">
        <div>
          <p>未检测到巡更点</p>
          <p>请确认在巡更点的有效范围内</p>
        </div>
        <div class="num5000Btn">
          <!-- <van-button color="#999" @click="up">故障上报</van-button> -->
          <van-button color="#a48f36" @click="show3 = false">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 无效巡更点 -->
    <div class="num5000">
      <van-popup v-model="show1" style="background:pink">
        <div>
          <p>无效的巡更点</p>
          <p>没有检测到本次任务中的巡更点</p>
        </div>
        <div class="num5000Btn">
          <!-- <van-button color="#999" @click="up">故障上报</van-button> -->
          <van-button color="#a48f36" @click="show1 = false">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 签到成功 -->
    <div class="num500010">
      <van-popup v-model="show2" style="background:rgb(225,252,181)">
        <div>
          <p>签到成功</p>
          <p class="hang flex">
            <span>巡更位置：</span>
            <span>{{weiZhiName}}</span>
          </p>
          <p class="hang flex">
            <span>巡更点：</span>
            <span>{{xunGengDian}}</span>
          </p>
        </div>
        <div class="num5000Btn">
          <van-button color="#a48f36" @click="over">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 签到重复 -->
    <!-- <div class="num500010">
      <van-popup v-model="show3" style="background:pink">
        <div>
          <p>签到重复</p>
          <p class="hang flex">
            <span>巡更位置：</span>
            <span>{{weiZhiName}}</span>
          </p>
          <p class="hang flex">
            <span>巡更点：</span>
            <span>{{xunGengDian}}</span>
          </p>
          <p class="hang flex">
            <span>剩余完成时间：</span>
            <span>{{overTime| shengYuTime(nowTime)}}</span>
          </p>
        </div>
        <div class="num5000Btn">
          <van-button color="#a48f36" @click="over1">确认</van-button>
        </div>
      </van-popup>
    </div>-->
    <!-- ---------------------------- -->
    <div class="btn">
      <van-button type="primary" size="large" color="#a48f36" @click="sign">签到</van-button>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
import { WXsao, getvl } from '../../common/wx_config' //跳转小程序页面
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  // 离开路由之前执行的函数,让ios可以下拉
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'keepWatchDetails') {
      this.mescroll.setBounce(true)
    }
    next()
  },
  data() {
    return {
      zi: '出来吧大哥',
      show: false, //筛选框
      time: null, //开始时间
      time1: null, //结束时间
      minDate: new Date(1970, 1, 1),
      minDate1: new Date(),
      maxDate: new Date(3000, 10, 1),
      currentDate: new Date(),
      startTime: false, //筛选开始时间
      endTime: false, //筛选结束时间
      flag: false,
      taskId: '',
      mescrollUp: {
        isBounce: false, //是否允许ios的bounce回弹;默认true,允许回弹
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          warpId: null,
          src: 'http://www.mescroll.com/img/mescroll-totop.png',
          html: null,
          offset: 1000,
          warpClass: 'mescroll-totop',
          showClass: 'mescroll-fade-in',
          hideClass: 'mescroll-fade-out',
          duration: 300,
          supportTap: false,
          btnClick: null
        }
      },
      endNum: {},
      list: [], //巡更点详情list
      qianDao: {
        beaconsParams: [], //扫描到的beacons
        uid: localStorage.getItem('uid')
      },
      show: false, //参数不能为空
      show1: false, //无效巡更点
      show2: false, //签到成功
      show3: false, //签到成功
      overTime: '', //巡更任务结束时间
      nowTime: new Date(), //当前时间
      weiZhiName: '',
      xunGengDian: ''
    }
  },
  mounted() {
    let obj = getvl('event')
    localStorage.setItem('time', this.$route.query.time)
    this.overTime = localStorage.getItem('time')
    localStorage.setItem('keepWatchId', this.$route.query.id)
    this.taskId = localStorage.getItem('keepWatchId')
    if (obj !== '') {
      let obj1 = JSON.parse(decodeURIComponent(obj))
      console.log('下面是obj1')
      this.taskId = obj1.taskId
      console.log(obj1)
      this.qianDao.beaconsParams = obj1.beacons
      this.qianDao.taskDetailId = obj1.taskId
      this.overTime = obj1.time
      localStorage.setItem('keepWatchId', obj1.taskId)
      console.log('下面是qianDao')
      console.log(this.qianDao)

      this.beacons(this.qianDao)
    }
  },
  methods: {
    p(s) {
      return s < 10 ? '0' + s : s
    },
    onClickLeft() {
      this.$router.push('/keepWatch')
    },
    // 开始时间选择
    kaiShi() {
      this.startTime = true
      this.endTime = false
    },
    // 结束时间选择
    jieShu() {
      this.startTime = false
      this.endTime = true
    },
    // 确定开始时间
    okTime(val) {
      let time = new Date(val)
      this.startTime = false
      this.endTime = false
      this.time =
        time.getFullYear() +
        '-' +
        this.p(time.getMonth() + 1) +
        '-' +
        this.p(time.getDate()) +
        ' ' +
        this.p(time.getHours()) +
        ':' +
        this.p(time.getMinutes()) +
        ':00'
    },
    // 确定结束时间
    overTime1(val) {
      let time = new Date(val)
      this.startTime = false
      this.endTime = false
      this.time1 =
        time.getFullYear() +
        '-' +
        this.p(time.getMonth() + 1) +
        '-' +
        this.p(time.getDate()) +
        ' ' +
        this.p(time.getHours()) +
        ':' +
        this.p(time.getMinutes()) +
        ':59'
    },
    // 筛选确定
    end() {
      console.log('aaa')
      console.log(this.time)
      console.log(this.time1)
      this.mescroll.resetUpScroll()
    },
    isShow() {
      this.show = true
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    over() {
      this.show2 = false
      this.mescroll.resetUpScroll()
    },
    over1() {
      this.show3 = false
      this.mescroll.resetUpScroll()
    },
    upCallback(page, mescroll) {
      var pageNum = page.num - 1
      this.keepAxios
        .post(this.baseUrl.keepAxios + '/app/patrolTask/noTaskSignList', {
          uid: localStorage.getItem('uid'),
          page: pageNum,
          pageSize: 50,
          startTime: this.time,
          endTime: this.time1
        })
        .then(data => {
          this.show = false
          console.log(data)
          this.endNum = data.data.data.rows
          let arr = data.data.data.rows
          // ----------------------------------------------
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            // 请求的列表数据
            this.list = []
          }
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true)
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    onClickLeft() {
      this.$router.push('/keepWatch')
    },
    beacons(obj) {
      console.log('调用接口的Obj')
      console.log(obj)
      this.keepAxios
        .post(this.baseUrl.keepAxios + '/app/patrolTask/noTaskSign', obj)
        .then(data => {
          console.log('这个是扫描后掉的接口')
          console.log(data)
          // 5005没有巡更点，5000签到失败
          if (data.data.data.status == '50005') {
            console.log('这里是扫描失败或者没扫到')
            this.show3 = true
            this.show1 = false
            this.show2 = false
          } else if (data.data.data.status == '50000') {
            this.$toast('签到失败')
            this.show3 = false
            this.show1 = true
            this.show2 = false
          } else if (
            data.data.msg == '无任务签到成功' &&
            data.data.code == '20000'
          ) {
            this.$toast('签到成功')
            this.xunGengDian = data.data.data.patrolName
            if (data.data.data.floorName == 'null') {
              this.weiZhiName = data.data.data.buildingName
            } else {
              this.weiZhiName =
                data.data.data.buildingName + '/' + data.data.data.floorName
            }
            this.show3 = false
            this.show1 = false
            this.show2 = true
          }
        })
    },
    // 故障上报
    up() {
      console.log('我是故障上报')
      this.$router.push({
        path: '/fault',
        query: {
          taskId: this.taskId
        }
      })
    },
    // 跳转小程序
    sign() {
      console.log(this.taskId)
      WXsao(this.taskId, this.overTime)
    },
    // isShow() {
    //   this.show = true
    // },
    tiShi(val, val1) {
      if (val1 == null) {
        this.$toast(val)
      } else {
        this.$toast(val + '/' + val1)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  /deep/.van-field__control:read-only {
    text-align: center;
  }
  .btn1 {
    padding: 50px;
    .van-button--normal {
      width: 100px;
    }
  }
  .con {
    padding-bottom: 70px;
    padding-top: 50px;
    .title {
      position: fixed;
      top: 45px;
      width: 100%;
      padding: 10px;
      color: black;
      font-size: 13px;
      background: white;
    }
    .tab {
      padding-top: 15px;
      .title1 {
        padding-right: 55px;
        span {
          width: 33%;
          display: block;
          text-align: center;
        }
        color: black;
        font-size: 14px;
      }
      .content {
        .red {
          font-size: 13px;
          color: red;
          .jianZhu {
            width: 25%;
            text-align: center;
          }
          .time {
            width: 25%;
            text-align: center;
          }
        }
        .black {
          font-size: 13px;
          color: black;
          border-bottom: 2px solid #f1f1f1;
          padding: 5px 0;
          .jianZhu {
            width: 18%;
            text-align: left;
          }
          .time {
            width: 135px;
            text-align: center;
          }
        }
        .keep {
          color: white;
          .renLianRed {
            background: red;
          }
          .renLianGreen {
            background: rgb(109, 177, 0);
          }
          span {
            padding: 2px 5px;
            border-radius: 5px;
            background: #999;
            margin: 5px;
          }
        }
        .building {
          width: 20%;
          text-align: left;
          padding-left: 15px;
        }
      }
    }
  }
  .num5000 {
    font-size: 15px;
    color: black;
    text-align: center;
    .van-popup--center {
      width: 330px;
    }
    p {
      padding: 25px 0;
    }
    p:nth-child(1) {
      font-size: 20px;
    }
    .num5000Btn {
      padding-top: 100px;
      padding-bottom: 30px;
      .van-button--normal {
        margin: 0 30px;
        width: 240px;
      }
    }
  }
  .num500010 {
    font-size: 15px;
    color: black;
    text-align: center;
    .van-popup--center {
      width: 330px;
    }
    p {
      padding: 25px 0;
    }
    p:nth-child(1) {
      font-size: 20px;
    }
    .hang {
      width: 300px;
      padding: 10px 20px;
    }
    .num5000Btn {
      padding-top: 100px;
      padding-bottom: 30px;
      .van-button--normal {
        margin: 0 30px;
        width: 240px;
      }
    }
  }
  .btn {
    padding: 15px;
    position: fixed;
    bottom: 0px;
    background: white;
    .van-button--large {
      width: 345px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
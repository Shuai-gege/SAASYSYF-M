<template>
  <div class="box">
    <van-nav-bar title="巡更任务详情" @click-left="onClickLeft" left-arrow :fixed="true"></van-nav-bar>
    <!-- 任务详情 -->
    <div class="con">
      <div class="title flex">
        <div class="flex">
          <span>未完成/总数</span>&nbsp;&nbsp;&nbsp;
          <span>
            <i style="color:red">{{endNum.deviceIdsCount}}</i>/
            <i>{{endNum.deviceIdsNoCount}}</i>
          </span>
        </div>
        <span>{{endNum.deviceName}}</span>
      </div>
      <Mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="mescroll">
        <div class="tab">
          <div class="flex title1">
            <span>位置</span>
            <span>设备名称</span>
            <span>点检时间</span>
          </div>
          <div class="content" v-for="(item,i) in list" :key="i">
            <!-- 未完成 -->
            <div class="red flex_a" v-if="item.status == '1'">
              <span
                class="jianZhu yihang"
                @click="tiShi(item.buildingName,item.floorName)"
              >{{item.buildingName}}/{{item.floorName}}</span>
              <span @click="tiShi(item.deviceName)" class="building yihang">{{item.deviceName}}</span>
              <span v-if="item.signInTime == null" class="time">- -</span>
              <span v-else class="time">{{item.signInTime}}</span>
            </div>
            <!-- 已完成 -->
            <div class="black flex_a" v-else>
              <span
                class="jianZhu yihang"
                @click="tiShi(item.buildingName,item.floorName)"
              >{{item.buildingName}}/{{item.floorName}}</span>
              <span @click="tiShi(item.deviceName)" class="building yihang">{{item.deviceName}}</span>
              <span v-if="item.signInTime == null" class="time">- -</span>
              <span v-else class="time">{{item.signInTime|timeFilter}}</span>
            </div>
            <div class="keep flex_r">
              <a @click="checkDetails(item.deviceId)" v-if="item.status == '2'">查看详情</a>
              <!-- 查看详情 -->
              <span class="renLianRed" v-if="item.deviceResult == '0'">设备状态</span>
              <span class="renLianGreen" v-else-if="item.deviceResult == '1'">设备状态</span>
              <span v-else-if="item.deviceResult == null">设备状态</span>
              <!-- <span>设备状态</span> -->
              <span class="renLianRed" v-if="item.faceCheck == '3'">人脸核验</span>
              <span class="renLianGreen" v-else-if="item.faceCheck == '2'">人脸核验</span>
              <span v-else-if="item.faceCheck == '1'">人脸核验</span>
              <!-- 位置核验 -->
              <span class="renLianRed" v-if="item.patrolPointCheck == '3'">位置核验</span>
              <span class="renLianGreen" v-else-if="item.patrolPointCheck == '2'">位置核验</span>
              <span v-else-if="item.patrolPointCheck == '1'">位置核验</span>

              <!-- <span>布置侦测</span> -->
            </div>
          </div>
        </div>
      </Mescroll-vue>
    </div>
    <!-- 扫描完成后的弹出窗 -->
    <div class="num5000">
      <van-popup v-model="show" style="background:pink">
        <div>
          <p>未检测到巡更点</p>
          <p>请确认在巡更点的有效范围内</p>
        </div>
        <div class="num5000Btn flex">
          <van-button color="#999" @click="up">故障上报</van-button>
          <van-button color="#a48f36" @click="show = false">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 无效巡更点 -->
    <div class="num5000">
      <van-popup v-model="show1" style="background:pink">
        <div>
          <p>无效巡更点巡更点</p>
          <p>没有检测到本次任务中的巡更点</p>
        </div>
        <div class="num5000Btn flex">
          <van-button color="#999" @click="up">故障上报</van-button>
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
            <span>巡更点：</span>
            <span>{{weiZhiName}}</span>
          </p>
          <p class="hang flex">
            <span>剩余巡更点：</span>
            <span>{{endNum.patrolPointIdsNoCount-1}}</span>
          </p>
          <p class="hang flex">
            <span>剩余完成时间：</span>
            <span>{{overTime| shengYuTime(nowTime)}}</span>
          </p>
        </div>
        <div class="num5000Btn">
          <van-button color="#a48f36" @click="over">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- ---------------------------- -->
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
import { getvl } from '../../common/wx_config' //跳转小程序页面
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
        uid: localStorage.getItem('uid'),
        taskDetailId: this.taskId
      },
      show: false, //参数不能为空
      show1: false, //无效巡更点
      show2: false, //签到巡更点成功
      overTime: '', //巡更任务结束时间
      nowTime: new Date(), //当前时间
      weiZhiName: ''
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
      this.taskId = obj1.taskId
      this.qianDao.beaconsParams = obj1.beacons
      this.qianDao.taskDetailId = obj1.taskId
      this.overTime = obj1.time
      localStorage.setItem('keepWatchId', obj1.taskId)
      this.beacons(this.qianDao)
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    over() {
      this.show2 = false
      this.mescroll.resetUpScroll()
    },
    upCallback(page, mescroll) {
      var pageNum = page.num - 1
      this.keepAxios
        .post(
          this.baseUrl.spotCheck + '/app/check/getCheckScanSignInByDetailId',
          {
            uid: localStorage.getItem('uid'),
            taskDetailId: this.taskId,
            page: pageNum,
            pageSize: 50
          }
        )
        .then(data => {
          console.log(data)
          this.endNum = data.data.data.rows
          let arr = data.data.data.rows.checkScanSignInDetailList
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
      this.$router.push('/spotCheck')
    },
    beacons(obj) {
      this.keepAxios
        .post(this.baseUrl.keepAxios + '/app/patrolTask/patrolPointSignIn', obj)
        .then(data => {
          this.weiZhiName =
            data.data.data.buildingName + '/' + data.data.data.floorName
          if (
            data.data.code == '5000' ||
            data.data.code == '5001' ||
            data.data.code == '5002' ||
            data.data.code == '5006' ||
            data.data.code == '5007' ||
            data.data.code == '5003' ||
            data.data.code == '5004'
          ) {
            this.show = true
            this.show1 = false
          } else if (data.data.code == '5005') {
            this.show1 = true
            this.show = false
          } else if (data.data.code == '5010') {
            this.show2 = true
          }
        })
    },
    // 故障上报
    up() {
      this.$router.push({
        path: '/fault',
        query: {
          taskId: this.taskId
        }
      })
    },
    isShow() {
      this.show = true
    },
    tiShi(val, val1) {
      if (val1 == null) {
        this.$toast(val)
      } else {
        this.$toast(val + '/' + val1)
      }
    },
    // 查看详细
    checkDetails(deviceId) {
      console.log(deviceId)
      this.keepAxios
        .get(this.baseUrl.spotCheck + '/rest/deviceInfo/getDeviceById', {
          params: {
            deviceId: deviceId,
            taskDetailId: localStorage.getItem('taskDetailId')
          }
        })
        .then(data => {
          if (data.data.code == 20000) {
            if (data.data.data.remark != null) {
              this.$router.push({
                name: 'spotCheckTask1',
                params: {
                  spotCheck: data.data.data.inspectionItemBeans,
                  weiZhi:
                    data.data.data.buildingName +
                    '/' +
                    data.data.data.floorName,
                  type: data.data.data.typeName,
                  spotName: data.data.data.deviceName,
                  deviceId: localStorage.getItem('deviceId'),
                  taskDetailId: localStorage.getItem('taskDetailId'),
                  radio: data.data.data.deviceResult,
                  remark: data.data.data.remark,
                  imgUrl: data.data.data.imgUrl
                }
              })
            }
          } else if (data.data.code == 50001) {
            this.$toast(data.data.msg)
          } else if (data.data.code == 50002) {
            this.$toast(data.data.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  .con {
    .mescroll {
      position: fixed;
      top: 75px;
      bottom: 0px;
      height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
    }
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
      height: 100%;
      .title1 {
        span {
          width: 33%;
          display: block;
          text-align: center;
        }
        color: black;
        font-size: 14px;
      }
      .content {
        padding: 5px 0;
        border-bottom: 1px solid #f1f1f1;
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
          .jianZhu {
            width: 32%;
            text-align: center;
          }
          .time {
            width: 32%;
            text-align: center;
          }
        }
        .keep {
          a {
            position: fixed;
            left: 54px;
            color: blue;
          }
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
          width: 15%;
          text-align: center;
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
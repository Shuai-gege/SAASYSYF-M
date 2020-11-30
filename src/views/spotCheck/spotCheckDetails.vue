<template>
  <div class="box">
    <van-nav-bar title="点检任务详情" @click-left="onClickLeft" left-arrow :fixed="true"></van-nav-bar>
    <!-- 任务详情 -->
    <div class="con">
      <div class="title flex">
        <div class="flex">
          <span>未完成/总数</span>&nbsp;&nbsp;&nbsp;
          <span>
            <i style="color:red">{{endNum.deviceIdsNoCount}}</i>/
            <i>{{zongShu}}</i>
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
              <a @click="checkDetails" v-if="item.status == '2'">查看详情</a>
              <!-- 查看已经检查过所填的参数 -->
              <span class="renLianRed" v-if="item.deviceResult == '1'">设备状态</span>
              <span class="renLianGreen" v-else-if="item.deviceResult == '0'">设备状态</span>
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
      <van-popup v-model="show" style="background:pink" :close-on-click-overlay="false">
        <div>
          <p>未检测到巡更点</p>
          <p>请确认在巡更点的有效范围内</p>
        </div>
        <div class="num5000Btn flex">
          <van-button color="#999" @click="up">故障上报</van-button>
          <van-button color="#a48f36" @click="over2">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 无效巡更点 -->
    <div class="num5000">
      <van-popup v-model="show1" style="background:pink" :close-on-click-overlay="false">
        <div>
          <p>位置核验失败</p>
          <p>没有检测到本次任务中的巡更点</p>
        </div>
        <div class="num5000Btn flex">
          <van-button color="#999" @click="up">故障上报</van-button>
          <van-button color="#a48f36" @click="over3">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 签到成功 -->
    <div class="num500010">
      <van-popup
        v-model="show2"
        style="background:rgb(225,252,181)"
        :close-on-click-overlay="false"
      >
        <div>
          <p>位置核验成功</p>
          <p class="hang flex">
            <span>设备名：</span>
            <span>{{deviceName}}</span>
          </p>
          <p class="hang flex">
            <span>设备名称：</span>
            <span>{{sheBeiName}}</span>
          </p>
          <p class="hang flex">
            <span>剩余巡更点：</span>
            <span>{{endNum.deviceIdsNoCount}}</span>
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
    <!-- 签到重复 -->
    <div class="num500010">
      <van-popup v-model="show3" style="background:pink" :close-on-click-overlay="false">
        <div>
          <p>签到重复</p>
          <p class="hang flex">
            <span>巡更位置：</span>
            <span>{{weiZhiName}}</span>
          </p>
          <p class="hang flex">
            <span>绑定的巡更点：</span>
            <span>{{xunGengDian}}</span>
          </p>
          <p class="hang flex">
            <span>设备名称：</span>
            <span>{{sheBeiName}}</span>
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
    </div>
    <!-- 人脸识别 -->
    <div class="num500010">
      <van-popup
        v-model="show4"
        style="background:rgb(225,252,181)"
        :close-on-click-overlay="false"
      >
        <div>
          <p>人脸识别</p>
          <p class="hang flex">
            <span>设备名称</span>
            <span>{{deviceName}}</span>
          </p>
          <p class="hang flex">
            <span>剩余完成时间：</span>
            <span>{{overTime| shengYuTime(nowTime)}}</span>
          </p>
        </div>
        <div class="num5000Btn">
          <van-button color="#a48f36" @click="paiZhao">本次签到需要人脸核验</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 人脸识别成功 -->
    <div class="num500010">
      <van-popup
        v-model="show5"
        style="background:rgb(225,252,181)"
        :close-on-click-overlay="false"
      >
        <div>
          <p>人脸核验成功</p>
          <p class="hang flex">
            <span>剩余完成时间：</span>
            <span>{{overTime| shengYuTime(nowTime)}}</span>
          </p>
        </div>
        <div class="num5000Btn">
          <van-button color="#a48f36" @click="lose">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 人脸识别失败 -->
    <div class="num500010">
      <van-popup
        v-model="show6"
        style="background:rgb(225,252,181)"
        :close-on-click-overlay="false"
      >
        <div>
          <p>人脸核验失败</p>
          <p class="hang flex">
            <span>剩余完成时间：</span>
            <span>{{overTime| shengYuTime(nowTime)}}</span>
          </p>
        </div>
        <div class="num5000Btn flex">
          <van-button color="#a48f36" @click="pai1">重试</van-button>
          <van-button color="#a48f36" @click="lose1">确认</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 位置核验 -->
    <div class="num500010">
      <van-popup
        v-model="show7"
        style="background:rgb(225,252,181)"
        :close-on-click-overlay="false"
      >
        <div>
          <p>位置核验</p>
          <p class="hang flex">
            <span>设备名称</span>
            <span>{{deviceName}}</span>
          </p>
          <p class="hang flex">
            <span>剩余完成时间：</span>
            <span>{{overTime| shengYuTime(nowTime)}}</span>
          </p>
        </div>
        <div class="num5000Btn">
          <van-button color="#a48f36" @click="sign">开始扫描</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 第二次扫描进去之前的提示 -->
    <div class="num500010">
      <van-popup
        v-model="show8"
        style="background:rgb(225,252,181)"
        :close-on-click-overlay="false"
      >
        <div>
          <p>点检重复</p>
          <p class="hang flex">
            <span>设备名称</span>
            <span>{{deviceName}}</span>
          </p>
          <p>该设备已完成点检，是否修改之前的信息。</p>
        </div>
        <div class="num5000Btn flex">
          <van-button color="#a48f36" @click="alter">修改</van-button>
          <van-button color="#a48f36" @click="show8 = false">取消</van-button>
        </div>
      </van-popup>
    </div>
    <!-- ---------------------------- -->
    <div class="btn">
      <van-button type="primary" size="large" color="#a48f36" @click="onScanCode">扫描二维码</van-button>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
import { WXsao1, getvl, base, WXScanQRCode } from '../../common/wx_config' //跳转小程序页面
import wx from 'weixin-js-sdk'
import { WXConfigApi } from '@/api/wxApi'
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
      show3: false, //签到巡更点重复
      show4: false, //人脸识别
      show5: false, //人脸识别成功
      show6: false, //人脸识别失败
      show7: false, //位置核验
      show8: false, //第二次扫描进去之前的提示
      overTime: '', //巡更任务结束时间
      nowTime: new Date(), //当前时间
      weiZhiName: '',
      xunGengDian: '',
      zongShu: '', //总巡更点数
      taskIds: '',
      deviceName: '', //设备名
      faceCheck: '', //人脸核验
      patrolPointCheck: '0', //位置核验
      weiZhiId: '0',
      sheBeiName: '',
      obj: ''
    }
  },
  mounted() {
    var url0 = unescape(localStorage.getItem('baseUrl'))
    this.url = url0.replace('https', 'http')

    this.deviceName = localStorage.getItem('deviceName')
    this.faceCheck = this.$route.query.faceCheck
    this.patrolPointCheck = this.$route.query.patrolPointCheck

    // if (
    //   this.deviceName != undefined ||
    //   this.patrolPointCheck != undefined ||
    //   this.faceCheck != undefined
    // ) {
    //   console.log('我进来直接走这里')
    //   this.show2 = true
    //   this.deviceName = this.$route.query.deviceName
    // }

    if (
      this.faceCheck != 0 &&
      this.faceCheck != 'undefined' &&
      this.faceCheck != null
    ) {
      this.show2 = false
      this.show4 = true
      this.show5 = false
      this.show6 = false
    } else if (
      this.patrolPointCheck != 0 &&
      this.patrolPointCheck != 'undefined' &&
      this.patrolPointCheck != null
    ) {
      console.log('走了吗')
      this.show2 = false
      this.show4 = false
      this.show5 = false
      this.show6 = false
      this.show7 = true
    }

    this.taskIds = localStorage.getItem('taskDetailId')
    this.WXInit()
    this.obj = getvl('event')
    this.overTime = localStorage.getItem('time')
    localStorage.setItem('keepWatchId', this.$route.query.id)
    this.taskId = localStorage.getItem('keepWatchId')
    if (sessionStorage.getItem('beacons') == 'false') {
      this.obj = ''
    } else {
      if (this.obj !== '') {
        let obj1 = JSON.parse(decodeURIComponent(this.obj))
        this.taskId = obj1.taskId
        this.qianDao.beaconsParams = obj1.beacons
        this.qianDao.taskDetailId = obj1.taskId
        this.qianDao.deviceId = obj1.deviceId
        this.overTime = obj1.time
        localStorage.setItem('keepWatchId', obj1.taskId)
        console.log(obj1)
        console.log('下面是qianDao')
        console.log(this.qianDao)
        this.beacons(this.qianDao)
      }
    }
  },
  methods: {
    WXInitConfig(WxToken) {
      wx.config({
        debug: false,
        appId: WxToken.appId,
        timestamp: WxToken.timestamp,
        nonceStr: WxToken.nonceStr,
        signature: WxToken.signature,
        jsApiList: ['scanQRCode', 'chooseImage', 'getLocalImgData']
      })
      // error callback
      wx.error(function(result) {
        console.log('WX INIT ERROR:', result, 'color: red; font-size: 20px')
      })
      // ready callback
      wx.ready(function() {})
    },
    WXInit() {
      let WxToken = {}
      WXConfigApi(window.location.href.split('#')[0])
        // url: window.location.href.split('#')[0],
        .then(response => {
          WxToken = response
          this.WXInitConfig(WxToken)
        })
        .catch(error => {
          console.log(error)
        })
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
    //未扫描到巡更点
    over2() {
      this.show = false
      this.mescroll.resetUpScroll()
    },
    //无效巡更点
    over3() {
      this.show1 = false
      this.mescroll.resetUpScroll()
    },
    upCallback(page, mescroll) {
      var pageNum = page.num - 1
      this.keepAxios
        .post(
          this.baseUrl.spotCheck + '/app/check/getCheckScanSignInByDetailId',
          {
            uid: localStorage.getItem('uid'),
            taskDetailId: this.taskIds,
            page: pageNum,
            pageSize: 50
          }
        )
        .then(data => {
          console.log(data)
          this.zongShu = data.data.data.records
          this.endNum = data.data.data.rows
          let arr = data.data.data.rows.checkScanSignInDetailList
          arr.forEach(item => {
            if (item.patrolPointId == this.weiZhiId) {
              this.sheBeiName = item.deviceName
            }
          })
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
        .post(this.baseUrl.spotCheck + '/app/check/checkSignIn', obj)
        .then(data => {
          console.log(data)
          sessionStorage.setItem('beacons', true)
          if (data.data.code == '50000') {
            this.$toast(data.data.msg)
          } else if (
            data.data.code == '5004' ||
            data.data.code == '5000' ||
            data.data.code == '5001' ||
            data.data.code == '5002' ||
            data.data.code == '5006' ||
            data.data.code == '5007' ||
            data.data.code == '5003'
          ) {
            this.show = true
            this.show1 = false
            this.show2 = false
            this.show3 = false
            this.show4 = false
          } else if (data.data.code == '5005') {
            this.show1 = true
            this.show2 = false
            this.show = false
            this.show3 = false
            this.show4 = false
          }
          // if (
          //   data.data.code == '5010' &&
          //   data.data.data.faceCheck == '1'
          // ) {
          //   this.weiZhiName =
          //     data.data.data.buildingName + '/' + data.data.data.floorName
          //   this.xunGengDian = data.data.data.patrolName
          //   this.patrolPointId = data.data.data.id
          //   this.show = false
          //   this.show1 = false
          //   this.show2 = false
          //   this.show3 = false
          //   this.show4 = true
          // } else
          else if (data.data.code == '5010') {
            this.xunGengDian = data.data.data.patrolName
            this.weiZhiName =
              data.data.data.buildingName + '/' + data.data.data.floorName
            this.show = false
            this.show1 = false
            this.show2 = true
            this.show3 = false
            this.show4 = false
            this.weiZhiId = data.data.data.id
          } else if (data.data.code == '5008') {
            this.weiZhiName =
              data.data.data.buildingName + '/' + data.data.data.floorName
            this.xunGengDian = data.data.data.patrolName
            this.show = false
            this.show1 = false
            this.show2 = false
            this.show3 = true
            this.show4 = false
            this.weiZhiId = data.data.data.id
          }
          this.sheBeiName = data.data.data.patrolName
        })
    },
    // 故障上报
    up() {
      console.log('我是故障上报')
      this.$router.push({
        path: '/spotFault',
        query: {
          taskId: this.taskId
        }
      })
    },
    // 拉起相机
    paiZhao() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          console.log(res)
          let localIds = res.localIds[0]
          wx.getLocalImgData({
            localId: localIds,
            success: res => {
              this.keepAxios
                .post(this.baseUrl.spotCheck + '/app/check/faceSignIn', {
                  deviceId: localStorage.getItem('deviceId'),
                  taskDetailId: this.taskId,
                  uid: localStorage.getItem('uid'),
                  base64: 'data:image/png;base64,' + res.localData
                })
                .then(data => {
                  console.log(data)
                  this.show4 = false
                  this.$toast(data.data.msg)
                  this.mescroll.resetUpScroll()
                  if (data.data.code == 2000) {
                    this.show5 = true
                    this.show6 = false
                    this.mescroll.resetUpScroll()
                  } else {
                    this.show5 = false
                    this.show6 = true
                  }
                })
            }
          })
        }
      })
    },
    pai1() {
      if (localStorage.getItem('ciShu') == '1') {
        this.$toast('人脸核验次数上限')
      } else {
        localStorage.setItem('ciShu', Number(localStorage.getItem('ciShu')) + 1)
        this.paiZhao()
      }
    },
    // 扫描二维码
    onScanCode(item) {
      sessionStorage.setItem('beacons', true)
      WXScanQRCode(result => {
        this.keepAxios
          .get(this.baseUrl.spotCheck + '/rest/deviceInfo/getDeviceById', {
            params: { deviceId: result.resultStr, taskDetailId: this.taskIds }
          })
          .then(data => {
            if (data.data.code == 20000) {
              if (data.data.data.remark == null) {
                this.$router.push({
                  name: 'spotCheckTask',
                  params: {
                    spotCheck: data.data.data.inspectionItemBeans,
                    weiZhi:
                      data.data.data.buildingName +
                      '/' +
                      data.data.data.floorName,
                    type: data.data.data.typeName,
                    spotName: data.data.data.deviceName,
                    deviceId: result.resultStr,
                    taskDetailId: this.taskIds,
                    radio: data.data.data.deviceResult,
                    remark: data.data.data.remark,
                    imgUrl: data.data.data.imgUrl
                  }
                })
                localStorage.setItem('deviceId', result.resultStr)
              } else {
                this.show8 = true
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
      })
    },
    //
    alter() {
      this.keepAxios
        .get(this.baseUrl.spotCheck + '/rest/deviceInfo/getDeviceById', {
          params: {
            deviceId: localStorage.getItem('deviceId'),
            taskDetailId: this.taskIds
          }
        })
        .then(data => {
          console.log(data.data.code)
          if (data.data.code == 20000) {
            console.log('我进来了')
            this.$router.push({
              name: 'spotCheckTask',
              params: {
                spotCheck: data.data.data.inspectionItemBeans,
                weiZhi:
                  data.data.data.buildingName + '/' + data.data.data.floorName,
                type: data.data.data.typeName,
                spotName: data.data.data.deviceName,
                deviceId: localStorage.getItem('deviceId'),
                taskDetailId: this.taskIds,
                radio: data.data.data.deviceResult,
                remark: data.data.data.remark,
                imgUrl: data.data.data.imgUrl
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 跳转小程序
    sign() {
      console.log(this.taskId)
      WXsao1(this.taskIds, this.overTime, localStorage.getItem('deviceId'))
    },
    isShow() {
      this.show = true
    },
    // 人脸核验成功
    lose() {
      this.show5 = false
      localStorage.setItem('ciShu', 0)
      if (
        this.patrolPointCheck != 0 &&
        this.patrolPointCheck != 'undefined' &&
        this.patrolPointCheck != null
      ) {
        this.show2 = false
        this.show4 = false
        this.show5 = false
        this.show6 = false
        this.show7 = true
      }
    },
    // 人脸和验失败确认
    lose1() {
      this.show6 = false
      localStorage.setItem('ciShu', 0)
      if (
        this.patrolPointCheck != 0 &&
        this.patrolPointCheck != 'undefined' &&
        this.patrolPointCheck != null
      ) {
        this.show2 = false
        this.show4 = false
        this.show5 = false
        this.show6 = false
        this.show7 = true
      }
    },
    tiShi(val, val1) {
      if (val1 == null) {
        this.$toast(val)
      } else {
        this.$toast(val + '/' + val1)
      }
    },
    // 查看详细
    checkDetails() {
      this.keepAxios
        .get(this.baseUrl.spotCheck + '/rest/deviceInfo/getDeviceById', {
          params: {
            deviceId: localStorage.getItem('deviceId'),
            taskDetailId: this.taskIds
          }
        })
        .then(data => {
          if (data.data.code == 20000) {
            this.$router.push({
              name: 'spotCheckTask1',
              params: {
                spotCheck: data.data.data.inspectionItemBeans,
                weiZhi:
                  data.data.data.buildingName + '/' + data.data.data.floorName,
                type: data.data.data.typeName,
                spotName: data.data.data.deviceName,
                deviceId: localStorage.getItem('deviceId'),
                taskDetailId: this.taskIds,
                radio: data.data.data.deviceResult,
                remark: data.data.data.remark,
                imgUrl: data.data.data.imgUrl
              }
            })
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
      bottom: 65px;
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
        padding-right: 37px;
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
            text-align: left;
          }
          .time {
            width: 135px;
            text-align: center;
          }
        }
        .black {
          font-size: 13px;
          color: black;
          .jianZhu {
            width: 25%;
            text-align: left;
          }
          .time {
            width: 135px;
            text-align: center;
          }
        }
        .keep {
          a {
            position: fixed;
            left: 26px;
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
          text-align: left;
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
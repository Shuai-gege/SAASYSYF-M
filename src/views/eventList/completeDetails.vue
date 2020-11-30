<template>
  <div class="box">
    <van-nav-bar title="事件详情" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" />
    <div class="con mescroll-touch">
      <div class="minBox">
        <div class="flex col">
          <span>事件编号：</span>
          <span class="huanHang">{{detailList.eventCode}}</span>
        </div>
        <div
          class="flex col"
          v-if="detailList.event_status_now != 18&&detailList.event_status_now != 5"
        >
          <span v-if="detailList.event_status_now != 17">开始执行时间：</span>
          <span v-if="detailList.event_status_now != 17">{{detailList.startTime | teShuTime}}</span>
        </div>
        <div
          class="flex col"
          v-if="detailList.event_status_now != 18&&detailList.event_status_now != 5"
        >
          <span>规定工时：</span>
          <span>{{detailList.duration}}小时</span>
        </div>
        <!-- 已完成的情况下 -->
        <div
          class="flex col"
          v-if="detailList.event_status_now == 9&&detailList.event_status_now != 5"
        >
          <span>完成时间</span>
          <span>{{detailList.tbEventCompleteBeans[0].createTime|teShuTime}}</span>
        </div>
        <div
          class="flex col"
          v-if="detailList.event_status_now == 9&&detailList.event_status_now != 5"
        >
          <!-- <span>完成总耗时</span>
          <span
            v-if="detailList.tbEventCompleteBeans"
          >{{detailList.startTime | guoQuTime(detailList.tbEventCompleteBeans[0].createTime)}}</span>-->
          <span>完成总耗时</span>
          <span v-if="detailList.tbEventCompleteBeans">{{detailList.totalConsumeHours | haoMiao}}</span>
        </div>
        <div
          class="flex col"
          v-if="detailList.event_status_now != 9 && detailList.event_status_now != 18&&detailList.event_status_now != 5"
        >
          <span v-if="detailList.event_status_now != 17">当前工时：</span>
          <span
            v-if="detailList.event_status_now != 17"
          >{{detailList.startTime|guoQuTime1(nowTime)}}</span>
        </div>
        <div
          class="flex col"
          v-if="detailList.event_status_now != 9&& detailList.event_status_now != 18&&detailList.event_status_now != 5"
        >
          <span v-if="detailList.event_status_now != 17">距结束还剩：</span>
          <span
            v-if="detailList.event_status_now != 17"
          >{{detailList.duration|guoQu(detailList.startTime,nowTime)}}</span>
        </div>
      </div>
      <!-- 报事信息 -->
      <div style="background:#fff">
        <div class="tit">报事信息</div>
      </div>
      <div class="minBox">
        <div class="flex col">
          <span>报事人：</span>
          <span>{{detailList.reporter_name}}</span>
        </div>
        <div class="flex col">
          <span>报事类型：</span>
          <span>{{detailList.event_type_name}}</span>
        </div>
        <!-- 只有建筑的时候现实 -->
        <div class="flex col" v-if="detailList.floor_name ==null && detailList.location_name==null">
          <span>报事位置：</span>
          <span>{{detailList.building_name}}</span>
        </div>
        <!-- 只有建筑和楼层的时候现实 -->
        <div class="flex col" v-else-if="detailList.location_name ==null">
          <span>报事位置：</span>
          <span>{{detailList.building_name}}/{{detailList.floor_name}}</span>
        </div>
        <!-- 都有的时候显示 -->
        <div class="flex col" v-else>
          <span>报事位置：</span>
          <span>{{detailList.building_name}}/{{detailList.floor_name}}/{{detailList.location_name}}</span>
        </div>
        <!-- 详细位置 -->
        <div class="flex col">
          <span>详细位置：</span>
          <span>{{detailList.location_description}}</span>
        </div>
        <div class="flex col">
          <span>报事时间：</span>
          <span>{{detailList.report_time | teShuTime}}</span>
        </div>
        <div class="flex col">
          <span style="width:160px">事件描述：</span>
          <span>{{detailList.report_remark}}</span>
        </div>
        <van-image
          v-for="(item,i) in imgs"
          :key="i"
          v-if="flag"
          width="3rem"
          height="3rem"
          fit="contain"
          :src="item"
          style="margin-right:5px"
          @click="getImg(i)"
        />
      </div>
      <!-- 已完成才展示 -->
      <div v-if="detailList.event_status_now == 9">
        <!-- 完工信息 -->
        <div style="background:#fff">
          <div class="tit">完工信息</div>
        </div>
        <div class="minBox">
          <div class="flex col">
            <span>完工人：</span>
            <span>{{comName1}}</span>
          </div>
          <div class="flex col">
            <span>完工描述：</span>
            <span>{{detailList.tbEventCompleteBeans[0].description}}</span>
          </div>
          <van-image
            v-for="(item,i) in imgs1"
            :key="i"
            width="3rem"
            height="3rem"
            fit="contain"
            :src="item"
            style="margin-right:5px"
            @click="getImg1(i)"
          />
        </div>
        <!-- 验收信息 -->
        <div style="background:#fff">
          <div class="tit">验收信息</div>
        </div>
        <div class="minBox">
          <div class="flex col">
            <span>验收人：</span>
            <span>{{detailList.tbEventCompleteBeans[0].checkUserName}}</span>
          </div>
          <div class="flex col">
            <span>验收方式：</span>
            <span v-if="detailList.tbEventCompleteBeans[0].check_according == 1">现场验收</span>
            <span v-else>照片验收</span>
          </div>
          <div class="flex col">
            <span>验收描述：</span>
            <span>{{detailList.tbEventCompleteBeans[0].check_remark}}</span>
          </div>
          <div class="flex col">
            <span>物料信息：</span>
            <div>
              <span v-for="(item,i) in detailList.wuliao" :key="i" style="color:#b9b9b9">{{item}},</span>
            </div>
          </div>
          <van-image
            v-for="(item,i) in imgs2"
            :key="i"
            width="3rem"
            height="3rem"
            v-if="flag2"
            fit="contain"
            :src="item"
            style="margin-right:5px"
            @click="getImg2(i)"
          />
        </div>
        <!-- 评价信息 -->
        <div style="background:#fff">
          <div class="tit">评价信息</div>
        </div>
        <div class="minBox">
          <div class="flex col">
            <span>被评价人：</span>
            <span>{{comName1}}</span>
          </div>
          <div class="flex col">
            <span>评价综合得分：</span>
            <span>{{detailList.tbEventCompleteBeans[0].scoreAll}}</span>
          </div>
          <div class="flex col">
            <span>{{pingJia[0].assessType}}：</span>
            <van-rate v-model="value" disabled disabled-color="#a68f43" :count="10" />
          </div>
          <div class="flex col">
            <span>{{pingJia[1].assessType}}：</span>
            <van-rate v-model="value1" disabled disabled-color="#a68f43" :count="10" />
          </div>
          <div class="flex col">
            <span>{{pingJia[2].assessType}}：</span>
            <van-rate v-model="value2" disabled disabled-color="#a68f43" :count="10" />
          </div>
        </div>
      </div>
      <!-- 进度信息 -->
      <div style="background:#fff">
        <div class="tit">进度信息</div>
      </div>
      <div class="plan" v-for="(item,i) in detailList.tbEventLogBeans" :key="i">
        <!-- <div class="flex_l">
          <van-icon name="clock-o" color="#000" size="20px" />
          <div>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
            <a
              :href="'tel:'+item.toUserMobile"
            >{{item.toUserName}}</a> 审核
          </div>
        </div>-->
        <!-- 上报&转发事件 -->
        <div
          class="flex_l"
          v-if="item.log_remark == '分配事件'||item.log_remark == '上报事件'||item.log_remark == '转交事件'||item.log_remark == '退回事件被拒绝'||item.log_remark == '延期事件审核通过'||item.log_remark == '拒绝上报无效事件'||item.log_remark == '退回事件审核同意'||item.log_remark == '延期事件审核未通过'||item.log_remark == '无效事件审核通过'||item.log_remark == '事件验证不合格'||item.log_remark == '无效事件审核未通过'||item.log_remark == '合并事件'||item.log_remark == '日常事件上报并分配'"
        >
          <van-icon name="clock-o" color="#000" size="20px" />
          <div>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
            <a
              :href="'tel:'+item.toUserMobile"
            >{{item.toUserName}}</a> 处理
          </div>
        </div>
        <!-- 完成事件 -->
        <div class="flex_l" v-if="item.log_remark == '完成事件'">
          <van-icon name="clock-o" color="#000" size="20px" />
          <div>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
            <a
              :href="'tel:'+item.toUserMobile"
            >{{item.toUserName}}</a> 验收
          </div>
        </div>
        <!-- 退回事件 -->
        <div
          class="flex_l"
          v-if="item.log_remark == '退回事件'||item.log_remark == '申请延期'||item.log_remark == '上报无效事件'"
        >
          <van-icon name="clock-o" color="#000" size="20px" />
          <div>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
            <a
              :href="'tel:'+item.toUserMobile"
            >{{item.toUserName}}</a> 审核
          </div>
        </div>
        <!-- 验收合格 -->
        <div class="flex_l" v-if="item.log_remark == '事件验证合格'">
          <van-icon name="clock-o" color="#000" size="20px" />
          <div>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
            <a
              :href="'tel:'+item.toUserMobile"
            >{{item.toUserName}}</a>
          </div>
        </div>
        <!-- 自行处理 -->
        <div class="flex_l" v-if="item.log_remark == '自行处理'">
          <van-icon name="clock-o" color="#000" size="20px" />
          <div>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
          </div>
        </div>
        <!-- 合并 -->
        <div class="flex_l" v-if="item.log_remark == '被合并'">
          <van-icon name="clock-o" color="#000" size="20px" />
          <div>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
          </div>
        </div>
        <p>
          {{item.createTime|teShuTime}}
          <i v-if="item.hours !== null">| 延时时长{{item.hours}}(小时)</i>
        </p>
        <p>
          <a
            style="color:#7ac4ff;"
            :key="i"
            :href="url+item.imgUrl.split(',')[0]"
            v-if="item.imgUrl != null && item.imgUrl != ''"
          >查看图片</a>
        </p>
        <p>描述 {{item.remark}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
  components: {},
  data() {
    return {
      value: '', //服务态度
      value1: '', //技术能力
      value2: '', //响应速度
      flag: true, //报事图片
      flag1: true, //完工图片
      flag2: true, //验收图片
      detailList: [], //详情list
      nowTime: new Date(),
      pingJia: [],
      imgs: [], //报事信息图片
      imgs1: [], //完工信息图片
      imgs2: [], //验收信息图片
      imgs3: [], //进度里的图片
      url: '',
      comName: [],
      comName1: ''
    }
  },
  mounted() {
    var url0 = unescape(localStorage.getItem('baseUrl'))
    this.url = url0.replace('https', 'http')
    this.axios
      .get('/rest/tbEventReport/getEventInfoByEventId', {
        params: {
          uid: localStorage.getItem('uid'), //登录人ID
          event_id: sessionStorage.getItem('id'), //事件ID
          eventStatusNow: sessionStorage.getItem('eventStatusNow')
        }
      })
      .then(data => {
        console.log(data)
        if (data.imgurl == '') {
          this.flag = false
        } else {
          this.flag = true
        }

        // ************************************************
        for (var i = 0; i < data.tbEventCompleteBeans.length; i++) {
          this.comName.push(data.tbEventCompleteBeans[i].completeUserName)
        }
        this.comName1 = [...new Set(this.comName)].join(',')
        // 报事信息图片
        this.detailList = data
        var img = data.imgurl
        var img1 = img.split(',')
        var baseUrl = unescape(localStorage.getItem('baseUrl'))
        var baseUrl1 = baseUrl.replace('https', 'http')
        for (var i = 0; i < img1.length; i++) {
          this.imgs.push(baseUrl1 + img1[i])
        }
        if (data.tbEventCompleteBeans == '') {
          return ''
        } else {
          if (data.tbEventCompleteBeans[0].check_img == '') {
            this.flag2 = false
          }
          // 完工信息图片
          var img2 = data.tbEventCompleteBeans[0].imgUrl
          var img3 = img2.split(',')
          var baseUrl2 = unescape(localStorage.getItem('baseUrl'))
          var baseUrl3 = baseUrl2.replace('https', 'http')
          for (var i = 0; i < img3.length; i++) {
            this.imgs1.push(baseUrl3 + img3[i])
          }
          // 验收信息
          var img4 = data.tbEventCompleteBeans[0].check_img
          var img5 = img4.split(',')
          var baseUrl4 = unescape(localStorage.getItem('baseUrl'))
          var baseUrl5 = baseUrl4.replace('https', 'http')
          for (var i = 0; i < img5.length; i++) {
            this.imgs2.push(baseUrl5 + img5[i])
          }
        }

        this.value = parseInt(data.tbEventCompleteBeans[0].star_one)
        this.value1 = parseInt(data.tbEventCompleteBeans[0].star_two)
        this.value2 = parseInt(data.tbEventCompleteBeans[0].star_three)
      })
    // 获取评价列表
    this.axios
      .post('/rest/tbAssessConfig/list', { uid: localStorage.getItem('uid') })
      .then(data => {
        console.log(data)
        this.pingJia = data.rows
      })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getImg(i) {
      ImagePreview({
        images: this.imgs,
        showIndex: true,
        loop: true,
        startPosition: i
      })
    },
    getImg1(i) {
      ImagePreview({
        images: this.imgs1,
        showIndex: true,
        loop: true,
        startPosition: i
      })
    },
    getImg2(i) {
      ImagePreview({
        images: this.imgs2,
        showIndex: true,
        loop: true,
        startPosition: i
      })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f5f6f7;
  .con {
    padding-top: 50px;
    .tit {
      background: #a68f43;
      color: #fff;
      padding: 5px 0;
      width: 90px;
      font-weight: 700;
      font-size: 14px;
      text-align: center;
      border-radius: 0 0 20px 0;
    }
    .minBox {
      padding: 10px;
      margin-bottom: 5px;
      background: #fff;
      .col {
        padding: 5px 0;
        font-size: 13px;
        span:nth-child(1) {
          color: #000;
        }
        span:nth-child(2) {
          color: #b9b9b9;
        }
      }
    }
    .plan {
      background: #fff;
      color: #000;
      padding: 5px 10px;
      a {
        color: #7ac4ff;
      }
      p {
        color: #999;
      }
    }
  }
}
</style>
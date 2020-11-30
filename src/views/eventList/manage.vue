<template>
  <div class="Home">
    <van-nav-bar title="事件详情" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" />
    <!-- 头部返回 -->
    <div class="con">
      <!-- 主体内容 -->
      <van-cell-group>
        <van-cell title="事件编号：" :value="dateils.eventCode" />
        <van-cell
          title="开始执行时间"
          v-if="dateils.event_status_now  != 1"
          :value="dateils.startTime | teShuTime"
        />
        <van-cell
          v-if="dateils.event_status_now !=1 && dateils.event_status_now !=7&& dateils.event_status_now !=5&& dateils.event_status_now !=4&& dateils.event_status_now !=17"
          title="规定工时"
          :value="dateils.duration+'(小时）'"
        />
        <van-cell
          v-if="dateils.event_status_now !=1 && dateils.event_status_now !=7&& dateils.event_status_now !=5&& dateils.event_status_now !=4&& dateils.event_status_now !=17&& dateils.event_status_now !=6"
          title="当前工时"
          :value="numTime|guoQuTime1(nowTime)"
        />
        <van-cell
          v-if="dateils.event_status_now ==6"
          title="完成总耗时"
          :value="dateils.totalConsumeHours|haoMiao"
        />
        <van-cell
          v-if="dateils.event_status_now !=1 && dateils.event_status_now !=7&& dateils.event_status_now !=5&& dateils.event_status_now !=4&& dateils.event_status_now !=17&& dateils.event_status_now !=6"
          title="距离结束还剩"
          :value="dateils.duration|guoQu(numTime,nowTime)"
        />
        <van-cell
          v-if="dateils.event_status_now ==8"
          title="申请延期时间"
          :value="dateils.delayHours+'小时'"
        />
      </van-cell-group>
      <p class="tlt">报事信息</p>
      <van-cell-group>
        <van-cell title="报事人" :value="dateils.reporter_name" />
        <van-cell title="报事类型" :value="dateils.event_type_name" />
        <van-cell title="报事时间" :value="dateils.report_time | teShuTime" />
        <!-- 只有建筑的时候显示 -->
        <van-cell
          v-if="dateils.floor_name ==null && dateils.location_name==null"
          title="位置信息"
          :value="dateils.building_name"
        />
        <!-- 只有建筑和楼层的时候显示 -->
        <van-cell
          v-else-if="dateils.location_name ==null"
          title="位置信息"
          :value="dateils.building_name+'/'+dateils.floor_name"
        />
        <!-- 全都有的时候显示 -->
        <van-cell
          v-else
          title="位置信息"
          :value="dateils.building_name+'/'+dateils.floor_name+'/'+dateils.location_name"
        />
        <!-- 详细地址 -->
        <van-cell title="详细地址" :value="message1" />
        <van-cell title="报事描述" />
        <van-field disabled v-model="message" rows="2" autosize type="textarea" show-word-limit />
        <van-image
          v-for="(item,i) in imgs"
          v-if="flag"
          :key="i"
          width="3rem"
          height="3rem"
          fit="cover"
          :src="item"
          style="margin:0 5px;"
          @click="getImg(i)"
        />
      </van-cell-group>
      <!-- 完成待验收 -->
      <div v-if="dateils.event_status_now == 6">
        <p class="tlt">完成信息</p>
        <van-cell-group>
          <van-cell title="完成人" v-if="dateils.tbEventCompleteBeans" :value="comName1" />
          <van-cell
            title="完工描述"
            v-if="dateils.tbEventCompleteBeans"
            :value="dateils.tbEventCompleteBeans[0].description"
          />
          <van-image
            v-for="(item,i) in imgs1"
            v-if="flag1"
            :key="i"
            width="3rem"
            height="3rem"
            fit="cover"
            :src="item"
            style="margin:0 5px;"
            @click="getImg1(i)"
          />
        </van-cell-group>
      </div>
      <!-- 事件状态 -->
      <div class="box flex_a">
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="allocation"
          v-if="dateils.event_status_now ==1 || dateils.event_status_now ==4|| dateils.event_status_now ==11|| dateils.event_status_now ==17"
        >分配事件</van-button>
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="merge"
          v-if="dateils.event_status_now ==1|| dateils.event_status_now ==4|| dateils.event_status_now ==11|| dateils.event_status_now ==17"
        >合并事件</van-button>
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          to="/careOf"
          v-if="dateils.event_status_now ==1|| dateils.event_status_now ==4|| dateils.event_status_now ==11|| dateils.event_status_now ==17"
        >转交事件</van-button>
        <!-- <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          to="/up"
          v-if="dateils.event_status_now == 1 && dateils.tbPatrolPointBean != null &&dateils.tbPatrolPointBean == null|| dateils.event_status_now ==4|| dateils.event_status_now ==11|| dateils.event_status_now ==17"
        >上报事件</van-button>-->
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          to="/up"
          v-if="dateils.event_status_now == 1 || dateils.event_status_now ==4|| dateils.event_status_now ==11|| dateils.event_status_now ==17"
        >上报事件</van-button>
        <!-- 分配完成之后的操作按钮 -->
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="wanCheng"
          v-if="dateils.event_status_now !=1 && dateils.event_status_now !=4&& dateils.event_status_now !=5&& dateils.event_status_now !=7&& dateils.event_status_now !=8&& dateils.event_status_now !=11&& dateils.event_status_now !=6&& dateils.event_status_now !=17"
        >完成事件</van-button>
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          to="/out"
          v-if="dateils.event_status_now !=1 && dateils.event_status_now !=4 &&dateils.event_status_now !=5&& dateils.event_status_now !=7&& dateils.event_status_now !=8&& dateils.event_status_now !=11&& dateils.event_status_now !=6&& dateils.event_status_now !=17"
        >退回事件</van-button>
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          to="/postpone"
          v-if="dateils.event_status_now !=1 && dateils.event_status_now !=4 &&dateils.event_status_now !=5&& dateils.event_status_now !=7&& dateils.event_status_now !=8&& dateils.event_status_now !=11&& dateils.event_status_now !=6&& dateils.event_status_now !=17"
        >延期事件</van-button>
        <van-button
          type="primary"
          size="large"
          color="#a68e44"
          @click="yanShou"
          v-if="dateils.event_status_now == 6"
        >验收事件</van-button>
        <!-- 上报同意&拒绝 -->
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="btn(1)"
          v-if="dateils.event_status_now == 5"
        >同意</van-button>
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="btn(2)"
          v-if="dateils.event_status_now == 5"
        >拒绝</van-button>
        <!-- 延期同意&拒绝 -->
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="btn1(1)"
          v-if="dateils.event_status_now == 8"
        >同意</van-button>
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="btn1(2)"
          v-if="dateils.event_status_now == 8"
        >拒绝</van-button>
        <!-- 退回事件同意或拒绝 -->
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="btn2(1)"
          v-if="dateils.event_status_now == 7"
        >同意</van-button>
        <van-button
          type="primary"
          size="mini"
          color="#a68e44"
          @click="btn2(2)"
          v-if="dateils.event_status_now == 7"
        >拒绝</van-button>
      </div>
      <!-- 同意&拒绝上报无效事件 -->
      <van-field
        v-if="dateils.event_status_now == 5 || dateils.event_status_now == 7 || dateils.event_status_now == 8"
        v-model="miaoShu"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <!-- ------------------------ -->
      <p class="tlt">进度</p>
      <div class="plan" v-for="(item,i) in dateils.tbEventLogBeans" :key="i">
        <div class="flex_l">
          <van-icon name="clock-o" color="#A68E44" size="20px" />
          <p>
            <a :href="'tel:'+item.fromUserMobile">{{item.fromUserName}}</a>
            {{item.processRemark}}
            <a
              :href="'tel:'+item.toUserMobile"
            >{{item.toUserName}}</a>
            处理
          </p>
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
        <p>描述：{{item.remark}}</p>
      </div>
    </div>
    <!-- 待分配操作按钮 -->
    <!-- <div class="end flex">
      <van-button
        color="#a68f43"
        to="/wanCheng"
        v-if="dateils.event_status_now !=1 && dateils.event_status_now !=4&& dateils.event_status_now !=5&& dateils.event_status_now !=7&& dateils.event_status_now !=8&& dateils.event_status_now !=11&& dateils.event_status_now !=6"
      >完成事件</van-button>
      <van-button
        color="#fc4c4c"
        to="/out"
        v-if="dateils.event_status_now !=1 && dateils.event_status_now !=4 &&dateils.event_status_now !=5&& dateils.event_status_now !=7&& dateils.event_status_now !=8&& dateils.event_status_now !=11&& dateils.event_status_now !=6"
      >退回事件</van-button>
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        to="/postpone"
        v-if="dateils.event_status_now !=1 && dateils.event_status_now !=4 &&dateils.event_status_now !=5&& dateils.event_status_now !=7&& dateils.event_status_now !=8&& dateils.event_status_now !=11&& dateils.event_status_now !=6"
      >延期事件</van-button>
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="yanShou"
        size="large"
        v-if="dateils.event_status_now == 6"
      >验收事件</van-button>
    </div>-->
    <!-- 上报无效事件同意或拒绝 -->
    <!-- <div class="end flex_a" v-if="dateils.event_status_now == 5">
      <van-button color="#a68f43" style="padding:0 40px" @click="btn(1)">同意</van-button>
      <van-button color="#fc4c4c" style="padding:0 40px" @click="btn(2)">拒绝</van-button>
    </div>-->
    <!-- 延期事件同意或拒绝 -->
    <!-- <div class="end flex_a" v-if="dateils.event_status_now == 8">
      <van-button color="#a68f43" style="padding:0 40px" @click="btn1(1)">同意</van-button>
      <van-button color="#fc4c4c" style="padding:0 40px" @click="btn1(2)">拒绝</van-button>
    </div>-->
    <!-- 退回事件同意或拒绝 -->
    <!-- <div class="end flex_a" v-if="dateils.event_status_now == 7">
      <van-button color="#a68f43" style="padding:0 40px" @click="btn2(1)">同意</van-button>
      <van-button color="#fc4c4c" style="padding:0 40px" @click="btn2(2)">拒绝</van-button>
    </div>-->
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      message: '', //事件描述
      message1: '', //详细位置描述
      id: '', //时间ID
      dateils: '', //详情信息
      nowTime: new Date(),
      miaoShu: '', //拒绝无效申请描述
      imgs: [], //图片
      imgs1: [], //图片
      imgs3: [], //进度里的图片
      flag: true,
      flag1: true,
      numTime: '', //分配后的时间
      url: '',
      type_dept: '', //部门ID
      comName: [], //多人的时候显示
      comName1: '', //多人的时候显示
      comNameId: [], //多人的时候显示
      comNameId1: '' //多人的时候显示
    }
  },
  components: {},

  mounted() {
    // var url0 = unescape(localStorage.getItem('baseUrl'))
    this.url = unescape(localStorage.getItem('baseUrl'))
    // this.url = url0.replace('https', 'http')
    this.id = sessionStorage.getItem('id')
    this.axios
      .get('/rest/tbEventReport/getEventInfoByEventId', {
        params: {
          uid: localStorage.getItem('uid'), //登录人ID
          event_id: this.id, //事件ID
          eventStatusNow: sessionStorage.getItem('eventStatusNow') //事件状态
        }
      })
      .then(data => {
        this.dateils = data
        for (var i = 0; i < data.tbEventCompleteBeans.length; i++) {
          this.comName.push(data.tbEventCompleteBeans[i].completeUserName)
          this.comNameId.push(data.tbEventCompleteBeans[i].completeUserId)
        }
        this.comName1 = this.comName.join(',')
        this.comNameId1 = this.comNameId.join(',')
        this.type_dept = data.event_type_id
        if (data.tbEventAllocationBean != null) {
          this.numTime = data.tbEventAllocationBean.startTime
        }
        // data.tbEventLogBeans.sort(function(a, b) {
        //   return a.createTime < b.createTime ? 1 : -1
        // })
        if (data.imgurl == '') {
          this.flag = false
          this.flag1 = false
        }
        // if (data.tbEventCompleteBeans[0].imgUrl == '') {
        //   this.flag1 = false
        // }
        // 事件 详情
        var img = data.imgurl
        var img1 = img.split(',')
        var baseUrl = unescape(localStorage.getItem('baseUrl'))
        var baseUrl1 = baseUrl.replace('https', 'http')
        console.log(baseUrl1)
        for (var i = 0; i < img1.length; i++) {
          this.imgs.push(baseUrl1 + img1[i])
        }
        // 完成信息
        if (data.tbEventCompleteBeans != '') {
          if (data.tbEventCompleteBeans[0].imgUrl == '') {
            this.flag1 = false
          }
          var img = data.tbEventCompleteBeans[0].imgUrl
          var img2 = img.split(',')
          var baseUrl1 = unescape(localStorage.getItem('baseUrl'))
          var baseUrl2 = baseUrl1.replace('https', 'http')
          for (var i = 0; i < img2.length; i++) {
            this.imgs1.push(baseUrl2 + img2[i])
          }
        }

        if (data.report_remark !== '') {
          this.message = data.report_remark
        } else {
          this.message = '无事件描述'
        }
        if (data.location_description !== '') {
          this.message1 = data.location_description
        } else {
          this.message1 = '无详细地址描述'
        }
      })
  },
  methods: {
    wanCheng() {
      if (this.dateils.tbPatrolPointBean != null) {
        this.$router.push({
          path: '/wanCheng',
          query: {
            num: '1'
          }
        })
      } else {
        this.$router.push('/wanCheng')
      }
    },
    // 跳到合并页面
    merge() {
      this.$router.push('/merge')
      localStorage.setItem('eventCode', this.dateils.eventCode)
    },
    onClickLeft() {
      this.$router.push('/eventList')
    },
    // 分配任务
    allocation() {
      this.$router.push({
        name: 'allocation',
        query: {
          type_dept: this.type_dept
        }
      })
    },
    // 无效任务审核,1同意，2拒绝
    btn(num) {
      this.axios
        .get('/rest/tbEventReport/checkInvalidEvent', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            event_id: sessionStorage.getItem('id'), //事件ID
            status: num, //1同意，2拒绝
            description: this.miaoShu //描述
          }
        })
        .then(data => {
          if (num == 1) {
            this.$toast('同意无效任务')
          } else {
            this.$toast('拒绝无效任务')
          }
          this.$router.push('eventList')
        })
    },
    // 延期事件审核，1同意，2拒绝
    btn1(num) {
      this.axios
        .get('/rest/tbEventReport/checkDelayEvent', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            event_id: sessionStorage.getItem('id'), //事件ID
            status: num, //审核状态1同意，2拒绝
            description: this.miaoShu,
            hours: this.dateils.delayHours //延期多久
          }
        })
        .then(data => {
          if (num == 1) {
            this.$toast('同意延期')
          } else {
            this.$toast('拒绝延期')
          }
          this.$router.push('eventList')
        })
    },
    // 退回事件审核。1同意，2拒绝
    btn2(num) {
      this.axios
        .get('/rest/tbEventReport/checkBackEvent', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            event_id: sessionStorage.getItem('id'), //事件ID
            status: num, //审核状态1同意，2拒绝
            description: this.miaoShu
          }
        })
        .then(data => {
          if (num == 1) {
            this.$toast('同意退回')
          } else {
            this.$toast('拒绝退回')
          }
          this.$router.push('eventList')
        })
    },
    // 验收按钮
    yanShou() {
      this.$router.push({
        path: '/check',
        query: {
          userName: this.comName1,
          userNameId: this.comNameId1
        }
      })
    },
    // 图片预览
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
    }
  }
}
</script>
<style lang='less' scoped>
.Home {
  letter-spacing: 1px;
  min-height: 100vh;
  background: #f5f5f5;
  .con {
    margin-bottom: 55px;
    padding-top: 50px;
    /deep/.van-cell {
      font-size: 13px;
    }
    .van-image {
      padding: 5px;
    }
    .tlt {
      font-size: 15px;
      padding: 3px 15px;
      font-weight: 700;
      color: #000;
    }
    .plan {
      background: #fff;
      color: #000;
      padding: 5px 0;
      p {
        padding: 0px 10px;
        a {
          color: #7ac4ff;
        }
      }
      .flex_l {
        padding: 5px 10px;
        // font-size: 13px;
      }
    }
    .box {
      background: #fff;
      color: #fff;
      padding: 8px 10px;
      .van-button--mini {
        padding: 0 10px;
      }
    }
  }
  .end {
    padding: 0 5px;
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
}
</style>
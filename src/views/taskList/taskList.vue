<template>
  <div class="box">
    <!-- <div class="null" v-if="list1.length==0">暂无购物记录~逛一逛吧！</div> -->
    <van-nav-bar title="任务清单" left-text="首页" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon name="filter-o" size="18" @click="isShow" />
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <van-search v-model="value" show-action shape="round" placeholder="模糊搜索：报事人、描述、编号">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 筛选页面 -->
    <van-popup v-model="show" position="top" :style="{ height: '100%' }">
      <div class="mescroll-touch">
        <!-- 报事类型 -->
        <p>事件类型</p>
        <div class="minbox flex_w">
          <h6
            v-for="(item,i) in baoShiType"
            :key="i"
            :class="{discolor:changeLeftBackground == i}"
            @click="leftChange(item.id,i)"
          >{{item.eventType}}</h6>
        </div>
        <p>报事时间</p>
        <div class="time">
          <van-cell-group class="flex">
            <van-field v-model="actionTime" placeholder="请输入开始时间" @click="flag = true" readonly />至
            <van-field v-model="xianZaiTime" placeholder="请输入结束时间" @click="flag1 = true" readonly />
          </van-cell-group>
          <!-- 时间选择框 -->
          <van-datetime-picker
            v-if="flag"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="endTime"
            @cancel="over"
          />
          <van-datetime-picker
            v-if="flag1"
            v-model="currentDate"
            type="date"
            :min-date="minDate1"
            :max-date="maxDate1"
            @confirm="endTime1"
            @cancel="over"
          />
        </div>
        <!-- 事件状态 -->
        <p v-if="show5">事件逾期</p>
        <div class="minbox flex_w" v-if="show5">
          <h6
            @click="leftChange1(item.id,i)"
            :class="{discolor1:changeLeftBackground1 == i}"
            v-for="(item,i) in baoShiType1"
            :key="i"
          >{{item.name}}</h6>
        </div>
        <!-- 事件状态 -->
        <p v-if="show5">完工原因</p>
        <div class="minbox flex_w" v-if="show5">
          <h6
            @click="leftChange2(item.id,i)"
            :class="{discolor2:changeLeftBackground2 == i}"
            v-for="(item,i) in baoShiType2"
            :key="i"
          >{{item.name}}</h6>
        </div>
        <!-- 按钮 -->
        <div class="btn flex">
          <van-button color="#999" @click="show = false">取消</van-button>
          <van-button color="#a48f36" @click="filter">确认</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 主体部分 -->
    <div class="con">
      <van-tabs v-model="active" color="#000" background="#fff" :sticky="true" @click="dian">
        <van-tab title="未完成">
          <!-- 筛选前的List -->
          <Mescroll-vue
            ref="mescroll"
            :up="mescrollUp"
            @init="mescrollInit"
            class="mescroll"
            id="baoGuo"
          >
            <div class="null" v-if="list.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list"
              :key="i"
              @click="mangeDateils2(item.id,item.reportEventTypeId,item.eventStatusNow)"
            >
              <div class="flex col">
                <span>报事类型</span>
                <span>{{item.report_type_name}}</span>
              </div>
              <div class="flex col">
                <span>报事人</span>
                <span>{{item.reporter_name}}</span>
              </div>
              <div class="flex col">
                <span>报事时间</span>
                <span>{{item.createTime | teShuTime}}</span>
              </div>
              <div class="flex col">
                <span>报事描述</span>
                <span class="yihang">{{item.eventRemark}}</span>
              </div>
              <div class="flex col">
                <span>事件编号</span>
                <span class="yihang">{{item.eventCode}}</span>
              </div>
              <van-divider />
              <!-- 自行处理 -->
              <div
                v-if="item.eventStatusNow !=9&& item.eventStatusNow!=10"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 事件完成 -->
              <div
                v-if="item.eventStatusNow == 9"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.report_type_name}}，事件完成。总耗时{{item.createTime | guoQuTime(item.tbEventCompleteBean.createTime)}}</div>
              <!-- 拒绝事件完成 -->
              <div
                v-if="item.eventStatusNow == 10"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
            </div>
          </Mescroll-vue>
        </van-tab>
        <van-tab title="已完成">
          <div style="padding:180px;" v-if="loading">
            <van-loading type="spinner" />
          </div>
          <Mescroll-vue
            ref="mescroll"
            :up="mescrollUp"
            @init="mescrollInit"
            class="mescroll"
            id="baoGuo"
          >
            <div class="null" v-if="list1.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list1"
              :key="i"
              @click="mangeDateils2(item.id,item.reportEventTypeId,item.eventStatusNow)"
            >
              <div class="flex col">
                <span>报事类型</span>
                <span>{{item.report_type_name}}</span>
              </div>
              <div class="flex col">
                <span>报事人</span>
                <span>{{item.reporter_name}}</span>
              </div>
              <div class="flex col">
                <span>报事时间</span>
                <span>{{item.createTime | teShuTime}}</span>
              </div>
              <div class="flex col">
                <span>报事描述</span>
                <span class="yihang">{{item.eventRemark}}</span>
              </div>
              <div class="flex col">
                <span>事件编号</span>
                <span class="yihang">{{item.eventCode}}</span>
              </div>
              <van-divider />
              <!-- 自行处理 -->
              <div
                v-if="item.eventStatusNow !=9&& item.eventStatusNow!=10"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}。总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
              <!-- 事件完成 -->
              <div
                v-if="item.eventStatusNow == 9"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}。总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
              <!-- 拒绝事件完成 -->
              <div
                v-if="item.eventStatusNow == 10"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，事件完成。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
            </div>
          </Mescroll-vue>
        </van-tab>
      </van-tabs>
    </div>
    <div class="break">
      <van-icon name="replay" size="20" @click="shua" color="rgb(45,126,249)" />
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
export default {
  components: { MescrollVue },
  watch: {
    $route: function(newUrl, oldUrl) {
      if (oldUrl.name == 'home') {
        this.mescroll.resetUpScroll()
      }
    }
  },
  data() {
    return {
      active: parseInt(localStorage.getItem('action')),
      show: false, //筛选页面
      value: '', //模糊搜索
      xianZaiTime: '', //当前时间
      actionTime: '', //开始时间
      baoShiType: [], //点击改变颜色
      complete: '', //完工原因
      baoShiType1: [{ name: '全部' }, { name: '未逾期' }, { name: '已逾期' }], //点击改变颜色
      baoShiType2: [
        { name: '全部' },
        { name: '自行处理' },
        { name: '验收合格' },
        { name: '上报通过' }
      ], //点击改变颜色
      page: { num: 1, size: 10 },
      changeLeftBackground: 0, //报事类型按钮改变颜色
      changeLeftBackground1: 0, //事件状态按钮改变颜色
      changeLeftBackground2: 0, //完工原因按钮改变颜色
      minDate: new Date(2000, 0, 1), //查询开始时间
      maxDate: new Date(), //查询开始时间
      minDate1: new Date(2000, 0, 1), //查询结束时间
      maxDate1: new Date(new Date()), //查询结束时间
      currentDate: new Date(),
      flag: false,
      flag1: false,
      show5: false, //未完成中不展示是否逾期
      typeId: '', //事件类型Id
      yuQi: '', //是否预期、默认未逾期
      shiJianType: '1', //事件状态1未完成，2已完成
      dangQianTime: new Date(), //当前时间
      list: [], //筛选前完成的数据
      list1: [], //筛选前完成的数据
      mescroll: null, // mescroll实例对象
      scroll: '',
      mescrollUp: {
        isBounce: false, //是否允许ios的bounce回弹;默认true,允许回弹
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        onScroll: function(mescroll, y, isUp) {
          mescroll.scrollTo(y, 0)
        },
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
      loading: false,
      scrollTop1: ''
    }
  },
  mounted() {
    this.time()
    this.axios
      .get('/rest/tbEventTypeConfig/getEventTypes', {
        params: { uid: localStorage.getItem('uid'), company_id: '' }
      })
      .then(data => {
        console.log(data)
        data.sort(function(a, b) {
          return a.eventType > b.eventType ? 1 : -1
        })
        this.baoShiType = data
        let all = { eventType: '全部' }
        this.baoShiType.unshift(all)
        this.typeId = ''
      })
  },
  methods: {
    shua() {
      location.reload()
    },
    // 离开路由之前执行的函数,让ios可以下拉
    beforeRouteLeave(to, from, next) {
      if (to.name !== 'taskList') {
        this.mescroll.setBounce(true)
      }
      next()
    },
    over() {
      this.flag = false
      this.flag1 = false
    },
    onClickLeft() {
      this.mescroll.setBounce(true)
      this.$router.push('/')
    },
    isShow() {
      this.show = true
    },
    // 获取当前时间
    time() {
      var myDate = new Date()
      this.xianZaiTime =
        myDate.getFullYear() +
        '-' +
        this.p(myDate.getMonth() + 1) +
        '-' +
        myDate.getDate()
    },
    // 选中时间
    endTime(value) {
      const d = value
      // 年月日
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate())
      this.actionTime = resDate
      // 时分秒
      const resTime =
        this.p(d.getHours()) +
        ':' +
        this.p(d.getMinutes()) +
        ':' +
        this.p(d.getSeconds())
      this.flag = false
    },
    // 选中时间
    endTime1(value) {
      const d = value
      // 年月日
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate())
      this.xianZaiTime = resDate
      // 时分秒
      const resTime =
        this.p(d.getHours()) +
        ':' +
        this.p(d.getMinutes()) +
        ':' +
        this.p(d.getSeconds())
      this.flag1 = false
    },
    //转换时间不够10前面补0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    //报事类型点击改变颜色
    leftChange(id, index) {
      this.changeLeftBackground = index
      this.reportEventTypeId = id
      if (index == 0) {
        console.log('index==0' + this.typeId)
        this.typeId = ''
      } else {
        console.log('index!=0' + this.typeId)
        this.typeId = id //事件类型Id
      }
      console.log(this.typeId)
    },
    //事件状态点击改变颜色
    leftChange1(id, index) {
      this.changeLeftBackground1 = index
      this.reportEventTypeId = id
      if (index === 0) {
        this.yuQi = ''
      } else if (index === 1) {
        this.yuQi = '1'
      } else {
        this.yuQi = '2'
      }
      console.log(this.yuQi)
    },
    //完成原因点击改变颜色
    leftChange2(id, index) {
      this.changeLeftBackground2 = index
      this.reportEventTypeId = id
      if (index == 0) {
        this.complete = ''
      } else if (index == 1) {
        this.complete = '1'
      } else if (index == 2) {
        this.complete = '2'
      } else {
        this.complete = '3'
      }
      console.log(this.complete)
    },

    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    dian(name) {
      console.log(name)
      if (name == 0) {
        this.shiJianType = '1'
        this.show5 = false
        this.list = []
        this.mescroll.resetUpScroll()
        this.complete = ''
      } else {
        this.shiJianType = '2'
        this.show5 = true
        this.list1 = []
        this.mescroll.resetUpScroll()
      }
    },
    // 筛选后展示的未完成List
    upCallback(page, mescroll) {
      if (this.shiJianType == 1) {
        this.axios
          .get('/rest/tbEventReport/getEventsByParam', {
            params: {
              page: page.num,
              limit: page.size,
              uid: localStorage.getItem('uid'),
              eventHandleStatus: this.shiJianType, //事件处理状态 1:待我处理/未完成 2:我已处理/已完成 3: 我发布的
              eventStatus: this.yuQi, //事件状态 1:未结束/未逾期 2:已结束/已逾期
              completedesp: this.complete, //完工原因 1:自行处理 2:上报通过 3: 验收合格
              eventTypeId: this.typeId, //事件类型Id
              reportTimeStart: this.actionTime + ' ' + '00:00:00', //开始时间
              reportTimeEnd: this.xianZaiTime + ' ' + '23:59:59', //结束时间
              searchCon: this.value //模糊查询
            }
          })
          .then(data => {
            console.log(data)
            // 请求的列表数据
            let arr = data.rows
            console.log(arr)
            // 如果是第一页需手动置空列表
            if (page.num === 1) {
              this.list = []
            }
            // 把请求到的数据添加到列表
            this.list = this.list.concat(arr)
            // 数据渲染成功后,隐藏下拉刷新的状态
            console.log(this.list)
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true)
            })
            this.loading = false
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr()
          })
      } else {
        this.axios
          .get('/rest/tbEventReport/getEventsByParam', {
            params: {
              page: page.num,
              limit: page.size,
              uid: localStorage.getItem('uid'),
              eventHandleStatus: this.shiJianType, //事件处理状态 1:待我处理/未完成 2:我已处理/已完成 3: 我发布的
              eventStatus: this.yuQi, //事件状态 1:未结束/未逾期 2:已结束/已逾期
              completedesp: this.complete, //完工原因 1:自行处理 2:上报通过 3: 验收合格
              eventTypeId: this.typeId, //事件类型Id
              reportTimeStart: this.actionTime + ' ' + '00:00:00', //开始时间
              reportTimeEnd: this.xianZaiTime + ' ' + '23:59:59', //结束时间
              searchCon: this.value //模糊查询
            }
          })
          .then(data => {
            console.log(data)
            // 请求的列表数据
            let arr = data.rows
            console.log(arr)
            // 如果是第一页需手动置空列表
            if (page.num === 1) {
              this.list1 = []
            }
            // 把请求到的数据添加到列表
            this.list1 = this.list1.concat(arr)
            // 数据渲染成功后,隐藏下拉刷新的状态
            console.log(this.list1)
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true)
            })
            this.loading = false
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr()
          })
      }
    },
    //全部任务
    mangeDateils2(id, eventId, eventStatusNow) {
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('eventId', eventId)
      sessionStorage.setItem('eventStatusNow', eventStatusNow)
      this.$router.push('/completeDetails')
    },
    // 搜索框点确定触发
    onSearch() {
      this.filter()
    },
    // 确定筛选按钮
    filter() {
      this.mescroll.resetUpScroll()
      this.show = false
      this.loading = true
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f4f5f6;
  .break {
    // background: #f5f6f7;
    position: fixed;
    right: 55px;
    top: 8px;
    z-index: 9999;
    border-radius: 50%;
    .van-icon {
      padding: 5px;
    }
  }
  p {
    padding-left: 5px;
    color: #000;
  }
  h6 {
    background: #999;
    color: #fff;
    padding: 5px 15px;
    margin: 5px 10px;
    border-radius: 5px;
    font-size: 13px;
  }
  .discolor {
    background: #a68f43;
    color: #fff;
    padding: 5px 15px;
    margin: 5px 10px;
    border-radius: 5px;
  }
  .discolor1 {
    background: #a68f43;
    color: #fff;
    padding: 5px 15px;
    margin: 5px 10px;
    border-radius: 5px;
  }
  .discolor2 {
    background: #a68f43;
    color: #fff;
    padding: 5px 15px;
    margin: 5px 10px;
    border-radius: 5px;
  }
  .btn {
    padding-top: 20px;
    padding-bottom: 30px;
    .van-button--normal {
      margin: 0 30px;
      width: 127px;
    }
  }
  .con {
    .mescroll {
      position: fixed;
      top: 145px;
      bottom: 0px;
      height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
    }
    .minBox {
      padding: 10px 15px;
      margin: 5px;
      border-radius: 15px;
      background: #fff;
      .col {
        padding: 5px 0;
        font-size: 13px;
        span:nth-child(1) {
          color: #b9b9b9;
        }
        span:nth-child(2) {
          color: #000;
          width: 270px;
        }
      }
    }
  }
}
</style>
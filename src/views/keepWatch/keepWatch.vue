<template>
  <div class="box">
    <van-nav-bar title="巡更任务" left-text="首页" @click-left="onClickLeft" left-arrow>
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
        @confirm="overTime"
        @cancel="endTime = false"
      />
      <!-- 事件状态 -->
      <div class="baoShiType flex_f" v-if="tiaoJian">
        <p>报事类型:</p>
        <span
          v-for="(item,i) in baoShiType"
          :key="i"
          @click="leftChange(item.id,i)"
          :class="{discolor:changeLeftBackground == i}"
        >{{item.name}}</span>
      </div>
      <!-- 按钮 -->
      <div class="btn flex">
        <van-button color="#999" @click="show = false">取消</van-button>
        <van-button color="#a48f36" @click="end">确认</van-button>
      </div>
    </van-popup>
    <!-- 搜索框 -->
    <van-search v-model="value" show-action shape="round" placeholder="模糊搜索：报事人、描述、编号">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="con">
      <van-tabs v-model="active" color="#000" background="#fff" :sticky="true" @change="tab">
        <Mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="mescroll">
          <!-- 代我处理 -->
          <van-tab title="待我处理">
            <div class="null" v-if="list.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list"
              :key="i"
              @click="sign(item.id,item.endTime)"
            >
              <!-- <div class="flex col">
                <span>事件编号</span>
                <span>{{item.detailCode}}</span>
              </div>-->
              <div class="flex col">
                <span>事件名称</span>
                <span>{{item.taskName}}</span>
              </div>
              <div class="flex col">
                <span>起止时间</span>
                <span>{{item.startTime|timeFilter('ymdhm')}}~{{item.endTime|timeFilter('ymdhm')}}</span>
              </div>
              <div class="flex col">
                <span>事件状态</span>
                <span>
                  <i class="red">未完成点</i>/
                  <i>总巡更点</i>(
                  <i class="red">{{item.patrolPointIdsNoCount}}</i>/
                  <i>{{item.patrolPointIdsCount}}</i>)
                </span>
              </div>
            </div>
          </van-tab>
          <van-tab title="我已处理">
            <div class="null" v-if="list1.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list1"
              :key="i"
              @click="sign2(item.id,item.endTime)"
            >
              <!-- <div class="flex col">
                <span>事件编号</span>
                <span>{{item.detailCode}}</span>
              </div>-->
              <div class="flex col">
                <span>事件名称</span>
                <span>{{item.taskName}}</span>
              </div>
              <div class="flex col">
                <span>起止时间</span>
                <span>{{item.startTime|timeFilter('ymdhm')}}~{{item.endTime|timeFilter('ymdhm')}}</span>
              </div>
              <div class="flex col">
                <span>事件状态</span>
                <span style="color:green">
                  <i v-if="item.status == '4'" style="color:blue">已分配</i>
                  <i v-else>已完成</i>
                  (
                  <i>巡更点数</i>：
                  <i>{{item.patrolPointIdsCount}}</i>)
                </span>
              </div>
              <div class="flex col" v-if="item.status == '4'">
                <span>分配至</span>
                <span>{{item.executeUserName1}}</span>
              </div>
              <div class="cheHui flex_r" v-if="item.status == '4'">
                <van-button
                  type="primary"
                  size="mini"
                  v-if="item.flag"
                  @click.stop="out(item.id)"
                >撤回</van-button>
              </div>
            </div>
          </van-tab>
          <van-tab title="尚未开始">
            <div class="null" v-if="list2.length==0">暂无记录~</div>
            <div class="minBox" v-for="(item,i) in list2" :key="i">
              <van-checkbox
                v-model="item.checked"
                v-if="checkedFlag &&item.status !='4'"
                @click="fuXuan(item.id,item.checked)"
              />
              <!-- <div class="flex col" @click.stop="sign1(item.id,item.endTime,checkedFlag)">
                <span>事件编号</span>
                <span>{{item.detailCode}}</span>
              </div>-->
              <div class="flex col" @click.stop="sign1(item.id,item.endTime,checkedFlag)">
                <span>事件名称</span>
                <span>{{item.taskName}}</span>
              </div>
              <div class="flex col" @click.stop="sign1(item.id,item.endTime,checkedFlag)">
                <span>起止时间</span>
                <span>{{item.startTime|timeFilter('ymdhm')}}~{{item.endTime|timeFilter('ymdhm')}}</span>
              </div>
              <div class="flex col" @click.stop="sign1(item.id,item.endTime,checkedFlag)">
                <span>事件状态</span>
                <span>
                  <i class="red">未完成点</i>/
                  <i>总巡更点</i>(
                  <i class="red">{{item.patrolPointIdsNoCount}}</i>/
                  <i>{{item.patrolPointIdsCount}}</i>)
                </span>
              </div>
            </div>
            <div class="anNiu" v-if="checkedFlag">
              <van-button type="primary" size="large" color="#a48f36" @click="zhuanJiao">转发</van-button>
            </div>
          </van-tab>
          <van-tab title="已经逾期">
            <div class="null" v-if="list3.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list3"
              :key="i"
              @click="sign3(item.id,item.endTime)"
            >
              <!-- <div class="flex col">
                <span>事件编号</span>
                <span>{{item.detailCode}}</span>
              </div>-->
              <div class="flex col">
                <span>事件名称</span>
                <span>{{item.taskName}}</span>
              </div>
              <div class="flex col">
                <span>起止时间</span>
                <span>{{item.startTime|timeFilter('ymdhm')}}~{{item.endTime|timeFilter('ymdhm')}}</span>
              </div>
              <div class="flex col">
                <span>事件状态</span>
                <span>
                  <i class="red">未完成点</i>/
                  <i>总巡更点</i>(
                  <i class="red">{{item.patrolPointIdsNoCount}}</i>/
                  <i>{{item.patrolPointIdsCount}}</i>)
                </span>
              </div>
            </div>
          </van-tab>
        </Mescroll-vue>
      </van-tabs>
    </div>
    <!-- 无任务签到按钮 -->
    <div class="break">
      <van-icon
        name="https://s1.ax1x.com/2020/07/22/UHRMMq.png"
        size="20"
        @click="$router.push('/notTask')"
      />
    </div>
    <div class="break1" v-if="zhuanFa">
      <van-icon v-if="zu" name="exchange" size="20" color="rgb(45,126,249)" @click="checkedFlag1" />
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  watch: {
    $route: function(newUrl, oldUrl) {
      if (newUrl.name == 'keepWatch') {
        console.log('我刷新一下list')
        this.mescroll.resetUpScroll()
      }
    }
  },
  // 离开路由之前执行的函数,让ios可以下拉
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'keepWatch') {
      console.log('我让ios可以下拉')
      this.mescroll.setBounce(true)
    }
    next()
  },
  data() {
    return {
      active: 0, //标签页索引
      value: '', //筛选内容
      mescroll: null, // mescroll实例对象
      list: [], //待我处理List
      list1: [], //我已处理List
      list2: [], //尚未开始List
      list3: [], //已经逾期List
      baoShiType: [
        { name: '已转交', id: '1' },
        { name: '已完成', id: '2' },
        { name: '全部', id: '3' }
      ], //事件状态
      changeLeftBackground: -1, //报事类型按钮改变颜色
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
      show: false, //筛选框
      time: '', //开始时间
      time1: '', //结束时间
      minDate: new Date(1970, 1, 1),
      minDate1: new Date(),
      maxDate: new Date(3000, 10, 1),
      currentDate: new Date(),
      startTime: false, //筛选开始时间
      endTime: false, //筛选结束时间
      tiaoJian: false, //只在我已处理里显示条件筛选
      checked: false,
      checkedFlag: false,
      zhuanFa: false, //控制转发按钮
      zhuanArr: [],
      zhuan: [], //转交的任务ID
      zhuan1: '', //转交的任务ID
      zu: localStorage.getItem('zu')
    }
  },
  mounted() {
    console.log(this.active)
  },
  methods: {
    allUserName() {
      this.axios
        .get('/rest/department/getCompanyAllUser', {
          params: { id: localStorage.getItem('uid') }
        })
        .then(data => {
          console.log(data)
          console.log(this.list1)
          let arr = []
          data.forEach(item => {
            this.list1.forEach(item1 => {
              if (item.uid == item1.executeUserId) {
                this.$set(item1, 'executeUserName1', item.vserName)
              }
            })
          })
        })
    },
    // 转交
    zhuanJiao() {
      this.$router.push({
        path: '/zhuanFa',
        query: {
          taskId: this.zhuan1
        }
      })
    },
    // 撤回
    out(taskId) {
      this.keepAxios
        .post(this.baseUrl.keepAxios + '/app/patrolTask/cancelDeliver', {
          uid: localStorage.getItem('uid'),
          detailIds: taskId
        })
        .then(data => {
          console.log(data)
          if (data.data.code == 20000) {
            this.$toast(data.data.msg)
            this.mescroll.resetUpScroll()
          } else {
            this.$toast(data.data.msg)
          }
        })
    },
    p(s) {
      return s < 10 ? '0' + s : s
    },
    onClickLeft() {
      this.$router.push('/')
    },
    isShow() {
      this.show = true
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
    overTime(val) {
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
    //报事类型点击改变颜色
    leftChange(id, index) {
      this.changeLeftBackground = index
      this.reportEventTypeId = id
      console.log(id)
    },
    // 模糊查询
    onSearch() {
      this.query()
    },
    sign(val, time) {
      localStorage.setItem('time', time)
      this.$router.push({
        path: '/keepWatchDetails',
        query: {
          id: val,
          time
        }
      })
    },
    // 尚未开始
    sign1(val, time, checkedFlag) {
      console.log(checkedFlag)
      if (checkedFlag == true) {
        console.log('没反应气不气')
      } else {
        this.$router.push({
          path: '/keepWatchDetails1',
          query: {
            id: val,
            time
          }
        })
      }
    },
    // 我已处理
    sign2(val, time) {
      this.$router.push({
        path: '/keepWatchDetails1',
        query: {
          id: val,
          time
        }
      })
    },
    // 已经逾期
    sign3(val, time) {
      this.$router.push({
        path: '/keepWatchDetails1',
        query: {
          id: val,
          time
        }
      })
    },
    tab(name) {
      console.log(name)
      if (name == 0) {
        this.tiaoJian = false
        this.zhuanFa = false
        this.list = []
        this.mescroll.resetUpScroll()
      } else if (name == 1) {
        this.tiaoJian = true
        this.zhuanFa = false
        this.list1 = []
        this.mescroll.resetUpScroll()
        this.allUserName()
      } else if (name == 2) {
        this.tiaoJian = false
        this.zhuanFa = true
        this.list2 = []
        this.mescroll.resetUpScroll()
      } else {
        this.tiaoJian = false
        this.zhuanFa = false
        this.list3 = []
        this.mescroll.resetUpScroll()
      }
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      var pageNum = page.num - 1
      this.keepAxios
        .post(
          this.baseUrl.keepAxios +
            '/app/patrolTask/getPatrolTaskDetailStatusList',
          {
            page: pageNum,
            pageSize: page.size,
            uid: localStorage.getItem('uid'),
            appStatus: this.active + 1 //1：待我处理 2: 我已处理 3：尚未开始 4：已经逾期
          }
        )
        .then(data => {
          console.log(data)
          let arr = data.data.data.rows
          // ----------------------------------------------
          if (this.active == 0) {
            // 如果是第一页需手动置空列表
            if (page.num === 1) {
              // 请求的列表数据
              this.list = []
            }
            // 把请求到的数据添加到列表
            this.list = this.list.concat(arr)
            this.list.forEach(item => {
              this.$set(item, 'checked', false)
              this.$set(
                item,
                'patrolPointIdsNoCount',
                item.patrolPointIdsCount - item.patrolPointIdsEdCount
              )
            })
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true)
            })
            // ----------------------------------------------
          } else if (this.active == 1) {
            if (page.num === 1) {
              // 请求的列表数据
              this.list1 = []
            }
            // 把请求到的数据添加到列表
            this.list1 = this.list1.concat(arr)
            this.list1.forEach(item => {
              this.$set(item, 'checked', false)
              this.$set(
                item,
                'patrolPointIdsNoCount',
                item.patrolPointIdsCount - item.patrolPointIdsEdCount
              )
              let FF = new Date().getFullYear()
              let MM = this.p(new Date().getMonth() + 1)
              let DD = this.p(new Date().getDate())
              let HH = this.p(new Date().getHours())
              let fen = this.p(new Date().getMinutes())
              let SS = this.p(new Date().getSeconds())
              let time =
                FF + '/' + MM + '/' + DD + ' ' + HH + ':' + fen + ':' + SS
              if (item.startTime >= time) {
                this.$set(item, 'flag', true)
              } else {
                this.$set(item, 'flag', false)
              }
            })
            this.allUserName()
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true)
            })
            // ----------------------------------------------
          } else if (this.active == 2) {
            if (page.num === 1) {
              // 请求的列表数据
              this.list2 = []
            }
            // 把请求到的数据添加到列表
            this.list2 = this.list2.concat(arr)
            this.list2.forEach(item => {
              this.$set(item, 'checked', false)
              this.$set(
                item,
                'patrolPointIdsNoCount',
                item.patrolPointIdsCount - item.patrolPointIdsEdCount
              )
            })
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true)
            })
            // ----------------------------------------------
          } else if (this.active == 3) {
            if (page.num === 1) {
              // 请求的列表数据
              this.list3 = []
            }
            // 把请求到的数据添加到列表
            this.list3 = this.list3.concat(arr)
            this.list3.forEach(item => {
              this.$set(item, 'checked', false)
              this.$set(
                item,
                'patrolPointIdsNoCount',
                item.patrolPointIdsCount - item.patrolPointIdsEdCount
              )
            })
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true)
            })
          }

          console.log(this.list)
        })
        .catch(e => {
          console.log(e)
        })
    },
    checkedFlag1() {
      if (this.checkedFlag) {
        this.checkedFlag = false
      } else {
        this.checkedFlag = true
      }
    },
    fuXuan(id, checked) {
      console.log(checked)
      console.log(id)
      if (checked == true) {
        this.zhuanArr.push(id)
        this.zhuan = [...new Set(this.zhuanArr)]
      } else if (checked == false) {
        if (this.zhuan.indexOf(id) != -1) {
          this.zhuan.splice(this.zhuan.indexOf(id), 1)
          this.zhuanArr.splice(this.zhuanArr.indexOf(id), 1)
        }
      }
      this.zhuan1 = this.zhuan.join(',')
      console.log(this.zhuan)
    },
    // 筛选确定
    end() {
      console.log('aaa')
    },
    //筛选
    query() {
      // this.mescroll.resetUpScroll()
      // this.show = false
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  /deep/input[type='text'] {
    text-align: center;
  }
  .break {
    // background: #f5f6f7;
    position: fixed;
    right: 55px;
    top: 8px;
    z-index: 100;
    border-radius: 50%;
    .van-icon {
      padding: 5px;
    }
  }
  .break1 {
    // background: #f5f6f7;
    position: fixed;
    right: 90px;
    top: 8px;
    z-index: 100;
    border-radius: 50%;
    .van-icon {
      padding: 5px;
    }
  }
  .btn {
    padding-top: 100px;
    padding-bottom: 30px;
    .van-button--normal {
      margin: 0 30px;
      width: 127px;
    }
  }
  .anNiu {
    padding: 15px;
    position: fixed;
    bottom: 0;
    .van-button--large {
      width: 340px;
    }
  }
  .baoShiType {
    p {
      font-size: 13px;
      color: #000;
    }
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
  min-height: 100vh;
  background: #f4f5f6;
  .con {
    .mescroll {
      position: fixed;
      top: 145px;
      bottom: 0px;
      height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
    }
    .minBox {
      padding: 15px;
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
          width: 260px;
          .red {
            color: red;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="box">
    <div class="con">
      <div style="position:fixed;width:100%;z-index:999;">
        <van-search v-model="value" show-action shape="round" placeholder="模糊搜索：报事人、描述、编号">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <Mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="mescroll">
        <div class="baoGuo">
          <div
            class="maxBox"
            v-for="(item,i) in list"
            :key="i"
            @click="xuan(item.id,item.eventCode)"
            v-if="item.eventCode != eventCode1"
          >
            <div class="minBox flex">
              <p>报事类型：</p>
              <p>{{item.report_type_name}}</p>
            </div>
            <div class="minBox flex">
              <p>报事人：</p>
              <p>{{item.reporter_name}}</p>
            </div>
            <div class="minBox flex">
              <p>报事时间：</p>
              <p>{{item.createTime | teShuTime}}</p>
            </div>
            <div class="minBox flex">
              <p>事件描述：</p>
              <p class="yihang" style="width:150px">{{item.eventRemark}}</p>
            </div>
            <div class="minBox flex">
              <p>事件编号：</p>
              <p class="yihang">{{item.eventCode}}</p>
            </div>
          </div>
        </div>
      </Mescroll-vue>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
export default {
  components: {
    MescrollVue
  },
  data() {
    return {
      value: '',
      list: [], //合并数据列表
      mescrollUp: {
        isBounce: false, //是否允许ios的bounce回弹;默认true,允许回弹
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 1 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      },
      mescroll: null, // mescroll实例对象
      eventCode1: ''
    }
  },
  mounted() {
    this.eventCode1 = localStorage.getItem('eventCode')
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    // 事件选择
    upCallback(page, mescroll) {
      this.axios
        .get('/rest/tbEventReport/getSelfAllocationed', {
          params: {
            page: page.num,
            limit: page.size,
            paramName: this.value, //筛选条件
            uid: localStorage.getItem('uid')
          }
        })
        .then(data => {
          console.log(data.rows)
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
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true)
          })
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    // 模糊查询
    onSearch() {
      this.mescroll.resetUpScroll()
    },
    xuan(id, code) {
      // id.push(this.ids)
      // this.arrId.push(id)
      // let arr = [...new Set(this.arrId)]
      // this.ids = arr.join(',')
      // this.eventName.push(code) //事件编号
      // let nameArr = [...new Set(this.eventName)]
      // this.eventName1 = nameArr.join('--')
      // console.log(this.eventName1)
      // console.log(this.ids)
      // this.ids = id
      // this.eventName1 = code
      console.log(id, code)
      sessionStorage.setItem('eventIdS', id)
      sessionStorage.setItem('eventCode', code)
      this.$router.push('merge')
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f5f6f7;
  .con {
    min-height: 100vh;
    .mescroll {
      position: fixed;
      top: 5px;
      bottom: 0px;
      height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
    }
    .baoGuo {
      height: 100%;
      margin-top: 60px;
      .maxBox {
        background: #fff;
        margin: 5px;
        border-radius: 5px;
        padding: 10px;
        border-bottom: 1px solid #f4f5f6;
        .minBox {
          color: #000;
          font-size: 14px;
          p:nth-child(2) {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="box">
    <div class="con">
      <!-- 合并事件选择 -->
      <van-cell-group>
        <van-cell
          title="事件选择"
          :value="eventName1"
          is-link
          @click="$router.push('mergeTask')"
          value-class="right"
        />
      </van-cell-group>
      <!-- 合并原因描述 -->
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="合并事件描述:"
        type="textarea"
        maxlength="50"
        placeholder="请输入描述"
        show-word-limit
      />
    </div>
    <div class="btn flex">
      <van-button color="#999" @click="$router.go(-1)">取消</van-button>
      <van-button color="#A68E44" @click="merge">确认</van-button>
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
      message: '', //合并事件描述
      show: false, //何滨事件选择框
      value: '', //模糊搜索
      list: [], //合并数据列表
      ids: '', //接受要合并的事件ID
      arrId: [], //接受要合并的事件ID数组形式
      eventName: [], //事件名称数组形式
      eventName1: sessionStorage.getItem('eventCode'), //事件名称
      id: sessionStorage.getItem('id'),
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      }
    }
  },
  mounted() {},
  methods: {
    //选择完成事件
    merge() {
      this.axios
        .post('/rest/tbEventMerge/add', {
          uid: localStorage.getItem('uid'), //登录人id
          mergeEventId: sessionStorage.getItem('id'), //要合并的事件ID
          user_id: localStorage.getItem('uid'), //合并人ID
          remark: this.message,
          mainEventId: sessionStorage.getItem('eventIdS') //主事件ID
        })
        .then(data => {
          sessionStorage.removeItem('eventIdS')
          sessionStorage.removeItem('eventCode')
          this.$toast('合并成功!')
          this.$router.push('/eventList')
        })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    .mescroll {
      padding-bottom: 60px;
    }
    .content {
      padding: 16px;
    }
    .van-search {
      position: relative;
    }
    .baoGuo {
      height: 100%;
      overflow-y: auto;
      .maxBox {
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
    .title {
      font-size: 18px;
      color: #000;
      padding: 5px;
      font-weight: 700;
    }
  }
  .btn {
    padding: 50px 30px;
    .van-button--normal {
      padding: 0 1.4rem;
    }
  }
  .btn1 {
    padding: 50px 30px;
    position: fixed;
    bottom: -50px;
    .van-button--normal {
      padding: 0 1.4rem;
      margin-left: 20px;
    }
  }
}
</style>
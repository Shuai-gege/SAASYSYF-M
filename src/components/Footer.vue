<template>
  <footer>
    <van-tabbar v-model="active" active-color="#A88F40" :route="true">
      <van-tabbar-item to="/">
        <span>工作看板</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.homeActive : icon.homeNormal"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/ordermatter">
        <span>我要报事</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.hotActive : icon.hotNormal"
        />
      </van-tabbar-item>
      <!-- <van-tabbar-item @click="board">
        <span>管理层看板</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.moneyActive : icon.moneyNormal"
        />
      </van-tabbar-item>-->

      <van-tabbar-item to="/board">
        <span>管理层看板</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.moneyActive : icon.moneyNormal"
        />
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      model: '', //模式  2 非云仓
      active: 0,
      worker: '', //未处理消息数
      my: '', //待处理消息数
      icon: {
        homeNormal: require('../images/Footer/1.png'), //未选中
        homeActive: require('../images/Footer/1-1.png'), //选中

        orderNormal: require('../images/Footer/2.png'),
        orderActive: require('../images/Footer/2-2.png'),

        schoolNormal: require('../images/Footer/5.png'),
        schoolActive: require('../images/Footer/5-5.png'),

        hotNormal: require('../images/Footer/3.png'),
        hotActive: require('../images/Footer/3-3.png'),

        moneyNormal: require('../images/Footer/4.png'),
        moneyActive: require('../images/Footer/4-4.png')
      }
    }
  },
  mounted() {
    this.model = localStorage.getItem('model')

    // this.axios.post("/api/outstand_order/outorder").then(data => {
    //   this.worker =
    //     data.audit_agent + //待审核数量
    //     data.recharge + //待处理充值订单
    //     data.cash; //待处理提现订单
    //   this.my =
    //     data.lower_order + //待处理下级订单
    //     data.yun_order + //待处理云仓支付订单
    //     data.pick_order; //待处理提货支付订单
    // });
  },
  methods: {
    dian() {
      this.$toast('即将上线。尽情期待~')
    },
    board() {
      // this.$router.push('board')
      this.$toast('即将上线，尽情期待。')
    }
  }
}
</script>

<style scoped lang="less">
footer {
  padding-top: 50px;
}
</style>




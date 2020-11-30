<template>
  <div class="box">
    <van-nav-bar title="点检列表" left-text="首页" @click-left="onClickHome" left-arrow></van-nav-bar>
    <div class="con">
      <van-tabs v-model="active" color="#000" background="#fff" :sticky="true">
        <van-tab title="待我处理">
          <listComp :type="1"></listComp>
        </van-tab>
        <van-tab title="我已处理">
          <listComp :type="2"></listComp>
        </van-tab>
        <van-tab title="我发起的">
          <listComp :type="3"></listComp>
        </van-tab>
        <!-- <van-tab title="抄送我的">
          <div class="minBox">
            <div class="flex col">
              <span>报事类型</span>
              <span>设备设施</span>
            </div>
            <div class="flex col">
              <span>报事类型</span>
              <span>设备设施</span>
            </div>
            <div class="flex col">
              <span>报事类型</span>
              <span>设备设施</span>
            </div>
            <div class="flex col">
              <span>报事类型</span>
              <span>设备设施</span>
            </div>
            <div class="flex col">
              <span>报事类型</span>
              <span>设备设施</span>
            </div>
            <van-divider />
            <div class="flex col" style="color:#f00">xxx创建了事件，等待xxx处理。1小时2分</div>
          </div>
        </van-tab>-->
      </van-tabs>
    </div>
  </div>
</template>

<script>
// const oStatusMap = {
//   0: "未完成",
//   1: "已提交",
//   2: "已完成"
// };
// import { getEventListApi, getFoundingEventListApi } from "@/api/eventApi";
import listComp from "./list";
export default {
  components: { listComp },
  data() {
    return {
      // oStatusMap,
      active: 0
      // aEventPending: [],
      // loadingFlag: false,
      // finishFlag: false,
      // refreshFlag: false,
      // oPagination: {
      //   page: 0,
      //   limit: 5
      // }
    };
  },
  created() {
    // this.apiGetEventList();
    // this.test()
  },
  methods: {
    onClickHome() {
      this.$router.push("/");
    }
    // async apiGetEventList() {
    //   this.loadingFlag = false;
    //   let { code, result } = await getEventListApi({
    //     personId: "00300001",
    //     role: 3,
    //     ...this.oPagination
    //   });
    //   if (code == 20000) {
    //     this.aEventPending.push(...result.dinfolist);
    //   }
    // },
    // async apiGetFoundingEventList() {
    //   let result = await getFoundingEventListApi({
    //     personId: "00300001",
    //     role: 3,
    //     page: 0,
    //     limit: 5
    //   });
    // },
    // onPendingEvent(item) {
    //   this.$router.push({ name: "commentEventDetail", query: { id: item.id } });
    // },
    // onRefresh() {
    //   this.finishFlag = false;
    //   this.oPagination.page = 0;
    //   this.onLoad();
    // },
    // onLoad() {
    //   if (this.refreshFlag) {
    //     // 刷新，清空数据
    //     this.aEventPending = [];
    //     this.refreshFlag = false;
    //   } else {
    //     this.oPagination.page++;
    //   }
    //   if (this.aEventPending.length >= 40) {
    //     // 所有数据加载完成
    //     this.finishFlag = true;
    //   }
    //   this.loadingFlag = true;
    //   this.apiGetEventList();
    // }
  },
  mounted() {}
};
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f4f5f6;
  .p-color-red {
    color: red;
  }

  .con {
    .minBox {
      padding: 10px 15px;
      margin: 5px;
      border-radius: 15px;
      background: #fff;
      .col {
        padding: 5px 0;
        font-size: 13px;
        color: #000;
        // &:nth-child(1) {
        //   color: #b9b9b9;
        // }
        // &:nth-child(2) {
        //   color: #000;
        // }
      }
    }
  }
}
</style>
<template>
  <div class="checkout-event-detail-container">
    <van-nav-bar style="position: fixed;width: 100%;" title="事件详情" left-arrow @click-left="onBack" />
    <div class="content">
      <van-cell-group>
        <van-cell title="事件编号" :value="oEventDetail.id" />
        <van-cell title="开始时间" :value="oEventDetail.startTimeToString" />
        <van-cell title="结束时间" :value="oEventDetail.endTimeToString" />
        <van-cell
          title="实际用时"
          :value="fnActualTimeStr(oEventDetail.actualTime,oEventDetail.startTimeToString)"
        />
        <van-cell title="逾期状态" :value="oOverTimeMap[oEventDetail.overdue]" />
        <van-cell title="事件状态" :value="oStatusMap[oEventDetail.checkStatus]" />
        <van-cell title="执行人" :value="oEventDetail.assignerName" />
        <van-cell title="设备数量" :value="oEventDetail.allDetail" />
        <van-cell value-class="p-danger" title="异常设备数" :value="oEventDetail.isError" />
      </van-cell-group>
      <div class="btn-group">
        <van-button type="default" color="#A68E44" @click="onCommon">评价事件</van-button>
        <van-button type="default" color="#A68E44" @click="onDetail">事件详情</van-button>
      </div>
    </div>
  </div>
</template>

<script>
const oStatusMap = {
  0: "未完成",
  1: "已提交",
  2: "已完成"
};
const oOverTimeMap = {
  0: "未逾期",
  1: "已逾期"
};
import moment from "moment";
import { getEventDetailApi } from "../../api/eventApi";
export default {
  components: {},
  data() {
    return { oOverTimeMap, oStatusMap, oEventDetail: {} };
  },
  created() {
    this.apiGetEventDetail();
  },
  mounted() {},
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    /**
     * 跳转至评价路由
     */
    onCommon() {
      this.$router.push({
        name: "commentEvent",
        query: {
          ...this.$route.query,
          userName: this.oEventDetail.assignerName
        }
      });
    },
    /**
     * 跳转至详情路由
     */
    onDetail() {
      this.$router.push({
        name: "checkoutEventDetail",
        query: {
          ...this.$route.query,
          userName: this.oEventDetail.assignerName,
          type: "detail"
        }
      });
    },
    async apiGetEventDetail() {
      let result = await getEventDetailApi({
        id: this.$route.query.id
      });
      if (result) {
        this.oEventDetail = result.dinfo;
      }
    },
    /**
     * 实际用时事件格式化
     */
    fnActualTimeStr(actual, start) {
      let mActual = moment(actual);
      let mStart = moment(start);
      let duration = moment.duration(mActual.diff(mStart)).asMinutes();
      return `${parseInt(duration / 60)}小时${parseInt(duration % 60)}分`;
    }
  },
  computed: {
    // ...mapState(["eventInfo"])
  }
};
</script>
<style lang='less' scoped>
.checkout-event-detail-container {
  min-height: 100vh;
  background: #f4f5f6;
  .p-danger {
    color: red;
  }
  .content {
    padding-top: 55px;
  }
  .btn-group {
    padding: 12px 10px 0;
    display: flex;
    justify-content: space-between;
    .van-button {
      width: 48%;
      border-radius: 6px;
    }
  }
}
</style>
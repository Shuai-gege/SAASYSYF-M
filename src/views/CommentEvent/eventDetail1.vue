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
        <van-cell title="异常设备数" value-class="p-danger" :value="oEventDetail.isError" />
        <van-cell title="评价人" :value="oEventDetail.examinerName" />
        <van-cell title="评分" :value="oEventDetail.score" />
        <van-cell title="工作效率">
          <template #right-icon>
            <van-rate
              v-model="oEventDetail.serviceScore"
              :size="14"
              :count="10"
              readonly
              color="#A68E44"
              void-icon="star"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <van-cell title="安全警示">
          <template #right-icon>
            <van-rate
              v-model="oEventDetail.capabilityScore"
              :size="14"
              :count="10"
              readonly
              color="#A68E44"
              void-icon="star"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <van-cell title="工作质量">
          <template #right-icon>
            <van-rate
              v-model="oEventDetail.speedScore"
              :size="14"
              :count="10"
              readonly
              color="#A68E44"
              void-icon="star"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <van-cell title="备注" :label="oEventDetail.remark" />
      </van-cell-group>
      <div class="btn-group">
        <!-- <van-button type="default" color="#999999">评价事件</van-button> -->
        <van-button type="default" color="#A68E44" @click="onDetail">事件详情</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompleteEventDetailApi } from "../../api/eventApi";
import { mapState, mapActions } from "vuex";
import moment from "moment";
const oStatusMap = {
  0: "未完成",
  1: "已提交",
  2: "已完成"
};
const oOverTimeMap = {
  0: "未逾期",
  1: "已逾期"
};
export default {
  components: {},
  data() {
    return {
      oStatusMap,
      oOverTimeMap,
      oEventDetail: {}
    };
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
     * 跳转至详情页面
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
    /**
     * 获取事件详情API
     */
    async apiGetEventDetail() {
      let result = await getCompleteEventDetailApi({
        id: this.$route.query.id
      });
      if (result) {
        this.oEventDetail = result.dinfo;
      }
    },
    /**
     * 实际用时时间格式化
     */
    fnActualTimeStr(actual, start) {
      let mActual = moment(actual);
      let mStart = moment(start);
      let duration = moment.duration(mActual.diff(mStart)).asMinutes() || 0;
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
    justify-content: center;
    .van-button {
      width: 100%;
      border-radius: 6px;
    }
  }
}
</style>
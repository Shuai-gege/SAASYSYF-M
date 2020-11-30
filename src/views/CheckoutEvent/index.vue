<template>
  <div class="checkout-event-container">
    <van-nav-bar title="点检事件" left-arrow @click-left="onBack" />
    <div class="content">
      <van-cell-group>
        <van-cell title="事件编号" :value="oEvent.eventNo" />
        <van-cell
          title="人员选择"
          is-link
          arrow-direction="down"
          :value="oEvent.userName"
          @click="onUserSelect"
        />
        <van-cell
          title="设备选择"
          is-link
          arrow-direction="down"
          :value="oEvent.aDevice.length <= 0 ? '未选择' : oEvent.aDevice.length"
          @click="onEquipmentSelect"
        />
      </van-cell-group>
      <van-field
        readonly
        clickable
        name="datetimePicker"
        input-align="right"
        :value="oEvent.startTime"
        label="指定开始时间"
        placeholder="点击选择时间"
        @click="onDateShow"
      />
      <van-field
        v-model="oEvent.duration"
        input-align="right"
        type="number"
        label="指定计划工时"
        placeholder="(小时)"
      />
      <div class="p-event-label">事件描述</div>
    </div>
    <van-form>
      <van-field
        v-model="oEvent.details"
        rows="1"
        :autosize="{minHeight:150}"
        type="textarea"
        placeholder="填入事件的详细情况"
        maxlength="200"
        show-word-limit
      />
    </van-form>
    <van-popup v-model="dateSheetVisible" position="bottom">
      <van-datetime-picker
        v-model="dateTime"
        type="datetime"
        @confirm="onConfirmDate"
        @cancel="onCancelDate"
      />
    </van-popup>
    <div class="btn flex">
      <van-button color="#999" @click="onCancel">取消</van-button>
      <van-button color="#A68E44" @click="onConfirm">确定</van-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import { saveEventApi } from "../../api/eventApi";
import cloneDeep from "lodash/cloneDeep";
export default {
  components: {},
  data() {
    return {
      activeNames: [1],
      dateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      password: "",
      message: "",
      showPicker: false,
      oEvent: {
        startTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        details: "",
        assignerId: "",
        aDevice: [],
        duration: ""
      },
      dateSheetVisible: false,
      uid: localStorage.getItem("uid")
    };
  },
  created() {
    this.fnInitPage();
  },
  mounted() {},
  methods: {
    // formatter(type, val) {
    //   // debugger
    //   if (type === "year") {
    //     return `${val}年`;
    //   } else if (type === "month") {
    //     return `${val}月`;
    //   }
    //   return val;
    // },
    ...mapActions(["setEvent"]),
    /**
     * 页面初始化
     */
    fnInitPage() {
      if (this.eventInfo.oEventInfo) {
        this.oEvent = this.eventInfo.oEventInfo;
      } else {
        // setTimeout(() => {
        //   this.oEvent = { eventNo: "123456788", startTime: "", details: "1" };
        // }, 2000);
      }
    },
    /**
     * 回退按钮事件
     */
    onBack() {
      this.$router.push({ name: "home" });
    },
    /**
     * 用户选择 -> 跳转至人员选择路由
     */
    onUserSelect() {
      this.setEvent(this.oEvent);
      this.$router.push({
        name: "userSelect"
      });
    },
    /**
     * 设备选择 -> 跳转至设备选择路由
     */
    onEquipmentSelect() {
      this.setEvent(this.oEvent);
      this.$router.push({
        name: "equipmentSelect"
      });
    },
    /**
     * 日期选择弹框
     */
    onDateShow() {
      let timeStamp = moment(this.oEvent.startTime).valueOf();
      this.dateTime = new Date(timeStamp);
      this.dateSheetVisible = true;
    },
    /**
     * 日期选择确定事件
     */
    onConfirmDate() {
      this.oEvent.startTime = moment(this.dateTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.dateSheetVisible = false;
    },
    /**
     * 日期选择取消事件
     */
    onCancelDate() {
      this.dateSheetVisible = false;
    },
    /**
     * 事件分配确定事件
     */
    onConfirm() {
      if (!this.oEvent.assignerId) {
        // this.$notify({ type: 'danger', message: '未选择人员！' })
        this.$toast("未选择人员！");
        return;
      }
      if (this.oEvent.aDevice.length <= 0) {
        // this.$notify({ type: 'danger', message: '未选择设备！' })
        this.$toast("未选择设备！");
        return;
      }
      if (!this.oEvent.startTime) {
        // this.$notify({ type: 'danger', message: '未选择开始时间！' })
        this.$toast("未选择开始时间！");
        return;
      }
      if (!this.oEvent.duration) {
        // this.$notify({ type: 'danger', message: '未输入时长！' })
        this.$toast("未输入时长！");
        return;
      }
      this.apiSaveEvent();
    },
    /**
     * 事件分配取消事件
     */
    onCancel() {
      this.$router.go(-1);
    },
    /**
     * 保存事件分配API
     */
    async apiSaveEvent() {
      let params = cloneDeep(this.oEvent);
      params.deviceId = params.aDevice.join(",");
      params.endTime = moment(params.startTime)
        .add(Number(params.duration), "h")
        .format("YYYY-MM-DD HH:mm:ss");
      params.examinerId = this.uid; // 分配人id，缓存中取
      let result = await saveEventApi(params);
      // if (result) {
      this.$router.push({ name: "home" });
      // }
    }
  },
  computed: {
    ...mapState(["eventInfo"])
  }
};
</script>
<style lang='less' scoped>
.checkout-event-container {
  min-height: 100vh;
  background: #f4f5f6;
  .content {
    margin-top: 12px;
    .p-event-label {
      padding: 10px;
      font-size: 12px;
      color: #999999;
    }
  }
  .btn {
    padding: 15px;
    .van-button--normal {
      border-radius: 6px;
    }
  }
}
</style>
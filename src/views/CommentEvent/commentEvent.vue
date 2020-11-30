<template>
  <div class="checkout-event-detail-container">
    <van-nav-bar style="position: fixed;width: 100%;" title="评价事件" left-arrow @click-left="onBack" />
    <div class="content">
      <van-cell-group>
        <van-cell title="事件处理评价" />
        <van-cell title="被评价人" :value="oComment.userName" />
        <van-cell title="工作效率">
          <template #right-icon>
            <van-rate
              v-model="oComment.serviceScore"
              :size="14"
              :count="10"
              color="#A68E44"
              void-icon="star"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <van-cell title="安全警示">
          <template #right-icon>
            <van-rate
              v-model="oComment.capabilityScore"
              :size="14"
              :count="10"
              color="#A68E44"
              void-icon="star"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <van-cell title="工作质量">
          <template #right-icon>
            <van-rate
              v-model="oComment.speedScore"
              :size="14"
              :count="10"
              color="#A68E44"
              void-icon="star"
              void-color="#eee"
            />
          </template>
        </van-cell>
        <div class="p-event-label">备注</div>
        <van-field
          v-model="oComment.remark"
          rows="1"
          :autosize="{minHeight:150}"
          type="textarea"
          placeholder="填入备注信息"
          maxlength="200"
          show-word-limit
        />
      </van-cell-group>
      <div class="btn-group">
        <van-button type="default" color="#999999" @click="onCancel">取消</van-button>
        <van-button type="default" color="#A68E44" @click="onConfirm">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { saveEventRateApi } from "../../api/eventApi";
export default {
  components: {},
  data() {
    return {
      oComment: {
        id: this.$route.query.id,
        userName: this.$route.query.userName || "",
        score: 0,
        serviceScore: 0,
        capabilityScore: 0,
        speedScore: 0,
        remark: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onCancel() {
      this.$router.go(-1);
    },
    onConfirm() {
      this.apiSaveEventRate();
    },
    async apiSaveEventRate() {
      let result = await saveEventRateApi(this.oComment);
      this.$router.push({
        name: "home"
      });
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
    .p-event-label {
      background-color: #f4f5f6;
      padding: 10px;
      font-size: 12px;
      color: #999999;
    }
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
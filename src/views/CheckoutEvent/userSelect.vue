<template>
  <div class="checkout-event-user-container">
    <van-nav-bar title="人员选择" left-arrow @click-left="onBack" />
    <div class="content">
      <div class="p-input-block">
        <van-field v-model="inputValue" placeholder="模糊查找" @blur="fnNameBlurHandler" />
        <van-radio-group v-model="assignerId">
          <van-collapse v-model="activeDepartmentId" accordion>
            <van-collapse-item
              :name="item.departmentId"
              v-for="item in aUser"
              :key="item.departmentId"
            >
              <template #title>
                <div>{{item.departmentName}}({{item.sumnum}})</div>
              </template>
              <van-cell v-for="subItem in item.userList" :key="subItem.uid">
                <van-radio icon-size="16px" :name="subItem.uid">{{ subItem.vserName }}</van-radio>
              </van-cell>
            </van-collapse-item>
            <div class="p-no-data-tips" v-if="aUser.length <= 0">未查询到数据</div>
          </van-collapse>
        </van-radio-group>
      </div>
      <div class="btn-group">
        <div class="cancel" @click="onCancel">取消</div>
        <div class="confirm" @click="onConfirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompUserListApi, getUserListApi } from "../../api/eventApi";
import { mapState, mapActions } from "vuex";
import cloneDeep from "lodash/cloneDeep";
export default {
  components: {},
  data() {
    return {
      assignerId: "",
      inputValue: "",
      activeDepartmentId: '',
      aUser: [],
      companyId: localStorage.getItem("companyId"),
      deptId: localStorage.getItem("deptid")
    };
  },
  created() {
    // this.fnInitPage();
    this.apiGetUserList();
  },
  mounted() {},
  methods: {
    ...mapActions(["setEventUser"]),
    /**
     * 人员选择确认按钮事件
     */
    onConfirm() {
      let user = {};
      this.aUser.forEach(item => {
        item.userList.forEach(itemA => {
          if (itemA.uid == this.assignerId) {
            user = itemA;
          }
        });
      });
      this.setEventUser({
        id: this.assignerId,
        name: user.vserName
      });
      this.$router.push({ name: "checkoutEvent" });
    },
    onCancel() {
      this.$router.go(-1);
    },
    /**
     * 页面初始化
     */
    fnInitPage() {
      if (this.eventInfo.oEventInfo) {
        // this.oEvent = this.eventInfo.oEventInfo;
      } else {
        // setTimeout(() => {
        //   this.oEvent = { eventNo: "123456788" };
        // }, 2000);
      }
    },
    onBack() {
      this.$router.go(-1);
    },
    /**
     * 获取人员列表API
     */
    async apiGetUserList(name) {
      let result = await getUserListApi({
        TenantId: this.companyId,
        departmentId: this.deptId,
        name: name || ""
      });
      // let { code, result } = await getUserListApi({
      //   TenantId: this.companyId,
      //   name: name || ""
      // });
      // if (code == 20000 && result) {
      if (result) {
        this.aUser = this.fnUserFormatter(result);
      }
    },
    /**
     * 人员数据格式化
     */
    fnUserFormatter(result) {
      result.dinfolist.forEach(item => {
        item.userList = result.dinfomap[item.deptid] || [];
      });
      return result.dinfolist;
    },
    /**
     * 姓名搜索失焦回调
     */
    fnNameBlurHandler() {
      this.apiGetUserList(this.inputValue);
    }
  },
  computed: {
    // ...mapState(["eventInfo"])
  }
};
</script>
<style lang='less' scoped>
.checkout-event-user-container {
  min-height: 100vh;
  background: #f4f5f6;
  .content {
    padding: 15px;
    border-radius: 10px;
    .p-input-block {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #ffffff;
      border-bottom: 1px solid #f4f5f6;
      & /deep/ .van-field {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .van-field__value {
          background-color: #f4f5f6;
          border-radius: 12px;
          padding-left: 10px;
        }
      }
    }
    .btn-group {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      height: 46px;
      background-color: #ffffff;
      display: flex;
      font-size: 14px;
      .cancel {
        border-right: 1px solid #f4f5f6;
        border-bottom-left-radius: 10px;
      }
      .confirm {
        border-bottom-right-radius: 10px;
      }
      .cancel,
      .confirm {
        background-color: transparent;
        flex-basis: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .p-no-data-tips {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      font-size: 14px;
    }
  }
}
</style>
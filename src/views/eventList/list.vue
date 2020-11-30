<template>
  <div class="p-list">
    <van-pull-refresh v-model="refreshFlag" @refresh="onRefresh">
      <van-list
        v-model="loadingFlag"
        :finished="finishFlag"
        finished-text="没有更多了"
        :offset="0"
        @load="onLoad"
      >
        <div
          class="minBox"
          v-for="item in aEventPending"
          :key="item.id"
          @click="onPendingEvent(item)"
        >
          <div class="flex col">
            <span>事件编号</span>
            <span>{{item.checkNo}}</span>
          </div>
          <div class="flex col">
            <span>分配人:</span>
            <span>{{item.examinerName}}</span>
          </div>
          <div class="flex col">
            <span>执行人:</span>
            <span>{{item.assignerName}}</span>
          </div>
          <div class="flex col">
            <span>事件起始时间:</span>
            <span>{{item.startTimeToString}}</span>
          </div>
          <div class="flex col">
            <span>事件结束时间:</span>
            <span>{{item.endTimeToString}}</span>
          </div>
          <div class="flex col">
            <span>事件状态:</span>
            <div v-if="item.checkStatus == 0">
              <span class="p-color-red">{{oStatusMap[item.checkStatus]}}</span>(
              <span class="p-color-red">{{item.allDetail - item.complete}}</span>/
              <span>{{item.allDetail}}</span>)
            </div>
            <div v-if="item.checkStatus == 1">
              <span>{{oStatusMap[item.checkStatus]}}</span>
            </div>
            <div v-if="item.checkStatus == 2">
              <span>{{oStatusMap[item.checkStatus]}}</span>
            </div>
          </div>
          <div class="flex col">
            <span>逾期状态:</span>
            <div>
              <span
                :class="[fnOverTimeStr(item.actualTime,item.endTimeToString).flag?'p-color-blue':'p-color-red']"
              >{{fnOverTimeStr(item.actualTime,item.endTimeToString).str}}</span>
            </div>
          </div>
          <van-divider />
          <div class="flex col" style="color:#f00;display:flex;justify-content:flex-end;">
            <span>{{fnTips(item)}}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
const oStatusMap = {
  0: "未完成",
  1: "已提交",
  2: "已完成"
};
import {
  getEventListApi1,
  getEventListApi2,
  getEventListApi3,
  getFoundingEventListApi
} from "../../api/eventApi";
import moment from "moment";
export default {
  props: {
    type: {
      required: true,
      default: 1
    }
  },
  data() {
    return {
      oStatusMap,
      aEventPending: [],
      loadingFlag: false,
      finishFlag: false,
      refreshFlag: false,
      oPagination: {
        page: 1,
        limit: 5
      },
      userInfo: JSON.parse(localStorage.getItem("userInfo")) || {}
    };
  },
  methods: {
    /**
     * type: 1: 待处理 2: 已处理
     */
    async apiGetEventList() {
      // let checkStatus = 0;

      // if ([1, 2].includes(Number(this.userInfo.personRole)) && this.type == 1) {
      //   checkStatus = 0;
      // }
      // if ([1, 2].includes(Number(this.userInfo.personRole)) && this.type == 2) {
      //   checkStatus = 1;
      // }
      // if (this.userInfo.personRole == 3 && this.type == 1) {
      //   checkStatus = 1;
      // }
      // if (this.userInfo.personRole == 3 && this.type == 2) {
      //   checkStatus = 2;
      // }
      let obj = {
        1: getEventListApi1,
        2: getEventListApi2,
        3: getEventListApi3
      };
      this.loadingFlag = false;
      let result = await obj[this.type]({
        personId: localStorage.getItem("uid"),
        ...this.oPagination
      });
      let index1 = 0;
      let index2 = 0;
      if (result.hasOwnProperty("dinfolist1")) {
        index1++;
        if (result.dinfolist1.length < this.oPagination.limit) {
          index2++;
        }
      }
      if (result.hasOwnProperty("dinfolist2")) {
        index1++;
        if (result.dinfolist2.length < this.oPagination.limit) {
          index2++;
        }
      }
      if (result.hasOwnProperty("dinfolist3")) {
        index1++;
        if (result.dinfolist3.length < this.oPagination.limit) {
          index2++;
        }
      }
      if (index1 == index2) {
        this.finishFlag = true;
      }
      let list = [
        ...(result.dinfolist1 || []),
        ...(result.dinfolist2 || []),
        ...(result.dinfolist3 || [])
      ];
      this.aEventPending.push(...list);

      // let { code, result } = await getEventListApi({
      //   personId: localStorage.getItem("uid"),
      //   ...this.oPagination
      // });
      // if (code == 20000) {
      //   if (result.dinfolist.length < this.oPagination.limit) {
      //     this.finishFlag = true;
      //   }
      //   this.aEventPending.push(...result.dinfolist);
      // }
    },
    // async apiGetFoundingEventList() {
    //   let result = await getFoundingEventListApi({
    //     personId: "00300001",
    //     role: 3,
    //     page: 0,
    //     limit: 5
    //   });
    // },
    onPendingEvent(item) {
      if (item.checkStatus == 0 && this.type == 1) {
        this.$router.push({
          name: "checkoutEventDetail",
          query: { id: item.id }
        });
      }
      if (item.checkStatus == 1 && this.type == 1) {
        this.$router.push({
          name: "commentEventDetail",
          query: { id: item.id }
        });
      }
      if (this.type == 2 || this.type == 3) {
        this.$router.push({
          name: "commentEventDetail1",
          query: { id: item.id }
        });
      }

      // this.$router.push({ name: "commentEventDetail", query: { id: item.id } });
    },
    onRefresh() {
      this.loadingFlag = true;
      this.finishFlag = false;
      this.oPagination.page = 1;
      this.onLoad();
    },
    onLoad() {
      if (this.refreshFlag) {
        // 刷新，清空数据
        this.aEventPending = [];
        this.refreshFlag = false;
      } else {
        this.oPagination.page++;
      }
      // if (this.aEventPending.length >= 40) {
      //   // 所有数据加载完成
      //   this.finishFlag = true;
      // }

      this.apiGetEventList();
    },
    fnOverTimeStr(actual, date) {
      // if (this.type == 1) {
      let cur = actual ? moment(actual) : moment();
      let fur = moment(date);
      if (cur < fur) {
        let duration = moment.duration(fur.diff(cur)).asMinutes();
        return {
          flag: true,
          str: `未逾期 (剩余${parseInt(duration / 60)}小时${parseInt(
            duration % 60
          )}分)`
        };
      } else {
        let duration = moment.duration(fur.diff(cur)).asMinutes();
        return {
          flag: false,
          str: `已逾期 (剩余${parseInt(duration / 60)}小时${parseInt(
            duration % 60
          )}分)`
        };
      }
      // }
    },
    fnTips(item) {
      if (item.checkStatus == 0) {
        return `${item.examinerName}创建了事件，等待${item.assignerName}处理。`;
      }
      if (item.checkStatus == 1) {
        return `${item.assignerName}完成事件，等待${item.examinerName}验收。`;
      }
      if (item.checkStatus == 2) {
        return `${item.examinerName}验收事件通过，事件结束。`;
      }
    }
  },
  created() {
    this.apiGetEventList();
  },
  computed: {}
};
</script>

<style lang='less' scoped>
.p-list {
  .p-color-red {
    color: red;
  }
  .p-color-blue {
    color: blue;
  }
  .minBox {
    padding: 10px 15px;
    margin: 5px;
    border-radius: 15px;
    background: #fff;
    .col {
      padding: 5px 0;
      font-size: 13px;
      color: #000;
    }
  }
}
</style>
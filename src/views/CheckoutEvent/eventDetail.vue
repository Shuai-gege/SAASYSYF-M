<template>
  <div class="checkout-event-detail-container">
    <van-nav-bar style="position: fixed;width: 100%;" title="事件详情" left-arrow @click-left="onBack" />
    <div class="content">
      <div class="top-block">
        <div class="left">
          <span style="margin-right: 8px;">未完成/总数</span>
          <span class="p-danger">{{oEventInfo.incomplete || 0}}</span>/
          <span>{{oEventInfo.allDetail || 0}}</span>
        </div>
        <div class="right">
          <span style="margin-right: 8px;">异常/总数</span>
          <span class="p-danger">{{oEventInfo.isError || 0}}</span>/
          <span>{{oEventInfo.allDetail || 0}}</span>
        </div>
      </div>
      <!-- <van-pull-refresh v-model="refreshFlag" @refresh="onRefresh"> -->
      <van-list v-model="loadingFlag" :finished="finishFlag" @load="onLoad">
        <van-cell v-for="(item,index) in aEvent" :key="item.id" :title="item.name" center>
          <template #title>
            <div
              :class="['cell-item',item.checkStatus == 0 ? 'p-danger' : '']"
              @click="onItemDetail(item)"
            >
              <div class="item-index">{{index + 1}}</div>
              <div class="item-position">{{item.buildingName}}/{{item.floorName}}</div>
              <!-- <div class="item-position">{{item.floorName}}</div> -->
              <div class="item-architecture">{{item.name}}</div>
              <div
                :class="['item-status', item.checkStatus == 2 ? 'p-danger' : '']"
              >{{oStatusMap[item.checkStatus]}}</div>
            </div>
          </template>
        </van-cell>
      </van-list>
      <!-- </van-pull-refresh> -->
      <div class="btn-group" v-if="pageType != 'detail'">
        <van-button type="default" color="#A68E44" @click="onScanCode">扫描二维码</van-button>
      </div>
    </div>
    <van-popup v-model="itemVisible">
      <div class="pop-content">
        <div class="title">{{oEquipmentInfo.name}}</div>
        <van-cell-group>
          <van-cell
            title="设备位置"
            :value="oEquipmentInfo.buildingName + '/' + oEquipmentInfo.floorName"
          />
          <van-cell title="检查时间" :value="oEquipmentInfo.checkTime" />
          <van-cell title="状态" :value="oStatusMap[oEquipmentInfo.checkStatus]" />
          <van-cell title="备注" :value="oEquipmentInfo.checkRemark" />
          <van-uploader v-model="fileList" :show-upload="false" multiple />
          <!-- <div class="van-uploader">
            <div class="van-uploader__wrapper">
              <div class="van-uploader__preview">
                <div class="van-image van-uploader__preview-image">
                  <img
                    :src="oEquipmentInfo.remark"
                    class="van-image__img"
                    style="object-fit: cover;"
                  />
                </div>
              </div>
            </div>
          </div>-->
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
const oStatusMap = {
  0: "-",
  1: "已检查",
  2: "异常"
};
import {
  getEventDetailListApi,
  getEquipmentDetailApi
} from "../../api/eventApi";
import { WXScanQRCode } from "@/common/wx_config";
export default {
  components: {},
  data() {
    return {
      oStatusMap,
      loadingFlag: false,
      finishFlag: false,
      refreshFlag: false,
      aEvent: [],
      aEventId: [],
      oEventInfo: {},
      itemVisible: false,
      oEquipmentInfo: {},
      fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
      ],
      pageType: this.$route.query.type
    };
  },
  created() {
    this.apiGetEventDetailList();
  },
  mounted() {},
  methods: {
    onRefresh() {
      this.finishFlag = false;
      this.oPagination.page = 0;
      this.onLoad();
    },
    onLoad() {
      // if (this.refreshFlag) {
      //   // 刷新，清空数据
      //   this.aEventPending = [];
      //   this.refreshFlag = false;
      // } else {
      //   this.oPagination.page++;
      // }
      // if (this.aEventPending.length >= 40) {
      //   // 所有数据加载完成
      //   this.finishFlag = true;
      // }
      this.loadingFlag = false;
      this.apiGetEventDetailList();
    },
    onBack() {
      this.$router.go(-1);
    },
    /**
     * 设备点击事件（打开弹窗展示详情）
     */
    onItemDetail(item) {
      if (this.pageType == "detail") {
        this.itemVisible = true;
        this.apiGetEquipmentDetail(item.detailId);
      } else {
        //  temp 跳转
        // this.onScanCode(item);
      }
    },
    /**
     * 扫描二维码事件
     */
    onScanCode(item) {
      WXScanQRCode(result => {
        console.log("scanResult:", result.resultStr);
        console.log("aEventId:", this.aEventId);
        if (this.aEventId.includes(Number(result.resultStr))) {
          let data = this.aEvent.filter(item => {
            return item.id == result.resultStr;
          });
          this.$router.push({
            name: "checkoutEventEquipmentDetail",
            query: { detailId: (data[0] || {}).detailId }
          });
        } else {
          this.$toast("二维码无效");
        }
      });
    },
    /**
     * 获取设备列表API
     */
    async apiGetEventDetailList() {
      let result = await getEventDetailListApi({
        id: this.$route.query.id
      });
      console.log("getEventDetailListApi:", result);
      if (result) {
        this.oEventInfo = result.dinfo;
        this.aEvent = result.dinfolist;
        this.aEventId = result.dinfolist.map(item => item.id);
      }
    },
    /**
     * 获取设备详情API
     */
    async apiGetEquipmentDetail(id) {
      let result = await getEquipmentDetailApi({ detailId: id });
      if (result) {
        this.oEquipmentInfo = result.dinfo;
        if (result.dinfo.checkImg) {
          this.fileList = result.dinfo.checkImg.split(",").map(item => {
            return { url: item };
          });
          // this.fileList = [
          //   {
          //     url: `${result.dinfo.checkImg}`
          //     // url: `http://am.tdcheck.cn/o2o-dh-image/${result.dinfo.checkImg}`
          //   }
          // ];
        } else {
          this.fileList = [];
        }
      }
      console.log("getEquipmentDetailApi:", result);
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
    .top-block {
      display: flex;
      height: 38px;
      background-color: #ffffff;
      border-bottom: 1px solid #f4f5f6;
      .left {
        border-right: 1px solid #f4f5f6;
      }
      .left,
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
      }
    }

    .cell-item {
      display: flex;
      justify-content: space-between;

      .item-index {
        min-width: 18px;
      }
      .item-position,
      .item-architecture {
        width: calc((100% - 50px) / 2);
        flex-shrink: 1;
      }
      .item-status {
        min-width: 45px;
      }
    }
  }
  .btn-group {
    padding: 12px 10px 0;
    .van-button {
      width: 100%;
      border-radius: 6px;
    }
  }
  .van-popup {
    width: calc(100% - 50px);
    border-radius: 10px;
    .pop-content {
      .title {
        padding: 10px 16px;
        font-size: 18px;
        color: #323233;
      }
      & /deep/ .van-uploader {
        padding: 15px;
        .van-uploader__preview {
          .van-uploader__preview-delete {
            display: none;
          }
        }
      }
    }
  }
}
</style>
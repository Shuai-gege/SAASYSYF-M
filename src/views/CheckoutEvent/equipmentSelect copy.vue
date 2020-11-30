<template>
  <div class="checkout-event-architecture-container">
    <van-nav-bar title="设备选择" left-arrow @click-left="onBack" />
    <div class="content">
      <van-cell class="cell-architecture" title="建筑" is-link @click="onBuilding" />
      <van-cell title="楼层" is-link @click="onFloor" />
      <van-cell title="设备类型" is-link @click="onEquipmentType" />
      <div>
        <van-collapse v-model="test">
          <van-collapse-item :name="item.id" v-for="item in result.buildlist" :key="item.id">
            <template #title>
              <div>{{item.buildingName}}</div>
            </template>
            <van-checkbox-group
              v-model="item.typeSelect"
              ref="checkboxGroup1"
              @change="onTypeChange(item,item.typeSelect)"
            >
              <van-collapse v-model="test2">
                <van-collapse-item :name="itemA.id" v-for="itemA in item.typelist" :key="itemA.id">
                  <template #title>
                    <div style="display: flex;">
                      <van-checkbox :name="itemA.type"></van-checkbox>
                      <span style="margin-left: 10px;">{{itemA.typeName}}</span>
                    </div>
                    <!-- <div>{{itemA.typeName}}</div> -->
                  </template>
                  <van-checkbox-group
                    v-model="itemA.equipSelect"
                    @change="onEquipChange(itemA, item.typeSelect)"
                    ref="checkboxGroup"
                  >
                    <van-cell v-for="itemB in itemA.equipList" :key="itemB.id">
                      <van-checkbox :name="itemB.name">{{itemB.name}}</van-checkbox>
                    </van-cell>
                  </van-checkbox-group>
                </van-collapse-item>
              </van-collapse>
            </van-checkbox-group>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div class="btn-group">
        <div class="cancel" @click="onCancel">取消</div>
        <div class="confirm" @click="onConfirm">确定</div>
      </div>
    </div>
    <van-action-sheet v-model="actionSheetVisible" :title="actionSheetTitle">
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  getBuildingListApi,
  getFloorListApi,
  getTypeListApi
} from "../../api/eventApi";
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      test: [],
      test2: [],
      actionSheetVisible: false,
      actionSheetTitle: "",
      selectType: "",
      aBuilding: [],
      aFloor: [],
      aEquipment: [],
      result: {
        dinfomap: {
          "1": [
            {
              page: 0,
              limit: 0,
              sidx: null,
              sord: null,
              id: 1,
              checkStatus: null,
              checkTime: null,
              name: "电冰箱",
              type: 1,
              brand: 1,
              model: 1,
              building: "1c83114a8de647f0bb9a710d6111ca11",
              floor: "38b6d421fba445efb0cffdcb3a7792be",
              companyId: null,
              putTime: "2020-04-04",
              remark: "123",
              imgUrl: "123",
              createTime: "2020-04-04T00:00:00.000+0000",
              modifyTime: "2020-04-04T00:00:00.000+0000",
              creator: "123",
              modifier: "1",
              typeName: null,
              brandName: null,
              modelName: null,
              buildingName: "",
              floorName: "",
              qrUrl: null
            },
            {
              page: 0,
              limit: 0,
              sidx: null,
              sord: null,
              id: 2,
              checkStatus: null,
              checkTime: null,
              name: "燃烧器",
              type: 1,
              brand: 1,
              model: 1,
              building: "1c83114a8de647f0bb9a710d6111ca11",
              floor: "38b6d421fba445efb0cffdcb3a7792be",
              companyId: null,
              putTime: "2020-04-09",
              remark: "123",
              imgUrl: "img/coc.jpg",
              createTime: "2020-04-09T01:58:28.000+0000",
              modifyTime: "2020-04-09T01:58:28.000+0000",
              creator: "123",
              modifier: "1",
              typeName: null,
              brandName: null,
              modelName: null,
              buildingName: "",
              floorName: "",
              qrUrl: null
            }
          ],
          "3": [
            {
              page: 0,
              limit: 0,
              sidx: null,
              sord: null,
              id: 5,
              checkStatus: null,
              checkTime: null,
              name: "1#消防栓",
              type: 3,
              brand: 1,
              model: 1,
              building: "1c83114a8de647f0bb9a710d6111ca11",
              floor: "38b6d421fba445efb0cffdcb3a7792be",
              companyId: null,
              putTime: "2020-03-21",
              remark: "哈哈哈",
              imgUrl:
                "http://localhost:8081/public/rest/img/2020-04-10_598491.jpg",
              createTime: "2020-04-07T10:08:11.000+0000",
              modifyTime: "2020-04-09T20:29:23.000+0000",
              creator: "49162328460d4481a98254b1b0ea50d3",
              modifier: "1",
              typeName: null,
              brandName: null,
              modelName: null,
              buildingName: "",
              floorName: "",
              qrUrl: null
            },
            {
              page: 0,
              limit: 0,
              sidx: null,
              sord: null,
              id: 6,
              checkStatus: null,
              checkTime: null,
              name: "111",
              type: 3,
              brand: 1,
              model: 1,
              building: "1c83114a8de647f0bb9a710d6111ca11",
              floor: "a0fd97c2f63546499a408a5e35365d7f",
              companyId: null,
              putTime: "2020-04-16",
              remark: "11111",
              imgUrl:
                "http://localhost:8081/public/rest/img/2020-04-10_462893.jpg",
              createTime: "2020-04-07T13:38:20.000+0000",
              modifyTime: "2020-04-09T20:23:12.000+0000",
              creator: "1",
              modifier: "1",
              typeName: null,
              brandName: null,
              modelName: null,
              buildingName: "",
              floorName: "",
              qrUrl: null
            }
          ]
        },
        typelist: [
          {
            page: 0,
            limit: 0,
            sidx: null,
            sord: null,
            id: 1,
            checkStatus: null,
            checkTime: null,
            name: "电冰箱",
            type: 1,
            brand: 1,
            model: 1,
            building: "1c83114a8de647f0bb9a710d6111ca11",
            floor: "38b6d421fba445efb0cffdcb3a7792be",
            companyId: null,
            putTime: "2020-04-04",
            remark: "123",
            imgUrl: "123",
            createTime: "2020-04-04T00:00:00.000+0000",
            modifyTime: "2020-04-04T00:00:00.000+0000",
            creator: "123",
            modifier: "1",
            typeName: "电器",
            brandName: null,
            modelName: null,
            buildingName: "三号楼",
            floorName: "2楼",
            qrUrl: null
          },
          {
            page: 0,
            limit: 0,
            sidx: null,
            sord: null,
            id: 5,
            checkStatus: null,
            checkTime: null,
            name: "1#消防栓",
            type: 3,
            brand: 1,
            model: 1,
            building: "1c83114a8de647f0bb9a710d6111ca11",
            floor: "38b6d421fba445efb0cffdcb3a7792be",
            companyId: null,
            putTime: "2020-03-21",
            remark: "哈哈哈",
            imgUrl:
              "http://localhost:8081/public/rest/img/2020-04-10_598491.jpg",
            createTime: "2020-04-07T10:08:11.000+0000",
            modifyTime: "2020-04-09T20:29:23.000+0000",
            creator: "49162328460d4481a98254b1b0ea50d3",
            modifier: "1",
            typeName: "lasda kl",
            brandName: null,
            modelName: null,
            buildingName: "三号楼",
            floorName: "2楼",
            qrUrl: null
          }
        ],
        buildlist: [
          {
            page: 0,
            limit: 0,
            sidx: null,
            sord: null,
            id: 1,
            checkStatus: null,
            checkTime: null,
            name: "电冰箱",
            type: 1,
            brand: 1,
            model: 1,
            building: "1c83114a8de647f0bb9a710d6111ca11",
            floor: "38b6d421fba445efb0cffdcb3a7792be",
            companyId: null,
            putTime: "2020-04-04",
            remark: "123",
            imgUrl: "123",
            createTime: "2020-04-04T00:00:00.000+0000",
            modifyTime: "2020-04-04T00:00:00.000+0000",
            creator: "123",
            modifier: "1",
            typeName: "电器",
            brandName: null,
            modelName: null,
            buildingName: "三号楼",
            floorName: "2楼",
            qrUrl: null
          }
        ]
      },
      oSelectMap: {
        buildingSelect: []
      },
      buildingSelect: []
    };
  },
  created() {
    // this.fnInitPage();
    this.apiGetBuildingList();
    this.fnFormatter();
    this.apiGetTypeList();
  },
  mounted() {},
  methods: {
    ...mapActions(["setEventUser"]),
    onConfirm() {
      // this.setEventUser("userInfo");
      // this.$router.push({ name: "checkoutEvent" });
      console.log(this.result);
    },
    onCancel() {},
    onEquipChange(item, aSelect) {
      if (item.equipList.length == item.equipSelect.length) {
        aSelect.push(item.type);
      } else {
        let index = aSelect.indexOf(item.type);
        if (index >= 0) {
          aSelect.splice(index, 1);
        }
      }
    },
    onTypeChange(item, aTypeSelect) {
      let list = item.typelist.filter(itemA => {
        return aTypeSelect.includes(itemA.type);
      });
      list.
      debugger
    },
    fnInitPage() {
      if (this.eventInfo.oEventInfo) {
        // this.oEvent = this.eventInfo.oEventInfo;
      } else {
        // setTimeout(() => {
        //   this.oEvent = { eventNo: "123456788" };
        // }, 2000);
      }
    },
    onTest(e) {
      debugger;
      e.stoppropagation();
    },
    onBack() {
      this.$router.go(-1);
    },
    onBuilding() {
      this.actionSheetTitle = "";
    },
    onFloor() {},
    onEquipmentType() {},
    async apiGetBuildingList() {
      let { code, result } = await getBuildingListApi({
        companyId: "2"
      });
      if (code == 20000 && result) {
        console.log("getBuildingListApi:", result);
      }
    },
    async apiGetFloorList() {
      let { code, result } = await getFloorListApi({
        companyId: "2"
      });
      if (code == 20000 && result) {
        console.log("getFloorListApi:", result);
      }
    },
    async apiGetTypeList() {
      let { code, result } = await getTypeListApi({
        BuildingId: "1c83114a8de647f0bb9a710d6111ca11"
      });
      if (code == 20000 && result) {
        console.log("getTypeListApi:", result);
      }
    },
    fnFormatter() {
      let oTypeMap = {};
      this.result.typelist.forEach(item => {
        item.equipList = this.result.dinfomap[item.type];
        this.$set(item, "equipSelect", []);
        if (!oTypeMap[item.building]) {
          oTypeMap[item.building] = [item];
        } else {
          oTypeMap[item.building].push(item);
        }
      });
      this.result.buildlist.forEach(item => {
        this.$set(item, "typeSelect", []);
        item.typeSelect = [];
        item.typelist = oTypeMap[item.building];
      });
    }
  },
  computed: {
    // ...mapState(["eventInfo"])
  }
};
</script>
<style lang='less' scoped>
.checkout-event-architecture-container {
  min-height: 100vh;
  background: #f4f5f6;
  .content {
    padding: 15px;
    border-radius: 10px;
    .cell-architecture {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .btn-group {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      height: 50px;
      // border-top: 1px solid #f4f5f6;
      background-color: #ffffff;
      display: flex;
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
    & /deep/ .van-collapse-item__content {
      padding: 0;
      padding-left: 16px;
    }
  }
}
</style>
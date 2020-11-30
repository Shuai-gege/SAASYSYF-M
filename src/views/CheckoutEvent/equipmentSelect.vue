<template>
  <div class="checkout-event-architecture-container">
    <van-nav-bar title="设备选择" left-arrow @click-left="onBack" />
    <div class="content">
      <van-cell
        class="cell-architecture"
        title="建筑"
        :value="oFiltrate.build.length > 0 ? '已选择' : ''"
        is-link
        @click="onBuilding"
      />
      <van-cell title="楼层" :value="oFiltrate.floor.length>0 ? '已选择' : ''" is-link @click="onFloor" />
      <van-cell
        title="设备类型"
        :value="oFiltrate.type.length>0 ? '已选择' : ''"
        is-link
        @click="onEquipmentType"
      />
      <div style="background-color: #ffffff;">
        <!-- <van-collapse v-model="test">
          <van-collapse-item :name="item.id" v-for="item in result.buildlist" :key="item.id">
            <template #title>
              <div style="display: flex;">
                <van-checkbox
                  v-model="item.isSelect"
                  :name="item.building"
                  @change="onBuildingChange(item)"
                  :is-link="false"
                ></van-checkbox>
                <span style="margin-left: 10px;">{{item.buildingName}}</span>
              </div>
            </template>
            <van-collapse v-model="test2">
              <van-collapse-item :name="itemA.id" v-for="itemA in item.floorList" :key="itemA.id">
                <template #title>
                  <div style="display: flex;">
                    <van-checkbox
                      v-model="itemA.isSelect"
                      @change="onFloorChange(item,itemA)"
                      :name="itemA.floorName"
                    ></van-checkbox>
                    <span style="margin-left: 10px;">{{itemA.floorName}}</span>
                  </div>
                </template>
                <van-collapse v-model="test3">
                  <van-collapse-item
                    :name="itemB.id"
                    v-for="itemB in itemA.typeList"
                    :key="itemB.id"
                  >
                    <template #title>
                      <div style="display: flex;">
                        <van-checkbox
                          v-model="itemB.isSelect"
                          @change="onTypeChange(itemA,itemB)"
                          :name="itemB.type"
                        ></van-checkbox>
                        <span style="margin-left: 10px;">{{itemB.typeName}}</span>
                      </div>
                    </template>
                    <van-cell v-for="itemC in itemB.equipList" :key="itemC.id">
                      <van-checkbox
                        v-model="itemC.isSelect"
                        @change="onEquipChange(itemB)"
                        :name="itemC.name"
                      >{{itemC.name}}</van-checkbox>
                    </van-cell>
                  </van-collapse-item>
                </van-collapse>
              </van-collapse-item>
            </van-collapse>
          </van-collapse-item>
        </van-collapse>-->
        <!-- <div v-for="item in result.buildlist" :key="item.id">
          <div style="display: flex;justify-content:space-between;">
            <div style="display:flex;">
              <van-checkbox
                v-model="item.isSelect"
                :name="item.building"
                @change="onBuildingChange(item)"
                :is-link="false"
              ></van-checkbox>
              <span style="margin-left: 10px;line-height: 34px;">{{item.buildingName}}</span>
            </div>
            <van-icon
              :name="item.isExpand ? 'arrow-down': 'arrow'"
              style="line-height:34px;margin-right: 5px;"
              color="#969799"
              @click="onExpand(item)"
            />
          </div>
          <div
            :class="item.isExpand ? '': 'p-display-none'"
            style="padding-left:10px"
            v-for="itemA in item.floorList"
            :key="itemA.id"
          >
            <div style="display: flex;justify-content:space-between;">
              <div style="display:flex;">
                <van-checkbox
                  v-model="itemA.isSelect"
                  @change="onFloorChange(item,itemA)"
                  :name="itemA.floorName"
                ></van-checkbox>
                <span
                  style="margin-left: 10px;line-height: 34px;"
                >{{itemA.abType == 'type' ? itemA.typeName : itemA.floorName}}</span>
              </div>
              <van-icon
                :name="itemA.isExpand ? 'arrow-down': 'arrow'"
                style="line-height:34px;margin-right: 5px;"
                color="#969799"
                @click="onExpand(itemA)"
              />
            </div>
            <div
              :class="itemA.isExpand ? '': 'p-display-none'"
              style="padding-left:10px"
              v-for="itemB in itemA.typeList"
              :key="itemB.id"
            >
              <div style="display: flex;justify-content:space-between;">
                <div style="display:flex;">
                  <van-checkbox
                    v-model="itemB.isSelect"
                    @change="onTypeChange(itemA,itemB)"
                    :name="itemB.type"
                  ></van-checkbox>
                  <span style="margin-left: 10px;line-height: 34px;">{{itemB.typeName}}</span>
                </div>
                <van-icon
                  :name="itemB.isExpand ? 'arrow-down': 'arrow'"
                  style="line-height:34px;margin-right: 5px;"
                  color="#969799"
                  @click="onExpand(itemB)"
                />
              </div>
              <div
                :class="itemB.isExpand ? '': 'p-display-none'"
                style="padding-left:10px"
                v-for="itemC in itemB.equipList"
                :key="itemC.id"
              >
                <div style="display:flex;">
                  <van-checkbox
                    v-model="itemC.isSelect"
                    @change="onEquipChange(itemB)"
                    :name="itemC.name"
                  ></van-checkbox>
                  <span style="margin-left: 10px;line-height: 34px;">{{itemC.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>-->
        <div>
          <div>
            <span
              style="display:block; padding-left: 15px; padding-top: 10px;"
              @click="onSelectAllEquipment"
              v-if="result.length > 0"
            >全选/清除</span>
            <van-checkbox-group v-model="selectValue">
              <van-cell-group>
                <van-cell v-for="item in result" :key="item.id">
                  <template #title>
                    <van-checkbox
                      :name="item.id"
                    >{{item.name}}-{{item.typeName}}-{{item.buildingName}}/{{item.floorName}}</van-checkbox>
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
            <!-- <van-checkbox
              v-model="itemC.isSelect"
              @change="onEquipChange(itemB)"
              :name="itemC.name"
            ></van-checkbox>
            <span style="margin-left: 10px;line-height: 34px;">{{itemC.name}}</span>-->
          </div>
        </div>
      </div>
      <div class="btn-group">
        <div class="cancel" @click="onCancel">取消</div>
        <div class="confirm" @click="onConfirm">确定</div>
      </div>
    </div>
    <van-action-sheet
      v-model="actionSheetVisible"
      :title="actionSheetTitle"
      @close="fnActionSheetClose"
    >
      <span class="p-span-select-all" @click="onSelectAll">全选/清除</span>
      <div class="p-action-sheet-content">
        <van-checkbox-group v-model="aActionSelect">
          <!-- 使用 title 插槽来自定义标题 -->
          <van-cell v-for="item in aActionSheet" :key="item.id">
            <template #title>
              <van-checkbox :name="item.id">{{item.name}}</van-checkbox>
            </template>
          </van-cell>
        </van-checkbox-group>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  getBuildingListApi,
  getFloorListApi,
  getTypeListApi,
  getDinfoListApi
} from "../../api/eventApi";
import { mapState, mapActions } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
export default {
  components: {},
  data() {
    return {
      oFiltrate: {
        build: [],
        floor: [],
        type: []
      },
      test: [],
      test2: [],
      test3: [],
      actionSheetVisible: false,
      actionSheetTitle: "",
      selectType: "",
      aActionSheet: [],
      aActionSelect: [],
      aBuilding: [],
      aFloor: [],
      aEquipment: [],
      oSelectMap: {
        buildingSelect: []
      },
      buildingSelect: [],
      result: [],
      companyId: localStorage.getItem("companyId"),
      buildChangeFlag: false,
      selectValue: []
    };
  },
  created() {
    this.apiGetBuildingList();
    this.apiGetTypeList();
  },
  mounted() {},
  methods: {
    ...mapActions(["setEventEquip"]),
    /**
     * 设备选择确定事件
     */
    onConfirm() {
      let aDevice = [];
      // this.result.buildlist.forEach(itemA => {
      //   itemA.floorList.forEach(itemB => {
      //     itemB.typeList.forEach(itemC => {
      //       itemC.equipList.forEach(itemD => {
      //         if (itemD.isSelect === true) {
      //           aDevice.push(itemD.id);
      //         }
      //       });
      //     });
      //   });
      // });
      if (this.selectValue.length <= 0) {
        this.$notify({ type: "danger", message: "未选择设备" });
        return;
      }
      this.setEventEquip(this.selectValue);
      this.$router.push({ name: "checkoutEvent" });
    },
    onCancel() {
      this.$router.go(-1);
    },
    // onExpand(item) {
    //   this.$set(item, "isExpand", !item.isExpand);
    // },
    // onEquipChange(itemA) {
    //   let list = itemA.equipList.filter(itemB => {
    //     return itemB.isSelect === true;
    //   });
    //   if (list.length == itemA.equipList.length) {
    //     itemA.isSelect = true;
    //   } else if (list.length == 0) {
    //     itemA.isSelect = false;
    //   } else {
    //     // itemA.isSelect = "";
    //   }
    // },
    // onTypeChange(item, itemA) {
    //   if (itemA.isSelect === true) {
    //     itemA.equipList &&
    //       itemA.equipList.forEach(i => {
    //         i.isSelect = true;
    //       });
    //   } else if (itemA.isSelect === false) {
    //     itemA.equipList &&
    //       itemA.equipList.forEach(i => {
    //         i.isSelect = false;
    //       });
    //   }

    //   let list = item.typeList.filter(itemB => {
    //     return itemB.isSelect === true;
    //   });
    //   if (list.length == item.typeList.length) {
    //     item.isSelect = true;
    //   } else if (list.length == 0) {
    //     item.isSelect = false;
    //   } else {
    //     // item.isSelect = "";
    //   }
    // },
    /**
     * 弹框全选清除事件
     */
    onSelectAll() {
      if (this.aActionSelect.length === this.aActionSheet.length) {
        this.aActionSelect = [];
      } else {
        this.aActionSelect = this.aActionSheet.map(item => {
          return item.id;
        });
      }
    },
    /**
     * 设备全选清除事件
     */
    onSelectAllEquipment() {
      if (this.selectValue.length == this.result.length) {
        this.selectValue = [];
      } else {
        this.selectValue = this.result.map(item => item.id);
      }
    },
    // onFloorChange(item, itemA) {
    //   if (itemA.isSelect === true) {
    //     itemA.typeList.forEach(i => {
    //       i.isSelect = true;
    //     });
    //   } else if (itemA.isSelect === false) {
    //     itemA.typeList.forEach(i => {
    //       i.isSelect = false;
    //     });
    //   }

    //   let list = item.floorList.filter(itemB => {
    //     return itemB.isSelect === true;
    //   });
    //   if (list.length == item.floorList.length) {
    //     item.isSelect = true;
    //   } else if (list.length == 0) {
    //     item.isSelect = false;
    //   } else {
    //     // item.isSelect = "";
    //   }
    // },
    // onBuildingChange(item) {
    //   if (item.isSelect === true) {
    //     item.floorList.forEach(i => {
    //       i.isSelect = true;
    //     });
    //   } else if (item.isSelect === false) {
    //     item.floorList.forEach(i => {
    //       i.isSelect = false;
    //     });
    //   }
    // },
    onBack() {
      this.$router.go(-1);
    },
    /**
     * 建筑选择
     */
    onBuilding() {
      this.actionSheetTitle = "建筑选择";
      this.selectType = "1";
      this.actionSheetVisible = true;
      this.aActionSheet = this.aBuilding;
      this.aActionSelect = this.oFiltrate.build;
      this.buildChangeFlag = true;
    },
    /**
     * 楼层选择
     */
    async onFloor() {
      if (this.buildChangeFlag) {
        await this.apiGetFloorList();
      }
      this.buildChangeFlag = false;
      this.actionSheetTitle = "楼层选择";
      this.selectType = "2";
      this.actionSheetVisible = true;
      this.aActionSheet = this.aFloor;
      this.aActionSelect = this.oFiltrate.floor;
    },
    /**
     * 设备类型选择
     */
    onEquipmentType() {
      this.actionSheetTitle = "设备类型选择";
      this.selectType = "3";
      this.actionSheetVisible = true;
      this.aActionSheet = this.aEquipment;
      this.aActionSelect = this.oFiltrate.type;
    },
    /**
     * 建筑列表查询API
     */
    async apiGetBuildingList() {
      let result = await getBuildingListApi({
        companyId: this.companyId
      });
      if (result) {
        console.log("getBuildingListApi:", result);
        this.aBuilding = result.dinfolist.map(item => {
          return { id: item.id, name: item.locationName };
        });
        // this.oFiltrate.build = this.aBuilding.map(item => {
        //   return item.id;
        // });
        this.apiGetFloorList();
      }
    },
    /**
     * 楼层列表查询API
     */
    async apiGetFloorList() {
      let result = await getFloorListApi({
        BuildingId: this.oFiltrate.build.join(",")
      });
      if (result) {
        console.log("getFloorListApi:", result);
        this.aFloor = result.dinfolist.map(item => {
          return {
            id: item.id,
            name: item.parentLocationName + "/" + item.locationName
          };
        });
        // this.$set(
        //   this.oFiltrate,
        //   "floor",
        //   this.aFloor.map(item => {
        //     return item.id;
        //   })
        // );
      }
    },
    /**
     * 设备类型查询API
     */
    async apiGetTypeList() {
      let result = await getTypeListApi({
        companyId: this.companyId
      });
      if (result) {
        console.log("getTypeListApi:", result);
        this.aEquipment = result.typelist.map(item => {
          return { id: item.id, name: item.typeName };
        });
        // this.oFiltrate.type = this.aEquipment.map(item => {
        //   return item.id;
        // });
      }
    },
    /**
     * 设备查询API
     */
    async apiGetDinfoList() {
      let result = await getDinfoListApi({
        companyId: this.companyId,
        BuildingId: this.oFiltrate.build.join(","),
        floorId: this.oFiltrate.floor.join(","),
        type: this.oFiltrate.type.join(",")
      });
      this.result = result || [];
      this.selectValue = [];
    },
    fnFormatter(result) {
      for (const key in result.dinfomap) {
        if (result.dinfomap.hasOwnProperty(key)) {
          result.dinfomap[key].forEach(item => {
            this.$set(item, "isSelect", false);
          });
        }
      }
      // for (const key in result.typemap) {
      //   if (result.typemap.hasOwnProperty(key)) {
      //     const itemC = result.typemap[key];
      //     itemC.forEach(itemB => {
      //       this.$set(itemB, "isSelect", false);
      //       itemB.equipList = cloneDeep(result.dinfomap[itemB.type]);
      //     });
      //   }
      // }
      for (const key in result.floormap) {
        if (result.floormap.hasOwnProperty(key)) {
          const item = result.floormap[key];
          item.forEach(itemA => {
            this.$set(itemA, "isSelect", false);
            itemA.typeList = result.typemap[itemA.floor];
            itemA.typeList &&
              itemA.typeList.forEach(itemD => {
                this.$set(itemD, "isSelect", false);
                itemD.id = uuidv4();
                itemD.equipList =
                  result.dinfomap[`${itemD.type},${itemA.floor}`];
              });
          });
        }
      }
      for (const key in result.typemapBU) {
        if (result.typemapBU.hasOwnProperty(key)) {
          // const item = result.buildlist[key];
          result.typemapBU[key].forEach(item => {
            item.abType = "type";
            this.$set(item, "isSelect", false);
            if (result.dinfomapBU[`${item.type},${key}`].length > 0) {
              item.typeList = result.dinfomapBU[`${item.type},${key}`];
              item.typeList.forEach(itemD => {
                this.$set(itemD, "isSelect", false);
              });
            }
          });
        }
      }
      result.buildlist.forEach(item => {
        this.$set(item, "isSelect", false);
        item.floorList =
          result.floormap[item.building] || result.typemapBU[item.building];
      });
      console.log(result.buildlist);
      // for (const key in this.result.dinfomap) {
      //   if (this.result.dinfomap.hasOwnProperty(key)) {
      //     this.result.dinfomap[key].forEach(item => {
      //       this.$set(item, "isSelect", false);
      //     });
      //   }
      // }
      // let oTypeMap = {};
      // this.result.typelist.forEach(item => {
      //   item.equipList = this.result.dinfomap[item.type];
      //   this.$set(item, "isSelect", false);
      //   if (!oTypeMap[item.building]) {
      //     oTypeMap[item.building] = [item];
      //   } else {
      //     oTypeMap[item.building].push(item);
      //   }
      // });
      // this.result.buildlist.forEach(item => {
      //   this.$set(item, "isSelect", false);
      //   item.typeSelect = [];
      //   item.typelist = oTypeMap[item.building];
      // });
    },
    /**
     * 弹框关闭回调
     */
    fnActionSheetClose() {
      let flag = false;
      if (this.selectType == "1") {
        if (this.oFiltrate.build == this.aActionSelect) {
          flag = true;
        }
        this.oFiltrate.build = this.aActionSelect;
      } else if (this.selectType == "2") {
        if (this.oFiltrate.floor == this.aActionSelect) {
          flag = true;
        }
        this.oFiltrate.floor = this.aActionSelect;
      } else if (this.selectType == "3") {
        if (this.oFiltrate.type == this.aActionSelect) {
          flag = true;
        }
        this.oFiltrate.type = this.aActionSelect;
      }
      this.aActionSelect = [];
      if (!flag) {
        this.apiGetDinfoList();
      }
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
    [class*="van-hairline"]::after {
      border: none;
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
  .p-action-sheet-content {
    max-height: 50vh;
    overflow: auto;
    position: relative;
  }
  .p-span-select-all {
    position: absolute;
    top: 10px;
    left: 12px;
    z-index: 1;
  }
  .p-display-none {
    display: none;
  }
}
</style>
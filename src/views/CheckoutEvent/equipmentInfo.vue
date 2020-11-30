<template>
  <div class="equipment-info-container">
    <van-nav-bar style="position: fixed;width: 100%;" title="设备信息" left-arrow @click-left="onBack" />
    <div class="content">
      <van-cell-group>
        <van-cell title="位置" :value="oEquipmentInfo.buildingName" />
        <van-cell title="设备类型" :value="oEquipmentInfo.typeName" />
        <van-cell title="设备名称" :value="oEquipmentInfo.name" />
        <van-cell title="设备状态">
          <template #right-icon>
            <van-radio-group v-model="oEquipmentInfo.checkStatus" direction="horizontal">
              <van-radio name="2" icon-size="12px">异常</van-radio>
              <van-radio name="1" icon-size="12px">正常</van-radio>
            </van-radio-group>
          </template>
        </van-cell>
        <div class="p-event-label">备注</div>
        <van-field
          v-model="oEquipmentInfo.remark"
          rows="1"
          :autosize="{minHeight:150}"
          type="textarea"
          placeholder="填入备注信息"
          maxlength="200"
          show-word-limit
        />
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          :before-delete="fnDeleteHandler"
          :max-count="3"
        />
      </van-cell-group>
      <div class="btn-group">
        <van-button type="default" color="#A68E44" @click="onConfirm">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  saveEquipmentInfoApi,
  getEquipmentDetailApi,
  uploadFileApi
} from "../../api/eventApi";
import _axios from "axios";
export default {
  components: {},
  data() {
    return {
      radio: "",
      remark: "",
      oEquipmentInfo: {
        id: this.$route.query.detailId,
        buildingName: "",
        typeName: "",
        name: "",
        checkStatus: "",
        remark: "",
        checkImgUrl: "https://img.yzcdn.cn/vant/leaf.jpg"
        // checkImgUrl: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
      },
      fileList: [],
      aFileUrl: []
    };
  },
  created() {
    // this.fnInitPage();
    this.apiGetEquipmentDetail(this.$route.query.detailId);
  },
  mounted() {},
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    /**
     * 图片上传 完成回调
     */
    afterRead(file) {
      this.updateImg(file);
    },
    /**
     * 图片删除函数
     */
    fnDeleteHandler(file, detail) {
      this.aFileUrl.splice(detail.index, 1);
      return true;
    },
    /**
     * 点检设备确认事件
     */
    onConfirm() {
      if (!this.oEquipmentInfo.checkStatus) {
        this.$toast("未选择设备状态！");
        return;
      }
      if (this.fileList.length <= 0) {
        this.$toast("未拍摄照片！");
        return;
      }
      this.apiSaveEquipmentInfo();
    },
    dataURLtoFile(dataurl, filename) {
      // 将base64转换为file文件
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    /**
     * 上传图片
     */
    updateImg(file) {
      let canvas = document.createElement("canvas"); // 创建Canvas对象(画布)
      let context = canvas.getContext("2d");
      let img = new Image();
      img.src = file.content; // 指定图片的DataURL(图片的base64编码数据)
      img.onload = () => {
        canvas.width = 400;
        canvas.height = 300;
        context.drawImage(img, 0, 0, 400, 300);
        file.content = canvas.toDataURL(file.file.type, 0.92); // 0.92为默认压缩质量
        let files = this.dataURLtoFile(file.content, file.file.name);
        this.apiUploadFile(files);
      };
    },
    /**
     * 点检事件保存API
     */
    async apiSaveEquipmentInfo() {
      this.oEquipmentInfo.checkImgUrl = this.aFileUrl.join(",");
      let result = await saveEquipmentInfoApi(this.oEquipmentInfo);
      this.$router.go(-1);
    },
    /**
     * 上传图片API
     */
    async apiUploadFile(file) {
      let formData = new FormData();
      formData.append("file", file);
      _axios
        .post(this.$baseConfig.BASE_URL + "/public/rest/img/upload", formData)
        .then(result => {
          this.aFileUrl.push(
            this.$baseConfig.BASE_URL + "/public/rest/img/" + result.data.result
          );
        });
    },
    /**
     * 获取设备详情API
     */
    async apiGetEquipmentDetail(id) {
      let result = await getEquipmentDetailApi({ detailId: id });
      if (result) {
        this.oEquipmentInfo.buildingName = result.dinfo.buildingName;
        this.oEquipmentInfo.name = result.dinfo.name;
        this.oEquipmentInfo.typeName = result.dinfo.typeName;
      }
      console.log("getEquipmentDetailApi:", result);
    }
  },
  computed: {}
};
</script>
<style lang='less' scoped>
.equipment-info-container {
  min-height: 100vh;
  background: #f4f5f6;
  .p-danger {
    color: red;
  }
  .content {
    padding-top: 55px;
    .van-radio-group {
      .van-radio--horizontal:last-child {
        margin-right: 0;
      }
    }
    .p-event-label {
      background-color: #f4f5f6;
      padding: 10px;
      font-size: 12px;
      color: #999999;
    }
  }
  .btn-group {
    padding: 12px 10px 0;
    .van-button {
      width: 100%;
      border-radius: 6px;
    }
  }
}
</style>
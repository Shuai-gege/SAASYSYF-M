<template>
  <div class="box">
    <div class="con">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="退回原因"
        type="textarea"
        maxlength="50"
        placeholder="请输入退回原因"
        show-word-limit
      />
    </div>
    <div class="btn flex">
      <van-button color="#999" @click="$router.go(-1)">取消</van-button>
      <van-button color="#A68E44" @click="end">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      message: ''
    }
  },
  mounted() {},
  methods: {
    end() {
      if (this.message == '') {
        this.$toast('请输入原因')
      } else {
        //完成、退回。延期
        this.axios
          .post('/rest/tbEventReport/completeEvent', {
            uid: localStorage.getItem('uid'), //登录人ID
            status: '2', //操作状态，1完成，2退回，3延期
            event_id: sessionStorage.getItem('id'), //事件ID
            base64: null, //图片
            file_name: null, //图片名字
            description: this.message, //描述
            hours: '' //延期时长
          })
          .then(data => {
            this.$toast('退回完成')
            this.$router.push('/eventList')
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
  }
  .btn {
    padding: 50px 30px;
    .van-button--normal {
      padding: 0 1.4rem;
    }
  }
}
</style>
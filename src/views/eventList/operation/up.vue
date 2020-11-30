<template>
  <div class="box">
    <div class="con">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="退回原因描述:"
        type="textarea"
        maxlength="50"
        placeholder="请输入描述"
        show-word-limit
      />
    </div>
    <div class="btn flex">
      <van-button color="#999" @click="$router.go(-1)">取消</van-button>
      <van-button color="#A68E44" @click="up">确认</van-button>
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
    // 上报无效事件
    up() {
      if (this.message == '') {
        this.$toast('请输入原因')
      } else {
        this.axios
          .post('/rest/tbEventInvalid/add', {
            uid: localStorage.getItem('uid'), //当前登录人ID
            remark: this.message, //描述
            fromUserId: localStorage.getItem('uid'), //上报人ID
            invalidEventId: sessionStorage.getItem('id') //无效事件的ID
          })
          .then(data => {
            this.$toast('上报无效事件成功')
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
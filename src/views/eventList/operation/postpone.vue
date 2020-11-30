<template>
  <div class="box">
    <div class="con">
      <van-field
        v-model="value"
        label="延期时间"
        placeholder="输入延期时间/小时"
        input-align="right"
        type="number"
        @touchstart.stop="show100 = true"
      />
      <!-- 数字键盘 -->
      <!-- <van-number-keyboard
        :show="show100"
        extra-key="."
        close-button-text="完成"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />-->
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="延期原因"
        type="textarea"
        maxlength="50"
        placeholder="请输入原因"
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
      value: '', //延期时间
      message: '', //延时原因
      show100: false,
      arr: [] //数字键盘输入的值
    }
  },
  mounted() {},
  methods: {
    // 数字键盘
    onInput(value) {
      this.arr.push(value)
      this.value = this.arr.join('')
    },
    onDelete() {
      Toast('删除')
    },
    end() {
      if (this.message == '') {
        this.$toast('请输入原因')
      } else if (this.value == '') {
        this.$toast('请输入延时时间')
      } else {
        //完成、退回。延期
        this.axios
          .post('/rest/tbEventReport/completeEvent', {
            uid: localStorage.getItem('uid'), //登录人ID
            status: '3', //操作状态，1完成，2退回，3延期
            event_id: sessionStorage.getItem('id'), //事件ID
            base64: null, //图片
            file_name: null, //图片名字
            description: this.message, //描述
            hours: this.value //延期时长
          })
          .then(data => {
            this.$toast('延期申请成功')
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
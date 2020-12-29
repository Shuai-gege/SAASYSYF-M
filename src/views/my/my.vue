<template>
  <div class="box">
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      :fixed="true"
      @click-left="$router.push('/')"
    />
    <div class="con">
      <van-cell-group>
        <van-cell title="公司" :value="meMessage.companyName" />
        <van-cell title="部门" value="--" v-if="meMessage.companyName == meMessage.deptName" />
        <van-cell title="部门" :value="meMessage.deptName" v-else />
        <van-cell title="手机号" :value="meMessage.mobile" />
        <van-cell title="姓名" :value="meMessage.userName" />
        <!-- <van-cell title="电子签名" to="/esign" /> -->
        <van-cell title="退出登录" is-link @click="Clare" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meMessage: {}
    }
  },
  created() {},
  mounted() {
    this.personal()
  },
  methods: {
    personal() {
      this.axios
        .get('/rest/tbEventReport/getAppIndexData', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          if (data.code == 50000) {
            this.$toast('系统异常')
          } else {
            this.meMessage = data
            this.myName = data.userName.substr(data.userName.length - 2, 2)
            localStorage.setItem('userName', data.userName)
          }
        })
    },
    Clare() {
      this.axios
        .get('/rest/wxserver/loginWXOut', {
          params: {
            uid: localStorage.getItem('uid')
          }
        })
        .then(data => {
          this.$toast('已退出')
          this.$cookieStore.setCookie('uid', localStorage.getItem('uid'), 30)
          window.localStorage.clear()
          this.$router.push('/login')
        })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    padding-top: 45px;
    /deep/.van-cell__value {
      width: 200px;
    }
  }
}
</style>
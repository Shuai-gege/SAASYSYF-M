<template>
  <div class="box">
    <div class="title">介绍</div>
    <div class="flex_c">
      <van-button round type="info" size="large" color="#a68e44" @click="getUser">开始注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    getUser() {
      this.keepAxios
        .get(this.baseUrl.checkList + '/rest/appUser/getUserByOpenid', {
          params: {
            openId: localStorage.getItem('openid')
          }
        })
        .then(data => {
          console.log(data)
          if (data.data.code == 50000) {
            this.$toast('系统异常')
          } else if (data.data.code == 20000 && data.data.result != null) {
            if (
              data.data.result.personCount > '2' &&
              data.data.result.adminManage == '0'
            ) {
              this.$router.push({
                name: 'register',
                params: {
                  name: data.data.result.name,
                  flag: true,
                  flag1: false,
                  flag2: false,
                  flag3: false
                }
              })
            } else if (
              data.data.result.personCount > '2' &&
              data.data.result.adminManage == '1'
            ) {
              this.$router.push({
                name: 'register',
                params: {
                  name: data.data.result.name,
                  flag: false,
                  flag1: false,
                  flag2: false,
                  flag3: true
                }
              })
            } else if (
              data.data.result.personCount <= '2' &&
              data.data.result.adminManage == '0'
            ) {
              this.$router.push({
                name: 'register',
                params: {
                  name: data.data.result.name,
                  flag: false,
                  flag1: true,
                  flag2: false,
                  flag3: false
                }
              })
            } else if (
              data.data.result.personCount <= '2' &&
              data.data.result.adminManage == '1'
            ) {
              this.$router.push({
                name: 'register',
                params: {
                  name: data.data.result.name,
                  flag: false,
                  flag1: true,
                  flag2: false,
                  flag3: false
                }
              })
            }
          } else if (data.data.code == 20000 && data.data.result == null) {
            this.$router.push({
              name: 'register1',
              query: {
                flag1: true
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  color: black;
  font-size: 14px;
  font-weight: 600;
  background-image: linear-gradient(#fff, rgb(9, 63, 112));
  .title {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }
  .flex_c {
    margin-top: 100px;
    /deep/.van-button--large {
      width: 85%;
    }
  }
}
</style>
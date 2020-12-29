<template>
  <div class="box">
    <van-nav-bar left-text="返回" left-arrow :fixed="true" @click-left="$router.push('/login')" />
    <div class="title">介绍</div>
    <div class="flex_c">
      <van-button round type="info" size="large" color="#1888F9" @click="getUser">开始注册</van-button>
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
      if (
        this.$cookieStore.getCookie('uid') == undefined ||
        this.$cookieStore.getCookie('uid') == '' ||
        this.$cookieStore.getCookie('uid') == null
      ) {
        this.$router.push({
          name: 'register1',
          query: {
            flag1: true
          }
        })
      } else {
        this.keepAxios
          .get(this.baseUrl.checkList + '/rest/appUser/getUserByUid', {
            params: {
              uid: this.$cookieStore.getCookie('uid')
            }
          })
          .then(data => {
            console.log(data)
            if (data.data.code == 50000) {
              this.$toast('系统异常')
            } else if (data.data.code == 20000 && data.data.result != null) {
              if (
                data.data.result.personCount > '2' &&
                data.data.result.adminManage == '0' &&
                data.data.result.applyStatus == '1'
              ) {
                this.$router.push({
                  name: 'register',
                  params: {
                    name: data.data.result.name,
                    flag: true,
                    flag1: false,
                    flag2: false,
                    flag3: false,
                    flag4: false
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
                    flag3: true,
                    flag4: false
                  }
                })
              } else if (
                data.data.result.adminManage == '0' &&
                data.data.result.applyStatus == '0'
              ) {
                // 0：未审核 1：审核通过 2：审核拒绝
                this.$router.push({
                  name: 'register',
                  params: {
                    name: data.data.result.name,
                    flag: false,
                    flag1: false,
                    flag2: false,
                    flag3: false,
                    flag4: true
                  }
                })
              } else if (
                data.data.result.personCount < '2' &&
                data.data.result.adminManage == '0'
              ) {
                this.$router.push({
                  name: 'register',
                  params: {
                    name: data.data.result.name,
                    flag: false,
                    flag1: true,
                    flag2: false,
                    flag3: false,
                    flag4: false
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
                    flag3: false,
                    flag4: false
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
}
</script>
<style lang='less' scoped>
.box {
  padding-top: 45px;
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
      height: 49px;
    }
  }
}
</style>
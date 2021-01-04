<template>
  <div class="box">
    <van-nav-bar left-text="返回" left-arrow :fixed="true" @click-left="$router.push('/login')" />
    <div class="title">新手上路</div>
    <div class="registered">
      <div class="con">感谢您选用i-Guard物业管控平台，当您完成小程序端的注册后，系统将为您和您的企业提供小程序任务看板端和Web管理端两套前端应用。</div>
      <div class="con">小程序端通过盈商云服公众号下方“i-Guard物管平台”菜单进入。</div>
      <img class="jieshao1" src="../../images/图标/jieshao1.png" alt />
      <div class="con">Web端通过官网首页右上角“管理端登录”菜单进入。</div>
      <img class="jieshao2" src="../../images/图标/jieshao2.png" alt />
      <div
        class="con"
      >i-Guard物业管控平台是一套综合了巡更检查、工维报修、设备点检、管理层看板等一系列功能的线上电子流物业管理软件，具体功能可登录官网www.mallmis.com或盈商云股公众号查看产品介绍</div>
      <div class="con">根据贵司付费方式不同，i-Guard物业管控平台提供如下功能使用：</div>
      <div class="table">
        <table border="1" cellspacing="0" width="100%">
          <tr class="red">
            <td width="20%"></td>
            <td>体验版</td>
            <td>Demo版</td>
            <td>黄金版</td>
            <td>白金版</td>
          </tr>
          <tr class="pink">
            <td>系统权限</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr class="lightPink">
            <td>通用管理</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr class="pink">
            <td>巡更管理</td>
            <td>x</td>
            <td>x</td>
            <td>x</td>
            <td>√</td>
          </tr>
          <tr class="lightPink">
            <td>点检管理</td>
            <td>10点检任务</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr class="pink">
            <td>工维管理</td>
            <td>10待处理事件</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr class="lightPink">
            <td>物料管理</td>
            <td>x</td>
            <td>√</td>
            <td>√</td>
            <td>√</td>
          </tr>
          <tr class="pink">
            <td>付费方式</td>
            <td>永久免费</td>
            <td>付费30天,仅一次</td>
            <td>年付费</td>
            <td>年付费</td>
          </tr>
        </table>
      </div>
    </div>
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
  // font-weight: 600;
  background-image: linear-gradient(#fff, rgb(9, 63, 112));
  .title {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    font-weight: 800;
    font-size: 15px;
  }
  .flex_c {
    margin-top: 100px;
    /deep/.van-button--large {
      position: fixed;
      bottom: 10px;
      width: 85%;
      height: 49px;
    }
  }
  .registered {
    padding-top: 10px;
    .con {
      padding-top: 30px;
      width: 310px;
      margin: 0 auto;
      text-indent: 25px;
    }
    .jieshao1 {
      margin: 5px auto;
    }
    .jieshao2 {
      width: 98%;
      height: 210px;
      margin: 5px auto;
    }
    .jieshao3 {
      width: 98%;
      height: 180px;
      margin: 5px auto;
    }
    .table {
      color: #fff;
      table {
        text-align: center;
        td {
          border: 1px solid #fff;
        }
        .red {
          background: #f00;
        }
        .pink {
          background: pink;
        }
        .lightPink {
          background: #eed9da;
        }
      }
    }
  }
}
</style>
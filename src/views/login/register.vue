<template>
  <div class="box">
    <!-- 已注册内容 -->
    <div class="registered" v-if="flag">
      <div class="title">您已是{{firmName}}企业的成员了</div>
      <div class="con">请联系您所属企业的平台管理员注销您的账号后才可注册/加入新的企业</div>
    </div>
    <!-- 已注册但是未超过两人 -->
    <div class="registered" v-if="flag1">
      <div class="title">您已是{{firmName}}企业的管理员了</div>
      <div class="con">由于您的企业人员少于2人，您可以选择重新创建新的企业，之前创建的企业将会在系统内清除</div>
      <!-- 按钮 -->
      <div class="btn flex_c">
        <van-button type="primary" size="large" color="#64A5DC" @click="newQiYe">创建新的企业</van-button>
      </div>
    </div>
    <!-- 已注册但是超过两人 -->
    <div class="registered" v-if="flag3">
      <div class="title">您已是{{firmName}}企业的管理员了</div>
      <div class="con">由于您的企业人员达到或超过2人以上，您可以选择将平台管理员权限移交给本企业的其他人员，再有新的平台管理员注销您的账号后才可注册/加入新的企业</div>
      <!-- 按钮 -->
      <div class="btn flex_c">
        <van-button
          type="primary"
          size="large"
          color="#64A5DC"
          @click="$router.push('/quanXian')"
        >管理员权限移交</van-button>
      </div>
    </div>
    <!-- 未注册内容 -->
    <div class="unregistered" v-if="flag2">
      <div class="title">您已是{{firmName}}企业的成员了</div>
      <div class="con">请联系您所属企业的平台管理员注销您的账号后才可注册/加入新的企业</div>
    </div>
    <!-- 申请加入企业还未审核 -->
    <div class="registered" v-if="flag4">
      <div class="title">您已申请加入{{firmName}}的企业，等待审核</div>
      <!-- 按钮 -->
      <div class="btn flex_c">
        <van-button
          type="primary"
          size="large"
          color="#64A5DC"
          @click="$router.push('/introduce')"
        >确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firmName: '南京盈商云服',
      flag: false, //已注册
      flag1: false, //已注册未超过两人
      flag3: false, //已注册超过两人
      flag4: false, //申请加入企业还未审核
      flag2: false //未注册
    }
  },
  mounted() {
    this.firmName = this.$route.params.name
    this.flag = this.$route.params.flag
    this.flag1 = this.$route.params.flag1
    this.flag2 = this.$route.params.flag2
    this.flag3 = this.$route.params.flag3
    this.flag4 = this.$route.params.flag4
  },
  methods: {
    // 创建新的企业
    newQiYe() {
      this.$router.push({
        name: 'register1',
        query: {
          flag1: true
        }
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
  .registered {
    .btn {
      margin-top: 100px;
      /deep/.van-button--large {
        width: 85%;
        border-radius: 10px;
      }
    }
    padding-top: 80px;
    .title {
      display: flex;
      justify-content: center;
    }
    .con {
      padding-top: 30px;
      width: 260px;
      margin-left: 60px;
    }
  }
  .unregistered {
    .title {
      display: flex;
      justify-content: center;
    }
    .con {
      padding-top: 30px;
      width: 240px;
      margin-left: 60px;
    }
  }
}
</style>
<template>
  <div class="box">
    <div class="con">
      <div class="title">请选择您要移交的人员</div>
      <!-- 输入框 -->
      <div class="btn flex_c">
        <van-cell-group>
          <van-field v-model="value" placeholder="请输入用户名" @input="shaiXuan" />
        </van-cell-group>
        <ul class="userList" v-if="flag">
          <li>
            <van-cell
              v-for="(item,i) in allUserList1"
              :key="i"
              :title="item.vserName"
              @click="eachName(item.uid,item.vserName)"
            />
          </li>
        </ul>
      </div>

      <!-- 按钮 -->
      <div class="btn1 flex_c">
        <van-button type="primary" size="large" color="#64A5DC" @click="adminTransfer">完成</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      flag: false,
      toUser: '', //被转交人UID
      allUserList: [], //当前公司多有人
      allUserList1: [] //筛选用的list
    }
  },
  mounted() {
    this.allUser()
  },
  methods: {
    allUser() {
      this.keepAxios
        .get(this.baseUrl.checkList + '/rest/appUser/getWebUsersByCompanyId', {
          params: { companyId: localStorage.getItem('companyId') }
        })
        .then(data => {
          console.log(data)
          this.allUserList = data.data.result
        })
    },
    shaiXuan(val) {
      this.allUserList1 = []
      this.allUserList.forEach(item => {
        if (item.vserName.indexOf(val) >= 0) {
          console.log('我看看你执行几次')
          this.flag = true
          this.allUserList1.push(item)
        }
      })
      if (val == '') {
        this.flag = false
      }
    },
    eachName(uid, name) {
      this.flag = false
      this.value = name
      this.toUser = uid
    },
    adminTransfer() {
      this.keepAxios
        .get(this.baseUrl.checkList + '/rest/appUser/adminTransfer', {
          params: {
            openId: localStorage.getItem('openid'),
            toUserId: this.toUser
          }
        })
        .then(data => {
          console.log(data)
          if (data.data == 200000) {
            this.$toast(data.data.msg)
          } else {
            this.$toast(data.data.msg)
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
  background-image: linear-gradient(#fff, rgb(9, 63, 112));
  .con {
    padding-top: 50px;
    .title {
      display: flex;
      justify-content: center;
      font-size: 18px;
    }
    .btn1 {
      margin-top: 200px;
      /deep/.van-button--large {
        width: 85%;
        border-radius: 10px;
      }
    }
    .btn {
      margin-top: 80px;
      /deep/.van-cell {
        padding: 5px;
        width: 200px;
      }

      .userList {
        background: #fff;
        width: 200px;
        height: 190px;
        position: absolute;
        top: 190px;
        overflow: auto;
        li {
          padding: 3px 6px;
        }
      }
    }
  }
}
</style>
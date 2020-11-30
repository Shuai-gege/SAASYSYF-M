<template>
  <div class="box">
    <!-- 申请前 -->
    <div class="con" v-if="flag1">
      <div class="title">请选择您要加入的企业</div>
      <!-- 输入框 -->
      <div class="btn flex_c">
        <van-cell-group>
          <van-field v-model="value" placeholder="请选择您要加入的企业" @input="shaiXuan" />
        </van-cell-group>
        <ul class="userList" v-if="flag">
          <li>
            <van-cell
              v-for="(item,i) in allUserList1"
              :key="i"
              :title="item.name"
              @click="eachName(item.company_id,item.name)"
            />
          </li>
        </ul>
      </div>
      <div class="buMen flex_c">
        <van-field v-model="value1" placeholder="请填写选择您要加入的部门" />
      </div>
      <!-- 按钮 -->
      <div class="btn1 flex_c">
        <van-button type="primary" size="large" color="#64A5DC" @click="adminTransfer">申请</van-button>
      </div>
    </div>
    <!-- 申请后 -->
    <div class="backCon" v-else>
      <div class="title flex_c">
        <div>您的申请已发送给企业管理员，管理员审批通过后您会收到通知。</div>
      </div>
      <!-- 按钮 -->
      <div class="btn flex_c">
        <van-button type="primary" size="large" color="#64A5DC" @click="$router.push('/login')">完成</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      value1: '',
      flag: false,
      flag1: true,
      company_id: '', //要加入的企业ID
      allUserList: [], //当前公司多有人
      allUserList1: [], //筛选用的list
      obj: JSON.parse(this.$route.query.obj)
    }
  },
  mounted() {
    console.log(this.obj)
    this.allUser()
  },
  methods: {
    // 全部公司
    allUser() {
      this.keepAxios
        .get(this.baseUrl.checkList + '/rest/department/getCompanysAll')
        .then(data => {
          console.log(data)
          this.allUserList = data.data.result
        })
    },
    shaiXuan(val) {
      this.allUserList1 = []
      this.allUserList.forEach(item => {
        if (item.name.indexOf(val) >= 0) {
          console.log('我看看你执行几次')
          this.flag = true
          this.allUserList1.push(item)
        }
      })
    },
    eachName(company_id, name) {
      this.flag = false
      this.value = name
      this.company_id = company_id
    },
    adminTransfer() {
      this.keepAxios
        .post(this.baseUrl.checkList + '/rest/appUser/applyJoinCompany', {
          applyDept: this.value1,
          companyId: this.company_id,
          openId: localStorage.getItem('openid'),
          password: this.obj.password,
          faceImg: this.obj.faceImg,
          phone: this.obj.phone,
          userName: this.obj.userName
        })
        .then(data => {
          console.log(data)
          if (data.data.code == 20000) {
            this.flag1 = false
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
      margin-top: 100px;
      /deep/.van-button--large {
        width: 85%;
        border-radius: 10px;
      }
    }
    .buMen {
      margin-top: 200px;
      /deep/.van-cell {
        padding: 5px;
        width: 330px;
        border-radius: 3px;
      }
    }
    .btn {
      margin-top: 80px;
      /deep/.van-cell {
        padding: 5px;
        width: 330px;
        border-radius: 3px;
      }

      .userList {
        background: #fff;
        width: 330px;
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
  .backCon {
    .title {
      padding-top: 85px;
      div {
        width: 300px;
      }
    }
    .btn {
      margin-top: 70px;
      /deep/.van-button--large {
        width: 85%;
        border-radius: 10px;
      }
    }
  }
}
</style>
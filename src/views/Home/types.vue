<template>
  <div class="box">
    <div class="con">
      <van-cell
        v-for="(item,i) in list"
        :key="i"
        :title="item.eventType"
        @click="tiao(item.id)"
        is-link
      />
      <!-- 响应人B -->
      <div class="xiangYing">
        <p v-for="(item,i) in list1" :key="i">
          <i style="color:#f00">{{item.typeName}}</i>
          响应人B为：
          <i style="color:#f00">{{item.userNameB}}</i>
        </p>
      </div>
      <div></div>
      <!-- 按钮 -->
      <div class="btn flex">
        <van-button color="#999" @click="$router.go(-1)">取消</van-button>
        <van-button color="#a48f36" @click="end">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      list1: []
    }
  },
  mounted() {
    if (!localStorage.getItem('userBObj')) {
      localStorage.setItem('userBObj', JSON.stringify([]))
    } else {
      this.list1 = JSON.parse(localStorage.getItem('userBObj'))
    }
    console.log(this.list1)
    this.axios
      .get('/rest/tbEventTypeConfig/getOffWorkIdB', {
        params: { uid: localStorage.getItem('uid') }
      })
      .then(data => {
        console.log(data)
        this.list = data
      })
  },
  methods: {
    tiao(id) {
      this.$router.push({
        name: 'userB',
        params: {
          id
        }
      })
    },
    end() {
      if (this.list1.length != this.list.length) {
        this.$toast('还有报事类型没选响应人B哦！')
      } else {
        axios({
          method: 'post',
          url:
            'https://test.mallmis.com/v1/rest/tbEventTypeConfig/updateFinalUserIdB',
          data: this.list1
        }).then(data => {
          if (data.data.result.code == 50000) {
            this.$toast('系统错误')
          } else {
            this.$toast('脱岗成功')
            window.localStorage.removeItem('userBObj')
            this.$router.push('/')
            window.location.reload()
          }
        })
        // this.axios
        //   .post('/rest/tbEventTypeConfig/updateFinalUserIdB', {
        //     tbEventTypeConfigBeans: this.list1
        //   })
        //   .then(data => {
        //     if (data.code == 50000) {
        //       this.$toast('系统异常')
        //     } else {
        //       console.log(data)
        //     }
        //   })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    .xiangYing {
      color: #000;
      padding: 5px;
      font-size: 12px;
    }
    .btn {
      padding-top: 100px;
      padding-bottom: 30px;
      .van-button--normal {
        margin: 0 30px;
        width: 127px;
      }
    }
  }
}
</style>
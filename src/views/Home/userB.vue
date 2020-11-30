<template>
  <div class="box">
    <div class="con">
      <van-radio-group v-model="radio">
        <div class="user">
          <van-radio
            v-for="(item,i) in list"
            :key="i"
            :name="item.userIdB"
            @click="xuan(item.userIdB,item.userIdBName)"
          >{{item.userIdBName}}</van-radio>
        </div>
      </van-radio-group>
      <!-- 按钮 -->
      <div class="btn flex">
        <van-button color="#999" @click="$router.go(-1)">取消</van-button>
        <van-button color="#a48f36" @click="end">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1',
      id: '',
      list: [],
      userIdB: '', //响应人BID
      userNameB: '', //响应人B名字
      typeId: '', //事件类型Id
      eventTypeName: '' //事件类型名字
    }
  },
  mounted() {
    this.id = this.$route.params.id
    // 根据事件id获取人
    this.axios
      .get('/rest/tbEventTypeConfig/getEventTypeConfigBeanById', {
        params: {
          id: this.id
        }
      })
      .then(data => {
        console.log(data)
        this.typeId = data.id
        let userName = data.userIdBName.split(',')
        let userIdB = data.userIdB.split(',')
        this.eventTypeName = data.eventType
        for (var i = 0; i < userName.length; i++) {
          this.list.push({
            userIdBName: userName[i],
            userIdB: userIdB[i]
          })
        }
        console.log(userName)
        console.log(this.list)
      })
  },
  methods: {
    xuan(id, name) {
      console.log(id)
      this.userIdB = id
      this.userNameB = name
      console.log(name)
    },
    end() {
      let userBObj = {
        finalUserIdB: this.userIdB,
        uid: localStorage.getItem('uid'),
        id: this.typeId,
        userNameB: this.userNameB,
        typeName: this.eventTypeName
      }
      let obj = localStorage.getItem('userBObj')
      let obj1 = JSON.parse(obj)
      let obj3 = {}
      obj1.push(userBObj)
      let obj2 = obj1.reduce((cur, next) => {
        obj3[next.typeName]
          ? ''
          : (obj3[next.typeName] = true && cur.push(next))
        return cur
      }, [])
      console.log(obj2)
      localStorage.setItem('userBObj', JSON.stringify(obj2))
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    .btn {
      padding-top: 100px;
      padding-bottom: 30px;
      .van-button--normal {
        margin: 0 30px;
        width: 127px;
      }
    }
    .user {
      padding: 15px;
    }
  }
}
</style>
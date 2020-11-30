<template>
  <div class="box">
    <div class="con">
      <van-radio-group v-model="radio" direction="horizontal" @change="name">
        <van-radio v-for="(item,i) in userName" :key="i" :name="item.uid">{{item.userName}}</van-radio>
      </van-radio-group>
      <!-- <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
        <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
        <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
      </van-collapse>-->
    </div>
    <div class="btn flex">
      <van-button color="#999" @click="$router.go(-1)">取消</van-button>
      <van-button color="#A68F43" @click="end">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '',
      userName: {},
      name1: '',
      taskIds: '',
      activeName: ''
    }
  },
  mounted() {
    this.taskIds = this.$route.query.taskId
    this.keepAxios
      .get(
        this.baseUrl.keepAxios +
          '/rest/patrolCheckGroup/getGroupWorkersByManage',
        {
          params: { manageId: localStorage.getItem('uid') }
        }
      )
      .then(data => {
        this.userName = data.data.data
        console.log(data)
      })
  },
  methods: {
    name(name) {
      console.log(name)
      this.name1 = name
    },
    end() {
      if (this.name1 == '') {
        this.$toast('请选择人员')
      } else {
        this.keepAxios
          .post(this.baseUrl.keepAxios + '/app/patrolTask/deliverTask', {
            uid: localStorage.getItem('uid'),
            resolveUid: this.name1,
            detailIds: this.taskIds
          })
          .then(data => {
            console.log(data)
            if ((data.data.code = 20000)) {
              this.$toast('转发成功')
              this.$router.go(-1)
            } else {
              this.$toast(data.data.msg)
            }
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    padding-bottom: 58px;
    .van-radio {
      padding: 5px 20px;
    }
  }

  .btn {
    position: fixed;
    bottom: 10px;
    padding-left: 30px;
    .van-button--normal {
      padding: 0 1.4rem;
      margin: 0 10px;
    }
  }
}
</style>
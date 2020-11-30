<template>
  <div class="box">
    <div class="con">
      <p>更新报事类型</p>
      <div class="type flex_f">
        <span
          v-for="(item,i) in baoShiType"
          :key="i"
          @click="leftChange(item.id,i)"
          :class="{discolor:changeLeftBackground == i}"
          v-if="item.id !== nowTypeId"
        >{{item.eventType}}</span>
      </div>
      <!-- 转交原因描述 -->
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="转交原因："
        type="textarea"
        maxlength="50"
        placeholder="请输入原因"
        show-word-limit
      />
    </div>
    <div class="btn flex">
      <van-button color="#999" @click="esc">取消</van-button>
      <van-button color="#A68E44" @click="careOf">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      baoShiType: [],
      changeLeftBackground: -1, //报事类型按钮改变颜色
      message: '', //转交原因描述
      nowTypeId: sessionStorage.getItem('eventId'), //当前任务ID
      eventTypeId: '' //事件类型ID
    }
  },
  mounted() {
    this.axios
      .get('/rest/tbEventTypeConfig/getEventTypes', {
        params: { company_id: localStorage.getItem('companyId'), uid: '' }
      })
      .then(data => {
        console.log(data)
        this.baoShiType = data
      })
  },
  methods: {
    // 取消
    esc() {
      this.$router.push('/manage')
    },
    //报事类型点击改变颜色
    leftChange(id, index) {
      this.changeLeftBackground = index
      this.reportEventTypeId = id
      this.eventTypeId = id
      console.log(id, index)
    },
    //转交事件
    careOf() {
      if (this.eventTypeId == '') {
        this.$toast('请选择转交类型')
      } else {
        this.axios
          .post('/rest/tbEventDeliver/add', {
            uid: localStorage.getItem('uid'), //当前登录人ID
            deliverEventId: sessionStorage.getItem('id'), //转交的事件的ID
            deliverUserId: localStorage.getItem('uid'), //转交人ID
            deliverEventTypeId: this.eventTypeId, //转交的事件类型ID
            remark: this.message //转交描述
          })
          .then(data => {
            this.$toast('转交成功')
            this.$router.push('/eventList')
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    p {
      color: #000;
      font-size: 14px;
      padding: 10px;
    }
    .type {
      margin-bottom: 20px;
      span {
        background: #999;
        padding: 5px 15px;
        border-radius: 6px;
        color: #fff;
        font-size: 10px;
        margin: 8px;
      }
      .discolor {
        background: #a68e44;
      }
    }
  }
  .btn {
    padding: 50px 30px;
    .van-button--normal {
      padding: 0 1.4rem;
    }
  }
}
</style>
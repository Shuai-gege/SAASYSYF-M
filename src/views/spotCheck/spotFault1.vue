<template>
  <div class="box">
    <van-nav-bar title="故障上报" @click-left="onClickLeft" left-arrow :fixed="true"></van-nav-bar>
    <div class="con">
      <!-- 搜索框 -->
      <van-search v-model="value" show-action shape="round" placeholder="模糊搜索：报事人、描述、编号">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!-- 内容 -->
      <div
        class="flex list"
        v-for="(item,i) in fault"
        :key="i"
        @click="itemList(item.patrolPointId,item.buildingName,item.floorName,item.patrolPointName)"
      >
        <span>{{item.buildingName}}/{{item.floorName}}</span>
        <span>{{item.patrolPointName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      fault: [] //故障点List
    }
  },
  mounted() {
    this.faultList()
  },
  methods: {
    faultList() {
      this.keepAxios
        .post(
          this.baseUrl.spotCheck + '/app/check/getCheckScanSignInByDetailId',
          {
            uid: localStorage.getItem('uid'),
            taskDetailId: localStorage.getItem('keepWatchId'),
            page: 0,
            pageSize: 9999
          }
        )
        .then(data => {
          console.log(data)
          let arr = data.data.data.rows.checkScanSignInDetailList

          let obj = {}
          arr = arr.reduce((cur, next) => {
            obj[next.patrolPointId]
              ? ''
              : (obj[next.patrolPointId] = true && cur.push(next))
            return cur
          }, [])
          arr.forEach(item => {
            if (item.patrolPointCheck != '0') {
              this.fault.push(item)
            }
          })
        })
    },
    onClickLeft() {
      this.$router.push('/spotFault')
    },
    itemList(id, buildingName, floorName, patrolPointName) {
      console.log(id)
      console.log(buildingName)
      console.log(floorName)
      console.log(patrolPointName)
      this.$router.push({
        path: 'spotFault',
        query: {
          faultId: id,
          buildingName,
          floorName,
          patrolPointName
        }
      })
    },
    // 模糊查询
    onSearch() {}
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
    padding-top: 45px;
    .list {
      font-size: 14px;
      color: black;
      padding: 10px 20px;
      margin: 0 10px;
      border-bottom: 1px solid #f4f5f6;
    }
  }
}
</style>
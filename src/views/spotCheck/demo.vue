<template>
  <div class="box">
    <div class="con">
      <van-cell-group>
        <van-field
          v-for="(item,i) in arr"
          :key="i"
          v-model="item.money"
          :label="item.name"
          placeholder="请输入用户名"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        { money: '50', name: '老张' },
        { money: '30', name: '小张' },
        { money: '10', name: '小小张' }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang='less' scoped>
.box {
  .con {
  }
}
</style>
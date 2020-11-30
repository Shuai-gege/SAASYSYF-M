<template>
  <div class="box">
    <div class="con">
      <van-cell
        v-for="(item,i) in matterName"
        :key="i"
        v-if="item.childrens == null"
        :title="item.locationName"
        :is-link="false"
        arrow-direction
        @click="children(item.locationName,item)"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      matterName: [] //建筑名称
    }
  },
  mounted() {
    this.matterName = this.$route.params.children
  },
  methods: {
    children(locationName, item) {
      console.log(locationName)
      sessionStorage.setItem(
        'locationName',
        sessionStorage.getItem('locationName') + '>' + locationName
      )
      sessionStorage.setItem('buildingId2', item.id)
      this.$router.push('/dayTask')
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  .con {
  }
}
</style>
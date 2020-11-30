<template>
  <div class="box">
    <div class="con">
      <van-cell
        v-for="(item,i) in matterName"
        :key="i"
        :title="item.locationName"
        v-if="item.childrens !== null"
        is-link
        arrow-direction
        @click="childrens(item.childrens,item.locationName,item)"
      />
      <van-cell
        v-for="(item,i) in matterName"
        :key="i"
        v-if="item.childrens == null"
        :title="item.locationName"
        :is-link="false"
        arrow-direction
        @click="childrens1(item.locationName,item)"
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
    this.tbBuildingLocation()
  },
  methods: {
    //报事位置
    tbBuildingLocation() {
      this.axios
        .get('rest/tbBuildingLocation/getCompanyDeptByCompanyId', {
          params: { company_id: localStorage.getItem('companyId') }
        })
        .then(data => {
          console.log(data)
          this.matterName = data
        })
    },
    childrens(children, locationName, item) {
      this.$router.push({
        name: 'dayTaskLocation01',
        params: {
          children
        }
      })
      sessionStorage.setItem('locationName', locationName)
      sessionStorage.setItem('buildingId0', item.id)
    },
    childrens1(locationName, item) {
      sessionStorage.setItem('locationName', locationName)
      sessionStorage.setItem('buildingId0', item.id)
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
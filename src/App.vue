<template>
  <div id="app">
    <router-view v-if="!$route.meta.keepAlive" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <Footer v-if="$route.meta.ifShow_FootBar" />
  </div>
</template>
<script>
import Footer from './components/Footer'
import './common/css/commons.css'
export default {
  data() {
    return {}
  },
  components: {
    Footer
  }
}
</script>
<style lang="less" scoped>
#app {
  padding: 0;
  margin: 0;
}
</style>
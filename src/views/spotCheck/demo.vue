<template>
  <div class="box">
    <div class="con">
      <a :href="url">扫描</a>
      <h1>{{query}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '接手前的参数',
      url: ''
    }
  },
  mounted() {
    let baseUrl = window.location.href
    this.url =
      'http://sao315.com/w/api/saoyisao?redirect_uri=' + escape(baseUrl)

    var qr = GetQueryString('qrresult')
    if (qr) {
      //alert(qr);
      this.query = qr
    }

    function GetQueryString(name) {
      var reg = new RegExp('\\b' + name + '=([^&]*)')
      var r = location.href.match(reg)
      if (r != null) return decodeURIComponent(r[1])
    }
  },
  methods: {}
}
</script>
<style lang='less' scoped>
.box {
  .con {
  }
}
</style>
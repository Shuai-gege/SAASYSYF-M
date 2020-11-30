<template>
  <div class="box">
    <vue-esign
      ref="esign"
      :width="800"
      :height="300"
      :isCrop="isCrop"
      :lineWidth="lineWidth"
      :lineColor="lineColor"
      :bgColor.sync="bgColor"
    />
    <van-button @click="handleGenerate" type="info">生成图片</van-button>
    <van-button @click="handleReset" type="warning">清空画板</van-button>
    <img :src="resultImg" alt v-if="resultImg != ''" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lineWidth: 4,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: true
    }
  },
  mounted() {},
  methods: {
    handleReset() {
      this.$refs.esign.reset()
    },
    handleGenerate() {
      this.$refs.esign
        .generate()
        .then(res => {
          console.log(res)
          this.resultImg = res
        })
        .catch(err => {
          alert(err) // 画布没有签字时会执行这里 'Not Signned'
        })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
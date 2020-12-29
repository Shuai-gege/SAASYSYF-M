<template>
  <div class="box">
    <van-nav-bar title="创建企业" left-text="首页" @click-left="onClickLeft" left-arrow></van-nav-bar>
    <!-- 创建企业之前 -->
    <div class="con" v-if="flag">
      <van-form @submit="onSubmit">
        <!-- 省市 -->
        <van-field
          readonly
          clickable
          name="area"
          :value="value"
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
        </van-popup>
        <!-- 行业 -->
        <van-field
          readonly
          clickable
          name="trade"
          :value="value1"
          label="行业选择"
          placeholder="点击选择行业"
          @click="showArea1 = true"
        />
        <van-popup v-model="showArea1" position="bottom">
          <van-picker
            title="行业选择"
            show-toolbar
            :columns="columns"
            @confirm="trade"
            @cancel="showArea1 = false"
          />
        </van-popup>
        <!-- 按钮 -->
        <van-field
          v-model="company"
          name="企业名称"
          label="企业名称"
          placeholder="企业名称"
          :rules="[{ required: true, message: '请填写企业名称' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
    <!-- 注册完成后 -->
    <div class="hou" v-else>
      <div class="title flex_c">
        <div>您已注册成功，可点击完成跳转登录页登陆。</div>
      </div>
      <!-- 按钮 -->
      <div class="btn flex_c">
        <van-button type="primary" size="large" color="#1888F9" @click="$router.push('/login')">完成</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import areaList from '../../common/area'
export default {
  data() {
    return {
      value: '', //省市
      value1: '', //行业
      industryId: '', //行业ID
      cityId: '', //市ID
      provinceId: '', //省ID
      showArea: false, //省市
      showArea1: false, //行业
      company: '',
      areaList: areaList, // 数据格式见 Area 组件文档
      columns: [
        { id: '001', text: '物业服务' },
        { id: '002', text: '商业地产' },
        { id: '003', text: '制造业' },
        { id: '004', text: '仓储物流' },
        { id: '005', text: '教育行业' },
        { id: '006', text: '医疗行业' },
        { id: '007', text: '金融服务' },
        { id: '008', text: 'IT通讯' },
        { id: '009', text: '政府' },
        { id: '010', text: '其他' }
      ],
      obj: JSON.parse(this.$route.query.obj),
      flag: true
    }
  },
  mounted() {
    console.log(this.obj)
    if (this.$route.query.flag != undefined) {
      this.flag = this.$route.query.flag
    }
  },
  methods: {
    // 反回上一级
    onClickLeft() {},
    onSubmit(values) {
      this.keepAxios
        .get(this.baseUrl.checkList + '/rest/appUser/checkCompanyName', {
          params: { companyName: this.company }
        })
        .then(data => {
          console.log(data)
          if (data.data.code == 20000) {
            this.$toast(data.data.msg)
            this.keepAxios
              .post(this.baseUrl.checkList + '/rest/appUser/createCompany', {
                cityId: this.cityId,
                companyName: this.company,
                industryId: this.industryId,
                openId: localStorage.getItem('openid'),
                provinceId: this.provinceId,
                password: this.obj.password,
                faceImg: this.obj.faceImg,
                phone: this.obj.phone,
                userName: this.obj.userName,
                uid: this.$cookieStore.getCookie('uid')
              })
              .then(data => {
                console.log(data)
                if (data.data.code == 20000) {
                  this.$toast(data.data.msg)
                  // this.$router.push('/login')
                  this.flag = false
                } else {
                  this.$toast(data.data.msg)
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.$toast(data.data.msg)
          }
        })
    },
    // 选择城市
    onConfirm(values) {
      console.log(values)
      this.provinceId = values[0].code
      this.cityId = values[1].code
      this.value = values
        .filter(item => !!item)
        .map(item => item.name)
        .join('/')
      this.showArea = false
    },
    // 行业选择
    trade(values) {
      console.log(values)
      this.value1 = values.text
      this.industryId = values.id
      this.showArea1 = false
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  color: black;
  font-size: 14px;
  background-image: linear-gradient(#fff, rgb(9, 63, 112));
  .con {
    padding-top: 100px;
  }
  .hou {
    .title {
      padding-top: 85px;
      div {
        width: 300px;
      }
    }
    .btn {
      margin-top: 70px;
      /deep/.van-button--large {
        width: 85%;
        border-radius: 10px;
      }
    }
  }
}
</style>
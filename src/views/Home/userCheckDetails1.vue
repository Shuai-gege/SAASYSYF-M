<template>
  <div class="box">
    <van-nav-bar
      title="事件详情"
      left-text="返回"
      left-arrow
      :fixed="true"
      @click-left="$router.push('/userCheck')"
    />
    <div class="con">
      <!-- 时间 -->
      <div class="flex_s col">
        <span>申请时间:</span>
        <span>{{obj.applyTime|timeFilter('ymdhm')}}</span>
      </div>
      <!-- 申请人 -->
      <div class="flex_s col">
        <span>申请人:</span>
        <span>{{obj.applyName}}</span>
      </div>
      <!-- 联系方式 -->
      <div class="flex_s col">
        <span>联系方式:</span>
        <span>{{obj.applyPhone}}</span>
      </div>
      <!-- 申请部门 -->
      <div class="flex_s col">
        <span>申请部门:</span>
        <span>{{obj.applyDept}}</span>
      </div>
      <!-- 申请原因 -->
      <div class="flex_s col">
        <span>申请原因:</span>
        <span>{{obj.applyRemark}}</span>
      </div>
      <!-- 头像 -->
      <div class="flex_s col">
        <span>头像:</span>
        <span>
          <img :src="obj.registerPic" alt />
        </span>
      </div>
      <!-- 分配部门 -->
      <div class="flex_s col">
        <span>分配部门:</span>
        <span>{{obj.applyDept}}</span>
      </div>
      <!-- 用户赋权 -->
      <div class="flex_s col">
        <span>用户赋权:</span>
        <span>{{obj.deptName}}</span>
      </div>
    </div>
    <van-field
      v-model="obj.applyRemark"
      readonly
      rows="4"
      autosize
      type="textarea"
      placeholder="请输入审核信息"
      show-word-limit
    />
  </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  data() {
    return {
      message: '',
      value: null,
      obj: {}, //详情
      userArr: [], //角色
      userId: '', //角色ID
      buMenId: '', //部门ID
      selectItem: '选择角色',
      // define options
      options: [], //部门树形图
      normalizer(node) {
        console.log(node)
        return {
          id: node.id,
          label: node.name,
          children: node.childrens
        }
      }
    }
  },
  mounted() {
    this.keepAxios
      .get(this.baseUrl.checkList + '/rest/appUser/registerApplyDetail', {
        params: { id: this.$route.query.val }
      })
      .then(data => {
        console.log(data)
        this.obj = data.data.result
      })
  },
  methods: {
    // 部门选择
    section(node, instanceId) {
      console.log(node)
      this.buMenId = node.id.toString()
    },
    end(num) {
      this.keepAxios
        .post(this.baseUrl.checkList + '/rest/appUser/auditingApply', {
          applyRemark: this.message, // 审核信息 ,
          deptId: this.buMenId, // 分配部门id ,
          registerApplyId: this.obj.id, // 申请数据id ,
          roleId: this.userId, // 角色id ,
          status: num // 审核状态 1：审核通过 2：审核拒绝
        })
        .then(data => {
          console.log(data)
          if (data.data.code == 20000) {
            this.$toast(data.data.msg)
            this.$router.push('/userCheck')
          } else {
            this.$toast(data.data.msg)
          }
        })
    },
    abc(id) {
      console.log(id.target.value)
      this.userId = id.target.value
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  color: black;
  font-size: 14px;
  .con {
    padding-top: 50px;
    .col {
      padding: 10px;
      font-size: 14px;
      border-bottom: 1px solid #dcdcdc;
      img {
        width: 50px;
        height: 50px;
      }
      span:nth-child(1) {
        color: #000;
      }
      span:nth-child(2) {
        color: #b9b9b9;
      }
      /deep/.vue-treeselect__control {
        width: 200px;
        height: 35px;
      }
    }
  }
  .btn {
    padding-top: 10px;
    padding-bottom: 30px;
    .van-button--normal {
      margin: 0 30px;
      width: 127px;
    }
  }
}
</style>
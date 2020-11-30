<template>
  <div class="box">
    <div class="con">
      <div class="maxBox">
        <div class="minBox flex" @click="show = true">
          <p>人员选择</p>
          <div>
            <span>{{userName1}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <!-- 人员选择页面 -->
        <van-action-sheet v-model="show" title="人员选择" :accordion="true" close-icon>
          <!-- <van-collapse
            v-for="(item,i) in company"
            :key="i"
            v-model="activeNames"
            @change="buMen"
            :accordion="true"
          >
          <van-collapse-item :title="item.name" :name="item.id">-->
          <!-- <van-collapse
                v-for="(item01,i) in item.childrens"
                :key="i"
                v-model="activeNames1"
                @change="buMen"
                :accordion="true"
              >
          <van-collapse-item :title="item01.name" :name="item01.id">-->
          <div class="content">
            <van-checkbox
              v-for="(item02,i) in personList"
              :key="i"
              v-model="item02.checked"
              checked-color="#A68F43"
              icon-size="20"
              @change="xuan(item02.uid,item02.checked,item02.vserName)"
            >{{item02.vserName}}</van-checkbox>
          </div>
          <!-- </van-collapse-item>
          </van-collapse>-->
          <!-- </van-collapse-item>
          </van-collapse>-->
        </van-action-sheet>
        <!-- 指定当前时间 -->
        <van-field
          v-model="actionTime"
          label="指定开始时间"
          placeholder="指定开始时间"
          input-align="right"
          :disabled="true"
          @click="flag = true"
        />
        <van-datetime-picker
          v-if="flag"
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="time"
        />
        <!-- 指定完成时间 -->
        <van-field
          v-model="overTime"
          label="指定计划工时"
          placeholder="单位：小时"
          input-align="right"
          type="number"
          @touchstart.stop="show100 = true"
        />
        <!-- 数字键盘 -->
        <!-- <van-number-keyboard
          :show="show100"
          extra-key="."
          close-button-text="完成"
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
        />-->
        <!-- 分配备主 -->
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入分配备注"
          show-word-limit
        />
      </div>
      <div class="btn flex">
        <van-button color="#999" @click="$router.go(-1)">取消</van-button>
        <van-button color="#A68F43" @click="end">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      minDate: new Date(new Date()),
      maxDate: new Date('2025/10/1'),
      currentDate: new Date(),
      flag: false, //隐藏显示时间选项
      show: false, //隐藏显示人员选择
      actionTime: '', //开始时间
      overTime: '', //计划多久结束
      message: '', //分配备注
      activeNames: [], //折叠面板
      activeNames1: [], //折叠面板
      checked: false, //人员选择,
      company: [], //公司&部门list
      personList: [], //根据部门查询下面所有人的list
      personUid: [], //部门下面的选择到的人的uid数组
      personUidStr: '', //部门下面的选择到的人的uid字符串
      userName: [],
      userName1: '',
      arr: [], //数字键盘
      show100: false,
      type_dept: '' //事件类型id
    }
  },
  mounted() {
    this.type_dept = this.$route.query.type_dept
    this.actionTime = this.getLocalTime(new Date())
    // 查询所有部门
    // this.axios
    //   .get('/rest/department/getCompanyDept', {
    //     params: { uid: localStorage.getItem('uid') }
    //   })
    //   .then(data => {
    //     console.log(data)
    //     this.company = data
    //   })
    // 根据部门查人
    this.axios
      .post('/rest/tbEventTypeConfig/list', {
        uid: localStorage.getItem('uid'),
        id: this.type_dept
      })
      .then(data => {
        this.personList = data.rows[0].getUserInfoExecute
        this.personList.forEach(item => {
          this.$set(item, 'checked', this.checked)
        })
        console.log(data.rows)
      })
    // this.axios
    //   .get('/rest/department/getAllUsersByDeptId', {
    //     params: {
    //       deptId: this.type_dept
    //     }
    //   })
    //   .then(data => {
    //     console.log(data)
    //     this.personList = data
    //     this.personList.forEach(item => {
    //       this.$set(item, 'checked', this.checked)
    //     })
    //   })
  },
  methods: {
    // 数字键盘
    onInput(value) {
      this.arr.push(value)
      this.overTime = this.arr.join('')
    },
    onDelete() {
      this.$toast('删除')
    },
    //选择时间
    time(value) {
      const d = value
      // 年月日
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate())
      // 时分秒
      const resTime =
        this.p(d.getHours()) +
        ':' +
        this.p(d.getMinutes()) +
        ':' +
        this.p(d.getSeconds())
      this.flag = false
      this.actionTime = resDate + ' ' + resTime
    },
    //转换时间不够10前面补0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    // // 折叠面板
    // buMen(activeNames) {
    //   console.log(activeNames)
    //   this.axios
    //     .get('/rest/department/getUserInfoByDeptId', {
    //       params: {
    //         deptId: activeNames
    //       }
    //     })
    //     .then(data => {
    //       console.log(data)
    //       this.personList = data
    //       this.personList.forEach(item => {
    //         this.$set(item, 'checked', this.checked)
    //       })
    //     })
    // },
    // 选中的人
    xuan(uid, checked, name) {
      console.log(uid)
      console.log(checked)
      if (checked == true) {
        this.personUid.push(uid)
        this.userName.push(name)
      } else if (checked != true) {
        let index = this.personUid.indexOf(uid)
        let index1 = this.userName.indexOf(name)
        if (index !== -1) {
          this.personUid.splice(index, 1)
        }
        if (index1 !== -1) {
          this.userName.splice(index1, 1)
        }
      }
      this.personUid = [...new Set(this.personUid)]
      this.userName = [...new Set(this.userName)]
      this.personUidStr = this.personUid.join(',')
      this.userName1 = this.userName.join('/')
      // console.log(this.personUidStr)
    },
    // 时间戳转为正常时间
    getLocalTime(now) {
      var year = now.getFullYear() //取得4位数的年份
      var month = now.getMonth() + 1 //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate() //返回日期月份中的天数（1到31）
      var hour = now.getHours() //返回日期中的小时数（0到23）
      var minute = now.getMinutes() //返回日期中的分钟数（0到59）
      var second = now.getSeconds() //返回日期中的秒数（0到59）
      return (
        year +
        '/' +
        this.p(month) +
        '/' +
        this.p(date) +
        ' ' +
        this.p(hour) +
        ':' +
        this.p(minute) +
        ':' +
        this.p(second)
      )
    },
    // 分配任务
    end() {
      let startTime = new Date(this.actionTime.replace(/\-/g, '/'))
      if (this.userName1 == '') {
        this.$toast('请选择人员')
      } else if (this.actionTime == '') {
        this.$toast('请选择开始时间')
      } else if (this.overTime == '') {
        this.$toast('请选择计划工时')
      } else {
        this.axios
          .post('/rest/tbEventAllocation/add', {
            duration: this.overTime, //计工时
            remark: this.message, //分配备注
            reportEventId: sessionStorage.getItem('id'), //分配事件的ID
            startTime: startTime, //计划开始时间
            uid: localStorage.getItem('uid'), //当前登录人ID
            userId: this.personUidStr //分配人员，多人用英文逗号隔开
          })
          .then(data => {
            this.$toast('分配成功')
            this.$router.push('/eventList')
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #fff;
  .con {
    .maxBox {
      .minBox {
        padding: 10px 15px;
        font-size: 13px;
        color: #000;
      }
      .content {
        padding: 16px;
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
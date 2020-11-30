<template>
  <div class="taskList1">
    <!-- 头部 -->
    <van-nav-bar title="事件详情" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" />
    <!-- 主体部分 -->
    <div class="con">
      <!-- 选择 -->
      <div class="flex">
        <van-field
          v-model="value"
          placeholder="请选择年月/年"
          @click="showTime = true"
          readonly
          left-icon="clock-o"
        />
        <van-field
          v-model="value1"
          placeholder="请输入公司"
          @click="show = true"
          readonly
          left-icon="cluster-o"
        />
      </div>
      <div>
        <!-- 时间选择框 -->
        <van-datetime-picker
          v-if="showTime"
          v-model="currentDate"
          type="year-month"
          title="选择年"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="time"
          @cancel="showTime = false"
        />
        <!-- 公司选择 -->
        <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
          <div class="content1">
            <van-radio-group v-model="radio">
              <van-radio
                name="1"
                icon-size="17"
                @click="company(company1.id,company1.name)"
              >{{company1.name}}</van-radio>
            </van-radio-group>
          </div>
        </van-popup>
      </div>
      <!-- 展示部分 -->
      <div class="look">
        <!-- 展示排名信息 -->
        <div class="num flex_a">
          <div>
            <p class="flex_c num1">{{eventsTotal}}</p>
            <p>事件事件数</p>
          </div>
          <div>
            <p class="flex_c num1">{{completeEvents}}</p>
            <p>结束事件数</p>
          </div>
          <div>
            <p class="flex_c num1">{{avgScores}}</p>
            <p>评分均值</p>
          </div>
        </div>
        <!-- 图形展示 -->
        <!-- 事件类型分析 -->
        <div class="top flex">事件状态分析</div>
        <div class="charts">
          <!-- 事件类型分析饼图 -->
          <ve-pie :data="chartData" :settings="chartSettings" :loading="loading"></ve-pie>
        </div>
        <!-- 事件类型分析 -->
        <div class="top flex">事件类型分析</div>
        <div class="charts">
          <!-- 事件类型分析饼图 -->
          <ve-pie :data="chartData2" :settings="chartSettings" :loading="loading"></ve-pie>
        </div>
        <!-- 事件位置分析 -->
        <div class="top flex">事件位置分析</div>
        <div class="charts">
          <ve-bar
            :data="chartData4"
            :extend="chartSettings2"
            height="500px"
            :legend-visible="false"
            :loading="loading"
          ></ve-bar>
        </div>
        <!-- 事件评分分析 -->
        <div class="top flex">事件评分分析</div>
        <div class="charts">
          <ve-pie :data="chartData5" :loading="loading"></ve-pie>
        </div>
        <div class="top flex">日事件状态分析</div>
        <div class="charts">
          <!-- 事件类型分析折线图 -->
          <ve-line :data="chartData1" :extend="chartSettings3" :grid="grid" :loading="loading"></ve-line>
        </div>
        <div class="top flex">日报事类型分析</div>
        <!-- 事件状态分析折线图 -->
        <div class="charts">
          <ve-line
            :data="chartData3"
            :extend="chartSettings1"
            :data-zoom="dataZoom"
            :legend-visible="false"
            :grid="grid"
            :loading="loading"
          ></ve-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
import 'echarts/lib/component/dataZoom'
export default {
  data: function() {
    this.chartSettings = {
      // limitShowNum: 5
    }
    this.chartSettings1 = {
      max: ['dataMax', 'dataMax'],
      xAxisType: 'value'
    }
    this.chartSettings3 = {
      max: ['dataMax', 'dataMax'],
      xAxisType: 'value'
    }
    this.chartSettings2 = {
      max: ['dataMax', 'dataMax'],
      yAxis: {
        axisLabel: {
          formatter: v => {
            if (v.length > 4) {
              return v.substr(0, 3) + '...'
            } else {
              return v
            }
          }
        }
      }
    }
    this.grid = {
      show: true,
      left: 3,
      right: 10
    }

    this.dataZoom = [
      {
        type: 'slider'
      }
    ]
    return {
      value: '', //时间选择
      showTime: false, //时间选择隐藏现实
      value1: '', //公司选择
      show: false, //公司选择隐藏现实
      minDate: new Date(2000),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      company1: {},
      radio: '', //公司选择
      // 事件状态分析
      chartData: {
        columns: ['数', '访问用户'],
        rows: []
      },
      // 事件状态分析
      chartData1: {
        columns: ['日期', '报事事件数', '结束事件数', '当日滞压数'],
        rows: []
      },
      // 事件类型分析
      chartData2: {
        columns: ['事件类型', '报事数量'],
        rows: []
      },
      // 事件类型分析
      chartData3: {
        columns: ['日期'],
        rows: []
      },
      // 事件位置分析
      chartData4: {
        columns: ['建筑', '报事总数'],
        rows: []
      },
      // 事件评分分析
      chartData5: {
        columns: ['分', '事件数'],
        rows: []
      },
      avgScores: '', //评分均值
      eventsTotal: '', //当月报事数量
      completeEvents: '', //完成数量
      loading: true,
      rest: '', //事件类型分析饼图其他
      typeObj: [],
      eventTypeArr: [],
      nowTime: new Date(), //当月时间
      listTime: []
    }
  },
  mounted() {
    this.department()
    let nowTime = new Date()
    this.value = nowTime.getFullYear() + '-' + this.p(nowTime.getMonth() + 1)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 时间选择
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    //转换时间不够10前面补0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    // 时间
    time(value) {
      const d = value
      this.nowTime = value
      this.value = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
      this.showTime = false
      ;(this.chartData = {
        columns: ['数', '访问用户'],
        rows: []
      }),
        // 事件状态分析
        (this.chartData1 = {
          columns: ['日期', '报事事件数', '结束事件数', '当日滞压数'],
          rows: []
        })
      // 事件类型分析
      this.chartData2 = {
        columns: ['事件类型', '报事数量'],
        rows: []
      }
      // 事件类型分析
      this.chartData3 = {
        columns: ['日期'],
        rows: []
      }
      // 事件位置分析
      this.chartData4 = {
        columns: ['建筑', '报事总数'],
        rows: []
      }
      // 事件评分分析
      this.chartData5 = {
        columns: ['分', '事件数'],
        rows: []
      }
      //展示图表数据
      this.loading = true
      this.board()
      // 折线图
      this.zheXian()
    },
    // 技冠群雄选择公司
    company(id, name) {
      this.value1 = name
      this.companyId = id
      ;(this.chartData = {
        columns: ['数', '访问用户'],
        rows: []
      }),
        // 事件状态分析
        (this.chartData1 = {
          columns: ['日期', '报事事件数', '结束事件数', '当日滞压数'],
          rows: []
        })
      // 事件类型分析
      this.chartData2 = {
        columns: ['事件类型', '报事数量'],
        rows: []
      }
      // 事件类型分析
      this.chartData3 = {
        columns: ['日期'],
        rows: []
      }
      // 事件位置分析
      this.chartData4 = {
        columns: ['建筑', '报事总数'],
        rows: []
      }
      // 事件评分分析
      this.chartData5 = {
        columns: ['分', '事件数'],
        rows: []
      }
      this.loading = true
      //展示图表数据
      this.board()
      // 折线图
      this.zheXian()
    },
    //查询登录人下面所有公司/部门
    department() {
      this.axios
        .get('/rest/department/getCompanyByUid', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          this.company1 = data
          this.value1 = data.name
          //展示图表数据
          this.board()
          // 折线图
          this.zheXian()
        })
    },
    // 展示图表数据
    board() {
      this.axios
        .get('/rest/management/board', {
          params: {
            companyId: this.company1.id, //公司id
            queryTime: this.value //查询时间
          }
        })
        .then(data => {
          this.loading = false
          this.avgScores = data.avgScores
          this.completeEvents = data.completeEvents
          this.eventsTotal = data.eventsTotal
          // 事件状态饼图
          this.chartData.rows = [
            { 数: '已结束事件', 访问用户: data.completeEventsMonth },
            { 数: '上报结束事件', 访问用户: data.invalidEventsMonth },
            { 数: '未结束事件', 访问用户: data.noFinishEventsMonth },
            { 数: '被合并事件', 访问用户: data.mergeEvents }
          ]
          // 事件类型饼图----------------------------------------------------------------
          data.eventTypeDataList[0].eventTypeCountDataList.sort(function(a, b) {
            return parseInt(a.typeCount) < parseInt(b.typeCount) ? 1 : -1
          })
          data.eventTypeDataList[0].eventTypeCountDataList.forEach(
            (item, index) => {
              this.typeObj = data.eventTypeDataList[0].eventTypeCountDataList.splice(
                5
              )
              // previousValue,初始值或上一次回调函数叠加的值
              // currentValue,本次回调（循环）将要执行的值；
              this.typeObj.forEach(item => {
                this.eventTypeArr.push(parseInt(item.typeCount))
              })
              this.rest = this.eventTypeArr.reduce(
                (previousValue, currentValue) => {
                  return previousValue + currentValue
                },
                1
              )
              if (
                index == 0 ||
                index == 1 ||
                index == 2 ||
                index == 3 ||
                index == 4
              ) {
                this.chartData2.rows.push({
                  事件类型: item.typeName,
                  报事数量: item.typeCount
                })
              }
            }
          )
          this.chartData2.rows.push({
            事件类型: '其他',
            报事数量: this.rest
          })
          console.log(this.chartData2)
          // 事件位置分析
          // 把建筑名字都替换一下-----------------------------------
          data.eventLocationDataList.forEach(item => {
            this.chartData4.rows.push({
              建筑: item.buildingName,
              报事总数: item.buildingEvents
            })
          })
          // 事件评分分析
          data.eventScoreDataList.forEach((item, index) => {
            if (item.eventCounts != 0) {
              this.chartData5.rows.push({
                分: index + '-' + (index + 1) + '分',
                事件数: item.eventCounts
              })
            }
          })
          console.log(this.chartData5)
        })
    },
    // 折线图
    zheXian() {
      this.axios
        .get('/rest/management/getManagementLine', {
          params: {
            companyId: this.company1.id, //公司id
            queryTime: this.value //查询时间
          }
        })
        .then(data => {
          // 事件状态折线图
          this.loading = false
          let time = this.nowTime.getMonth() + 1 + '-' + 1
          data.eventStatusLineList.forEach((item, index) => {
            this.chartData1.rows.push({
              日期: this.nowTime.getMonth() + 1 + '-' + item.dateCensus,
              报事事件数: item.reportEvents,
              结束事件数: item.completeEvents,
              当日滞压数: item.noFinishEvents
            })
          })
          // 事件类型折线图----------------------------------------------------------------
          data.eventTypeDataList[0].eventTypeCountDataList.forEach(item => {
            this.chartData3.columns.push(item.typeName)
          })
          data.eventTypeDataList.map(item => {
            let obj = {
              日期: this.nowTime.getMonth() + 1 + '-' + item.columnName
            }
            item.eventTypeCountDataList.map(item1 => {
              return (obj[item1.typeName] = item1.typeCount)
            })
            this.chartData3.rows.push(obj)
          })
          console.log(this.listTime)
          console.log(this.chartData3)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.taskList1 {
  min-height: 100vh;
  background: #f4f5f6;
  padding-bottom: 5px;
  .con {
    padding-top: 50px;
    .content1 {
      padding: 20px;
    }
    .look {
      padding: 0 5px;
      .num {
        background: #fff;
        margin-top: 10px;
        padding: 5px;
      }
      .num1 {
        font-size: 18px;
        font-weight: 700;
        color: #000;
      }
      .top {
        font-size: 16px;
        color: #000;
        padding: 5px;
        background: #fff;
        margin-top: 5px;
        border-bottom: 1px solid #f4f4f6;
      }
      .charts {
        background: #fff;
      }
    }
  }
}
</style>
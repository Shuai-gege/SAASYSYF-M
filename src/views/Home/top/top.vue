<template>
  <div class="box">
    <van-nav-bar title="我的排行榜" left-text="首页" left-arrow @click-left="onClickLeft" />
    <div class="con">
      <div class="one"></div>
      <div class="two"></div>
      <van-tabs
        v-model="active"
        :ellipsis="false"
        @click="dian"
        color="#a68e44"
        sticky
        background="#f5f6f7"
        title-active-color="#a68e44"
      >
        <van-tab title="技冠群雄总分榜">
          <!-- 年度&月度排名 -->
          <div style="background:#fff;margin-bottom:5px;">
            <div class="flex_l paiMing">
              <span
                v-for="(item,i) in baoShiType"
                :key="i"
                @click="leftChange(item,i)"
                :class="{discolor1:changeLeftBackground == i}"
              >{{item}}</span>
            </div>
            <!-- 时间&公司筛选 -->
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
          <!-- 展示list -->
          <Mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="mescroll">
            <div class="content">
              <!-- 展示排名信息 -->
              <div class="num flex_a">
                <div>
                  <p v-if="num.scoreTotal==0" class="flex_c num1">-</p>
                  <p v-else class="flex_c num1">{{num.scoreTotal}}</p>
                  <p>我的总分</p>
                </div>
                <div>
                  <p v-if="num.assessTotal==0" class="flex_c num1">-</p>
                  <p v-else class="flex_c num1">{{num.assessTotal}}</p>
                  <p>我的评价次数</p>
                </div>
                <div>
                  <p
                    class="flex_c num1"
                    v-if="num.rankingCompany !=0 && num.personCount!=0"
                  >{{num.rankingCompany}}/{{num.personCount}}</p>
                  <p
                    class="flex_c num1"
                    v-else-if="num.rankingCompany ==0 && num.personCount==0"
                  >-/-</p>
                  <p class="flex_c num1" v-else-if="num.rankingCompany == 0">-/{{num.personCount}}</p>
                  <p class="flex_c num1" v-else-if="num.personCount == 0">{{num.rankingCompany}}/-</p>

                  <p>我的排名/参与数</p>
                </div>
              </div>

              <!-- 展示排名List -->
              <div class="rankingList">
                <table width="100%">
                  <tr style="font-size:14px;font-size:16px;color:#000">
                    <th>排名</th>
                    <th>名字</th>
                    <th>分数</th>
                  </tr>
                  <tr v-for="(item,i) in list" :key="i" style="text-align:center;font-size:16px;">
                    <td
                      v-if="item.orderNo != '1'&&item.orderNo != '2'&&item.orderNo != '3'"
                    >{{item.orderNo}}</td>
                    <td v-if="item.orderNo == '1'" class="td">
                      <img class="tu" src="../../../images/图标/jin.jpeg" alt />
                    </td>
                    <td v-if="item.orderNo == '2'" class="td">
                      <img class="tu" src="../../../images/图标/yin.jpeg" alt />
                    </td>
                    <td v-if="item.orderNo == '3'" class="td">
                      <img class="tu" src="../../../images/图标/tong.jpeg" alt />
                    </td>

                    <td>{{item.userName}}</td>
                    <td>{{item.aboutCount}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </Mescroll-vue>
        </van-tab>
        <van-tab title="火眼金睛榜">
          <div style="background:#fff;margin-bottom:5px;">
            <!-- 年度&月度排名 -->
            <div class="flex_l paiMing">
              <span
                v-for="(item,i) in baoShiType1"
                :key="i"
                @click="leftChange1(item,i)"
                :class="{discolor1:changeLeftBackground1 == i}"
              >{{item}}</span>
            </div>
            <!-- 时间&公司筛选 -->
            <div class="flex">
              <van-field
                v-model="value3"
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
          </div>
          <!-- 时间选择框 -->
          <van-datetime-picker
            v-if="showTime"
            v-model="currentDate"
            type="year-month"
            title="选择年"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter1"
            @confirm="time2"
            @cancel="showTime = false"
          />
          <!-- 公司选择 -->
          <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
            <div class="content1">
              <van-radio-group v-model="radio">
                <van-radio name="1" icon-size="17" @click="company2(company1.id)">{{company1.name}}</van-radio>
              </van-radio-group>
            </div>
          </van-popup>

          <!-- 展示list -->
          <Mescroll-vue ref="mescroll" :up="mescrollUp1" @init="mescrollInit" class="mescroll">
            <div class="content">
              <!-- 展示排名信息 -->
              <div class="num flex_a">
                <div>
                  <p v-if="num1.reportEvents==0" class="flex_c num1">-</p>
                  <p v-else class="flex_c num1">{{num1.reportEvents}}</p>
                  <p>我的报事数</p>
                </div>
                <div>
                  <!-- <p class="flex_c num1">{{num.rankingCompany}}/{{num.personCount}}</p> -->
                  <p
                    class="flex_c num1"
                    v-if="num1.rankingCompany !=0 && num1.personCount!=0"
                  >{{num1.rankingCompany}}/{{num1.personCount}}</p>
                  <p
                    class="flex_c num1"
                    v-else-if="num1.rankingCompany ==0 && num1.personCount==0"
                  >-/-</p>
                  <p class="flex_c num1" v-else-if="num1.rankingCompany == 0">-/{{num1.personCount}}</p>
                  <p class="flex_c num1" v-else-if="num1.personCount == 0">{{num1.rankingCompany}}/-</p>
                  <p>我的排名/参与数</p>
                </div>
              </div>
              <!-- 展示排名List -->
              <div class="rankingList">
                <table width="100%">
                  <tr style="font-size:14px;font-size:16px;color:#000">
                    <th>排名</th>
                    <th>名字</th>
                    <th>分数</th>
                  </tr>
                  <tr v-for="(item,i) in list1" :key="i" style="text-align:center;font-size:16px;">
                    <td
                      v-if="item.orderNo != '1'&&item.orderNo != '2'&&item.orderNo != '3'"
                    >{{item.orderNo}}</td>
                    <td v-if="item.orderNo == '1'" class="td">
                      <img class="tu" src="../../../images/图标/jin.jpeg" alt />
                    </td>
                    <td v-if="item.orderNo == '2'" class="td">
                      <img class="tu" src="../../../images/图标/yin.jpeg" alt />
                    </td>
                    <td v-if="item.orderNo == '3'" class="td">
                      <img class="tu" src="../../../images/图标/tong.jpeg" alt />
                    </td>
                    <td>{{item.userName}}</td>
                    <td>{{item.aboutCount}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </Mescroll-vue>
        </van-tab>
        <van-tab title="指挥若定榜">
          <div style="background:#fff;margin-bottom:5px;">
            <!-- 年度&月度排名 -->
            <div class="flex_l paiMing">
              <span
                v-for="(item,i) in baoShiType2"
                :key="i"
                @click="leftChange2(item,i)"
                :class="{discolor1:changeLeftBackground2 == i}"
              >{{item}}</span>
            </div>
            <!-- 时间&公司筛选 -->
            <div class="flex">
              <van-field
                v-model="value4"
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
          </div>

          <!-- 时间选择框 -->
          <van-datetime-picker
            v-if="showTime"
            v-model="currentDate"
            type="year-month"
            title="选择年"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter2"
            @confirm="time3"
            @cancel="showTime = false"
          />
          <!-- 公司选择 -->
          <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
            <div class="content1">
              <van-radio-group v-model="radio">
                <van-radio name="1" icon-size="17" @click="company3(company1.id)">{{company1.name}}</van-radio>
              </van-radio-group>
            </div>
          </van-popup>

          <!-- 展示list -->
          <Mescroll-vue ref="mescroll" :up="mescrollUp2" @init="mescrollInit" class="mescroll">
            <div class="content">
              <!-- 展示排名信息 -->
              <div class="num flex_a">
                <div>
                  <p
                    class="flex_c num1"
                    v-if="num2.checkSuccessEvents != 0"
                  >{{num2.checkSuccessEvents}}</p>
                  <p v-else class="flex_c num1">-</p>
                  <p>我的分配&验收事件数</p>
                </div>
                <div>
                  <!-- <p class="flex_c num1">{{num.rankingCompany}}/{{num.personCount}}</p> -->
                  <p
                    class="flex_c num1"
                    v-if="num2.rankingCompany !=0 && num2.personCount!=0"
                  >{{num2.rankingCompany}}/{{num2.personCount}}</p>
                  <p
                    class="flex_c num1"
                    v-else-if="num2.rankingCompany ==0 && num2.personCount==0"
                  >-/-</p>
                  <p class="flex_c num1" v-else-if="num2.rankingCompany == 0">-/{{num2.personCount}}</p>
                  <p class="flex_c num1" v-else-if="num2.personCount == 0">{{num2.rankingCompany}}/-</p>
                  <p>我的排名/参与数</p>
                </div>
              </div>
              <!-- 展示排名List -->
              <div class="rankingList">
                <table width="100%">
                  <tr style="font-size:14px;font-size:16px;color:#000">
                    <th>排名</th>
                    <th>名字</th>
                    <th>分数</th>
                  </tr>
                  <tr v-for="(item,i) in list2" :key="i" style="text-align:center;font-size:16px;">
                    <td
                      v-if="item.orderNo != '1'&&item.orderNo != '2'&&item.orderNo != '3'"
                    >{{item.orderNo}}</td>
                    <td v-if="item.orderNo == '1'" class="td">
                      <img class="tu" src="../../../images/图标/jin.jpeg" alt />
                    </td>
                    <td v-if="item.orderNo == '2'" class="td">
                      <img class="tu" src="../../../images/图标/yin.jpeg" alt />
                    </td>
                    <td v-if="item.orderNo == '3'" class="td">
                      <img class="tu" src="../../../images/图标/tong.jpeg" alt />
                    </td>
                    <td>{{item.userName}}</td>
                    <td>{{item.aboutCount}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </Mescroll-vue>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      active: 0,
      active1: '1',
      value: '', //技冠群雄时间
      value1: '',
      value2: 'a',
      value3: '', //火眼金睛时间
      value4: '', //指挥若定时间
      flag: '0',
      baoShiType: ['月度排名', '年度排名'], //技冠群雄
      changeLeftBackground: 0, //报事类型按钮改变颜色，技冠群雄
      baoShiType1: ['月度排名', '年度排名'], //火眼金睛
      changeLeftBackground1: 0, //报事类型按钮改变颜色，火眼金睛
      baoShiType2: ['月度排名', '年度排名'], //指挥若定
      changeLeftBackground2: 0, //报事类型按钮改变颜色，指挥若定
      minDate: new Date(2000),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      yearMonth: '1', //选择时间，年&年月
      yearMonth1: '1', //选择时间，年&年月
      yearMonth2: '1', //选择时间，年&年月
      showTime: false, //时间选择隐藏现实
      show: false, //公司选择
      radio: '', //公司选择
      company1: {},
      companyId: localStorage.getItem('companyId'), //公司ID
      mescroll: null, // mescroll实例对象
      page: {
        num: 0,
        size: 1000
      },
      mescrollUp: {
        page: {
          num: 0,
          size: 1000
        },
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      },
      mescrollUp1: {
        page: {
          num: 0,
          size: 1000
        },
        // 上拉加载的配置.
        callback: this.upCallback1, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      },
      mescrollUp2: {
        page: {
          num: 0,
          size: 1000
        },
        // 上拉加载的配置.
        callback: this.upCallback2, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 5 //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      },
      list: [], //排行列表
      list1: [], //排行列表
      list2: [], //排行列表
      num: '', //技冠群雄
      num1: '', //火眼金睛
      num2: '' //指挥若定
    }
  },
  mounted() {
    this.time1()
    this.time4()
    this.time5()
    this.department()
    this.fen()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/')
    },
    // 分数查询技冠群雄
    fen() {
      this.axios
        .get('/rest/tbEventReport/getH5RankingData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: this.active1, //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth //月度/年度排名 1:月度 2:年度
          }
        })
        .then(data => {
          this.num = data
        })
    },
    // 分数查询火眼金睛
    fen1() {
      this.axios
        .get('/rest/tbEventReport/getH5RankingData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: this.active1, //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value3, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth1 //月度/年度排名 1:月度 2:年度
          }
        })
        .then(data => {
          this.num1 = data
        })
    },
    // 分数查询指挥若定
    fen2() {
      this.axios
        .get('/rest/tbEventReport/getH5RankingData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: this.active1, //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value4, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth2 //月度/年度排名 1:月度 2:年度
          }
        })
        .then(data => {
          this.num2 = data
        })
    },
    // 技冠群雄
    leftChange(name, index) {
      const d = new Date(new Date())
      this.changeLeftBackground = index
      this.reportEventTypeId = name
      if (name == '月度排名') {
        this.yearMonth = '1'
        this.value = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
        this.fen()
        this.paiMing(this.active1)
      } else {
        this.yearMonth = '2'
        this.value = d.getFullYear()
        this.fen()
        this.paiMing(this.active1)
      }
    },
    // 火眼金睛
    leftChange1(name, index) {
      const d = new Date(new Date())
      this.changeLeftBackground1 = index
      this.reportEventTypeId = name
      if (name == '月度排名') {
        this.yearMonth1 = '1'
        this.value3 = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
        this.fen1()
        this.paiMing1(this.active1)
      } else {
        this.yearMonth1 = '2'
        this.value3 = d.getFullYear()
        this.fen1()
        this.paiMing1(this.active1)
      }
    },
    // 指挥若定
    leftChange2(name, index) {
      const d = new Date(new Date())
      this.changeLeftBackground2 = index
      this.reportEventTypeId = name
      if (name == '月度排名') {
        this.yearMonth2 = '1'
        this.value4 = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
        this.fen2()
        this.paiMing2(this.active1)
      } else {
        this.yearMonth2 = '2'
        this.value4 = d.getFullYear()
        this.fen2()
        this.paiMing2(this.active1)
      }
    },
    // 时间选择技冠群雄
    formatter(type, val) {
      if (this.yearMonth == '1') {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return `${val}月`
        }
        return val
      } else {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return ''
          // `${val}月`
        }
        return val
      }
    },
    // 时间选择火眼金睛
    formatter1(type, val) {
      if (this.yearMonth1 == '1') {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return `${val}月`
        }
        return val
      } else {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return ''
          // `${val}月`
        }
        return val
      }
    },
    // 时间选择指挥若定
    formatter2(type, val) {
      if (this.yearMonth2 == '1') {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return `${val}月`
        }
        return val
      } else {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return ''
          // `${val}月`
        }
        return val
      }
    },
    //转换时间不够10前面补0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    // 技冠群雄时间
    time(value) {
      const d = value
      if (this.yearMonth == '2') {
        this.value = d.getFullYear()
        this.fen()
        this.paiMing(this.active1)
      } else if (this.yearMonth == '1') {
        this.value = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
        this.fen()
        this.paiMing(this.active1)
      }
      this.showTime = false
    },
    // 火眼金睛时间
    time2(value) {
      const d = value
      if (this.yearMonth1 == '2') {
        this.value3 = d.getFullYear()
        this.fen1()
        this.paiMing1(this.active1)
      } else if (this.yearMonth1 == '1') {
        this.value3 = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
        this.fen1()
        this.paiMing1(this.active1)
      }
      this.showTime = false
    },
    // 指挥若定时间
    time3(value) {
      const d = value
      if (this.yearMonth2 == '2') {
        this.value4 = d.getFullYear()
        this.fen2()
        this.paiMing2(this.active1)
      } else if (this.yearMonth2 == '1') {
        this.value4 = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
        this.fen2()
        this.paiMing2(this.active1)
      }
      this.showTime = false
    },
    // 时间技冠群雄
    time1() {
      const d = new Date(new Date())
      if (this.yearMonth == '2') {
        this.value = d.getFullYear()
      } else if (this.yearMonth == '1') {
        this.value = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
      }
      this.showTime = false
    },
    // 时间火眼金睛
    time4() {
      const d = new Date(new Date())
      if (this.yearMonth1 == '2') {
        this.value3 = d.getFullYear()
      } else if (this.yearMonth1 == '1') {
        this.value3 = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
      }
      this.showTime = false
    },
    // 时间指挥若定
    time5() {
      const d = new Date(new Date())
      if (this.yearMonth2 == '2') {
        this.value4 = d.getFullYear()
      } else if (this.yearMonth2 == '1') {
        this.value4 = d.getFullYear() + '-' + this.p(d.getMonth() + 1)
      }
      this.showTime = false
    },
    // 查询登录人下面所有公司/部门
    department() {
      this.axios
        .get('/rest/department/getCompanyByUid', {
          params: { uid: localStorage.getItem('uid') }
        })
        .then(data => {
          console.log(data)
          this.company1 = data
          this.value1 = data.name
        })
    },
    // 技冠群雄选择公司
    company(id, name) {
      this.value1 = name
      this.companyId = id
      this.paiMing(this.active1)
      console.log(id, name)
      this.fen()
    },
    company2(id, name) {
      this.value1 = name
      this.companyId = id
      this.paiMing1(this.active1)
      console.log(id, name)
      this.fen()
    },
    company3(id, name) {
      this.value1 = name
      this.companyId = id
      this.fen()
      this.paiMing2(this.active1)
      console.log(id, name)
    },
    dian(name, title) {
      if (name == 0) {
        this.active1 = '1'
        this.fen()
        this.paiMing(this.active1)
      } else if (name == 1) {
        this.active1 = '3'
        this.fen()
      } else if (name == 2) {
        this.active1 = '4'
        this.fen()
      }
    },
    // 总分榜筛选后的list
    paiMing(num) {
      this.axios
        .get('/rest/tbEventReport/getH5BelowData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: num, //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth, //月度/年度排名 1:月度 2:年度
            page: '0',
            limit: '100000'
          }
        })
        .then(data => {
          this.list = data.rows
        })
    },
    // 火眼金睛榜筛选后的list
    paiMing1(num) {
      this.axios
        .get('/rest/tbEventReport/getH5BelowData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: num, //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value3, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth1, //月度/年度排名 1:月度 2:年度
            page: '0',
            limit: '100000'
          }
        })
        .then(data => {
          this.list1 = data.rows
        })
    },
    // 指挥若定榜筛选后的list
    paiMing2(num) {
      this.axios
        .get('/rest/tbEventReport/getH5BelowData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: num, //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value4, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth2, //月度/年度排名 1:月度 2:年度
            page: '0',
            limit: '100000'
          }
        })
        .then(data => {
          this.list2 = data.rows
        })
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 总分榜
    upCallback(page, mescroll) {
      this.axios
        .get('/rest/tbEventReport/getH5BelowData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: '1', //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth, //月度/年度排名 1:月度 2:年度
            page: page.num,
            limit: page.size
          }
        })
        .then(data => {
          this.fen()
          // 请求的列表数据
          let arr = data.rows
          console.log(arr)
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list = []
          }
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true)
          })
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    },
    // 火眼金睛榜
    upCallback1(page, mescroll) {
      this.axios
        .get('/rest/tbEventReport/getH5BelowData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: '3', //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value3, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth1, //月度/年度排名 1:月度 2:年度
            page: page.num,
            limit: page.size
          }
        })
        .then(data => {
          this.fen1()
          // 请求的列表数据
          let arr = data.rows
          console.log(arr)
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list1 = []
          }
          // 把请求到的数据添加到列表
          this.list1 = this.list1.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true)
          })
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    },
    //指挥若定榜
    upCallback2(page, mescroll) {
      this.axios
        .get('/rest/tbEventReport/getH5BelowData', {
          params: {
            uid: localStorage.getItem('uid'), //登录人ID
            rankingType: '4', //	排行榜类别 1: 总分榜 2:均分榜 3:金睛榜 4：指挥榜
            yearAndMonth: this.value4, //筛选时间
            companyId: this.companyId, //公司id
            monthOrYear: this.yearMonth2, //月度/年度排名 1:月度 2:年度
            page: page.num,
            limit: page.size
          }
        })
        .then(data => {
          this.fen2()
          // 请求的列表数据
          let arr = data.rows
          console.log(arr)
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list2 = []
          }
          // 把请求到的数据添加到列表
          this.list2 = this.list2.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true)
          })
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f5f6f7;
  .con {
    .one {
      height: 25px;
      border-right: 1px solid #a68e44;
      position: fixed;
      top: 58px;
      left: 135px;
      z-index: 999;
    }
    .two {
      height: 25px;
      border-right: 1px solid #a68e44;
      position: fixed;
      top: 58px;
      left: 255px;
      z-index: 999;
    }
    .mescroll {
      position: fixed;
      top: 165px;
      bottom: 0px;
      height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
    }
    .van-picker {
      z-index: 999;
    }
    /deep/.van-tabs__wrap--scrollable .van-tab--complete {
      width: 120px;
    }
    // /deep/.van-field__control:read-only {
    //   text-align: center;
    // }
    // /deep/input[type='text'] {
    //   text-align: center;
    // }
    .paiMing {
      span {
        background: #999;
        padding: 5px 8px;
        border-radius: 5px;
        color: #fff;
        font-size: 10px;
        margin: 5px 7px;
      }
      .discolor1 {
        background: #a68e44;
      }
    }
    .content {
      .num {
        background: #fff;
        margin-top: 10px;
      }
      .num1 {
        font-size: 18px;
        font-weight: 700;
        color: #000;
      }
    }
    .rankingList {
      margin-top: 5px;
      background: #fff;
      .td {
        // position: absolute;
        // left: 40px;
        .tu {
          width: 15px;
          height: 15px;
          margin: 0 auto;
        }
      }

      .item {
        color: #000;
        font-size: 15px;
        padding: 5px;
        border-bottom: 1px solid #f5f6f4;
        .paiMing {
          padding: 0 30px;
        }
      }
      .titleList {
        color: #000;
        font-size: 14px;
        padding: 5px;
        border-bottom: 1px solid #f5f6f4;
      }
    }
    .content1 {
      padding: 15px;
    }
  }
}
</style>
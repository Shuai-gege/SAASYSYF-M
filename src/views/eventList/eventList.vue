<template>
  <div class="box">
    <van-nav-bar title="报事任务" left-text="首页" @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon name="filter-o" size="18" @click="isShow" />
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <van-search v-model="value" show-action shape="round" placeholder="模糊搜索：报事人、描述、编号">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 筛选页面 -->
    <van-popup v-model="show" position="top" :style="{ height: '100%' }">
      <div class="mescroll-touch">
        <!-- 报事类型 -->
        <p>事件类型</p>
        <div class="minbox flex_w">
          <h6
            @click="leftChange(item.id,i)"
            :class="{discolor:changeLeftBackground == i}"
            v-for="(item,i) in baoShiType"
            :key="i"
          >{{item.eventType}}</h6>
        </div>
        <p>报事时间</p>
        <div class="time">
          <van-cell-group class="flex">
            <van-field v-model="actionTime" placeholder="请输入开始时间" @click="flag = true" readonly />至
            <van-field v-model="xianZaiTime" placeholder="请输入结束时间" @click="flag1 = true" readonly />
          </van-cell-group>
          <!-- 时间选择框 -->
          <van-datetime-picker
            v-if="flag"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="endTime"
            @cancel="overTime"
          />
          <van-datetime-picker
            v-if="flag1"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="endTime1"
            @cancel="overTime"
          />
        </div>
        <!-- 事件状态 -->
        <p v-if="show7">事件状态</p>
        <div class="minbox flex_w" v-if="show7">
          <h6
            @click="leftChange1(item.id,i)"
            :class="{discolor1:changeLeftBackground1 == i}"
            v-for="(item,i) in baoShiType1"
            :key="i"
          >{{item.name}}</h6>
        </div>
        <!-- 按钮 -->
        <div class="btn flex">
          <van-button color="#999" @click="show = false">取消</van-button>
          <van-button color="#a48f36" @click="query">确认</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 主体部分 -->
    <div class="con">
      <van-tabs v-model="active" color="#000" background="#fff" :sticky="true" @click="over">
        <Mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="mescroll">
          <van-tab title="待我处理">
            <div class="null" v-if="list.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list"
              :key="i"
              @click="mangeDateils(item.id,item.reportEventTypeId,item.eventStatusNow)"
            >
              <div class="flex col">
                <span>报事类型</span>
                <span>{{item.report_type_name}}</span>
              </div>
              <div class="flex col">
                <span>报事人</span>
                <span>{{item.reporter_name}}</span>
              </div>
              <div class="flex col">
                <span>报事时间</span>
                <span>{{item.createTime | teShuTime}}</span>
              </div>
              <div class="flex col">
                <span>报事描述</span>
                <span class="yihang">{{item.eventRemark}}</span>
              </div>
              <div class="flex col">
                <span>事件编号</span>
                <span class="yihang">{{item.eventCode}}</span>
              </div>
              <van-divider />
              <!-- 上报收件待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 1&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 1&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}创建了事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 已分配待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 2&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 2&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}分配事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 已转件待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 3&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 3&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}转交事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 延时申请通过 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 13&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 13&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}同意了我的延时申请。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 延时申请拒绝 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 14&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 14&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}拒绝了我的延时申请。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 已转件待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 4&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 4&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}转交事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 无效上报待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 5&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 5&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}创建了无效事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 已完成待处理 -->
              <div
                class="flex col"
                style="color:#FF8C00"
                v-if="item.eventStatusNow == 6&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}验收。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#FF8C00"
                v-else-if="item.eventStatusNow == 6&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}完成事件，等待我验收。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 退回待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 7&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 7&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}退回了事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 延期待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 8&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 8&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}申请延期，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 拒绝完成 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 10&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 10&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}拒绝事件完成，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 同意退回处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 11&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 11&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}同意退回，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 拒绝退回处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 12&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 12&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}同意退回，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 拒绝上报处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 17&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 17&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}同意退回，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
            </div>
          </van-tab>
          <van-tab title="我已处理">
            <div class="null" v-if="list1.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list1"
              :key="i"
              @click="mangeDateils1(item.id,item.reportEventTypeId,item.eventStatusNow)"
            >
              <div class="flex col">
                <span>报事类型</span>
                <span>{{item.report_type_name}}</span>
              </div>
              <div class="flex col">
                <span>报事人</span>
                <span>{{item.reporter_name}}</span>
              </div>
              <div class="flex col">
                <span>报事时间</span>
                <span>{{item.createTime | teShuTime}}</span>
              </div>
              <div class="flex col">
                <span>报事描述</span>
                <span class="yihang">{{item.eventRemark}}</span>
              </div>
              <div class="flex col">
                <span>事件编号</span>
                <span class="yihang">{{item.eventCode}}</span>
              </div>
              <van-divider />
              <!-- 已分配待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 2&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 2&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}分配事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 已分配待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 3&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 3&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}合并事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 已转交待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 4&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理,总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 4&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}分配事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 无效上报待处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 5&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 5&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}创建了无效事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 完成待审核-->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 6&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}验收。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 6&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}已完成事件，等待验收。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 退回待审核-->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 7&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 7&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}退回事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 延期待审核-->
              <div
                class="flex col"
                style="color:#f00"
                v-if="item.eventStatusNow == 8&&item.tbEventLogBeans!=null"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空时的处理 -->
              <div
                class="flex col"
                style="color:#f00"
                v-else-if="item.eventStatusNow == 8&&item.tbEventLogBeans==null"
              >{{item.reporter_name}}延期事件，等待我处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 自行处理 -->
              <div
                v-if="item.eventStatusNow == 18 && item.tbEventLogBeans!=null"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 18 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#00C853"
              >{{item.reporter_name}}上报并处理了本事件。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 拒绝无效任务 -->
              <div
                v-if="item.eventStatusNow == 17&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 17 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#f00"
              >{{item.reporter_name}}拒绝了无效任务。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 通过无效任务 -->

              <div
                v-if="item.eventStatusNow == 16&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}无效任务审核通过。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 16 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#00C853"
              >无效任务审核通过。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 拒绝延期 -->
              <div
                v-if="item.eventStatusNow == 14&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 14 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#f00"
              >{{item.reporter_name}}拒绝了延期。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 同意延期 -->
              <div
                v-if="item.eventStatusNow == 13&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 13 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#f00"
              >{{item.reporter_name}}同意了延期。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 拒绝退回事件 -->
              <div
                v-if="item.eventStatusNow == 12&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 12 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#f00"
              >{{item.reporter_name}}拒绝了退回。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 同意退回 -->
              <div
                v-if="item.eventStatusNow == 11&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}同意了事件退回，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 11 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#f00"
              >{{item.reporter_name}}同意了退回。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>

              <!-- 拒绝完成 -->
              <div
                v-if="item.eventStatusNow == 10&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 10 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#f00"
              >{{item.reporter_name}}拒绝完成。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 同意完成 -->
              <div
                v-if="item.eventStatusNow == 9&&item.tbEventLogBeans!==null"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}。完成总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
              <!-- tbEventLogBeans为空的时候展示 -->
              <div
                v-else-if="item.eventStatusNow == 9 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#00C853"
              >{{item.reporter_name}}同意完成。</div>
              <!-- <div
                v-else-if="item.eventStatusNow == 9 &&item.tbEventLogBeans==null"
                class="flex col"
                style="color:#00C853"
              >{{item.reporter_name}}同意完成。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>-->
            </div>
          </van-tab>
          <van-tab title="我发起的">
            <div class="null" v-if="list2.length==0">暂无记录~</div>
            <div
              class="minBox"
              v-for="(item,i) in list2"
              :key="i"
              @click="mangeDateils2(item.id,item.reportEventTypeId,item.eventStatusNow)"
            >
              <div class="flex col">
                <span>报事类型</span>
                <span>{{item.report_type_name}}</span>
              </div>
              <div class="flex col">
                <span>报事人</span>
                <span>{{item.reporter_name}}</span>
              </div>
              <div class="flex col">
                <span>报事时间</span>
                <span>{{item.createTime | teShuTime}}</span>
              </div>
              <div class="flex col">
                <span>报事描述</span>
                <span class="yihang">{{item.eventRemark}}</span>
              </div>
              <div class="flex col">
                <span>事件编号</span>
                <span class="yihang">{{item.eventCode}}</span>
              </div>
              <van-divider />
              <!-- 已处理 -->
              <div
                v-if="item.eventStatusNow !=9&& item.eventStatusNow!=10&& item.eventStatusNow!=18&& item.eventStatusNow!=14&& item.eventStatusNow!=12&& item.eventStatusNow!=13&& item.eventStatusNow!=10&& item.eventStatusNow!=17&& item.eventStatusNow!=16&& item.eventStatusNow!=11"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理事件。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 已处理 -->
              <div
                v-if="item.eventStatusNow ==14"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 延期被拒绝 -->
              <div
                v-if="item.eventStatusNow ==18"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}。总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
              <!-- 同意延期 -->
              <div
                v-if="item.eventStatusNow ==13"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
              <!-- 退回拒绝 -->
              <div
                v-if="item.eventStatusNow ==12"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
              <!-- 事件完成 -->
              <div
                v-if="item.eventStatusNow == 9"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}。总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
              <!-- 拒绝事件完成 -->
              <div
                v-if="item.eventStatusNow == 10"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}{{item.tbEventLogBeans[0].toUserName}}处理。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 已处理 -->
              <div
                v-if="item.eventStatusNow==17"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理事件。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 同意退回 -->
              <div
                v-if="item.eventStatusNow==11"
                class="flex col"
                style="color:#f00"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}，{{item.tbEventLogBeans[0].toUserName}}处理事件。总耗时{{item.createTime | guoQuTime1(dangQianTime)}}</div>
              <!-- 上报无效任务完成 -->
              <div
                v-if="item.eventStatusNow==16"
                class="flex col"
                style="color:#00C853"
              >{{item.tbEventLogBeans[0].fromUserName}}{{item.tbEventLogBeans[0].processRemark}}。总耗时{{item.createTime | guoQuTime(item.tbEventLogBeans[0].createTime)}}</div>
            </div>
          </van-tab>
        </Mescroll-vue>
      </van-tabs>
    </div>
    <div class="break">
      <van-icon name="replay" size="20" @click="shua" color="rgb(45,126,249)" />
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue' //下拉刷新，上拉加载
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  watch: {
    $route: function(newUrl, oldUrl) {
      if (
        oldUrl.name == 'manage' ||
        oldUrl.name == 'allocation' ||
        oldUrl.name == 'careOf' ||
        oldUrl.name == 'check' ||
        oldUrl.name == 'merge' ||
        oldUrl.name == 'out' ||
        oldUrl.name == 'postpone' ||
        oldUrl.name == 'up' ||
        oldUrl.name == 'wanCheng' ||
        oldUrl.name == 'home'
      ) {
        this.mescroll.resetUpScroll()
      }
    }
  },
  data() {
    return {
      active: parseInt(localStorage.getItem('action1')),
      show: false, //筛选页面
      show7: false, //代我处理里面不显示事件状态
      value: '', //模糊搜索
      xianZaiTime: '', //当前时间
      actionTime: '', //开始时间
      baoShiType: [], //点击改变颜色
      baoShiType1: [{ name: '全部' }, { name: '未完成' }, { name: '已完成' }], //点击改变颜色
      changeLeftBackground: 0, //报事类型按钮改变颜色
      changeLeftBackground1: 0, //事件状态按钮改变颜色
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2099, 12, 31),
      currentDate: new Date(),
      iosTime: '2020/04/01 12:15:56',
      iosTime1: '',
      andTime: '2020-04-01 12:15:56',
      flag: false,
      flag1: false,
      eventType: '', //事件类型
      eventState: '', //事件状态
      shiJianType: '1', //事件处理状态
      dangQianTime: new Date(),
      list: [], //待我处理数据列表
      list1: [], //我以处理数据列表
      list2: [], //我发起的数据列表
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        isBounce: false, //是否允许ios的bounce回弹;默认true,允许回弹
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          warpId: null,
          src: 'http://www.mescroll.com/img/mescroll-totop.png',
          html: null,
          offset: 1000,
          warpClass: 'mescroll-totop',
          showClass: 'mescroll-fade-in',
          hideClass: 'mescroll-fade-out',
          duration: 300,
          supportTap: false,
          btnClick: null
        }
      }
    }
  },
  // 离开路由之前执行的函数,让ios可以下拉
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'eventList') {
      this.mescroll.setBounce(true)
    }
    next()
  },
  mounted() {
    this.time()
    this.timeIos(this.andTime)
    this.axios
      .get('/rest/tbEventTypeConfig/getEventTypes', {
        params: { uid: localStorage.getItem('uid'), company_id: '' }
      })
      .then(data => {
        console.log(data)
        data.sort(function(a, b) {
          return a.eventType > b.eventType ? 1 : -1
        })
        this.baoShiType = data
        let all = { eventType: '全部' }
        this.baoShiType.unshift(all)
        this.typeId = ''
      })
      .catch(err => {
        console.log('woyichangle')
      })
  },
  methods: {
    overTime() {
      this.flag = false
      this.flag1 = false
    },
    shua() {
      // this.mescroll.triggerDownScroll()
      location.reload()
    },
    onClickLeft() {
      this.$router.push('/')
    },
    timeIos(shiJian) {
      let time = new Date(shiJian.replace(/-/g, '/'))
      console.log('我打印一定要看' + time)
      let F = time.getFullYear()
      let M = time.getMonth() + 1 //ios月
      let D = time.getDate() //ios天
      let H = time.getHours() //ios时
      let Min = time.getMinutes() //ios分
      let S = time.getSeconds() //ios秒
      this.iosTime1 = F + '/' + M + '/' + D + ' ' + H + ':' + Min + ':' + S
    },
    isShow() {
      this.show = true
    },
    // 获取当前时间
    time() {
      var myDate = new Date()
      this.xianZaiTime =
        myDate.getFullYear() +
        '-' +
        this.p(myDate.getMonth() + 1) +
        '-' +
        myDate.getDate()
    },
    // 选中时间
    endTime(value) {
      const d = value
      // 年月日
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate())
      this.actionTime = resDate
      // 时分秒
      const resTime =
        this.p(d.getHours()) +
        ':' +
        this.p(d.getMinutes()) +
        ':' +
        this.p(d.getSeconds())
      this.flag = false
    },
    // 选中时间
    endTime1(value) {
      const d = value
      // 年月日
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate())
      this.xianZaiTime = resDate
      // 时分秒
      const resTime =
        this.p(d.getHours()) +
        ':' +
        this.p(d.getMinutes()) +
        ':' +
        this.p(d.getSeconds())
      this.flag1 = false
    },
    //转换时间不够10前面补0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    //报事类型点击改变颜色
    leftChange(id, index) {
      this.changeLeftBackground = index
      this.reportEventTypeId = id
      if (index == 0) {
        this.eventType = ''
      } else {
        this.eventType = id
      }
    },
    //事件状态点击改变颜色
    leftChange1(id, index) {
      this.changeLeftBackground1 = index
      this.reportEventTypeId = id
      if (index == 0) {
        this.eventState = ''
      } else if (index == 1) {
        this.eventState = '1'
      } else {
        this.eventState = '2'
      }
    },
    //待我处理List
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    over(name) {
      console.log(name)
      if (name == 0) {
        this.shiJianType = '1'
        this.list = []
        this.mescroll.resetUpScroll()
        this.show7 = false
      } else if (name == 1) {
        this.shiJianType = '2'
        this.list1 = []
        this.mescroll.resetUpScroll()
        this.show7 = true
      } else if (name == 2) {
        this.shiJianType = '3'
        this.list2 = []
        this.mescroll.resetUpScroll()
        this.show7 = true
      }
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    // 待我处理
    upCallback(page, mescroll) {
      this.axios
        .get('/rest/tbEventReport/getEventsHandleByParam', {
          params: {
            page: page.num,
            limit: page.size,
            uid: localStorage.getItem('uid'),
            eventHandleStatus: this.shiJianType, //事件处理状态 1:待我处理/未完成 2:我已处理/已完成 3: 我发布的
            eventStatus: this.eventState, //事件状态 1:未结束/未逾期 2:已结束/已逾期
            eventTypeId: this.eventType, //事件类型Id
            reportTimeStart: this.actionTime + ' ' + '00:00:00', //开始时间
            reportTimeEnd: this.xianZaiTime + ' ' + '23:59:59', //结束时间
            searchCon: this.value //模糊查询
          }
        })
        .then(data => {
          if (this.shiJianType == 1) {
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
          } else if (this.shiJianType == 2) {
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
          } else {
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
          }
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    },
    //待我处理详情
    mangeDateils(id, eventId, eventStatusNow) {
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('eventId', eventId)
      sessionStorage.setItem('eventStatusNow', eventStatusNow)
      this.$router.push('/manage')
    },
    //我已处理详情
    mangeDateils1(id, eventId, eventStatusNow) {
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('eventId', eventId)
      sessionStorage.setItem('eventStatusNow', eventStatusNow)
      this.$router.push('/completeDetails')
    },
    //我发起的详情
    mangeDateils2(id, eventId, eventStatusNow) {
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('eventId', eventId)
      sessionStorage.setItem('eventStatusNow', eventStatusNow)
      this.$router.push('/completeDetails')
    },
    // 模糊查询
    onSearch() {
      this.query()
    },
    //筛选
    query() {
      this.mescroll.resetUpScroll()
      this.show = false
    }
  }
}
</script>
<style lang='less' scoped>
.box {
  min-height: 100vh;
  background: #f4f5f6;
  .break {
    // background: #f5f6f7;
    position: fixed;
    right: 55px;
    top: 8px;
    z-index: 9999;
    border-radius: 50%;
    .van-icon {
      padding: 5px;
    }
  }
  p {
    padding-left: 5px;
    color: #000;
  }
  h6 {
    background: #999;
    color: #fff;
    padding: 5px 15px;
    margin: 5px 10px;
    border-radius: 5px;
    font-size: 13px;
  }
  .discolor {
    background: #a68f43;
    color: #fff;
    padding: 5px 15px;
    margin: 5px 10px;
    border-radius: 5px;
  }
  .discolor1 {
    background: #a68f43;
    color: #fff;
    padding: 5px 15px;
    margin: 5px 10px;
    border-radius: 5px;
  }
  .btn {
    padding-top: 100px;
    padding-bottom: 30px;
    .van-button--normal {
      margin: 0 30px;
      width: 127px;
    }
  }
  .con {
    .mescroll {
      position: fixed;
      top: 145px;
      bottom: 0px;
      height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
    }
    .minBox {
      padding: 10px 15px;
      margin: 5px;
      border-radius: 15px;
      background: #fff;
      .col {
        padding: 5px 0;
        font-size: 13px;
        span:nth-child(1) {
          color: #b9b9b9;
        }
        span:nth-child(2) {
          color: #000;
          width: 260px;
        }
      }
    }
  }
}
</style>
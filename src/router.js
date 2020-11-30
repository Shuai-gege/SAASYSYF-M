import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: resolve => (require(["../src/views/Home/Home.vue"], resolve)),
            meta: {
                ifShow_FootBar: true,
                title: localStorage.getItem("userName") + "工作看板",
            }
        },
        {
            path: '/userCheck',
            name: 'userCheck',
            component: resolve => (require(["../src/views/Home/userCheck.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "用户审核",
            }
        }, {
            path: '/userCheckDetails',
            name: 'userCheckDetails',
            component: resolve => (require(["../src/views/Home/userCheckDetails.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "申请详情",
            }
        },
        {
            path: '/userCheckDetails1',
            name: 'userCheckDetails1',
            component: resolve => (require(["../src/views/Home/userCheckDetails1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "申请详情",
            }
        },
        {
            path: '/top',
            name: 'top',
            component: resolve => (require(["../src/views/Home/top/top.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: '我的排行榜',

            }
        },
        {
            path: '/board',
            name: 'board',
            component: resolve => (require(["../src/views/Home/board/board.vue"], resolve)),
            meta: {
                ifShow_FootBar: true,
                title: '管理层看板',
            }
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => (require(["../src/views/login/login.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "登陆",
            }
        },
        {
            path: '/introduce',
            name: 'introduce',
            component: resolve => (require(["../src/views/login/introduce.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "注册",
            }
        }, {
            path: '/register',
            name: 'register',
            component: resolve => (require(["../src/views/login/register.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "注册",
            }
        }, {
            path: '/register1',
            name: 'register1',
            component: resolve => (require(["../src/views/login/register1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "注册",
            }
        }, {
            path: '/newFirm',
            name: 'newFirm',
            component: resolve => (require(["../src/views/login/newFirm.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "创建新的企业",
            }
        }, {
            path: '/joinCompany',
            name: 'joinCompany',
            component: resolve => (require(["../src/views/login/joinCompany.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "加入企业",
            }
        }, {
            path: '/quanXian',
            name: 'quanXian',
            component: resolve => (require(["../src/views/login/quanXian.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "权限移交",
            }
        }, {
            path: '/types',
            name: 'types',
            component: resolve => (require(["../src/views/Home/types.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "事件类型",

            }
        }, {
            path: '/userB',
            name: 'userB',
            component: resolve => (require(["../src/views/Home/userB.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "报事人B",

            }
        },
        {
            path: '/ordermatter',
            name: 'ordermatter',
            component: resolve => (require(["../src/views/matter/ordermatter.vue"], resolve)),
            meta: {
                ifShow_FootBar: true,
                title: "我要报事"
            }
        }, {
            path: '/matterLocation',
            name: 'matterLocation',
            component: resolve => (require(["../src/views/matter/matterLocation.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "报事位置"
            }
        }, {
            path: '/matterLocation01',
            name: 'matterLocation01',
            component: resolve => (require(["../src/views/matter/matterLocation01.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "报事位置"
            }
        }, {
            path: '/matterLocation02',
            name: 'matterLocation02',
            component: resolve => (require(["../src/views/matter/matterLocation02.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "报事位置"
            }
        }, {
            path: '/manage',
            name: 'manage',
            component: resolve => (require(["../src/views/eventList/manage.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "事件详情"
            }
        },
        {
            path: '/merge',
            name: 'merge',
            component: resolve => (require(["../src/views/eventList/operation/merge.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "合并事件"
            }
        },
        {
            path: '/mergeTask',
            name: 'mergeTask',
            component: resolve => (require(["../src/views/eventList/operation/mergeTask.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "合并事件"
            }
        }, {
            path: '/allocation',
            name: 'allocation',
            component: resolve => (require(["../src/views/eventList/operation/allocation.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "分配事件"
            }
        }, {
            path: '/careOf',
            name: 'careOf',
            component: resolve => (require(["../src/views/eventList/operation/careOf.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "转交事件"
            }
        }, {
            path: '/up',
            name: 'up',
            component: resolve => (require(["../src/views/eventList/operation/up.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "上报事件"
            }
        }, {
            path: '/wanCheng',
            name: 'wanCheng',
            component: resolve => (require(["../src/views/eventList/operation/wanCheng.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "完成事件"
            }
        }, {
            path: '/out',
            name: 'out',
            component: resolve => (require(["../src/views/eventList/operation/out.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "退回事件"
            }
        }, {
            path: '/postpone',
            name: 'postpone',
            component: resolve => (require(["../src/views/eventList/operation/postpone.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "延期事件"
            }
        }, {
            path: '/check',
            name: 'check',
            component: resolve => (require(["../src/views/eventList/operation/check.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "验收事件"
            }
        }, {
            path: '/completeDetails',
            name: 'completeDetails',
            component: resolve => (require(["../src/views/eventList/completeDetails.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "事件详情"
            }
        },
        {
            path: '/eventList',
            name: 'eventList',
            component: resolve => (require(["../src/views/eventList/eventList.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "报事任务",
                keepAlive: true
            }
        },
        {
            path: '/eventList1',
            name: 'eventList1',
            component: resolve => (require(["../src/views/eventList/eventList1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "点检列表",
                // keepAlive: true
            }
        },
        {
            path: '/dayTask',
            name: 'dayTask',
            component: resolve => (require(["../src/views/dayTask/dayTask.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "工作安排"
            }
        },
        {
            path: '/dayTaskLocation',
            name: 'dayTaskLocation',
            component: resolve => (require(["../src/views/dayTask/dayTaskLocation.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "工作安排"
            }
        },
        {
            path: '/dayTaskLocation01',
            name: 'dayTaskLocation01',
            component: resolve => (require(["../src/views/dayTask/dayTaskLocation01.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "工作安排"
            }
        },
        {
            path: '/dayTaskLocation02',
            name: 'dayTaskLocation02',
            component: resolve => (require(["../src/views/dayTask/dayTaskLocation02.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "工作安排"
            }
        },
        {
            path: '/taskList',
            name: 'taskList',
            component: resolve => (require(["../src/views/taskList/taskList.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "任务清单",
                keepAlive: true
            }
        }, {
            path: '/time',
            name: 'time',
            component: resolve => (require(["../src/views/time/time.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "我要看看时间"
            }
        }, {
            path: '/my',
            name: 'my',
            component: resolve => (require(["../src/views/my/my.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "我的"
            }
        },
        {
            path: '/esign',
            name: 'esign',
            component: resolve => (require(["../src/views/my/esign.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "测试电子签名"
            }
        },
        {
            path: '/checkoutEvent',
            name: 'checkoutEvent',
            component: resolve => (require(["../src/views/CheckoutEvent"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "点检事件"
            }
        },
        {
            path: '/checkoutEvent/userSelect',
            name: 'userSelect',
            component: resolve => (require(["../src/views/CheckoutEvent/userSelect"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "人员选择"
            }
        },
        {
            path: '/checkoutEvent/equipmentSelect',
            name: 'equipmentSelect',
            component: resolve => (require(["../src/views/CheckoutEvent/equipmentSelect"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "设备选择"
            }
        },
        {
            path: '/checkoutEvent/checkoutEventDetail',
            name: 'checkoutEventDetail',
            component: resolve => (require(["../src/views/CheckoutEvent/eventDetail"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "事件详情"
            }
        },
        {
            path: '/checkoutEvent/checkoutEventEquipmentInfo',
            name: 'checkoutEventEquipmentDetail',
            component: resolve => (require(["../src/views/CheckoutEvent/equipmentInfo"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "设备信息"
            }
        },
        {
            path: '/CommentEvent/commentEventDetail',
            name: 'commentEventDetail',
            component: resolve => (require(["../src/views/CommentEvent/eventDetail"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "事件详情"
            }
        },
        {
            path: '/CommentEvent/commentEvent',
            name: 'commentEvent',
            component: resolve => (require(["../src/views/CommentEvent/commentEvent"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "评价事件"
            }
        },
        {
            path: '/CommentEvent/commentEventDetail1',
            name: 'commentEventDetail1',
            component: resolve => (require(["../src/views/CommentEvent/eventDetail1"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "事件详情"
            }
        }, {
            path: '/keepWatch',
            name: 'keepWatch',
            component: resolve => (require(["../src/views/keepWatch/keepWatch.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "巡更事件",
                keepAlive: true
            }
        }, {
            path: '/keepWatchDetails',
            name: 'keepWatchDetails',
            component: resolve => (require(["../src/views/keepWatch/keepWatchDetails.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "巡更事件详情"
            }
        }, {
            path: '/keepWatchDetails1',
            name: 'keepWatchDetails1',
            component: resolve => (require(["../src/views/keepWatch/keepWatchDetails1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "巡更事件详情"
                    //没有按钮的详情
            }
        }, {
            path: '/notTask',
            name: 'notTask',
            component: resolve => (require(["../src/views/keepWatch/notTask.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "无任务签到"
            }
        }, {
            path: '/fault',
            name: 'fault',
            component: resolve => (require(["../src/views/keepWatch/fault.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "故障上报"
            }
        }, {
            path: '/fault1',
            name: 'fault1',
            component: resolve => (require(["../src/views/keepWatch/fault1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "故障上报"
            }
        }, {
            path: '/zhuanFa',
            name: 'zhuanFa',
            component: resolve => (require(["../src/views/keepWatch/zhuanFa.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "转交"
            }
        }, {
            path: '/spotZhuanFa',
            name: 'spotZhuanFa',
            component: resolve => (require(["../src/views/spotCheck/spotZhuanFa.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "转交"
            }
        }, {
            path: '/spotCheck',
            name: 'spotCheck',
            component: resolve => (require(["../src/views/spotCheck/spotCheck.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "点检任务",
                keepAlive: true
            }
        }, {
            path: '/spotCheckDetails',
            name: 'spotCheckDetails',
            component: resolve => (require(["../src/views/spotCheck/spotCheckDetails.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "点检任务详情"
            }
        }, {
            path: '/spotCheckDetails1',
            name: 'spotCheckDetails1',
            component: resolve => (require(["../src/views/spotCheck/spotCheckDetails1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "点检任务详情"
                    // 没有按钮的点检任务详情
            }
        }, {
            path: '/spotFault',
            name: 'spotFault',
            component: resolve => (require(["../src/views/spotCheck/spotFault.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "故障上报"
            }
        },
        {
            path: '/spotFault1',
            name: 'spotFault1',
            component: resolve => (require(["../src/views/spotCheck/spotFault1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "故障上报"
            }
        }, {
            path: '/demo',
            name: 'demo',
            component: resolve => (require(["../src/views/spotCheck/demo.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "故障上报"
            }
        }, {
            path: '/spotCheckTask',
            name: 'spotCheckTask',
            component: resolve => (require(["../src/views/spotCheck/spotCheckTask.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "检查项详情"
            }
        }, {
            path: '/spotCheckTask1',
            name: 'spotCheckTask1',
            component: resolve => (require(["../src/views/spotCheck/spotCheckTask1.vue"], resolve)),
            meta: {
                ifShow_FootBar: false,
                title: "检查项详情"
            }
        },
    ]
});
// 路由守卫
/**
 * @param {to} 将要去的路由
 * @param {from} 出发的路由
 * @param {next} 执行下一步
 */
import axios from 'axios'
// router.beforeEach((to, form, next) => {
//     alert(to.name)
//     console.log(to.name)
//     if (to.name === 'login') {
//         next()
//         return
//     } else  {
//         next("login")
//         return
//         // axios({
//         //     url: "http://47.100.240.228:8281/rest/wxserver/checkUserOpenId",
//         //     method: "get",
//         //     params: {
//         //         openId: localStorage.getItem("openid")
//         //     }
//         // }).then(data => {
//         //     console.log(data)
//         //     if (data.data.code == 20000) {
//         //         if (data.data.result == null || data.data.result == 'null' || data.data.result == '') {
//         //             alert("我看看哪里重复1")
//         //             next("/login")
//         //             return
//         //         } else {
//         //             if(){
//         //                 localStorage.setItem('uid', data.data.result.uid)
//         //             localStorage.setItem('userName', data.data.result.vserName)
//         //             localStorage.setItem('deptName', data.data.result.deptName)
//         //             alert("我看看哪里重复2")
//         //             next('/')
//         //             return
//         //             }

//         //         }
//         //     } else {
//         //         alert("系统错误")
//         //     }
//         // })
//     }
// })

export default router;
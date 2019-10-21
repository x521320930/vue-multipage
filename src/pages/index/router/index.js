import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    name: '管理中心',
    alwaysShow: true,
    meta: { title: '管理中心', icon: 'menu_center', permissions: 'myjob' },
    children: [
      {
        path: '/index', // 文件夹
        name: '滞纳金管理',
        alwaysShow: true,
        meta: { title: '滞纳金管理', permissions: 'overdue:overdue', iframeUrl: 'managerCenter.html#/' } // 默认页面文件夹
      }
    ]
  },
  {
    path: '/productCenter',
    component: Layout,
    name: '产品中心',
    meta: { title: '产品中心', icon: 'menu_product', iframeUrl: '/productCenter.html#/' }
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

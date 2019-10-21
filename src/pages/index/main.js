import Vue from 'vue'
// import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './styles/index.scss'
import App from './App'
import router from './router'
import store from './store'
import i18n from '@/lang' // 国际化
import './permission'
import globalConfig from '@/utils/globalConfig'
// import * as filters from '@/filters'
import '@/icons' // icon
import noMoreClick from '@/directive/noMoreClick'
Vue.use(Element, {
  size: 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 全局 防重复点击
Vue.directive('no-more-click', noMoreClick)
// register global utility filters.
// Object.keys(filters).forEanpmch(key => {
//   Vue.filter(key, filters[key])
// })

// 调用 监听事件 取 父页面传递参数
Vue.config.productionTip = false
/* axios moment */
Vue.use(globalConfig)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // vue 原型链 添加 时间控件与 请求 API
 * @example
 */
import api from '@/api'
import moment from 'moment'

export default function plugin (Vue) {
  // api 配置
  Vue.$api = Vue.prototype.$api = api
  Vue.$moment = Vue.prototype.$moment = moment
  // // sessionStorage 全局配置
}

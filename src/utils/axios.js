/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // Axios 封装
 * @example
 */
import Axios from 'axios'
const qs = require('qs')
import rl from './baseUrl'
import { Loading } from 'element-ui'
// // TODO 设置超时时间 5分钟
// Axios.defaults.timeout = 300000
let loading // 存放loading变量
let needLoadingRequestCount = 0 // 次数
// 开始
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    loading = Loading.service({
      lock: true,
      body: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.4)',
      customClass: 'hs-gloable-loading'
    })
  }
  needLoadingRequestCount++
}
// 结束
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    loading.close()
  }
}
Axios.defaults.headers = {
// 'Accept-Encoding': 'gzip, deflate, br',
// 'Accept-Language': 'zh-CN,zh;q=0.9',
// 'Cache-Control': 'no-cache',
// 'Connection': 'keep-alive',
// 'Content-Length': 34,
  'Content-Type': 'application/json;charset=UTF-8'
}
//   // 'Access-Control-Allow-Origin': '*',
//   // 'Access-Control-Allow-Credentials': true,
//   // 'content-Type': 'application/json;charset=UTF-8'
// 设置loading 默认值
Axios.defaults.isLoading = true
Axios.defaults.baseURL = rl.baseurl
// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
Axios.defaults.transformRequest = [function (body, headers) {
  const data = body || {}
  if (headers['Content-Type'].indexOf('x-www-form-urlencoded') > 0) {
    return qs.stringify(data)
  } else {
    return JSON.stringify(data)
  }
}]
// 允许携带cookie
// Axios.defaults.withCredentials = true
// TODO http code 校验
Axios.defaults.validateStatus = function (status) {
  return status
}
// 请求拦截 添加TOKen
Axios.interceptors.request.use(config => {
  if (config.isLoading) { showFullScreenLoading() }
  console.log('环境：' + process.env.NODE_ENV)
  // 判断测试环境添加token
  if (process.env.NODE_ENV === 'development') {
    const tranSmitValue = {
      token: window.sessionStorage.getItem('token')
    }
    // 添加token 怕影响 get请求以及配置post
    if (config.method === 'post') {
      if (config.url.indexOf('?') > 0) {
        config.url += '&' + qs.stringify(tranSmitValue)
      } else {
        config.url += '?' + qs.stringify(tranSmitValue)
      }
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

// TODO 响应拦截器
Axios.interceptors.response.use(response => {
  const starts = response.status
  if (response.config.isLoading) { tryHideFullScreenLoading() }
  if (starts === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response.data)
  }
}, error => {
  console.log(error)
  loading.close()
  return Promise.reject(error)
})

/**
 * @description 统一 GET 请求
 * @param url
 * @param params --> GET 请求参数（***?name=walid&age=25）
 */
function get (url, params, contentType = 'application/json;charset=UTF-8') {
  params.b = rl.bValue
  console.log(params.b)
  if (process.env.NODE_ENV === 'development') {
    params.token = window.sessionStorage.getItem('token')
  }
  console.log(params)
  console.log(url)
  // 重置 Content-Type 类型头
  Axios.defaults.headers['Content-Type'] = contentType
  return new Promise((resolve, reject) => {
    Axios.get(url, { params: params })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @description 统一 POST 请求
 * @param url
 * @param body --> POST 请求 data
 */
function post (url, body, contentType = 'application/json;charset=UTF-8') {
  const tranSmitValue = {
    b: rl.bValue
  }
  if (url.indexOf('?') > 0) {
    url += '&' + qs.stringify(tranSmitValue)
  } else {
    url += '?' + qs.stringify(tranSmitValue)
  }
  return new Promise((resolve, reject) => {
    // 重置 Content-Type 类型头
    Axios.defaults.headers['Content-Type'] = contentType
    Axios.post(url, body)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @description 统一 PUT 请求
 * @param url
 * @param body --> PUT 请求 data
 */
function put (url, body) {
  return new Promise((resolve, reject) => {
    Axios.put(url, body)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
/**
 * @description 统一 PUT 请求
 * @param url
 * @param body --> PUT 请求 data
 */
function all (body) {
  return new Promise((resolve, reject) => {
    Axios.all(body).then(Axios.spread(function () {
      resolve([...arguments])
    })).catch(r => {
      reject(r)
    })
  })
}

export default {
  get, post, put, all
}

/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // 调用 监听事件 取 父页面传递参数
 * @example
 */
export function postMessage () {
  window.addEventListener('message', function (event) {
    if (event.data && event.data === 'string') {
      var obj = JSON.parse(event.data)
      for (var key in obj) {
        window.sessionStorage.setItem(key, obj[key])
      }
    } else {
      return
    }
  }, false)
}

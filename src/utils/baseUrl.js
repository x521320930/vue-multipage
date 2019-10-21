/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // 请求路径 ajax
 * @example
 */
var baseurl = ''
var bValue = 'hs' // b值
const _location = window.location
switch (process.env.BASEURL) {
  case 'production' :
    baseurl = ''
    break
  case 'rd' :
    baseurl = _location.protocol + '//' + _location.host
    break
  default :
    baseurl = 'https://ebjrd.heshengvast.com'
    break
}
export default {
  baseurl,
  bValue
}

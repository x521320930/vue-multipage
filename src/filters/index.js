/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // 过滤器
 * @example
 */
import { isNull } from '@/utils/tools'
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 将秒转换为 分:秒
 * s int 秒数
 */
export function sec_to_time(s, type) {
  if (isNull(s)) return '--'
  // 计算分钟
  // 算法：将秒数除以60，然后下舍入，既得到分钟数
  let h
  type == 0 ? h = Math.floor(s / 60) : h = Math.ceil(s / 60)
  // 计算秒
  // 算法：取得秒%60的余数，既得到秒数
  s = s % 60
  // 将变量转换为字符串
  h += ''
  s += ''
  // 如果只有一位数，前面增加一个0
  h = (h.length == 1) ? '0' + h : h
  s = (s.length == 1) ? '0' + s : s
  return type == 0 ? h + ':' + s : `${h}:00`
}

/**
 * 最后沟通结果
 * 返回沟通类型
 */
export function resultType(val) {
  switch (val) {
    case '1':
      return '用戶接听'
    case '2':
      return '无人接听'
    case '3':
      return '号码错误'
    case '4':
      return '关机'
    case '5':
      return '停机'
    case '6':
      return '其他'
    case '7':
      return '拒接'
    case '8':
      return '占线'
    case '9':
      return '不在服务区'
    case '10':
      return '转告'
    case '11':
      return '承诺还款'
    case '12':
      return '违诺'
    case '13':
      return '失联'
    case '14':
      return '未联系上'
    case '15':
      return '恶意拖欠'
    case '16':
      return '不认识借款人'
    case '17':
      return '被屏蔽'
    case '18':
      return '无法接通'
    case '19':
      return '空号'
    case '20':
      return '超过36%不还'
    case '21':
      return '不是本人'
    case '22':
      return '无效沟通'
    case '23':
      return '已还款，银行处理中'
    default:
      return '- -'
  }
}

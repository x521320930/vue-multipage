/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // 通用方法
 * @example
 */

// 判断是否为null
export function isNull(value) {
  return typeof value == 'undefined' || value == '' || value == null
}

// 转换 gei 请求参数
export function GetParameter() {
  const parame = {}
  try {
    const locationHref = window.location.href.split('?')[1].split('&')
    for (let i = 0; i < locationHref.length; i++) {
      const data = locationHref[i].split('=')
      parame[data[0]] = data[1]
    }
    return {
      data: parame,
      status: 0
    }
  } catch (err) {
    return {
      data: {},
      status: 1
    }
  }
}

// isFormData 类型
export function isFormData(v) {
  return Object.prototype.toString.call(v) === '[object FormData]'
}

//  加法  解决浮点数相加问题
export function accAdd(arg1, arg2) {
  var r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    var cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}
//  减法  解决浮点数相加问题
export function accSub(arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

//  乘法  解决浮点数相加问题
export function accMul(arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

//  除法  解决浮点数相加问题
export function accDiv(arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1
  var r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {
    console.log(e)
  }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

//  时间戳转换为日期格式， type:0或者不传--》年月日 type:1-->年月日 时分秒
export function formatDate(stamp, type) {
  var time = new Date(stamp)
  try {
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    var h = time.getHours()
    var mm = time.getMinutes()
    var s = time.getSeconds()
  } catch (e) {
    console.log(e)
  }
  var formatValue = ''
  switch (type) {
    case 1: formatValue = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s); break
    case 0:
    default: formatValue = y + '-' + add0(m) + '-' + add0(d)
  }
  return formatValue
}

export function add0(m) { return m < 10 ? '0' + m : m }

/**
 * 根据NodeID查找当前节点以及父节点
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
export function getNode (json, nodeId) {
  let parentNode = null
  let node = null
  function deepSearch (json, nodeId) {
    // 1.第一层 root 深度遍历整个JSON
    for (var i = 0; i < json.length; i++) {
      if (node) {
        break
      }
      var obj = json[i]
      // 没有就下一个
      if (!obj || !obj.name) {
        continue
      }
      // 2.有节点就开始找，一直递归下去
      if (obj.name == nodeId) {
        // 找到了与nodeId匹配的节点，结束递归
        node = obj
        break
      } else {
        // 3.如果有子节点就开始找
        if (obj.children) {
          // 4.递归前，记录当前节点，作为parent 父亲
          parentNode = obj
          // 递归往下找
          deepSearch(obj.children, nodeId)
        } else {
          // 跳出当前递归，返回上层递归
          continue
        }
      }
    }
    // 5.如果木有找到父节点，置为null，因为没有父亲
    if (!node) {
      parentNode = null
    }
    // 6.返回结果obj
    return {
      parentNode: parentNode,
      node: node
    }
  }
  return deepSearch(json, nodeId)
}
/**
 * 普通返回翻译结果
 * @type  模块
 * @name  内容
 * @return 名称
 */
export function bt (name) {
  // const hasKey = this.$te(name)
  // if (hasKey) {
  //   return this.$t(name)
  // }
  return this.$t(name)
}
// 按千将数字格式化
export function formatConditionRemainTotal(price) {
  if (price == '' || price == null) {
    return 0
  }
  let type = false
  let result = ''
  if (Number(price) < 0) {
    price = price * -1
    type = true
  }
  const price_int = parseInt(price).toString()
  let price_int_thousand = ''
  const price_length = price_int.length
  for (let i = 1; i <= price_length; i++) {
    price_int_thousand = price_int[price_length - i] + price_int_thousand
    if (i % 3 == 0 && i != 0 && i != price_length) {
      price_int_thousand = ',' + price_int_thousand
    }
  }
  console.log(price)
  result = price.toString().replace(price_int, price_int_thousand)
  console.log(price, parseFloat(price).toString(), price_int, price_int_thousand)
  return type ? '-' + result : result
}


/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // Axios 封装
 * @example
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证含有页数字符 */
export function checkName (rule, value, callback) {
  const regEn = /[`~!@#$%^&*()_+<>?:"{},.;'[\]]/im
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  if (regEn.test(value) || regCn.test(value)) {
    callback(new Error('comCheck.checkName'))
  } else {
    callback()
  }
}

/* 只能是数字 */
export function checkIsNumber (rule, value, callback) {
  if (value != '') {
    const reg = /^[0-9]+$/
    if (!reg.test(value)) {
      callback(new Error('comCheck.checkIsNumber'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 是否为空或者空格
export function isNull (val) {
  const regu = '^[ ]+$'
  const re = new RegExp(regu)
  if (typeof val == 'number' && val == 0) {
    return false
  }
  if (re.test(val) || val == '') {
    return true
  } else {
    return false
  }
}
// 输入框不能有空格
export function isSpace (val) {
  if (val.replace(/(^s*)|(s*$)/g, '').length == 0) {
    return true
  } else {
    return false
  }
}

// 不能输入汉字
export function isChinese (rule, value, callback) {
  if (value.length != 0 && value != '') {
    const reg = /.*[\u4e00-\u9fa5]+.*$/
    if (reg.test(value)) {
      callback(new Error('comCheck.isChinese'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 不能输入汉字
export function loginUser (rule, value, callback) {
  if (value.length != 0 && value != '') {
    const reg = /^[a-zA-Z0-9_]{1,}$/
    if (!reg.test(value)) {
      callback(new Error('只能输入英文，数字，下划线'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 不能为0
export function isZero (rule, value, callback) {
  if (value.length != 0 && value != '') {
    if (value == 0) {
      callback(new Error('comCheck.isZero'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 密码相关
export function isPwdNumber (rule, value, callback) {
  if (value.length != 0 && value != '') {
    if (value.length != 4) {
      callback(new Error('comCheck.isPwdNumber'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 密码相关
export function isPwdreg (rule, value, callback) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8}/
  if (!reg.test(value)) {
    callback(new Error('comCheck.isPwdreg'))
  } else {
    callback()
  }
}
// 手机号验证
export function isPhone (rule, value, callback) {
  const pattern = /^0?1[3|4|5|6|9|8|7][0-9]\d{8}$/
  if (value.length != 0 && value != '') {
    if (!pattern.test(value)) {
      callback(new Error('comCheck.isPhone'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 手机号验证
export function isEmail (rule, value, callback) {
  const pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (value.length != 0 && value != '') {
    if (!pattern.test(value)) {
      callback(new Error('comCheck.email'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 判断第一个字符是否是数字
export function cannotNumeric (rule, value, callback) {
  if (value.length != 0 && value != '') {
    const str = value.substr(0, 1)
    if (!isNaN(str)) {
      const pattern = /^0?1[3|4|5|8|7][0-9]\d{8}$/
      if (!pattern.test(value)) {
        callback(new Error('comCheck.isPhone'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 特殊符号验证
export function isSymbol (rule, value, callback) {
  const regEn = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/im
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  if (regEn.test(value) || regCn.test(value)) {
    callback(new Error('格式不对，不能含有特殊符号'))
  } else {
    callback()
  }
}
// 座机
export function fixed_phone (rule, value, callback) {
  if (!isNull(value)) {
    const regEn = /^((0\d{2,3}))(\d{7,8})(-(\d{3,}))?$/
    if (!regEn.test(value)) {
      callback(new Error('座机号输入不正确，请重新输入'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 随机生成密码
export function randomPassword (num, type = 0) {
  const text = ['0123456789', 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '@$!%*?&']
  const rand = function (min, max) {
    return Math.floor(Math.max(min, Math.random() * max))
  }
  let pw = ''
  let countNum = 0
  for (let i = 0; i < num; i++) {
    if (countNum > type) {
      countNum = 0
    }
    pw += text[countNum].charAt(rand(0, text[countNum].length))
    countNum++
  }
  return pw
}
// 非法字符 只能输入 中文英文数字
export function IllegalCharacters(rule, value, callback) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{0,32}$/
  if (!reg.test(value)) {
    callback(new Error('只能输入中文、英文、数字，请重新输入'))
  } else {
    callback()
  }
}

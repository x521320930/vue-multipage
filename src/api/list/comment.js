/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // 通用接口
 * @example 模块名称_接口 命名 comment_dept_getDepList4Tree
 * 'application/json;charset=UTF-8'
 * 'application/x-www-form-urlencoded;charset=UTF-8'
 * api.post(接口，参数，类型头)
 */
import api from '@/utils/axios'
// test
export const comment_dept_getDepList4Tree = (body) => {
  return api.post(`**`, body, 'application/x-www-form-urlencoded;charset=UTF-8')
}


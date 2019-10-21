/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // 全局通用状态管理
 * @example
 */
const global = {
  state: {
    saveMainInfo: {}, // 存储 token 及相关信息
    permissionMap: [] // 全局权限
  },
  mutations: {
    // 存储 token 及相关信息
    SET_SAVEMAINXINFO: (state, value) => {
      state.saveMainInfo = value
      for (const key in value) {
        window.sessionStorage.setItem(key, value[key])
      }
    },
    // 全局权限
    SET_PERMISSIONMAP: (state, value) => {
      state.permissionMap = value
    }
  },
  actions: {
    getPermissionList ({ commit, state, rootState, dispatch }, id) {
      return new Promise((resolve, reject) => {
        resolve()
        reject()
      })
    }
  }
}

export default global

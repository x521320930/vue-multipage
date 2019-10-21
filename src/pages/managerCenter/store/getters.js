const getters = {
  saveMainInfo: state => state.global.saveMainInfo, // 存储 token 及相关信息
  permissionMap: state => state.global.permissionMap // 权限
}
export default getters

const getters = {
  saveMainInfo: state => state.global.saveMainInfo, // 存储 token 及相关信息
  permissionMap: state => state.global.permissionMap, // 权限
  sidebar: state => state.app.sidebar, // 菜单栏展开收起
  language: state => state.app.language, // 语言
  permission_routers: state => state.permission.routers // 权限
}
export default getters

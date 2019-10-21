import { work_zh_cn } from './module/work' // 我的工作模块
import { table_zh_cn } from './module/table' // 存放所有table名称 search label
import { other_zh_cn } from './module/other' // 其他项
import { button_zh_cn } from './module/button' // 按钮
// 按钮
export const button = {
}

// 提示语
export const info = {
}

export default {
  ...table_zh_cn,
  ...info,
  ...other_zh_cn,
  ...work_zh_cn,
  ...button_zh_cn
}

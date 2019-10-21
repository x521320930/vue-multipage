import { work_vi } from './module/work' // 我的工作模块
import { table_vi } from './module/table' // 存放所有table名称 search label
import { other_vi } from './module/other' // 其他项
import { button_vi } from './module/button' // 按钮

// 提示语
export const info = {
}

export default {
  ...table_vi,
  ...info,
  ...other_vi,
  ...work_vi,
  ...button_vi
}

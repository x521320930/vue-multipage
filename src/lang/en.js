import { work_en } from './module/work' // 我的工作模块
import { table_en } from './module/table' // 存放所有table名称 search label
import { other_en } from './module/other' // 其他项
import { button_en } from './module/button' // 按钮

// 提示语
export const info = {
}

export default {
  ...table_en,
  ...info,
  ...other_en,
  ...work_en,
  ...button_en
}

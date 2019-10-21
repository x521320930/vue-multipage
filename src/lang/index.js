import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { isNull } from '@/utils/tools'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // 英语
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // 中文
import elementViLocale from 'element-ui/lib/locale/lang/vi' // 越南
import enLocale from './en' // 英语
import zhLocale from './zh' // 中文
import viLocale from './vi' // 越南

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  vi: {
    ...elementViLocale,
    ...viLocale
  }
}
const languageLocal = window.localStorage.getItem('languageLocal')
let locale = ''
if (isNull(languageLocal)) {
  locale = 'zh'
} else {
  if (languageLocal == 'ph') {
    locale = 'en'
  } else if (languageLocal == 'zh_CN') {
    locale = 'zh'
  } else {
    locale = 'vi'
  }
}
const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: locale,
  // set locale messages
  messages
})

export default i18n

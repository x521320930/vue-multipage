/**
 * @author  x521320930@gmail.com
 * @version 1.0 | 2018-12-27
 * @describe  // 全局防重复点击
 * @example
 */
export default {
  inserted (el, binding, vnode) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, binding.value || 1000)
    })
  }
}

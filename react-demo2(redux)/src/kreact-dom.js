import { initVnode } from './kvdom.js'
const render = (vnode, container) => {
  // 将虚拟dom转换为真实node
  const vdom = initVnode(vnode)
  container.appendChild(vdom)
}
export default { render }
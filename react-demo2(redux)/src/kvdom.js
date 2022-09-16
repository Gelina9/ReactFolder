// 将虚拟dom转化为真实dom
export const initVnode = (vnode) => {
  const { vtype } = vnode
  if (!vtype) {
    // 文本节点
    return document.createTextNode(vnode)
  } else if (vtype === 1) {
    // 原生元素节点
    return createElement(vnode)
  } else if (vtype === 2) {
    // 类组件节点
    return createClassElement(vnode)
  } else if (vtype === 3) {
    // 函数组件节点
    return createFuncElement(vnode)
  }
}

const createElement = (vnode) => {
  const { type, props } = vnode
  const { key, children, ...rest } = props
  const dom = document.createElement(type)

  // 处理属性
  Object.keys(rest).forEach(k => {
    const value = rest[k]
    if (k === 'className') {
      dom.setAttribute('class', value)
    } else {
      dom.setAttribute(k, value)
    }
  })

  // 处理子元素
  children.forEach(c => {
    dom.appendChild(initVnode(c))
  })
  return dom
}

const createClassElement = (vnode) => {
  const { type, props } = vnode
  const element = new type(props)
  const vdom = element.render()
  return initVnode(vdom)
}

const createFuncElement = (vnode) => {
  const { type, props } = vnode
  const element = type(props)
  return initVnode(element)
}
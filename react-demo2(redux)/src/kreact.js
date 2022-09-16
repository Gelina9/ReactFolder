const createElement = (type, props, ...children) => {
  props.children = children
  delete props.__source
  delete props.__self
  let vtype
  if (typeof type === 'string') {
    // 原生html标签
    vtype = 1
  } else if (typeof type === 'function' && type.isClassComponent) {
    // class组件
    vtype = 2
  } else {
    // 函数组件
    vtype = 3
  }
  return { type, vtype, props }
}

// 更新器，类似vue里边的Watcher，每个Watcher管理了若干依赖
class Updater {
  constructor(instance) {
    this.instance = instance
    this.pendingStates = []  // 待处理状态数组
    this.pendingCallbacks = [] // 待处理回调函数
    this.isPending = false // 是否正在处理
  }
  addState (nextState) {
    if (nextState) {
      this.pendingStates.push(nextState)
      if (!this.isPending) {
        // 如果是空闲状态，通知更新
        this.emitState()
      }
    }

  }

  // emitState两种触发方式：1.属性  2.状态
  emitState (nextProps, nextContext) {
    this.nextProps = nextProps
    this.nextContext = nextContext
    if (nextProps || !updateQueue.isPending) {
      // 如果是属性传入，立即更新
      this.updateComponent()
    } else {
      updateQueue.add(this)
    }
  }

  updateComponent () {
    let { nextProps, pendingStates, instance } = this
    if (nextProps || pendingStates.length > 0) {
      nextProps = nextProps || instance.props
      // getState()是合并state，一次更新
      shouldUpdate(instance, nextProps, this.getState())
    }
  }

  getState () {
    const { instance, pendingStates } = this
    let { state, props } = instance
    if (pendingStates.length) {
      pendingStates.forEach(nextState => {
        state = { ...state }

        // 如果参数是函数
        if (Object.prototype.toString.call(nextState).includes('function')) {
          nextState = nextState.call(instance, state, props)
        }

        state = { ...state, ...nextState }
      })
      pendingStates.length = 0
    }
    return state
  }
}

// 更新队列，相当于vue里的dep，管理了若干更新器
let updateQueue = {
  updaters: [],
  isPending: false,
  add (updater) {
    this.updaters.push(updater)
  },
  batchUpdater () {
    if (this.isPending) return
    this.isPending = true
    let { updaters } = this
    let updater
    while (updater = updaters.pop()) {
      updater.updateComponent()
    }
    this.isPending = false
  }
}

function shouldUpdate (component, nextPorps, nextState, callback) {
  let shouldComponentUpdate = true
  if (component.shouldComponentUpdate) {
    shouldComponentUpdate = component.shouldComponentUpdate(nextPorps, nextState)
  }
  if (shouldComponentUpdate === false) {
    component.props = nextPorps
    component.state = nextState
    return
  }

  let cache = component.$cache
  cache.props = nextPorps
  cache.state = nextState
  // component.forceUpdate(callback)
}

export class Component {
  static isClassComponent = true
  constructor(props) {
    this.props = props
    this.state = {}
    this.$updater = new Updater(this)
  }
  setState (nextState, callback) {
    this.$updater.addCallback(callback)
    this.$updater.addState(nextState)
  }
}

export default { createElement }
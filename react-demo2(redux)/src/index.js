import React, { Component } from './kreact.js';
import ReactDOM from './kreact-dom.js';

const Comp = props => {
  return <div>{props.name}</div>
}

class Comp2 extends Component {
  render () {
    return <div>{this.props.name}</div>
  }
}

const jsx = (
  <div>
    <h2>标题</h2>
    <Comp name='函数组件' />
    <Comp2 name='类组件' />
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))

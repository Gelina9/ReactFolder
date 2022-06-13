/**
 * 高阶组件：传入一个组件，对组件做一些扩展，再返回一个新组件
 * 返回的新组件可以是function组件，也可以是class组件
 */
import React, { Component } from 'react';

// 返回函数式组件
// function enhance(Comp){
//   const value='wangjie'
//   return props=> <Comp {...props} value={value}/>
// }

// 返回class组件
function enhance1(Comp) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        value: '',
      };
    }

    componentDidMount() {
      this.setState({ value: 'wangjie1' });
    }

    render() {
      const { value } = this.state;
      return <Comp {...this.props} value={value} />;
    }
  };
}

function enhance2(Comp) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        value2: '',
      };
    }

    componentDidMount() {
      this.setState({ value2: 'wangjie2' });
    }

    render() {
      const { value2 } = this.state;
      return <Comp {...this.props} value2={value2} />;
    }
  };
}

// 装饰器只能修饰class组件
@enhance2
@enhance1
class List extends Component {
  render() {
    return (
      <div>
        {this.props.name}
        --
        {this.props.value}
        --
        {this.props.value2}
      </div>
    );
  }
}

export default function Hoc() {
  return (
    <List name="姓名" />
  );
}

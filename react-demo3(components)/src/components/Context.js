/**
 * 组件通信之Context
 */
import React, { PureComponent, useContext } from 'react';

const myContext = React.createContext();
const { Provider, Consumer } = myContext;

// 方式一：使用Consumer
function Child1(props) {
  const { foo } = props;
  return <div>{foo}</div>;
}

// 方式二： 使用useContext
function Child2() {
  const globalData = useContext(myContext);
  return <div>{globalData.foo}</div>;
}

// 方式三： 使用class
class Child3 extends PureComponent {
  static contextType = myContext;

  render() {
    const globalData = this.context;
    return <div>{globalData.foo}</div>;
  }
}

export default function Context() {
  return (
    <div>
      <Provider value={{ foo: 'bar' }}>
        <Consumer>
          {props => <Child1 {...props} />}
        </Consumer>
        <Child2 />
        <Child3 />
      </Provider>
    </div>
  );
}

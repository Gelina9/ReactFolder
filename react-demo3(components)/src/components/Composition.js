/**
 * 组件复合，类似vue中的slot插槽
 * 默认为props.children
 * 具名插槽传props
 */
import React, { PureComponent } from 'react';

function Filter({ children, type }) {
  return (
    <div>
      {React.Children.map(children, child => (type !== child.type ? null : child))}
    </div>
  );
}

const api = {
  getUser: () => ({ name: 'jerry', age: 18 }),
};

// 作用域插槽
function Fetcher({ children, name }) {
  const data = api[name]();
  return children(data);
}

function RadioGroup({ children, name }) {
  return (
    <div>
      {React.Children.map(children, child => {
        const newChild = React.cloneElement(child, { name });
        return newChild;
      })}
    </div>
  );
}

function Radio({ children, ...rest }) {
  return (
    <label htmlFor={children}>
      {children}
      <input type="radio" {...rest} />
    </label>
  );
}

export default class Composition extends PureComponent {
  render() {
    return (
      <div>
        <Filter type="p">
          <div>div</div>
          <h1>h1</h1>
          <p>p</p>
        </Filter>
        <Fetcher name="getUser">
          {data => (
            <p>
              {data.name}
              -
              {data.age}
            </p>
          )}
        </Fetcher>
        <RadioGroup name="mvvm">
          {['vue', 'react', 'angular'].map(item => (<Radio key={item}>{item}</Radio>))}
        </RadioGroup>
      </div>
    );
  }
}

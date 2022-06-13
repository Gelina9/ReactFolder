/**
 * Q1.input如何对值的改变做管理的？ --> getFieldDecorator
 * Q2.validateFields
 */
import { Button, Input } from 'antd';
import React, { Component } from 'react';

// 创建一个高阶组件，可以处理事件、收集数据、校验
function EnhanceForm(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = {};
      this.state = {};
    }

    onChangeInput = e => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      }, () => {
        this.validateField(name);
      });
    };

    // 校验每一项
    validateField = field => {
      const rules = this.options[field].rules || [];
      const ret = !rules.some(rule => {
        if (rule.required) {
          if (!this.state[field]) {
            this.setState({ [`${field}Msg`]: rule.message });
            return true;
          }
          return false;
        }
        return false;
      });
      if (ret) {
        this.setState({ [`${field}Msg`]: '' });
      }
      return ret;
    };

    // 校验所有
    validate = cb => {
      const rets = Object.keys(this.options).map(field => this.validateField(field));
      const isValid = rets.every(ret => ret === true);
      cb(isValid, this.state);
    };

    // 创建input包装器
    getFieldDec = (field, option) => {
      this.options[field] = option; // 收集选项，便于后续校验
      return InputComp => (
        <div>
          {React.cloneElement(InputComp, {
            name: field,
            value: this.state[field] || '',
            onChange: this.onChangeInput,
          })}
          {this.state[`${field}Msg`] && <p style={{ color: 'red' }}>{this.state[`${field}Msg`]}</p>}
        </div>
      );
    };

    render() {
      return <Comp getFieldDec={this.getFieldDec} validate={this.validate} />;
    }
  };
}

class Form extends Component {
  onSubmit = () => {
    const { validate } = this.props;
    validate((isValid, data) => {
      if (isValid) {
        console.log('校验成功');
        console.log(data);
      } else {
        console.log('校验失败');
      }
    });
  };

  render() {
    const { getFieldDec } = this.props;
    return (
      <div>
        {getFieldDec('uname', {
          rules: [
            { required: true, message: '请输入用户名' },
          ],
        })(<Input />)}
        {getFieldDec('pwd', {
          rules: [
            { required: true, message: '请输入密码' },
          ],
        })(<Input type="password" />)}
        <Button onClick={this.onSubmit}>登录</Button>
      </div>
    );
  }
}
export default EnhanceForm(Form);

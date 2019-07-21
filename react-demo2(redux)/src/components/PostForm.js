import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { sendPost } from '../actions/postActions'

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            body:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        const post = {
            title:this.state.title,
            body:this.state.body
        };
        // 触发action
        this.props.sendPost(post);
    }
    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        const labelStyle = {
            display:"inline-block",
            width:100
        }
        return (
            <div>
                <h1>提交POST</h1>
                <form onSubmit = {this.onSubmit}>
                    <div>
                        <label style = {labelStyle}>title:</label>
                        <input onChange={this.onChange} type="text" value={this.state.title} name="title"/>
                    </div>
                    <div>
                        <label style = {labelStyle}>body:</label>
                        <textarea onChange={this.onChange}  value={this.state.body} name="body"/>
                    </div>
                    <button type="submit">添加</button>
                </form>
            </div>
        )
    }
}
//类型检查，仅在开发模式下使用
PostForm.propTypes = {
    sendPost:PropTypes.func.isRequired
}

export default connect(null,{ sendPost })(PostForm)

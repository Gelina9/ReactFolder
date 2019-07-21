import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
class Posts extends Component {
    componentDidMount(){
        //触发action操作
        this.props.fetchPosts();
    }
    render() {
        const postItem = this.props.posts.map(post => (
            <div key = {post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ))
        return (
            <div>
                <h1>获取Posts</h1>
                {postItem}
            </div>
        )
    }
}

//类型检查，仅在开发模式下使用
Posts.propTypes = {
    fetchPosts:PropTypes.func.isRequired,
    posts:PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts:state.postReducer.items
})
export default connect(mapStateToProps,{ fetchPosts })(Posts)

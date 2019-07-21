import { FETCH_POSTS,NEW_POST } from './type'

//获取posts数据
export const fetchPosts = ()=> dispatch => {
    fetch("http://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts => 
        dispatch({
            type:FETCH_POSTS,
            payload:posts
        })
    )
}

//提交post数据
export const sendPost = (postData)=> dispatch => {
    fetch("http://jsonplaceholder.typicode.com/posts",{
        method:"POST",
        hearders:{
            "content-type":"application/json"
        },
        body:JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(post => 
        dispatch({
            type:NEW_POST,
            payload:post
        })
    )
}
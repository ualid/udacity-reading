import axios from "axios";
import { showLoading, hideLoading } from 'react-redux-loading'

export  function fetchPosts(order) {
    return (dispatch) => {
      dispatch(showLoading)
      return axios.get("http://localhost:3001/posts",  { headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
        /*if(order == '1'){
          response.data.sort(function(a,b) { return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore < a.voteScore) ? -1 : 0);} );  
        }else{
          response.data.sort(function(a,b) { return (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0);} );  
        }*/
        dispatch(receivePosts(response))
        dispatch(hideLoading)  
      });

    }
}

export  function  addPost(post) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.post("http://localhost:3001/posts",  post,{  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(addRowPost(response))
      dispatch(hideLoading)  
      alert('Add Sucess!');
      this.history.push('/')
     });

  }
}

export  function orderPost(order) {
  return (dispatch) => {
    dispatch(showLoading)
     /* if(order === '1'){
        this.props.posts.sort(function(a,b) { return (a.voteScore < b.voteScore) ? 1 : ((b.voteScore > a.voteScore) ? -1 : 0);} );  
      }else{
        this.props.posts.sort(function(a,b) { return (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0);} );  
      }*/
      dispatch(orderPost(order))
      dispatch(hideLoading)  

  }
}
export function fetchPostsByCategories(categoryName) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.get(`http://localhost:3001/${categoryName}/posts/`, { headers: { 'Authorization': 'whatever-you-want' } }).then(response => {
      dispatch(receiveCategoriesPosts(response))
      dispatch(hideLoading)
    });
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES_POSTS = 'RECEIVE_CATEGORIES_POSTS';
export const ADD_POST = 'ADD_POST';
export const ORDER_POSTS = 'ORDER_POSTS';

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}
export function orderPosts (order) {
  return {
    type: ORDER_POSTS,
    order,
  }
}

export function receiveCategoriesPosts(posts) {
  return {
    type: RECEIVE_CATEGORIES_POSTS,
    posts,
  }
}
  
export function addRowPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export  function updatePost(post) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.put(`http://localhost:3001/posts/${post.id}`,  post,{  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(updateRowPost(response))
      dispatch(hideLoading)  
      alert('upt Sucess!');
      this.history.push('/')
    });

  }
}

export  function deletePost(post) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.delete(`http://localhost:3001/posts/${post.id}`, {  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(deleteRowPost(response))
      dispatch(hideLoading)  
    });

  }
}
export const UPDATE_POST = 'UPDATE_POST'
export function updateRowPost (post) {
    return {
      type: UPDATE_POST,
      post,
    }
  }

  export const DELETE_POST = 'DELETE_POST'
  export function deleteRowPost (post) {
      return {
        type: DELETE_POST,
        post,
      }
    }
  
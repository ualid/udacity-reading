import axios from "axios";
import { showLoading, hideLoading } from 'react-redux-loading'

export  function fetchPosts() {
    return (dispatch) => {
      dispatch(showLoading)
      return axios.get("http://localhost:3001/posts",  { headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
        dispatch(receivePosts(response))
        dispatch(hideLoading)  
      });

    }
}

export  function addRowPost(post) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.post("http://localhost:3001/posts",  post,{  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      console.log('response => ', response)
      dispatch(addPost(response))
      dispatch(hideLoading)  
    });

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

export function receivePosts (posts) {
    return {
      type: RECEIVE_POSTS,
      posts,
    }
  }

  export function receiveCategoriesPosts(posts) {
    return {
      type: RECEIVE_CATEGORIES_POSTS,
      posts,
    }
  }
  
export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}
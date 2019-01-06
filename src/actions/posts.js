import axios from "axios";
import { showLoading, hideLoading } from 'react-redux-loading'
const urlBase = "http://localhost:3001/posts";
export  function fetchPosts() {
    return (dispatch) => {
      dispatch(showLoading)
      return axios.get(`${urlBase}`,  { headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
        dispatch(receivePosts(response))
        dispatch(hideLoading)  
      });

    }
}

export  function  addPost(post) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.post(`${urlBase}`,  post,{  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(addRowPost(response))
      dispatch(hideLoading)  
      alert('Add Sucess!');
      this.history.push('/category')
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
    return axios.put(`${urlBase}/${post.id}`,  post,{  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(updateRowPost(response))
      dispatch(hideLoading)  
      alert('Updated Sucess!');
      this.history.push('/category')
    });

  }
}

export  function deletePost(post) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.delete(`${urlBase}/${post.id}`, {  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
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
  
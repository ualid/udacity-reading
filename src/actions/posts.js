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

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export function receivePosts (posts) {
    return {
      type: RECEIVE_POSTS,
      posts,
    }
  }


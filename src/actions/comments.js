import axios from "axios";
import { showLoading, hideLoading } from 'react-redux-loading'

export  function fetchComments(id) {
  console.log('fetch ', id)
    return (dispatch) => {
      dispatch(showLoading)
      return axios.get(`http://localhost:3001/posts/${id}/comments`,  { headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
        dispatch(receiveComments(response))
        dispatch(hideLoading)  
      });

    }
}

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export function receiveComments (comments) {
    return {
      type: RECEIVE_COMMENTS,
      comments,
    }
  }


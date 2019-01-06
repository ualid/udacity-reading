import axios from "axios";
import { showLoading, hideLoading } from 'react-redux-loading';
import { visualizationForm } from './shared';
const urlBase = "http://localhost:3001/comments";

export  function fetchComments(id) {
    return (dispatch) => {
      dispatch(showLoading)
      return axios.get(`http://localhost:3001/posts/${id}/comments`,  { headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
        dispatch(receiveComments(response))
        dispatch(hideLoading)  
      });

    }
}

export  function addCommenter(commenter) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.post(`${urlBase}`, commenter,{  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(addRowComment(response))
      dispatch(visualizationForm(false))
      dispatch(hideLoading)  
    });

  }
}

export  function updateCommenter(commenter) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.put(`${urlBase}/${commenter.id}`,  commenter,{  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(updateRowComment(response))
      dispatch(hideLoading)  
      dispatch(visualizationForm(false))
    });

  }
}


export  function deleteCommenter(commenter) {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.delete(`${urlBase}/${commenter.id}`, {  headers: { 'Authorization': 'whatever-you-want' }}).then( response => {
      dispatch(deleteRowComment(response))
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
  
export const ADD_COMMENTER = 'ADD_COMMENTER'
export function addRowComment (comment) {
    return {
      type: ADD_COMMENTER,
      comment,
    }
  }

export const UPDATE_COMMENTER = 'UPDATE_COMMENTER'
export function updateRowComment (comment) {
    return {
      type: UPDATE_COMMENTER,
      comment,
    }
  }

  export const DELETE_COMMENTER = 'DELETE_COMMENTER'
  export function deleteRowComment (comment) {
      return {
        type: DELETE_COMMENTER,
        comment,
      }
    }
  

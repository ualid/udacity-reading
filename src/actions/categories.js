import axios from "axios";
import { showLoading, hideLoading } from 'react-redux-loading'

export function fetchCategories() {
  return (dispatch) => {
    dispatch(showLoading)
    return axios.get("http://localhost:3001/categories", { headers: { 'Authorization': 'whatever-you-want' } }).then(response => {
      dispatch(receiveCategories(response))
      dispatch(hideLoading)
    });

  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }
}

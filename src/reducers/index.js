import { combineReducers } from 'redux'
import posts from './posts'
import comments from './comments'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  posts,
  comments,
  loadingBar: loadingBarReducer,
})
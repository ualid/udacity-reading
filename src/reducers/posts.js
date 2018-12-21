import { RECEIVE_POSTS, RECEIVE_CATEGORIES_POSTS, ADD_POST } from '../actions/posts';

export default function posts (state = {}, action) {
    switch(action.type) {
        case RECEIVE_POSTS: 
        return {
            ...state,
            ...action.posts
        }
        case RECEIVE_CATEGORIES_POSTS: 
        return {
            ...state,
            ...action.posts
        }
        case ADD_POST: 
        return {
            ...state,
            ...action.posts
        }
        default:
            return state
    }
}

import { RECEIVE_POSTS, RECEIVE_CATEGORIES_POSTS, ADD_POST, DELETE_POST, UPDATE_POST } from '../actions/posts';
import cloneDeep from 'lodash/cloneDeep';

export default function posts (state = {}, action) {
    let posts = null;

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
            'data': state.data.concat(action.post.data) 
        }
        case UPDATE_POST: 
        posts = cloneDeep(state.data);
        posts.splice(posts.findIndex(e => e.id === action.post.data.id),1);
        posts.push( action.post.data);

        return {
            ...state,
            'data': posts
        }

        case DELETE_POST: 
        return {
            ...state,
            'data': state.data.filter( post => post.id !== action.post.data.id)

        }
        default:
            return state
    }
}

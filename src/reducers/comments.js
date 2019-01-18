import {
  RECEIVE_COMMENTS,
  ADD_COMMENTER,
  UPDATE_COMMENTER,
  DELETE_COMMENTER
} from "../actions/comments";
import cloneDeep from "lodash/cloneDeep";

export default function comments(state = {}, action) {
  let comment = null;

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments
      };
    case ADD_COMMENTER:
      return {
        ...state,
        data: state.data.concat(action.comment.data)
      };
    case UPDATE_COMMENTER:
      comment = cloneDeep(state.data);
      comment.splice(
        comment.findIndex(e => e.id === action.comment.data.id),
        1
      );
      comment.push(action.comment.data);

      return {
        ...state,
        data: comment
      };
    case DELETE_COMMENTER:
      return {
        ...state,
        data: state.data.filter(
          comment => comment.id !== action.comment.data.id
        )
      };
    default:
      return state;
  }
}

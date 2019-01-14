import { VISUALIZATION_FORM, VISUALIZATION_EDIT, FILTER_SELECTED } from '../actions/shared';

export default function shared (state = {}, action) {
 
    switch(action.type) {
        case VISUALIZATION_FORM: 
          return {
            ...state,
            'visualization': action.visualization
        }
        case VISUALIZATION_EDIT: 
        return {
          ...state,
          'visualization': action.visualization
      }
      case FILTER_SELECTED: 
      return {
        ...state,
        ... action.filter
    }
        default:
            return state
    }
 
}

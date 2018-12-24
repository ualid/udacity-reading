import { VISUALIZATION_FORM, VISUALIZATION_EDIT } from '../actions/shared';

export default function shared (state = {}, action) {
 
    switch(action.type) {
        case VISUALIZATION_FORM: 
          console.log(action.visualization)
          return {
            ...state,
            'visualization': action.visualization
        }
        default:
            return state
    }
    switch(action.type) {
      case VISUALIZATION_EDIT: 
        console.log(action.visualization)
        return {
          ...state,
          'visualization': action.visualization
      }
      default:
          return state
  }
}

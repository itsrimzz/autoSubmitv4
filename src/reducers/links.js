// import * as types from '../../../constants/ActionTypes';

export default function links (state = [], action) {
  switch (action.type) {
    case 'ADD_URL':
      return action.data;
    case 'UPDATE_STATUS':
      let newState = state.map((link, index) => {
        if(index === action.data.index) {
          return {
            ...link,
            status: action.data.status
          }
        } else {
          return link;
        }
      })
      return newState;
    case 'UPDATE_COUNT':
      newState = state.map((link, index) => {
        if(index === action.data.index) {
          return {
            ...link,
            count: action.data.count
          }
        } else {
          return link;
        }
      })
      return newState;
    default:
      return state;
  }
}

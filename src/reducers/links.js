// import * as types from '../../../constants/ActionTypes';

export default function links (state = [], action) {
  switch (action.type) {
    case 'ADD_URL':
      return action.data;
    default:
      return state;
  }
}

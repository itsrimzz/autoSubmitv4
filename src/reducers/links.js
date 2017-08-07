// import * as types from '../../../constants/ActionTypes';
import {STATUS} from '../constants';

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
    case 'RESET_LINK':
      newState = state.map((link, index) => {
        if(index === action.data) {
          return {
            ...link,
            count: 0,
            status: STATUS.PENDING
          }
        } else {
          return link;
        }
      })
      return newState;
    case 'RESET_APP':
      return [];
    default:
      return state;
  }
}

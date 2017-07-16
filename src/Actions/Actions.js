import {STATUS} from '../constants';

export function addLinks(data) {
  const newData = data.map(url => {
    return {
      url: url,
      status: STATUS.PENDING,
      count: 0
    };
  })
  return { type: 'ADD_URL', data: newData };
}

export function updateStatus (data) {
  return {type: 'UPDATE_STATUS', data: data};
}

export function updateCount (data) {
  return {type: 'UPDATE_COUNT', data: data};
}
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
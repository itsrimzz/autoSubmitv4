/*
 * Get method
 * requestManager.get(url succesCallbackFunction, errorCallbackFunction)
 *
 * Post method
 * requestManager.post(url, requestData, succesCallbackFunction, errorCallbackFunction, request Type)
 *
 * Patch method
 * requestManager.post(url, requestData, succesCallbackFunction, errorCallbackFunction)
*/

import axios from 'axios';
// Load constants

class AxiosRequestManager {
  constructor() {
  }

  get(url, successCallback, errorCallback, params={}) {
    return axios({
      url: url,
      timeout: 30000, // TODO: We should be able to update the settings by passing it as arguments
      method: 'get',
      // crossDomain: true,
      responseType: 'html',
      params: params
      // withCredentials: true
    }).then(
      response => this.successHandler(response, successCallback),
      error => this.errorHandler(error, errorCallback)
      );
  }

  post(url, data,  successCallback, errorCallback, responseType = 'json') {
    // API call for public meeting need not to be csrf secured
    return axios({
      url: url,
      timeout: 180000, // TODO: We should be able to update the settings by passing it as arguments
      method: 'post',
      // crossDomain: true,
      responseType: responseType,
      // withCredentials: true,
      data: data
    }).then(
      response => this.successHandler(response, successCallback),
      error => this.errorHandler(error, errorCallback)
      );
  }

  successHandler(response, callback) {
    // Add custom action for toast if required
    if (typeof callback === 'function') {
      callback(response);
    }
  }

  errorHandler(error, callback) {
    // Add custom action for toast

    if (typeof callback === 'function') {
      callback(error);
    }
  }
}

export const requestManager = new AxiosRequestManager();

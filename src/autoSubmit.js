import { requestManager } from './requestManager';
import { STATUS, THRESHOLD, rx_url, rx_eflow, rx_imageUrl, rx_token } from './constants';

export default class autoSubmit {
  constructor(updateStatus, updateCount) {
    this.url = '';
    this.updateStatus = updateStatus;
    this.updateCount = updateCount;
    this.index = -1;
    this.count = 0;
  }

  successHandler = () => {
    // update the status of current url as success
    if (this.index >= 0) {
      this.updateStatus({ index: this.index, status: STATUS.SUCCESS });
    }
  }

  failHandler = () => {
    // update the count or update the status of current url as fail
    if (this.index >= 0) {
      if (this.count < THRESHOLD) {
        this.updateCount({ index: this.index })
      } else {
        this.updateStatus({ index: this.index, status: STATUS.SUCCESS });
      }
    }
  }

  errorHandler = () => {
    if (this.count < THRESHOLD)
      this.failHandler();
    else
      this.updateStatus({ index: this.index, status: STATUS.ERROR });
  }

  execute = (url, index, count) => {
    this.url = url;
    this.index = index;
    this.count = count;
    // call the submission webpage
    requestManager.get('https://www.bing.com/toolbox/submit-site-url',
      (response) => {
        // extract eflow
        this.eflow = response.data.match(rx_eflow)[0].substr(20, 36);
        // extract the js file url
        const allUrls = response.data.match(rx_url);
        let jsUrl = allUrls.map(url => {
          if (/https:\/\/client.hip.live/gi.test(url)) {
            return url;
          }
        }).filter((val) => { return val != undefined })[0];
        jsUrl.replace(/[();"]/g, "");
        this.jsUrl = jsUrl;
        // move onto next step
        this.step2();
      },
      (error) => {
        alert('check CORS settings and refresh');
      }
    )
  }

  step2 = () => {
    if (!(this.jsUrl && this.eflow)) {
      // check for the validity of next step
      alert('error description: parameters failure');
      return this.errorHandler();
    }
    // get the js file
    requestManager.get(this.jsUrl,
      (response) => {
        // extract the token
        this.token = rx_token.exec(response.data)[1];
        // extract the image url
        this.imageUrl = rx_imageUrl.exec(response.data)[1];
        // call the captcha solution api
        const params = {
          'p': 'decode', 'url': this.imageUrl, 'key': '2c4f6d8ea9c7b35a99b82964917e0a51',
          'secret': 'b929f8b8', 'out': 'json'
        };
        requestManager.get('http://api.captchasolutions.com/solve',
          (response) => {
            this.captchasolution = response.data.captchasolutions
            this.step3();
          },
          (error) => {
            alert('error description: problem with captcha solution api')
          }, params);
      },
      (error) => {
        alert('error description: problem fetching the js file');
      });
  }

  step3 = () => {
    // submit the url
    const data = {
      "Solution": this.captchasolution,
      "Token": this.token,
      "Type": "visual",
      "eflow": this.eflow,
      "serverCode": 0,
      "url": this.url
    };
    requestManager.post('https://www.bing.com/toolbox/urlsubmitted', data, (response) => {
      var vDom = document.createElement('div');
      vDom.innerHTML = response.data;
      console.log(vDom.getElementsByTagName('H1'));
    },
    (error) => {
      console.log('error: ', error);
    }, 'html')
  }
}

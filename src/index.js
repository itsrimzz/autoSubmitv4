// import react dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// import redux dependencies
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// import components
import AppContainer from './Containers/AppContainer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const initialStoreData = {};
const store = configureStore(initialStoreData);

const route = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  route,
  document.getElementById('root')
);

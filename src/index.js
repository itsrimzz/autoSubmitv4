// import react dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// import redux dependencies
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// import components
import AppContainer from './Containers/AppContainer';
import KeywordApp from './Containers/KeywordApp';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

const initialStoreData = {};
const store = configureStore(initialStoreData);

const route = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route component={KeywordApp} path="/keywords" />
          <Route component={AppContainer} path="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  route,
  document.getElementById('root')
);

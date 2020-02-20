import React from 'react';
import { Router, Route, IndexRedirect, hashHistory, browserHistory } from 'react-router';

// Components
import App from 'containers/App';

// History
let history;
if (process.env.NODE_ENV === 'development') {
  history = hashHistory;
}else if (process.env.NODE_ENV === 'production') {
  history = browserHistory;
}

// Router
const Routes = (
  <Route path="/" component={App}>
  </Route>
);

export default Routes;

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import App from './Root';
import { browserHistory } from 'react-router';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();
//
const store = configureStore();

function renderApp(TheApp) {
  render(
    <AppContainer>
      <TheApp store={store} history={browserHistory} />
    </AppContainer>,
    document.getElementById('app')
  );
};

if (module.hot) {
  module.hot.accept('./Root', () => {
    renderApp(require('./Root').default)
  });
}

renderApp(App);

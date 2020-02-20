import rootReducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(ReduxThunk, ReduxPromise, createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

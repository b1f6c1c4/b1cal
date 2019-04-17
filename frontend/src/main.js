import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import { fromJS } from 'immutable';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';
import reducers from './reducers';
import './main.css';

const middlewares = [];

if (process.env.NODE_ENV !== 'production' || window.debug) {
  middlewares.push(createLogger({
    predicate: (getState, { type }) => !type || !type.startsWith('@@redux-form'),
    level: 'debug',
  }));
}

const enhancers = [
  applyMiddleware(...middlewares),
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'b1cal' })
  : compose;
/* eslint-enable no-underscore-dangle */

const store = createStore(
  reducers,
  fromJS({}),
  composeEnhancers(...enhancers),
);

render((
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>
) , document.getElementById('app'));

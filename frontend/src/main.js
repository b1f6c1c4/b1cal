import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { fromJS, Set } from 'immutable';
import * as datefns from 'date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import Root from './containers/Root';
import reducers from './reducers';
import rootSaga from './sagas';
import './main.css';

const saga = createSagaMiddleware();

const middlewares = [
  saga,
];

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
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'b1cal', trace: true })
  : compose;
/* eslint-enable no-underscore-dangle */

const today = datefns.parseISO(datefns.format(new Date(), 'yyyy-MM-dd'));
const init = fromJS({
  events: { },
  view: {
    start: today,
    end: datefns.addDays(today, 7),
  },
  cache: { },
}).set('dirty', new Set());

const store = createStore(
  reducers,
  init,
  composeEnhancers(...enhancers),
);

saga.run(rootSaga);

render((
  <Provider store={store}>
    <CssBaseline />
    <Root />
  </Provider>
) , document.getElementById('app'));

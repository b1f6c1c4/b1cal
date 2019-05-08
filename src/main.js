import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import { fromJS, Set } from 'immutable';
import * as datefns from 'date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import Root from './containers/Root';
import * as actions from './actions';
import reducers from './reducers';
import rootSaga from './sagas';
import './main.css';

const saga = createSagaMiddleware();

const middlewares = [
  saga,
];

const enhancers = [
  applyMiddleware(...middlewares),
  persistState(undefined, {
    key: 'b1cal',
    serialize: (state) => JSON.stringify({
      start: datefns.format(state.getIn(['view', 'start']), 'yyyy-MM-dd'),
      end: datefns.format(state.getIn(['view', 'end']), 'yyyy-MM-dd'),
      config: state.get('config').toJS(),
    }),
    deserialize: (raw) => {
      const parsed = JSON.parse(raw);
      if (!parsed) {
        return undefined;
      }
      const { start, end, config } = parsed;
      return fromJS({
        start: datefns.parseISO(start),
        end: datefns.parseISO(end),
        config,
      });
    },
    merge: (init, states) => init.mergeDeep(states),
  }),
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
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
  config: {
    shift: 4,
  },
  command: 'scroll',
})
  .set('dirty', new Set())
  .set('clean', new Set())
  .set('selection', new Set());

const store = createStore(
  reducers,
  init,
  composeEnhancers(...enhancers),
);

saga.run(rootSaga);

store.dispatch(actions.updateView({
  start: init.getIn(['view', 'start']),
  end: init.getIn(['view', 'end']),
}));

render((
  <Provider store={store}>
    <CssBaseline />
    <Root />
  </Provider>
), document.getElementById('app'));

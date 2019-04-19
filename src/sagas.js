import 'babel-polyfill';
import { call, delay, fork, put, race, take, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from './api';

export function* watchUpdateViewReq() {
  let req;
  while (true) {
    /* eslint-disable redux-saga/yield-effects */
    const racing = {
      uv: take(actions.UPDATE_VIEW),
      uvq: take(actions.UPDATE_VIEW_REQ),
    };
    if (req) {
      racing.del = delay(150);
    }
    /* eslint-enable redux-saga/yield-effects */
    // eslint-disable-next-line redux-saga/no-yield-in-race
    const { uv, uvq } = yield race(racing);
    if (uv) {
      req = undefined;
    } else if (uvq) {
      if (req !== undefined) {
        req = uvq;
      } else {
        yield put(actions.updateView(uvq));
        req = null;
      }
    } else if (req) {
      yield put(actions.updateView(req));
      req = undefined;
    }
  }
}

export function* listEventsFromBackend({ start, end }) {
  const lst = yield call(api.listEvents, { start, end });
  for (const item of lst) {
    yield put(actions.recvEvent(item));
  }
}

export function* syncCreateToBackend({ event }) {
  const res = yield call(api.createEvent, event);
  yield put(actions.recvEvent(res));
}

export function* syncModifyToBackend({ event }) {
  const res = yield call(api.updateEvent, event);
  yield put(actions.recvEvent(res));
}

export function* syncDeleteToBackend({ event }) {
  yield call(api.deleteEvent, event);
  yield put(actions.recvEvent(undefined, event.eId));
}

export default function* () {
  yield fork(watchUpdateViewReq);
  yield takeEvery('UPDATE_VIEW', listEventsFromBackend);
  yield takeEvery('CREATE_EVENT', syncCreateToBackend);
  yield takeEvery('MODIFY_EVENT', syncModifyToBackend);
  yield takeEvery('DELETE_EVENT', syncDeleteToBackend);
}

import 'babel-polyfill';
import { select, call, delay, fork, put, race, take, takeEvery } from 'redux-saga/effects';
import * as datefns from 'date-fns';
import * as actions from './actions';
import GoogleCalendar from './api';

const api = new GoogleCalendar();

export function* watchUpdateViewReq() {
  let req;
  while (true) {
    /* eslint-disable redux-saga/yield-effects */
    const racing = {
      uv: take(actions.UPDATE_VIEW),
      uvq: take(actions.UPDATE_VIEW_REQ),
    };
    if (req) {
      racing.del = delay(50);
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
  const clean = yield select((state) => state.get('clean'));
  let st = datefns.addDays(start, -2);
  let ed = datefns.addDays(end, +2);
  for (; st < ed; st = datefns.addDays(st, +1)) {
    if (!clean.has(+st)) {
      break;
    }
  }
  for (; st < ed; ed = datefns.addDays(st, -1)) {
    if (!clean.has(+ed)) {
      break;
    }
  }
  if (st >= ed) {
    return;
  }
  try {
    const lst = yield call([api, 'listEvents'], { start: st, end: ed });
    const dates = [];
    for (; st < ed; st = datefns.addDays(st, 1)) {
      dates.push(+st);
    }
    yield put(actions.markClean(dates));
    for (const item of lst) {
      yield put(actions.recvEvent(item));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export function* syncCreateToBackend({ event }) {
  const res = yield call([api, 'createEvent'], event);
  yield put(actions.recvEvent(res));
}

export function* syncModifyToBackend({ event }) {
  const res = yield call([api, 'updateEvent'], event);
  yield put(actions.recvEvent(res));
}

export function* syncDeleteToBackend({ event }) {
  yield call([api, 'deleteEvent'], event);
  yield put(actions.recvEvent(undefined, event.id));
}

export default function* () {
  yield fork(watchUpdateViewReq);
  yield takeEvery('UPDATE_VIEW', listEventsFromBackend);
  yield takeEvery('CREATE_EVENT', syncCreateToBackend);
  yield takeEvery('MODIFY_EVENT', syncModifyToBackend);
  yield takeEvery('DELETE_EVENT', syncDeleteToBackend);
}

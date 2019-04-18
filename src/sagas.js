import 'babel-polyfill';
import { delay, fork, put, race, take, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

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
      req = null;
    }
  }
}

export function* syncModifyToBackend(action) {
  // TODO
  yield delay(1000);
  yield put(actions.recvEvent(action.event));
}

export function* syncDeleteToBackend(action) {
  // TODO
  yield delay(1000);
  yield put(actions.recvEvent(undefined, action.event.eId));
}

export default function* () {
  yield fork(watchUpdateViewReq);
  yield takeEvery('MODIFY_EVENT', syncModifyToBackend);
  yield takeEvery('DELETE_EVENT', syncDeleteToBackend);
}

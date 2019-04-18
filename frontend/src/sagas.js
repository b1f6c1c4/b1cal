import 'babel-polyfill';
import _ from 'lodash';
import { delay, fork, put, race, take, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

export function* watchUpdateViewReq() {
  let req = undefined;
  while (true) {
    const racing = {
      uv: take(actions.UPDATE_VIEW),
      uvq: take(actions.UPDATE_VIEW_REQ),
    };
    if (req) {
      racing.del = delay(150);
    }
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

export default function*() {
  yield fork(watchUpdateViewReq);
  yield takeEvery('MODIFY_EVENT', syncModifyToBackend);
  yield takeEvery('DELETE_EVENT', syncDeleteToBackend);
}

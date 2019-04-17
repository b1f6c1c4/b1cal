import 'babel-polyfill';
import { delay } from 'redux-saga/effects';
import { put, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

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
  yield takeEvery('MODIFY_EVENT', syncModifyToBackend);
  yield takeEvery('DELETE_EVENT', syncDeleteToBackend);
}

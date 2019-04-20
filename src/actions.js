export const UPDATE_VIEW_REQ = 'UPDATE_VIEW_REQ';
export function updateViewReq({ start, end }) {
  return {
    type: UPDATE_VIEW_REQ,
    start,
    end,
  };
}

export const UPDATE_VIEW = 'UPDATE_VIEW';
export function updateView({ start, end }) {
  return {
    type: UPDATE_VIEW,
    start,
    end,
  };
}

export const MARK_CLEAN = 'MARK_CLEAN';
export function markClean(dates) {
  return {
    type: MARK_CLEAN,
    dates,
  };
}

export const CREATE_EVENT = 'CREATE_EVENT';
export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    event,
  };
}

export const MODIFY_EVENT = 'MODIFY_EVENT';
export function modifyEvent(event) {
  return {
    type: MODIFY_EVENT,
    event,
  };
}

export const DELETE_EVENT = 'DELETE_EVENT';
export function deleteEvent(event) {
  return {
    type: DELETE_EVENT,
    event,
  };
}

export const RECV_EVENT = 'RECV_EVENT';
export function recvEvent(event, id) {
  if (!id) {
    ({ id } = event);
  }
  return {
    type: RECV_EVENT,
    id,
    event,
  };
}

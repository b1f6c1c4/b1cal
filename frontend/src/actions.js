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
export function recvEvent(event, eId) {
  if (!eId) {
    ({ eId } = event);
  }
  return {
    type: RECV_EVENT,
    eId,
    event,
  };
}

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

export const COMMAND_CANCEL = 'COMMAND_CANCEL';
export function commandCancel() {
  return {
    type: COMMAND_CANCEL,
  };
}

export const COMMAND_DELETE = 'COMMAND_DELETE';
export function commandDelete() {
  return {
    type: COMMAND_DELETE,
  };
}

export const COMMAND_RANGE = 'COMMAND_RANGE';
export function commandRange() {
  return {
    type: COMMAND_RANGE,
  };
}

export const COMMAND_SELECT = 'COMMAND_SELECT';
export function commandSelect() {
  return {
    type: COMMAND_SELECT,
  };
}

export const COMMAND_CREATE = 'COMMAND_CREATE';
export function commandCreate() {
  return {
    type: COMMAND_CREATE,
  };
}

export const COMMAND_COPY = 'COMMAND_COPY';
export function commandCopy() {
  return {
    type: COMMAND_COPY,
  };
}

export const COMMAND_MOVE = 'COMMAND_MOVE';
export function commandMove() {
  return {
    type: COMMAND_MOVE,
  };
}

export const COMMAND_EDIT = 'COMMAND_EDIT';
export function commandEdit() {
  return {
    type: COMMAND_EDIT,
  };
}

export const COMMAND_CREATE_NEXT = 'COMMAND_CREATE_NEXT';
export function commandCreateNext() {
  return {
    type: COMMAND_CREATE_NEXT,
  };
}

export const COMMAND_CREATE_OK = 'COMMAND_CREATE_OK';
export function commandCreateOK() {
  return {
    type: COMMAND_CREATE_OK,
  };
}

export const COMMAND_EDIT_OK = 'COMMAND_EDIT_OK';
export function commandEditOK() {
  return {
    type: COMMAND_EDIT_OK,
  };
}

export const COMMAND_COPY_OK = 'COMMAND_COPY_OK';
export function commandCopyOK() {
  return {
    type: COMMAND_COPY_OK,
  };
}

export const COMMAND_MOVE_OK = 'COMMAND_MOVE_OK';
export function commandMoveOK() {
  return {
    type: COMMAND_MOVE_OK,
  };
}

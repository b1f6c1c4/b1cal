import { fromJS } from 'immutable';
import * as actions from './actions';

function eventUpdate(state, dirty, event, id) {
  if (!id) {
    ({ id } = event);
  }
  const orig = state.getIn(['events', id]);
  if (orig === event) {
    return state;
  }
  const ev = fromJS(event);
  return state.withMutations((ctx) => {
    if (event) {
      ctx.setIn(['events', id], ev);
    } else {
      ctx.deleteIn(['events', id]);
    }
    if (dirty) {
      ctx.set('dirty', ctx.get('dirty').add(id));
    } else {
      ctx.deleteIn(['dirty', id]);
    }
  });
}

export default function (state, action) {
  switch (action.type) {
    case actions.UPDATE_VIEW:
      return state
        .setIn(['view', 'start'], action.start)
        .setIn(['view', 'end'], action.end);
    case actions.MARK_CLEAN:
      return state.set('clean', state.get('clean').withMutations((ctx) => {
        action.dates.forEach((d) => {
          ctx.add(d);
        });
      }));
    case actions.MODIFY_EVENT:
      return eventUpdate(state, true, action.event);
    case actions.DELETE_EVENT:
      return eventUpdate(state, true, undefined, action.event.id);
    case actions.RECV_EVENT:
      return eventUpdate(state, false, action.event, action.id);
    default:
      return state;
  }
}

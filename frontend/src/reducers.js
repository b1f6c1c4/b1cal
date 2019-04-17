import { fromJS } from 'immutable';
import * as datefns from 'date-fns';
import * as actions from './actions';

function forEachDate(event, f) {
  const { start, end } = event;
  let i = datefns.parseISO(datefns.format(new Date(), 'yyyy-MM-dd'));
  for (; i < end; i = datefns.addDays(i, 1)) {
    f(i, event);
  }
}

function eventUpdate(state, dirty, event, eId) {
  if (!eId) {
    ({ eId } = event);
  }
  const orig = state.getIn(['events', eId]);
  const ev = fromJS(event);
  return state.withMutations((ctx) => {
    if (orig) {
      forEachDate(orig.toJS(), (d) => {
        ctx.deleteIn(['cache', d, eId]);
      });
    }
    if (event) {
      forEachDate(event, (d) => {
        ctx.setIn(['cache', d, eId], ev);
      });
      ctx.setIn(['events', eId], ev);
    } else {
      ctx.deleteIn(['events', eId]);
    }
    if (dirty) {
      ctx.set('dirty', ctx.get('dirty').add(eId));
    } else {
      ctx.deleteIn(['dirty', eId]);
    }
  });
}

export default function (state, action) {
  switch (action.type) {
    case actions.UPDATE_VIEW:
      return state
        .setIn(['view', 'start'], action.start)
        .setIn(['view', 'end'], action.end);
    case actions.MODIFY_EVENT:
      return eventUpdate(state, true, action.event);
    case actions.DELETE_EVENT:
      return eventUpdate(state, true, undefined, action.event.eId);
    case actions.RECV_EVENT:
      return eventUpdate(state, false, action.event, action.eId);
    default:
      return state;
  }
};

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import * as datefns from 'date-fns';
import App from '../components/App';
import * as actions from '../actions';

function forEachDate(event, f) {
  const start = event.get('start');
  const end = event.get('end');
  const final = datefns.addDays(end, 1);
  let i = datefns.parseISO(datefns.format(new Date(+start), 'yyyy-MM-dd'));
  i = datefns.addDays(i, -1);
  while (i < end) {
    f(i, event);
    i = datefns.addDays(i, 1);
  }
}

const mapStateToProps = (state) => {
  const shift = state.getIn(['config', 'shift']);
  const start = state.getIn(['view', 'start']);
  const end = state.getIn(['view', 'end']);
  const cache = fromJS({}).withMutations((ctx) => {
    state.get('events').forEach((event) => {
      forEachDate(event, (i) => {
        ctx.setIn([+i, event.get('id')], event);
      });
    });
  });
  return { shift, start, end, cache };
};

const mapDispatchToProps = (dispatch) => ({
  updateView: (e, forced = true) => dispatch(
    forced
      ? actions.updateView(e)
      : actions.updateViewReq(e),
  ),
});

export default
@connect(mapStateToProps, mapDispatchToProps)
class Root extends PureComponent {
  render() {
    return (
      <App {...this.props} />
    );
  }
}

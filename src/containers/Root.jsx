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
  const command = state.get('command');
  return {
    shift,
    start,
    end,
    cache,
    command,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateView: (e, forced = true) => dispatch(
    forced
      ? actions.updateView(e)
      : actions.updateViewReq(e),
  ),
  commandCancel: () => dispatch(actions.commandCancel()),
  commandDelete: () => dispatch(actions.commandDelete()),
  commandRange: () => dispatch(actions.commandRange()),
  commandSelect: () => dispatch(actions.commandSelect()),
  commandCreate: () => dispatch(actions.commandCreate()),
  commandCopy: () => dispatch(actions.commandCopy()),
  commandMove: () => dispatch(actions.commandMove()),
  commandEdit: () => dispatch(actions.commandEdit()),
  commandCreateNext: () => dispatch(actions.commandCreateNext()),
  commandCreateOK: () => dispatch(actions.commandCreateOK()),
  commandEditOK: () => dispatch(actions.commandEditOK()),
  commandCopyOK: () => dispatch(actions.commandCopyOK()),
  commandMoveOK: () => dispatch(actions.commandMoveOK()),
});

class Root extends PureComponent {
  render() {
    return (
      <App {...this.props} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

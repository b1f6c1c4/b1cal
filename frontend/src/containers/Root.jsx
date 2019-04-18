import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
  start: state.getIn(['view', 'start']),
  end: state.getIn(['view', 'end']),
  cache: state.get('cache'),
});

const mapDispatchToProps = (dispatch) => ({
  updateView: (e, forced = true) => dispatch(
    forced
    ? actions.updateView(e)
    : actions.updateViewReq(e),
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Root extends PureComponent {
  render() {
    return (
      <App {...this.props} />
    );
  }
}

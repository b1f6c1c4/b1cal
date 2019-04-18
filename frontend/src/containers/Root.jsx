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
  updateView: (e) => dispatch(actions.updateView(e)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Root extends PureComponent {
  render() {
    return (
      <App {...this.props} />
    );
  }
}

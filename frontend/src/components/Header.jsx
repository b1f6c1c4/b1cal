import _ from 'lodash';
import React, { PureComponent } from 'react';

class HeaderDay extends PureComponent {
  render() {
    const { count } = this.props;
    return (
      <div className="day" style={{
        width: `${100/count}%`,
      }}>
        <div className="weekNumber">114514</div>
        <div className="date">09/20</div>
        <div className="dayInWeek">Monday</div>
      </div>
    );
  }
};

export default class Header extends PureComponent {
  render() {
    const { count } = this.props;
    return (
      <div className="header">
        <div className="head">b1cal</div>
        <div className="days">
          {_.times(count, (i) => (
            <HeaderDay
              key={i}
              count={count}
            />
          ))}
        </div>
      </div>
    );
  }
};

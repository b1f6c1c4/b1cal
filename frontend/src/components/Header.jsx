import _ from 'lodash';
import React, { PureComponent } from 'react';
import * as datefns from 'date-fns';

class HeaderDay extends PureComponent {
  render() {
    const { date, count } = this.props;
    let week;
    if (datefns.getDay(date) === 1) {
      week = datefns.format(date, 'I');
    } else {
      week = <span>&nbsp;</span>;
    }
    return (
      <div className="day" style={{
        width: `${100/count}%`,
      }}>
        <div className="weekNumber">{week}</div>
        <div className="date">{datefns.format(date, 'MM/dd')}</div>
        <div className="dayInWeek">{datefns.format(date, 'EEEE')}</div>
      </div>
    );
  }
};

export default class Header extends PureComponent {
  render() {
    const { start, end } = this.props;
    const count = (end - start) / 86400000;
    return (
      <div className="header">
        <div className="head">b1cal</div>
        <div className="days">
          {_.times(count, (i) => (
            <HeaderDay
              key={i}
              date={datefns.addDays(start, i)}
              count={count}
            />
          ))}
        </div>
      </div>
    );
  }
};

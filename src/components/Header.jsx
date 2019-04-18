import _ from 'lodash';
import React from 'react';
import * as datefns from 'date-fns';

function HeaderDay({ date, count }) {
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

export default function Header({ start, end }) {
  const count = (end - start) / 86400000;
  if (count >= 120) {
    return (
      <div className="header">
        <div className="crazy">Are you crazy?</div>
      </div>
    );
  }
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

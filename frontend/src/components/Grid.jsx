import _ from 'lodash';
import React from 'react';
import * as datefns from 'date-fns';
import Head from './Head';

function GridItem({ id, shift }) {
  const hour = id + shift;
  if (hour == 23) {
    return (
      <div className="grid-item hour24"></div>
    );
  }
  return (
    <div className="grid-item"></div>
  );
}

function Day({ shift, count, events }) {
  const rendered = [];
  if (events) {
    events.forEach((v) => {
      rendered.push((
        <div key={v.get('eId')} className="event" style={{
          top: '30%', // TODO
          height: '8%', // TODO
        }}>
          {v.get('name')}
        </div>
      ));
    });
  }
  return (
    <div className="day" style={{
      width: `${100/count}%`,
    }}>
      {_.times(24, (i) => (
        <GridItem key={i} id={i} shift={shift} />
      ))}
      {rendered}
    </div>
  );
}

export default function Grid({ start, end, shift, cache }) {
  const count = (end - start) / 86400000;
  return (
    <div className="grid">
      <Head shift={shift} />
      <div className="days">
        {_.times(count, (i) => {
          const d = datefns.addDays(start, i);
          return (
            <Day
              key={+d}
              shift={shift}
              count={count}
              events={cache.get(+d)}
            />
          );
        })}
      </div>
    </div>
  );
}

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

function Day({ date, shift, count, events }) {
  const rendered = [];
  if (events) {
    events.forEach((v) => {
      let start = (v.get('start') - date) / 86400000 - shift / 24;
      let end = (v.get('end') - date) / 86400000 - shift / 24;
      if (start > 1 || end < 0) return;
      if (start < 0) start = 0;
      if (end > 1) end = 1;
      rendered.push((
        <div
          key={v.get('id')}
          className="event"
          style={{
            top: `${100*start}%`,
            height: `${100*(end - start)}%`,
          }}
          onDoubleClick={() => window.open(v.get('htmlLink'), '_blank')}
        >
          <p className="summary">{v.get('summary')}</p>
          <p className="location">{v.get('location')}</p>
          <p className="description">{v.get('description')}</p>
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
  if (count >= 120) {
    return (
      <div className="grid">
        <div className="crazy">Are you crazy?</div>
      </div>
    );
  }
  return (
    <div className="grid">
      <Head shift={shift} />
      <div className="days">
        {_.times(count, (i) => {
          const d = datefns.addDays(start, i);
          return (
            <Day
              key={+d}
              date={d}
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

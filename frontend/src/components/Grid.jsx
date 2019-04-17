import _ from 'lodash';
import React from 'react';
import Head from './Head';

function GridItem({ id, shift }) {
  const hour = id + shift;
  if (hour == 23) {
    return (
      <div className="grid-item hour24">
      </div>
    );
  }
  return (
    <div className="grid-item">
    </div>
  );
}

function Day({ shift, count }) {
  return (
    <div className="day" style={{
      width: `${100/count}%`,
    }}>
      {_.times(24, (i) => (
        <GridItem
          key={i}
          id={i}
          shift={shift}
        />
      ))}
    </div>
  );
}

export default function Grid({ start, end, shift }) {
  const count = (end - start) / 86400000;
  return (
    <div className="grid">
      <Head shift={shift} />
      <div className="days">
        {_.times(count, (i) => (
          <Day
            key={i}
            shift={shift}
            count={count}
          />
        ))}
      </div>
    </div>
  );
}

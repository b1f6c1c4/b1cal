import React from 'react';
import * as datefns from 'date-fns';

function SliderUnit({ children, xstart, xend, start, len, scaling }) {
  const left = (xstart - start) / 86400000 / len * scaling + (1 - scaling) / 2;
  const width = (xend - xstart) / 86400000 / len * scaling;
  return (
    <div className="unit" style={{
      left: `${100*left}%`,
      width: `${100*width}%`,
    }}>
      <div>
        {children}
      </div>
    </div>
  );
}

export default function Slider({ start, end }) {
  const len = (end - start) / 86400000;
  const scaling = 0.15+0.50*0.01*len/Math.sqrt(1+0.01*0.01*len*len);
  let initial = new Date(+start - (1 - scaling) / 2 / scaling * len * 86400000);
  let final = new Date(+end + (1 - scaling) / 2 / scaling * len * 86400000);

  const content = [];
  if (len >= 90) {
    initial = datefns.setDayOfYear(initial, 1)
    final = datefns.addYears(datefns.setDayOfYear(final, 1), 1);
    for (let i = initial; i < final; i = datefns.addYears(i, 1)) {
      content.push(
        <SliderUnit
          key={i}
          xstart={i}
          xend={datefns.addYears(i, 1)}
          start={start}
          len={len}
          scaling={scaling}
        >
          {datefns.format(i, 'yyyy')}
        </SliderUnit>
      );
    }
  } else if (len >= 7) {
    initial = datefns.setDate(initial, 1);
    final = datefns.addMonths(datefns.setDate(final, 1), 1);
    for (let i = initial; i < final; i = datefns.addMonths(i, 1)) {
      content.push(
        <SliderUnit
          key={i}
          xstart={i}
          xend={datefns.addMonths(i, 1)}
          start={start}
          len={len}
          scaling={scaling}
        >
          {datefns.format(i, 'MMM')}
        </SliderUnit>
      );
    }
  }

  return (
    <div className="slider">
      <div className="units">
        {content}
      </div>
      <div className="overlay" style={{
        left: `${100*(1-scaling)/2}%`,
        width: `${100*scaling}%`,
      }}></div>
    </div>
  );
}

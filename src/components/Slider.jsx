import React, { PureComponent } from 'react';
import * as datefns from 'date-fns';
import Draggable from './Draggable';

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

export default function Slider({
  oldstart,
  oldend,
  start,
  end,
  handleFinish,
  handleDrag,
}) {
  const oldlen = (oldend - oldstart) / 86400000;
  const oldscaling = 0.15+0.50*0.01*oldlen/Math.sqrt(1+0.01*0.01*oldlen*oldlen);
  const len = (end - start) / 86400000;
  const scaling = 0.15+0.50*0.01*len/Math.sqrt(1+0.01*0.01*len*len);
  const del = Math.ceil((1 - scaling) / 2 / scaling * len) * 86400000;
  let initial = new Date(+start - del);
  let final = new Date(+end + del);

  const content = [];
  if (len >= 120) {
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
  } else if (len >= 4) {
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
  } else {
    for (let i = initial; i < final; i = datefns.addDays(i, 1)) {
      content.push(
        <SliderUnit
          key={i}
          xstart={i}
          xend={datefns.addDays(i, 1)}
          start={start}
          len={len}
          scaling={scaling}
        >
            {datefns.format(i, 'dd')}
      </SliderUnit>
      );
    }
  }

  return (
    <div className="slider">
      <div className="draggables">
        <Draggable
          left={0}
          width={(1 - oldscaling) / 2}
          onFinish={handleFinish}
          onChange={handleDrag(true, false)}
        />
        <Draggable
          left={(1 - oldscaling) / 2}
          width={oldscaling}
          onFinish={handleFinish}
          onChange={handleDrag(true, true)}
        />
        <Draggable
          left={(1 + oldscaling) / 2}
          width={(1 - oldscaling) / 2}
          onFinish={handleFinish}
          onChange={handleDrag(false, true)}
        />
      </div>
      <div className="units">
          {content}
      </div>
      <div className="overlay" style={{
        left: `${100*(1 - scaling)/2}%`,
        width: `${100*scaling}%`,
      }}>
      </div>
    </div>
  );
}

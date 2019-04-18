import _ from 'lodash';
import React from 'react';

Number.prototype.pad = function(size) {
  let s = String(this);
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

function HeadItem({ id, shift }) {
  let hour = id + shift;
  let flag = false;
  if (hour == 23) {
    flag = true;
  }
  if (hour >= 24) {
    hour -= 24;
  }
  const fmt = `${hour.pad(2)}:00`;
  if (flag) {
    return (
      <div className="grid-item hour24">{fmt}</div>
    );
  }
  return (
    <div className="grid-item">{fmt}</div>
  );
}

export default function Head({ shift }) {
  return (
    <div className="head">
      {_.times(24, (i) => (
        <HeadItem
          key={i}
          id={i}
          shift={shift}
        />
      ))}
    </div>
  );
}

import React, { PureComponent } from 'react';
import * as datefns from 'date-fns';
import Header from './Header';
import Grid from './Grid';
import Slider from './Slider';

export default function App({ shift, start, end, cache, updateView }) {
  return (
    <div className="app">
      <Header start={start} end={end} />
      <Grid start={start} end={end} shift={shift} cache={cache} />
      <Slider start={start} end={end} updateView={updateView} />
    </div>
  );
}

import React, { PureComponent } from 'react';
import * as datefns from 'date-fns';
import Header from './Header';
import Grid from './Grid';
import Slider from './Slider';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      start: '2019-04-15',
      end: '2019-05-03',
    };
  }

  render() {
    const start = datefns.parseISO(this.state.start);
    const end = datefns.parseISO(this.state.end);

    return (
      <div className="app">
        <Header start={start} end={end} />
        <Grid start={start} end={end} shift={4} />
        <Slider start={start} end={end} />
      </div>
    );
  }
};

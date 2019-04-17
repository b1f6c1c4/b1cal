import React, { PureComponent } from 'react';
import Header from './Header';
import Grid from './Grid';
import Slider from './Slider';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <Header count={7} />
        <Grid count={7} shift={4} />
        <Slider scaling={0.12} />
      </div>
    );
  }
};

import React, { PureComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import './app.css'

class GridItem extends PureComponent {
  render() {
    return (
      <div className="grid-item">
      </div>
    );
  }
}

class Day extends PureComponent {
  render() {
    return (
      <div className="day">
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
      </div>
    );
  }
}

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <div className="header">
          <div className="head"></div>
          <div className="day"></div>
          <div className="day"></div>
          <div className="day"></div>
          <div className="day"></div>
          <div className="day"></div>
        </div>
        <div className="grid-container">
          <div className="grid">
            <div className="head"></div>
            <Day />
            <Day />
            <Day />
            <Day />
            <Day />
          </div>
        </div>
        <div className="scroller">
          <div className="overlay"></div>
        </div>
      </div>
    );
  }
};

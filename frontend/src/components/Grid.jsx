import _ from 'lodash';
import React, { PureComponent } from 'react';
import Head from './Head';

class GridItem extends PureComponent {
  render() {
    const { id, shift } = this.props;
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
}

class Day extends PureComponent {
  render() {
    const { shift, count } = this.props;
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
}

export default class Grid extends PureComponent {
  render() {
    const { shift, count } = this.props;
    return (
      <div className="grid-container">
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
      </div>
    );
  }
};

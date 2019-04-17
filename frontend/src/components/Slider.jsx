import React, { PureComponent } from 'react';

export default class Slider extends PureComponent {
  render() {
    const { scaling } = this.props;
    return (
      <div className="slider">
        <div className="overlay" style={{
          left: `${100*(1-scaling)/2}%`,
          width: `${100*scaling}%`,
        }}></div>
      </div>
    );
  }
};

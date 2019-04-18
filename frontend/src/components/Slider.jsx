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

export default class Slider extends PureComponent {
  state = { isDragging: false, oldstart: null, oldend: null };

  handleDrag = (st, ed) => ({ delta }) => {
    let { isDragging, oldstart, oldend } = this.state;
    if (!isDragging) {
      oldstart = this.props.start;
      oldend = this.props.end;
      this.setState({ isDragging: true, oldstart, oldend });
    }
    const len = (oldend - oldstart) / 86400000;
    const scaling = 0.15+0.50*0.01*len/Math.sqrt(1+0.01*0.01*len*len);

    let dist = Math.round((oldend - oldstart) / scaling * delta / 3 / 86400000);
    if (st ^ ed) {
      dist = -dist;
    }
    let start = st ? datefns.addDays(oldstart, dist) : this.props.start;
    let end = ed ? datefns.addDays(oldend, dist) : this.props.end;
    if (+this.props.start !== +start || +this.props.end !== +end) {
      this.props.updateView({ start, end });
    }
  };

  handleFinish = () => {
    this.setState({ isDragging: false });
  };

  render() {
    const { start, end } = this.props;
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
        <div className="draggables">
          <Draggable
            onFinish={this.handleFinish}
            onChange={this.handleDrag(true, false)}
          />
          <Draggable
            onFinish={this.handleFinish}
            onChange={this.handleDrag(true, true)}
          />
          <Draggable
            onFinish={this.handleFinish}
            onChange={this.handleDrag(false, true)}
          />
        </div>
        <div className="units">
          {content}
        </div>
        <div className="overlay" style={{
          left: `${100*(1 - scaling)/2}%`,
          width: `${100*scaling}%`,
        }}></div>
    </div>
    );
  }
}

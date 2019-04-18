import React, { PureComponent } from 'react';

export default class Draggable extends PureComponent {
  constructor(props) {
    super(props);
    this.draggable = React.createRef();
  }

  handleDrag = (e) => {
    const width = this.draggable.current.offsetWidth;
    this.data = {
      width,
      delta: (e.pageX - this.startX) / width,
    };
    this.props.onChange && this.props.onChange(this.data);
  };

  handleStart = (e) => {
    this.startX = e.pageX;
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleEnd);
    document.addEventListener('mouseleave', this.handleEnd);
  };

  handleEnd = (e) => {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleEnd);
    document.removeEventListener('mouseleave', this.handleEnd);
    this.props.onFinish && this.props.onFinish(this.data);
  };

  render() {
    return (
      <div
        className="draggable"
        ref={this.draggable}
        onMouseDown={this.handleStart}
        onTouchStart={this.handleStart}
      />
    );
  }
}

import React, { PureComponent } from 'react';

export default class Draggable extends PureComponent {
  constructor(props) {
    super(props);
    this.draggable = React.createRef();
  }

  handleDragMouse = (e) => {
    const width = this.draggable.current.offsetWidth;
    this.data = {
      delta: (e.pageX - this.startX) / width * this.props.width,
    };
    this.props.onChange && this.props.onChange(this.data);
  };

  handleStartMouse = (e) => {
    this.startX = e.pageX;
    document.addEventListener('mousemove', this.handleDragMouse);
    document.addEventListener('mouseup', this.handleEndMouse);
    document.addEventListener('mouseleave', this.handleEndMouse);
  };

  handleEndMouse = (e) => {
    document.removeEventListener('mousemove', this.handleDragMouse);
    document.removeEventListener('mouseup', this.handleEndMouse);
    document.removeEventListener('mouseleave', this.handleEndMouse);
    if (this.data) {
      this.props.onFinish && this.props.onFinish(this.data);
    }
    this.data = undefined;
  };

  handleDragTouch = (e) => {
    const width = this.draggable.current.offsetWidth;
    this.data = {
      delta: (e.changedTouches[0].pageX - this.startX) / width * this.props.width,
    };
    this.props.onChange && this.props.onChange(this.data);
  };

  handleStartTouch = (e) => {
    this.startX = e.changedTouches[0].pageX;
    document.addEventListener('touchmove', this.handleDragTouch, {
      passive: false,
    });
    document.addEventListener('touchend', this.handleEndTouch);
  };

  handleEndTouch = (e) => {
    document.removeEventListener('touchmove', this.handleDragTouch);
    document.removeEventListener('touchend', this.handleEndTouch);
    if (this.data) {
      this.props.onFinish && this.props.onFinish(this.data);
    }
    this.data = undefined;
  };

  preventDragHandler = (e) => {
    e.preventDefault();
  };

  render() {
    const { left, width } = this.props;
    return (
      <div
        className="draggable"
        style={{
          left: `${100*left}%`,
          width: `${100*width}%`,
        }}
        ref={this.draggable}
        onMouseDown={this.handleStartMouse}
        onTouchStart={this.handleStartTouch}
        onDragStart={this.preventDragHandler}
      />
    );
  }
}

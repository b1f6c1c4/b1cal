import React, { PureComponent } from 'react';
import * as datefns from 'date-fns';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from './Header';
import Grid from './Grid';
import Slider from './Slider';
import Draggable from './Draggable';

export default class App extends PureComponent {
  state = {
    isDragging: false,
    oldstart: null,
    oldend: null,
    start: null,
    end: null,
  };

  handleDrag = (st, ed, mult) => ({ delta }) => {
    let { isDragging, oldstart, oldend } = this.state;
    if (!isDragging) {
      oldstart = this.props.start;
      oldend = this.props.end;
    }
    const len = (oldend - oldstart) / 86400000;
    const scaling = mult || 0.15+0.50*0.01*len/Math.sqrt(1+0.01*0.01*len*len);

    let dist = Math.round(-(oldend - oldstart) / scaling * delta / 86400000);
    let start = st ? datefns.addDays(oldstart, dist) : this.props.start;
    let end = ed ? datefns.addDays(oldend, dist) : this.props.end;
    if (end - start < 86400000) {
      return;
    }
    if (+this.state.start !== +start || +this.state.end !== +end) {
      this.setState({ isDragging: true, oldstart, oldend, start, end });
      this.props.updateView({ start, end }, false);
    }
  };

  handleFinish = () => {
    this.props.updateView({ start: this.state.start, end: this.state.end });
    this.setState({ isDragging: false });
  };

  render() {
    let { isDragging, oldstart, oldend, start, end } = this.state;
    if (!isDragging) {
      ({ start, end } = this.props);
      oldstart = start;
      oldend = end;
    }
    const {
      shift,
      cache,
      command,
      updateView,
      commandCancel,
      commandDelete,
      commandRange,
      commandSelect,
      commandCreate,
      commandCopy,
      commandMove,
      commandEdit,
      commandCreateNext,
      commandCreateOK,
      commandEditOK,
      commandCopyOK,
      commandMoveOK,
    } = this.props;

    const fabs = [];
    switch (command)
    {
      case 'scroll':
        fabs.push(
          <Fab key="range" color="primary" onClick={commandRange}>
            <SelectAllIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="edit" color="primary" onClick={commandSelect}>
            <EditIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="add" color="primary" onClick={commandCreate}>
            <AddIcon />
          </Fab>
        );
        break;
      case 'create':
        fabs.push(
          <Fab key="no" color="secondary" onClick={commandCancel}>
            <CloseIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="yes" color="primary" onClick={commandCreateOK}>
            <CheckIcon />
          </Fab>
        );
        break;
      case 'range':
        fabs.push(
          <Fab key="no" color="secondary" onClick={commandCancel}>
            <CloseIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="yes" color="primary" onClick={commandSelect}>
            <CheckIcon />
          </Fab>
        );
        break;
      case 'select':
        fabs.push(
          <Fab key="no" color="secondary" onClick={commandCancel}>
            <CloseIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="delete" color="secondary" onClick={commandDelete}>
            <DeleteIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="copy" color="primary" onClick={commandCopy}>
            <FileCopyIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="move" color="primary" onClick={commandMove}>
            <ZoomOutMapIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="edit" color="primary" onClick={commandEdit}>
            <EditIcon />
          </Fab>
        );
        break;
      case 'copy':
        fabs.push(
          <Fab key="no" color="secondary" onClick={commandSelect}>
            <CloseIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="yes" color="primary" onClick={commandCopyOK}>
            <CheckIcon />
          </Fab>
        );
        break;
      case 'move':
        fabs.push(
          <Fab key="no" color="secondary" onClick={commandSelect}>
            <CloseIcon />
          </Fab>
        );
        fabs.push(
          <Fab key="yes" color="primary" onClick={commandMoveOK}>
            <CheckIcon />
          </Fab>
        );
        break;
    }

    return (
      <div className="app">
        <div className="predrag-cont">
          <div className="head"></div>
          <Draggable
            left={0}
            width={1}
            onFinish={this.handleFinish}
            onChange={this.handleDrag(true, true, 1)}
          />
        </div>
        <Header start={start} end={end} />
        <Grid start={start} end={end} shift={shift} cache={cache} />
        <Slider
          isDragging={isDragging}
          oldstart={start}
          oldend={end}
          start={start}
          end={end}
          handleFinish={this.handleFinish}
          handleDrag={this.handleDrag}
        />
        <div className="fabs">{fabs}</div>
      </div>
    );
  }
}

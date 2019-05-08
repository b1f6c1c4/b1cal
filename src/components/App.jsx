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

export default function App({
  shift,
  start,
  end,
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
}) {

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
      <Header start={start} end={end} />
      <Grid
        start={start}
        end={end}
        shift={shift}
        cache={cache}
      >
      </Grid>
      <Slider start={start} end={end} updateView={updateView} />
      <div className="fabs">{fabs}</div>
    </div>
  );
}

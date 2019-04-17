import React from 'react';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';
import './main.css';

render((
  <React.Fragment>
    <CssBaseline />
    <App />
  </React.Fragment>
) , document.getElementById('app'));

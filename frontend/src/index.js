import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import CardGrid from './cardGrid.js';
import BoardGrid from './boardGrid.js';
import './index.css';

import {Provider} from 'react-redux';

import store from './config/store';

var createReactClass = require('create-react-class');
var MainPage = createReactClass({
  render: function() {
    return(
        <MuiThemeProvider style={{backgroundColor:"#f3f3f3"}}>
      
      <Router history={browserHistory}>
        <Route path="/board/:id/:boardname" component={CardGrid}/>
        <Route path="/boards" component={BoardGrid}/>
        <Route path="*" component={BoardGrid}/>
      </Router>
    </MuiThemeProvider>
  );
  }
});

ReactDOM.render(<MainPage />,
  document.getElementById('root')
);

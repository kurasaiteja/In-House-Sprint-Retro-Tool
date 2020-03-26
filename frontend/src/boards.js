import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { browserHistory } from 'react-router'

const styles = {
  board: {
    height: "100%",
    width: "30%",
    margin: "1%",
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
    float: 'left',
    wordBreak: 'break-word',
    position: 'relative'
  },
  boardLink: {
    display: 'block',
    height: '100%',
    width: '100%',
    textDecoration: 'none',
  },
  buttonDiv: {
    bottom: '0',
    width: '100%',
    position: 'absolute'
  },
  text: {
    float:'left',
    color:'#555',
    fontFamiy:'Roboto',
    minHeight: '19px',
    paddingTop: '.1em',
    paddingRight: '15px',
    paddingLeft: '.5em',
    fontSize: '13px',
    wordBreak: 'break-word',
    whiteSpace: 'pre-line'
    },
};
var createReactClass = require('create-react-class');
var Board = createReactClass({
  onDelete() {
    var deleteData = {id: this.props.boardId};
    this.serverRequest =
      axios({
          method: 'delete',
          url: 'http://localhost:3001/api/boards',
          data: deleteData
        });
  },
  render: function() {
      const boardUrl = '/board/' + this.props.boardId + '/' + this.props.name;
      return (
        <div style={styles.board}>
            <Paper style={{height: '120px'}} zdepth={2} >
              <div onClick={function(){browserHistory.push(boardUrl)}} style={styles.boardLink}>
                  <h2 style={{fontFamily:'Roboto', fontWeight:'bold', paddingTop:'2%'}}>{this.props.name}</h2>
              </div>
              <div style={styles.buttonDiv}>
                  <h4 style={styles.text}>Created by {this.props.createdby} </h4>
                  <IconButton
                    onClick={this.onDelete}
                    tooltip="Delete Board"
                    tooltipposition="top-center"
                    style={{float: 'right'}}
                    >
                     <DeleteIcon />
                  </IconButton>
              </div>
              </Paper>
            </div>
      );
  }
});

var Boards = createReactClass({
  getInitialState: function() {
    return {boardsData: []};
  },
  loadBoardsFromServer: function() {
    var url = ("http://localhost:3001/api/boards");
    var _this = this;
    this.serverRequest =
      axios
        .get(url)
        .then(function(result) {
          _this.setState({
              boardsData: result.data
            });
      });
  },
  componentDidMount: function() {
    this.loadBoardsFromServer();
    setInterval(this.loadBoardsFromServer, 1000);
  },
  render: function () {
    var boardsMap = this.state.boardsData.map(function(board) {
      return (<Board key={board.id} boardId={board.id} name={board.name} createdby={board.createdby}/>);
    });
    return (
      <div>
        {boardsMap}
      </div>
    );
  }
});

export default Boards;

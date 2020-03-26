import React from 'react';
import CreateCardButton from './createCardButton.js';
import Switch from '@material-ui/core/Switch';
import Cards from './Cards.js';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import HeaderBar from './headerMenu.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {connect} from 'react-redux';
const styles = {
  bodycolor:{
    backgroundColor:'#f3f3f3'
  },
  color1:{
    background:'#009688'
  },
  divWrap: {
    display: 'flex',
    width: '100%',
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: '#f3f3f3'
  },
  divLeft: {
    marginTop:'5%',
    display: 'flex',
    minWidth: '200px',
    marginLeft: '15px',
    marginRight:'20px',
    flexBasis: '0',
    flexDirection: 'column',
    flexGrow: '1'
  },
  divToggle: {
      width: '150px',
      position: 'absolute',
      height: '10px',
      marginTop:'5%',
  }
}

var createReactClass = require('create-react-class');

var CardGrid = createReactClass({
  getInitialState() {
      return { 
        showVotes: true,
        showDialog: true,
        username: '',
      };
    },
    close: function() {
      this.setState({ showDialog: false });
    },
    open() {
        this.setState({ showDialog: true });
      },
     _handleUserNameChange: function(e) {
         this.setState({
          username: e.target.value
        });
        

    },
    handleSubmit: function() {
      if(this.state.username.length >0 ){
    this.close()
  }
  },
   
  render: function() {
    return (
      <div>
      <HeaderBar />
       <Typography>
       <Dialog open={this.state.showDialog} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Enter Your name</DialogTitle>
                  <DialogContent>
                      <TextField
                        margin="dense"
                        id="username"
                        label="User Name"
                        type="text"
                        fullWidth
                        onBlur={this._handleUserNameChange}
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleSubmit} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
       </Dialog>
        <div style={styles.divWrap}>
          <div style={styles.divLeft}>
            <center><h2 style={{color:'#555'}}>Went well</h2></center>
              <br />
              <Cards
                     username={this.state.username}
                     cardColumn={1}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  username={this.state.username}
                  cardColumn={1}
                  boardId={this.props.params.id}/>
          </div>
          <div style={styles.divLeft}>
            <h2 style={{color:'#555'}}><center>To Improve</center></h2>
              <br />
              <Cards 
                     username={this.state.username}
                     cardColumn={2}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  username={this.state.username}
                  cardColumn={2}
                  boardId={this.props.params.id}/>
          </div>
          <div style={styles.divLeft}>
            <h2 style={{color:'#555'}}><center>Action Items</center></h2>
              <br />
              <Cards username={this.state.username}
                     cardColumn={3}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  username={this.state.username}
                  cardColumn={3}
                  boardId={this.props.params.id}/>
          </div>
        </div>
        </Typography>
        </div>
    );
  }
});


export default CardGrid

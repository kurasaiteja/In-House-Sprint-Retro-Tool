import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const styles = {
      container: {
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        bottom: '50px',
        position: 'fixed',
      }
};
var createReactClass = require('create-react-class');
var CreateBoardButton = createReactClass({
    getInitialState() {
      return { showDialog: false,
               name: this.props.name || '',
               createdby: this.props.createdby || ''};
    },
    close: function() {
      this.setState({ showDialog: false });
    },
    open() {
        this.setState({ showDialog: true });
      },
    _handleNameChange: function(e) {
        this.setState({
          name: e.target.value
        });
    },
    _handlecreatedbyChange: function(e) {
        this.setState({
          createdby: e.target.value
        });
    },
  handleSubmit: function() {
    console.log(this.state.name);
    console.log(this.state.createdby);
    var newBoard
    newBoard = { name: this.state.name,
                createdby: this.state.createdby
                 };
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/boards", newBoard)
        .then(function(result) {
            console.log(newBoard)
            });
    this.close()
  },
    render: function() {
        return (
                <div style={ styles.container }>
                  <Fab size="small" color="secondary" aria-label="add" onClick={this.open}>
                    <AddIcon />
                  </Fab>
                  <Dialog open={this.state.showDialog} onClose={this.close} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create a Board</DialogTitle>
                  <DialogContent>
                      <TextField
                        margin="dense"
                        id="name"
                        label="Board Name"
                        type="text"
                        fullWidth
                        onChange={this._handleNameChange}
                      />
                      <TextField
                        margin="dense"
                        id="createdby"
                        label="Created By"
                        type="text"
                        fullWidth
                        onChange={this._handlecreatedbyChange}
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleSubmit} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                  </Dialog>
                </div>
        );
    }
});

export default CreateBoardButton;

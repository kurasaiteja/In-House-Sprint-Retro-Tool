import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


var createReactClass = require('create-react-class');
var NewCardForm = createReactClass({


  getInitialState() {
    return { title: this.props.title || '',
             username: this.props.username || ''
  };
  },
  _handleTitleChange: function(e) {
    this.setState({
        title: e.target.value
    });
  },
  handleChange: function(e) {
    this.setState({
        username: e.target.value
    });
  },
  handleSubmit: function() {
    let anon=false;
    if(this.state.username=='Anonymous'){
        anon=true;
    }
    console.log(anon)
    var newCard
    if (this.props.editCard) {
      newCard = { id: this.props.cardId,
          title: this.state.title, columnid: this.props.cardColumn, createdby: this.props.username, anon:anon};
    } else{
      newCard = { boardid: this.props.boardId, title: this.state.title,
                  columnid: this.props.cardColumn, votes: 0, createdby: this.props.username, anon:anon };
    }
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/cards", newCard)
        .then(function(result) {
            console.log(newCard)
            });
    this.props.closeDialog()
  },
  render: function () {
      return(
        <form>
          <DialogContent>
          <DialogContentText style={{display:'none'}}>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            required
            multiline
            rows="4"
            autoFocus
            margin="dense"
            id="name"
            label="Enter Content"
            type="text"
            onChange={this._handleTitleChange}
            variant="outlined"
            fullWidth
          />
          <br />
          <FormControl variant="outlined" fullWidth style={{marginTop:'10px'}}>
          <InputLabel id="demo-simple-select-outlined-label">User Name</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.username}
          onChange={this.handleChange}
          label="User Name"
        >
          <MenuItem value={'Anonymous'}>Anonymous</MenuItem>
          <MenuItem value={this.props.username}>{this.props.username}</MenuItem>
          </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
          </DialogActions>
        </form>
      );
  }
});

export default NewCardForm;

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import axios from 'axios';
import NewCardForm from './newCardForm.js';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import VoteButton from './voteButton.js';
import {connect} from 'react-redux';

var bgColors = ['red', '#009688', '#e91e63','#9c27b0']

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const styles = {
    card: {
        width:'75%',
        minHeight:'60%',
        wordBreak: 'break-word',
        marginLeft: "5rem",
        marginBottom: '2rem',
        marginRight: '2rem',
        display: "inline-block",
        verticalAlign: "top",
        position: 'relative',
      
    },
    indCard: {
        height: "200px"
    },

    text: {
    color:'white',
    fontFamiy:'Roboto',
    minHeight: '19px',
    paddingTop: '.1em',
    paddingRight: '15px',
    paddingLeft: '.5em',
    fontSize: '13px',
    wordBreak: 'break-word',
    whiteSpace: 'pre-line'
    },
    createdby: {
    float:'right',
    color:'white',
    fontFamiy:'Roboto',
    minHeight: '19px',
    paddingLeft:'4em',
    fontSize: '13px',
    whiteSpace: 'pre-line',
    fontWeight:'bold'
    },

    cardActions: {
        bottom:'0',
        width: '100%'
    },
    voteDiv: {
      float:'left',
        width: '5%',
        margin: '0 auto'
    },
    form: {
        margin: '0 auto',
        width: '30%'
    }
}
var createReactClass = require('create-react-class');

var EPFCard = createReactClass({
  getInitialState() {
    return {   showDialog:false,
               tooltip: "Vote",
               voted:  this.props.voted,
               iconColor: this.props.iconColor,
               cardColumn:this.props.cardColumn,
               uname:this.props.createdby,
               username: this.props.username,
               id:this.props.cardId };
  },
  close: function() {
      this.setState({ showDialog: false });
    },
  closeEdit() {
    this.setState({ showDialog: false });
  },
  openEdit() {
      this.setState({ showDialog: true });
    },
  onDelete() {
    var deleteData = {id: this.props.cardId};
    this.serverRequest =
      axios({
          method: 'delete',
          url: 'http://localhost:3001/api/cards',
          data: deleteData
        });
  },
  toggleVote() {
    if (!this.state.voted) {
        this.setState({tooltip: "Unvote",
                       voted: true,
                       iconColor: "#ffb400"
      });
      this.addremoveVote(true);
    } else {
        this.setState({tooltip: "Vote",
                       voted: false,
                       iconColor: ""
      });
      this.addremoveVote(false);
    }
  },
  addremoveVote(voted) {
    var voteInfo = {cardId: this.props.cardId, voted: voted, username:this.props.username};
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/card/vote", voteInfo)
        .then(function(result) {
            console.log(voteInfo)
            });
  },
  render: function() {

      console.log(this.props.voted)
      const title = (<h3>{this.props.title}</h3>);
      let span;
      if(this.props.anon==false){
        span=<span style={styles.createdby}>{this.state.uname}</span>
      }
      else{
        span=<span></span>
      }
     
      return (
          <Typography>
          <div>
            <Card style={{...styles.card,backgroundColor:bgColors[this.props.cardColumn]}}>
            <CardContent style={styles.text}>{title}</CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    disabled={this.props.disable}
                    tooltip="Edit Card"
                    onClick={this.openEdit}
                    style={{float: 'left'}}
                  >
                    <EditIcon  />
                  </IconButton>
                  <IconButton
                    disabled={this.props.disable}
                    onClick={this.onDelete}
                    tooltip="Delete Card"
                    
                  >
                    <DeleteIcon  />
                  </IconButton>
                 <IconButton
            tooltip={this.state.tooltip}
          onClick={this.toggleVote}
            >
            <SentimentVerySatisfiedIcon style={{ color: this.state.iconColor }} />
            <span style={styles.text}> + {this.props.votes}</span>
          </IconButton>
         {span}
                </CardActions>

          </Card>
          <Dialog
            fullWidth
            contentStyle={styles.form}
            title="Edit Card"
            modal={false}
            open={this.state.showDialog}
            onClose={this.close}
          >
          <DialogTitle id="form-dialog-title">Edit Card</DialogTitle>
          <NewCardForm
              component={'span'}
              style={styles.form}
              title={this.props.title}
              cardId={this.props.cardId}
              editCard={true}
              closeDialog={this.closeEdit}
          />
          </Dialog>
        </div>
        </Typography>
      );
  }
});

export default(EPFCard)

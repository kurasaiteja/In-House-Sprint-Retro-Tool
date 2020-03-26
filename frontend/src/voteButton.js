import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import {connect} from 'react-redux';

var createReactClass = require('create-react-class');

const styles = {
    text: {
    display:'inline',
    color:'white',
    fontFamiy:'Roboto',
    fontSize: '14px',
    fontWeight:'bold'
    }
}


var VoteButton = createReactClass({
  getInitialState() {
      return { tooltip: "Vote",
               voted: false,
               iconColor: "" };
  },
  async toggleVote() {
    if (!this.props.voted) {
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
  async execute(){
            await this.toggleVote();
            this.props.add(this.state.voted);
            this.props.addcolor(this.state.iconColor)
        },
  addremoveVote(voted) {
    var voteInfo = {cardId: this.props.cardId, voted: voted};
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/card/vote", voteInfo)
        .then(function(result) {
            console.log(voteInfo)
            });
  },
  render: function () {
    if (this.props.showVotes) {
      console.log(this.props.votes)
        return(
            <IconButton
            tooltip={this.state.tooltip}
            onClick={this.execute}
            >
            <SentimentVerySatisfiedIcon style={{ color: this.state.iconColor }} />
            <span style={styles.text}> + {this.props.votes}</span>
          </IconButton>
        )
    } else {
        return (
          <IconButton
            tooltip={this.state.tooltip}
            onClick={this.toggleVote}
              >
            <SentimentVerySatisfiedIcon style={{ color: this.state.iconColor }} />
          </IconButton>
        );
    }
  }
});

function mapStateToProps(state, ownProps) {
  return {
    voted: state.voted,
    iconColor:state.iconColor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (voted) => {
      dispatch({type: 'ADD', payload: voted})
    },
    addcolor: (iconColor) => {
      dispatch({type: 'addcolor', payload: iconColor})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteButton)
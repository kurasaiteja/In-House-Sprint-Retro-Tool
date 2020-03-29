import axios from 'axios';
import React from 'react';
import EPFCard from './card.js';
import HeaderBar from './headerMenu.js';
var createReactClass = require('create-react-class');
var Cards = createReactClass({
  sortByNum: function(a, b, order = 'descending') {
    const diff = a.votes - b.votes;

    if (order === 'ascending') {
        return diff;
    }

    return -1 * diff;
  },

  sortByCreatedDate: function(a, b, order = 'descending') {
    const diff = a.timeStamp < b.timeStamp ? -1 : 1

    if (order === 'ascending') {
        return diff;
    }

    return -1 * diff;
  },

  getInitialState: function() {
    return {cardsData: [],
            };
  },
    loadCardsFromServer: function() {
    var url = ("http://localhost:3001/api/cards/?columnid=" + this.props.cardColumn + "&boardid=" + this.props.boardId);
    console.log(url);
    var _this=this;
   this.serverRequest =
      axios
        .get(url)
        .then(function(result) {
          
   console.log(result.data);
          _this.setState({
              cardsData: result.data
            });
      });
  },
  componentDidMount: function() {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, 1000);
  },
  render: function () {
    var sort=this.props.sorted;
    if(sort.length>0){
    if(sort==="date"){
    this.state.cardsData.sort(this.sortByCreatedDate)
    }
    else if(sort==="votes"){
      this.state.cardsData.sort(this.sortByNum)
    }
  }
    var showVotes = this.props.showVotes
    var name=this.props.username
    let voted=false;
    let iconColor="";
    let disable;
      if(name.length>0){
    var cardMap = this.state.cardsData.map(function(card) {
      if(card.createdby===name){
        disable=false
      }
      else{
        disable = true
      }
      if(card.votearray!=null || card.votearray!=undefined){
       voted= Object.values(card.votearray).includes(name);
       console.log(voted)
      }
      else{
        voted=false
      }
      if(voted===true){
        iconColor="#ffb400"
      }
      else{
        iconColor=""
      }
      console.log(voted,iconColor)
      return (<EPFCard
                  cardColumn={card.columnid}
                  key={card.id}
                  cardId={card.id}
                  title={card.title}
                  votes={card.votes}
                  votearray={card.votearray}
                  voted={voted}
                  showVotes={showVotes}
                  createdby={card.createdby}
                  username={name}
                  iconColor={iconColor}
                  disable={disable}
                  anon={card.anon}
                  />);
    });
  }
    return (
      <div>
        {cardMap}
        <div style={{height: '150px'}}></div>
      </div>
    );
  }
});


export default Cards

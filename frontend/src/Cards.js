import axios from 'axios';
import React from 'react';
import EPFCard from './card.js';

var createReactClass = require('create-react-class');

var Cards = createReactClass({
  getInitialState: function() {
    return {cardsData: []};
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
    var showVotes = this.props.showVotes
    var name=this.props.username
    let voted=false;
      let iconColor="";
      if(name.length>0){
    var cardMap = this.state.cardsData.map(function(card) {
      
      if(card.votearray!=null || card.votearray!=undefined){
       voted= Object.values(card.votearray).includes(name);
       console.log(voted)
      }
      else{
        voted=false
      }
      if(voted==true){
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

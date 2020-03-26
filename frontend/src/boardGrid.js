import React from 'react';
import CreateBoardButton from './createBoardButton.js';
import Boards from './boards.js';
import UserProfile from './UserProfile';
import HeaderBar from './headerMenu.js';
const styles = {
  h3: {
      marginTop:'4.8%',
      fontFamily: 'Roboto',
      color: '#283593',
      fontSize: '2em',
      fontWeight: 'bold'

   },

  boardDiv: {
    width: '70%',
    margin: '0 auto',
  }
}
var createReactClass = require('create-react-class');
var BoardGrid = createReactClass({
  
  render: function() {
      return (

          <div styles={{ backgroundColor: '#f3f3f3' }}>
             <HeaderBar />  
              <h1 style={styles.h3}><center>My Boards</center></h1>
              <h1 style={styles.h3}><center>{UserProfile.getName()}</center></h1>
        <div style={styles.boardDiv}>
          <Boards />
        </div>
        <div style={{height: '150px'}}></div>
        <CreateBoardButton />
      </div>
    );
  }
});



export default BoardGrid;

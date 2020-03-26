import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NewCardForm from './newCardForm.js';

const styles = {
      container: {
        textAlign: 'center',
        margin: '0 auto',
        //padding: '20px',
        width: '100%',
        bottom: '5%',
        position: 'sticky',
    },
    form: {
        margin: '0 auto',
        width: '30%'
    }
};
var createReactClass = require('create-react-class');
var CreateCardButton = createReactClass({
    getInitialState() {
      return { showDialog: false };
    },
    close: function() {
      this.setState({ showDialog: false });
    },
    open() {
        this.setState({ showDialog: true });
      },
    render: function() {
        console.log(this.props.cardColumn);
        return (
                <div style={ styles.container }>
                  <Fab size="medium" style={{backgroundColor:'#bbb'}} aria-label="add" onClick={this.open}>
                        <AddIcon />
                  </Fab>
                  <Dialog
                    fullWidth
                    contentStyle={styles.form}
                    title="Create New Card"
                    modal={false}
                    open={this.state.showDialog}
                    onClose={this.close}
                    >
                    <DialogTitle id="form-dialog-title">Create a Card</DialogTitle>
                    <NewCardForm
                        username = {this.props.username}
                        cardColumn={this.props.cardColumn}
                        boardId={this.props.boardId}
                        closeDialog={this.close}
                    />
                  </Dialog>
                </div>
        );
    }
});

export default CreateCardButton;

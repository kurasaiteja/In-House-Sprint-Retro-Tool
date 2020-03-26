import React from 'react';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
class Name extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			voted: false,
			iconColor: ""
		}
		this.execute = this.execute.bind(this);
	}
	async toggleVote() {
    if (!this.props.voted) {
         this.setState({
                       voted: true,
                       iconColor: "#ffb400"
      });
    } else {
        this.setState({
                       voted: false,
                       iconColor: ""
      });
    }
  }
  async execute(){
            await this.toggleVote();
            this.props.add(this.state.voted);
            this.props.addcolor(this.state.iconColor)
        }

	render (){
     return(
      <div>
      <IconButton
            onClick={this.execute}
        >
            <SentimentVerySatisfiedIcon style={{ color: this.props.iconColor }} />
            <span> + {this.props.votes}</span>
          </IconButton>
      <input type="text"
      value={this.state.newItem}
      onChange={this.handleChange}
      >
      </input>
      <button
      onClick={() => {
      	 this.props.add(this.state.newItem)
      	 this.setState({
      	 	newItem:''
      	 })
      }}
      >Add</button>
      <ul>
      {
         	<li>
         	 {this.props.name}
         	 <button
         	 onClick={() => {
                this.props.remove(this.props.name)
            		}
        	  	}
         	 	>X
         	 	</button>
         	</li>
      }
      </ul>
      </div>
	)
 }

}

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

export default connect(mapStateToProps, mapDispatchToProps)(Name)
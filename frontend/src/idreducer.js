const idReducer = (state="", action) => {
	switch(action.type) {		
		case 'addid':
			return state =action.payload
		default: 
		   return state
	}
}

export default idReducer
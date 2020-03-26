const colorReducer = (state="", action) => {
	switch(action.type) {		
		case 'addcolor':
			return state =action.payload
		default: 
		   return state
	}
}

export default colorReducer
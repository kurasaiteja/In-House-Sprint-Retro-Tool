const listReducer = (state=false, action) => {
	switch(action.type) {
		case 'ADD':
		state=action.payload
			return state		
		default: 
		   return state
	}
}

export default listReducer
const unameReducer = (state="", action) => {
	switch(action.type) {
		case 'adduname':
		state=action.payload
			return state		
		default: 
		   return state
	}
}

export default unameReducer
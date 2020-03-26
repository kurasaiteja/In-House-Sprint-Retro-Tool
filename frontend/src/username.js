const usernameReducer = (state="", action) => {
	switch(action.type) {
		case 'addusername':
		state=action.payload
			return state		
		default: 
		   return state
	}
}

export default usernameReducer
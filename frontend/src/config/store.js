import {createStore, combineReducers} from 'redux'
import listReducer from '../reducer'
import colorReducer from '../colorreducrer'
import idReducer from '../idreducer'
import unameReducer from '../unamereducer'
import usernameReducer from '../username'
function saveToLocalStorage(state) {
	try{
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch(e){
		console.log(e);
	}
}

function loadFromLocalStorage(state) {
	try{
		const serializedState = localStorage.getItem('state')
		if(serializedState === null) return undefined
		return JSON.parse(serializedState)
	} catch(e){
		console.log(e)
		return undefined
	}
}

const rootReducer = combineReducers({
	voted:listReducer,
	iconColor:colorReducer,
	cardID:idReducer,
	uname:unameReducer,
	username:usernameReducer
})

const persistedState = loadFromLocalStorage()

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;
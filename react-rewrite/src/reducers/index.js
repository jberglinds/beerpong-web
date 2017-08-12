import { combineReducers } from 'redux'
import game from './game'

const beerpongApp = combineReducers({
	game,
})

export default beerpongApp

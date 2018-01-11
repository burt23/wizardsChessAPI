import { combineReducers } from 'redux';
import updatePlayerNames from './updatePlayerNames.js'
import updateGameMode from './updateGameMode.js'
import updateGameState from './updateGameState.js'
import updatePlayerColor from './updatePlayerColor.js'
import updateMessage from './updateMessage.js'

const rootReducer = combineReducers({
	playerNames: updatePlayerNames,
	gameMode: updateGameMode,
	gameState: updateGameState,
	playerColor: updatePlayerColor,
	message: updateMessage
});

export default rootReducer;
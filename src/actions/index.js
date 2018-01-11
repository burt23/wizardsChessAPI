export const UPDATE_PLAYER_NAMES = "UPDATE_PLAYER_NAMES";

export function updatePlayerNames(names = {white: "Harry", black: "Draco"}) {
	return {
		type: UPDATE_PLAYER_NAMES,
		payload: names
	}
} 

export const UPDATE_GAME_MODE = "UPDATE_GAME_MODE";

export function updateGameMode(mode = "single") {
	return {
		type: UPDATE_GAME_MODE,
		payload: mode
	}
}

export const UPDATE_GAME_STATE = "UPDATE_GAME_STATE";

export function updateGameState(state = {board: null, turn: "white", lastMove: null, turnCount: 1, playing: false}) {
	return {
		type: UPDATE_GAME_STATE,
		payload: state
	}
}

export const UPDATE_PLAYER_COLOR = "UPDATE_PLAYER_COLOR";

export function updatePlayerColor(color = "white") {
	return {
		type: UPDATE_PLAYER_COLOR,
		payload: color
	}
}

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";

export function updateMessage(message) {
	return {
		type: UPDATE_MESSAGE,
		payload: message
	}
}
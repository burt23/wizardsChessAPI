import { UPDATE_GAME_STATE } from '../actions';

const updateGameState = (state = {board: null, turn: "white", lastMove: [], turnCount: 1, playing: false}, action) => {
	switch (action.type) {
		case UPDATE_GAME_STATE:
			return action.payload
		default:
			return state
	}
}

export default updateGameState
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const GameOver = (props) => {
	let winnerColor = props.turn === "white" ? "black" : "white"
	let winner = props.playerNames[winnerColor]
	let displayWinner = function(gameMode) {
		switch (gameMode) {
			case "single":
				return winnerColor === "white" ? "You win!" : winner + " wins!";
			case "local":
				return winner + " wins!";
			case "multi":
				return props.playerColor === winnerColor ? "You win!" : winner + " wins!";
		}
	}
	return (
		<div className="modalOverlay">
			<div className="gameOver">
			  <div className="winner options">
					<h1>
						{displayWinner(props.gameMode)}
					</h1>
				</div>
				<div className="options">
					<button onClick={props.startOver}>

						Play Again?
					</button>
					<Link className="options" to='/home'>
						<button >
							Go back
						</button>
					</Link>
				</div>
			</div>
		</div>
	)

}


GameOver.propTypes = {
	playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
	turn: PropTypes.string.isRequired,
	startOver: PropTypes.func.isRequired,
	playerColor: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
	return {
		playerNames: state.playerNames,
		turn: state.gameState.turn,
		gameMode: state.gameMode,
		playerColor: state.playerColor
	}
}


export default connect(mapStateToProps)(GameOver)
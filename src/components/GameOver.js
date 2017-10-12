import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './GameOver.css';

import PropTypes from 'prop-types';

const GameOver = (props) => {
	let winnerColor = props.turn === "white" ? "black" : "white"
	let winner = props.playerNames[winnerColor]
		console.log("hello", props.turn, winnerColor)
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
		<div className="gameOver">
			<h1>
				{displayWinner(props.gameMode)}
			</h1>
			<div className="options">
				<button onClick={props.startOver}>
					Play Again?
				</button>
				<button>
					<Link to='/home'>Go back</Link>
				</button>
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
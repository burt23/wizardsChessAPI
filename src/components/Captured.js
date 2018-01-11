import React, { Component } from 'react';
import { connect } from 'react-redux';
import images from '../assets/images';

import PropTypes from 'prop-types'

const Captured = (props) => {
	let { capturedWhite, capturedBlack, player } = props

	return player === "black" ?
	(
		<div className="captured">
			<ul className="capturedWhite">
				{capturedWhite && capturedWhite["pawn"].length>0 &&
					capturedWhite["pawn"].map((pawn) => (
						<li className="captured">
							<img src={images.whitepawn}/>
						</li>
					))				
				}
				{capturedWhite && capturedWhite["rook"].length>0 &&
					capturedWhite["rook"].map((rook) => (
						<li className="captured">
							<img src={images.whiterook}/>
						</li>
					))
				}
				{capturedWhite && capturedWhite["knight"].length>0 &&
					capturedWhite["knight"].map((knight) => (
						<li className="captured">
							<img src={images.whiteknight}/>
						</li>
					))			
				}
				{capturedWhite && capturedWhite["bishop"].length>0 &&
					capturedWhite["bishop"].map((bishop) => (
						<li className="captured">
							<img src={images.whitebishop}/>
						</li>
					))					
				}
				{capturedWhite && capturedWhite["queen"].length>0 &&
					capturedWhite["queen"].map((queen) => (
						<li className="captured">
							<img src={images.whitequeen}/>
						</li>
					))				
				}				
			</ul>	
		</div>
	) : (
		<div className="captured">				
			<ul className="capturedBlack">
			{capturedBlack && capturedBlack["pawn"].length>0 &&
				capturedBlack["pawn"].map((pawn) => (
					<li className="captured">
						<img src={images.blackpawn}/>
					</li>
				))
			}
			{capturedBlack && capturedBlack["rook"].length>0 &&
				capturedBlack["rook"].map((rook) => (
					<li className="captured">
						<img src={images.blackrook}/>
					</li>
				))
			}
			{capturedBlack && capturedBlack["knight"].length>0 &&
				capturedBlack["knight"].map((knight) => (
					<li className="captured">
						<img src={images.blackknight}/>
					</li>
				))
			}
			{capturedBlack && capturedBlack["bishop"].length>0 &&
				capturedBlack["bishop"].map((bishop) => (
					<li className="captured">
						<img src={images.blackbishop}/>
					</li>
				))
			}
			{capturedBlack && capturedBlack["queen"].length>0 &&
				capturedBlack["queen"].map((queen) => (
					<li className="captured">
						<img src={images.blackqueen}/>
					</li>
				))
			}
			</ul>
		</div>
	)
}

Captured.propTypes = {
	playerNames: PropTypes.objectOf(PropTypes.string).isRequired,
	turn: PropTypes.string.isRequired,
	capturedBlack: PropTypes.object.isRequired,
	capturedWhite: PropTypes.object.isRequired,
	player: PropTypes.string.isRequired
}

function mapStateToProps(state) {
	return {
		capturedBlack: state.gameState.board.capturedPieces.black,
		capturedWhite: state.gameState.board.capturedPieces.white,
		playerNames: state.playerNames,
		turn: state.gameState.turn
	}
}

export default connect(mapStateToProps)(Captured);
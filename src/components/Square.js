import React, { Component } from 'react';
import images from '../assets/images.js';

import PropTypes from 'prop-types'

class Square extends Component {

	isEqualTo(square) {
		return square.props.pos.x === this.props.pos.x && square.props.pos.y === this.props.pos.y
	}

	render() { 
		var classes = "square " + (this.props.piece ? this.props.piece.color : "");

 		if (this.props.activeSquare) {
			if (this.props.activeSquare.isEqualTo(this)) {
				classes = "square active " + (this.props.piece ? this.props.piece.color : "")
			}
		}

		for (let targetSquare of this.props.targetSquares) {
			if (targetSquare.isEqualTo(this)) {
				classes = "square target " + (this.props.piece ? this.props.piece.color : "")
			}
		}

		for (let attackSquare of this.props.attackSquares) {
			if (attackSquare.isEqualTo(this)) {
				classes = "square attack " + (this.props.piece ? this.props.piece.color : "")
			}
		}
		
		return (
			<div className={classes} onClick={() => this.props.toggle(this)}>
				{this.props.piece &&
					<img 
					src={images[this.props.piece.color + this.props.piece.type]} 
					alt={this.props.piece ? this.props.piece.type : ""}
					height="50" 
					width="50"
					/>
				}

				{classes === "square target " &&
					<div className="greyDiv"></div>
				}
			</div>
		)
	}
}

Square.propTypes = {
	piece: PropTypes.object,
	activeSquare: PropTypes.object,
	toggleActive: PropTypes.func,
	targetSquares: PropTypes.array.isRequired,
	attackSquares: PropTypes.array.isRequired,
	pos: PropTypes.objectOf(PropTypes.number).isRequired
}

export default Square
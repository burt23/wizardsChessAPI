import Vector from './math.js'

class Piece {
	constructor(color) {
		this.color = color;
		this.range = 1
		this.moveset = ["up", "down", "left", "right"]
		this.availableMoves = [];
		this.pos = {
			x: null,
			y: null
		}
		this.hasMoved = false
	}

	calculateMoveset(board) {
		const moveset = []
		for (var i = 0; i<this.moveset.length; i++) {
			for (var j = 0; j<this.range; j++) {
				const move = this.moveset[i];
				
				const movementVector = Piece.moveAsVector(move);
				const positionVector = Vector.add(new Vector(this.pos.x, this.pos.y), Vector.times(movementVector, j))
				const newLocation = Vector.add(positionVector, movementVector)
				if (!Piece.onBoard(newLocation)) {
					break;
				}
				

				if (board.getPieceAtLocation(newLocation.x, newLocation.y)) {
					let piece = board.getPieceAtLocation(newLocation.x, newLocation.y)

					if (piece.color === this.color) {
						break;
					} else {
						moveset.push({
							x: newLocation.x,
							y: newLocation.y
						})
						break;
					}

				} 

				if (Piece.onBoard(newLocation)) {
					moveset.push({
						x: newLocation.x,
						y: newLocation.y
					})
				}
			}
		}
		return moveset
	}

	static onBoard(square) {
		return square.x < 8 && square.x > -1 && square.y < 8 && square.y > -1
	}

	static moveAsVector(direction) {
		switch (direction) {
			case "up":
				return new Vector(0, 1)
			case "down":
				return new Vector(0, -1)
			case "right":
				return new Vector(1, 0);
			case "left":
				return new Vector(-1, 0)
			case "up-right":
				return new Vector(1, 1)
			case "up-left":
				return new Vector(-1, 1)
			case "down-right":
				return new Vector(1, -1)
			case "down-left":
				return new Vector(-1, -1)

			//special pawn moves
			case "double-up":
				return new Vector(0, 2)
			case "double-down":
				return new Vector(0, -2)

			//knight moves
			case "knight-1":
				return new Vector(1, 2)
			case "knight-2":
				return new Vector(2, 1)
			case "knight-3":
				return new Vector(2, -1)
			case "knight-4":
				return new Vector(1, -2)
			case "knight-5":
				return new Vector(-1, -2)
			case "knight-6":
				return new Vector(-2, -1)
			case "knight-7":
				return new Vector(-2, 1)
			case "knight-8":
				return new Vector(-1, 2)
			default:
				return false
		}
	}
}

class Pawn extends Piece {
	constructor(color) {
		super(color)
		this.type = "pawn";
		this.color === "white" ? 
			this.moveset = ["up", "double-up", "up-right", "up-left"] :
			this.moveset = ["down", "double-down", "down-right", "down-left"]
	}

	calculateMoveset(board) {
		const moveset = [];
		let forwardMove = this.moveset[0]
		let movementVector = Piece.moveAsVector(forwardMove);
		let positionVector = new Vector(this.pos.x, this.pos.y)
		let newLocation = Vector.add(positionVector, movementVector)
		
		if (!board.getPieceAtLocation(newLocation.x, newLocation.y) && Piece.onBoard(newLocation)) {
			moveset.push({
				x: newLocation.x, 
				y: newLocation.y
			})
		}

		if (!this.hasMoved) {
			let doubleMove = this.moveset[1]
			let movementVector = Piece.moveAsVector(doubleMove);
			let positionVector = new Vector(this.pos.x, this.pos.y)
			let newLocation = Vector.add(positionVector, movementVector)

			if (!board.getPieceAtLocation(newLocation.x, newLocation.y) && Piece.onBoard(newLocation)) {
				moveset.push({
					x: newLocation.x, 
					y: newLocation.y
				})
			}
		}
			
		for (var i = 2; i<4; i++) {
			let diagonalMove = this.moveset[i];
			let movementVector = Piece.moveAsVector(diagonalMove);
			let newLocation = Vector.add(positionVector, movementVector)
			if (board.getPieceAtLocation(newLocation.x, newLocation.y) && Piece.onBoard(newLocation)) {
				if (board.getPieceAtLocation(newLocation.x, newLocation.y).color !== this.color) {
					moveset.push({
						x: newLocation.x, 
						y: newLocation.y
					})
				}
			}
		}
		if (moveset.some((ele) => {
			return ele.x < 0 || ele.y < 0 || ele.x > 7 || ele.y > 7
		})) {
			console.log(board, this, moveset)
		}
		return moveset	

	}
}

class Rook extends Piece {
	constructor(color) {
		super(color)
		this.type = "rook";
		this.moveset = ["up", "down", "left", "right"]
		this.range = 8
	}
}

class Knight extends Piece {
	constructor(color) {
		super(color)
		this.type = "knight";
		this.moveset = ["knight-1", "knight-2", "knight-3", "knight-4", "knight-5", "knight-6", "knight-7", "knight-8"]
	}

	calculateMoveset(board) {
		const moveset = []
		for (var i = 0; i<8; i++) {
			const move = this.moveset[i];
			const movementVector = Piece.moveAsVector(move);
			const positionVector = new Vector(this.pos.x, this.pos.y)
			const newLocation = Vector.add(positionVector, movementVector)
			if (board.getPieceAtLocation(newLocation.x, newLocation.y)) {
				let piece = board.getPieceAtLocation(newLocation.x, newLocation.y)
				if (piece.color === this.color) {
					continue
				}
			} 

			if (Piece.onBoard(newLocation)) {
				moveset.push({
					x: newLocation.x,
					y: newLocation.y
				})
			}
		}
		return moveset
	}
}

class Bishop extends Piece {
	constructor(color) {
		super(color)
		this.type = "bishop";
		this.moveset = ["up-right", "up-left", "down-right", "down-left"]
		this.range = 8
	}
}

class Queen extends Piece {
	constructor(color) {
		super(color)
		this.type = "queen";
		this.moveset = ["up-right", "up-left", "down-right", "down-left", "up", "down", "left", "right"]
		this.range = 8
	}
}

class King extends Piece {
	constructor(color) {
		super(color)
		this.type = "king";
		this.moveset = ["up-right", "up-left", "down-right", "down-left", "up", "down", "left", "right"]
		this.range = 1
	}

	calculateMoveset(board) {
		const moveset = []
		for (var i = 0; i<this.moveset.length; i++) {
			for (var j = 0; j<this.range; j++) {
				const move = this.moveset[i];
				
				const movementVector = Piece.moveAsVector(move);
				const positionVector = Vector.add(new Vector(this.pos.x, this.pos.y), Vector.times(movementVector, j))
				const newLocation = Vector.add(positionVector, movementVector)
				if (!Piece.onBoard(newLocation)) {
					break;
				}
				

				if (board.getPieceAtLocation(newLocation.x, newLocation.y)) {
					let piece = board.getPieceAtLocation(newLocation.x, newLocation.y)

					if (piece.color === this.color) {
						break;
					} else {
						moveset.push({
							x: newLocation.x,
							y: newLocation.y
						})
						break;
					}

				} 

				if (Piece.onBoard(newLocation)) {
					moveset.push({
						x: newLocation.x,
						y: newLocation.y
					})
				}
			}
		}

		//handle castle
		//king side
		if (this.canKingSideCastle(board)) {
			let backRowPosition = this.color === "white" ? 0 : 7;
			moveset.push({
				x: 6,
				y: backRowPosition
			})
		}

		//queen side
		if (this.canQueenSideCastle(board)) {
			let backRowPosition = this.color === "white" ? 0 : 7;
			moveset.push({
				x: 2,
				y: backRowPosition
			})
		}
		return moveset
	}

	canKingSideCastle(board) {
		if (!this.hasMoved) {
			let backRowPosition = this.color === "white" ? 0 : 7;
			let rookPosition = { x: 7, y: backRowPosition }
			let rook = board.getPieceAtLocation(rookPosition.x, rookPosition.y)
			if (rook) {
				if (!rook.hasMoved) {
					let bishopPosition = { x: 5, y: backRowPosition }
					let knightPosition = { x: 6, y: backRowPosition }
					if (!board.getPieceAtLocation(bishopPosition.x, bishopPosition.y) &&
							!board.getPieceAtLocation(knightPosition.x, knightPosition.y)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	canQueenSideCastle(board) {
		if (!this.hasMoved) {
			let backRowPosition = this.color === "white" ? 0 : 7;
			let rookPosition = { x: 0, y: backRowPosition }
			let rook = board.getPieceAtLocation(rookPosition.x, rookPosition.y)
			if (rook) {
				if (!rook.hasMoved) {
					let queenPosition = { x: 3, y: backRowPosition }
					let bishopPosition = { x: 2, y: backRowPosition }
					let knightPosition = { x: 1, y: backRowPosition }
					if (!board.getPieceAtLocation(queenPosition.x, queenPosition.y) &&
							!board.getPieceAtLocation(bishopPosition.x, bishopPosition.y) &&
							!board.getPieceAtLocation(knightPosition.x, knightPosition.y)) {
						return true;
					}
				}
			}
		}
		return false;
	}

}

function makePiece(type, color) {
	switch (type) {
		case "pawn": 
			return new Pawn(color)
		case "rook": 
			return new Rook(color)
		case "queen":
			return new Queen(color)
		case "king":
			return new King(color)
		case "knight":
			return new Knight(color)
		case "bishop":
			return new Bishop(color)

		//cop out
		default: return false
	}
}

export default {
	Piece: Piece,
	Pawn: Pawn,
	makePiece: makePiece
}
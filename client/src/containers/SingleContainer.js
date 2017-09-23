import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Paper from '../components/paperCard.js';
import RaisedButton from 'material-ui/RaisedButton'; 

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import chessBoard from '../classes/board.js'

import PropTypes from 'prop-types'

class SingleContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	white: "Harry",
	  	black: "Draco",
	  	redirect: false, 
	  	difficulty: 5,
	  	welcomeText: 'Test your skills against the computer! Customize player names and AI difficulty below. Press start to begin.'
	  }
	  //bind functions
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleDifficulty = this.handleDifficulty.bind(this);
	}

  handleDifficulty(e, sign){
  	let diff = sign === '+' ? this.state.difficulty + 1 : this.state.difficulty - 1;

  	this.setState({
  		difficulty: diff 
  	})
  }

	handleChange(e, color) {
		switch (color) {
			case "black":
				this.setState({
					black: e.target.value
				})
				break;
			case "white":
				this.setState({
					white: e.target.value
				})
				break;
			default:
				break;
		}	
	}

	handleSubmit(e) {
		e.preventDefault()
		const names = {
	        white: this.state.white,
	        black: this.state.black
	      };

	 	this.props.actions.updatePlayerNames(names);
		this.props.actions.updateGameMode("single");

		let board = new chessBoard();
		board.init();
		this.props.actions.updateGameState({
			board: board,
			turn: "white",
			turnCount: 1,
			lastMove: null,
			playing: true
		})

	}

	render(){
	  return(
	  	<div>
		  	<div className="App-header">
		  	  <Link to='/'>
			  	  <h2>Wizards Chess</h2>
				  </Link>
		  	</div>

		  	<form 
		  	  onSubmit={this.handleSubmit}
		  	  className='formFlexbox'
		  	>
		  	  <Paper
		  	    className='formFlexitem'
		  	    gameMode={this.state.gameMode}
		  	    welcomeText={this.state.welcomeText}
		  	  />
		  	  <Paper
		  	    value={this.state.white}
		  	    player='1'
		  	    className='inputName'
		  	    className='formFlexitem'
		  	    handleChange={this.handleChange}
		  	    color='white'
		  	  />
		  	  <Paper 
		  	    value={this.state.black}
		  	    player='2'
		  	    className='formFlexitem'
		  	    className='inputName'
		  	    handleChange={this.handleChange}
		  	    difficulty={this.state.difficulty}
		  	    handleDifficulty={this.handleDifficulty}
		  	    color='black'
  	  	  />
			  	<RaisedButton
			  	  label='Start Game' 
			  	  type='submit'
		  	    className='formFlexitem'
			  	/>
	   	  </form>
	    
		    {this.props.playing &&
		    	<Redirect to="/game" />
		    }
	   </div>
	  )
	}
}

SingleContainer.propTypes = {
	updatePlayerNames: PropTypes.func.isRequired,
	updateGameMode: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		playing: state.gameState.playing
	}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleContainer));

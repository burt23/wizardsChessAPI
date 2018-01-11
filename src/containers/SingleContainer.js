import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Paper from '../components/paperCard.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import chessBoard from '../classes/board.js'

import PropTypes from 'prop-types'

class SingleContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      white: 'Harry',
      black: 'Draco',
      difficulty: 5,
      welcomeText: 'Test your skills in Single Player Mode!',
      helperText: 'Customize player names and AI difficulty below. Press start game below to commense!'
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
    if(e.target.value === '') {
      // if color is black then set state for black to draco 
      if (color === 'black'){
        this.setState({
          white: 'Harry'
        }) 
      } else {
        // if color is white then set state for white to harry 
        this.setState({
          black: 'Draco'
        })
      }
      // escape
      return
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(e)
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
  const style = {
    background: 'red'
  };
    return(
      <div className="singleContainer">
        <div className="startGameHeader">
          <Link to='/'>
            <h1 className="App-header">Wizards Chess</h1>
          </Link>
        </div>

        <form 
          onSubmit={this.handleSubmit}
          className='formFlexbox'
        >
        <hr />
          <Paper
            style={{backgroundColor: 'red !important'}}
            gameMode={this.state.gameMode}
            welcomeText={this.state.welcomeText}
            helperText={this.state.helperText}
          />
          <Paper
            value={this.state.white}
            player='1'
            className='inputName'
            handleChange={this.handleChange}
            color='white'
            style={style}
            className='formFlexitem'

          />
          <Paper 
            value={this.state.black}
            player='2'
            className='inputName'
            handleChange={this.handleChange}
            difficulty={this.state.difficulty}
            handleDifficulty={this.handleDifficulty}
            color='black'
          />
          <input
            type='submit'
            value='Start Game'
             
            className='formFlexitem formFlexButton'
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
  playing: PropTypes.bool.isRequired
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

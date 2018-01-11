import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Paper from '../components/paperCard.js';
import chessBoard from '../classes/board.js'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import PropTypes from 'prop-types'

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      white: "Harry",
      black: "Draco",
      welcomeText: 'Challenge a friend to a 1v1 dual on your local device!',
      helperText: 'Play chess like wizards! Use voice commands to control your pieces on the board and to dominate your opponent! Customize player names below and press start to begin.'
    }
    //bind functions 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    switch (color) {
      case "black":
        this.setState({
          black: e.target.value ? e.target.value : ''
        })
        break;
      case "white":
        this.setState({
          white: e.target.value ? e.target.value : ''
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
    this.props.actions.updateGameMode("local");
    let board = new chessBoard();
    board.init();

    this.props.actions.updateGameState({
      board,
      turn: "white",
      turnCount: 1,
      lastMove: null,
      playing: true
    })
  }

  render(){
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

LocalContainer.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocalContainer));

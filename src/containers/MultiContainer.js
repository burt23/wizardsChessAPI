import React, { Component } from 'react';
import MultiplayerHeader from '../components/multiplayerHeader.js';

class MultiContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	roomName: "Create Room"
	  }
	  //bind functions
	  this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e, color) {
		console.log(e.target.value, color)
		this.setState({
			roomName: e.target.value
		})
	}
	render(){
	  return(
	  	<div>
	  	  <div className="App-header">
	  	    <h2>Wizards Chess</h2>
	  	  </div>
	      <h1>Multi Player</h1>
	      <MultiplayerHeader
	        type='Host'
	        value={this.state.roomName}
	        message='Create a gameroom and challenge opponents in public and private matches'
	        handleChange={this.handleChange}
	      />
	      <MultiplayerHeader
	        type='Join'
	        value='Enter Room'
	        message='Join a currently open gameroom to challenge or observe'
	      />
	    </div>
	  )
	}
}

export default MultiContainer;

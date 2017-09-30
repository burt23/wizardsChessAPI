// import React from 'react';
// import { Paper, TextField } from 'material-ui/Paper';

// const style = {
// 	height: 100,
// 	  width: 100,
// 	  margin: 20,
// 	  textAlign: 'center',
// 	  display: 'inline-block',
// }

// const paperCard = () => (
//   <div>
// 	  <Paper style={style} zDepth={5} />
//   </div>
// )
  
// export default paperCard;


import React from 'react';
import TextField from 'material-ui/TextField'

const style = {
  width: '100vh',
  height: '100%',
  textAlign: 'center',
  display: 'inline-block'
};

const paperCard = (props) => (
  <div className='formFlexitem'>
      {props.welcomeText && 
      	<div>
	      	<h2>
	      	  {props.welcomeText}
	      	</h2>
	      	<h5>
	      	  {props.helperText}
	      	</h5>

	      </div>
      }
      {props.value &&
      	<div className='formFlexitem'>
	        <h4> Enter name for {props.color} </h4> 
	      	<TextField
	          hintText={props.value}
	          floatingLabelText={`Player ${props.player}`}
	          onChange={(e)=> {props.handleChange(e, `${props.color}`)}}
	        />
	        {props.difficulty &&
	        	<div className='formFlexitem'>
	        	<span>ai difficulty: {props.difficulty}
	        	<span onClick={(e) => {props.handleDifficulty(e, '+')}}>+</span>
	        	<span onClick={(e) => props.handleDifficulty(e, '-')}>-</span>

	        	</span>
	        	</div>
	        }
	      </div>
      }
  </div>
);

export default paperCard;
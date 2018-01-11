import React from 'react';
import TextField from 'material-ui/TextField'

const style = {
  textAlign: 'center',
  display: 'inline-block',
  fontSize: '2em'
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
        <h4> Enter name for {props.color}</h4> 
        <TextField
          hintText={props.value}
          style={style}
          floatingLabelText={`Player ${props.player}`}
          onChange={(e) => {props.handleChange(e, `${props.color}`)}}
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

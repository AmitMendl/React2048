import React from 'react';
import {newMatrix, useInput, tileMatrix } from './GridController'
import './Grid.css'
      
const Grid = (props) => {

  const width   = React.useState(props.width)[0];
  const height  = React.useState(props.height)[0];

  const [score, setScore]   = React.useState(0)
  const [Matrix, setMatrix] = React.useState(newMatrix(width, height));
  
  useInput(Matrix, setMatrix, score, setScore);

  return (
    <div className='Container'>
      <div className='GameHeader'>
        <button className='button Reset' onClick={() => setMatrix(newMatrix(width, height))}>
            RESET
        </button>
        <div className='Score'>
          {score}
        </div>
      </div>
      <div>
        <div className='GameContainer'>
          <div className='Gridcontainer'>
            {tileMatrix(Matrix, width, height)}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Grid
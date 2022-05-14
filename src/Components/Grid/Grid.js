import React, { useEffect } from 'react';
import {initMatrix, generateNewTile, generateTileMatrix, useInput } from './GridController'
import './Grid.css'
      
const Grid = (props) => {

  const width   = React.useState(props.width)[0];
  const height  = React.useState(props.height)[0];

  const [score, setScore]   = React.useState(0)
  const [Matrix, setMatrix] = React.useState(generateNewTile(generateNewTile(initMatrix(width, height))));
  
  useInput(Matrix, setMatrix, score, setScore);

  return (
    <>
      <button className='Reset' onClick={() => setMatrix(generateNewTile(generateNewTile(initMatrix(width, height))))}>
        RESET
      </button>
      <div className='Score'>
        {score}
      </div>
      <div>
        <div className='Container'>
          <div className='Gridcontainer'>
            {generateTileMatrix(Matrix, width, height)}
          </div>
        </div>
      </div>
    </>
  );
}


export default Grid
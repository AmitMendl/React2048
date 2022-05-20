import React from 'react';
import {newMatrix, useInput, tileMatrix } from './GridController'
import './Grid.css'
import './SizeSelect.css'
      
const Grid = (props) => {

  const width   = React.useState(props.width)[0];
  const height  = React.useState(props.height)[0];

  const [score, setScore]   = React.useState(0)
  const [Matrix, setMatrix] = React.useState(newMatrix(width, height));
  
  useInput(Matrix, setMatrix, score, setScore);

  const Reset = () => { //Reset Button
    return (
      <button className='Reset' onClick={() => {setMatrix(newMatrix(width, height));setScore(0);}}>
        RESET
      </button>)
  }

  const Score = () => {
    return (
    <div className='Score'>
      <div className='ScoreText'>
        {score}
      </div>
    </div>
    )
  }

  return (
    <div className='Container'>
      <div className='GameHeader'>
        <Reset/>
        <Score/>
        <div className='SizeHeader'>
          <select>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
          <select>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
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
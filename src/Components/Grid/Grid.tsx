import React from 'react';
import { newMatrix, useInput, tileMatrix } from './GridController'
import './Grid.css'
import './SizeSelect.css'

type props = {
    width: number,
    height: number,
}
    
const Grid = ({width, height}: props) => {

    const [score, setScore]   = React.useState(0)
    const [Matrix, setMatrix] = React.useState(newMatrix(width, height));
  
    useInput(Matrix, setMatrix, score, setScore);

    const Reset = () => {     //  Reset Button
        return (
        <button className='Reset' onClick={() => {setMatrix(newMatrix(width, height)); setScore(0);}}>
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
            </div>
            <div>
                <div className='GameContainer'>
                <div className='Gridcontainer'>
                    {tileMatrix(Matrix)}
                </div>
                </div>
            </div>
        </div>
    );
}


export default Grid
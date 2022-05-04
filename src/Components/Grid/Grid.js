import React, { useState, useEffect } from 'react';
import {initMatrix, generateNewTile, up, down, right, left } from './GridController'
import Tile, {tileWidth, tileMargin} from '../Tile/Tile'
import useKeyPress from '../useKeyPress';
import './Grid.css'

function rowWidth(width) {
    return width * (tileWidth + tileMargin) + tileMargin
}

function generateTileMatrix(tiles_m) {

  const [width, height] = [tiles_m[0].length, tiles_m.length]

  return (
    new Array(height).fill(null).map(
      (val, y) => 
      <div style={{'width': `${rowWidth(width)}`}} className='Gridrow'>
          {new Array(width).fill(null).map(
            (val, x) => <Tile value={tiles_m[y][x]}/>
            )}
      </div>
    )
  )
}
      
function Grid(props) {

  const width   = useState(props.width)[0];
  const height  = useState(props.height)[0];
  const [tiles_m, setMatrix] = useState(generateNewTile(initMatrix(width, height)));

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowRightPressed = useKeyPress("ArrowRight");
  const arrowLeftPressed = useKeyPress("ArrowLeft");

  useEffect(() => {
    if (arrowUpPressed) {
      setMatrix(generateNewTile(up(tiles_m)))
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      setMatrix(generateNewTile(down(tiles_m)))
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (arrowRightPressed) {
      setMatrix(generateNewTile(right(tiles_m)))
    }
  }, [arrowRightPressed]);

  useEffect(() => {
    if (arrowLeftPressed) {
      setMatrix(generateNewTile(left(tiles_m)))
    }
  }, [arrowLeftPressed]);

  return (
    <div onKeyDown={(e) => console.log(e.key)}>
      <div className='Container'>
        <div className='Gridcontainer'>
          {generateTileMatrix(tiles_m, width, height)}
        </div>
      </div>
    </div>
  );
}


export default Grid
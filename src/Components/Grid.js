import {initMatrix, generateNewTile} from './GridController'
import React, { useState } from 'react';
import Tile from './Tile'
import './Grid.css'

const tileWidth = 100;
const tileHeight = 100;
const tileMargin = 7.5;

function rowWidth(width) {
    return width * (tileWidth + tileMargin) + tileMargin
}

function generateTileMatrix(tiles_m) {

  const [width, height] = [tiles_m[0].length, tiles_m.length]

  return (
    new Array(height).fill(null).map(
      (val, y) => 
      <div style={{'width': `${rowWidth(width)}`}} className='Gridrow'>
          {new Array(width).fill(null).map((val, x) => <Tile value={tiles_m[y][x]}/>)}
      </div>
    )
  )
}
      
function Grid(props) {

  const width   = useState(props.width)[0];
  const height  = useState(props.height)[0];
  const tiles_m = useState(generateNewTile(initMatrix(width, height)))[0];

  return (
    <div className='Container'>
      <div className='Gridcontainer'>
        {generateTileMatrix(tiles_m, width, height)}
      </div>
    </div>
  );
}


export default Grid
import React, { useState } from 'react';
import {initMatrix, generateNewTile, slideLeft } from './GridController'
import Tile, {tileWidth, tileMargin} from '../Tile/Tile'
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
          {new Array(width).fill(null).map((val, x) => <Tile 
            value={tiles_m[y][x]} 
            />
          )}
      </div>
    )
  )
}
      
function Grid(props) {

  const width   = useState(props.width)[0];
  const height  = useState(props.height)[0];
  const [tiles_m, setMatrix] = useState(generateNewTile(initMatrix(width, height)));

  return (
    <div>
      <button onClick={() => setMatrix(generateNewTile(slideLeft(tiles_m)))}>
        slide left!
      </button>
      <div className='Container'>
        <div className='Gridcontainer'>
          {generateTileMatrix(tiles_m, width, height)}
        </div>
      </div>
    </div>
  );
}


export default Grid
import React from 'react';
import './Grid.css'
import './Tiles.css'
import Tile from './Tile'

function getRandomPos(max_width, max_height) {
  return [Math.floor(Math.random() * max_width), Math.floor(Math.random() * max_height)];
}

function getNewValue() {
  return (Math.random() < 0.9 ? 2 : 4)
}

class Grid extends React.Component {
  
  GenerateNewTile() {

    let [x, y] = [null, null];
    
    for(let i = 0; i < 10; i++) {
      [x, y] = getRandomPos(this.width, this.height)
      console.log(this.state.tiles_m[x][y])
      if (this.state.tiles_m[x][y] != null) { break }
    }
    
    this.state.tiles_m[x][y] = getNewValue()
  }
  
  constructor(props) {

    super(props);
    this.width = props.width;
    this.height = props.height;

    // generate tile matrix state 
    let tiles_m = []
    for(let i = 0; i < this.height; i++) {
      let tiles_row = []
      for(let j = 0; j < this.width; j++) {
        tiles_row.push(null)
      }
      tiles_m.push(tiles_row)
    }

    this.state = {
      'tiles_m': tiles_m
    }

    // generate starting tiles 
    this.GenerateNewTile()
  }
      
  render() {

    // create tile rows dynamically
    let rows = []
    for (let x = 0; x < this.height; x++){
      let tiles = []

      // create tile row content dynamically 
      for (let y = 0; y < this.width; y++) {
        tiles.push(
          <Tile id={`tile-${x}-${y}`} value={this.state.tiles_m[x][y]}/>
        )
      }
      rows.push(
        <div className='Gridrow' style={{'width': `${this.width * 107.5 + 7.5 }px`}}>
          {tiles}
        </div>
      )
    }

    return (
      <div className='Gridcontainer'>
        {rows}
      </div>
    );
  }
}

export default Grid
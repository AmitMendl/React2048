import React from 'react';
import './Grid.css'
import './Tiles.css'
import Tile from './Tile'

function Randint(num) {
  return Math.floor(Math.random() * num);
}

function getNewValue() {
  return (Math.random() < 0.9 ? 2 : 4)
}

class Grid extends React.Component {
  
  GenerateNewTile() { // doesn't work when x > y ???
    
    let [x, y] = [Randint(this.width), Randint(this.height)]
    this.state.tiles_m[y][x] = getNewValue()
  }
  
  constructor(props) {

    super(props);
    this.width = props.width;
    this.height = props.height;

    let tiles_m = []
    for (let x = 0; x < this.height; x++){
      let tiles_r = []

      // create tile row content dynamically 
      for (let y = 0; y < this.width; y++) {
        tiles_r.push(null)
      }
      tiles_m.push(tiles_r)
    }

    this.state = {
      'tiles_m': tiles_m
    }

    // generate starting tiles 
    this.GenerateNewTile()
  }
      
  render() {

    // console.log(this.state.tiles_m)

    // create tile rows dynamically
    let rows = []
    for (let y = 0; y < this.height; y++){
      let tiles = []

      // create tile row content dynamically 
      for (let x = 0; x < this.width; x++) {
        tiles.push(
          <Tile id={`tile-${x}-${y}`} value={this.state.tiles_m[y][x]}/>
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
import { animated, useSpring } from 'react-spring';
import React from 'react';
import './Tiles.css'


const tileWidth = 100;
const tileHeight = 100;
const tileMargin = 7.5;
const defaultFontSize = 50;

// const getColor = (val) => {
  //   if(val == Infinity) return '#456'
  //   return `rgb(${64 + val / 6 * 128}, ${32 + val / 6 * 128}, 0)`;
  // }
  
  const getFontSize = (text) => `${Math.min(defaultFontSize, 150 / text.length)}px`
  
  function Tile(props) {
    
    function move(xdiff, ydiff) {

      if (props.value == null) return {};
    
      const [ MoveX, MoveY ] = [ props.MoveX, props.MoveY ]
      if (MoveX != null || MoveY != null) return {};
    
      return ({
        from: { x: xdiff * (tileWidth + tileMargin), y: ydiff * (tileHeight + tileMargin) },
        to: { x: -tileMargin, y: 0 },
      });
    }
  
  const Move     = useSpring(move(2, 2));
  const fontSize = props.value == null ? 0 : getFontSize(props.value.toString());
  const cssClass = props.value == null ? 'Empty' : 'Tile';
  const TileContent = () => (
    <div className={cssClass} style={Move} >
      <div className='TileText' style={{'fontSize': fontSize}}>
        {props.value}
      </div>
    </div>
  )

  if (props.value != null) return (
    <div className='Empty'>
      <TileContent/>
    </div>
  );

  return <div className='Empty'/>;
}

export default Tile
export {tileWidth, tileMargin}
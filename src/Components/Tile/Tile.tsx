// import { animated, useSpring } from 'react-spring';
// import React, {} from 'react';
import './Tiles.css'
import tile from './TileModal'

type props = {
    tile: tile
}

// const tileHeight = 100;
const tileWidth = 100;
const tileMargin = 7.5;
const defaultFontSize = 50;

// const getColor = (val) => {
  //   if(val == Infinity) return '#456'
  //   return `rgb(${64 + val / 6 * 128}, ${32 + val / 6 * 128}, 0)`;
  // }

// const move = () => {
//   let keyframes =
//     `@-webkit-keyframes move {
//         000% {-webkit-transform:translate(${xdiff * (tileWidth + tileMargin)}px, ${ydiff * (tileHeight + tileMargin)}px)} 
//         100% {-webkit-transform:translate(0px, 0px)}
//     }`;
// }
  
const getFontSize = (text: string) => `${Math.min(defaultFontSize, 150 / text.length)}px`

function Tile({ tile }: props) {
  
  // function move(xdiff, ydiff) {

  //   if (props.value == null) return {};
  
  //   const [ MoveX, MoveY ] = [ props.MoveX, props.MoveY ]
  //   if (MoveX != null || MoveY != null) return {};
  
  //   return ({
  //     from: { x: xdiff * (tileWidth + tileMargin), y: ydiff * (tileHeight + tileMargin) },
  //     to: { x: -tileMargin, y: 0 },
  //   });
  // }

  const value = tile.value;
  const empty = tile.empty;
  const animation = tile.animation;

  // const Move     = useSpring(move(2, 2));
  const fontSize = value == null ? 0 : getFontSize(value.toString());
  const Type = empty ? 'Empty' : 'Tile';

  var animationClass = '';
  if (animation == 'spawn') animationClass = 'TileSpawn'

  const cssClass = `${Type} ${animationClass}`;

  const TileContent = () => (
    <div className={cssClass} style={{'fontSize': fontSize}}>
      {value}
    </div>
  )

  if (!empty) return (
    <div className='Empty'>
      <TileContent/>
    </div>
  );

  return <div className='Empty'/>;
}

export default Tile
export {tileWidth, tileMargin}
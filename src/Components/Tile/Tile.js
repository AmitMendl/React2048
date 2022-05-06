import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import './Tiles.css'

const tileWidth = 100;
const tileHeight = 100;
const tileMargin = 7.5;

function move(xdiff, ydiff) {

  if (xdiff != null || ydiff != null) return null;

  return ({
    from: { x: 0, y: 0 },
    to: { x: xdiff * (tileWidth + tileMargin), y: ydiff * (tileHeight + tileMargin) },
  });

}

const getColor = (val) => {
  if(val == Infinity) return '#456'
  return `rgb(${64 + val / 6 * 128}, ${32 + val / 6 * 128}, 0)`;
}


function Tile(props) {
  // const [ MoveX, MoveY ] = [ props.MoveX, props.MoveY ]
  // const styles = useSpring(move(MoveX, MoveY));
  const cssClass = props.value == null ? 'Empty' : 'Tile';

  return (
  <animated.div className={cssClass}>
    <b>
      {props.value}
    </b>
  </animated.div>
  );
}

export default Tile
export {tileWidth, tileMargin}
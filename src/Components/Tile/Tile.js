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

function Tile(props) {

  const value = useState(props.value)[0]
  // const [ MoveX, MoveY ] = [ props.MoveX, props.MoveY ]
  // const styles = useSpring(move(MoveX, MoveY));

  return (
  <animated.div className=
  {value == null ? 'Empty' : 'Tile'} 
  // style={value != null ? styles : null}
  key={props.key}
  >
    <b>
      {props.value}
    </b>
  </animated.div>
  );
}

export default Tile
export {tileWidth, tileMargin}
import Tile, {tileWidth, tileMargin} from '../Tile/Tile'
import { useState, useEffect } from 'react'

const rotate2DMatrix = (m) => m.map((line, y) => line.map((val, x) => m[x][y]).reverse());
const down  = (m) => rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(m)))));
const right = (m) => rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(m)))));
const up    = (m) => rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(m)))));
const left  = (m) => slide(m);
const stay  = (m) => m

const Randint = (num) => {
    return Math.floor(Math.random() * num);
}

const getNewValue = () => {
    return (Math.random() < 0.9 ? 2 : 4)
}

const rowWidth = (width) => {
    return width * (tileWidth + tileMargin) + tileMargin
}

const initMatrix = (width, height) => {
    return new Array(width).fill(null).map(() => new Array(height).fill(null));
}

function generateNewTile(tiles_m) {
    const [width, height] = [tiles_m[0].length, tiles_m.length]
    let [x, y] = [Randint(width), Randint(height)]
    while(tiles_m[y][x] != null) [x, y] = [Randint(width), Randint(height)]
    tiles_m[y][x] = getNewValue()
    return tiles_m
}

function generateTileMatrix(tiles_m) {
    
    const [width, height] = [tiles_m[0].length, tiles_m.length]
    
    return (
      new Array(height).fill(null).map((val, y) => 
        <div style={{'width': `${rowWidth(width)}`}} className='Gridrow'>
            {new Array(width).fill(null).map((val, x) => <Tile value={tiles_m[y][x]}/>)}
        </div>
      )
      )
    }
    
    function slide(tiles_m) {
        return tiles_m.map((row) => {
        let r = row.filter((val) => {
            return val != null
        })
        const nr = []
        for (let i = 0; i < r.length; i++)
        {
            if(r[i] === r[i+1]){
                nr.push(r[i]*2)
                i++
            }
            else {
                nr.push(r[i])
            }
        }
        while (nr.length < row.length) nr.push(null);
        return nr
    })
}

const useInput = (Matrix, setMatrix) => {

    // const [move, setMove] = useState((m) => m)
    const [move, setMove] = useState(0);
    const funcs = [stay, right, up, left, down];
  
    useEffect(() => {
  
        const downHandler = ({ key }) => {
            switch (key) {
                case 'ArrowRight':
                    // setMove((m) => generateNewTile(right(m)));
                    setMove(1);
                    break;
                case 'ArrowUp':
                    // setMove((m) => generateNewTile(up(m)));
                    setMove(2);
                    break;
                case 'ArrowLeft':
                    // setMove((m) => generateNewTile(left(m)));
                    setMove(3);
                    break;
                case 'ArrowDown':
                    // setMove((m) => generateNewTile(down(m)));
                    setMove(4);
                    break;
                default:
                    // setMove((m) => m)
                    setMove(0)
            }
        }
  
        const upHandler = () => setMove((m) => m);

        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
  
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
            setMove(0)
        };

    }, [move]);

    // console.log(move);
    // return funcs[move];

    useEffect(() => {
        // console.log(compare(funcs[move](Matrix), Matrix))
        if(funcs[move](Matrix) !== Matrix) setMatrix(generateNewTile(funcs[move](Matrix)));
    });
}

export {initMatrix, generateNewTile, rowWidth, generateTileMatrix, useInput };
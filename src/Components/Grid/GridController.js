import Tile, {tileWidth, tileMargin} from '../Tile/Tile'
import { useState, useEffect } from 'react'

const rotate2DMatrix = (m) => m[0].map((line, y) => m.map((val, x) => m[x][y]).reverse());
const down  = (m) => rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(m)))));
const right = (m) => rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(m)))));
const up    = (m) => rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(m)))));
const left  = (m) => slide(m);

const stay  = (m) => m
const newMatrix = (width, height) => generateNewTile(generateNewTile(initMatrix(width, height)))

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

const matrixCompare = (m1, m2) => {
    if (m1.length !== m2.length) return false;
    for (let i = 0; i < m1.length; i++)
        if (m1[i] !== m2[i])
            return false;
    return true; 
}

function generateNewTile(tiles_m) {
    const [width, height] = [tiles_m[0].length, tiles_m.length]
    let [x, y] = [Randint(width), Randint(height)]
    while(tiles_m[y][x] != null) [x, y] = [Randint(width), Randint(height)]
    tiles_m[y][x] = getNewValue()
    return tiles_m
}

function tileMatrix(tiles_m) {
    
    const [width, height] = [tiles_m[0].length, tiles_m.length]
    const style = {'width': `${rowWidth(width)}`}
    
    return (
      new Array(height).fill(null).map((val, y) => 
        <div style={style} className='Gridrow' key={y}>
            {new Array(width).fill(null).map((val, x) => <Tile value={tiles_m[y][x]} key={x}/>)}
        </div>
      )
      )
}
    
function slide(tiles_m) {
    // let s = 0;
    return tiles_m.map((row) => {
        let r = row.filter((val) => {       // remove empty tiles
            return val != null
        })
        const nr = []
        for (let i = 0; i < r.length; i++)  // go ever tiles
        {
            if(r[i] === r[i+1]){            // compress equal tiles
                // s+=r[i]*2;                  // add tiles to score
                nr.push(r[i]*2)
                i++
            }
            else {
                nr.push(r[i])
            }
        }
        while (nr.length < row.length) nr.push(null);
        return nr;
    });
}

const useInput = (Matrix, setMatrix) => {

    const resetMatrix = (tiles_m) => generateNewTile(initMatrix(tiles_m[0].length, tiles_m.length));

    const [move, setMove] = useState(0);
    const funcs = [stay, right, up, left, down, resetMatrix];
  
    useEffect(() => {
  
        const downHandler = ({ key }) => {
            switch (key) {
                case 'ArrowRight':
                    setMove(1);
                    break;
                case 'ArrowUp':
                    setMove(2);
                    break;
                case 'ArrowLeft':
                    setMove(3);
                    break;
                case 'ArrowDown':
                    setMove(4);
                    break;
                case 'r':
                    setMove(5);
                    break;
                default:
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

    useEffect(() => {
        if(!matrixCompare(funcs[move](Matrix), Matrix)) 
            setMatrix(generateNewTile(funcs[move](Matrix)));
    });
}

export {newMatrix, useInput, tileMatrix };
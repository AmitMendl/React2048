import Tile, {tileWidth, tileMargin} from '../Tile/Tile'
import { useState, useEffect } from 'react'

const stay  = (m) => m
const rotate2DMatrix = (m) => m[0].map((line, y) => m.map((val, x) => m[x][y]).reverse());
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
    
const useInput = (Matrix, setMatrix, score, setScore) => {
        
    const reset = (width, height) => {
        setScore(0);
        return initMatrix(width, height);
    }
        
    function slide(tiles_m) {
        let s = score;
        return tiles_m.map((row) => {
            let r = row.filter((val) => {       // remove empty tiles
            return val != null
        })
        const nr = []
        for (let i = 0; i < r.length; i++)  // go ever tiles
        {
            if(r[i] === r[i+1]){            // compress equal tiles
                s+=r[i]*2;                  // add tiles to score
                nr.push(r[i]*2)
                i++
            }
            else {
                nr.push(r[i])
            }
        }
        while (nr.length < row.length) nr.push(null);
        setScore(s);
        return nr;
    });}

    const resetMatrix = (tiles_m) => generateNewTile(reset(tiles_m[0].length, tiles_m.length));
    const down  = (m) => rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(m)))));
    const right = (m) => rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(m)))));
    const up    = (m) => rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(m)))));
    const left  = (m) => slide(m);

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
        if(funcs[move](Matrix) !== Matrix)
            setMatrix(generateNewTile(funcs[move](Matrix)));
    });
}

export {newMatrix, useInput, tileMatrix };
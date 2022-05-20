import Tile, {tileWidth, tileMargin} from '../Tile/Tile'
import { useState, useEffect } from 'react'

const stay  = (m) => m
const rotate2DMatrix = (m) => m[0].map((line, y) => m.map((val, x) => m[x][y]).reverse());
const Randint = (num) => Math.floor(Math.random() * num);
const getNewValue = () => Math.random() < 0.9 ? 2 : 4;
const rowWidth = (width) => width * (tileWidth + tileMargin) + tileMargin;
const initMatrix = (width, height) => new Array(width).fill(null).map(() => new Array(height).fill(null));
const newMatrix = (width, height) => generateNewTile(generateNewTile(initMatrix(width, height)));

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
            {new Array(width).fill(null).map((val, x) => <Tile value={tiles_m[y][x]} key={x*10+y}/>)}
        </div>
      )
    )
}
    
const useInput = (Matrix, setMatrix, score, setScore) => {

    const reset = (width, height) => {
        setScore(5);
        return initMatrix(width, height);
    }
        
    function slide(tiles_m) {
        let s = score;
        return tiles_m.map((row) => {
            let r = row.filter((val) => val != null)    // remove empty tiles
            const nr = []
            for (let x = 0; x < r.length; x++) {        // go ever tiles
                if(r[x] === r[x+1]){                    // compress equal tiles
                    s+=r[x]*2;                          // add tiles to score
                    nr.push(r[x]*2);
                    x++;
                }
                else nr.push(r[x]);
            }
            while (nr.length < row.length) nr.push(null);
            setScore(s);
            return nr;
        });
    }

    const resetMatrix = (tiles_m) => generateNewTile(reset(tiles_m[0].length, tiles_m.length));
    const left  = (m) => slide(m);
    const down  = (m) => rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(m)))));
    const right = (m) => rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(m)))));
    const up    = (m) => rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(m)))));

    const [move, setMove] = useState(5);
    const funcs = [left, down, right, up, resetMatrix, stay];
  
    useEffect(() => {
  
        const downHandler = ({ key }) => {
            switch (key) {
                case 'ArrowLeft':
                    setMove(0);
                    break;
                case 'ArrowDown':
                    setMove(1);
                    break;
                case 'ArrowRight':
                    setMove(2);
                    break;
                case 'ArrowUp':
                    setMove(3);
                    break;
                case 'r':
                    setMove(4);
                    break;
                default:
                    setMove(5)
            }
        }
  
        const upHandler = () => setMove((m) => m);

        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
  
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
            setMove(5)
        };

    }, [move]);

    useEffect(() => {
        if(funcs[move](Matrix) !== Matrix)
            setMatrix(generateNewTile(funcs[move](Matrix)));
    });

}

export { newMatrix, useInput, tileMatrix };
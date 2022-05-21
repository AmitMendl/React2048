import Tile, {tileWidth, tileMargin} from '../Tile/Tile'
import { useState, useEffect } from 'react'
import tile from '../Tile/TileModal'

const stay  = (m: any) => m
const rotate2DMatrix = (m: any[][]) => m[0].map((line, y) => m.map((val, x) => m[x][y]).reverse());
const Randint = (num: number) => Math.floor(Math.random() * num);
const getNewValue = () => Math.random() < 0.9 ? 2 : 4;
const rowWidth = (width: number) => width * (tileWidth + tileMargin) + tileMargin;
const initMatrix = (width: number, height: number) => new Array(width).fill(null).map(() => new Array(height).fill( { value: 0, animation: '', empty: true } ));
const newMatrix = (width: number, height: number) => generateNewTile(generateNewTile(initMatrix(width, height)));

function generateNewTile(tiles_m: tile[][]) {
    const [width, height] = [tiles_m[0].length, tiles_m.length]
    let [x, y] = [Randint(width), Randint(height)]
    while(!tiles_m[y][x].empty) [x, y] = [Randint(width), Randint(height)]
    tiles_m[y][x] = { value: getNewValue(), animation: 'spawn', empty: false };
    return tiles_m
}

function tileMatrix(tiles_m: tile[][]) {
    
    const style = {'width': `${rowWidth(tiles_m[0].length)}`}
    
    return (
        tiles_m.map((row, y) => 
            <div style={style} className='Gridrow' key={y}>
                {row.map((t, x) => <Tile tile={t} key={x*10+y} />)}
            </div>
      )
    )
}
    
const useInput = (Matrix: tile[][], setMatrix: (m: tile[][]) => void, score: number, setScore: (m: number) => void) => {

    const reset = (width: number, height: number) => {
        setScore(5);
        return initMatrix(width, height);
    }
        
    function slide(tiles_m: tile[][]) {
        let s = score;
        return tiles_m.map((row, y) => {
            const nr = []
            for (let x = 0; x < row.length; x++) {                                                      // go ever tiles
                if (row[x].empty) continue;
                let next = 1;
                while(x + next < row.length - 1 && row[x+next].empty) next++;
                if (x+next < row.length && row[x].value === row[x+next].value) {                        // compress equal tiles
                    s+=row[x].value*2;                                                                  // add tiles to score
                    nr.push( { value: row[x].value*2, animation: 'grow', empty: false } );
                    x += next;
                }
                else nr.push( { value: row[x].value, animation: 'move', empty: false } );
            }
            while (nr.length < row.length) nr.push( { value: 0, animation: '', empty: true } );
            setScore(s);
            return nr;
        });
    }

    const resetMatrix = (tiles_m: tile[][]) => generateNewTile(reset(tiles_m[0].length, tiles_m.length));    // add new tile
    const left  = (m: tile[][]) => slide(m);
    const down  = (m: tile[][]) => rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(m)))));
    const right = (m: tile[][]) => rotate2DMatrix(rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(m)))));
    const up    = (m: tile[][]) => rotate2DMatrix(slide(rotate2DMatrix(rotate2DMatrix(rotate2DMatrix(m)))));

    const [move, setMove] = useState(5);
    const funcs = [left, down, right, up, resetMatrix, stay];
  
    useEffect(() => {
  
        const downHandler = ({ key }: any) => {
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
            setMatrix(generateNewTile(funcs[move](Matrix))); // add new tile
    });

}

export { newMatrix, useInput, tileMatrix };
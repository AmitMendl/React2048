
function Randint(num) {
    return Math.floor(Math.random() * num);
}
  
function getNewValue() {
    return (Math.random() < 0.9 ? 2 : 4)
}

function initMatrix(width, height) {
    return new Array(width).fill(null).map(() => new Array(height).fill(null));
}

function generateNewTile(tiles_m) {
    const [width, height] = [tiles_m[0].length, tiles_m.length]
    let [x, y] = [Randint(width), Randint(height)]
    while(tiles_m[y][x] != null) [x, y] = [Randint(width), Randint(height)]
    // const [x, y] = [3, 0]
    tiles_m[y][x] = getNewValue()
    // tiles_m[y][x] = 2
    return tiles_m
}

function slideLeft(tiles_m) {
    return tiles_m.map((row) => {
        let r = row.filter((val) => {
            return val != null
        })
        const nr = new Array()
        for (let i = 0; i < r.length; i++)
        {
            if(r[i] == r[i+1]){
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


export {initMatrix, generateNewTile, slideLeft};
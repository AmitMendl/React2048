
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
    const [x, y] = [Randint(width), Randint(height)]
    tiles_m[y][x] = getNewValue()
    return tiles_m
}


export {initMatrix, generateNewTile};
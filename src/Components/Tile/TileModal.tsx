type tile = {
    value: number,
    animation: string,
    empty: boolean,
}

type move = {
    from: point,
    to: point,
}

type point = {
    x: number,
    y: number,
}

export default tile;
function isValidPosition(state, post) {
    return (post.x >= 0 && post.x < state.length) && (post.y >= 0 && post.y < state.length)
}

function isEmptyCell(state, post) {
    return state[post.y][post.x] === null
}

function copyState(state) {
    let copiedState = []
    for (const row of state) {
        copiedRow = []
        for (const col of row) {
            if (col) {
                copiedRow.push(Object.assign(col))
            } else {
                copiedRow.push(null)
            }
        }
        copiedState.push(copiedRow)
    }
    return copiedState
}

function explorePath(state, objPaths, visited, post) {
    let end_path = true
    moves = [[0, -2], [0, 2], [-2, 0], [2, 0], [-2, -2], [2, -2], [2, 2], [-2, 2]]
    moved = []
    for (const [moveX, moveY] of moves) {
        if (isValidPosition(state, new Position(post.x+moveX, post.y+moveY)) && 
            isEmptyCell(state, new Position(post.x+moveX, post.y+moveY))) {
            if (!isEmptyCell(state, new Position(post.x+moveX/2, post.y+moveY/2))) {
                let isVisited = false
                for (const path of visited) {
                    if (path.isSame(new Position(post.x+moveX, post.y+moveY))) {
                        isVisited = true
                        break
                    }
                }
                if (isVisited) continue
                
                end_path = false
                moved.push(new Position(post.x+moveX, post.y+moveY))
            }
        }
    } 
    if (end_path) {
        objPaths.paths.push(post)
    } else {
        for (const move of moved) {
            objPaths.paths.push(post)
            const copiedState = copyState(state)
            copiedState[move.y][move.x] = copiedState[post.y][post.x]
            copiedState[post.y][post.x] = null  
            explorePath(copiedState, objPaths, [...visited, post], new Position(move.x, move.y))
        }
    }
}

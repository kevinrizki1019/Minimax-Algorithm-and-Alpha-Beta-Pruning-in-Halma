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

function copyPawn(pawn) {
    return new Pawn(new Position(pawn.x, pawn.y), pawn.color)
}

function explorePath(state, depth, objPaths, visited, post) {

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
        return
    } else {
        for (const move of moved) {
            objPaths.paths.push(move)
            const copiedState = copyState(state)
            copiedState[move.y][move.x] = copiedState[post.y][post.x]
            copiedState[post.y][post.x] = null  
            explorePath(copiedState, depth+1, objPaths, [...visited, post], new Position(move.x, move.y))
        }
    }
}

function getValidMovesPawnAt(state, x, y) {
    let validMoves = []
    const moves = [
        new Position(x-1, y),
        new Position(x, y-1),
        new Position(x+1, y),
        new Position(x, y+1),
        new Position(x-1, y-1),
        new Position(x+1, y-1),
        new Position(x+1, y+1),
        new Position(x-1, y+1),
    ]
    for (const move of moves) {
        if (isValidPosition(state, move)) {
            if (isEmptyCell(state, move)) {
                validMoves.push(move)
            }
        }
    }

    let obj = {paths: validMoves}
    explorePath(state, 0, obj, [], new Position(x, y))

    return obj.paths
}

function checkWinner(state, players) {
    const Bsize = state.length

    // Check if player 2 win 
    let game_end = true
    for (let i = 0; i < Bsize/2; i++) {
        for (let j = 0; j < Bsize/2-i; j++) {
            const pawn = state[j][i] 
            if (pawn) {
                if (pawn.color !== players[1].color) {
                    game_end = false
                    break
                }
            } else {
                game_end = false
                break
            }
        }
        if (!game_end) break
    }
    if (game_end) return players[1].color

    // Check if player 1 win
    game_end = true
    const copyBoard = copyState(state)
    for (const row of copyBoard) {
        row.reverse() 
    }
    copyBoard.reverse()
    for (let i = 0; i < Bsize/2; i++) {
        for (let j = 0; j < Bsize/2-i; j++) {
            const pawn = copyBoard[j][i]
            if (pawn) {
                if (pawn.color !== players[0].color) {
                    game_end = false
                    break
                }
            } else {
                game_end = false
                break
            }
        }
        if (!game_end) break
    }
    if (game_end) return players[0].color

    return null
}
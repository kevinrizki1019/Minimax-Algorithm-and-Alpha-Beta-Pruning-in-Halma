const Bsize = 8
const Board = [
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 2, 2, 2],
    [0, 0, 0, 0, 2, 2, 2, 2]
]

const Board_end_1 = [
    [2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 2, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1]
]

const Board_end_2 = [
    [2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 0, 2, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1]
]

const Board_test_generate_children = [
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 2, 0, 2],
    [1, 0, 0, 1, 0, 0, 2, 0],
    [0, 0, 1, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0],
    [0, 1, 0, 2, 0, 2, 0, 0],
    [0, 0, 1, 2, 2, 0, 0, 2]
]

const Board_test_minimax = [
    [0 , 0 , 0],
    [1 , 0 , 0],
    [0 , 2 , 0]
]

function isGameFinished(Board) {
    const Bsize = Board.length
    let game_end = true

    // Check if player 2 win 
    for (let i = 0; i < Bsize/2; i++) {
        for (let j = 0; j < Bsize/2-i; j++) {
            if (Board[i][j] !== 2) {
                game_end = false
                break
            }
        }
        if (!game_end) break
    }

    // Check if player 1 win
    if (!game_end) {
        game_end = true
        const copyBoard = Object.assign(Board)
        for (const row of copyBoard) {
            row.reverse() 
        }
        copyBoard.reverse()
        for (let i = 0; i < Bsize/2; i++) {
            for (let j = 0; j < Bsize/2-i; j++) {
                if (copyBoard[i][j] !== 1) {
                    return false
                }
            }
            if (!game_end) break
        }
    }

    return game_end
}

function generateChildren(state, player) {
    opponent = (player % 2) + 1
    const {x, y} = [0, 0]
    // for any direction with oppenent pawn
    moves = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]
    for (const move of moves) {
        const moveX = x + move[0]
        const moveY = y + move[1]
    } 
}

function isValidPosition(state, x, y) {
    return (x >= 0 && x < 8) && (y >= 0 && y < 8)
}

function isEmptyCell(state, x, y) {
    return (state[y][x] === 0)
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

function explorePath(state, player, objPaths, visited, x, y) {
    const opponent = (player % 2) + 1
    let end_path = true
    moves = [[0, -2], [0, 2], [-2, 0], [2, 0], [-2, -2], [2, -2], [2, 2], [-2, 2]]
    moved = []
    for (const [moveX, moveY] of moves) {
        if (isValidPosition(state, x+moveX, y+moveY) && isEmptyCell(state, x+moveX, y+moveY)) {
            if (!isEmptyCell(state, x+moveX/2, y+moveY/2)) {
                let isVisited = false
                for (const path of visited) {
                    if (arrayEquals(path, [x+moveX, y+moveY])) {
                        isVisited = true
                        break
                    }
                }
                if (isVisited) continue
                
                end_path = false
                moved = [...moved, [x+moveX, y+moveY]]
            }
        }
    } 
    if (end_path) {
        objPaths.paths = [...objPaths.paths, [x, y]]
        return [x, y]
    }
    for (const [moveX, moveY] of moved) {
        const copyState = Object.assign(state)
        copyState[moveY][moveX] = player
        copyState[y][x] = 0
        explorePath(copyState, player, objPaths, [...visited, [x, y]], moveX, moveY)
    }
}

function test() {
    let objPaths = {paths: [], visited: []}
    paths = []
    explorePath(Board_test_generate_children, 2, objPaths, [], 4, 4)
    console.log(objPaths.paths)
}

function generateSinglePawnChildren(state, player, x, y) {

}

function getScore(state, player) {
    return Math.floor(Math.random() * Math.floor(10)) // generate nilai random 1-10
}

function isValidMove(Board, x, y, moveX, moveY) {
    return (moveX >= 0 && moveX < 8) && (moveY >= 0 && moveY < 8) && (Board[moveY][moveX] == 0)
}

function minimax(state, depth, player, isMaximizing, alpha, beta) {
    if (isGameFinished(state) || depth > 100) {
        return getScore(state)
    }

    opponent = (player % 2) + 1
    if (isMaximizing) {
        let bestScore = -Infinity

        // For every pawn of player
        let is_break = false
        for (let y = 0; y < state.length; y++) {
            for (let x = 0; x < state.length; x++) {
                if (state[y][x] === player) {
                    // check for one step to any direction
                    moves = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]
                    for (const move of moves) {
                        const moveX = x + move[0]
                        const moveY = y + move[1]
                        if (isValidMove(state, x, y, moveX, moveY)) {
                            const copyState = Object.assign(state)
                            copyState[moveY][moveX] = player
                            copyState[y][x] = 0
                            score = minimax(copyState, depth+1, opponent, [x, y], false, alpha, beta)
                            bestScore = Math.max(bestScore, score)
                            alpha = Math.max(alpha, bestScore)
                            if (beta <= alpha) {
                                is_break = true
                                break
                            }
                        }
                    }

                    // check for rule 2

                }

                if (is_break) break
            }

            if (is_break) break
        }
        return bestScore
    } else {
        let bestScore = Infinity

        // For every pawn of player
        let is_break = false
        for (let y = 0; y < state.length; y++) {
            for (let x = 0; x < state.length; x++) {
                if (state[y][x] === opponent) {
                    // check one step to any direction
                    console.log(state)
                    moves = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]
                    for (const move of moves) {
                        const moveX = x + move[0]
                        const moveY = y + move[1]
                        if (isValidMove(state, x, y, moveX, moveY)) {
                            const copyState = Object.assign(state)
                            copyState[moveY][moveX] = opponent
                            copyState[y][x] = 0
                            score = minimax(copyState, depth+1, player, [x, y], true, alpha, beta)
                            bestScore = Math.min(bestScore, score)
                            alpha = Math.min(beta, bestScore)
                            if (beta <= alpha) {
                                is_break = true
                                break
                            }
                        }
                    }
                }

                if (is_break) break
            }

            if (is_break) break
        }
        return bestScore
    }
}

function test_minimax() {
    const test = minimax(Board_test_minimax, 0, 2, true, 0, 0)
    console.log(test)
}
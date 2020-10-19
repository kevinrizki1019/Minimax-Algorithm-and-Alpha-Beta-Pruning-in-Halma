class Player {
    constructor(game, color) {
        this.game = game
        this.color = color
    }
}

class Human extends Player {

    constructor(game, color) {
        super(game, color)
        this.resetAction()
    }

    resetAction() {
        this.selectedPawn = null
        this.selectedTarget = null
        this.selectedPawnValidMoves = null
    }

    move() {
        console.log("Human move")
        // do nothing
    }
}

class BotMinimax extends Player {
    constructor(game, color) {
        super(game, color)
    }
    
    move() {
        const game = this.game
        let validMoves = []
        let pawns = []
        let currentPawn = 0
        for (let i = 0; i < game.boardSize; i++) {
            for (let j = 0; j < game.boardSize; j++) {
                const pawn = game.getPawnAt(new Position(i, j))
                if (pawn) {
                    if (pawn.color === game.currentPlayer.color) {
                        pawns.push(pawn)
                    }
                }
            }
        }
        for (let i = 0; i < game.boardSize; i++) {
            for (let j = 0; j < game.boardSize; j++) {
                const pawn = game.getPawnAt(new Position(i, j))
                if (pawn == null) {
                    validMoves.push([i, j])
                }
            }
        }
        const randomPawnNum = Math.floor(Math.random() * pawns.length)
        const randomMoveNum = Math.floor(Math.random() * validMoves.length)
        const selectedPawn = pawns[randomPawnNum]
        const selectedMove = validMoves[randomMoveNum]
        console.log(pawns)
        console.log(validMoves)
        game.movePawnTo(selectedPawn, new Position(selectedMove[0], selectedMove[1]))
        game.changePlayer()
    }

    getScore(state) {
        return Math.floor(Math.random() * 132)
    }

    isGameFinished(state) {

    }

    minimax(state, depth, game, isMaximizing, alpha, beta) {
        if (game.checkWinner(state) || depth > 200) {
            return this.getScore(state)
        }
    
        if (isMaximizing) {
            let bestScore = -Infinity
            let bestMove = null
    
            // For every pawn of player
            let is_break = false
            for (let y = 0; y < state.length; y++) {
                for (let x = 0; x < state.length; x++) {
                    const pawn = game.getPawnAt(new Position(x, y))
                    if (pawn) {
                        if (pawn.color === game.currentPlayer.color) {
                            // check for one step to any direction
                            const moves = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]
                            for (const move of moves) {
                                const movePost = new Position(x + move[0], y + move[1])
                                if (isValidPosition(state, movePost) && isEmptyCell(state, movePost)) {
                                    const copiedState = copyState(state)
                                    copiedState[movePost.y][movePost.x] = pawn
                                    copiedState[y][x] = null
                                    const score = this.minimax(copiedState, depth+1, game, false, alpha, beta)
                                    if (score > bestScore) {
                                        bestScore = score
                                        bestMove = {pawn: pawn, move: movePost}
                                    }
                                    alpha = Math.max(alpha, bestScore)
                                    if (beta <= alpha) {
                                        is_break = true
                                        break
                                    }
                                }
                            }
                    } 
                        // check for rule 2
    
                }
    
                if (is_break) break
            }
    
                if (is_break) break
            }

            if (depth === 0) {
                return bestMove
            } else {
                return bestScore
            }
            
        } else {
            let bestScore = Infinity
    
            // For every pawn of player
            let is_break = false
            for (let y = 0; y < state.length; y++) {
                for (let x = 0; x < state.length; x++) {
                    const pawn = game.getPawnAt(new Position(x, y))
                    if (pawn) {
                        if (pawn.color === game.nextPlayer.color) {
                            // check one step to any direction
                            const moves = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]
                            for (const move of moves) {
                                const movePost = new Position(x + move[0], y + move[1])
                                if (isValidPosition(state, movePost) && isEmptyCell(state, movePost)) {
                                    const copiedState = copyState(state)
                                    copiedState[movePost.y][movePost.x] = pawn
                                    copiedState[y][x] = null
                                    const score = this.minimax(copiedState, depth+1, game, true, alpha, beta)
                                    bestScore = Math.min(bestScore, score)
                                    alpha = Math.min(beta, bestScore)
                                    if (beta <= alpha) {
                                        is_break = true
                                        break
                                    }
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

    move() {
        const game = this.game
        const optimalMove = this.minimax(game.boardMatrix, 0, game, true, 0, 0)
        game.movePawnTo(optimalMove.pawn, optimalMove.move)
        game.changePlayer()
    }
}
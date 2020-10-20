class Player {
    constructor(game, color) {
        this.game = game
        this.color = color
        this.listOfPawns = []
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
        // do nothing
    }
}

class BotMinimax extends Player {
    constructor(game, color) {
        super(game, color)
    }
    
    getScore(state) {
        const game = this.game
        let poin = 0

        if (this.color === 'red') {
            for (let j = 0; j < game.boardSize; j++) {
                for (let i = 0; i < game.boardSize; i++) {
                    const pawn = state[j][i]
                    if (pawn) {
                        if (pawn.color === this.color) {
                            poin += game.redScoreMatrix[j][i]
                        } else if (pawn.color !== null) {
                            poin -= game.greenScoreMatrix[j][i]
                        }
                    }
                }
            }
        } else {
            for (let j = 0; j < game.boardSize; j++) {
                for (let i = 0; i < game.boardSize; i++) {
                    const pawn = state[j][i]
                    if (pawn) {
                        if (pawn.color === this.color) {
                            poin += game.greenScoreMatrix[j][i]
                        } else if (pawn.color !== null) {
                            poin -= game.redScoreMatrix[j][i]
                        }
                    }
                }
            }
        }
        return poin
    }

    minimax(state, depth, game, isMaximizing, alpha, beta) {
        if (depth > 3) {
            return this.getScore(state)
        }
        
        if (isMaximizing) {
            let bestScore = -Infinity
            let bestMove = null
            
            for (const pawn of game.currentPlayer.listOfPawns) {
                const [x, y] = [pawn.post.x, pawn.post.y]
                const moves = getValidMovesPawnAt(state, x, y)
                for (const move of moves) {
                    if (isValidPosition(state, move)) {
                        if (isEmptyCell(state, move)) {
                            const copiedState = copyState(state)
                            copiedState[move.y][move.x] = new Pawn(new Position(move.x, move.y), pawn.color)
                            copiedState[y][x] = null
                            const score = this.minimax(copiedState, depth+1, game, false, alpha, beta)
                            if (score > bestScore) {
                                bestScore = score
                                bestMove = {pawn: pawn, move: move}
                            }
                            alpha = Math.max(alpha, bestScore)
                            
                            if (beta <= alpha) 
                                break
                        }
                    }
                }
            }

            if (depth === 0) {
                return bestMove
            } 
                
            return bestScore
        } else {
            let bestScore = Infinity
            for (const pawn of game.currentPlayer.listOfPawns) {
                const [x, y] = [pawn.post.x, pawn.post.y]
                const moves = getValidMovesPawnAt(state, x, y)
                for (const move of moves) {
                    if (isValidPosition(state, move)) {
                        if (isEmptyCell(state, move)) {
                            const copiedState = copyState(state)
                            copiedState[move.y][move.x] = new Pawn(new Position(move.x, move.y), pawn.color)
                            copiedState[y][x] = null
                            const score = this.minimax(copiedState, depth+1, game, true, alpha, beta)
                            bestScore = Math.min(bestScore, score)
                            beta = Math.min(beta, bestScore)
                            
                            if (beta <= alpha) 
                                break
                        }
                    }
                }
            }
            return bestScore
        }
    }

    move() {
        const game = this.game
        const optimalMove = this.minimax(game.boardMatrix, 0, game, true, -Infinity, Infinity)
        game.movePawnTo(optimalMove.pawn, optimalMove.move)
        setTimeout(game.changePlayer.bind(this.game), 1)
    }
}

class BotMinimaxLocalSearch extends Player {
    constructor(game, color) {
        super(game, color)
    }
    
    getScore(state) {
        const game = this.game
        let poin = 0

        if (this.color === 'red') {
            for (let j = 0; j < game.boardSize; j++) {
                for (let i = 0; i < game.boardSize; i++) {
                    const pawn = state[j][i]
                    if (pawn) {
                        if (pawn.color === this.color) {
                            poin += game.redScoreMatrix[j][i]
                        } else if (pawn.color !== null) {
                            poin -= game.greenScoreMatrix[j][i]
                        }
                    }
                }
            }
        } else {
            for (let j = 0; j < game.boardSize; j++) {
                for (let i = 0; i < game.boardSize; i++) {
                    const pawn = state[j][i]
                    if (pawn) {
                        if (pawn.color === this.color) {
                            poin += game.greenScoreMatrix[j][i]
                        } else if (pawn.color !== null) {
                            poin -= game.redScoreMatrix[j][i]
                        }
                    }
                }
            }
        }
        return poin
    }

    minimax(state, depth, game, isMaximizing, alpha, beta) {
        if (checkWinner(state, game.players) || depth > 4) {
            return this.getScore(state)
        }
        
        if (isMaximizing) {
            let bestScore = -Infinity
            let bestMove = null
            let moveOptions = Infinity
            
            for (const pawn of game.currentPlayer.listOfPawns) {
                
                const [x, y] = [pawn.post.x, pawn.post.y]
                const moves = getValidMovesPawnAt(state, x, y)
                let T = 10
                for (const move of moves) {
                    if (isValidPosition(state, move)) {
                        if (isEmptyCell(state, move)) {
                            const copiedState = copyState(state)
                            copiedState[move.y][move.x] = new Pawn(new Position(move.x, move.y), pawn.color)
                            copiedState[y][x] = null
                            const score = this.minimax(copiedState, depth+1, game, false, alpha, beta)

                            if (T === 0) {
                                break
                            }

                            if (depth === 0) {
                                if (score > bestScore) {
                                    bestScore = score
                                    bestMove = {pawn: pawn, move: move}
                                } else {
                                    const p = Math.exp((score-bestScore)/T)
                                    if (p > Math.random()) {
                                        bestScore = score
                                        bestMove = {pawn: pawn, move: move}
                                    }
                                }
                            } else {
                                bestScore = Math.max(bestScore, score)
                            }

                            alpha = Math.max(alpha, bestScore)
                            
                            if (beta <= alpha) 
                                break

                            T -= 1
                        }
                    }
                }
            }

            if (depth === 0) {
                return bestMove
            } else {
                return bestScore
            }

        } else {
            let bestScore = Infinity
            for (const pawn of game.currentPlayer.listOfPawns) {
                const [x, y] = [pawn.post.x, pawn.post.y]
                const moves = getValidMovesPawnAt(state, x, y)
                for (const move of moves) {
                    if (isValidPosition(state, move)) {
                        if (isEmptyCell(state, move)) {
                            const copiedState = copyState(state)
                            copiedState[move.y][move.x] = new Pawn(new Position(move.x, move.y), pawn.color)
                            copiedState[y][x] = null
                            const score = this.minimax(copiedState, depth+1, game, true, alpha, beta)
                            bestScore = Math.min(bestScore, score)
                            beta = Math.min(beta, bestScore)
                            
                            if (beta <= alpha) 
                                break
                        }
                    }
                }
            }
            return bestScore
        }
    }

    move() {
        const game = this.game
        const optimalMove = this.minimax(game.boardMatrix, 0, game, true, -Infinity, Infinity)
        game.movePawnTo(optimalMove.pawn, optimalMove.move)
        setTimeout(game.changePlayer.bind(this.game), 1)
    }
}
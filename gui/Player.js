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
    
    move() {
        const game = this.game
        console.log("minimax", this.minimax(game.boardMatrix, 0, game, true, -Infinity, Infinity))
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
        game.movePawnTo(selectedPawn, new Position(selectedMove[0], selectedMove[1]))
        game.changePlayer()
    }

    stepNeeded(from, to){
        let disX = to.x-from.x
        let disY = to.y-from.y
        // return Math.abs((disX+disY)-Math.max(disX,disY))
        return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2))
    }
    
    getScore(state){
        const game = this.game
        let poin = 0

        if (this.color === game.players[0].color) {
            for (const pawn of this.listOfPawns) {
                poin -= this.stepNeeded(pawn.post, new Position(state.length-1, state.length-1))
            }
            // for (const pawn of game.players[1].listOfPawns) {
            //     poin += this.stepNeeded(pawn.post, new Position(0, 0))
            // }
            return poin
        } else {
            for (const pawn of this.listOfPawns) {
                poin -= this.stepNeeded(pawn.post, new Position(0, 0))
            }
            // for (const pawn of game.players[0].listOfPawns) {
            //     poin += this.stepNeeded(pawn.post, new Position(state.length-1, state.length-1))
            // }
            return poin
        }
    }

    minimax(state, depth, game, isMaximizing, alpha, beta) {
        if (depth > 3) {
            // console.log(this.getScore(state))
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
                            console.log(state, copiedState)
                            console.log(score)
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
                console.log(bestScore)
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
        console.log(optimalMove)
        game.movePawnTo(optimalMove.pawn, optimalMove.move)
        game.changePlayer()
    }
}
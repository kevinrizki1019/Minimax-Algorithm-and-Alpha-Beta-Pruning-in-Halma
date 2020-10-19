class GameManager {
    constructor(canvas, boardSize) {
        this.canvas = canvas;

        // Board variables
        this.boardSize = boardSize
        this.blockSize = canvas.element.width/boardSize
        this.boardMatrix = []

        // Player variables
        this.players = null
        this.currentPlayer = null
        this.nextPlayer = null
    }

    setup(player1, player2) {

        // Create board
        this.board = new Board(this)
        this.board.draw()

        for (let i = 0; i < this.boardSize; i++) {
            let row = []
            for (let j = 0; j < this.boardSize; j++) {
                row.push(null)
            }
            this.boardMatrix.push(row)
        }

        const size = this.boardSize
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // Posisi bidak Hijau yang ada di pojok kiri atas
                if ((i < size / 2) && (j < size / 2) && (i + j < size / 2)) {
                    this.createPawnAt(new Position(i, j), 'red')
                } 
                // Posisi bidak Merah ada di pojok kanan bawah (perhitungannya masih bisa salah)
                else if ((i >= size / 2) && (j >= size / 2) && (i + j >= (size - 1) + (size / 2))) {
                    this.createPawnAt(new Position(i, j), 'green')
                } 
            }
        }

        // Setup game
        this.players = [player1, player2]
        this.currentPlayer = this.players[0]
        this.nextPlayer = this.players[1]

        // setup interaction for human player
        window.addEventListener('click', (e) => {   
            if (this.currentPlayer instanceof Human) {
                const x = Math.floor(e.clientX/this.blockSize)
                const y = Math.floor(e.clientY/this.blockSize)
            
                let selectedPawn = this.getPawnAt(new Position(x, y)) 
                if (selectedPawn) {
                    if (selectedPawn.color === this.currentPlayer.color)
                    {
                        this.currentPlayer.selectedPawn = selectedPawn
                        this.currentPlayer.selectedPawnValidMoves = this.getValidMovesPawnAt(x, y)
                    }
                } else {
                    if (this.currentPlayer.selectedPawn) {
                        const move = new Position(x, y)
                        let isValidMove = false
                        for (const validMove of this.currentPlayer.selectedPawnValidMoves) {
                            if (move.isSame(validMove)) {
                                this.movePawnTo(this.currentPlayer.selectedPawn, move)
                                this.currentPlayer.resetAction()
                                this.changePlayer()

                                isValidMove = true
                                break
                            }
                        }


                    }
                }
            }
        })
    }

    changePlayer() {
        const temp = this.currentPlayer
        this.currentPlayer = this.nextPlayer
        this.nextPlayer = temp
        this.currentPlayer.move()
    }

    getPawnAt(post) {
        return this.boardMatrix[post.y][post.x]
    }

    createPawnAt(post, color) {
        let newPawn = new Pawn(this, post, color)
        this.boardMatrix[post.y][post.x] = newPawn
        newPawn.draw()
    }

    movePawnTo(pawn, post) {
        this.boardMatrix[post.y][post.x] = pawn
        this.boardMatrix[pawn.post.y][pawn.post.x] = null
        pawn.post = post

        // this.board.update()
    }

    start() {
        this.currentPlayer.move()
    }

    getValidMovesPawnAt(x, y) {
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
            if (isValidPosition(this.boardMatrix, move)) {
                if (isEmptyCell(this.boardMatrix, move)) {
                    validMoves.push(move)
                }
            }
        }

        let obj = {paths: validMoves}
        explorePath(this.boardMatrix, obj, [], new Position(x, y))

        return obj.paths
    }

    checkWinner() {
        const Bsize = this.boardSize
    
        // Check if player 2 win 
        let game_end = true
        for (let i = 0; i < Bsize/2; i++) {
            for (let j = 0; j < Bsize/2-i; j++) {
                const pawn = this.getPawnAt(new Position(i, j)) 
                if (pawn) {
                    if (pawn.color !== this.players[1].color) {
                        game_end = false
                        break
                    }
                }
            }
            if (!game_end) break
        }
        if (game_end) return this.players[1].color
    
        // Check if player 1 win
        game_end = true
        const copyBoard = copyState(this.boardMatrix)
        for (const row of copyBoard) {
            row.reverse() 
        }
        copyBoard.reverse()
        for (let i = 0; i < Bsize/2; i++) {
            for (let j = 0; j < Bsize/2-i; j++) {
                const pawn = copyBoard[i][j]
                if (pawn) {
                    if (pawn.color !== this.players[0].color) {
                        game_end = false
                        break
                    }
                }
            }
        }
        if (game_end) return this.players[0].color

        return null
    }
}

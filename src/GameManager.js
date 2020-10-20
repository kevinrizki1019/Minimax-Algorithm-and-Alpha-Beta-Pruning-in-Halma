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
                    player1.listOfPawns.push(this.getPawnAt(new Position(i, j)))
                } 
                // Posisi bidak Merah ada di pojok kanan bawah (perhitungannya masih bisa salah)
                else if ((i >= size / 2) && (j >= size / 2) && (i + j >= (size - 1) + (size / 2))) {
                    this.createPawnAt(new Position(i, j), 'green')
                    player2.listOfPawns.push(this.getPawnAt(new Position(i, j)))
                } 
            }
        }

        // Setup game
        this.players = [player1, player2]
        this.currentPlayer = this.players[0]
        this.nextPlayer = this.players[1]

        // Create score matrix
        this.greenScoreMatrix = []
        this.redScoreMatrix = []

        let a = 100
        let b = 5
        for (let j = 0; j < game.boardSize; j++) {
            const row = []
            const tmpA = a
            for (let i = 0; i < game.boardSize; i++) {
                row.push(a)
                a -= (b)
            }
            this.greenScoreMatrix.push(row)
            this.redScoreMatrix.push(JSON.parse(JSON.stringify(row)))
            a = tmpA-b
        }
        for (let row of this.redScoreMatrix) {
            row.reverse()
        }
        this.redScoreMatrix.reverse()
        console.log(this.redScoreMatrix, this.greenScoreMatrix)

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
                        this.currentPlayer.selectedPawnValidMoves = getValidMovesPawnAt(this.boardMatrix, x, y)
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

        // if (!(this.currentPlayer instanceof Human)) {
        //     console.log("set timeout")
        //     setTimeout(this.currentPlayer.move, 100)
        // } else {
        //     console.log("its a human")
        //     this.currentPlayer.move()
        // }

        // this.board.update()
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
    }

    start() {
        this.currentPlayer.move()
    }
}

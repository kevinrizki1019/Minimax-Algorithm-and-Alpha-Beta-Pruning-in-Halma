class Canvas {
    constructor(canvasElement) {
        this.element = canvasElement
        this.ctx = canvasElement.getContext('2d');
    }

    setSize(width, height) {
        this.element.width = width 
        this.element.height = height
    }

    createRectangle(x, y, width, height, fill='#000', stroke='#000') {
        this.ctx.fillStyle = fill
        this.ctx.fillRect(x, y, width, height)
        this.ctx.strokeRect(x, y, width, height)
        this.ctx.strokeStyle = stroke
    }

    createLine(x1, y1, x2, y2) {
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }

    createCircle(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, 2 * Math.PI);
        this.ctx.fill();
        this.strokeStyle = '#000'
        this.ctx.stroke()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }
}

class Board {
    constructor(game) {
        this.game = game 
    }

    draw() {
        console.log(this.game.boardMatrix)
        const game = this.game
        const size = game.boardSize
        let color = null
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if ((i < size / 2) && (j < size / 2) && (i + j < size / 2)) {
                    color = 'red'
                } 
                // Posisi bidak Merah ada di pojok kanan bawah (perhitungannya masih bisa salah)
                else if ((i >= size / 2) && (j >= size / 2) && (i + j >= (size - 1) + (size / 2))) {
                    color = 'green'
                } else {
                    color = 'white'
                }
                game.canvas
                    .createRectangle(
                        i * game.blockSize, 
                        j * game.blockSize, 
                        game.blockSize, 
                        game.blockSize,
                        color
                    )
            }
        }
    }

    update() {
        const game = this.game
        game.canvas.clear()
        this.draw()

        for (let i = 0; i < game.boardSize; i++) {
            for (let j = 0; j < game.boardSize; j++) {
                let selectedPawn = game.getPawnAt(j, i)
                if (selectedPawn) {
                    selectedPawn.draw()
                }
            }
        }
    }
}  


class Pawn {
    constructor(game, x, y, color) {
        this.game = game
        this.x = x
        this.y = y
        this.color = color

        if (color === "red") {
            this.img = "M"
        } else {
            this.img = "H"
        }
    }

    draw() {
        let game = this.game
        let fontSize = 30
        game.canvas.ctx.font = fontSize + "px Arial"
        // game.canvas.ctx
        //     .fillText(
        //         this.img, 
        //         this.x * game.blockSize + game.blockSize/2 - fontSize/3,
        //         this.y * game.blockSize + game.blockSize/2 + fontSize/3
        //         )
        let pawnColor = null
        if (this.color === "red") {
            pawnColor = "#822322"
        } else {
            pawnColor = "#085427"
        }
        game.canvas.ctx.fillStyle = pawnColor
        game.canvas
            .createCircle(
                this.x * game.blockSize + game.blockSize/2 - fontSize/24, 
                this.y * game.blockSize + game.blockSize/2 + fontSize/24
            )
        // game.canvas.ctx
        //     .strokeText(
        //         this.img, 
        //         this.x * game.blockSize + game.blockSize/2 - fontSize/3,
        //         this.y * game.blockSize + game.blockSize/2 + fontSize/3,
        //         'black'
        //     )
    }
}

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
                    this.createPawnAt(i, j, 'red')
                } 
                // Posisi bidak Merah ada di pojok kanan bawah (perhitungannya masih bisa salah)
                else if ((i >= size / 2) && (j >= size / 2) && (i + j >= (size - 1) + (size / 2))) {
                    this.createPawnAt(i, j, 'green')
                } 
            }
        }

        // Setup game
        this.players = [player1, player2]
        this.currentPlayer = this.players[0]
        this.nextPlayer = this.players[1]
    }

    changePlayer() {
        this.currentPlayer.resetAction()
        const temp = this.currentPlayer
        this.currentPlayer = this.nextPlayer
        this.nextPlayer = temp
    }

    getPawnAt(x, y) {
        if (this.boardMatrix[y][x] !== null)
            return this.boardMatrix[y][x]
    }

    createPawnAt(x, y, color) {
        let newPawn = new Pawn(this, x, y, color)
        this.boardMatrix[y][x] = newPawn
        newPawn.draw()
    }

    movePawnTo(pawn, x, y) {
        this.boardMatrix[y][x] = pawn
        this.boardMatrix[pawn.y][pawn.x] = null
        pawn.x = x
        pawn.y = y
        this.board.update()
    }

    start() {
        this.currentPlayer.move()
    }

    getValidMovesPawnAt(x, y) {

        // return validMoves
    }
}

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
        // do nothing
    }
}

const canvasElement = document.querySelector('canvas')

const canvas = new Canvas(canvasElement)
canvas.setSize(600, 600)


const game = new GameManager(canvas, 8)
const player1 = new Human(game, 'red')
const player2 = new Human(game, 'green')
game.setup(player1, player2)

window.addEventListener('click', (e) => {   
    console.log(typeof game.currentPlayer )
    if (game.currentPlayer instanceof Human) {
        const x = Math.floor(e.clientX/game.blockSize)
        const y = Math.floor(e.clientY/game.blockSize)
        console.log(x, y)
    
        let selectedPawn = game.getPawnAt(x, y) 
        if (selectedPawn) {
            console.log("selecting a pawn", `(${selectedPawn.x}, ${selectedPawn.y})`)
            if (selectedPawn.color === game.currentPlayer.color)
            {
                console.log("selecting current player's pawn")
                console.log(selectedPawn)
                game.currentPlayer.selectedPawn = selectedPawn
            } else {
                console.log("selecting other player's pawn")
            }
        } else {
            console.log("selecting an empty block")
            if (game.currentPlayer.selectedPawn) {
                // console.log(selectedPawn.x)
                console.log(`move pawn at (${game.currentPlayer.selectedPawn.x}, ${game.currentPlayer.selectedPawn.y}) to (${x}, ${y})`)
                game.movePawnTo(game.currentPlayer.selectedPawn, x, y)
                game.changePlayer()
                console.log(game.boardMatrix)
            }
        }
    }
})
class Board {
    constructor(game) {
        this.game = game 
    }

    draw() {
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

        for (let i = 0; i < 2; i++) {
            for (const pawn of game.players[i].listOfPawns) {
                pawn.draw()
            }
        }
    }
} 
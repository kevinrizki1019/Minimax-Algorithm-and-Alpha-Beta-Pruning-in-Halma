class Pawn {
    constructor(game, post, color) {
        this.game = game
        this.post = post
        this.color = color
    }

    draw() {
        let game = this.game
        let fontSize = 30
        game.canvas.ctx.font = fontSize + "px Arial"
        let pawnColor = null
        if (this.color === "red") {
            pawnColor = "#822322"
        } else {
            pawnColor = "#085427"
        }
        game.canvas.ctx.fillStyle = pawnColor
        game.canvas
            .createCircle(
                this.post.x * game.blockSize + game.blockSize/2 - fontSize/24, 
                this.post.y * game.blockSize + game.blockSize/2 + fontSize/24
            )
    }
}
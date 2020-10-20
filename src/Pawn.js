class Pawn {
    constructor(game, post, color) {
        this.game = game
        this.post = post
        this.color = color
    }

    draw() {
        let game = this.game
        let pawnColor = null
        if (this.color === "red") {
            pawnColor = "#822322"
        } else {
            pawnColor = "#085427"
        }
        game.canvas.ctx.fillStyle = pawnColor
        game.canvas
            .createCircle(
                this.post.x * game.blockSize + game.blockSize/2, 
                this.post.y * game.blockSize + game.blockSize/2,
                game.blockSize*1.5/4
            )
    }
}
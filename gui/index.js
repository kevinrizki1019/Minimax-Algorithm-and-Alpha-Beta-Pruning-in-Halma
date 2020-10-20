const canvasElement = document.querySelector('canvas')

const canvas = new Canvas(canvasElement)
canvas.setSize(600, 600)

const game = new GameManager(canvas, 8)
const player1 = new BotMinimaxLocalSearch(game, 'red')
const player2 = new BotMinimax(game, 'green')

function animate() {
    canvas.clear()
    game.board.update()
    requestAnimationFrame(animate)
}


game.setup(player1, player2)
animate()
setInterval(animate, 1)
game.start()


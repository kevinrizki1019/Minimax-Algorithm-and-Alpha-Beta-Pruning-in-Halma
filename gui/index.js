const canvasElement = document.querySelector('canvas')

const canvas = new Canvas(canvasElement)
canvas.setSize(600, 600)

const game = new GameManager(canvas, 8)
const player1 = new BotMinimax(game, 'red')
const player2 = new Human(game, 'green')
// const player2 = new BotMinimaxLocalSearch(game, 'green')

game.setup(player1, player2)
game.start()

// function animate() {
//     requestAnimationFrame(animate)
//     canvas.clear()
//     game.board.update()
// }
// animate()

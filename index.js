const canvasElement = document.querySelector('canvas')

const canvas = new Canvas(canvasElement)
canvas.setSize(600, 600)

let player1 = null
let player2 = null
let Bsize = null
const game = new GameManager(canvas)

function animate() {
    canvas.clear()
    game.board.update()
    requestAnimationFrame(animate)
}

document.querySelector('#play')
    .addEventListener('click', () => {
        let player1El = document.getElementById('selectP1')
        let player2El = document.getElementById('selectP2')
        let bsizeEl = document.getElementById('Bsize')
        let tlimitEl = document.getElementById('Tlimit')

        if (player1El.value === 'Human') {
            player1 = new Human(game, 'red')
        } else if (player1El.value === 'Bot minimax') {
            player1 = new BotMinimax(game, 'red')
        } else if (player1El.value === 'Bot minimax + local search') {
            player1 = new BotMinimaxLocalSearch(game, 'red')
        }

        if (player2El.value === 'Human') {
            player2 = new Human(game, 'green')
        } else if (player2El.value === 'Bot minimax') {
            player2 = new BotMinimax(game, 'green')
        } else if (player2El.value === 'Bot minimax + local search') {
            player2 = new BotMinimaxLocalSearch(game, 'green')
        }

        Bsize = parseInt(bsizeEl.value)
        document.querySelector('.menu').style.display = 'none'
        document.querySelector('.playing').style.display = 'flex'

        if (player1 && player2 && Bsize) {
            game.setup(player1, player2, Bsize)
            animate()
            game.start()
        }
    })

document.querySelector('.winner button')
    .addEventListener('click', () => {
        location.reload()
    })




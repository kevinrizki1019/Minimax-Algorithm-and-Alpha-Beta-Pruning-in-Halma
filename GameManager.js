const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
const { Board } = require('./Board.js');
const { Player } = require('./Player.js');
const { Position } = require('./Position.js');


class GameManager {
    constructor() {
        this.board = new Board(8);
        this.player1 = new Player("merah", 8);
        this.player2 = new Player("hijau", 8);
        this.turn = "merah";
    }

    printState() {
        this.board.printBoard();
        console.log("Player turn = ", this.turn);
    }

    inputDialog() {
        console.log("Input pawn position you want to move");
        console.log("x : ");
        process.stdin.once('data', (x) => {
            x.toString().trim(); 
            process.exit();
        });       

        console.log("y : ");
        process.stdin.once('data', (y) => {
            x.toString().trim(); 
            process.exit();
        });       

        // x = parseInt(x);
        // y = parseInt(y); 
    }
}

gameManager = new GameManager();
gameManager.printState();
gameManager.inputDialog();
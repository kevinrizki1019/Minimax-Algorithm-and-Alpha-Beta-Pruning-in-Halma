const readline = require('readline');
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
        console.log("Player turn : ", this.turn);
    }

    validateMove(currentPosition, finalPositon) {
        // UNTUK PLAYER, VALIDATE MOVE JUGA MEMASTIKAN BIDAK YANG DIPILIH
        // ADALAH MILIK DIA

        // PADA GAME MANAGER, VALIDATE MOVE MEMASTIKAN BAHWA BIDAK YANG DIPINDAHKAN
        // ADALAH BIDAK MILIK PLAYER YANG SEDANG BERJALAN
        
        // ADA TAMBAHAN JUGA UNTUK MEMASTIKAN BIDAK TIDAK MUNDUR DARI DAERAH TENGAH
        // KE DAERAH RUMAH ATAU MUNDUR DARI DAERAH TUJUAN KE DAERAH TENGAH

    }

    inputDialog() {
        // Ini design nya bad banget tapi baru ini yang jalan
        let xinitial;
        let yinitial;
        let xfinal;
        let yfinal;
        let finish = false;

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        const question1 = () => {
            return new Promise((resolve, reject) => {
                rl.question("x : ", (xraw) => {
                    xinitial = parseInt(xraw);
                    resolve();
                })
            })
        }
        
        const question2 = () => {
            return new Promise((resolve, reject) => {
                rl.question("y : ", (yraw) => {
                    yinitial = parseInt(yraw);
                    resolve();
                })
            })
        }
        
        const question3 = () => {
            return new Promise((resolve, reject) => {
                rl.question("x : ", (yraw) => {
                    xfinal = parseInt(yraw);
                    resolve();
                })
            })
        }
        
        const question4 = () => {
            return new Promise((resolve, reject) => {
                rl.question("y : ", (yraw) => {
                    yfinal = parseInt(yraw);
                    resolve();
                })
            })
        }

        const main = async () => {
            while (!finish) {
                gameManager.printState();
                console.log("Input pawn position you want to move");
                await question1();
                await question2();
                
                console.log("Initial position: (",xinitial,",",yinitial,")");
                console.log("Input target position");
                await question3();
                await question4();
                console.log("Target position: (",xfinal,",",yfinal,")");
    
                this.board.moveAPawnFromBoard(new Position(xinitial, yinitial), new Position(xfinal, yfinal));
                if (this.turn == "merah") {
                    this.player1.moveAPawnFromPlayerList(new Position(xinitial, yinitial), new Position(xfinal, yfinal));
                } else { // this.turn == "hijau  
                    this.player2.moveAPawnFromPlayerList(new Position(xinitial, yinitial), new Position(xfinal, yfinal));
                }

                if (this.turn == "merah") {
                    this.turn = "hijau"; 
                } else {
                    this.turn = "merah";
                }
            }
            rl.close();
        }

        main();
    }
}

gameManager = new GameManager();
gameManager.inputDialog();
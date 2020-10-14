const { Board } = require('./Board.js');



/**
 * Setiap Player akan memiliki kode warna antara "merah" atau "hijau"
 * Pada player terdapat list of tuple yang adalah posisi dari semua bidak yang dimiliki player
 */
class Player {
    constructor(color, size) {
        this.color = color;
        this.listOfPawnPosition = [];
        if (color == "merah") {
            for (let i = 0; i < size / 2; i++) {
                for (let j = 0; j < size / 2; j++) {
                    if (i + j < size / 2) {
                        this.listOfPawnPosition.push((i, j));
                        console.log((i, j));
                    }
                }
            }
        }
    }

    printPawnOwnedPositions() {
        for (const [i, j] in this.listOfPawnPosition) {
            console.log((i, j));
        }
    }

    /**
     * validateStep akan mengembalikan boolean true atau false.
     * true bidak dapat dipindahkan dari intial position ke final position.
     * 
     * @param {*} pawnMovedInitialPosition posisi bidak mula 
     * @param {*} pawnMovedTargetPosition posisi bidak tujuan
     */
    validateStep(pawnMovedInitialPosition, pawnMovedTargetPosition) {
        // Kasus bidak tidak melompat


        // Kasus bidak harus melompat
    }
}

player1 = new Player('merah', 8);
// player1.printPawnOwnedPositions();

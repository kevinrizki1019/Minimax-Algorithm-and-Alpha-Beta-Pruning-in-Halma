const { Position } = require('./Position.js');
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
                        let position = new Position(i, j);
                        this.listOfPawnPosition.push(position);
                    }
                }
            }
        }
    }

    printPawnOwnedPositions() {
        for (var i in this.listOfPawnPosition) {
            this.listOfPawnPosition[i].printPoint();
        }
    }

    moveAPawn(currentPosition, finalPosition) {
        let index;
        for (var i in this.listOfPawnPosition) {
            if (this.listOfPawnPosition[i].isSame(currentPosition)) {
                index = i;
            }
        }
    
        if(typeof index !== "undefined") {
            this.listOfPawnPosition[index].setAbsis(finalPosition.x);
            this.listOfPawnPosition[index].setOrdinat(finalPosition.y); 
        } else {
            console.log("Invalid pawn current position");
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
player1.moveAPawn(new Position(3, 0), new Position(3, 1));

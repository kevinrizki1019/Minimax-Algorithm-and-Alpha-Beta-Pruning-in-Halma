const { Position } = require('./Position.js');

/**
 * Setiap Player akan memiliki kode warna antara "merah" atau "hijau"
 * Pada player terdapat list of tuple yang adalah posisi dari semua bidak yang dimiliki player
 */
class Player {
    // Nyimpen data warna dan array posisi bidak yang dimiliki
    // domain color = {"hijau", "merah"}
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
        } else if (color == "hijau") {
            for (let i = size / 2; i < size; i++) {
                for (let j = size / 2; j < size; j++) {
                    if (i + j >= (size - 1) + (size / 2)) {
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

    moveAPawnFromPlayerList(currentPosition, finalPosition) {
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

}

// player1 = new Player('hijau', 8);
// player1.printPawnOwnedPositions();

module.exports = { Player };
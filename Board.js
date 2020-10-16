// Class Board for save game board condition
// Ketentuan konten pada elemen matrix:
//  O : kosong
//  M : bidak dimiliki oleh pemain Merah, letaknya di pojok kiri atas
//  H : bidak dimiliki oleh pemain Hijau, letaknya di pojok kanan bawah 
const { Position } = require('./Position.js');

class Board {
    constructor(size) {
        this.size = size;
        this.matrix = [];
        for (let i = 0; i < size; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < size; j++) {
                // Posisi bidak Hijau yang ada di pojok kiri atas
                if ((i < size / 2) && (j < size / 2) && (i + j < size / 2)) {
                    this.matrix[i][j] = "M";
                } 
                // Posisi bidak Merah ada di pojok kanan bawah (perhitungannya masih bisa salah)
                else if ((i >= size / 2) && (j >= size / 2) && (i + j >= (size - 1) + (size / 2))) {
                    this.matrix[i][j] = "H";
                } 
                // Posisi lainnya yang mula-mula kosong
                else {
                    this.matrix[i][j] = "O";
                }
            }
        }
    }

    printBoard() {
        // I know this is so complicated, but trust me the 
        // output is worth to make
        let string = "   ";
        for (let i = 0; i < this.size; i++) {
            if (i < 10) {
                string += i + "  ";
            } else {
                string += i + " "; 
            }
        }
        console.log(string);


        for (let i = 0; i < this.size; i++) {
            let string = "";
            string += i + " ";
            if (i < 10) {
                string += " ";
            }

            for (let j = 0; j < this.size; j++) {
                string += this.matrix[i][j] + "  "
            }
            console.log(string);
        }
    }

    getCellContent(row, column) {
        return this.matrix[column][row];
    }

    setCellContent(row, column, x) {
        if ((x != "H") && (x != "M") && (x != "O")) {
            return;
        }
        this.matrix[column][row] = x;
    }

    moveAPawnFromBoard(currentPosition, finalPosition) {
        let content = this.getCellContent(currentPosition.x, currentPosition.y);
        
        this.setCellContent(currentPosition.x, currentPosition.y, 'O');
        this.setCellContent(finalPosition.x, finalPosition.y, content); 
    }
}

// Testing
// board = new Board(8);
// board.printBoard();
// board.moveAPawnFromBoard(new Position(3, 0), new Position(4, 0));
// board.printBoard();

module.exports = { Board }
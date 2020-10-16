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
        if (!this.validateMove(currentPosition, finalPosition)) {
            return;
        }

        let content = this.getCellContent(currentPosition.x, currentPosition.y);
        
        this.setCellContent(currentPosition.x, currentPosition.y, 'O');
        this.setCellContent(finalPosition.x, finalPosition.y, content); 
    }

    validateMove(currentPosition, finalPosition) {
        if (currentPosition.x >= this.size || currentPosition.y >= this.size || currentPosition.x < 0 || currentPosition.y < 0) {
            console.log("Invalid pawn selected, out of bound");
            return false;
        }
        
        if (finalPosition.x >= this.size || finalPosition.y >= this.size || finalPosition.x < 0 || finalPosition.y < 0) {
            console.log("Invalid target position, out of bound");
            return false;
        }

        if (this.getCellContent(currentPosition.x, currentPosition.y) == "O") {
            console.log("Invalid pawn selected, empty cell");
            return false;
        }
        
        if (this.getCellContent(finalPosition.x, finalPosition.y) != "O") {
            console.log("Invalid target position, cell occupied")
            return false;
        }

        if ((currentPosition.x == finalPosition.x) && (currentPosition.y == finalPosition.y)) {
            console.log("Invalid move, not moved to anywhere");
            return false;
        }

        // Cek apakah finalPosition ada di 8 petak disekelilingnya
        let diffX = Math.abs(currentPosition.x - finalPosition.x);
        let diffY = Math.abs(currentPosition.y - finalPosition.y);

        if ((diffX <= 1) && (diffY <= 1)) {
            console.log("Valid move to one cell surround it");
            return true;
        }
        
        // KASUS MELOMPAT


        
    } 
}

// Testing
board = new Board(8);
board.printBoard();
board.moveAPawnFromBoard(new Position(4, 0), new Position(4, 0));
board.printBoard();

module.exports = { Board }
// Class Board for save game board condition
// Ketentuan konten pada elemen matrix:
//  O : kosong
//  H : bidak dimiliki oleh pemain Hijau
//  M : bidak dimiliki oleh pemain Merah 

class Board {
    constructor(size) {
        this.size = size;
        this.matrix = [];
        for (let i = 0; i < size; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < size; j++) {
                // Posisi bidak Hijau yang ada di pojok kiri atas
                if ((i < size / 2) && (j < size / 2) && (i + j < size / 2)) {
                    this.matrix[i][j] = "H";
                } 
                // Posisi bidak Merah ada di pojok kanan bawah (perhitungannya masih bisa salah)
                else if ((i >= size / 2) && (j >= size / 2) && (i + j > size + 2)) {
                    this.matrix[i][j] = "M";
                } 
                // Posisi lainnya yang mula-mula kosong
                else {
                    this.matrix[i][j] = "O";
                }
            }
        }
    }

    printBoard() {
        for (let i = 0; i < this.size; i++) {
            let string = "";
            for (let j = 0; j < this.size; j++) {
                string += this.matrix[i][j] + " ";
            }
            console.log(string);
        }
    }

    getCellContent(row, column) {
        return this.matrix[row][column];
    }

    setCellContent(row, column, x) {
        if ((x != "H") && (x != "M") && (x != "O")) {
            return;
        }
        this.matrix[row][column] = x;
    }
}

// Testing
board = new Board(8);
board.printBoard();
console.log(board.getCellContent(0, 3));
board.setCellContent(0, 3, "M");
board.setCellContent(0, 3, "A");
board.printBoard();
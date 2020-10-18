const { Position } = require('./Position.js');

/**
 * Class Board for save game board condition
 * Element content convention for Board matrix:
 * 0 : empty
 * 1 : pawns owned by Red player, pawns placed at top-left corner 
 * 2 : pawns owned by Green player, pawns placed at bottom-right corner 
 */
class Board {
    constructor(size) {
        this.size = size;
        this.matrix = [];

        // Initiated Board's matrix
        for (let i = 0; i < size; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < size; j++) {
                // Placed for integer 1 for Red player's pawns
                if ((i < size / 2) && (j < size / 2) && (i + j < size / 2)) {
                    this.matrix[i][j] = 1;
                } 
                // Placed for integer 2 for Green player's pawns
                else if ((i >= size / 2) && (j >= size / 2) && (i + j >= (size - 1) + (size / 2))) {
                    this.matrix[i][j] = 2;
                } 
                // Other cells set initially empty
                else {
                    this.matrix[i][j] = 0;
                }
            }
        }
    }

    /**
     * printBoard()
     * Print the matrix with x coordinate at top side and y coordinate at left side
     * The x coordinate is at range [a..p] and y coordinate is at range [1..16]
     */
    printBoard() {
        // Print the x coordinate at top side
        let string = "   ";
        for (let i = 0; i < this.size; i++) {
            string += String.fromCharCode(97 + i) + "  ";
        }
        console.log(string);

        // Print the y coordinate and board cells
        for (let i = 0; i < this.size; i++) {
            // Place the y coordinate at very left
            let string = "";
            string += i + 1 + " ";
            if (i + 1 < 10) {
                string += " ";
            }

            // Print the contents at every cells
            for (let j = 0; j < this.size; j++) {
                string += this.matrix[i][j] + "  "
            }
            console.log(string);
        }
    }

    getCellContent(position) {
        let x = position.x.charCodeAt(0) - 97;
        let y = position.y - 1;
        return this.matrix[y][x];
    }
    setCellContent(position, content) {
        if ((content != 0) && (content != 1) && (content != 2)) {
            console.log("Content set not valid");
            return;
        }
        let x = position.x.charCodeAt(0) - 97;
        let y = position.y - 1;
        this.matrix[y][x] = content;
    }

    /**
     * moveAPawnFromBoard(currentPosition, finalPosition)
     * If valid, set the cell's content at finalPosition with cell's content at
     * currentPosition and set the currentPosition with empty content
     * @param {*} currentPosition example: 'new Position("a",1)'
     * @param {*} finalPosition example: 'new Position("b",2)'
     */
    moveAPawnFromBoard(currentPosition, finalPosition) {
        if (!this.validateMove(currentPosition, finalPosition)) {
            return;
        }

        let content = this.getCellContent(currentPosition);
        
        this.setCellContent(currentPosition, 0);
        this.setCellContent(finalPosition, content); 
    }

    /**
     * validateMove(currentPosition, finalPosition)
     * Return true or folse according to both current and final position.
     * Will print log to console.
     * @param {*} currentPosition example: 'new Position("a",1)' 
     * @param {*} finalPosition example: 'new Position("b",2)'
     */
    validateMove(currentPosition, finalPosition) {
        let currentPositionx = currentPosition.x.charCodeAt(0) - 97;
        let currentPositiony = currentPosition.y - 1;
        let finalPositionx = finalPosition.x.charCodeAt(0) - 97;
        let finalPositiony = currentPosition.y - 1;


        // Check if the current position are in range
        if (currentPositionx >= this.size || currentPositiony >= this.size || currentPositionx < 0 || currentPositiony < 0) {
            console.log("Invalid pawn selected, out of bound");
            return false;
        }

        // Check if the final position are in range
        if (finalPositionx >= this.size || finalPositiony >= this.size || finalPositionx < 0 || finalPositiony < 0) {
            console.log("Invalid target position, out of bound");
            return false;
        }

        // Check if the cell position selected are not at empty cells
        if (this.getCellContent(currentPosition) == 0) {
            console.log("Invalid pawn selected, empty cell");
            return false;
        }

        // Check if the final position are not occupied by other pawns 
        if (this.getCellContent(finalPosition) != 0) {
            console.log("Invalid target position, cell occupied")
            return false;
        }

        // Check if the final position are one of 8 cells around initial position 
        let diffX = Math.abs(currentPositionx - finalPositionx);
        let diffY = Math.abs(currentPositiony - finalPositiony);
        if ((diffX <= 1) && (diffY <= 1)) {
            console.log("Valid move to one cell surround it");
            return true;
        }
        

        // ADA TAMBAHAN JUGA UNTUK MEMASTIKAN BIDAK TIDAK MUNDUR DARI DAERAH TENGAH
        // KE DAERAH RUMAH ATAU MUNDUR DARI DAERAH TUJUAN KE DAERAH TENGAH
        

        return true;
    } 

    isInRangePosition(x, y) {
        return (x >= 0 && x < this.size) && (y >=0 && y < this.size);
    }

    isEmptyCell(state, x, y) {
        return state[y][x] === 0;
    }

    arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length == b.length **
            a.every((val, index) => val === b[index]);
    }

    jumpMoveValidation(state, objPaths, visited, x, y) {
        let player = state[y][x];
        let end_path = true;
        let moves = [[0, -2], [0, 2], [-2, 0], [2, 0], [-2, -2], [2, -2], [2, 2], [-2, 2]];
        let moved = [];
        for (const [moveX, moveY] of moves) {
            if (this.isInRangePosition(x+moveX, y+moveY) && this.isEmptyCell(state, x+moveX, y+moveY)) {
                if (!this.isEmptyCell(state, x+moveX/2, y+moveY/2)) {
                    let isVisited = false;
                    for (const path of visited) {
                        if (this.arrayEquals(path, [x+moveX, y+moveY])) {
                            isVisited = true;
                            break;
                        }
                    }
                    if (isVisited) continue;

                    end_path = false;
                    moved = [...moved, [x+moveX, y+moveY]];
                }
            }
        }
        if (end_path) {
            objPaths.paths = [...objPaths.paths, [x, y]];
            return [x, y];
        }
        for (const [moveX, moveY] of moved) {
            const copyState = JSON.parse(JSON.stringify(state));
            copyState[moveY][moveX] = player;
            copyState[y][x] = 0;
            this.jumpMoveValidation(copyState, objPaths, [...visited, [x, y]], moveX, moveY);
        }
    }
}

// Testing
board = new Board(10);
board.printBoard();
// board.moveAPawnFromBoard(new Position("e", 1), new Position("f", 1));
// board.setCellContent(new Position("f",1), 2);
// board.printBoard();
// board.validateMove(new Position("d", 1), new Position("e", 2));

// Jumping case
let objPaths = {paths: [], visited: []};
board.jumpMoveValidation(board.matrix, objPaths, [], 3, 0);
console.log(objPaths.paths);

board.printBoard();

module.exports = { Board }
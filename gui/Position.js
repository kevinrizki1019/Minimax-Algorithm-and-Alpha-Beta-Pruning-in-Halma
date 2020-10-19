/**
 * Position class is used to store cell position in a board.
 * x position is in character alphabet [a..p]
 * y position is in integer number [1..16]
 */
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setAbsis(x) { this.x = x; }
    setOrdinat(y) { this.y = y; }
    getAbsis() { return this.x; }
    getOrdinat() { return this.y; }

    printPoint() { console.log("(",this.x,",",this.y,")"); }

    isSame(otherPoint) { return ((this.x == otherPoint.x) && (this.y == otherPoint.y)); }
}
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setAbsis(x) {
        this.x = x;
    }

    setOrdinat(y) {
        this.y = y;
    }

    getAbsis() {
        console.log(this.x);
        // return this.x;
    }

    getOrdinat() {
        console.log(this.y);
        // return this.y;
    }

    printPoint() {
        console.log("(",this.x,",",this.y,")");
    }

    isSame(otherPoint) {
        return ((this.x == otherPoint.x) && (this.y == otherPoint.y));
    }
}

module.exports = { Position };
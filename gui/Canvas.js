class Canvas {
    constructor(canvasElement) {
        this.element = canvasElement
        this.ctx = canvasElement.getContext('2d');
    }

    setSize(width, height) {
        this.element.width = width 
        this.element.height = height
    }

    createRectangle(x, y, width, height, fill='#000', stroke='#000') {
        this.ctx.fillStyle = fill
        this.ctx.fillRect(x, y, width, height)
        this.ctx.strokeRect(x, y, width, height)
        this.ctx.strokeStyle = stroke
    }

    createLine(x1, y1, x2, y2) {
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }

    createCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.strokeStyle = '#000'
        this.ctx.stroke()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }
}


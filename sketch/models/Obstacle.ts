class Obstacle {
  private startVector: p5.Vector
  private endVector: p5.Vector

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.startVector = createVector(x1, y1)
    this.endVector = createVector(x2, y2)
  }

  draw() {
    stroke("#fdd000")
    strokeWeight(2)
    line(this.startVector.x, this.startVector.y, this.endVector.x, this.endVector.y)
  }

  get position() {
    return {
      x1: this.startVector.x,
      y1: this.startVector.y,
      x2: this.endVector.x,
      y2: this.endVector.y
    }
  }
}
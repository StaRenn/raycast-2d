class Sun {
  private vector: p5.Vector;
  private rays: Ray[];
  private obstacles: Obstacle[];

  constructor(x: number, y: number, obstacles: Obstacle[]) {
    this.rays = []
    this.obstacles = obstacles

    this.vector = createVector(x, y)

    for(let i = 0; i < 1440; i++) {
      this.rays.push(new Ray(this.vector, radians(i/4)))
    }
  }

  draw() {
    stroke(255)
    circle(this.vector.x, this.vector.y, 25)
  }

  update(x: number, y: number) {
    this.vector.set(x, y)

    fill(255, 120)
    stroke(255, 200)

    beginShape()

    for(let ray of this.rays) {
      const vector = ray.cast(this.obstacles);
      vertex(vector.x, vector.y)
    }

    endShape()
  }
}
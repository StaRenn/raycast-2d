class Ray {
  private vector: p5.Vector;
  private angle: number;
  private direction: p5.Vector;

  constructor(vector: p5.Vector, angle: number) {
    this.vector = vector;
    this.angle = angle;

    this.direction = p5.Vector.fromAngle(angle, 10000);
  }

  cast(obstacles: Obstacle[]) {
    let intersections: p5.Vector[] = [];

    for (let obstacle of obstacles) {
      const { x1, x2, y1, y2 } = obstacle.position;
      const { x: x3, y: y3 } = this.vector;
      const { x: x4, y: y4 } = this.direction;

      // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        continue;
      }

      const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

      // Lines are parallel
      if (denominator === 0) {
        continue;
      }

      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

      // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        continue;
      }

      // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1);
      let y = y1 + ua * (y2 - y1);

      intersections.push(createVector(x, y));
    }

    if (intersections.length > 0) {
      let closestIntersection = intersections[0]

      let distance = p5.Vector.dist(intersections[0], this.vector);
      // get closest distance
      intersections.reduce((acc, intersection) => {
        const currentDistance = p5.Vector.dist(intersection, this.vector);

        if (acc > currentDistance) {
          acc = currentDistance;
          closestIntersection = intersection;
        }

        return acc;
      }, distance);

      return createVector(closestIntersection.x, closestIntersection.y)
    }

    return createVector(this.direction.x, this.direction.y)
  }
}

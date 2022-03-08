var walls = [];
var sun;
function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < Math.random() * 20; i++) {
        walls.push(new Obstacle(Math.random() * windowWidth, Math.random() * windowHeight, Math.random() * windowWidth, Math.random() * windowHeight));
    }
    sun = new Sun(0, 0, walls);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw(x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    background("#0f0f0f");
    for (var _i = 0, walls_1 = walls; _i < walls_1.length; _i++) {
        var wall = walls_1[_i];
        wall.draw();
    }
    sun.update(mouseX, mouseY);
    sun.draw();
}
var Obstacle = (function () {
    function Obstacle(x1, y1, x2, y2) {
        this.startVector = createVector(x1, y1);
        this.endVector = createVector(x2, y2);
    }
    Obstacle.prototype.draw = function () {
        stroke("#fdd000");
        strokeWeight(2);
        line(this.startVector.x, this.startVector.y, this.endVector.x, this.endVector.y);
    };
    Object.defineProperty(Obstacle.prototype, "position", {
        get: function () {
            return {
                x1: this.startVector.x,
                y1: this.startVector.y,
                x2: this.endVector.x,
                y2: this.endVector.y
            };
        },
        enumerable: true,
        configurable: true
    });
    return Obstacle;
}());
var Ray = (function () {
    function Ray(vector, angle) {
        this.vector = vector;
        this.angle = angle;
        this.direction = p5.Vector.fromAngle(angle, 10000);
    }
    Ray.prototype.cast = function (obstacles) {
        var _this = this;
        var intersections = [];
        for (var _i = 0, obstacles_1 = obstacles; _i < obstacles_1.length; _i++) {
            var obstacle = obstacles_1[_i];
            var _a = obstacle.position, x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
            var _b = this.vector, x3 = _b.x, y3 = _b.y;
            var _c = this.direction, x4 = _c.x, y4 = _c.y;
            if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
                continue;
            }
            var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
            if (denominator === 0) {
                continue;
            }
            var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
            var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
            if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
                continue;
            }
            var x = x1 + ua * (x2 - x1);
            var y = y1 + ua * (y2 - y1);
            intersections.push(createVector(x, y));
        }
        if (intersections.length > 0) {
            var closestIntersection_1 = intersections[0];
            var distance = p5.Vector.dist(intersections[0], this.vector);
            intersections.reduce(function (acc, intersection) {
                var currentDistance = p5.Vector.dist(intersection, _this.vector);
                if (acc > currentDistance) {
                    acc = currentDistance;
                    closestIntersection_1 = intersection;
                }
                return acc;
            }, distance);
            return createVector(closestIntersection_1.x, closestIntersection_1.y);
        }
        return createVector(this.direction.x, this.direction.y);
    };
    return Ray;
}());
var Sun = (function () {
    function Sun(x, y, obstacles) {
        this.rays = [];
        this.obstacles = obstacles;
        this.vector = createVector(x, y);
        for (var i = 0; i < 1440; i++) {
            this.rays.push(new Ray(this.vector, radians(i / 4)));
        }
    }
    Sun.prototype.draw = function () {
        stroke(255);
        circle(this.vector.x, this.vector.y, 25);
    };
    Sun.prototype.update = function (x, y) {
        this.vector.set(x, y);
        fill(255, 120);
        stroke(255, 200);
        beginShape();
        for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
            var ray = _a[_i];
            var vector = ray.cast(this.obstacles);
            vertex(vector.x, vector.y);
        }
        endShape();
    };
    return Sun;
}());
//# sourceMappingURL=build.js.map
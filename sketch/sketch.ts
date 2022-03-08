let walls: Obstacle[] = [];
let sun: Sun

function setup() {
  createCanvas(windowWidth, windowHeight)

  for(let i = 0; i < Math.random() * 20; i++) {
    walls.push(new Obstacle(Math.random() * windowWidth, Math.random() * windowHeight, Math.random() * windowWidth, Math.random() * windowHeight))
  }

  sun = new Sun(0, 0, walls)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(x = 0, y = 0) {
  background("#0f0f0f");

  for(let wall of walls) {
    wall.draw();
  }

  sun.update(mouseX, mouseY)
  sun.draw()
}
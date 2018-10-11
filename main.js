var manager;
var lines = [];

function setup() {
  createCanvas(700, 600);

  background(color(255));

  draw_box();
}

function draw_box() {
  stroke(color(0, 0, 0));
  strokeWeight(4);

  line(0, 0, 0, height);
  line(0, 0, width, 0);
  line(width, 0, width, height);
  line(0, height, width, height);
}

function draw() {
  lines.push(new Line());
}

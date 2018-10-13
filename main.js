var lines = [];

function setup() {
  var canvas = createCanvas(700, 600);
  place_canvas(canvas);

  reset();
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
  for (var p in lines) {
    if (lines[p].active) {
      lines[p].active = false;
      spawn_line(lines[p]);
      spawn_line(lines[p]);
    }
  }
}

function spawn_line(parent) {
  lines.push(
    new Line({
      x1: parent.end_point.x,
      y1: parent.end_point.y,
      length: random(
        parent.length + 5,
        parent.length - 10
      )
    })
  );
}

function mousePressed() {
  reset();
}

function reset() {
  background(color(255));
  lines = [];
  draw_box();
  lines.push(
    new Line({
      x1: 0,
      y1: 0,
      length: 75
    })
  );
}

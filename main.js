var lines = [];

function setup() {
  var canvas = createCanvas(700, 600);
  place_canvas(canvas);

  reset();
}

function draw_box() {
  stroke(color(0, 0, 0));
  strokeWeight(2);

  line(0, 0, width, 0);
  line(0, height, width, height);
  line(0, 0, 0, height);
  line(width, 0, width, height);
}

function draw() {
  for (var p in lines) {
    if (lines[p].active) {
      lines[p].active = false;
      for (var i = 0; i < 2; i++) {
        spawn_line(lines[p]);
      }
    }
  }
}

function spawn_line(parent) {
  lines.push(
    new Line({
      parent: parent,
      x1: parent.end_point.x,
      y1: parent.end_point.y,
      length: Math.max(random(
        parent.length + 5,
        parent.length - 7.5
      ), 5)
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

  colorMode(HSB);
  for (var i = 0; i < 4; i++) {
    var col = color(
      random(255),
      random(80, 120),
      random(80, 120));
    var x = random(-width / 3, width / 3);
    var y = random(-height / 3, height / 3);
    var n = random(1, 5);
    for (var j = 0; j < n; j++) {
      lines.push(
        new Line({
          x1: x,
          y1: y,
          length: random(25, 50),
          custom_color: col
        })
      );
    }
  }
  colorMode(RGB);
}

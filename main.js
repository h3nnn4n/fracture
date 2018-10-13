var lines = [];

function setup() {
  var canvas = createCanvas(700, 600);
  place_canvas(canvas);

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

  lines.push(new Line(0, 0, 75));
}

function draw() {
  for (var p in lines) {
    if (lines[p].active) {
      lines[p].active = false;
      spawn_line(lines[p]);
      spawn_line(lines[p]);
      spawn_line(lines[p]);
    }
  }
}

function spawn_line(parent) {
  lines.push(
    new Line(
      parent.end_point.x,
      parent.end_point.y,
      random(
        parent.length + 5,
        parent.length - 10
      )
    )
  );
}

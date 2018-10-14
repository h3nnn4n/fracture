var lines = [];

function setup() {
  var canvas = createCanvas(700, 600);
  place_canvas(canvas);

  reset();
}

function draw_box() {
  lines.push(
    new Line({
      x1: -width / 3,
      y1: height / 3,
      x2: -width / 3,
      y2: -height / 3
    })
  );

  lines.push(
    new Line({
      x1: width / 3,
      y1: -height / 3,
      x2: width / 3,
      y2: height / 3
    })
  );

  lines.push(
    new Line({
      x1: width / 3,
      y1: height / 3,
      x2: -width / 3,
      y2: height / 3
    })
  );

  lines.push(
    new Line({
      x1: -width / 3,
      y1: -height / 3,
      x2: width / 3,
      y2: -height / 3
    })
  );
}

function draw() {
  //return;

  if (lines.length > 5000) {
    return;
  }

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

  for (var i = 0; i < 5; i++) {
    lines.push(
      new Line({
        x1: 0,
        y1: 0,
        length: 75
      })
    );
  }
}

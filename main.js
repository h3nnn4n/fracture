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
      y2: -height / 3,
      active: false
    })
  );

  lines.push(
    new Line({
      x1: width / 3,
      y1: -height / 3,
      x2: width / 3,
      y2: height / 3,
      active: false
    })
  );

  lines.push(
    new Line({
      x1: width / 1,
      y1: height / 3,
      x2: -width / 1,
      y2: height / 3,
      active: false
    })
  );

  lines.push(
    new Line({
      x1: -width / 1,
      y1: -height / 3,
      x2: width / 1,
      y2: -height / 3,
      active: false
    })
  );
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
      x1: parent.end_point.x,
      y1: parent.end_point.y,
      length: parent.length
      //length: random(
        //parent.length + 5.5,
        //parent.length - 5.5
      //)
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

  for (var i = 0; i < 4; i++) {
    var x = random(-width / 3, width / 3);
    var y = random(-height / 3, height / 3);
    var n = random(1, 5);
    for (var j = 0; j < n; j++) {
      lines.push(
        new Line({
          x1: x,
          y1: y,
          length: random(5, 50)
        })
      );
    }
  }
}

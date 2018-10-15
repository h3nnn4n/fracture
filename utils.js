function draw_box() {
  stroke(color(0, 0, 0));
  strokeWeight(2);

  line(0, 0, width, 0);
  line(0, height, width, height);
  line(0, 0, 0, height);
  line(width, 0, width, height);
}

function spawn_line(parent) {
  lines.push(
    new Line({
      parent: parent,
      x1: parent.end_point.x,
      y1: parent.end_point.y,
      length: Math.max(random(
        parent.length + 4.0,
        parent.length - 6.0
      ), 7.5)
    })
  );
}

function reset() {
  background(color(255));
  lines = [];
  draw_box();

  for (var i = 0; i < 50; i++) {
    lines.push(
      new Line({
        active: false
      })
    );
  }

  return;

  colorMode(HSB);
  for (var i = 0; i < 4; i++) {
    var col = color(
      random(255),
      random(80, 120),
      random(80, 120),
      0.5);
    var x = random(-width / 3, width / 3);
    var y = random(-height / 3, height / 3);
    var n = random(1, 5);
    for (var j = 0; j < n; j++) {
      lines.push(
        new Line({
          x1: 0,
          y1: 0,
          length: random(25, 50),
          //custom_color: col
        })
      );
    }
  }
  colorMode(RGB);
}

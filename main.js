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

  lines.push(new Line(0, 0, 25));
}

function draw() {
  if (lines.length > 2000) {
    return;
  }

  for (var p in lines) {
    if (lines[p].active) {
      lines[p].active = false;

      lines.push(
        new Line(
          lines[p].end_point.x,
          lines[p].end_point.y,
          random(
            lines[p].length + 2.5,
            lines[p].length - 5.0
          )
        )
      );

      continue;

      if (random() > 0.5) {
        continue;
      }

      lines.push(
        new Line(
          lines[p].end_point.x,
          lines[p].end_point.y,
          random(
            lines[p].length + 2.5,
            lines[p].length - 5.0
          )
        )
      );
    }
  }
}

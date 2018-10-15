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
      ), 7.5),
      custom_color: getPixData(
        parent.end_point.x + width / 2,
        parent.end_point.y + height / 2
      )
    })
  );
}

function reset() {
  var i, j;

  background(color(255));
  //image(img, 0, 0);
  lines = [];
  draw_box();

  for (i = 0; i < 0; i++) {
    lines.push(
      new Line({
        active: false
      })
    );
  }

  colorMode(HSB);
  for (i = 0; i < 4; i++) {
    var x = random(-width / 3, width / 3);
    var y = random(-height / 3, height / 3);
    var col = getPixData(x + width / 3, y + height / 3);
    var n = random(2, 5);
    for (j = 0; j < n; j++) {
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

function getPixData(x, y){
  x = floor(x);
  y = floor(y);

  var d = img._pixelDensity;
  var c;

  idx = 4 * ((y * d) * img.width * d + (x * d));

  c = color(
    img.pixels[idx],
    img.pixels[idx+1],
    img.pixels[idx+2],
    img.pixels[idx+3]
  );

  //debugger;
  return c;
}

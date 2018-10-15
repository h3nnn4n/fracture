var lines = [];

var count = 0;

function setup() {
  var canvas = createCanvas(700, 600);
  place_canvas(canvas);

  reset();
  test();
}

function draw() {
  return;
  for (var p in lines) {
    if (lines[p].active) {
      lines[p].active = false;
      for (var i = 0; i < 1; i++) {
        spawn_line(lines[p]);
      }
    }
  }
}

function mousePressed() {
  reset();
  test();
}

function test() {
  loadPixels();

  floodFill(
    width / 2,
    height / 2,
    color(
      255,
      0,
      0
    )
  );

  updatePixels();
}

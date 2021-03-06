var lines = [];
var img;

function preload() {
  img = loadImage('img.jpg');
}

function setup() {
  var canvas = createCanvas(700, 600);
  place_canvas(canvas);

  reset();
}

function draw() {
  img.loadPixels();

  for (var p in lines) {
    if (lines[p].active) {
      lines[p].active = false;
      for (var i = 0; i < 2; i++) {
        spawn_line(lines[p]);
      }
    }
  }
}

function mousePressed() {
  reset();
}

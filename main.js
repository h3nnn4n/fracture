/*jshint esversion: 6 */

var manager;
var background_color;
var particles = [];
var lines = [];

var do_particles = false;
var do_lines = true;

function setup() {
  createCanvas(700, 600);

  //colorMode(HSB);

  if (do_particles) {
    manager = new Manager();

    manager.init(5);
    //manager.init();

    //var p = new Particle(
      //0,
      //height / 2,
      //1
    //);

    //p.velocity.x = 1;
    //p.velocity.y = 0;
    //p.life = width;
    //p.ninja = true;

    //particles.push(p);
  }

  background_color = color(255);
  background(background_color);

  if (do_lines) {
    lines.push(new Line());
  }

  draw_box();
}

function draw() {
  if (do_particles) {
    manager.update();

    loadPixels();

    for (var p in particles) {
      particles[p].update();
      particles[p].show();
    }
  }

  if (do_lines) {
    lines.push(new Line());
  }

  //console.log('loop');
}

function draw_box() {
  stroke(color(0, 0, 0));
  strokeWeight(4);

  line(0, 0, 0, height);
  line(0, 0, width, 0);
  line(width, 0, width, height);
  line(0, height, width, height);
}

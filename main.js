/*jshint esversion: 6 */

var manager;
var background_color;
var particles = [];

function setup() {
  createCanvas(700, 600);

  //colorMode(HSB);

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

  background_color = color(255);
  background(background_color);
}

function draw() {
  manager.update();

  loadPixels();

  for (var p in particles) {
    particles[p].update();
    particles[p].show();
  }

  //console.log('loop');
}

/*jshint esversion: 6 */

class Particle {
  constructor(x, y, speed) {
    this.position = createVector(x, y);
    this.position_old = this.position.copy();
    this.velocity = p5.Vector.random2D();
    this.speed = speed;

    this.velocity.setMag(1);

    this.life = random(10, 20);
    this.alive = true;
    this.expired = false;
    this.collided = false;

    this.color = color(0, 0, 0);
  }

  update() {
    if (!this.life_tick()) {
      return;
    }

    if (this.collision()) {
      this.alive = false;
      this.collided = true;
      return;
    }

    this.position_old.set(this.position);
    this.position.add(p5.Vector.mult(this.velocity, this.speed));
  }

  set_random_position() {
    this.position = createVector(
      random(width),
      random(height)
    );
    this.position_old.set(this.position);
  }

  set_position(position) {
    this.position.set(position);
    this.position_old.set(position);
  }

  find_spawn_position() {
    var x, y, c;

    for (var i = 0, len = 50; i < len; i++) {
      x = Math.floor(random(width));
      y = Math.floor(random(height));

      //stroke(color(0, 255, 0));
      //ellipse(x, y, 2);
      c = get(x, y);

      if (c[0] != background_color.levels[0] && c[1] != background_color.levels[1] && c[2] != background_color.levels[2]) {
        //stroke(color(255, 0, 0));
        //ellipse(x, y, 2);
        this.position = createVector(x, y);
        this.position_old.set(this.position);

        return;
      }
    }

    this.set_random_position();
  }

  collision() {
    var c = get(this.position.x + this.velocity.x, this.position.y + this.velocity.y);

    if (c[0] != background_color.levels[0] && c[1] != background_color.levels[1] && c[2] != background_color.levels[2]) {
      return true;
    }

    return false;
  }

  life_tick() {
    if (this.life > 0) {
      this.life -= 1;
    } else {
      this.alive = false;
      this.expired = true;
    }

    return this.alive;
  }

  show() {
    if (!this.alive) {
      return;
    }

    var r = 5;

    fill(this.color);
    stroke(this.color);

    strokeWeight(1);

    //push();
    //translate(this.position.x, this.position.y);
    //ellipse(0, 0, r);
    //pop();
    line(
      this.position.x,
      this.position.y,
      this.position_old.x,
      this.position_old.y
    );
  }
}

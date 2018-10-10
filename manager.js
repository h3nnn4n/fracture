/*jshint esversion: 6 */

class Manager {
  constructor() {
  }

  init(n) {
    this.spawn(n);

    this.last_dead = null;
  }

  update() {
    this.last_dead = null;
    this.remove_dead_particles();
    this.spawn_new_particles();
  }

  remove_dead_particles() {
    if (particles.length > 0 && !particles[particles.length - 1].alive) {
      var p = particles.pop();

      if (p.expired) {
        this.last_dead = p;
      }
    }
  }

  spawn_new_particles() {
    if (particles.length == 0) {
      this.spawn(random(3, 7), true);
    }
  }

  spawn(n, random_pos) {
    var p;
    var pos = null;

    for (var i = 0; i < n; i++) {
      p = new Particle(
        width / 2,
        height / 2,
        1
      );

      p.life = 1000;

      if (pos != null) {
        p.set_position(pos);
      } else if (this.last_dead != null) {
        p.set_position(this.last_dead.position);
      } else if (random_pos) {
        //p.set_random_position();
        p.find_spawn_position();
      }

      if (pos == null) {
        pos = p.position.copy();
      }

      particles.push(
        p
      );
    }
  }
}

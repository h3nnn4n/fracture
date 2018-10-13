/*jshint esversion: 6 */

class Line {
  constructor(x, y, length) {
    if (length < 1) {
      return;
    }

    this.limited = !(x == null);
    this.length = length;

    this.start_point = createVector();
    this.end_point = createVector();

    this.linear_coef = random(-width / 2, width / 2);
    this.angular_coef = randomGaussian(0, 2);

    this.center = this.random_point();

    this.bounds_start = createVector(-width / 2, -height / 2);
    this.bounds_end = createVector(width / 2, height / 2);

    this.active = true;

    if (this.limited) {
      this.set_starting_point(x, y, length);
      this.update_coefs();
    } else {
      this.set_full_bounds();
    }

    if (lines.length > 0) {
      this.find_collisions();
    }

    this.render();
  }

  set_starting_point(x, y, length) {
    if (x == null || y == null) {
      return;
    }

    this.start_point.x = x;
    this.start_point.y = y;

    var random_direction = p5.Vector.random2D();
    random_direction.setMag(length);

    this.end_point.set(p5.Vector.add(this.start_point, random_direction));

    this.center.set(this.start_point);
    this.center.lerp(this.end_point, 0.1);

    //this.render(color(255, 0, 0));
  }

  update_coefs() {
    this.angular_coef = (
      (this.end_point.y - this.start_point.y) /
      (this.end_point.x - this.start_point.x)
    );

    this.linear_coef = (
      -this.angular_coef * this.start_point.x +
      this.start_point.y
    );
  }

  random_point() {
    var x = random(-width / 2, width / 2);

    return createVector(
      x,
      this.value_at_point(x)
    );
  }

  value_at_point(x) {
    return this.linear_coef + x * this.angular_coef;
  }

  set_full_bounds() {
    this.start_point.x = this.bounds_start.x;
    this.start_point.y = this.value_at_point(this.bounds_start.x);

    this.end_point.x = this.bounds_end.x;
    this.end_point.y = this.value_at_point(this.bounds_end.x);
  }

  find_collisions() {
    for (var p in lines) {
      var intersection = this.intersection_with(lines[p]);

      if (
        (this.start_point.x <= intersection.x && intersection.x <= this.center.x) ||
        (this.start_point.x >= intersection.x && intersection.x >= this.center.x)) {
        if (lines[p].contains_point(intersection)) {
          this.start_point.x = intersection.x;
          this.start_point.y = intersection.y;
        }
      }

      if (
        (this.end_point.x >= intersection.x && intersection.x >= this.center.x) ||
        (this.end_point.x <= intersection.x && intersection.x <= this.center.x)) {
        if (lines[p].contains_point(intersection)) {
          this.end_point.x = intersection.x;
          this.end_point.y = intersection.y;

          //this.render_intersection(intersection);

          this.active = false;
        }
      }
    }
  }

  contains_point(pos) {
    return (
      (this.start_point.x <= pos.x && this.end_point.x >= pos.x) ||
      (this.start_point.x >= pos.x && this.end_point.x <= pos.x)
    );
  }

  intersection_with(line) {
    var x = (line.linear_coef - this.linear_coef) / (this.angular_coef - line.angular_coef);
    var y = this.value_at_point(x);

    return {x: x, y: y};
  }

  same(line) {
    return (
      Math.abs(this.angular_coef - line.angular_coef) < 1e-6 &&
      Math.abs(this.linear_coef - line.linear_coef) < 1e-6
    );
  }

  render(custom_color) {
    if (custom_color) {
      stroke(custom_color);
    } else {
      stroke(color(0, 0, 0));
    }

    strokeWeight(1);

    push();
    translate(
      width / 2,
      height / 2
    );

    line(
      this.start_point.x,
      this.start_point.y,
      this.end_point.x,
      this.end_point.y
    );

    //ellipse(
      //this.start_point.x,
      //this.start_point.y,
      //5
    //);

    //ellipse(
      //this.end_point.x,
      //this.end_point.y,
      //5
    //);

    pop();
  }

  render_intersection(pos) {
    push();
    translate(
      width / 2,
      height / 2
    );

    fill(color(255, 0, 0));
    stroke(color(255, 0, 0));
    ellipse(
      pos.x,
      pos.y,
      2
    );

    pop();
  }
}

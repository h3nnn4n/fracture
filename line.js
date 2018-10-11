/*jshint esversion: 6 */

class Line {
  constructor() {
    this.linear_coef = random(-width / 2, width / 2);
    this.angular_coef = randomGaussian(0, 2);

    this.center = this.random_point();

    this.start_point = createVector();
    this.end_point = createVector();

    this.bounds_start = createVector(-width / 2, -height / 2);
    this.bounds_end = createVector(width / 2, height / 2);

    this.set_full_bounds();

    if (lines.length > 0) {
      this.find_collisions();
    }

    this.render();
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

      if (this.start_point.x < intersection.x && intersection.x < this.center.x) {
        if (lines[p].contains_point(intersection)) {
          this.start_point.x = intersection.x;
          this.start_point.y = intersection.y;
        }
      }

      if (this.end_point.x > intersection.x && intersection.x > this.center.x) {
        if (lines[p].contains_point(intersection)) {
          this.end_point.x = intersection.x;
          this.end_point.y = intersection.y;
        }
      }
    }
  }

  contains_point(pos) {
    return (this.start_point.x < pos.x && this.end_point.x > pos.x);
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

  render() {
    stroke(color(0, 0, 0));
    strokeWeight(2);

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

    pop();
  }
}

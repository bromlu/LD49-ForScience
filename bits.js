class Bit {
  constructor(x, y, theta, force, r=6) {
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.force = force;
    this.r = r;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, TAU);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  update() {
    this.x += Math.cos(this.theta) * this.force;
    this.y += Math.sin(this.theta) * this.force;
  }

  contains(x, y) {
    const dx = W / 2 - x;
    const dy = H / 2 - y;
    const distsq = dx * dx + dy * dy;
    return distsq <= this.r * this.r;
  }
}
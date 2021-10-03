const debrisPics = [
  debris1pic,
  debris2pic
]
class Bit {
  constructor(x, y, theta, force, r=10) {
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.force = force;
    this.r = r + normRand(8);
    this.pic = debrisPics[Math.floor(Math.random() * debrisPics.length)];
    this.rotation = Math.random() * TAU;
  }

  draw(ctx) {
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.r, 0, TAU);
    // ctx.fillStyle = "white";
    // ctx.fill();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.pic, -this.r, -this.r, this.r*2, this.r*2);

    ctx.restore();

  }

  update() {
    this.x += Math.cos(this.theta) * this.force;
    this.y += Math.sin(this.theta) * this.force;
  }

  contains(x, y, otherR = 0) {
    const dx = this.x - x;
    const dy = this.y - y;
    const distsq = dx * dx + dy * dy;
    const r = this.r + otherR;
    return distsq <= r * r;
  }
}
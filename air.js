class AirCanister {
  constructor() {
    do {
      this.x = uniRand(10, W-10);
      this.y = uniRand(10, H-10);
    } while (planet.contains(this.x, this.y))

    this.r = 40;
    this.airTimer = 0;
    this.rotation = 0;
  }

  draw(ctx) {
    if (this.airTimer > 0) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(o2pic, -this.r, -this.r, this.r*2, this.r*2);
    ctx.restore();
  }

  update(player) {
    this.rotation += .01;
    if (this.airTimer > 0) {
      this.airTimer--;
      player.air = clamp(0, player.air + 6, 1000);

      if (this.airTimer == 1) {
        do {
          this.x = uniRand(10, W-10);
          this.y = uniRand(10, H-10);
        } while (planet.contains(this.x, this.y))
      }
      return;
    }
    if (this.contains(player.x, player.y, 20)) {
      this.airTimer = 50
      this.x = -100
    }
  }

  contains(x, y, otherR = 0) {
    const dx = this.x - x;
    const dy = this.y - y;
    const distsq = dx * dx + dy * dy;
    const r = this.r + otherR
    return distsq <= r * r;
  }
}
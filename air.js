class AirCanister {
  constructor() {
    do {
      this.x = uniRand(10, W-10);
      this.y = uniRand(10, H-10);
    } while (planet.contains(this.x, this.y))

    this.r = 10;
    this.airTimer = 0;
  }

  draw(ctx) {
    if (this.airTimer > 0) return;
    ctx.fillStyle = "white"
    ctx.fillRect(this.x, this.y, 10, 10);
  }

  update(player) {
    if (this.airTimer > 0) {
      this.airTimer--;
      player.air += 3;

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
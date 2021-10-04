const increment = 8;

breathsounds = [
  breath1sound,
  breath2sound,
  breath3sound
]
class AirCanister {
  constructor() {
    do {
      this.x = uniRand(10, W-50);
      this.y = uniRand(10, H-50);
    } while (planet.contains(this.x, this.y, 100))

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
      player.air = clamp(0, player.air + increment, 1030);

      if (this.airTimer == 1) {
        do {
          this.x = uniRand(100, W-100);
          this.y = uniRand(120, H-100);
        } while (planet.contains(this.x, this.y, 100))
      }
      return;
    }
    if (this.contains(player.x, player.y, 20) && gameState == States.PLAYING && player.air > 0) {
      this.airTimer = 50
      if (player.air < 300) { // extra bonus at low air
        this.airTimer += 10;
      }
      this.x = -100
      const sound = breathsounds[Math.floor(Math.random() * breathsounds.length)]
      sound.currentTime = 0;
      sound.play();
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
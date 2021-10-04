const closeThreshold = 5;
const playerSize = 50;

hurtsounds = [
  hurt1sound,
  hurt2sound,
  hurt3sound
]
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.maxV = 2;
    this.thetaGoal = 0;
    this.theta = 0;
    this.iTimer = 70;

    this.air = 1030;

    this.alpha = 1;
  }

  update() {
    if (this.iTimer > 0) this.iTimer --;
    else {
      const collided = this.checkForCollision();
      if (collided) {
        this.iTimer = 70;
        this.air -= 200;
        camera.shake();
        const sound = hurtsounds[Math.floor(Math.random() * hurtsounds.length)]
        sound.currentTime = 0;
        sound.play();
      }
      this.air--;
    }

    let dx = cursor.x - this.x;
    let dy = cursor.y - this.y;
    const dd = Math.sqrt(dx * dx + dy * dy);

    if (dd > this.maxV) {
      dx *= this.maxV / dd;
      dy *= this.maxV / dd;
    }
    if (dd <= closeThreshold) {
      this.vx = 0;
      this.vy = 0;
      return;
    }

    this.thetaGoal = Math.atan2(dy, dx);

    this.x += dx;
    this.y += dy;

    const dTheta = clamp(-.05, this.thetaGoal - this.theta, .05);
    if (Math.abs(dTheta) > .01) this.theta += dTheta;
  }

  checkForCollision() {
    for (let a of asteroids) {
      if (a.contains(this.x, this.y, playerSize/2)) {
        return true;
      }
    }

    for (let b of bits) {
      if (b.contains(this.x, this.y, playerSize/2)) {
        return true;
      }
    }
    if (planet.contains(this.x, this.y, playerSize/2)) {
      return true;
    }
    return false;
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    if (this.iTimer > 0) ctx.globalAlpha = this.iTimer % 10 < 5 ? .7 : this.alpha; 
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.theta);
    ctx.drawImage(playerpic, -playerSize/2, -playerSize/2, playerSize, playerSize)
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  drawWin(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.theta);
    ctx.drawImage(playerwinpic, -playerSize/2, -playerSize/2, playerSize, playerSize)
    ctx.restore();
  }

}

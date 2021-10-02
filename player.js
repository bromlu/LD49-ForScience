const closeThreshold = 5;
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.maxV = 1;
    this.thetaGoal = 0;
    this.theta = 0;

    this.iTimer = 100;
  }

  update() {
    let dx = cursor.x - this.x;
    let dy = cursor.y - this.y;
    const dd = Math.sqrt(dx * dx + dy * dy);

    if (dd <= closeThreshold) {
      this.vx = 0;
      this.vy = 0;
    }

    if (dd > this.maxV) {
      dx *= this.maxV / dd;
      dy *= this.maxV / dd;
    }

    this.x += dx;
    this.y += dy;
    this.thetaGoal = Math.atan2(dy, dx);

    const dTheta = clamp(-.1, this.thetaGoal - this.theta, .1);
    if (Math.abs(dTheta) > .01) this.theta += dTheta;

    if (this.iTimer > 0) this.iTimer --;
    else {
      const collided = this.checkForCollision();
      if (collided) this.iTimer = 100;
    }
  }

  checkForCollision() {
    for (let a of asteroids) {
      if (a.contains(this.x, this.y)) {
        return true;
      }
    }

    for (let b of bits) {
      if (b.contains(this.x, this.y)) {
        return true;
      }
    }
    return false;
  }

  draw(ctx) {
    if (this.iTimer > 0) ctx.globalAlpha = this.iTimer % 10 < 5 ? .7 : 1; 
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.theta);
    ctx.fillStyle = "lime";
    ctx.fillRect(-10, -10, 20, 20);
    ctx.restore();
    ctx.globalAlpha = 1; 
  }
}

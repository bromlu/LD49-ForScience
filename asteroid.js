const asteroidInset = 10;

class Asteroid {
  constructor(theta) {
    this.dist = 1500 + uniRand(0, 100);
    this.lifetime = 0;
    this.theta = theta + asteroidAngleOffset;
    this.deadTimer = 10;
    this.numBits = 10;
    this.r = 20;

    this.rotation = 0;
  }

  get x() {
    const dx = this.dist * Math.cos(this.theta);
    return W/2 + dx;
  }
  
  get y() {
    const dy = this.dist * Math.sin(this.theta);
    return H/2 + dy;
  }

  draw(ctx) {
    if (this.deadTimer == 0) {
      return;
    }
    
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.r, 0, TAU);
    // ctx.fillStyle = "white";
    // ctx.fill();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(asteroidpic, -this.r, -this.r, 2*this.r, 2*this.r);
    ctx.restore();

    if (isOffscreen(this.x, this.y, 100)) {
      // warning sign
      if (this.lifetime % 30 > 10) { //blink
        ctx.beginPath();
        const wx = clamp(0, this.x, W-20);
        const wy = clamp(20, this.y, H-20);
        // ctx.arc(wx, wy, 20, 0, TAU);
        // ctx.fillStyle = "purple";
        // ctx.fill();
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "yellow";
        ctx.fillText("⚠", wx, wy);
      }
    }
  }

  update() {
    this.rotation += .01;

    if (this.dist > R - asteroidInset) {
      this.dist-= 10;
      this.lifetime += 1;
      return;
    }

    if (this.deadTimer > 0) {
      this.deadTimer --;
      if (this.deadTimer == 5) {
        // draw crack
        planetCtx.save();
        planetCtx.translate(W/2, H/2);
        planetCtx.rotate(this.theta + Math.PI / 2);
        planetCtx.drawImage(crackpic, -R, -R, 2*R, 2*R);
        planetCtx.restore();
      }

      if (this.deadTimer == 0) {
        this.explode();
      }
    }
  }

  explode() {
    crashsound.currentTime = 0;
    crashsound.play();
    camera.shake();

    for (let i = 0; i < this.numBits; i++) {
      const theta = this.theta + normRand(0.5)
      bits.push(new Bit(this.x, this.y, theta, 4 + normRand(1)));
    }

    const oppX = this.x - Math.cos(this.theta) * 1.5 * R
    const oppY = this.y - Math.sin(this.theta) * 1.5 * R
    for (let i = 0; i < this.numBits; i++) {
      const theta = this.theta + Math.PI + normRand(1)
      bits.push(new Bit(oppX, oppY, theta, 2 + uniRand(1, 6)));
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

function doAsteroidsSequence(asteroids, timer) {
  switch (timer) {
    case 60*60:
      asteroids.push(new Asteroid(2));
      break;
    case 55*60:
      asteroids.push(new Asteroid(1));
      break;
    case 50*60:
      asteroids.push(new Asteroid(0));
      asteroids.push(new Asteroid(0.5));
      asteroids.push(new Asteroid(1));
      break;
    default:
      break;
  }
}
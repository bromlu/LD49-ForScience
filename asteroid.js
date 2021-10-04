const crackpics = [
  crackpic,
  crack2pic,
  crack3pic
]
const asteroidInset = 10;

class Asteroid {
  constructor(theta) {
    this.dist = 1500 + uniRand(0, 100);
    this.lifetime = 0;
    this.theta = theta + asteroidAngleOffset;
    this.deadTimer = 10;
    this.numBits = 8;
    this.r = 20;

    this.rotation = TAU * Math.random();
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
        const wx = clamp(40, this.x, W-40);
        const wy = clamp(40, this.y, H-40);
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
        const randCrackPic = crackpics[Math.floor(Math.random() * crackpics.length)]
        planetCtx.save();
        planetCtx.translate(W/2, H/2);
        planetCtx.rotate(this.theta + Math.PI / 2);
        planetCtx.drawImage(randCrackPic, -R, -R, 2*R, 2*R);
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

    for (let i = 0; i < this.numBits / 2; i++) {
      const theta = this.theta + uniRand(-.3,.3);
      bits.push(new Bit(this.x, this.y, theta,  uniRand(1,4)));
    }

    const oppX = this.x - Math.cos(this.theta) * 1.5 * R
    const oppY = this.y - Math.sin(this.theta) * 1.5 * R
    for (let i = 0; i < this.numBits; i++) {
      const theta = this.theta + Math.PI + normRand(1)
      bits.push(new Bit(oppX, oppY, theta, 1 + uniRand(0, 7)));
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

    // 60-50
    case 60*60:
      asteroids.push(new Asteroid(3));
      break;
    case 55*60:
      asteroids.push(new Asteroid(2));
      break;
    case 50*60:
      asteroids.push(new Asteroid(.6));
      break;

    // 50-40
    case 50*60:
      asteroidAngleOffset = TAU * Math.random();
      asteroids.push(new Asteroid(.6));
      break;
    case 48*60:
      asteroids.push(new Asteroid(3));
      break;
    case 46*60:
      asteroids.push(new Asteroid(2));
      break;
    case 44*60:
      asteroids.push(new Asteroid(1.2));
      break;
    case 43*60:
      asteroids.push(new Asteroid(5));
        break;
    // 40-30
    case 40*60:
      asteroidAngleOffset = TAU * Math.random();
      asteroids.push(new Asteroid(0));
      break;
    case 39*60:
      asteroids.push(new Asteroid(5));
      break;
    case 38*60:
      asteroids.push(new Asteroid(6));
      break;
    case 37*60:
      asteroids.push(new Asteroid(4));
      break;
    case 33*60:
      asteroids.push(new Asteroid(1));
      asteroids.push(new Asteroid(2));
      break;
    case 32*60:
      asteroids.push(new Asteroid(1.5));
      asteroids.push(new Asteroid(2.5));
      break;
    case 31*60:
      asteroids.push(new Asteroid(4));
      asteroids.push(new Asteroid(5.5));
        break;
    // 30-20
    case 26*60:
      asteroidAngleOffset = TAU * Math.random();
      asteroids.push(new Asteroid(1.5));
      break;
    case 1555:
      asteroids.push(new Asteroid(3));
      break;
    case 1440:
      asteroids.push(new Asteroid(4.5));
    case 1400:
      asteroids.push(new Asteroid(4.1));
      asteroids.push(new Asteroid(1));
      break;
    case 1320:
      asteroids.push(new Asteroid(4));
      break;
    case 1315:
      asteroids.push(new Asteroid(3.5));
      break;
    // 20 - 10
    case 1200:
    case 1140:
    case 1080:
    case 1020:
    case 960:
      asteroidAngleOffset = TAU * Math.random();
      asteroids.push(new Asteroid(0));
    break;


    // last 10 seconds
    case 600:
      asteroidAngleOffset = TAU * Math.random();
      asteroids.push(new Asteroid(0));
      break;
    case 595:
      asteroids.push(new Asteroid(.5));
      break;
    case 590:
      asteroids.push(new Asteroid(1));
      break;
    case 575:
      asteroids.push(new Asteroid(.7));
      break;
    case 572:
      asteroids.push(new Asteroid(.4));
      break;
    case 570:
      asteroids.push(new Asteroid(.2));
      break;
    case 500:
      asteroids.push(new Asteroid(0.1));
      break;
    case 470:
      asteroids.push(new Asteroid(2));
      asteroids.push(new Asteroid(4.5));
      break;
    case 450:
      asteroids.push(new Asteroid(4));
      asteroids.push(new Asteroid(2.5));
      break;
    default:
      break;
  }
}
const States = {
  PLAYING: 0,
  PAUSED: 0,
}

let gameState = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const W = 1000;
const H = 1200;
let planet;
let player;
let camera;


function startGame() {
  planet = new Planet();
  player = new Player(cursor.x, cursor.y);
  camera = new Camera();
  airCan = new AirCanister();
  
  tick();
}

function tick() {
  update();
  draw();
  if (gameState == States.PLAYING) {
    requestAnimationFrame(tick);
  }
}

sequenceTimer = 3660
function update() {
  planet.update();
  player.update();
  airCan.update(player);

  camera.update();

  asteroids.forEach(a => a.update());
  bits.forEach(b => b.update());
  doAsteroidsSequence(asteroids, sequenceTimer);
  sequenceTimer --;

  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i];
    if (isOffscreen(bit.x, bit.y, 100)) {
      bits.splice(i--, 1);
    }
  }
  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];
    if (asteroid.deadTimer == 0) {
      asteroids.splice(i--, 1);
    }
  }
}

function draw() {
  ctx.save();
  camera.moveCtx(ctx);
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0, W, H);
  asteroids.forEach(a => a.draw(ctx))
  bits.forEach(b => b.draw(ctx));

  planet.draw(ctx);

  player.draw(ctx);
  airCan.draw(ctx);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "yellow";
  ctx.font = "50px sans-serif";
  ctx.fillText(Math.floor(sequenceTimer / 60), W/2, H/2);

  ctx.fillStyle = "cyan";
  ctx.fillRect(0, 0, player.air, 10)
  ctx.restore();
}

startGame();
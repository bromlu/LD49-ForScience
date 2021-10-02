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

function startGame() {
  planet = new Planet();
  player = new Player(cursor.x, cursor.y);
  // asteroids[0] = new Asteroid(0);
  // asteroids[1] = new Asteroid(1);
  // asteroids[2] = new Asteroid(2);
  
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

  asteroids.forEach(a => a.update());
  bits.forEach(b => b.update());
  doAsteroidsSequence(asteroids, sequenceTimer);
  sequenceTimer --;
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0, W, H);
  asteroids.forEach(a => a.draw(ctx))
  bits.forEach(b => b.draw(ctx));

  planet.draw(ctx);

  player.draw(ctx);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "yellow";
  ctx.font = "50px sans-serif";
  ctx.fillText(Math.floor(sequenceTimer / 60), W/2, H/2);

}

startGame();
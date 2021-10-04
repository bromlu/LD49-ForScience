const States = {
  MENU: 0,
  PLAYING: 1,
  DYING: 2,
  PAUSED: 3,
}

let gameState = States.MENU;

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
  gameState = States.PLAYING;
  sequenceTimer = 3660
  
  tick();
}

function tick() {
  update();
  draw();
  if (gameState == States.PLAYING || gameState == States.DYING) {
    requestAnimationFrame(tick);
  }
}

sequenceTimer = 3660
deathTimer = 100
function update() {
  if (gameState == States.PLAYING) {
    camera.update();
    planet.update();
    player.update();
    if (player.air <= 0) {
      camera.startZoom(() => {
        gameState = States.DYING;
        // play death sound
      })
    }
    airCan.update(player);

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
  } else if (gameState == States.DYING) {
    player.alpha = clamp(0, player.alpha - .01, 1);
    if (player.alpha == 0) {
      gameState = States.MENU;
      ctx.clearRect(0,0, W, H);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "yellow";
      ctx.font = "50px sans-serif";
      ctx.fillText("Click to Start!", W/2, H*3/4);
    }
  }
}

function draw() {
  if (gameState == States.MENU) return;

  ctx.clearRect(0,0, W, H);
  
  ctx.save();
  camera.moveCtx(ctx);
  ctx.drawImage(backpic, 0,0);
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

  if (player.iTimer > 0) ctx.globalAlpha = player.iTimer % 15 < 10 ? .8 : 1; 
  ctx.fillRect(0, 0, player.air, 20)
  ctx.globalAlpha = 1;

  ctx.restore();
}

ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "yellow";
ctx.font = "50px sans-serif";
ctx.fillText("Click to Start!", W/2, H*3/4);


canvas.addEventListener("mousedown", (e) => {
  if (gameState == States.MENU && cursor.y > H*3/5) {
    startGame();
  }
});
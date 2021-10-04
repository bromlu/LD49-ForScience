const States = {
  MENU: 0,
  PLAYING: 1,
  DYING: 2,
  WINNING: 3,
}

let gameState = States.MENU;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const W = 1000;
const H = 1200;
let planet;
let player;
let camera;

sequenceTimer = 3660
deathTimer = 100
winTimer = 100;
wins = 0;

function startGame() {
  bits = [];
  asteroids = [];
  airCan = {};
  planet = new Planet();
  player = new Player(cursor.x, cursor.y);
  camera = new Camera();
  airCan = new AirCanister();
  gameState = States.PLAYING;
  sequenceTimer = 3660
  deathTimer = 100
  winTimer = 100
  
  tick();
}

function tick() {
  update();
  draw();
  if (gameState == States.PLAYING || gameState == States.DYING || gameState == States.WINNING) {
    requestAnimationFrame(tick);
  }
}

function update() {
  if (gameState == States.PLAYING) {
    if (sequenceTimer == 0 && player.air > 0) {
      gameState = States.WINNING;
      camera.startZoom()
      return;
    }
    camera.update();
    planet.update();
    player.update();
    if (player.air <= 0) {
      camera.startZoom(() => {
        gameState = States.DYING;
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
    player.iTimer = 0;
    if (player.alpha == 1) {
      deathsound.play();
    }
    player.alpha = clamp(0, player.alpha - .01, 1);
    if (player.alpha == 0) {
      gameState = States.MENU;
      ctx.clearRect(0,0, W, H);
      ctx.drawImage(backpic, 0,0);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "yellow";
      ctx.font = "bold 50px sans-serif";
      ctx.fillText("Try Again!", W/2, H*3/4);
      ctx.font = "bold 60px serif";
      ctx.fillStyle = "#4C88FF";
      ctx.fillText("Dying Planet", W/2, H/4);
      ctx.fillStyle = "#9B7653";
      ctx.fillText("Dying Planet", W/2+2, H/4 + 2);
      ctx.fillStyle = "#689A10";
      ctx.fillText("Dying Planet", W/2+4, H/4 - 4);
    }
  } else if (gameState == States.WINNING) {
    winTimer--;
    camera.update();
    if (winTimer == 0) {
      ctx.save();
      camera.moveCtx(ctx);    
      player.drawWin(ctx)
      ctx.restore();

      // play win sound
      clinksound.currentTime = 0;
      clinksound.play();

      winTimer = 100;
      wins++;
      gameState = States.MENU;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "yellow";
      ctx.font = "bold 50px sans-serif";
      ctx.fillText("Continue to next planet?", W/2, H*3/4);

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

  
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "yellow";
  ctx.font = "bold 50px sans-serif";
  ctx.fillText(Math.floor(sequenceTimer / 60), W/2, H/2);
  player.draw(ctx);
  airCan.draw(ctx);

  
  if (player.iTimer > 0) ctx.globalAlpha = player.iTimer % 15 < 10 ? .8 : 1; 
  else if (airCan.airTimer > 0) ctx.globalAlpha = airCan.airTimer % 15 < 10 ? .8 : 1; 
  ctx.fillStyle = "cyan";
  ctx.fillRect(0, 0, player.air-30, 20);
  ctx.fillStyle = "black"
  ctx.font = "bold 16px sans-serif";
  ctx.fillText("Oxygen", 40, 12);
  if (player.air < 250) {
    ctx.globalAlpha = player.air % 10 < 3 ? .8 : .6; 
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, player.air-30, 20)
    //critical flash
  } 
  ctx.globalAlpha = 1;

  ctx.restore();
}

ctx.drawImage(backpic, 0,0);
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "yellow";
ctx.font = "bold 50px sans-serif";
ctx.fillText("Click to Start!", W/2, H*3/4);
ctx.font = "bold 60px serif";
ctx.fillStyle = "#4C88FF";
ctx.fillText("Dying Planet", W/2, H/4);
ctx.fillStyle = "#9B7653";
ctx.fillText("Dying Planet", W/2+2, H/4 + 2);
ctx.fillStyle = "#689A10";
ctx.fillText("Dying Planet", W/2+2, H/4 - 2);


canvas.addEventListener("mousedown", (e) => {
  if (gameState == States.MENU && cursor.y > H*3/5) {
    startGame();
  }
});

canvas.addEventListener("click", (e) => {
  if (gameState == States.MENU && cursor.y > H*3/5) {
    startGame();
  }
});
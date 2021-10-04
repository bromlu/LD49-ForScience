cursor = {x: -1, y: -1};

canvas.addEventListener("mousemove", (e) => {
  const pt = getCanvasXY(e);
  cursor.x = pt[0];
  cursor.y = pt[1];
});

canvas.ontouchstart = canvas.ontouchmove = e => {
  e.preventDefault();
  let touch = e.touches[0];
  const pt = getCanvasXYFromTouch(touch);
  cursor.x = pt[0];
  cursor.y = pt[1];
  if (gameState == States.MENU && cursor.y > H*3/5) {
    startGame();
  }
}


function getCanvasXY(e) {
  const x = Math.round((e.offsetX * canvas.width) / canvas.clientWidth);
  const y = Math.round((e.offsetY * canvas.height) / canvas.clientHeight);
  return [x, y];
}

function getCanvasXYFromTouch(touch) {
  const x = Math.round((touch.clientX - canvas.offsetLeft) * canvas.width / canvas.clientWidth);
  const y = Math.round((touch.clientY - canvas.offsetTop) * canvas.height / canvas.clientHeight);
  return [x, y];
}
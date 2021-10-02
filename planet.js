planetCanvas = document.createElement("canvas");
planetCtx = planetCanvas.getContext("2d");
planetCanvas.width = W;
planetCanvas.height = H;
// document.body.appendChild(planetCanvas)

class Planet {
  constructor() {
    this.color = "red";

    planetCtx.clearRect(0, 0, W, H);
    planetCtx.beginPath();
    planetCtx.arc(W/2, H/2, R, 0, TAU);
    planetCtx.fillStyle = this.color
    planetCtx.fill();
    console.log(planetCanvas);
  }

  draw(ctx) {
    ctx.drawImage(planetCanvas, 0, 0);
  }

  update() {

  }

  contains(x, y) {
    const dx = W / 2 - x;
    const dy = H / 2 - y;
    const distsq = dx * dx + dy * dy;
    return distsq <= R * R;
  }
}
planetCanvas = document.createElement("canvas");
planetCtx = planetCanvas.getContext("2d");
planetCanvas.width = W;
planetCanvas.height = H;

class Planet {
  constructor() {
    this.color = "red";

    planetCtx.clearRect(0, 0, W, H);
    planetCtx.beginPath();
    // planetCtx.arc(W/2, H/2, R, 0, TAU);
    planetCtx.drawImage(planet1pic, W/2 - R, H/2 - R, 2*R, 2*R)
    planetCtx.fillStyle = this.color
    planetCtx.fill();
  }

  draw(ctx) {
    ctx.drawImage(planetCanvas, 0, 0);
  }

  update() {

  }

  contains(x, y, padding = 0) {
    const dx = W / 2 - x;
    const dy = H / 2 - y;
    const distsq = dx * dx + dy * dy;
    let r = R + padding;
    return distsq <= r * r;
  }
}
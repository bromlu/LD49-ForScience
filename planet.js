planetCanvas = document.createElement("canvas");
planetCtx = planetCanvas.getContext("2d");
planetCanvas.width = W;
planetCanvas.height = H;

class Planet {
  constructor() {

    planetCtx.clearRect(0, 0, W, H);

    planetCtx.save();
    planetCtx.translate(W/2, H/2);
    planetCtx.rotate(TAU * Math.random());
    planetCtx.drawImage(planet1pic, -R, -R, 2*R, 2*R);
    planetCtx.restore();
    

    for (let i = 0; i < wins && i < 4; i++) {
      planetCtx.globalCompositeOperation = "source-atop"
      planetCtx.globalAlpha = .3;
      planetCtx.fillStyle = Math.random() < .5 ? "red" : "blue";
      planetCtx.fillRect(0,0,W,H);
      planetCtx.globalAlpha = 1;
      planetCtx.globalCompositeOperation = "source-over"

    }
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
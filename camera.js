class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xShakeFactor = 0;
    this.yShakeFactor = 0;
    this.xShakeSeed = 0;
    this.yShakeSeed = 0;
    this.xAnchor = 0;
    this.yAnchor = 0;
    this.xShakeOffset = 0;
    this.yShakeOffset = 0;

    this.scale = 1;
    this.scaleGoal = 1;

    this.tracking = false;

    this.zoomCallback = null;
  }

  update() {
    let viewW = W / this.scale;
    let viewH = H / this.scale;
    if (this.tracking) {
      this.xAnchor = player.x - viewW/2;
      this.yAnchor = player.y - viewH/2;
    } else {
      this.xAnchor = 0;
      this.yAnchor = 0;
    }
    if (this.xShakeFactor > 0)  {
      let now = Date.now();
      this.xShakeOffset = this.xShakeFactor * Math.sin(this.xShakeSeed-now);
      this.yShakeOffset = this.yShakeFactor * Math.cos(this.yShakeSeed-now);
      this.xShakeFactor *= .9;
      this.yShakeFactor *= .9;

      if (this.xShakeFactor < .5) {
        this.xShakeFactor = 0;
        this.yShakeFactor = 0;
      }
    }

    let dx = this.xAnchor - this.x;
    let dy = this.yAnchor - this.y;
    if (Math.abs(dx) > 20) this.x += clamp(-20, dx, 20);
    else this.x = this.xAnchor;
    if (Math.abs(dy) > 20) this.y += clamp(-20, dy, 20);
    else this.y = this.yAnchor;
    
    let ds = this.scaleGoal - this.scale;
    if (Math.abs(this.scale - this.scaleGoal) > .03) this.scale += clamp(-.03, ds, .03);
    else {
      this.scale = this.scaleGoal;
      if (this.zoomCallback) {
        this.zoomCallback();
        this.zoomCallback = null;
      }
    }
  }

  startZoom(zoomCallback) {
    this.scaleGoal = 6;
    this.tracking = true;
    this.zoomCallback = zoomCallback;
  }

  resetZoom() {
    this.scaleGoal = 1;
    this.tracking = false;
  }

  shake() {
    let z1 = (Math.random() - Math.random()) * 2;
    let z2 = (Math.random() - Math.random()) * 2;
    this.xShakeFactor = 10 + z1;
    this.yShakeFactor = 10 + z2;
    let rand = Math.random();
    this.xShakeSeed = rand * TAU;
    this.yShakeSeed = rand * TAU;
  }

  moveCtx(ctx) {
    ctx.scale(this.scale, this.scale);
    ctx.translate(-Math.round(this.x + this.xShakeOffset), -Math.round(this.y + this.yShakeOffset));
  }
}
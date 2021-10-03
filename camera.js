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

    this.scale = 1;
    this.scaleGoal = 1;
  }

  update() {
    if (this.xShakeFactor > 0)  {
      let now = Date.now();
      this.x = this.xAnchor + this.xShakeFactor * Math.sin(this.xShakeSeed-now);
      this.y = this.yAnchor + this.yShakeFactor * Math.cos(this.yShakeSeed-now);
      this.xShakeFactor *= .9;
      this.yShakeFactor *= .9;

      if (this.xShakeFactor < .5) {
        this.xShakeFactor = 0;
        this.yShakeFactor = 0;
        this.x = 0;
        this.y = 0;
        this.xAnchor = 0;
        this.yAnchor = 0;
      }
    }

    // if (Math.abs(scale - scaleGoal))
  }

  startZoom() {

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
    ctx.translate(-Math.round(this.x), -Math.round(this.y));
  }
}
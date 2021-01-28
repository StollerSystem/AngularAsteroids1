function Dust(pos, vel, trans, color, weight) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(random(0.5, 1.5)));
  this.transparency = 1
  this.color = color ? color : 1;
  this.weight = weight ? weight : 2;

  this.update = function () {
    this.pos.add(this.vel);
    this.trans = trans ? trans : .005;
    this.transparency -= this.trans;
  }

  this.render = function () {
    if (this.transparency > 0) {
      push();
      // if (this.color === "main") {
      //   stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},${this.transparency})`);
      // } else {
      //   stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${this.transparency})`);
      // }
      switch (color) {
        case 1:
          stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},${this.transparency})`);
          break;
        case 2:
          stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${this.transparency})`);
          break;
        case 3:
          stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},${this.transparency})`);
          break;
        default:
          stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},${this.transparency})`);
          break;
      }
      strokeWeight(random(1, this.weight));
      point(this.pos.x, this.pos.y);
      pop();
    }
  }
}

function addDust(pos, vel, n, trans, color, weight) {
  for (var i = 0; i < n; i++) {
    dust.push(new Dust(pos, vel, trans, color, weight));
  }
}

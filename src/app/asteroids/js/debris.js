function Debris(pos, vel, n, r) {

  this.destroyFrames = 1300;
  this.r = r
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.debrisParts = [];

  for (var i = 0; i < n; i++)
    this.debrisParts[i] = {
      pos: this.pos.copy(),
      vel: this.vel.copy().add(p5.Vector.random2D().mult(random(1,1.5))),
      heading: random(0, 360),
      rot: random(-0.2, 0.2),
      len: random(.05,.5)
    };

  // console.log(this.debrisParts)

  this.update = function () {
    // console.log("check")
    for (var i = 0; i < this.debrisParts.length; i++) {
      this.debrisParts[i].pos.add(this.debrisParts[i].vel);
      this.debrisParts[i].heading += this.debrisParts[i].rot;
    }
  }

  this.render = function ()  {
    
    // console.log("check")
    for (var i = 0; i < this.debrisParts.length; i++) {
      // ellipse(this.r,this.r,10)
      push();
      let transNum = (1 * ((this.destroyFrames--) / 1000))
      let trans = transNum > 0 ? transNum : 0;
      stroke(`rgba(${rgbColor4[0]},${rgbColor4[1]},${rgbColor4[2]},${trans})`);
      strokeWeight(random(1,2.5))
      var d = this.debrisParts[i];
      translate(d.pos.x, d.pos.y);
      rotate(d.heading);
      
      line(-this.r * d.len, -this.r * d.len, this.r * d.len, this.r * d.len);
      pop();
    }
  }

}

function addDebris(pos, vel, n, r) {  
  debris.push(new Debris(pos, vel, n, r));  
  // console.log(debris)
}
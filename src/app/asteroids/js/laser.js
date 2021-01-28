function Laser(spos, svel, angle) {  
  
  Entity.call(this, spos.x, spos.y, 4);
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);
  this.vel.add(svel);  

  this.render = function () {
    // laser bolt
    push();
    var trans = random(1, .8)
    stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
    strokeWeight(this.r*1.5);
    point(this.pos.x, this.pos.y);
    pop();
    // glow effect
    push();
    var size = this.r * (random(2, 10))
    var trans2 = random(.6, .1)
    stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans2}) `);
    strokeWeight(size);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.playSoundEffect = function (sound) {
    sound.play();    
  }

  this.hits = function (asteroid) {
    // Evaluate if the asteroid was hit based on the range of the laser if one
    // of these conditions hold, then there is no need to check that the laser
    // intersected the asteroid.
    dist2 = (this.pos.x - asteroid.pos.x) * (this.pos.x - asteroid.pos.x)
      + (this.pos.y - asteroid.pos.y) * (this.pos.y - asteroid.pos.y);
    if (dist2 <= asteroid.rmin2) {
      return true;
    }
    if (dist2 >= asteroid.rmax2) {
      return false;
    }

    // Evaluate if the laser intersected the asteroid, hit detection is
    // evaluated based on hitting the line between adjacent vertices as these
    // are the edges that form the asteroid.
    var last_pos = p5.Vector.sub(this.pos, this.vel);
    var asteroid_vertices = asteroid.vertices();
    for (var i = 0; i < asteroid_vertices.length - 1; i++) {
      if (lineIntersect(last_pos,
        this.pos,
        asteroid_vertices[i],
        asteroid_vertices[i + 1])) {
        return true;
      }
    }
    if (lineIntersect(last_pos,
      this.pos,
      asteroid_vertices[0],
      asteroid_vertices[asteroid_vertices.length - 1])) {
      return true;
    }
    return false;
  }

  this.offscreen = function () {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
}

Laser.prototype = Object.create(Entity.prototype);
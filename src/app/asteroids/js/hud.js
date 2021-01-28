function Hud() {
  var size = 20;
  var padding = 10;
  var lifeWidth = 20;

  // digitMaps is used to create line representations of digits 0 through 9,
  // the diagram below indicates the mapping of the digitMaps array index to
  // its visual line.
  /*
   --0--
   1   2
   --3--
   4   5
   --6--
  */
  var digitMaps = [
    // Return a digit map
    [true, true, true, false, true, true, true], //0
    [false, false, true, false, false, true, false], //1
    [true, false, true, true, true, false, true], //2
    [true, false, true, true, false, true, true], //3
    [false, true, true, true, false, true, false], //4
    [true, true, false, true, false, true, true], //5
    [true, true, false, true, true, true, true], //6
    [true, false, true, false, false, true, false], //7
    [true, true, true, true, true, true, true], //8
    [true, true, true, true, false, true, true] //9

  ];

  this.render = function () {
    var scoreString = "" + score;
    var x = (width - (scoreString.length * (size + padding))) / 2;
    var digitPos = createVector(x, padding);
    for (var i = 0; i < scoreString.length; i++) {
      var dmap = digitMaps[scoreString.charAt(i)];
      drawDigit(dmap, i, digitPos);
      digitPos.x += size + padding;
    }

    drawLives();

    if (lives < 0) {
      push();
      textSize(150);
      textFont(mainFont)
      stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
      strokeWeight(random(1,1.5))
      fill(0);
      text("GAME OVER!", (width / 2) - 300, height / 2);
      pop();
    }

    if (title) {
      push();
      textSize(25);
      textFont(mainFont)
      stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
      strokeWeight(random(1,1.5))
      fill(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
      text("'UP_ARROW: FORWARD THRUST' - 'LEFT/RIGHT_ARROW: ROTATIONAL THRUST' - 'SPACE_BAR: BLASTER'", (width / 2 -410) , height / 3 +50);
      pop();

      push();
      stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
      strokeWeight(random(1,1.5))
      translate((width / 2) - 575, height / 3);      
      noFill();
      let rotX = sin(frameCount / 20) * 10;
      let rotY = cos(frameCount / 20) * 10;
      for (let i = 0; i < pts.length; i++) {
        line(pts[i].x, pts[i].y, pts[i].x - rotX, pts[i].y - rotY);
      }
      textFont(mainFont);
      textSize(200);
      text('ASTRO-BLASTER', 0, 0);
      fill(0);
      text('ASTRO-BLASTER', -rotX, -rotY);
      pop();
    }

    if (stageClear) {
      
      // if (!stageSoundEffect.isPlaying() && !soundPlayed) {        
      //   stageSoundEffect.play();
      // }

      push();
      textSize(100);
      textFont(mainFont)
      stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
      strokeWeight(random(2,3))
      fill(0);
      text(`STAGE ${level+1} CLEAR!`, (width / 2) - 250, height / 3);
      pop();
    }
  }

  function drawLives() {
    push();
    stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
    strokeWeight(random(1,1.5))
    fill(0);
    var top = createVector((width / 2) + lifeWidth * 2, padding * 2 + size * 2);
    for (var i = 0; i < lives; i++) {
      triangle(top.x, top.y,
        top.x - lifeWidth / 2, top.y + 25,
        top.x + lifeWidth / 2, top.y + 25);
      top.x -= 20 + padding;
    }
    pop();
  }

  //draws the digit based on the digit map
  function drawDigit(digitMap, index, pos) {
    push();
    stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
    strokeWeight(random(1,1.5))
    for (var i = 0; i < digitMap.length; i++) {
      if (digitMap[i] === true)
        drawLine(i, pos);
    }
    pop();
  }

  //draws a line based on the line map
  function drawLine(lineMap, pos) {
    switch (lineMap) {
      case 0:
        line(pos.x, pos.y, pos.x + size, pos.y);
        break;
      case 1:
        line(pos.x, pos.y, pos.x, pos.y + size);
        break;
      case 2:
        line(pos.x + size, pos.y, pos.x + size, pos.y + size);
        break;
      case 3:
        line(pos.x, pos.y + size, pos.x + size, pos.y + size);
        break;
      case 4:
        line(pos.x, pos.y + size, pos.x, pos.y + 2 * size);
        break;
      case 5:
        line(pos.x + size, pos.y + size, pos.x + size, pos.y + 2 * size);
        break;
      case 6:
        line(pos.x, pos.y + size * 2, pos.x + size, pos.y + 2 * size);
        break;
      default:
        console.log("line map is invalid");
        break;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.css']
})
export class AsteroidsComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    var ship;
    var asteroids = [];
    const green = 'rgb(0,255,0)';

    const sketch = (s) => {     

      s.setup = () => {
        s.createCanvas(s.windowWidth*.90, s.windowHeight*.90);
        ship = new Ship();
        for ( var i = 0;i < 8; i++) {
          asteroids.push(new Asteroid())
        };
      };

      s.draw = () => {
        s.background(0);
        ship.render();
        ship.turn();
        ship.update();
        ship.edges();        
        for (var i = 0; i < asteroids.length; i++) {
          asteroids[i].render();
          asteroids[i].update();
          asteroids[i].edges();          
        };
      };

      s.keyReleased = () => {
        ship.setRotation(0);
        ship.boosting(false);
      };

      s.keyPressed = () => {        
        if (s.keyCode == s.RIGHT_ARROW) {          
          ship.setRotation(0.1);
        } else if (s.keyCode == s.LEFT_ARROW) {
          ship.setRotation(-0.1);
        } else if (s.keyCode == s.UP_ARROW) {
          ship.boosting(true);
        };
      };


      function Ship() {
        this.pos = s.createVector(s.width / 2, s.height / 2)
        this.r = 25;
        this.heading = 0;
        this.rotation = 0;
        this.velocity = s.createVector(0, 0);
        this.isBoosting = false;

        this.boosting = function (b) {
          this.isBoosting = b;
        };

        this.update = function () {
          if (this.isBoosting) {
            this.boost();
          }
          this.pos.add(this.velocity);
          this.velocity.mult(0.99);
        };

        this.boost = function () {
          var force = p5.Vector.fromAngle(this.heading);
          force.mult(0.5);
          this.velocity.add(force)
        };

        this.render = function () {
          s.push();
          s.translate(this.pos.x, this.pos.y)
          s.rotate(this.heading + s.PI / 2)
          s.noFill();
          s.stroke(green);
          s.triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
          s.pop();
        };

        this.setRotation = function (a) {
          this.rotation = a;
        };

        this.turn = function () {
          this.heading += this.rotation;
        };

        this.edges = function() {
          if (this.pos.x > s.width + this.r) {
            this.pos.x = -this.r;
          } else if (this.pos.x < -this.r) {
            this.pos.x = s.width + this.r;
          }
      
          if (this.pos.y > s.height + this.r) {
            this.pos.y = -this.r;
          } else if (this.pos.y < -this.r) {
            this.pos.y = s.height + this.r;
          };
        };
      };

      function Asteroid() {
        this.pos = s.createVector(s.random(s.width), s.random(s.height))
        this.r = s.random(10, 100);
        this.vel = p5.Vector.random2D();
        this.total = s.floor(s.random(5, 20))
        this.offset = [];
        for (var i = 0; i < this.total; i++) {
          this.offset[i] = s.random(-10, 15)
        };
      
        this.update = function () {
          this.pos.add(this.vel)
        };
      
        this.edges = function() {
          if (this.pos.x > s.width + this.r) {
            this.pos.x = -this.r;
          } else if (this.pos.x < -this.r) {
            this.pos.x = s.width + this.r;
          }
      
          if (this.pos.y > s.height + this.r) {
            this.pos.y = -this.r;
          } else if (this.pos.y < -this.r) {
            this.pos.y = s.height + this.r;
          };
        };
      
        this.render = function () {
          s.push();
          s.stroke(green);
          s.noFill();
          s.translate(this.pos.x, this.pos.y);          
          s.beginShape();
          for (var i = 0; i < this.total; i++) {
            var angle = s.map(i, 0, this.total, 0, s.TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * s.cos(angle);
            var y = r * s.sin(angle);
            s.vertex(x, y)
          }
          s.endShape(s.CLOSE);
          s.pop();
        };
      };
    };

    let canvas = new p5(sketch);
  };
};
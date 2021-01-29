import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/ship.js';
import Asteroid from './js/asteroid.js';
import { input } from './js/input.js';

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.css']
})
export class AsteroidsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let ship: any;
    var hud: any
    var asteroids: any = [];
    var lasers: any = [];
    var laserSoundEffects: any = [];
    var explosionSoundEffects: any = [];
    var rocketSoundEffects: any = [];
    var stageSoundEffect: any;
    var dust: any = [];
    var canPlay: any = true;
    var shieldTime: any = 180;
    var rgbColor1: any;
    var rgbColor2: any;
    var rgbColor3: any;
    var boostStabilizer: any = 1;
    var mainFont: any;
    var pts: any;
    var title: any = true;
    var stageClear: any = false;
    var score: any = 0;
    var lives: any = 3;
    const points: any = [200, 100, 50, 25];
    var level: any = 0;


    const game = (g: any) => {

      g.preload = () => {
        rgbColor1 = [Math.round(g.random(0, 255)), Math.round(g.random(0, 255)), Math.round(g.random(0, 255))]
        rgbColor2 = [Math.round(g.random(0, 255)), Math.round(g.random(0, 255)), Math.round(g.random(0, 255))]
        rgbColor3 = [Math.round(g.random(0, 255)), Math.round(g.random(0, 255)), Math.round(g.random(0, 255))]
        console.log(rgbColor1)
        console.log(rgbColor2)
        console.log(rgbColor3)
      }

      g.setup = () => {
        g.createCanvas(g.windowWidth * .9, g.windowHeight * .9);
        ship = new Ship(g, shieldTime, rgbColor2, rgbColor3, title, score, lasers);
        spawnAsteroids();
      }

      g.draw = () => {
        //updates
        for (var i = lasers.length - 1; i >= 0; i--) {
          lasers[i].update();
          if (lasers[i].offscreen()) {
            // destroy lasers that go off screen.
            lasers.splice(i, 1);
            continue;
          }
        }

        ship.update();

        // Handles the round loss, destruction of ship and round restart when the
        // ship contacts an asteroid.
        for (var i = 0; i < asteroids.length; i++) {
          if (ship.hits(asteroids[i]) && canPlay) {
            canPlay = false;
            var dustVel = p5.Vector.add(ship.vel.mult(0.2), asteroids[i].vel);
            // addDust(ship.pos, dustVel, 15, .005, 3);
            ship.destroy();
            input.reset();
            // sounds - need to stop rocket sounds here
            ship.playSoundEffect(explosionSoundEffects);
            rocketSoundEffects[0].stop();
            rocketSoundEffects[1].stop();
            setTimeout(function () {
              lives--;
              if (lives >= 0) {
                ship = new Ship();
                canPlay = true;
              }
            }, 3000);
          }
          asteroids[i].update();
        }

        // renders
        g.background(0);
        ship.render();
        for (var i = 0; i < asteroids.length; i++) {
          asteroids[i].render();
        }
        for (var i = lasers.length - 1; i >= 0; i--) {
          lasers[i].render();
        }
      }

      const spawnAsteroids = function () {
        for (var i = 0; i < level + 1; i++) {
          asteroids.push(new Asteroid(null, null, 3, g, rgbColor1));
        }
      }
    };

    let canvas = new p5(game);
  };
};
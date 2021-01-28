import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/ship.js'

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

        // renders
        g.background(0);
        ship.render();
        for (var i = lasers.length - 1; i >= 0; i--) {
          lasers[i].render();
        }
      }
    };

    let canvas = new p5(game);
  };
};
class FlyingMonster {
  constructor(game, x, y) {
    Object.assign(this, {game, x, y})

    this.bullet = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_bullet.png");
    this.upSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_up.png");
    this.downSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_down.png");
    this.leftSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_left.png");
    this.rightSprite = ASSET_MANAGER.getAsset("./sprites/enemies/flying_monster/flying_monster_right.png");

    this.facing = "down"; // can be left, right, up, down
    this.state = "idle"; // can be idle, run, attack, death

    this.hp = 100;
    this.velocity = {x: 0, y : 0};

    this.bulletSpeed = 1;
    this.bulletRate = 150;
    this.bulletTimer = this.bulletRate;
    this.bulletSize = 30;

    this.animations = [];
    this.loadAnimations();
    this.updateBB();
  }

  loadAnimations() {
    this.animations["left idle"] = new Animator(this.leftSprite, 0, 0, 244, 358, 29, 0.05, 0, false, true);
    this.animations["left run"] = new Animator(this.leftSprite, 0, 358, 248, 281, 13, 0.03, 0, false, true);
    this.animations["left attack"] = new Animator(this.leftSprite, 0, 639, 292, 390, 25, 0.03, 0, false, true);
    this.animations["left death"] = new Animator(this.leftSprite, 0, 0, 1408, 517, 20, 0.03, 0, false, true); //very wrong

    this.animations["right idle"] = new Animator(this.rightSprite, 0, 0, 244, 358, 29, 0.05, 0, false, true);
    this.animations["right run"] = new Animator(this.rightSprite, 0, 358, 248, 281, 13, 0.03, 0, false, true);
    this.animations["right attack"] = new Animator(this.rightSprite, 0, 639, 292, 390, 25, 0.03, 0, false, true);
    this.animations["right death"] = new Animator(this.rightSprite, 0, 1408, 1408, 517, 20, 0.03, 0, false, true); //very wrong

    this.animations["up idle"] = new Animator(this.upSprite, 0, 0, 401, 374, 29, 0.05, 0, false, true);
    this.animations["up run"] = new Animator(this.upSprite, 0, 374, 401, 366, 13, 0.03, 0, false, true);
    this.animations["up attack"] = new Animator(this.upSprite, 0, 740, 449, 387, 25, 0.03, 0, false, true);
    this.animations["up death"] = new Animator(this.upSprite, 0, 1638, 516, 511, 16, 0.03, 0, false, true); //sprite height/y is cutting off

    this.animations["down idle"] = new Animator(this.downSprite, 0, 0, 405, 362, 29, 0.05, 0, false, true);
    this.animations["down run"] = new Animator(this.downSprite, 0, 362, 402, 372, 13, 0.03, 0, false, true);
    this.animations["down attack"] = new Animator(this.downSprite, 0, 734, 448, 366, 25, 0.03, 0, false, true); //shows next frame a bit
    this.animations["down death"] = new Animator(this.downSprite, 0, 1475, 512, 511, 16, 0.03, 0, false, true);


  }

  updateBB() {
    this.lastBB = this.BB;
    if (this.facing === "down") {
      this.BB = new BoundingBox(this.x + 30, this.y + 8, 60, 60);
    }
  }

  fourBulletAtk() { //testing. will be used for boss attacks
    this.game.addEntity(new Bullet(this.game, this.x + 35, this.y + 70, this.bulletSize, this.x + 35, this.y + 80, this.bulletSpeed, this.bullet)); //down
    this.game.addEntity(new Bullet(this.game, this.x + 35, this.y - 43, this.bulletSize, this.x + 35, this.y - 50, this.bulletSpeed, this.bullet)); //up
    this.game.addEntity(new Bullet(this.game, this.x - 20 , this.y + 12, this.bulletSize, this.x - 30, this.y + 12, this.bulletSpeed, this.bullet));//left
    this.game.addEntity(new Bullet(this.game, this.x + 90, this.y + 12, this.bulletSize, this.x + 100, this.y + 12, this.bulletSpeed, this.bullet));//right
  }

  eightBulletAtk() {
    this.game.addEntity(new Bullet(this.game, this.x + 35, this.y + 70, this.bulletSize, this.x + 35, this.y + 80, this.bulletSpeed, this.bullet)); //down
    this.game.addEntity(new Bullet(this.game, this.x + 35, this.y - 43, this.bulletSize, this.x + 35, this.y - 50, this.bulletSpeed, this.bullet)); //up
    this.game.addEntity(new Bullet(this.game, this.x - 20 , this.y + 12, this.bulletSize, this.x - 30, this.y + 12, this.bulletSpeed, this.bullet));//left
    this.game.addEntity(new Bullet(this.game, this.x + 90, this.y + 12, this.bulletSize, this.x + 100, this.y + 12, this.bulletSpeed, this.bullet));//right
    this.game.addEntity(new Bullet(this.game, this.x  + 40 + 55 * cos((3 * PI) / 4), this.y + 18 - 55 * sin((3 * PI) / 4), this.bulletSize, this.x + 40 + 100 * cos((3 * PI) / 4), this.y + 18 - 100 * sin((3 * PI) / 4), this.bulletSpeed, this.bullet)); //up left
    this.game.addEntity(new Bullet(this.game, this.x + 40 + 55 * cos((3 * PI) / 4), this.y + 29 + 55 * sin((3 * PI) / 4), this.bulletSize, this.x + 40 + 100 * cos((3 * PI) / 4), this.y + 29 + 100 * sin((3 * PI) / 4), this.bulletSpeed, this.bullet)); //down left
    this.game.addEntity(new Bullet(this.game, this.x + 51 + 55 * cos((PI) / 4), this.y + 29 + 55 * sin((PI) / 4), this.bulletSize, this.x + 51 + 100 * cos((PI) / 4), this.y + 29 + 100 * sin((PI) / 4), this.bulletSpeed, this.bullet)); //down right
    this.game.addEntity(new Bullet(this.game, this.x + 51 + 55 * cos((PI) / 4), this.y + 17 - 55 * sin((PI) / 4), this.bulletSize, this.x + 51 + 100 * cos((PI) / 4), this.y + 17 - 100 * sin((PI) / 4), this.bulletSpeed, this.bullet)); //up right
  }

  singleBulletAtlk() {
    if (this.facing === "down") {
      this.game.addEntity(new Bullet(this.game, this.x + 35, this.y + 70, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, this.bullet));
    } else if (this.facing === "up") {
      this.game.addEntity(new Bullet(this.game, this.x + 35, this.y - 43, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, this.bullet));
    } else if (this.facing === "left") {
      this.game.addEntity(new Bullet(this.game, this.x - 20 , this.y + 12, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, this.bullet));
    } else if (this.facing === "right") {
      this.game.addEntity(new Bullet(this.game, this.x + 90, this.y + 12, this.bulletSize, this.game.camera.player.x, this.game.camera.player.y, this.bulletSpeed, this.bullet));
    }
  }

  shotgunAttack() {
  //  let slope =  (this.game.player.y - this.y) / (this.game.player.x - this.x);
    //console.log(this.game.player.y , this.game.player.x, this.x, this.y);
    //slope = slope * PI / 180;
  //  let slope = atan2(this.game.player.x - this.x, this.game.player.y - this.y)
    //this.game.addEntity(new Bullet(this.game, this.x + 200 + 150 * cos(angleRads), this.y + 125 - 150 * sin(angleRads), 5, this.x + 200 + 200 * cos(angleRads), this.y + 125 - 200 * sin(angleRads), 5, this.bullet)); //up left
  //  console.log(slope);

  }



  update() {
    if ((this.game.keys["w"])) {
        this.facing = "up";
    }
    if ((this.game.keys["s"])) {
        this.facing = "down";
    }
    if ((this.game.keys["a"])) {
        this.facing = "left";
    }
    if ((this.game.keys["d"])) {
        this.facing = "right";
    }
    if ((this.game.keys["ArrowUp"])) {
        this.state = "idle";
    }
    if ((this.game.keys["ArrowDown"])) {
        this.state = "attack";
    }
    if ((this.game.keys["ArrowRight"])) {
        this.state = "run";
    }
    /*
    if (this.game.player.y < this.y) { //up
       this.facing = "up";
    } else if (this.game.player.y >= this.y) { //down
      this.facing = "down";
    }
     if (this.game.player.x > this.x) { //right
      this.facing = "right";
    } else { //left
      this.facing = "left";
  }
  */
    //  this.figureOutShootDirection();
    //shoots at player when close
    if (getDistance(this.x, this.y, this.game.player.x, this.game.player.y) < 10000) {
      if (this.bulletTimer <= 0) {
        let ran = randomInt(3)
        if (ran === 0) {
          this.singleBulletAtlk();
        } else if (ran === 1) {
          this.fourBulletAtk();
        } else {
          this.eightBulletAtk();
        }
      this.shotgunAttack();
        this.bulletTimer = this.bulletRate;
        this.animations[this.facing + " " + this.state].flag = true;
      }
    }
    //shooting cooldown counter
    if (this.bulletTimer <= this.bulletRate) {
      this.bulletTimer--;
    }

    this.updateBB();
  }


  draw(ctx) {
  // offsets for x and y since images are different sizes

    if (this.facing === "left") {
        if (this.state === "idle") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 28, this.y + 2, .3);
      } else if (this.state === "run") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 26, this.y - 3, .3);
      } else if (this.state === "attack") {
          this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x +20, this.y - 37, .3);
      }
    } else if (this.facing === "right") {
      if (this.state === "idle") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 19, this.y, .3);
      } else if (this.state === "run") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 20, this.y - 5, .3);
      } else if (this.state === "attack") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 12, this.y - 39, .3);
      }
    } else if (this.facing === "up") {
      if (this.state === "idle" || this.state === "run") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y - 3, .3);
      } else if (this.state === "attack") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x - 8, this.y - 8, .3);
      }
    } else if (this.facing === "down") {
      if (this.state === "idle" || this.state === "run" || this.state === "attack") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y, .3);
      }
    }


  //}

  /*
  if (this.facing === "left") {
      if (this.state === "idle" || this.state === "run") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 90, this.y + 2, 1);
    } else if (this.state === "attack") {
        this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 67, this.y -135, 1);
    }
  } else if (this.facing === "right") {
    if (this.state === "idle") {
      this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 55, this.y, 1);
    } else if (this.state === "run") {
      this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 65, this.y - 10, 1);
    } else if (this.state === "attack") {
      this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x + 45, this.y - 130, 1);
    }
  } else if (this.facing === "up") {
    if (this.state === "idle" || this.state === "run") {
      this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y, 1);
    } else if (this.state === "attack") {
      this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x - 25, this.y - 28, 1);
    }
  } else if (this.facing === "down") {
    if (this.state === "idle" || this.state === "run" || this.state === "attack") {
      this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx,this.x, this.y, 1);
    }
  }
  */
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = 'Red';
      ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
    //ctx.strokeStyle = 'Blue';
    //ctx.strokeRect(this.x + 200, this.y + 125, 100, 100);
  }
}

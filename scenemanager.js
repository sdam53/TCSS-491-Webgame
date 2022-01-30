class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        // this.score = 0;
        // this.coins = 0;

        this.hp_bar = ASSET_MANAGER.getAsset("./sprites/player/hp_bar.png");
        this.gear = ASSET_MANAGER.getAsset("./sprites/tiles/gear.png");
        this.player = new Player(this.game, 100, 100);
        this.game.entities.player = this.player;
        this.titleMusicPath = "./music/title.mp3";
        this.titleBackground = ASSET_MANAGER.getAsset("./images/title.png");
        this.logo = ASSET_MANAGER.getAsset("./images/logo.png");
        this.creditsBackground = ASSET_MANAGER.getAsset("./images/credits.jpg");

        this.title = true;
        this.transition = false;
        this.credits = false;
        this.gameOver = false;
        // this.ground = new Ground(this.game,0,0, 1400, 800, "");
        this.loadLevel(this.title, false);
        this.death = new Animator(this.game.player.spritesheet10, 0, 0, 369, 454, 18, 0.05, 0, false, false);

    }

    clearEntities() {
      this.game.entities.enemies.forEach(function (entity) {entity.removeFromWorld = true;});
      this.game.entities.bullets.forEach(function (entity) {entity.removeFromWorld = true;});
      //doing this way fixes a retry bug
      this.game.entities.tiles = []
      this.game.entities.portal.forEach(function (entity) {entity.removeFromWorld = true;});
      this.game.entities.powerup.forEach(function (entity) {entity.removeFromWorld = true;});
    };

    loadLevel(title, transition) {
      this.title = title;
      this.transition = transition;
      this.credits = false;
      let x = 0;
      let y = 0;
      if (!title && !this.gameOver) {
        for (let i = 0; i < MAPONE.MAP.length; i++) { //create level
          for (let j = 0; j < MAPONE.MAP[0].length; j++) {
            if (MAPONE.MAP[i][j] === 1) {
              this.game.addTile(new Ground(this.game, x, y, 125, 125, 1));
            } else if (MAPONE.MAP[i][j] === 0) {
              this.game.addTile(new Wall(this.game, x, y, 125, 125, 1));
            }
            x += 125;
          }
          x = 0;
          y += 125;
        }
      }
      //add player
       this.player = new Player(this.game, MAPONE.PLAYER[0] * 125, MAPONE.PLAYER[1] * 125);
       this.game.entities.player = this.player;

       if (!title && !transition && !this.gameOver) {
        this.game.addEnemy(new FlyingMonster(this.game, MAPONE.FLYINGMONSTER[0] * 125, MAPONE.FLYINGMONSTER[1] * 125));
        this.game.addPowerUp(new Gear(this.game, MAPONE.GEARS[0] * 125, MAPONE.GEARS[1] * 125));
        this.game.addPortal(new Portal(this.game, MAPONE.PORTAL[0] * 125, MAPONE.PORTAL[1] * 125))
       }

       if (!this.title && this.transition) {
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset(this.titleMusicPath);
     }
    }


    update() {
      let midpoint = PARAMS.CANVAS_WIDTH/2
      this.x = this.player.x - midpoint;
      if (this.game.player.hp <= 0 && this.game.player.animations["death"].frame === 17) this.gameOver = true;
      this.updateAudio();

      // this.game.lclick = true;
      // if (this.title && this.game.lclick && this.game.mouse.x > 800 && this.game.mouse.x < 1020 && this.game.mouse.y > 170 && this.game.mouse.y < 210)


      // If title screen
      if (this.title && this.game.lclick) {
        // Title Screen -> Start Game (with transition)
        if (!this.credits && this.game.mouse.x > 300 && this.game.mouse.x < 590 && this.game.mouse.y > 760 && this.game.mouse.y < 810) {
            this.title = false;
            this.player = new Player(this.game, 100, 100);
            this.loadLevel(false, true);
        }
        // Title Screen -> Credits
        if (!this.credits && this.game.mouse.x > 1400 && this.game.mouse.x < 1595 && this.game.mouse.y > 760 && this.game.mouse.y < 810) {
            this.loadLevel(true, false);
            this.credits = true;
        }
        // Credits -> Title Screen
        if (this.credits && this.game.mouse.x > 780 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90) {
            this.credits = false;
            this.loadLevel(true, false);
        }
      }

    if (this.transition && this.game.lclick) {
        if (this.game.mouse.x > 1400 && this.game.mouse.x < 1640 && this.game.mouse.y > 760 && this.game.mouse.y < 810) {
            this.transition = false;
            this.title = false;
            this.player = new Player(this.game, 100, 100);
            this.loadLevel(false, false);
        }
    }
    if (this.gameOver && this.game.lclick) {
      this.clearEntities();
      if (this.game.mouse.x > 830 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90) {
        this.gameOver = false;
        this.player = new Player(this.game, 100, 100);
        this.loadLevel(true, false);
      }
    }
    //side scrollling
    let x1 = PARAMS.CANVAS_WIDTH * 1/4
    let x2 = PARAMS.CANVAS_WIDTH * 3/4
    let y1 = PARAMS.CANVAS_HEIGHT * 1/4
    let y2 = PARAMS.CANVAS_HEIGHT * 3/4
    if (this.player.x <= x1) {
      this.x = x1 - this.player.x;
    } else if (this.player.x >= x2) {
      this.x = x2- this.player.x;
    } else {
      this.x = 0;
    }
    if (this.player.y <= y1) {
      this.y = y1 - this.player.y;
    } else if (this.player.y >= y2) {
      this.y = y2 - this.player.y;
    } else {
      this.y = 0;
    }
  };

    updateAudio() {
      var mute = document.getElementById("mute").checked;
      var volume = document.getElementById("volume").value;

      ASSET_MANAGER.muteAudio(mute);
      ASSET_MANAGER.adjustVolume(volume);

  };

    draw(ctx) {

      ctx.fillStyle = "White";
      ctx.fillText("Hp", 50, 50);
      ctx.fillRect(50,80,200,20);
      ctx.drawImage(this.hp_bar, 3, 3, 1, 2, 50, 80, this.player.hp*2, 20);
      ctx.fillStyle = "White";
      ctx.fillText("Gear", 300, 50);
      ctx.drawImage(this.gear, 1, 1, 83, 88, 300, 70, 31, 30);
      ctx.fillStyle = "White";
      ctx.fillText("x " + this.player.gears, 350, 100);
      ctx.font = '40px "NASA"';
      ctx.fillStyle = "Red";
      ctx.strokeStyle = "Red";

      // Title Screen
      if (this.title && !this.credits && !this.transition) {

        ctx.drawImage(this.titleBackground, 0, 0);
        ctx.drawImage(this.logo, 690, 160);
        ctx.fillStyle = "#4a8437";
        ctx.fillRect(300, 760, 290, 50); // left 90 up 50
        ctx.fillStyle = this.game.mouse && this.game.mouse.x > 300 && this.game.mouse.x < 590 && this.game.mouse.y > 760 && this.game.mouse.y < 810 ? "#e6e4df" : "Black";
        ctx.fillText("START GAME", 310, 800);
        ctx.fillStyle = "#ba6cc3";
        ctx.fillRect(1400, 760, 195, 50);
        ctx.fillStyle = this.game.mouse && this.game.mouse.x > 1400 && this.game.mouse.x < 1595 && this.game.mouse.y > 760 && this.game.mouse.y < 810 ? "#e6e4df" : "Black";
        ctx.fillText("CREDITS", 1410, 800);
        // Credits Screen
    } else if (this.title && this.credits && !this.transition) {
        ctx.drawImage(this.creditsBackground, 0, 0);
        ctx.fillStyle = "#4191b1";
        ctx.fillRect(780, 40, 295, 50);
        ctx.fillStyle = this.game.mouse && this.game.mouse.x > 780 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90 ? "#e6e4df" : "Black";
        ctx.fillText("MAIN MENU", 790, 80);
        ctx.fillStyle = "#4191b1";
        ctx.font = '30px "NASA"';
        ctx.fillRect(700, 200, 450, 200);
        ctx.fillStyle = "Black";
        ctx.fillText("• Code Base: Chris Marriott", 710, 240);
        ctx.fillText("• Main Sprites: Moon Tribe", 710, 280);
        ctx.fillText("• Developers: Alex, Raz", 710, 320);
        ctx.fillText("  Sasha, Shilnara", 710, 360);
    }

    if (this.transition && !this.title && !this.credits) {
      ctx.drawImage(this.titleBackground, 0, 0);
      ctx.fillStyle = "#e6e4df";
      ctx.font = '30px "Nasa"';
      ctx.fillText("Landing on an abandoned space station ", 600, 250)
      ctx.fillText("   by mistake, Rob has to do everything   ", 600, 290);
      ctx.fillText("   he can to make his way to the emergency", 600, 330);
      ctx.fillText("   escape pod and save himself.", 600, 370);
      ctx.fillStyle = "#4a8437";
      ctx.fillRect(1400, 760, 240, 50);
      ctx.fillStyle = this.game.mouse && this.game.mouse.x > 1400 && this.game.mouse.x < 1640 && this.game.mouse.y > 760 && this.game.mouse.y < 810 ? "#e6e4df" : "Black";
      ctx.font = '40px "NASA"';
      ctx.fillText("CONTINUE", 1410, 800);
    }

    if (this.gameOver) {
      ctx.drawImage(this.creditsBackground, 0, 0);
      ctx.fillStyle = "#4191b1";
      ctx.fillRect(830, 40, 245, 50);
      ctx.fillStyle = this.game.mouse && this.game.mouse.x > 830 && this.game.mouse.x < 1075 && this.game.mouse.y > 40 && this.game.mouse.y < 90 ? "#e6e4df" : "Black";
      ctx.fillText("TRY AGAIN", 840, 80);
      ctx.drawImage(ASSET_MANAGER.getAsset("./images/over.png"),200, 200);
      this.death.drawFrame(this.game.clockTick, ctx, 750, 400, 1);
      if (this.death.frame > 16) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/player/player_down_death.png"), 6273, 0, 369, 454, 750, 400, 369, 454);
      } 
    }
  };

}

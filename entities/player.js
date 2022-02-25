class Player {
	constructor(game, x, y) {
		Object.assign(this, {game, x, y});
		this.game.player = this;
		this.game = game;
    this.trap_damage =0;
    //getTrap to check if the character is in a trap or not
		this.getTrap = false;
		this.spritesheet1 = ASSET_MANAGER.getAsset("./sprites/player/player_up_idle.png");
		this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/player/player_up_run.png");
		this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/player/player_down_idle.png");
		this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/player/player_down_run.png");
		this.spritesheet5 = ASSET_MANAGER.getAsset("./sprites/player/player_left_idle.png");
		this.spritesheet6 = ASSET_MANAGER.getAsset("./sprites/player/player_left_run.png");
		this.spritesheet7 = ASSET_MANAGER.getAsset("./sprites/player/player_right_idle.png");
		this.spritesheet8 = ASSET_MANAGER.getAsset("./sprites/player/player_right_run.png");
		this.spritesheet9 = ASSET_MANAGER.getAsset("./sprites/player/player_bullet.png");
		this.spritesheet10 = ASSET_MANAGER.getAsset("./sprites/player/player_down_death.png");
		
		this.facing = "right"; // can be left, right, up, down
		this.state = "idle"; // can be idle, run, attack, death
		
		this.maxhp = 100;
		this.hp = 100;
		this.gears = 0;
		
		this.velocity = {x: 0, y : 0};
		
		this.bulletSpeed = 400;
		this.bulletRate = .5;
		this.bulletTimer = 0;
		this.bulletSize = 30;
		this.bulletRicochet = 0;
		this.moveMultiplyer = 1;
		this.shotgun = {shotgun: false, amount: 1};//ammount means how many pairs, ie 1 will give 3 bullets, 2 will give 5...
		
		this.animations = [];
		this.loadAnimations();
		
		this.updateBB();
		
		//pixels in respect to map
		//used for pathfinding
		this.mapX = this.feetBB.x + 25;
		this.mapY = this.feetBB.y + 10;

		//current location of player on the minimap
		this.mMapX = this.mapX;
		this.mMapY = this.mapY;

	}
	
	loadAnimations() {
		
		this.animations["left idle"] = new Animator(this.spritesheet5, 0, 0, 271, 339, 25, 0.05, 0, false, true);
		this.animations["left run"] = new Animator(this.spritesheet6, 0, 0, 280, 346, 16, 0.03, 0, false, true);
		
		this.animations["right idle"] = new Animator(this.spritesheet7, 0, 0, 271, 339, 25, 0.05, 0, false, true);
		this.animations["right run"] = new Animator(this.spritesheet8, 0, 0, 280, 346, 16, 0.03, 0, false, true);
		
		this.animations["up idle"] = new Animator(this.spritesheet1, 0, 0, 293, 338, 25, 0.05, 0, false, true);
		this.animations["up run"] = new Animator(this.spritesheet2, 0, 0, 299, 342, 16, 0.03, 0, false, true);
		
		this.animations["down idle"] = new Animator(this.spritesheet3, 0, 0, 280, 339, 25, 0.05, 0, false, true);
		this.animations["down run"] = new Animator(this.spritesheet4, 0, 0, 299, 343, 16, 0.03, 0, false, true);
		
		this.animations["death"] = new Animator(this.spritesheet10, 0, 0, 369, 454, 18, 0.05, 0, false, false);
	}
	
	updateBB() {
		this.lastBB = this.BB;
		/* if (this.facing === "right") {
			// this.BB = new BoundingBox(this.x + 2, this.y + 1, 72, 92);
			this.BB = new BoundingBox(this.x, this.y, 72, 92);
		} else if (this.facing === "left") {
			// this.BB = new BoundingBox(this.x + 5, this.y + 1, 72, 92);
			this.BB = new BoundingBox(this.x, this.y, 72, 92);
		} else {
			// this.BB = new BoundingBox(this.x + 7, this.y + 1, 72, 90);
		} */
		
		this.BB = new BoundingBox(this.x, this.y, 86, 93);
		this.feetBB = new BoundingBox(this.x + 20, this.y + 73, 50, 20);
	}
	
	calculateDirection() {
		
		let mouse = {x: this.game.mouse.x - this.x, y : this.game.mouse.y - this.y};
		let player = {x: 0, y : 0};
		if ((mouse.x < player.x) && (mouse.y < (-1) * mouse.x) && (mouse.y > mouse.x)) { //left
			this.facing = "left"
		} else if ((mouse.x > player.x) && (mouse.y > (-1) * mouse.x) && (mouse.y < mouse.x)) {
			this.facing = "right";
		} else if ((mouse.y > player.y) && (mouse.y > (-1) * mouse.x) && (mouse.y > mouse.x)) {
			this.facing = "down";
		} else if ((mouse.y < player.y) && (mouse.y < (-1) * mouse.x) && (mouse.y < mouse.x)) {
			this.facing = "up";
		}
	}
	
	die () {
		this.dead = true;
	}
	
	update() {		
		const TICK = this.game.clockTick;
		const RUN = 350;
		

		// Movement and User Input
		
		this.velocity.x = 0;
		this.velocity.y = 0;
		this.state = "idle";
		
		if ((this.game.keys["w"] || this.game.keys["ArrowUp"]) && (!this.game.keys["s"] && !this.game.keys["ArrowDown"])) {
			this.velocity.y = -RUN;
			this.state = "run";
		}
		if ((this.game.keys["s"] || this.game.keys["ArrowDown"]) && (!this.game.keys["w"] && !this.game.keys["ArrowUp"])) {
			this.velocity.y = RUN;
			this.state = "run";
		}
		if ((this.game.keys["d"] || this.game.keys["ArrowRight"]) && (!this.game.keys["a"] && !this.game.keys["ArrowLeft"])) { // go right: press d and not a
			this.velocity.x = RUN;
			this.state = "run";
		}
		if ((this.game.keys["a"] || this.game.keys["ArrowLeft"]) && (!this.game.keys["d"] && !this.game.keys["ArrowRight"])) { // go left
			this.velocity.x = -RUN;
			this.state = "run";
		}

    if (this.checkSlowTrap()) {
    	this.moveMultiplyer = 0.2;
    }
    else{
        this.moveMultiplyer = 1;
    }

    if (this.hp <= 0) {
			this.state = "death";
			return;
		} else if (this.hp <= 10) {
			ASSET_MANAGER.playAsset("./music/player death sound 200.mp3");
		}
		//shooting
		if ((this.game.lclick) && !this.game.camera.title && !this.game.camera.transition) {
			if (this.bulletTimer <= 0) {
				this.state = "idle";
				ASSET_MANAGER.playAsset("./music/player shot sound 200.wav");
				this.calculateDirection()
				if (this.facing === "left") {
					this.game.addBullet(new Bullet(this.game, this.x - 25, this.y + 55, this.game.mouse.x, this.game.mouse.y, this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				} else if (this.facing === "right") {
					this.game.addBullet(new Bullet(this.game, this.x + 75, this.y + 55, this.game.mouse.x, this.game.mouse.y, this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				} else if (this.facing === "up") {
					this.game.addBullet(new Bullet(this.game, this.x + 24, this.y, this.game.mouse.x, this.game.mouse.y, this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				} else {
					this.game.addBullet(new Bullet(this.game, this.x + 24, this.y + 87, this.game.mouse.x, this.game.mouse.y, this.bulletSize, this.bulletSpeed, this.bulletRicochet, this.shotgun, "player", this.spritesheet9));
				}
				this.bulletTimer = this.bulletRate;
			}
		}
		//shooting cooldown counter
		if (this.bulletTimer >= 0) {
			this.bulletTimer-=TICK;
		}
		
		// update direction
		if (this.velocity.x > 0) this.facing = "right";
		if (this.velocity.x < 0) this.facing = "left";
		if (this.velocity.y < 0) this.facing = "up";
		if (this.velocity.y > 0) this.facing = "down";
		
		// update position. side scrolling
		this.x += (this.velocity.x * TICK)*this.moveMultiplyer + this.game.camera.x;
		this.y += (this.velocity.y * TICK)*this.moveMultiplyer + this.game.camera.y;
		
		this.mapX += this.velocity.x * TICK *this.moveMultiplyer;
		this.mapY += this.velocity.y * TICK *this.moveMultiplyer;
		//console.log(Math.floor(this.mapX/125), Math.floor(this.mapY/125));
		
		//if (this.x < -30) this.x = -30; // don't let player fall off left edge
		//if (this.y < -50) this.y = -50; // don't let player fall off upper edge
		//if (this.y > 810) this.y = this.y - 5; // don't let playerr fall off lower edge
		// implement fall off right edge
		
		
		//wall collision
		var that = this;
		if (!PARAMS.GODMODE) {
			this.game.entities.tiles.forEach(function (entity) {
				if (entity.BB && that.feetBB.collide(entity.BB)) {
					if (entity instanceof Wall) {
						if (entity.leftBB && that.feetBB.collide(entity.leftBB)) // collides with left side of wall
						{
							that.x = that.x - RUN * TICK;
							that.mapX -= RUN * TICK;
						}
						if (entity.rightBB && that.feetBB.collide(entity.rightBB)) // collides with right side of wall
						{
							that.x = that.x + RUN * TICK;
							that.mapX += RUN * TICK;
						}
						if (entity.topBB && that.feetBB.collide(entity.topBB)) // collides with top side of wall
						{
							that.y = that.y - RUN * TICK;
							that.mapY -= RUN * TICK;
						}
						if (entity.bottomBB && that.feetBB.collide(entity.bottomBB)) // collides with bottom side of wall
						{
							that.y = that.y + RUN * TICK;
							that.mapY += RUN * TICK;
						}
					}
				}});
		}
			this.game.entities.portals.forEach(function (entity) {
				if (entity.BB && that.feetBB.collide(entity.BB)) {
					//this.game.camera.loadLevel(levelTwo,true,true);

					if (entity instanceof Door) {
						if (entity.leftBB && that.feetBB.collide(entity.leftBB)) // collides with left side of wall
						{
							that.x = that.x - RUN * TICK;
							that.mapX -= RUN * TICK;
						}
						if (entity.rightBB && that.feetBB.collide(entity.rightBB)) // collides with right side of wall
						{
							entity.removeFromWorld = true;

							that.x = that.x + RUN * TICK;
							that.mapX += RUN * TICK;
						}
						if (entity.topBB && that.feetBB.collide(entity.topBB)) // collides with top side of wall
						{
							entity.removeFromWorld = true;

							that.y = that.y - RUN * TICK;
							that.mapY -= RUN * TICK;
						}
						if (entity.bottomBB && that.feetBB.collide(entity.bottomBB)) // collides with bottom side of wall
						{
							entity.removeFromWorld = true;

							that.y = that.y + RUN * TICK;
							that.mapY += RUN * TICK;
						}
					}
				}});

		this.game.entities.powerups.forEach(function (entity) {
			if (entity.BB && that.BB.collide(entity.BB)) {
				if (entity instanceof Gear) {
					ASSET_MANAGER.playAsset("./music/gear sound.wav");
					entity.removeFromWorld = true;
					that.gears++;
				}
			}
		});

		this.game.entities.powerups.forEach(function (entity) {
			if (entity.BB && that.feetBB.collide(entity.BB)) {
				if (entity instanceof Powerup && entity.powerup === "healthpack") {
					entity.removeFromWorld = true;
					that.hp = 100;
					ASSET_MANAGER.playAsset("./music/health.mp3");
				}
			}
		});

		this.updateBB();
		}
  
    drawMinimap(ctx, mmX, mmY){
      ctx.fillStyle = "Green";
	  this.mMapX = mmX + this.mapX / PARAMS.BITWIDTH;
	  this.mMapY = mmY + this.mapY / PARAMS.BITWIDTH;
      ctx.fillRect(this.mMapX, this.mMapY, 93/PARAMS.BITWIDTH , 86/PARAMS.BITWIDTH);
    }
		
	draw(ctx) {
		// this.healthbar.draw(ctx);
		// this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y);
		if (this.hp <= 0) {
			this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.3);
		} else {
			this.animations[this.facing + " " + this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.3);
		}
		
		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
			ctx.strokeStyle = "Blue";
			ctx.strokeRect(this.feetBB.x, this.feetBB.y, this.feetBB.width, this.feetBB.height)
		}
	}


    checkSlowTrap(){
      let collide = false;
      this.game.entities.traps.forEach(trap => {
        if (trap.trap_type === "thorn" && this.feetBB.collide(trap.BB)){
          collide = true;
          return;
        }
      })
      return collide;
    }
}

//make sure player is placed between .25 < player < .75 width and height
let levelOne = {
	count: 1,
	map: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,],
			[0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,0,1,1,1,0,0,],
			[0,0,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,0,1,1,1,0,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,],
			[0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,],
			[0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,],
			[0,0,1,1,1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],
	player: {x: 5, y: 3},
	flying_monsters: [
		X = [12,2],
		Y = [5,5],
		OFFSCREEN = [true,true]
	],
	red_monsters: [
		X = [2],
		Y = [1],
		OFFSCREEN = [true, true]
	],
	green_monsters: [
		X = [2],
		Y = [12],
		OFFSCREEN = [true]

	],
	blue_monsters: [
		X = [4],
		Y = [12],
		OFFSCREEN = [true]
	],
	smols: [
		//{x: 13, y: 4},
		//{x: 13, y: 5}
	],
	boss: [{x: 11, y: 4}],
	gears: [
		X = [5, 2, 16],
		Y = [6, 11, 2]
	],
	portals: [
		X = [2, 13],
		Y = [4, 12]
	],
	doors : [
		{x: 5, y: 1, state: "unlocked", direction: "left"},
		{x: 8, y: 9, state: "locked", direction: "down", requiredGears: 1},
		{x: 9, y: 1, state: "locked", direction: "right", requiredGears: 1},
		{x: 15, y: 13, state: "locked", direction: "right", requiredGears: 2}
	],
	traps: [
		X = [6,8,7],
		Y = [6,6,6],
		T = ["spike","thorn", "thorn"]
	],
	walltraps : [
		{x: 8, y: 0, direction: "down", rate: 3},
		{x: 3, y: 13, direction: "right", rate: 4},
	],
  	powerup: [{x: 2, y: 5, powerup: "healthpack"}],
	transitionItem : {x: 11, y: 2, level: 1},
	story: [ // title - level 1
		"After landing on an abandoned space station ",
		"   by mistake, Rob has to do everything   ",
		"   he can to make his way to the emergency",
		"   escape pod and save himself."
	],
	songPath: "./music/title.mp3"
};

let levelTwo = {
	count: 2,
	map: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,],
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,],
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,0,0,0,1,1,0,],
		  [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,1,1,0,],
		  [0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,],
		  [0,0,0,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,1,0,],
		  [0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,1,0,],
		  [0,0,0,1,1,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,],
		  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,],
		  [0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,0,],
		  [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,],
		  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,],
/*18y*/	  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,1,0,0,],
		  [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,],
		  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		  [0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,],
		  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,],
		  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],

	player: {x: 4, y: 2},
    flying_monsters: [
	    X = [8, 12, 5, 12, 27, 20, 20, 29, 33],
	    Y = [30, 34, 8, 23, 18, 10, 18, 30, 34],
		OFFSCREEN = [false,false,false,false,false,false,false,false,false]
    ],
	green_monsters: [
		X = [4, 19, 24, 22, 22, 19, 23],
		Y = [17, 4, 5, 19, 13, 34, 30],
		OFFSCREEN = [false,false,false,false,false,false,false]
	],
	blue_monsters: [
		X = [4],
		Y = [19],
		OFFSCREEN = [false]
	],
	boss: [{x: 33, y: 34}],
	gears: [
	X = [13,2,2,15],
	Y = [6,14,12,23]
	],
	portals: [
		X = [31,1,34,7],
		Y = [1,19,8,11]
	],
	doors : [
		{x: 40, y: 6, state: "locked", direction: "down", requiredGears: 3},
		{x: 27, y: 9, state: "locked", direction: "down", requiredGears: 1},
		{x: 12, y: 11, state: "locked", direction: "right", requiredGears: 3},
		{x: 13, y: 23, state: "locked", direction: "right", requiredGears: 3},
		{x: 9, y: 24, state: "locked", direction: "right", requiredGears: 3},
		{x: 5, y: 26, state: "locked", direction: "left", requiredGears: 4},
		{x: 6, y: 28, state: "locked", direction: "down", requiredGears: 3},
		{x: 34, y: 7, state: "locked", direction: "down", requiredGears: 3},
		{x: 8, y: 11, state: "locked", direction: "left", requiredGears: 3},
		{x: 25, y: 18, state: "locked", direction: "left", requiredGears: 3},
		{x: 17, y: 5, state: "unlocked", direction: "right", requiredGears: 0},
		{x: 32, y: 7, state: "locked", direction: "down", requiredGears: 1},
		{x: 38, y: 35, state: "locked", direction: "right", requiredGears: 4, finalDoor: true}
	],
	traps: [
		X = [5,6,17,18,19,20,32,34,34,32,31,31, 20, 9, 16, 32, 8, 11, 16, 22, 13, 26, 27,32,31,30,30, 35,2,3,2,1,1,4],
		Y = [6,6,8,8,8,8,5,5,4,3,3,3, 31, 33, 29, 30, 30, 31, 33, 34, 29, 30, 30, 34, 34, 34, 33, 32,15,15, 17,17,18,16],
		T = ["spike", "spike", "thorn","thorn","thorn","thorn", "thorn", "thorn", "spike","spike","spike","spike","thorn", "thorn", "thorn", "thorn", "thorn", "spike", "spike", "spike", "thorn","spike", "spike", "thorn", "thorn", "thorn", "thorn", 
		"spike", "thorn", "thorn", "spike", "spike", "spike", "spike"]
	],
  	powerup: [{x: 3, y: 26, powerup: "healthpack"},
	  		  {x: 13, y: 11, powerup: "healthpack"},
			  {x: 14, y: 25, powerup: "ricochet"},
			  {x: 31, y: 8, powerup: "shotgun"}],
	walltraps : [
		{x: 39, y: 20, direction: "up", rate: 4},
		{x: 28, y: 5, direction: "right", rate:3.5},
		{x: 0, y: 17, direction: "right", rate:2},
		{x: 6, y: 19, direction: "left", rate:4},
		{x: 6, y: 15, direction: "left", rate:2},

	],
	transitionItem: {x: 39.5, y: 34.5, level: 2},
	story: [ //Level 1 - Level 2                    //
		"Falling through the mysterious hole led Rob ",
		"   into a lengthy fall through the unknown   ",
		"   spaceship. After picking himself back up, ",
		"   he hopes he will be more careful next time."
	],
	songPath: "./music/level 2 song.mp3"
};

let levelThree = {
	count: 3,
	map: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
			[0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,],
			[0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,0,1,1,1,0,0,],
			[0,0,1,1,1,1,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,0,1,1,1,0,1,0,1,0,1,1,1,1,0,0,0,0,1,0,0,],
			[0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,],
			[0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,],
			[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,],
			[0,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,],
			[0,0,1,1,1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,],
			[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]],
	player: {x: 5, y: 3},
	flying_monsters: [
		X = [12,2],
		Y = [5,5],
		OFFSCREEN = [true,true]
	],
	green_monsters: [
		X = [2],
		Y = [12],
		OFFSCREEN = [true]
	], 
	blue_monsters: [
		X = [2],
		Y = [14],
		OFFSCREEN = [true]
	],
	boss: [{x: 11, y: 4}],
	gears: [
		X = [5, 2, 16],
		Y = [6, 11, 2]
	],
	portals: [
		X = [2, 13],
		Y = [4, 12]
	],
	doors : [
		{x: 5, y: 1, state: "unlocked", direction: "left"},
		{x: 8, y: 9, state: "locked", direction: "down", requiredGears: 1},
		{x: 9, y: 1, state: "locked", direction: "right", requiredGears: 1},
		{x: 15, y: 13, state: "locked", direction: "right", requiredGears: 2}
	],
	traps: [
		X = [6,8],
		Y = [6,6],
		T = ["spike","thorn"]
	],
	walltraps : [
		{x: 8, y: 0, direction: "down", rate: 3},
		{x: 3, y: 13, direction: "right", rate: 4},
	],
  	powerup: [{x: 2, y: 5, powerup: "ricochet"}],
	transitionItem : {x: 11, y: 2, level: 3},
	story: [                                        //
		"Rob quickly puts the jetpack on but is ",
		"   startled by a loud explosion. There   ",
		"   was no fuel left, and he finds himself",
		"   stuck again. Poor Rob, indeed."
	],
	songPath: "./music/level 3 song.mp3"
};

let finalStory = [
		"Rob got into the escape pod and finally",
		"	made it back home. However, he is",
		"	not excited about retirement and",
		"	wants to see what other",
		"	adventures he can find."
]


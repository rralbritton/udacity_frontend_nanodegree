//Globals
let canvas = $('canvas')[0];
let lives = 5;
let gemCount = 0;
let orangeGemCnt = 0;
let greenGemCnt = 0;
let blueGemCnt = 0;
let level = 1;
let speed = 100;

//Create game object to hold common properties and methods
const gameObject = {
	x: 0,
	y: 0,
	sprite: "images/enemy-bug.png",
	render: function(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
// Enemy Class
let Enemy = function() {
	this.x = getRandomInt(0, 10);
	this.y = getRandomInt(55, 215);
	this.speed = speed;
	this.pixelWidth = 101;
	this.pixelHeight = 171;
};

Enemy.prototype = gameObject;

// Update the enemy's position
// Speed is multiplied by the dt parameter to ensure the
// game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
	if (this.x < canvas.width - (this.pixelWidth / 2)) {
		this.x = (dt * this.speed) + this.x
	} else {
		//when enemy exits canvas, re-render   
		this.x = getRandomInt(0, 10);
		this.y = getRandomInt(55, 215);
	}
	//detect collision with player
	//modified from: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
	if (this.x < player.x + 40 &&
		this.x + 60 > player.x &&
		this.y < player.y + 65 &&
		65 + this.y > player.y) {

		//play collision audio
		$("audio")[1].play();

		//move player back to start
		player.x = 100;
		player.y = 400;

		//remove a life
		lives = lives - 1;
		if (lives === 4) {
			$('#heart5').hide();
		}
		if (lives === 3) {
			$('#heart4').hide();
		}
		if (lives === 2) {
			$('#heart3').hide();
		}
		if (lives === 1) {
			$('#heart2').hide();
		}
		if (lives === 0) {
			//show game over 
			$('#heart1').hide();
			$('#gameBoard').hide();
			$('.gameOver').show();
			$(document).ready(function() {
				$("audio")[3].play();
			});
		}
	}
};

// Player class
let Player = function() {
	this.y = 400;
	this.sprite = 'images/char-horn-girl.png',
	this.pixelWidth = 101;
	this.pixelHeight = 171;
}
Player.prototype = gameObject;

Player.prototype.ColumnPosition = function() {
	if (this.x < 100) {
		return 1;
	}
	if (this.x >= 100 && this.x < 200) {
		return 2;
	}
	if (this.x >= 200 && this.x < 300) {
		return 3;
	}
	if (this.x >= 300 && this.x < 400) {
		return 4;
	}
	if (this.x >= 400) {
		return 5;
	}
}
Player.prototype.RowPosition = function() {
	if (this.y < 68) {
		return 1;
	}
	if (this.y >= 68 && this.y < 151) {
		return 2;
	}
	if (this.y >= 151 && this.y < 234) {
		return 3;
	}
	if (this.y >= 234 && this.y < 317) {
		return 4;
	}
	if (this.y >= 317 && this.y < 400) {
		return 5;
	}
	if (this.y >= 400 && this.y < 505) {
		return 6;
	}
}

Player.prototype.handleInput = function(allowedKey) {
	switch (allowedKey) {
		case 'up':
			if (this.y > 0) {
				this.y -= 83;
			}
			break;
		case 'down':
			if (this.y < 370) {
				this.y += 83;
			}
			break;
		case 'left':
			if (this.x > 0) {
				this.x -= this.pixelWidth;
			}
			break;
		case 'right':
			if (this.x <= 303) {
				this.x += this.pixelWidth;
			}
			break;
	}
	// once move is made, check players postion against gem position
	overlap(activeGem[0], player)
}

// Gems will appear at the top of the board in random order
// Collect 5 gems to level up
//Collect all 15 gems to win the game
let Gem = function(x, sprite) {
	this.sprite = sprite;
	this.x = x;
	this.y = 55;
};

Gem.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Gem.prototype.update = function() {
  //when player reaches the gem
  // get gem current X location
  // remove from respective array
  // push new gem to active gem array
  levelUpAudio();
if(levelOneGems.length != 0 && gemCount < 5){
	levelOneGems.forEach(function(gem, index){
		if(gem.x === activeGem[0].x){
			levelOneGems.splice(index,1)
		}
	});
	activeGem.pop();
	activeGem.push(levelOneGems[Math.floor(Math.random() * levelOneGems.length)]);
}
if(orangeGemCnt === 5){
	activeGem.pop();
	activeGem.push(levelTwoGems[Math.floor(Math.random() * levelTwoGems.length)]);
}
if(greenGemCnt === 1 && levelTwoGems.length != 0 ){
	levelTwoGems.forEach(function(gem, index){
		if(gem.x === activeGem[0].x){
			levelTwoGems.splice(index,1)
		}
	});
	activeGem.pop();
	activeGem.push(levelTwoGems[Math.floor(Math.random() * levelTwoGems.length)]);
}
if(greenGemCnt === 5){
	activeGem.pop();
	activeGem.push(levelThreeGems[Math.floor(Math.random() * levelThreeGems.length)]);
}
if(blueGemCnt === 1 && levelThreeGems.length != 0){
	levelThreeGems.forEach(function(gem, index){
		if(gem.x === activeGem[0].x){
			levelThreeGems.splice(index,1)
		}
	});
	activeGem.pop();
	activeGem.push(levelThreeGems[Math.floor(Math.random() * levelThreeGems.length)]);
}
if(gemCount === 15){
	$('#gameBoard').hide();
	$('.winner').show();
	$(document).ready(function() {
		$("audio")[4].play();
	})
}
}
//generate random number for enemy y-axis position
//source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Check to see if player and gem are in the same block
// if yes, player collects the gem
// and return back to the start
let overlap = function(gem, player) {
	/*let gemRow = getRow(gem);
	let gemCol = getCol(gem);*/
	if (player.RowPosition.call(gem) === player.RowPosition() && player.ColumnPosition.call(gem) === player.ColumnPosition()) {

		//play audio
		$("audio")[2].play();

		//increase gem count & level up 
		gemCount = gemCount + 1;
		gameLevel();

		//move gem to another block
		gem.update();

		//reset player to start
		player.x = 100;
		player.y = 400;

		//add enemies to enemy array
		if (gemCount % 3 === 0)
			allEnemies.push(newEnemies[0]);

		//Increase enemy speed
		speed = speed + 5;
	}
}

let gameLevel = function() {
	if (gemCount < 6) {
		orangeGemCnt = orangeGemCnt + 1;
		$('.orangeGems').text(orangeGemCnt);
		level = 1;
		return level;
	}
	if (gemCount > 5 && gemCount <= 10) {
		greenGemCnt = greenGemCnt + 1
		$('.greenGems').text(greenGemCnt);
		level = 2;
		return level;
	}
	if (gemCount >= 10 && gemCount <= 15) {
		blueGemCnt = blueGemCnt + 1;
		$('.blueGems').text(blueGemCnt);
		level = 3;
		return level;
	}
}

let levelUpAudio = function() {
	if (gemCount === 5 || gemCount === 10) {
		$("audio")[5].play();
	}
}

let resetGameObjects = function() {
	lives = 5;
	gemCount = 0;
	orangeGemCnt = 0;
	greenGemCnt = 0;
	blueGemCnt = 0;
	level = 1;
	$('.orangeGems').text(orangeGemCnt);
	$('.greenGems').text(greenGemCnt);
	$('.blueGems').text(blueGemCnt);
	activeGem.pop();
	levelOneGems = [new Gem(23, 'images/orange_gem.png'), new Gem(123, 'images/orange_gem.png'), new Gem(223, 'images/orange_gem.png'), new Gem(323, 'images/orange_gem.png'), new Gem(423, 'images/orange_gem.png')];
	levelThreeGems = [new Gem(23, 'images/blue_gem.png'), new Gem(123, 'images/blue_gem.png'), new Gem(223, 'images/blue_gem.png'), new Gem(323, 'images/blue_gem.png'), new Gem(423, 'images/blue_gem.png')];
	levelTwoGems = [new Gem(23, 'images/green_gem.png'), new Gem(123, 'images/green_gem.png'), new Gem(223, 'images/green_gem.png'), new Gem(323, 'images/green_gem.png'), new Gem(423, 'images/green_gem.png')];
	let startGem = activeGem.push(levelOneGems[Math.floor(Math.random() * levelOneGems.length)]);
	allEnemies = [new Enemy(0, getRandomInt(55, 220)), new Enemy(0, getRandomInt(55, 220))];
	speed = 100;
}

let resetCSS = function() {
	$('#gameBoard').css('display', 'block');
	$('.scoreboard').css('display', 'inline-block');
	$('.canvas').css('display', 'block');
	$('.fa-heart').show();
	$("audio")[0].play();
}

// Instantiate objects
let allEnemies = [new Enemy(), new Enemy()];
let newEnemies = [new Enemy()];

let player = new Player();

let levelOneGems = [new Gem(23, 'images/orange_gem.png'), new Gem(123, 'images/orange_gem.png'), new Gem(223, 'images/orange_gem.png'), new Gem(323, 'images/orange_gem.png'), new Gem(423, 'images/orange_gem.png')];
let levelThreeGems = [new Gem(23, 'images/blue_gem.png'), new Gem(123, 'images/blue_gem.png'), new Gem(223, 'images/blue_gem.png'), new Gem(323, 'images/blue_gem.png'), new Gem(423, 'images/blue_gem.png')];
let levelTwoGems = [new Gem(23, 'images/green_gem.png'), new Gem(123, 'images/green_gem.png'), new Gem(223, 'images/green_gem.png'), new Gem(323, 'images/green_gem.png'), new Gem(423, 'images/green_gem.png')];
let activeGem = [levelOneGems[Math.floor(Math.random() * levelOneGems.length)]];
console.log(levelOneGems);
console.log(activeGem)

// listen for key presses and sends the keys to 
// Player.handleInput() method. 
$(document).keyup(function(e) {
	let allowedKey = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'

	};
	player.handleInput(allowedKey[e.keyCode]);
});

// Play Again
$('.playAgain').on('click', function() {
	$('.gameOver').css('display', 'none');
	resetCSS();
	resetGameObjects();

})
$('.startGame').on('click', function() {
	resetCSS();
	$('.welcome').css('display', 'none');
})
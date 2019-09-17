const lanes = [
    { y:  60, speed: random(200,300)  }, 
    { y: 145, speed: random(-200,-400)}, // middle lane is for bugs going to the left
    { y: 230, speed: random(50,500)    }];

// Enemies our player must avoid
var Enemy = function(roadLane) {
    // roadLane indicates the y position for the enemy
    //  roadLane with value 0 means the upper most lane.
    //  roadLane with value 1 menas the middle lane.
    //  roadLane with value 2 means the lowest most lane.
    //  roadLane with 'undefined' value will be assigned a random lane

   

    if(roadLane==null) {
        // randomly pick a lane
        roadLane = parseInt(Math.random() * lanes.length);
    }
    this.y = lanes[roadLane].y;
    this.speed = lanes[roadLane].speed;

    this.x = random(-100, 1000);
    
    


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// helper utility function (random with a given range)
// this makes code easier to read
function random(min, max) {
    // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

    return Math.random() * (max - min) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.speed > 0 && this.x > ctx.canvas.width + 100) { this.x = -100; }
    else if(this.speed <0 && this.x < -100) { this.x = ctx.canvas.width + 100; }

    // this.x += this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // because we might decide to flip some images based on the 
    // way they are facing, it is better to store the current state
    // of the canvas, so that we don't affect any other sprite on
    // the canvas. We will have to restore later
    ctx.save();

    // move the drawing head to the current enemy location
    // as opposed to the top left corner of the canvas.
    // we will revert back to the corner before returning from this function
    ctx.translate(this.x + 50, this.y);
    
    if(this.speed<0) {
        // flip the enemy's image if its speed is negative
        // so that it will face the other direction
        ctx.scale(-1,1);
    }
    // x:0 and y:0 is the current enemy's location
    // since we have translated the drawing head/pen to the x,y of the enemy
    ctx.drawImage(Resources.get(this.sprite), 0, 0);

    // revert back to the original canvas orientation and scaling.
    // this way, we only affect the enemy sprite, and all other tiles
    // are un-affected.
    ctx.restore();

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.lives = 4;
        this.score = 0;

        // put the player to the staring position.

        // it is useful to put this function in its own
        // because we will need it later once the player
        // is hit by an enemy
        this.startOver();
    }
    
    startOver() {
        this.x = 200;
        this.y = 410;

    }

    update(dt) {
        allEnemies.forEach(bug => {
            
            if(this.hits(bug)) {
                this.lives -= 1;  // remove one life
                this.startOver();
                return;  // no need to continue iterating through the other bugs

            }
        });

    }

    hits(bug) {
        if(Math.abs(this.x - bug.x) < 30 && Math.abs(this.y-bug.y)<15) {
            return true;
        }
        return false;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
    
    handleInput(direction) {
        switch(direction) {
            case 'up':
                if(this.y>60) {
                    this.y -= 85;
                }
                
                break;
            case 'down':
                if(this.y<410) {
                    this.y += 85;
                }
                
                break;
            case 'right':
                // only move to the right if 
                // player can go there. avoid
                // going outside the canvas width
                if(this.x<400) {
                    this.x += 100;
                }
                
                break;
            case 'left':
                if (this.x>0) {
                    this.x -= 100;
                }
                
                break;
            case 'enter':
                if(this.lives===0) {
                    this.lives = 4;
                    this.startOver();
                    this.score = 0;
                }
                break;
            default:
                console.log(direction);
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let gems = [];
let player;
startGame();

function startGame() {
    // iterate 3 times because we have 3 lanes
    for(let i=0; i<3; i++) {
        // put two enemies on each lane
        // have their x position be decided by the constructor, 
        // but their speed limit is already pre-determined by which lane
        // they are created on.
        // this will make sure each lane has 2 enemies moving by the same speed
        // to mimic the game-feel of frogger

        allEnemies.push(new Enemy(i));
        allEnemies.push(new Enemy(i));
        
    }

    for(let i=0; i<5; i++) {
        gems.push(new Gem());
    }

    player = new Player();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    if(player) {
        player.handleInput(allowedKeys[e.keyCode]);
    } 

    
});

class Gem {
    constructor() {
        this.x = 101 * parseInt(Math.random() * 6);
        this.y = 83 * parseInt(Math.random()) + 83;
        this.color = "blue";
    }

    render() {
        ctx.drawImage(Resources.get(`images/Gem ${this.color}.png`),x,0,35,50);
    }
}

function renderScore() {
    drawText(`Score: ${player.score}`, 350,35);
    for(i=0; i<player.lives; i++) {
        let x = i*35;
        
        ctx.drawImage(Resources.get('images/heart.png'),x,0,35,50);
    }
    
}

function drawText(txt,x,y,fontSize = 30) {
    ctx.font = `${fontSize}px Arial,Tahoma`;
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#888";
    ctx.fillText(txt,x,y);
    ctx.strokeText(txt,x,y);
}
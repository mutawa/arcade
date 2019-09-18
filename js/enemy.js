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

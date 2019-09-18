// Enemies our player must avoid
class Enemy {
    static lanes = [
        { y:  173, speed: random(200,300)  }, 
        { y: 255, speed: random(-200,-400)}, // middle lane is for bugs going to the left
        { y: 340, speed: random(50,500)    }];
    
    //  lane indicates the y position for the enemy
    //  value 0 means the upper most lane.
    //  value 1 menas the middle lane.
    //  value 2 means the lowest most lane.
    //  'undefined' or null value will be assigned a random lane
    constructor(lane) {
        if(lane==null) {
            // randomly pick a lane
            lane = parseInt(Math.random() * lanes.length);
        }

        this.y = Enemy.lanes[lane].y;
        this.speed = Enemy.lanes[lane].speed;

        //this.speed = 1;  // for debugging only

        this.width = 101;  // sprite image width in pixels
        this.height = 73;  // sprite image height in pixles

        this.x = random(-100, 1000);
        
        this.sprite = 'images/enemy-bug.png';
    }
   
    update(dt) {
        this.x += this.speed * dt;
        if(this.speed > 0 && this.x > ctx.canvas.width + 100) { this.x = -100; }
        else if(this.speed <0 && this.x < -100) { this.x = ctx.canvas.width + 100; }
    }
    
    render() {
        // because we might decide to flip some enemies based on the 
        // way they are facing, it is better to store the current state
        // of the canvas, so that we don't affect any other sprite on
        // the canvas. We will have to restore later
        ctx.save();

        // move the drawing head to the current enemy location
        // as opposed to the top left corner of the canvas.
        // we will revert back to the corner before returning from this function
        ctx.translate(this.x , this.y);
        
        if(this.speed<0) {
            // flip the enemy's image if its speed is negative
            // so that it will face the other direction
            ctx.scale(-1,1);
        }
        // x:0 and y:0 is the current enemy's location
        // since we have translated the drawing head/pen to the x,y of the enemy
        // but first, we must also account for the middle of the enemy, instead 
        // of the top left corner of it. This will become useful
        // when we detect collisions later.
        let x = -(this.width) / 2;
        let y = -(this.height) / 2;
        // circle(0,0,this.width/2);  // for debugging only to help with collisions
        ctx.drawImage(Resources.get(this.sprite), x, y);
        


        // revert back to the original canvas orientation and scaling.
        // this way, we only affect the enemy sprite, and all other tiles
        // are un-affected.
        ctx.restore();
    }
    
};




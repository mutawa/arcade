class Player {
    constructor() {
        this.sprite = "images/char-boy.png";
        this.lives = 4; // stores the number of lives
        this.score = 0;

        this.width = 80;  // sprite width in pixels
        this.height = 92; // sprite height in pixles

        // put the player to the staring position.

        // it is useful to put this function in its own
        // because we will need it later once the player
        // is hit by an enemy
        this.startOver();
    }
    
    startOver() {
        this.x = 255;
        this.y = 500;
    }

    update(dt) {

        // check collisions with Enemies
        this.checkCollisionWithEnemies();
        this.checkCollisionWithGems();
    }

    checkCollisionWithEnemies() {
        allEnemies.forEach(bug => {
            if(this.hits(bug)) {
                this.lives -= 1;  // remove one life
                if(this.lives>0) {
                    this.startOver();
                }
                
                return;  // no need to continue iterating through the other bugs
            }
        });
    }

    checkCollisionWithGems() {
        // check collisions with Gems.
        // but since a collision with a gem will result in removing
        // the gem, then it is better to iterate throgh the array in
        // reverse order, since removing an element will mess up 
        // the loop iterator

        for(let i = allGems.length -1; i>= 0; i--) {
            let gem = allGems[i];

            if(this.hits(gem)) {
                allGems.splice(i,1);
                this.score += 100;
            }
        }
    }

    hits(object) {
        if(distance(this,object) < 1) {
            return true;
        }
        return false;
    }

    render() {

        // circle(this.x, this.y, this.width/2);  // for debugging only

        // we need to account for the player width and height
        // if we want to detect collisions later on.
        // so we need to make the player's center what matters,
        // not his/her top left corner
        let x = this.x - (this.width / 2);
        let y = this.y - (this.height /2);
        ctx.drawImage(Resources.get(this.sprite), x, y);

    }
    
    isStillAlive() {
        return this.lives > 0;
    }

    handleInput(direction) {
        switch(direction) {
            case 'up':
                if(this.y>75 && this.isStillAlive()) {
                    this.y -= 85;
                }
                break;
            case 'down':
                if(this.y<500 && this.isStillAlive()) {
                    this.y += 85;
                }
                break;
            case 'right':
                // only move to the right if 
                // player can go there. avoid
                // going outside the canvas width
                if(this.x<400 && this.isStillAlive()) {
                        this.x += 100;
                }
                break;

            case 'left':
                if (this.x>55  && this.isStillAlive()) {
                    this.x -= 100;
                }
                break;

            case 'enter':
                // Either the game is over, or all gems have been taken
                if(!this.isStillAlive() || allGems.length==0) {
                    startGame();
                }
                break;
            default:
                break;
        }
    }
}

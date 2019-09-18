
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

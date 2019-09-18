class Gem {
    static colors = ["Blue", "Orange", "Green"]; // all possible gem colors
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 101; // sprite width
        this.height = 115;  // sprite height 
        
        // picking a random gem color/sprite
        let index = parseInt(Math.random() * Gem.colors.length);
        let color = Gem.colors[index];
        this.sprite = `images/Gem ${color}.png`;
        
        this.angle = 0;  // current gem's rotation angle
        this.angleSpeed = random(-5, 5);  //rotation speed
    }

    update(dt) {
        this.angle += this.angleSpeed * dt;
    }

    render() {
        // circle(this.x, this.y,30); // for debugging only
        
        // save the current context state
        ctx.save();
        
        // move the drawing pen to the gem's center
        ctx.translate(this.x,this.y);

        // reduce the scale by half so the gem would appear half as big
        ctx.scale(0.5,0.5);

        // rotate the context drawing pen by the gem's angle
        ctx.rotate(this.angle);

        // finally, draw the gem
        ctx.drawImage(Resources.get(this.sprite), -this.width/2, -this.height/2);

        // restore the context state, cancelling the scale, rotation and translate
        ctx.restore();
    }
}
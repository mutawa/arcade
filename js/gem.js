
class Gem {
    static colors = ["Blue", "Orange", "Green"];
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 101;
        this.height = 115;
        this.angle = 0;
        let index = parseInt(Math.random() * Gem.colors.length);
        this.color = Gem.colors[index];
        this.sprite = `images/Gem ${this.color}.png`;
    }

    update() {
        this.angle += 0.01;
    }

    render() {
        // circle(this.x, this.y,30); // for debugging only
        ctx.save();
        
        ctx.translate(this.x,this.y);
        ctx.scale(0.5,0.5);
        ctx.rotate(this.angle);
        ctx.drawImage(Resources.get(this.sprite), -this.width/2, -this.height/2);
        ctx.restore();
    }
}
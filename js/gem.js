
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
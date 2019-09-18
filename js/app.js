

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let allGems = [];
let player;
startGame();
listenForKeys();

function startGame() {
    
    generateEnemies();
    generateGems();
    player = new Player();

    
}

function generateEnemies() {
    // clear any previous enemies
    allEnemies = [];

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
}

function generateGems() {
    allGems = [];

    let xPoints = new Set();  // we need unique x positions
    let yPoints = new Set();  // and unique y positions
    
    while(xPoints.size < 5 || yPoints.size < 5) {
        let x = 101 * parseInt(Math.random() * 5) + 50;
        let y = (parseInt(Math.random() * 5) + 1) * 83 ;

        xPoints.add(x);
        yPoints.add(y);
    }
    // prepare an array for the unique coordinates
    let points = [];

    let i = 0;
    for(let x of xPoints) {
        points[i] = {x:x};
        i++;
    }
    // iterate again to add the y value to the x,y pair
    i = 0;
    for(let y of yPoints) {
        points[i].y = y;
        i++;
    }
    
    
    for(let point of points) {
        allGems.push(new Gem(point.x, point.y));
    }
}

function listenForKeys() {
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
}


function renderScore() {
    drawText(`Score: ${player.score}`, 350,35);
    for(i=0; i<player.lives; i++) {
        let x = i*35;
        
        ctx.drawImage(Resources.get('images/heart.png'),x,0,35,50);
    }
    
}

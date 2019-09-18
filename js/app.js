const lanes = [
    { y:  60, speed: random(200,300)  }, 
    { y: 145, speed: random(-200,-400)}, // middle lane is for bugs going to the left
    { y: 230, speed: random(50,500)    }];


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
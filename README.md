# Classic Arcade Game Clone Project

This repository is to satisfy the requirements of the 3rd Project from Udacity's Front-End Nanodegree program.

## How to start the game

You can access the game using a browser that supports ES6 (Such as Chrome, or Firefox).

Open the `index.html` file, and the game shall start.

## How to play the game

At the start of the game, the player has 4 lives, represnted by the red hears at the top left corner of the game canvas.

Your goal is to move the player around using the arrow keys on the keyboard, and avoid colliding with the enemies (the huge red bugs), while at the same time, collecting the 5 scattered gems over the game canvas.

Each gem will give the player a score of 100. 

If the player collides with an enemy, a life is lost. The game is over when there are no more lives. 

The game is won when all gems have been collected.

In either cases (Game Over, or all gems collected) the game is paused, and a message is displayed to inform the user. 

The game can be re-started by hitting the RETURN key (only if the game is over, or won).

## Details and Changes

I have changed a lot from the starter template by separating the classes of each object in its own file. `Player` class is now in `player.js` file. The same for `Gem` and `Enemy`.  This makes it a lot easier to debug (separation of concern).

I also added another file `util.js` to host all functions that are used by all other classes, and could not logically decide to put them in any particular class.

I made a creative decision by editing the images from the provided template, since they contained too much transparent vertical space, that makes arthemetic collision detection a nightmare. 

I also added gem rotation for the fun of it.

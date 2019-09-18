
// helper utility function (random with a given range)
// this makes code easier to read
function random(min, max) {
    // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

    return Math.random() * (max - min) + min;
}


// convenient function to handle drawing text on the canvas
function drawText(txt,x,y,fontSize = 30) {
    ctx.font = `${fontSize}px Arial,Tahoma`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillText(txt,x,y);
    ctx.strokeText(txt,x,y);
}

// convenient function to draw a circle
// for debugging only, to help see when collisions occur
function circle(x,y,radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

function distance(object1 = {x,y,width} , object2 = {x,y,width}) {
    
    let a = object1.x - object2.x;
    let b = object1.y - object2.y;

    let d = Math.sqrt(a*a + b*b);  // distance between two objects centers

    // now let's take into account their radius/width
    d -= object1.width/3; // let's allow for the bodies to contact a little bit
    d -= object2.width/3;

    // if we only take away the radius, a collision will be detected on 
    // the slightest touch of each others outer circles, we don't want that
    // so we will take away a third of their width, which is a bit less than
    // the radius (half the width)

    // now d is the distance between the objects excluding their own bodies.

    return d;

}
```javascript /p5js/playable/autoplay

let rad = 60; // Width of the shape
let xpos, ypos; // Starting position of shape

let xspeed = 2.8; // Speed of the shape
let yspeed = 2.2; // Speed of the shape

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

function setup() {
    p5.createCanvas(720, 400);
    p5.noStroke();
    p5.frameRate(30);
    p5.ellipseMode(RADIUS);
    // Set the starting position of the shape
    xpos = p5.width / 2;
    ypos = p5.height / 2;
}

function draw() {
    p5.background(102);

    // Update the position of the shape
    xpos = xpos + xspeed * xdirection;
    ypos = ypos + yspeed * ydirection;

    // // Test to see if the shape exceeds the boundaries of the screen
    // // If it does, reverse its direction by multiplying by -1
    // if (xpos > p5.width - rad || xpos < rad) {
    //     xdirection *= -1;
    // }
    // if (ypos > p5.height - rad || ypos < rad) {
    //     ydirection *= -1;
    // }

    // Draw the shape
    p5.ellipse(xpos, ypos, rad, rad);
}

```

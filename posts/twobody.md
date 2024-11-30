Mass is attracted to other mass through the force of gravity. This program simulates this by showing how two stars would move in a two dimensional space. This is done using the formula $F= \frac{Gm_1m_2}{r^2}$ where $F$ is the attractive force between the two objects, $r$ is the distance between the centers of mass of the objects, and $m_1$ and $m_2$ are the objects' respective masses. This formula is used iteratively to change the velocity based on the other masses in the area. 
It should be noted that the star that starts on the left has an upward starting velocity and the star that starts on the right has a downwards starting velocity. This makes them more likely to orbit instead of just colliding. 
**Star Mass 1** [](:?mass1|number) [](:-mass1/1/50/1)

**Star Mass 2** [](:?mass2|number) [](:-mass2/1/50/1)

[Start](:=start=true) [Reset](:=reset=true)[Add Particle:](:Xparticle)

```javascript /p5js/autoplay
smartdown.setVariable('mass1',10);
smartdown.setVariable('mass2',30);
smartdown.setVariable('start',false);
smartdown.setVariable('particle',false);
let plocked = false;
let s1locked = false;
let s2locked = false;

function starColor(mass) {
    if (mass < 12.5) {
        return [255, Math.floor(255 * mass/12.5), 0];
    }
    if (mass < 25) {
        return [255,255, Math.floor(255*(mass-12.5)/12.5)];
    } 
    let value = Math.floor(255 * (25 - (mass - 25))/ 25);
    return [value, value, 255];
}

class Particle {
    constructor(x, y, u, v) {
        this.t = 0;
        this.m = 10;
        this.pos = p5.createVector(x, y);
        this.vel = p5.createVector(u, v);
        this.history = [];
    }

    applyForce(force) {
        this.vel.add(force);
    }

    update() {
        this.history.push(this.pos);
        this.t++;
        this.pos.add(this.vel);
    }
  
    render() {
        p5.stroke(0);
        p5.noFill();
        p5.beginShape();
        for (const v of this.history) {
            p5.vertex(v.x, v.y);
        }
        p5.endShape();
    
        p5.fill(0);
        p5.circle(this.pos.x, this.pos.y, 20);
    }
} 


class Star extends Particle {
    constructor(x, y, u, v, m) {
        super(x, y, u, v);
        this.m = m;
    }
  
    attract(p) {
        const force = p5.Vector.sub(this.pos, p.pos);
        const magSq = force.magSq();
        force.setMag(this.m * p.m / magSq);
        return force;
}
  
    render() {
        p5.stroke(102);
        p5.noFill();
        p5.beginShape();
        for (const v of this.history) {
            p5.vertex(v.x, v.y);
        }
        p5.endShape();
        p5.stroke(0);
        p5.fill(starColor(this.m));
        p5.circle(this.pos.x, this.pos.y, 40);
    }
}


function reset(){
    smartdown.setVariable('reset',false)
    s1 = new Star((p5.width / 2)-60, p5.height / 2, 0, 1,env.mass1);
    s2 = new Star((p5.width / 2)+60 , p5.height / 2, 0, -1,env.mass2);
    p = new Particle((p5.width / 2), (p5.height / 2)+60, 0, 0);
}


p5.mousePressed = function() {
    if (incircle(p)) {
        plocked = true;
    } 
    if (incircle(s1)) {
        s1locked = true;
    }
    if (incircle(s2)) {
        s2locked = true;
    }
}


p5.mouseReleased = function(){
    plocked = false;
    s1locked = false;
    s2locked = false;
}


p5.mouseDragged = function() {
    if (plocked) {
        p.pos.x = p5.mouseX;
        p.pos.y = p5.mouseY;
    }
    if (s1locked) {
        s1.pos.x = p5.mouseX;
        s1.pos.y = p5.mouseY;
    }
    if (s2locked) {
        s2.pos.x = p5.mouseX;
        s2.pos.y = p5.mouseY;
    }
}

let widthPercent = 0.8;  // what percentage of the page width should the app get
let heightPercent = 0.7; // what percentage of the page height should the app get

p5.setup = function() {
    p5.frameRate(30);
    p5.createCanvas(widthPercent*window.innerWidth, heightPercent*window.innerHeight);
    s1 = new Star((p5.width / 2)-60, p5.height / 2, 0, 1,env.mass1);
    s2 = new Star((p5.width / 2)+60 , p5.height / 2, 0, -1,env.mass2);
    p = new Particle((p5.width / 2) , (p5.height / 2)+60, 0, 0);
    if (env.particle){
        p = new Particle((p5.width / 2) , (p5.height / 2)+60, 0, 0);
    }   
    p5.noStroke();

    }
function incircle(circle) {
    let deltaX = p5.mouseX - circle.pos.x;
    let deltaY = p5.mouseY - circle.pos.y;
    let distance = Math.sqrt(deltaX**2 + deltaY**2);
    return distance < 10;
}
p5.draw = function() {
    p5.background(100,75,100);
    p5.frameRate(30);
    p5.fill(0)
    s1 = new Star(s1.pos.x, s1.pos.y, s1.vel.x, s1.vel.y, env.mass1);
    s2 = new Star(s2.pos.x, s2.pos.y, s2.vel.x, s2.vel.y, env.mass2);
    if (env.particle){
        p = new Particle(p.pos.x, p.pos.y, p.vel.x, p.vel.y);
    } else{
        p = new Particle((p5.width / 2) , (p5.height / 2)+60, 0, 0);
    }

    if (env.start == true) {
        s1.applyForce(s2.attract(s1));
        s2.applyForce(s1.attract(s2));
        p.applyForce(s1.attract(p));
        p.applyForce(s2.attract(p));
        s1.update();
        s1.render();
        s2.update();
        s2.render();
        if (env.particle){
            p.update();
            p.render();
        }
        if (env.reset) {
            reset()
        }
    }else{
        s1.render();
        s2.render();
    }
}
```


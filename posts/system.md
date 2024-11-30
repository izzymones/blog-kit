If you are having trouble seeing the planets, do not be alarmed. This is an (almost) to scale representation so the planets and the sun are all too small to see. Change the scaling to make the planets more visible and less realistic.
This is my first attempt at simulating the orbits of the planets in our solar system. This uses my code from my two body problem and uses it to move our eight planets around the Sun. To see how these orbits work check out my two body problem simulation.
**Earth Year Length** [](:?speed|number) seconds [](:-speed/1/10/1)

**Planet Scale** [](:?scale|number) [](:-scale/1/10000/1)

**Sun Scale** [](:?sunscale|number) [](:-sunscale/1/10000/1)

[Start](:=start=true)



```javascript /p5js/autoplay
let widthPercent = 0.8;  // what percentage of the page width should the app get
let heightPercent = 0.7; // what percentage of the page height should the app get
let s;
let planets = []; 

// conversion factors
// standard units are kilograms, meters and seconds
// we need to convert to half sols, pixels and frames
smartdown.setVariable('speed',4); 
smartdown.setVariable('scale',1); 
smartdown.setVariable('sunscale',1); 
let framerate = 30;
let kg_per_hs = 10 ** 30;
let m_per_p = 10 ** 10;
let old_speed = env.speed;
let cur_speed = env.speed;
let old_scale = env.scale;
let cur_scale = env.scale;
let old_sunscale = env.sunscale;
let cur_sunscale = env.sunscale;
let s_per_f = 31536000/(framerate * cur_speed);


let G_reg_units = 6.67 * 10 ** (-11); // m^3/ (kg * s^2)
let G = G_reg_units * kg_per_hs * (s_per_f ** 2) / (m_per_p ** 3);

class Particle {
    constructor(x, y, u, v, m, c, r) {
        this.t = 0;
        this.m = m;
        this.pos = p5.createVector(x, y);
        this.vel = p5.createVector(u, v);
        this.history = [];
        this.c = c;
        this.r = r;

    }

    applyForce(force) {
        let accel = p5.createVector(force.x/this.m, force.y/this.m);
        // we can just add the accel to the velocity
        // applied over one time step it's the velocity
        this.vel.add(accel);
    }

    update() {
        this.history.push(this.pos);
        this.t++;
        this.pos.add(this.vel);

    }
  
    render() {
        p5.push()
        p5.stroke(this.c);
        p5.fill(this.c);
        p5.circle(this.pos.x, this.pos.y, this.r);
        p5.pop()
    }
} 



class Star extends Particle {
    constructor(x, y, u, v, m, c, r) {
        super(x, y, u, v, m, c ,r);
        this.m = m;
    }
  
    attract(p) {
        let d = p5.createVector(this.pos.x - p.pos.x,this.pos.y - p.pos.y);
        let force = (G*this.m*p.m / d.magSq()); // F = - (GMm)/(r^2) 
        d.normalize(); // make d a unit vector
        d.mult(force); // give it magnitude F
        return d;
    }
  
    render() {
        p5.push()
        p5.stroke(this.c);
        p5.fill(this.c);
        p5.circle(this.pos.x, this.pos.y, this.r);
        p5.pop()
    }
}

let smass = 2 * 10 ** 30 / kg_per_hs; // mass of the sun converted to halfsols
let srad = 696340000/(m_per_p)*cur_sunscale;

let mercury_m = 3.285 * 10 ** (23) / kg_per_hs; // mass of mercury converted to halfsols
let mercury_d = 69 * 10 ** 9 / m_per_p;
let mercury_v =((G*smass)/mercury_d)**(1/2); //pixels/frame
let mercury_c = [150,150,150];
let mercury_r = 2440000/(m_per_p)*cur_scale;

let venus_m = 4.867 * 10 ** (24) / kg_per_hs; // mass of earth converted to halfsols
let venus_d = 107.5 * 10 ** 9 / m_per_p;
let venus_v =((G*smass)/venus_d)**(1/2); //pixels/frame
let venus_c = [225,225,170];
let venus_r = 6052000/(m_per_p)*cur_scale;

let earth_m = 6 * 10 ** (24) / kg_per_hs; // mass of earth converted to halfsols
let earth_d = 150 * 10 ** 9 / m_per_p;
let earth_v =((G*smass)/earth_d)**(1/2); //pixels/frame
let earth_c = [100,150,200];
let earth_r = 6371000/(m_per_p)*cur_scale;

let mars_m = 6.39 * 10 ** (23) / kg_per_hs; // mass of earth converted to halfsols
let mars_d = 213 * 10 ** 9 / m_per_p;
let mars_v =((G*smass)/mars_d)**(1/2); //pixels/frame
let mars_c = [255,100,75];
let mars_r = 3390000/(m_per_p)*cur_scale;

let jupiter_m = 1.898 * 10 ** (27) / kg_per_hs; // mass of earth converted to halfsols
let jupiter_d = 742 * 10 ** 9 / m_per_p;
let jupiter_v =((G*smass)/jupiter_d)**(1/2); //pixels/frame
let jupiter_c = [225,125,50];
let jupiter_r = 69911000/(m_per_p)*cur_scale;

let saturn_m = 5.683 * 10 ** (26) / kg_per_hs; // mass of earth converted to halfsols
let saturn_d = 1473.8 * 10 ** 9 / m_per_p;
let saturn_v =((G*smass)/saturn_d)**(1/2); //pixels/frame
let saturn_c = [175,190,75];
let saturn_r = 58232000/(m_per_p)*cur_scale;

let uranus_m = 8.681 * 10 ** (25) / kg_per_hs; // mass of earth converted to halfsols
let uranus_d = 2944.4 * 10 ** 9 / m_per_p;
let uranus_v =((G*smass)/uranus_d)**(1/2); //pixels/frame
let uranus_c = [225,245,250];
let uranus_r = 25362000/(m_per_p)*cur_scale;

let neptune_m = 1.024 * 10 ** (26) / kg_per_hs; // mass of earth converted to halfsols
let neptune_d = 4474 * 10 ** 9 / m_per_p;
let neptune_v =((G*smass)/neptune_d)**(1/2); //pixels/frame
let neptune_c = [20,20,235];
let neptune_r = 24622000/(m_per_p)*cur_scale;


function updateSpeed(){
    s_per_f = 31536000/(framerate * cur_speed);
    G = G_reg_units * kg_per_hs * (s_per_f ** 2) / (m_per_p ** 3);
    for (let i=0; i < planets.length; i++) {
        planets[i].vel.mult(old_speed/cur_speed);
    }
}

function updateRadius(){
    for (let i=0; i < planets.length; i++) {
        planets[i].r = (planets[i].r*cur_scale)/old_scale;
    }
}


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




p5.setup = function() {
    p5.frameRate(framerate);
    p5.createCanvas(widthPercent*window.innerWidth, heightPercent*window.innerHeight);
    s = new Star(p5.width / 2, p5.height / 2, 0, 0, smass, [255,255,0], srad);
    planets.push(new Particle((p5.width  / 2) + mercury_d, p5.height / 2, 0, mercury_v, mercury_m, mercury_c, mercury_r));
    planets.push(new Particle((p5.width  / 2) + venus_d, p5.height / 2, 0, venus_v, venus_m, venus_c, venus_r));
    planets.push(new Particle((p5.width  / 2) + earth_d, p5.height / 2, 0, earth_v, earth_m, earth_c, earth_r));
    planets.push(new Particle((p5.width  / 2) + mars_d, p5.height / 2, 0, mars_v, mars_m, mars_c, mars_r));
    planets.push(new Particle((p5.width  / 2) + jupiter_d, p5.height / 2, 0, jupiter_v, jupiter_m, jupiter_c, jupiter_r));
    planets.push(new Particle((p5.width  / 2) + saturn_d, p5.height / 2, 0, saturn_v, saturn_m, saturn_c, saturn_r));
    planets.push(new Particle((p5.width  / 2) + uranus_d, p5.height / 2, 0, uranus_v, uranus_m, uranus_c, uranus_r));
    planets.push(new Particle((p5.width  / 2) + neptune_d, p5.height / 2, 0, neptune_v, neptune_m, neptune_c, neptune_r));
    
    s.render();

    for (let i=0; i < planets.length; i++) {
        planets[i].render();
    }
}


p5.draw = function() {
    p5.background(50,0,50);
    if (env.start) {
        for (let i=0; i < planets.length; i++) {
            planets[i].applyForce(s.attract(planets[i]));
        }

        s.update();
        for (let i=0; i < planets.length; i++) {
            planets[i].update();
        }

    }
    s.render();
    for (let i=0; i < planets.length; i++) {
        planets[i].render();
    }
}

this.dependOn = ['speed', 'scale', 'sunscale'];
this.depend = function() {
    if (env.speed !== cur_speed) {
        old_speed = cur_speed;
        cur_speed = env.speed;
        updateSpeed();
    }
    if (env.scale !== cur_scale) {
        old_scale = cur_scale;
        cur_scale = env.scale;
        updateRadius();
    }
    if (env.sunscale !== cur_sunscale) {
        old_sunscale = cur_sunscale;
        cur_sunscale = env.sunscale;
        s.r = (s.r*cur_sunscale)/old_sunscale;
    }
};

```





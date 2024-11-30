Transfer infrared light captured by the JWST into light from the visual spectrum to make a cool image.

# :::: intro
# --outlinebox int
### Telescope Intro
Use this disclosable to put introductory information about the app.  
[Notes](/pages/telescopeProjectNotes) if you want to learn more about how I did this.
# --outlinebox
# ::::


# :::: panel
# --outlinebox p
This disclosable if for app controls
F770W [](:XuseF770W) [](:-color1/0/5.9/0.1) 
F1000W [](:XuseF1000W) [](:-color2/0/5.9/0.1) 
F1130W [](:XuseF1130W) [](:-color3/0/5.9/0.1) 
F2100W [](:XuseF2100W) [](:-color4/0/5.9/0.1) 
[Redraw](:=redraw=true)
# --outlinebox
# ::::


```javascript /autoplay/kiosk
smartdown.showDisclosure('panel','','transparent,bottomright,draggable,shadow,outline');
smartdown.showDisclosure('intro','','transparent,center,closeable,draggable,shadow,outline');
smartdown.setVariable('useF770W', true);
smartdown.setVariable('useF1000W', true);
smartdown.setVariable('useF1130W', false);
smartdown.setVariable('useF2100W', false);
smartdown.setVariable('redraw',false);
smartdown.setVariable('color1', 0);
smartdown.setVariable('color2', 0);
smartdown.setVariable('color3', 0);
smartdown.setVariable('color4', 0);


let fstring = 'x'
let f = new Function('x', 'return ' + fstring + ';');


async function getImageData(filename) {
  const res = await fetch(filename);
  const array = await res.json();
  return array;
}


let f770dat =  await getImageData('../../assets/data/f770.json');
let f1000dat =  await getImageData('../../assets/data/f1000.json');
let f1130dat = await getImageData('../../assets/data/f1130.json');
let f2100dat = await getImageData('../../assets/data/f2100.json');


let nrows = f770dat.length;
let ncols = 0;
if (nrows > 0) { ncols = f770dat[0].length; }
     

this.div.style.width = '100%';
this.div.style.height = '100%';
this.div.style.margin = 'auto';
this.div.innerHTML = `<canvas id="appCanvas"></canvas>`
let canvas = document.getElementById("appCanvas"); 
let context = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


function sizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
sizeCanvas();


function spectrumProcess(number){
  let answer = [0,0,0]
  if (number <= 1 && number >= 0){
    answer[1] = number
    answer[0] = 1
  }
  if (number <= 2 && number > 1){
    answer[0] = 1 - (number-1)
    answer[1] = 1
  }
  if (number <= 3 && number > 2){
    answer[2] = (number-2)
    answer[1] = 1
  }
  if (number <= 4 && number > 3){
    answer[1] = 1 - (number-3)
    answer[2] = 1
  }
  if (number <= 5 && number > 4){
    answer[0] = (number-4)
    answer[2] = 1
  }
  if (number <= 6 && number > 5){
    answer[2] = 1 - (number-5)
    answer[0] = 1
  }
  return answer
}


function getValue(value, min, max) {
	let c = 0;
  let newvalue = f(value);
  let newmax = f(max);
  let newmin = f(min);
	if (newvalue > newmax) c = 255;
	else {
		if (newvalue > newmin) {
			c = Math.round((newvalue - newmin) / (newmax - newmin) * 255);
		}
	}
	return c;
}

let xshift = 600;
let yshift = 200;


function draw() {
  let f1color = spectrumProcess(env.color1)
  let f2color = spectrumProcess(env.color2)
  let f3color = spectrumProcess(env.color3)
  let f4color = spectrumProcess(env.color4)
  let imagedata = context.createImageData(canvas.width, canvas.height);
  for (let y=0; y<canvas.height; y++) {
      for (let x=0; x<canvas.width; x++) {
        let pixelindex = (y * canvas.width + x) * 4;
        imagedata.data[pixelindex+0] = 0;  // red
        imagedata.data[pixelindex+1] = 0; // green
        imagedata.data[pixelindex+2] = 0; // blue
        imagedata.data[pixelindex+3] = 255; // transparency
        if (y + yshift < nrows && x + xshift < ncols) {
          if (env.useF770W){
            imagedata.data[pixelindex+0] += (getValue(f770dat[y + yshift][x + xshift], 5, 25)*f1color[0])/4;
            imagedata.data[pixelindex+1] += (getValue(f770dat[y + yshift][x + xshift], 5, 25)*f1color[1])/4;
            imagedata.data[pixelindex+2] += (getValue(f770dat[y + yshift][x + xshift], 5, 25)*f1color[2])/4;
          }
          if (env.useF1000W){
            imagedata.data[pixelindex+0] += (getValue(f1000dat[y + yshift][x + xshift], 15, 75)*f2color[0])/4;
            imagedata.data[pixelindex+1] += (getValue(f1000dat[y + yshift][x + xshift], 15, 75)*f2color[1])/4;
            imagedata.data[pixelindex+2] += (getValue(f1000dat[y + yshift][x + xshift], 15, 75)*f2color[2])/4;
          }
          if (env.useF1130W){
            imagedata.data[pixelindex+0] += (getValue(f1130dat[y + yshift][x + xshift], 5, 55)*f3color[0])/4;
            imagedata.data[pixelindex+1] += (getValue(f1130dat[y + yshift][x + xshift], 5, 55)*f3color[1])/4;
            imagedata.data[pixelindex+2] += (getValue(f1130dat[y + yshift][x + xshift], 5, 55)*f3color[2])/4;
          }
          if (env.useF2100W){
            imagedata.data[pixelindex+0] += (getValue(f2100dat[y + yshift][x + xshift], 5, 55)*f4color[0])/4;
            imagedata.data[pixelindex+1] += (getValue(f2100dat[y + yshift][x + xshift], 5, 55)*f4color[1])/4;
            imagedata.data[pixelindex+2] += (getValue(f2100dat[y + yshift][x + xshift], 5, 55)*f4color[2])/4;
        }
      }
    }
  }
  context.putImageData(imagedata,0,0);
}


window.addEventListener('resize', function(event){
  sizeCanvas();
  draw();
});


this.dependOn = ['redraw'];
this.depend = function() {
  if (env.redraw == true){
    smartdown.setVariable('redraw',false);
    draw();
  }
}
draw()



```
---
title: 'The Cosmic Cliffs'
smartdown: true
header: 'none'
---
Transfer infrared light captured by the JWST into light from the visual spectrum to make a cool image.


.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.


# :::: intro
# --outlinebox int
### Telescope Intro
These are the cosmic cliffs of the [Carina Nebula](https://en.wikipedia.org/wiki/Carina_Nebula). It has been constructed with javascript on this website with data directly from the [James Webb Space Telescope's](https://webb.nasa.gov/) NIRCam instrument. I found the data available for free on [MAST observations](https://mast.stsci.edu/portal/Mashup/Clients/Mast/Portal.html). This is a prototype as three of the six filters are not aligned, and I am learning astropy to figure out how to align them. You can change the color assignments for each filter as well as the stretch function. Play around and see what you can make.
[Notes](/pages/telescopeNotes).
# --outlinebox
# ::::


# :::: loading
This page is reading telescope files. Please be patient.
# ::::


# :::: panel
# --outlinebox p
F090W [](:XuseFilter1) [](:-color1/0/5/0.1)[show settings](:=filter0=true)
F187N [](:XuseFilter2) [](:-color2/0/5/0.1)[show settings](:=filter1=true)
F200W [](:XuseFilter3) [](:-color3/0/5/0.1)[show settings](:=filter2=true)
F335M [](:XuseFilter4) [](:-color4/0/5/0.1)[show settings](:=filter3=true)
F444W [](:XuseFilter5) [](:-color5/0/5/0.1)[show settings](:=filter4=true)
F470N [](:XuseFilter6) [](:-color6/0/5/0.1)[show settings](:=filter5=true)
[Redraw](:=redraw=true)
# --outlinebox
# ::::


```javascript /autoplay/kiosk
//smartdown.import=/cb/assets/libs/fits.js
let dataNames = ['f090w', 'f187n', 'f200w', 'f335m', 'f444w', 'f470n'];
let min = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
let max = [8.0, 85.0, 60.0, 40.0, 15.0, 75.0];
let stretchFunction = ['x', 'x', 'x', 'x', 'x', 'x'];
let actualStretchFunction = [];

for (let i = 0; i < 6; i++){
  actualStretchFunction.push(new Function('x', 'return ' + stretchFunction[i] + ';'));
}

let activeFilter = 0;
let dataArrays = [];
smartdown.showDisclosure('intro', '', 'transparent,topleft,closeable,draggable,shadow,outline');
smartdown.showDisclosure('panel', '', 'transparent,bottomright,draggable,shadow,outline');
smartdown.setVariable('useFilter1', true);
smartdown.setVariable('useFilter2', true);
smartdown.setVariable('useFilter3', true);
smartdown.setVariable('useFilter4', true);
smartdown.setVariable('useFilter5', true);
smartdown.setVariable('useFilter6', true);
smartdown.setVariable('redraw',false);
smartdown.setVariable('color1', 1);
smartdown.setVariable('color2', 2);
smartdown.setVariable('color3', 3);
smartdown.setVariable('color4', 4.5);
smartdown.setVariable('color5', 5);
smartdown.setVariable('color6', 4);
smartdown.setVariable('setFilter', dataNames[activeFilter]);
smartdown.setVariable('curveFunction', stretchFunction[activeFilter]);
smartdown.setVariable('min', min[activeFilter]);
smartdown.setVariable('max', max[activeFilter]);
smartdown.setVariable('saveSettings', false);
smartdown.setVariable('drawHistogram', false);
smartdown.setVariable('filter0', 'false');
smartdown.setVariable('filter1', 'false');
smartdown.setVariable('filter2', 'false');
smartdown.setVariable('filter3', 'false');
smartdown.setVariable('filter4', 'false');
smartdown.setVariable('filter5', 'false');


async function getImageData(filenameBase) {
  return getImageDataFromFITS(filenameBase);
}

smartdown.showDisclosure('loading', '', 'center,lightbox');
dataArrays.push(await getImageData('../../assets/data/jw02731-o001_t017_nircam_clear-f090w_i2d_match'));
dataArrays.push(await getImageData('../../assets/data/jw02731-o001_t017_nircam_clear-f187n_i2d_match'));
dataArrays.push(await getImageData('../../assets/data/jw02731-o001_t017_nircam_clear-f200w_i2d_match'));
dataArrays.push(await getImageData('../../assets/data/jw02731-o001_t017_nircam_clear-f335m_i2d_match'));
dataArrays.push(await getImageData('../../assets/data/jw02731-o001_t017_nircam_clear-f444w_i2d_match'));
dataArrays.push(await getImageData('../../assets/data/jw02731-o001_t017_nircam_f444w-f470n_i2d_match'));
smartdown.hideDisclosure('loading', '', '');


this.div.style.width = '100%';
this.div.style.height = '100%';
this.div.style.margin = 'auto';
this.div.innerHTML = `<canvas id="appCanvas"></canvas>`;
let canvas = document.getElementById("appCanvas"); 
let context = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


function sizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
sizeCanvas();


function drawHistogram() {
  let div = document.getElementById('div_playable_2');
  let data2d = dataArrays[activeFilter];
  let histData = [];
  let f = new Function('x', 'return ' + env.curveFunction + ';');
  let min = env.min;
  let max = env.max;
  for (let r = 0; r < data2d.length; r++) {
    for (let c = 0; c < data2d[0].length; c++) {
      let value = f(data2d[r][c]);
      if (value >= min && value <= max) { 
        histData.push(value);
      }
    }
  }
  let trace = {
    x: histData,
    type: 'histogram',
    name: 'Telescope Data'
  };
  let data = [trace];
  Plotly.newPlot(div, data);
}


function updateFilterVariables() {
  smartdown.setVariable('setFilter', dataNames[activeFilter]);
  smartdown.setVariable('curveFunction', stretchFunction[activeFilter]);
  smartdown.setVariable('min', min[activeFilter]);
  smartdown.setVariable('max', max[activeFilter]);
}


function saveFilterVariables() {
  stretchFunction[activeFilter] = env.curveFunction;
  actualStretchFunction[activeFilter] = new Function('x', 'return ' + stretchFunction[activeFilter] + ';');
  min[activeFilter] = env.min;
  max[activeFilter] = env.max;
}


function spectrumProcess(number){
  let answer = [0, 0, 0];
  if (number <= 1 && number >= 0){
    answer[0] = 1 - number;
    answer[2] = 1;
  }
  if (number <= 2 && number > 1){
    answer[1] = number - 1;
    answer[2] = 1;
  }
  if (number <= 3 && number > 2){
    answer[2] = 3 - number;
    answer[1] = 1;
  }
  if (number <= 4 && number > 3){
    answer[0] = number - 3;
    answer[1] = 1;
  }
  if (number <= 5 && number > 4){
    answer[1] = 5 - number;
    answer[0] = 1;
  }
  if (number <= 6 && number > 5){
    answer[2] = number - 5;
    answer[0] = 1;
  }
  return answer
}


function getValue(value, i) {
    let c = 0;
  let newvalue = actualStretchFunction[i](value);
  let newmax = max[i];
  let newmin = min[i];
    if (newvalue > newmax) c = 255;
    else {
        if (newvalue > newmin) {
            c = (Math.round((newvalue - newmin) / (newmax - newmin) * 255));
        }
    }
    return c;
}


function activeFunctions() {
  let f = 0;
  if (env.useFilter1) {f++;}
  if (env.useFilter2) {f++;}
  if (env.useFilter3) {f++;}
  if (env.useFilter4) {f++;}
  if (env.useFilter5) {f++;}
  if (env.useFilter6) {f++;}
  return f;
}

let r = dataArrays[0].length;
let c = 0;
if (r > 0) { c = dataArrays[0][0].length; }
console.log(r, c);
function draw() {
  let f1color = spectrumProcess(env.color1);
  let f2color = spectrumProcess(env.color2);
  let f3color = spectrumProcess(env.color3);
  let f4color = spectrumProcess(env.color4);
  let f5color = spectrumProcess(env.color5);
  let f6color = spectrumProcess(env.color6);
  let imagedata = context.createImageData(canvas.width, canvas.height);
  let w = canvas.width;
  let h = canvas.height;
  for (let y=0; y<canvas.height; y++) {
      for (let x=0; x<canvas.width; x++) {
        // changing this code to fit the image to the viewer's screen
        // we just scale the pixel position the same position in the 
        // data array and round to the nearest integer to get an array index
        // It's sort of like sampling due to some round off error
        let ydown = h - y;
        let ny = h < r ? Math.floor(ydown / h * r) : ydown;
        let nx = w < c ? Math.floor((x / canvas.width) * c) : x; 
        let pixelindex = (y * canvas.width + x) * 4;
        imagedata.data[pixelindex+0] = 0;
        imagedata.data[pixelindex+1] = 0;
        imagedata.data[pixelindex+2] = 0;
        imagedata.data[pixelindex+3] = 255;
        if (ny < r && nx < c) {
          if (env.useFilter1){
            imagedata.data[pixelindex+0] += (getValue(dataArrays[0][ny][nx],0)*f1color[0]);
            imagedata.data[pixelindex+1] += (getValue(dataArrays[0][ny][nx],0)*f1color[1]);
            imagedata.data[pixelindex+2] += (getValue(dataArrays[0][ny][nx],0)*f1color[2]);
          }
          if (env.useFilter2){
            imagedata.data[pixelindex+0] += (getValue(dataArrays[1][ny][nx],1)*f2color[0]);
            imagedata.data[pixelindex+1] += (getValue(dataArrays[1][ny][nx],1)*f2color[1]);
            imagedata.data[pixelindex+2] += (getValue(dataArrays[1][ny][nx],1)*f2color[2]);
          }
          if (env.useFilter3){
            imagedata.data[pixelindex+0] += (getValue(dataArrays[2][ny][nx],2)*f3color[0]);
            imagedata.data[pixelindex+1] += (getValue(dataArrays[2][ny][nx],2)*f3color[1]);
            imagedata.data[pixelindex+2] += (getValue(dataArrays[2][ny][nx],2)*f3color[2]);
          }
          if (env.useFilter4){
            imagedata.data[pixelindex+0] += (getValue(dataArrays[3][ny][nx],3)*f4color[0]);
            imagedata.data[pixelindex+1] += (getValue(dataArrays[3][ny][nx],3)*f4color[1]);
            imagedata.data[pixelindex+2] += (getValue(dataArrays[3][ny][nx],3)*f4color[2]);
          }
          if (env.useFilter5){
            imagedata.data[pixelindex+0] += (getValue(dataArrays[4][ny][nx],4)*f5color[0]);
            imagedata.data[pixelindex+1] += (getValue(dataArrays[4][ny][nx],4)*f5color[1]);
            imagedata.data[pixelindex+2] += (getValue(dataArrays[4][ny][nx],4)*f5color[2]);
        }
          if (env.useFilter6){
            imagedata.data[pixelindex+0] += (getValue(dataArrays[5][ny][nx],5)*f6color[0]);
            imagedata.data[pixelindex+1] += (getValue(dataArrays[5][ny][nx],5)*f6color[1]);
            imagedata.data[pixelindex+2] += (getValue(dataArrays[5][ny][nx],5)*f6color[2]);
        }
      }
    }
  }
  context.putImageData(imagedata, 0, 0);
}


window.addEventListener('resize', function(event){
  sizeCanvas();
  draw();
});


this.dependOn = ['filter0', 'filter1', 'filter2', 'filter3', 'filter4', 'filter5', 'saveSettings','drawHistogram','redraw'];
this.depend = function() {
  if (env.filter0 == true) {
    smartdown.setVariable('filter0', false);
    activeFilter = 0;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings', '', 'center,closeable,lightbox');
  }

  if (env.filter1 == true) {
    smartdown.setVariable('filter1', false);
    activeFilter = 1;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings', '', 'center,closeable,lightbox');
  }

  if (env.filter2 == true) {
    smartdown.setVariable('filter2', false);
    activeFilter = 2;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings', '', 'center,closeable,lightbox');
  }

  if (env.filter3 == true) {
    smartdown.setVariable('filter3', false);
    activeFilter = 3;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings', '', 'center,closeable,lightbox');
  }

  if (env.filter4 == true) {
    smartdown.setVariable('filter4', false);
    activeFilter = 4;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings', '', 'center,closeable,lightbox');
  }

  if (env.filter5 == true) {
    smartdown.setVariable('filter5', false);
    activeFilter = 5;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings', '', 'center,closeable,lightbox');
  }

  // these events are triggered by the histogram popup
  if (env.saveSettings == true) {
    smartdown.setVariable('saveSettings', false);
    saveFilterVariables();  
  }

  if (env.drawHistogram == true) {
    smartdown.setVariable('drawHistogram', false);
    drawHistogram();  
  }
  if (env.redraw == true){
    smartdown.setVariable('redraw',false);
    draw();
  }
}


draw();
```
# :::: filterSettings
# --aliceblue
active filter: [](:!setFilter) [redraw histogram](:=redrawHistogram=true) [Save and Close](:=close=true)
min [](:?min|number) max [](:?max|number)
stretch function: [](:?curveFunction) [formatting tips](::formatting)
# :::: formatting
Enter a single variable function using variable `x`.  Functions need to be written in javascript.  
| Expression  | Javascript |
| ----------- | ----------- |
| $\ln(x)$          | `Math.log(x)`       |
| $x^5$                | `Math.exp(x,5)`      |
| $\text{asinh}(x)$  | `Math.asinh(x)`    |
You can find a list of javascript **Math** functions [here](https://www.w3schools.com/jsref/jsref_obj_math.asp).
# ::::
# --aliceblue

```javascript /plotly/autoplay
this.div.style.width = '100%';
this.div.style.height = '100%';
this.div.style.margin = 'auto';


smartdown.setVariable('redrawHistogram', false);
smartdown.setVariable('close', false);


this.dependOn = ['redrawHistogram', 'close'];
this.depend = function() {
  if (env.redrawHistogram == true) {
    smartdown.setVariable('redrawHistogram', false);
    smartdown.setVariable('saveSettings', true);
    smartdown.setVariable('drawHistogram', true);
  }
  if (env.close == true) {
    smartdown.setVariable('close', false);
    smartdown.setVariable('saveSettings', true);
    smartdown.hideDisclosure('filterSettings', '',  '');
  }
}
```
# ::::

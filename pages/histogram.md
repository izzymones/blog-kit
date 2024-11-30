# :::: loading
This page is reading telescope files.  Please be patient.
# ::::

# :::: panel
# --aliceblue panelbox
f770w  [show settings](:=filter0=true)
f1000w  [show settings](:=filter1=true)
f1130w  [show settings](:=filter2=true)
f2100w  [show settings](:=filter3=true)
# --aliceblue
# ::::

```javascript /autoplay
let dataNames = ['f770w', 'f1000w', 'f1130w', 'f2100w'];
let min = [0.0, 0.0, 0.0, 0.0];
let max = [500.0, 500.0, 500.0, 500.0];
let stretchFunction = ['x', 'x', 'x', 'x'];


let activeFilter = 0;


let dataArrays = [];


smartdown.showDisclosure('panel','','bottomright,draggable,shadow');


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


async function getImageData(filename) {
  const res = await fetch(filename);
  const array = await res.json();
  return array;
}


smartdown.showDisclosure('loading','','center,lightbox');
dataArrays.push(await getImageData('../../assets/data/f770.json'));
dataArrays.push(await getImageData('../../assets/data/f1000.json'));
dataArrays.push(await getImageData('../../assets/data/f1130.json'));
dataArrays.push(await getImageData('../../assets/data/f2100.json'));
smartdown.hideDisclosure('loading','','');


function drawHistogram() {
  let div = document.getElementById('div_playable_2')
  let data2d = dataArrays[activeFilter];
  let histData = [];
  let f = new Function('x', 'return ' + env.curveFunction + ';');
  let min = env.min;
  let max = env.max;
  for (let r=0; r < data2d.length; r++) {
    for (let c=0; c < data2d[0].length; c++) {
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
  min[activeFilter] = env.min;
  max[activeFilter] = env.max;
}


this.dependOn = ['filter0','filter1', 'filter2', 'filter3', 'saveSettings','drawHistogram'];
this.depend = function() {
  if (env.filter0 == true) {
    smartdown.setVariable('filter0', false);
    activeFilter = 0;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings','','center,closeable,lightbox');
  }
  if (env.filter1 == true) {
    smartdown.setVariable('filter1', false);
    activeFilter = 1;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings','','center,closeable,lightbox');
  }
  if (env.filter2 == true) {
    smartdown.setVariable('filter2', false);
    activeFilter = 2;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings','','center,closeable,lightbox');
  }
  if (env.filter3 == true) {
    smartdown.setVariable('filter3', false);
    activeFilter = 3;
    updateFilterVariables();
    drawHistogram();
    smartdown.showDisclosure('filterSettings','','center,closeable,lightbox');
  }
  if (env.saveSettings == true) {
    smartdown.setVariable('saveSettings', false);
    saveFilterVariables();  
  }
  if (env.drawHistogram == true) {
    smartdown.setVariable('drawHistogram', false);
    drawHistogram();  
  }
}


```



# :::: filterSettings
# --aliceblue
active filter: [](:!setFilter) [redraw histogram](:=redraw=true) [Save and Close](:=close=true)
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


smartdown.setVariable('redraw', false);
smartdown.setVariable('close', false);


this.dependOn = ['redraw','close'];
this.depend = function() {
  if (env.redraw == true) {
    smartdown.setVariable('redraw', false);
    smartdown.setVariable('saveSettings', true);
    smartdown.setVariable('drawHistogram', true);
  }
  if (env.close == true) {
    smartdown.setVariable('close', false);
    smartdown.setVariable('saveSettings', true);
    smartdown.hideDisclosure('filterSettings','','');
  }
}

```
# ::::




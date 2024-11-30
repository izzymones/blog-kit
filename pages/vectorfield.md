## Vector Field Assignment

This is an explanation of the playable.


```javascript /autoplay
//smartdown.import=https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraphcore.js
smartdown.importCssUrl('https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.99.7/jsxgraph.css');

// The lines above import the jsxgraph javascript library and css (cascading style sheets) 
// into smartdown 
// jsxgraph is a javascript library that helps you write programs that graph functions

//////////////////////////////////////////////////////////////////////////////////////////////////


// This code sets the html style of app within the outer html page.  
// We set it's width, height and margins 
const myDiv = this.div;
myDiv.style.width = '100%';
myDiv.style.height = '100%';
myDiv.style.margin = 'auto';

// this creates an html div for the graph to live in
myDiv.innerHTML = `<div id='box' class='jxgbox' style='height:600px'>`;

let widthPercent = 0.8;  // what percentage of the page width should the app get
let heightPercent = 0.7; // what percentage of the page height should the app get

let xlow = -20;  // these are the dimensions of our graph
let xhigh = 20;
let ylow = -10;
let yhigh = 10;

// this creates a jsxgraph on the page
board = JXG.JSXGraph.initBoard('box', {
  axis:true, 
  keepaspectratio:true, 
  boundingbox:[xlow,yhigh,xhigh,ylow],
  showCopyright:false
});

//////////////////////////////////////////////////////////////////////////////////////////////////

// This code gets triggered by the web page if the size of the page changes.  For example, if the
// user resizes the browser page.  We want to update the size of our graph to the new window size.
// Try resizing the page and see how the graph reacts.  Then uncomment this code out and try the
// experiment again

this.sizeChanged = function() {
  board.resizeContainer(window.innerWidth * widthPercent, window.innerHeight * heightPercent);
};
this.sizeChanged();

//////////////////////////////////////////////////////////////////////////////////////////////////

// Now let's graph a function

// let f = function(x) { return x * x / 20; };
// let fgraph = board.create('functiongraph', [f,xlow, xhigh]);

//////////////////////////////////////////////////////////////////////////////////////////////////

// Now let's graph an arrow
// Try making the points invisible by setting visible to false

// let p1 = board.create('point', [4.5, 2.0], {visible:true});
// let p2 = board.create('point', [1.0, 1.0], {visible:true});
// let l1 = board.create('arrow', [p1, p2]);

//////////////////////////////////////////////////////////////////////////////////////////////////

// we can make an array of points

// let pts = [];
// for (let i=0; i < 20; i++) {
//   pts.push(board.create('point',[i,5.0], {visible:true}));
// }

// you can make a two dimensional array

// let A = [];
// for (let i=0; i < 10; i++) {
//   let row = []
//   for (let j=0; j < 10; j++) {
//     row.push(j);
//   }

//   A.push(row);
// }

// You can print things out to the javascript console.  
// In your browser go to View -> Developer -> Javascript console
// It should say  Array(10) in the log.  Click on it 

// console.log(A);

//////////////////////////////////////////////////////////////////////////////////////////////////

// here is a two dimensional function that returns a vector.
// Let's see if you can graph a vector field for it.

function g(x,y) { return [x,y**2]; }

let factor = 0.1
let startpt = [];
let endpt = [];
let arrows = [];
for (let x=-10; x < 10; x++) {
  let row = []
  for (let y=-10; y < 10; y++) {
    let [vx,vy] = g(x,y);

    // fill in these elements to get a vector field
    let p1 = board.create('point', [x, y], {visible:false});
    let p2 = board.create('point', [x+vx*(factor), y+vy*factor], {visible:false});
    let arrow = board.create('arrow', [p1, p2]);

    // you don't need to keep pointers to everything you create on a graph
    // but it is good practice. 
    startpt.push(p1);
    endpt.push(p2);
    arrows.push(arrow);
  }
  arrows.push(row);
}

// Things to try
// 1. Try different functions for g(x,y)


```

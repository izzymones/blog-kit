Ooooh, color swatch!

[](:!c1|markdown) [](:-color1/0/5/0.1)


```javascript /playable/autoplay

smartdown.setVariable('color1', 1);


// this is your function that you wrote to make the color from the slider
// you don't need to add it to your program! I just needed it to make this 
// example work.
function spectrumProcess(number){
  let answer = [0,0,0]
  if (number <= 1 && number >= 0){
    answer[0] = 1 - number
    answer[2] = 1
  }
  if (number <= 2 && number > 1){
    answer[1] = number - 1
    answer[2] = 1
  }
  if (number <= 3 && number > 2){
    answer[2] = 3 - number
    answer[1] = 1
  }
  if (number <= 4 && number > 3){
    answer[0] = number - 3
    answer[1] = 1
  }
  if (number <= 5 && number > 4){
    answer[1] = 5 - number
    answer[0] = 1
  }
  if (number <= 6 && number > 5){
    answer[2] = number-5
    answer[0] = 1
  }
  return answer
}


function buildColor(r, g, b) {
  const rPadded = r.toString(16).padStart(2, '0');
  const gPadded = g.toString(16).padStart(2, '0');
  const bPadded = b.toString(16).padStart(2, '0');
  return `#${rPadded}${gPadded}${bPadded}`;
}



function dependOnColor1() {
  let rgb = spectrumProcess(env.color1);
  for (let i=0; i < rgb.length; i++) { rgb[i] = Math.floor(rgb[i] * 255); }

  const colorName = buildColor(rgb[0], rgb[1], rgb[2]);
  console.log(colorName);
  const color = `![swatch](${colorName})`;
  smartdown.set('c1', color);
};

// this is another way to write a depends function 
// This is in Dan's code and I didn't even know you could do this.
// It seems to not work with the other version of dependsOn so you'll probably have to 
// pick one way or the other of doing dependsOn.
this.dependOn.color1 = dependOnColor1






// this is the new exportImage function that works
function exportImage() {

  // this function was taking too long.  Instead of waiting for this function to finish, it was 
  // going ahead and trying to write the imgData to the new tab.  But the data wasn't there yet.
  // This resulted in a blank page if the page was full resolution.
  // It doesn't happen at all on my computer because my CPU might be a little faster.
  const imgData = canvas.toDataURL("image/jpg");

  let x = window.open();

  // the solution is to wrap the display part of the function in a timeout function.  It will wait 1.5
  // seconds before running the display code.  This gives the canvas a little more time to return
  // the data.  There's probably a better way to do this with Promises and Asynch functions 
  // but we'd need to look up the right way to do it.
  setTimeout( function(params) {
    let [x, imgData] = params;
    console.log('opening tab');
    let iframe = "<iframe width='100%' height='100%' src='" + imgData + "'></iframe>"
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  }, 1500, [x, imgData]);
}






// This is code to make drawing only happen 2 times per second
// add this and you can make drawing automatic anytime a color or setting is changed.

// add a variable that controls access to the draw function
let allow_redraw = true;


function draw() {

  // put this code at the beginning of your draw function

  if (!allow_redraw) { return; }   // if we don't have draw permission, return without drawing
  allow_redraw = false;            // if we're here we had draw permission, we're going to draw
                                   // so turn drawing off for after we finish our draw
  setTimeout(function() { allow_redraw = true; }, 500);  // after half a second turn draw back on


}
```


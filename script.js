// p5 file

console.log("this is mysketch.js comment");

var square =5;
var x=0;
var y=0;
var n;
var dx, dy;
var banner =random(1,100);

function setup() {
  var myCanvas = createCanvas(800, 250);
  //has to parent to an id
  myCanvas.parent('mySketch');
  background(0, 150, 175);
  frameRate(5);
  n=5;
 dx=width/3;
 dy=height/1;
}

function draw() {
  // add statements here


  x= mouseX-25;
  y= mouseY-25;
  stroke(255,255,255);
  strokeWeight(8);
  // click to show the snow
  line(x,y-(10*square),x,y+(10*square));
  line(x+(square*6),y+(square*6),x-(square*6),y-(square*6));
  line(x-(square*10),y,x+(10*square),y);
  line(x-(square*6),y+(square*6),x+(square*6),y-(square*6));
  strokeWeight(1);
    for(var i=0; i<n; i++) {
      for(var j=0; j<n; j++) {
        fill(random(255), random(255), random(255), random(255));
        ellipse (dx*i, dy*j, dx, dy);
        fill(random(255));

        }
      }
    }

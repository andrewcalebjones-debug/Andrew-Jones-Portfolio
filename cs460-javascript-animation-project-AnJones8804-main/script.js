/*
REPLACE THIS WITH A NICE PROFESSIONAL HEADER
 CONTAINING:
 DATE, YOUR NAME, ORGANIZATION
 COPYRIGHT
SUMMARY OF THIS CODE
*/

// =====================================================================
// you have been provided some working code to get you started
// it is your job to add functionality as described in the assignment
// =====================================================================
// --- 1. SETUP & SELECTION ---
// We grab the canvas from the HTML so JS can "see" it
const canvas = document.getElementById('clockCanvas');

// The 'context' is the actual API we use to draw (think of it as the toolbox)
const ctx = canvas.getContext('2d');

// Calculate the radius based on the canvas size. 
// We use half the height to ensure the clock fits perfectly in the center.
const radius = canvas.height / 2;

// IMPORTANT: By default, (0,0) is the top-left corner of the canvas.
// translate(x, y) moves the (0,0) origin to the center of our canvas.
// This makes drawing a circle much easier!
ctx.translate(radius, radius);

// --- 2. THE DIGITAL CLOCK EXAMPLE ---
function updateDigitalClock() {
    // The Date object contains the current system time
    const now = new Date();
    
    // toLocaleTimeString() gives us a nice "11:30:05 AM" format
    const timeString = now.toLocaleTimeString();
    
    // Update the text inside our <div> in the HTML
    document.getElementById('digital-clock').innerText = timeString;

    drawClock();
}

// setInterval runs a function repeatedly. 
// 1000 milliseconds = 1 second.
setInterval(updateDigitalClock, 1000); 


// --- 3. ANALOG CLOCK DRAWING ---

function drawClock() {
    // In an animation, you usually need to clear the canvas here 
    // or redraw the background so the old "frames" disappear.
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    
    // STUDENT TASK: Call your future 'drawHands' function here!
    drawHands(ctx, radius);
}

function drawFace(ctx, radius) {
    // Start a new shape
    ctx.beginPath();
    
    // arc(x, y, radius, startAngle, endAngle)
    // 2 * Math.PI represents a full 360-degree circle in Radians
    // arc(canterX, centerY, radiusofArc, angle start, angle finish (in radians))
    ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI); //Prepare to draw
    
    ctx.fillStyle = 'white';
    ctx.fill(); // Fill the circle with white

    // Draw the outer border (the "rim" of the clock)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    ctx.stroke(); // Actually draws
    
    // Draw a small black circle in the very center (the "pin" for the hands)
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    // Loop 12 times to place numbers 1 through 12
    for (let num = 1; num <= 12; num++) {
        // Calculate the angle for each number (30 degrees or PI/6 radians)
        let ang = num * Math.PI / 6;

        // 1. Rotate the entire 'paper' to the correct angle
        ctx.rotate(ang);
        // 2. Move 'up' the canvas (negative Y) to the edge of the clock
        ctx.translate(0, -radius * 0.75);
        // 3. Rotate back so the number itself isn't tilted
        ctx.rotate(-ang);
        
        // Draw the number text
        ctx.fillText(num.toString(), 0, 0);

        // 4. UNDO the movements so we are ready for the next number!
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.75);
        ctx.rotate(-ang);
    }
}

function drawHands(ctx, radius){
    //Draw a line
    ctx.beginPath(); //start new line

    ctx.lineCap = "butt" // square, round, butt

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
 
    ctx.moveTo(0, 0);

    //Get seconds, minutes, and hours
    const d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let time = h + ":" + m + ":" + s;
 
    //ctx.lineTo(radius * 0.8, 0);

    //Seconds
    let angle = s * 6 * Math.PI / 180;
    //console.log(time + " " + angle) //debug
    ctx.rotate(angle);
    ctx.lineTo(0, radius * -0.8);
    ctx.rotate(-angle);
    //ctx.lineTo( radius * 0.8 * Math.cos(angle), radius * 0.8 * Math.sin(angle));
    ctx.stroke();
 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    //Minutes
    ctx.beginPath(); //new line
    ctx.moveTo(0, 0); //move to center
    angle = m * 6 * Math.PI / 180; //calculate angle
    ctx.rotate(angle);
    ctx.lineTo(0, radius * -0.8);
    ctx.rotate(-angle);
    //ctx.lineTo( radius * 0.7 * Math.cos(angle), radius * 0.8 * Math.sin(angle)); //Calculate line
    ctx.stroke();

    //Hours
    ctx.beginPath();
    ctx.moveTo(0, 0);
    angle = ((h % 12) * 30 + (m / 2)) * Math.PI / 180;//(h * 30 - 90) * Math.PI / 180; //((h % 12) * 30) + (m * 0.5);             //h * 6 * Math.PI / 180;
    console.log(angle);
    ctx.rotate(angle); //Rotate
    ctx.lineTo(0, radius * -0.6); //draw line
    ctx.rotate(-angle); //rotate back
    //ctx.lineTo( radius * 0.6 * Math.cos(angle), radius * 0.8 * Math.sin(angle));
    ctx.stroke();
}

//Bouncing balls ==================================================================================

function haveCollided(b1, b2){
 //return true if ball are touching
 let dx = b1.pos.x - b2.pos.x;
 let dy = b1.pos.y - b2.pos.y;
 let dist = Math.sqrt(dx * dx + dy * dy);

 return dist < (b1.r + b2.r);
}

function bounce(b1, b2){
 let vTemp = b1.v;
 b1.v = b2.v;
 b2.v = vTemp;
}

class Sprite {
 constructor(x, y, r, vx, vy, sColor){ //defines what perameters we pass in
  this.pos = {x:x, y:y};
  this.r = r;
  this.v = {dx:vx, dy:vy}; 
  this.color = sColor; // syntax     the property : value passed in
 }
}

const canvas2 = document.getElementById("animationCanvas")
const ctx2 = canvas2.getContext('2d');

//let sprite1 = {pos: {x:30, y:30}, r:20, v: {dx:1, dy:1}, color: 'blue'};
//let sprite2 = {pos: {x:30, y:30}, r:20, v: {dx:2, dy:2}, color: 'purple'};
let sprite1 = new Sprite(Math.random() * 600 + 30, Math.random() * 300 + 30, Math.random() * 20 + 20, Math.random() * 10 + 1, Math.random() * 10 + 1, "blue");
let sprite2 = new Sprite(Math.random() * 600 + 30, Math.random() * 300 + 30, Math.random() * 20 + 20, Math.random() * 10 + 1, Math.random() * 10 + 1, "purple");
const arrSprites = [sprite1, sprite2];

//Color Library
const colorLibrary = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Black", "Aqua", "Brown"];

//Add 10 Sprites
for (let i = 0; i < 10; i++){
 arrSprites.push(new Sprite(Math.random() * 600 + 30, Math.random() * 300 + 30, Math.random() * 22 + 10, Math.random() * 10 + 1, Math.random() * 10 + 1, colorLibrary[Math.floor(Math.random() * colorLibrary.length)]));//colorLibrary[Math.floor(Math.random() * colorLibrary.length)])
}

//Referential variables
let inputXVel = document.getElementById("ElXVel")
let inputYVel = document.getElementById("ElYVel")

function drawGraphics() {
    ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
    //let sprite = sprite1;

    for (let i = 0; i < arrSprites.length; i++){
        let sprite = arrSprites[i];

        //
        for (let j=i+1; j < arrSprites.length; j++){
         if (haveCollided(sprite, arrSprites[j])){
          bounce(sprite, arrSprites[j]);
         }
        }
     
        ctx2.beginPath();
        ctx2.arc(sprite.pos.x, sprite.pos.y, sprite.r, 0, Math.PI * 2);
        ctx2.fillStyle = sprite.color;
        ctx2.fill();
    
        //Update velocity based on element input
        //sprite1.v.dx = 10;//document.getElementById("ElXVel").value;
        //sprite1.v.dy = 10;//document.getElementById("ElYVel").value;
     
        //Move the ball
        sprite.pos.x += sprite.v.dx;
        sprite.pos.y += sprite.v.dy;
        
    
        //Check if r has touched the X border
        if (sprite.pos.x + sprite.r > canvas2.width){//580){
            sprite.v.dx *= -1;
            sprite.pos.x = ctx2.canvas.width - sprite.r; // in case I get stuck in a wall
        } else if (sprite.pos.x - sprite.r < 0){//20){
            sprite.v.dx *= -1;
            sprite.pos.x = 0 + sprite.r;// in case I get stuck in a wall
        }
    
        //Check if it has touched the Y border
        if (sprite.pos.y + sprite.r > canvas2.height){ //380){
            sprite.v.dy *= -1;
            sprite.pos.y = ctx2.canvas.height - sprite.r;// in case I get stuck in a wall
        } else if (sprite.pos.y - sprite.r < 0){// 20){
            sprite.v.dy *= -1;
            sprite.pos.y = 0 + sprite.r;// in case I get stuck in a wall
        }

        //check if a corner was hit
        
    }
 
}

function setVelocity(){
   let xVal = Number(inputXVel.value);
   let yVal = Number(inputYVel.value);
 
   //If one velocity has been set, make sure the other one is at least 1
   //if (xVal == 0)
   //    xVal = 1
 
   //if (yVal == 0)
   //    yVal = 1
 
   //Adjust for negative velocities
   if (sprite1.v.dx < 0){
      sprite1.v.dx = xVal * -1;
   } else {
      sprite1.v.dx = xVal;
   }
   
   if (sprite1.v.dy < 0){
      sprite1.v.dy = yVal * -1;
   } else {
      sprite1.v.dy = yVal;
   }
}

setInterval(drawGraphics, 10)
// Run the function once immediately so the page isn't blank on load
drawClock();

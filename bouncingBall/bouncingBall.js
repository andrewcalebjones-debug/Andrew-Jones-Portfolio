//define what a rubber ball is
class rubberBall {
    constructor(id,x,y,dx,dy){
        //set properties
        this.id = id;
        this.xpos = x;
        this.ypos = y;
        this.xvel = dx;
        this.yvel = dy;
        //add a div to the container to represents the ball
        container.innerHTML += "<div class='ball' id='" + this.id + "'></div>"
    }

    update() {
        var obj = document.getElementById(this.id);
        this.xpos += this.xvel;
        this.ypos += this.yvel;
        if (this.xpos > windowW*0.95-20 || this.xpos < 0){
            this.xvel *= -1; //if the ball hits the side walls, switch directions
        }
        if (this.ypos > windowH*0.95-20 || this.ypos < 0){
            this.yvel *= -1; //if the ball hits the top or bottom, switch directions
        }
        obj.style.left = this.xpos + "px";
        obj.style.top = this.ypos + "px";
    }
}

//create an animation tier that calls a method to move everything
setInterval(clockTick, 1) // measured in milliseconds

//Where does the ball start?
//alert(window.getComputedStyle(ball1).top)
var ballX = window.getComputedStyle(ball1).left //639px
var ballY = window.getComputedStyle(ball1).top //652px
//make X and Y numbers that we can use later - subtract the "px" with substring
ballX = Number(ballX.substring(0,ballX.length-2));
ballY = Number(ballY.substring(0,ballY.length-2));
//determine width of windows
windowW = ballX*2;
windowH = ballY*2;

//Where is the ball going?
var ballDX = Math.random()*6-3; //random number between -3 and 3 //Change in the positive X direction
var ballDY = Math.random()*6-3; //Change in the positive Y direction

//add so many balls
var balls = [];
var container = document.getElementById("container")
for (let i=2; i < 100; i++){
    balls.push(new rubberBall("ball" + i, 100, 100, Math.random() * 6-3, Math.random() * 6-3, container));
}


function clockTick() {
    //move the ball based on dx and dy  
    var ball1 = document.getElementById("ball1")
    ballX += ballDX;
    ballY += ballDY;
    //Keep the ball in the container
    if (ballX>(windowW* 0.95 - 20) || ballX < 0) {
        ballDX *= -1;
    }
    if (ballY>(windowH* 0.95 - 20) || ballY < 0) {
        ballDY *= -1;
    }


    ball1.style.left = ballX + "px"
    ball1.style.top = ballY + "px"

    //Update each ball
    for (let ball in balls) {
        balls[ball].update()
    }
}
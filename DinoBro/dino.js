//Define Player
function Dino(id, y, dy) {
    this.id = id;
    this.ypos = y;
    this.yvel = dy;
}

//Define our obsticles

function Cactus(id, x, dx) {
    this.id = id;
    this.xpos = x;
    this.xvel = dx;
}
function Bird(id, x, dx) {
    this.id = id;
    this.xpos = x;
    this.xvel = dx;
}
function Rock(id, x, dx) {
    this.id = id;
    this.xpos = x;
    this.xvel = dx;
}

//Create and store our objects

//Player
const player = new Dino("player", 514, 0);
//Cactus
const cactus = new Cactus("cactus", 1060, 0);
//Bird
const bird = new Bird("bird", 1050, 0);
//Rock
const rock = new Rock("rock", 1030, 0);


//Variables
var game = false; //is the game going?
var jumping = false; //a boolean to see if our dino is jumping
var falling = false; //a boolean to see if the dino is falling
var canJump = true; //a boolean to make sure the player only jumps after getting back to the ground
var crouching = false; //a boolean to check if our dino is crouching
var obstLive = false; //a boolean to see if an obsticle is already in play
var choice; //a boolean to choose which obsticle is in play
var idleSwitch = false;

var obsticle; //so we can move our obsticle with one multi-purpose line of code
var obstHome; //a variable to keep track of object's first location so that they can be returned later
var Player1 = document.getElementById("Player");
var animation = 1; //what animation is the dino performing?
var aniInterval = 40; //to make animations transitions regularly
var frameInterval = 60; //to keep track of seconds. The game runs at approx. 60 fps
var crouchInterval = 100; //the length of time it takes to crouch
var currentSeconds = 0;
var currentMinutes = 0;
var highSec = 0;
var highMin = 0;
var leaderBoard = document.getElementById("leaderBoard");


var unorderedTimes = []; //an array for each person's time (for later)
var orderedTimes = []; //a sorted array for each person's time


setInterval(clockTick, 16.67) //Animation clock

document.addEventListener('keypress', move);



//Everything that happens during a tick/frame
function clockTick() {
    //nothing happens if the player doesn't start the game
    if (game) {
        //timer
        frameInterval -= 1;
        if (frameInterval <= 0) {
            frameInterval = 60;
            currentSeconds += 1;
            if (currentSeconds == 60) {
                currentSeconds -= 60;
                currentMinutes += 1;
            }
            if (currentSeconds > 9) {
            document.getElementById("timer").innerHTML = "Timer:" + " " + currentMinutes + ":" + currentSeconds;
            } else if (currentMinutes > 9 && currentSeconds < 10){
            document.getElementById("timer").innerHTML = "Timer:" + " " + currentMinutes + ":" +  "0" + currentSeconds;
            } else if (currentMinutes < 10 && currentSeconds > 9){
            document.getElementById("timer").innerHTML = "Timer:" + " " + currentMinutes + ":" +  currentSeconds;
            } else{
            document.getElementById("timer").innerHTML = "Timer:" + " " + "0" + currentMinutes + ":" +  "0" + currentSeconds;
            }
        }


        //Obsticle

        //Check if there is an object in play. If not, spawn one. If so, move it.
        if (obstLive == false) {
            choice = (Math.floor(Math.random() * 3));//Randomly select our obsticle
            switch (choice) {
                case 0: //cactus home
                    obstHome = cactus.xpos;
                    document.getElementById("cactus").style.display = "block"; //make cactus visible
                    cactus.xvel = Math.random() * 7 + 5; //select a random movement speed
                    obstLive = true;
                    break;
                case 1: //bird home
                    obstHome = bird.xpos;
                    document.getElementById("bird").style.display = "block"; //make bird visible
                    bird.xvel = Math.random() * 7 + 5; //select a random movement speed
                    obstLive = true;
                    break;
                case 2: //rock home
                    obstHome = rock.xpos;
                    document.getElementById("rock").style.display = "block"; //make rock visible
                    rock.xvel = Math.random() * 7 + 5; //select a random movement speed
                    obstLive = true;
                    break;
            }
        } else {
            //Check if the obsticle is off screen, if so, "delete" it and reset. If not, move it.
            switch (choice) {
                case 0: //Cactus
                    if (cactus.xpos < -100) { //delete cactus 
                        obstLive = false;
                        cactus.xpos = obstHome;
                        document.getElementById("cactus").style.left = obstHome + "px"; //return div to home
                        document.getElementById("cactus").style.display = "none";
                    } else {
                        //move cactus
                        cactus.xpos -= cactus.xvel;

                        //update CSS
                        document.getElementById("cactus").style.left = cactus.xpos + "px";
                    }
                    break;


                case 1: //bird
                    if (bird.xpos < -200) { //delete bird
                        obstLive = false;
                        bird.xpos = obstHome;
                        document.getElementById("bird").style.left = obstHome + "px";
                        document.getElementById("bird").style.display = "none";
                    } else {
                        //move bird
                        bird.xpos -= bird.xvel;

                        //update CSS
                        document.getElementById("bird").style.left = bird.xpos + "px"
                    }
                    break;


                case 2: //rock
                    if (rock.xpos < -100) { //delete rock
                        obstLive = false;
                        rock.xpos = obstHome;
                        document.getElementById("rock").style.left = obstHome + "px";
                        document.getElementById("rock").style.display = "none";
                    } else {
                        //move rock
                        rock.xpos -= rock.xvel;

                        //update CSS
                        document.getElementById("rock").style.left = rock.xpos + "px"
                    }
                    break;
            }
        }

        //Move the dino based on user input
        if (jumping && game && canJump) {
            //alert(jumping + "You called");
            jump();
            animation = 5;
        } else if (falling) {
            fall();
        } else if (crouching && game) {
            crouch()
            animation = 7;
        }


        //Dino animations

        //Animate Steps
        if (animation == 3 && aniInterval == 40) {
            document.getElementById("Player").src = "Images/dinoStep1.png";
            animation = 4;
            //alert("Animation: " + animation + " Crouching: " + crouching + " Crouching Interval: " + crouchInterval)

        } else if (animation == 4 && aniInterval == 20) {
            document.getElementById("Player").src = "Images/dinoStep2.png";
            animation = 3;
            
        } else if (animation == 7 && crouching == 40) { //crouching
            document.getElementById("Player").src = "Images/dinoCrouch1.png";
            animation = 8;

        } else if (animation == 8 && crouching == 20) { //crouching
            document.getElementById("Player").src = "Images/dinoCrouch2.png";
            animation = 7;

        } else { //animate other states
            switch (animation) {
                case 5://jumping
                    document.getElementById("Player").src = "Images/dinoJump.png";
                    break;
                case 6://falling
                    document.getElementById("Player").src = "Images/dinoFall.png";
                    break;
            }
        }
    } else {

        //animate idle
        if (animation == 1 && idleSwitch == false && aniInterval == 40) {
                    document.getElementById("Player").src = "Images/dinoIdle1.png";
                    animation = 2;
                    idleSwitch = true;
        } else if (animation == 2 && idleSwitch && aniInterval == 40) {
                    document.getElementById("Player").src = "Images/dinoIdle2.png";
                    animation = 1;
                    idleSwitch = false;
        }
    }

    //have steps/idle animations happen at regular looking times
    if (aniInterval == 0) {
        aniInterval = 40;
    } else {
        aniInterval -= 1;
    }



    //Check to see if the hitboxes of the player and obsticle touch, if they do, game over.

    switch (choice) {
        case 0: //check if a cactus has hit the player
            if (player.ypos > 385 && cactus.xpos < 255 && cactus.xpos > 140 && game) {
                gameOver();
            }
            break;
        case 1: //check if a UFO has hit the player
            if (!crouching && bird.xpos < 240 && bird.xpos > 0 && game) {
                gameOver();
            }
            break;
        case 2: //check if a rock has hit the player
            if (player.ypos > 425 && rock.xpos < 255 && rock.xpos > 100 && game) { //263
                gameOver();
            }
            break;
    }

}



//Functions

function startGame() {
    game = true;
    document.getElementById("startPrompt").style.display = "none";
    animation = 3;
    playerName = document.getElementById("playerName").value;
}

//The dino is gonna do something. What?
function move(e) {
    //did they crouch or jump?
    switch (e.charCode) {
        case 115: // s
            crouching = true;
            document.getElementById("Player").src = "Images/dinoCrouch2.png";
            break;
        case 32: // spacebar
            jumping = true;
            break;
    }
}

function jump() {
    if (player.ypos > 356) { //change the speed of the dino's ascent based on it's x position (make a realistic looking arch)
        player.yvel = 7;
    } else if (player.ypos > 331) {
        player.yvel = 5;
    } else if (player.ypos > 296) {
        player.yvel = 4;
    } else if (player.ypos > 286) {
        player.yvel = 3;
    } else {
        jumping = false;
        falling = true;
        canJump = false;
    }

    //Actually move our dino up once
    player.ypos -= player.yvel;
    Player1.style.top = player.ypos + "px"; //Update CSS
}

function fall() {
    if (player.ypos < 286) { //change the speed of the dino's descent based on it's x position (make a realistic looking arch)
        player.yvel = 1;
    } else if (player.ypos < 296) {
        player.yvel = 3;
        animation = 6;
    } else if (player.ypos < 331) {
        player.yvel = 5;
    } else if (player.ypos < 356) {
        player.yvel = 6;
    } else if (player.ypos > 506 && player.ypos < 514) {
        player.yvel = 1;
    } else if (player.ypos >= 514) {
        canJump = true;
        falling = false;
        animation = 3;
        document.getElementById("Player").src = "Images/dinoStep1.png"
    }
    //Actually move our dino down once
    player.ypos += player.yvel;
    Player1.style.top = player.ypos + "px"; //Update CSS
}

function crouch() {
    if (crouchInterval == 0) { //done crouching
        Player1.style.height = 70 + "px";
        Player1.style.width = 70 + "px";
        Player1.style.top = 514 + "px";
        crouchInterval = 100;
        crouching = false;
        animation = 3;
        document.getElementById("Player").src = "Images/dinoStep1.png";
        //alert("Animation: " + animation + " Crouching: " + crouching + " Crouching Interval: " + crouchInterval);

        //reset other elements to maintain their position
        document.getElementById("cactus").style.top = 360 + "px";
        document.getElementById("bird").style.top = 285 + "px";
        document.getElementById("rock").style.top = 410 + "px";
    } else { //start or continue crouching
        Player1.style.height = 55 + "px";
        Player1.style.width = 75 + "px";
        Player1.style.top = 530 + "px";
        animation = 7;
        crouchInterval -= 1;

        //reset other elements to maintain their position
        document.getElementById("cactus").style.top = 375 + "px";
        document.getElementById("bird").style.top = 300 + "px";
        document.getElementById("rock").style.top = 425 + "px";
    }

}

function gameOver() {
    alert("Game Over")
    //reset everything
    document.getElementById("startPrompt").style.display = "block"
    document.getElementById("cactus").style.top = 360 + "px";
    document.getElementById("bird").style.top = 285 + "px";
    document.getElementById("rock").style.top = 410 + "px";
    Player1.style.top = 514 + "px";
    player.ypos = 514;
    animation = 1;
    game = false;
    obstLive = false;
    falling = false;
    canJump = true;

    switch (choice) {
        case 0:
            cactus.xpos = obstHome;
            document.getElementById("cactus").style.display = "none";
            break;
        case 1:
            bird.xpos = obstHome;
            document.getElementById("bird").style.display = "none";
            break;
        case 2:
            rock.xpos = obstHome;
            document.getElementById("rock").style.display = "none";
            break;
    }
    //update leaderboard with high score
    if (currentMinutes > highMin) {
        if (currentSeconds > 9) {
            document.getElementById("leaderBoard").innerHTML = playerName + " " + currentMinutes + ":" + currentSeconds;
            } else if (currentMinutes > 9 && currentSeconds < 10){
            document.getElementById("leaderBoard").innerHTML = playerName + " " + currentMinutes + ":" +  "0" + currentSeconds;
            } else if (currentMinutes < 10 && currentSeconds > 9){
            document.getElementById("leaderBoard").innerHTML = playerName + " " + currentMinutes + ":" +  currentSeconds;
            } else{
            document.getElementById("leaderBoard").innerHTML = playerName + " " + "0" + currentMinutes + ":" +  "0" + currentSeconds;
            }
    } else if (currentSeconds > highSec && currentMinutes == highMin){
        if (currentSeconds > 9) {
            document.getElementById("leaderBoard").innerHTML = playerName + " " + currentMinutes + ":" + currentSeconds;
            } else if (currentMinutes > 9 && currentSeconds < 10){
            document.getElementById("leaderBoard").innerHTML = playerName + " " + currentMinutes + ":" +  "0" + currentSeconds;
            } else if (currentMinutes < 10 && currentSeconds > 9){
            document.getElementById("leaderBoard").innerHTML = playerName + " " + currentMinutes + ":" +  currentSeconds;
            } else{
            document.getElementById("leaderBoard").innerHTML = playerName + " " + "0" + currentMinutes + ":" +  "0" + currentSeconds;
            }
    }



    //go through all past times and sort them into a new array (personal goal)


    //display the scores in order on the leaderboard (personal goal)
}



changeTheTime();
setInterval(changeTheTime, 1000) //every 1000 miliseconds, call the function

function changeTheTime() {
    //Get the time and update the page
    var date = new Date(); //creates a date/time object with all the properties
    //date.setHours(1); //For debuging
    //date.setMinutes(0);
    //split info from date object
    var hr = date.getHours(); //Hours are already set to millitary time
    //Fix Hours
    if (hr >= 12) {
        //AM to PM
        document.getElementById("meridian").innerHTML = "PM";
    }
    var mornEve = document.getElementById("meridian").innerHTML;
    if (hr > 12) {
        //Subtract 12
        hr -= 12;
    }
    if (hr == 0) {
        hr = 12;
    }

    var min = date.getMinutes();
    //Fix single digits minutes
    if (min < 10) {
        min = "0" + min;
    }

    var sec = date.getSeconds();
    //fix single digit seconds
    if (sec < 10) {
        sec = "0" + sec;
    }

    //update html to show new time
    document.getElementById("hour").innerHTML = hr;
    document.getElementById("minute").innerHTML = min;
    document.getElementById("second").innerHTML = sec;

    //make a change every second based on the 1s position
    var rem = date.getSeconds() % 10; //modulus division
    switch (rem) {
        case 0:
            document.getElementById("second").className = "zero";
            break;
        case 1:
            document.getElementById("second").className = "one";
            break;
        case 2:
            document.getElementById("second").className = "two";
            break;
        case 3:
            document.getElementById("second").className = "three";
            break;
        case 4:
            document.getElementById("second").className = "four";
            break;
        case 5:
            document.getElementById("second").className = "five";
            break;
        case 6:
            document.getElementById("second").className = "six";
            break;
        case 7:
            document.getElementById("second").className = "seven";
            break;
        case 8:
            document.getElementById("second").className = "eight";
            break;
        case 9:
            document.getElementById("second").className = "nine";
            break;
        
    }

    //Other changes at specific seconds
    var mem = date.getSeconds();

    switch (mem) {
        case 15:
        document.getElementById("timeHead").className = "time15";
        document.getElementById("bod").className = "background15";
        document.getElementById("minute").className = "min15";
        document.getElementById("hour").className = "hr15";
            break;
        case 30:
        document.getElementById("timeHead").className = "time30";
        document.getElementById("bod").className = "background30";
        document.getElementById("minute").className = "min30";
        document.getElementById("hour").className = "hr30";
            break;
        case 45:
        document.getElementById("timeHead").className = "time45";
        document.getElementById("bod").className = "background45";
        document.getElementById("minute").className = "min45";
        document.getElementById("hour").className = "hr45";
            break;
        case 59:
        document.getElementById("timeHead").className = "time59";
        document.getElementById("bod").className = "background59";
        document.getElementById("minute").className = "min59";
        document.getElementById("hour").className = "hr59";
            break;
    }

    //identify if any number in the clock is prime
    var secPrime = true;
    var minPrime = true;
    var hrPrime = true;

    for (let i = 2; i < sec; i += 1) {//increment through every number from 2 to half of the number of seconds and see if anything evenly divides
        if (sec % i == 0) { //If something evenly divides or if it's one, the number isn't prime
            secPrime = false;
        }
    }
    if (sec < 2) {
        secPrime = false;
    }

    for (let i = 2; i < min; i += 1) {
        if (min % i == 0 || min < 2) {
            minPrime = false;
        }
    }
    if (min < 2) {
        minPrime = false;
    }

    for (let i = 2; i < hr; i += 1) {
        if (hr % i == 0 || hr < 2) {
            hrPrime = false;
        }
    }
    if (hr < 2) {
        hrPrime = false;
    }

    //all of my evens will be prime appearently

    //When hours are 12 and minutes are 00, display text that says "It's High noon." 
    //When numbers in the clock are prime, show "It's prime time!." 
    //Otherwise, leave it blank.
    if (hr == 12 && min == 0 && mornEve == "PM") {
        document.getElementById("reaction").innerHTML = "IT'S HIGH NOON!!!";
    }
    else if (secPrime == true || minPrime == true || hrPrime == true) {
        document.getElementById("reaction").innerHTML = "It's Prime Time";
    } else {
        document.getElementById("reaction").innerHTML = "";
    }

    /*TO-DO List
    When the minutes or the seconds are a single digit number, add a leading zero
 
    When the hours exceed 12, subtract 12 from the hours and change AM to PM
 
    Every second, change something stylistic on the page (ie color, backgroud color, font size, rotation, opacity, alignment, etc.)
    */
}
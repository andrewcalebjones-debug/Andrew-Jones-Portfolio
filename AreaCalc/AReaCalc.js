//Create a function that calculates the area of a shape
function CalcArea(shape) {

    if (shape == 1) {
        //Circle

        //Input            
        var r = Number(document.getElementById("radius").value);
        var d = Number(document.getElementById("diameter").value);
        //Processing

        var cArea = Math.PI * r * r;
        //Output
        document.getElementById("circleArea").innerHTML = cArea;
        DrawCircle(r);
    }
    else if (shape == 4) {
        //Rectangle

        //Input
        var rB = Number(document.getElementById("rBase").value);
        var rH = Number(document.getElementById("rHeight").value);
        //Processing
        var rArea = rB * rH
        //Output
        document.getElementById("recArea").innerHTML = rArea;
        DrawRec(rB, rH);
    }
    else if (shape == 3) {
        //Triangle

        //Input
        var tB = Number(document.getElementById("tBase").value);
        var tH = Number(document.getElementById("tHeight").value);
        //Processing
        var tArea = tB * tH / 2;
        //Output
        document.getElementById("triArea").innerHTML = tArea;
        DrawTri(tB, tH);
    } else {
        alert("No Valid Input")
    }
}
//fix diameter
function fixDia() {
    //calculates and displays the diameter based of radius
    //alert("a key was released")
    document.getElementById("diameter").value = document.getElementById("radius").value * 2
}

//fix radius
function fixRad() {
    //calculates and displays radius based on diameter
    document.getElementById("radius").value = document.getElementById("diameter").value / 2
}

//functions for drawing shapes
function DrawCircle(rad) {
    //draws a circle on the canvas and labels radius
    var areaCanvas = document.getElementById("cirCanvas");
    var ctx = areaCanvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 150); //erasing everything in the canvas
    ctx.strokeStyle = "aquamarine";
    ctx.beginPath();
    ctx.arc(75, 75, 60, 0, 2 * Math.PI); //change 1 to 2Pi for a full circle
    ctx.moveTo(75, 75);
    ctx.lineTo(135, 75); //Draw a line to the 3 o' clock position
    ctx.stroke(); //draw the path

    //Display the radius's value on the radius line
    ctx.font = "12px Arial";
    ctx.fillStyle = "aquamarine"; //White Text
    ctx.fillText("Radius: " + rad, 65, 68);
    ctx.fillText(document.getElementById("circleArea").innerHTML, 50, 100);
}

function DrawRec(base, height) {
    //draws a rectangle
    var scale;
    if (base > height) {
        scale = base;
    } else {
        scale = height
    }
    var dBase = base / scale * 120;
    var dHeight = height / scale * 120;

    var areaCanvas = document.getElementById("recCanvas");
    var ctx = areaCanvas.getContext("2d");

    ctx.clearRect(0, 0, 150, 150); //erasing everything in the canvas (doesn't work though)
    ctx.strokeStyle = "aquamarine";
    ctx.beginPath();

    //ctx.rect(30, 30, dBase, dHeight); 
    ctx.moveTo(75 - dBase / 2, 75 + dHeight / 2);
    ctx.lineTo(75 + dBase / 2, 75 + dHeight / 2);
    ctx.lineTo(75 + dBase / 2, 75 - dHeight / 2);
    ctx.lineTo(75 - dBase / 2, 75 - dHeight / 2);
    ctx.lineTo(75 - dBase / 2, 75 + dHeight / 2);

    ctx.stroke(); //draw the path

    //Display the radius's value on the radius line
    ctx.font = "12px Arial";
    ctx.fillStyle = "aquamarine"; //White Text
    ctx.fillText("Length: " + height, 10, 20);
    ctx.fillText("Width: " + base, 50, 140);
}




function DrawTri(base, height) {
    //draws a Triangle
    var scale;
    if (base > height) {
        scale = base;
    } else {
        scale = height
    }
    var dBase = base / scale * 120;
    var dHeight = height / scale * 120;

    //draw
    var areaCanvas = document.getElementById("triCanvas");
    var ctx = areaCanvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 150,); //erasing everything in the canvas
    ctx.strokeStyle = "aquamarine";

    ctx.moveTo(75 - dBase / 2, 75 + dHeight / 2);
    ctx.lineTo(75 + dBase / 2, 75 + dHeight / 2);
    ctx.lineTo(75, 75 - dHeight / 2);
    ctx.lineTo(75 - dBase / 2, 75 + dHeight / 2);
    ctx.stroke();

    //Display the radius's value on the radius line
    ctx.font = "12px Arial";
    ctx.fillStyle = "aquamarine"; //White Text
    ctx.fillText("Height: " + height, 10, 20);
    ctx.fillText("Base: " + base, 10, 140);
}
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23301067&assignment_repo_type=AssignmentRepo)
# cs460AnimationProject
Start with an animated clock and add more.

Setting up a canvas-based project is a classic way to learn how JavaScript handles time and frame-based rendering. Below is a clean, structured HTML setup and the initial logic for an analog clock.

---

## 1. The Web Page Structure (HTML & CSS) - see index.html
This provides the "stage" for your drawings. We use a `<canvas>` element, which acts as a blank grid where JavaScript can paint pixels.


## 2. The JavaScript (Logic & Drawing) - see script.js
The following code handles the digital timer and draws a **static** version of the analog clock. 

> **Note:** To draw on the canvas, we use a "context" (usually `ctx`). Think of the context as the paintbrush and the canvas as the paper.

## 3. Assignment: Animate the Hands
Now that the clock face is ready, it's your turn to make it move! To complete this, you need to draw the **Hour**, **Minute**, and **Second** hands based on the current time.

### Instructions:
1.  **Create a `drawHand` function:** This function should take the context (`ctx`), the angle (rotation), the length of the hand, and its width.
2.  **Calculate the Angles:**
    * **Seconds:** There are 60 seconds in a circle ($2\pi$ radians). The angle for the second hand is `(seconds * Math.PI / 30)`.
    * **Minutes:** Similar to seconds, but don't forget to add a tiny bit of movement based on the current seconds so the hand moves smoothly.
    * **Hours:** There are 12 hours in a circle. The angle is `(hours * Math.PI / 6)`.
3.  **Use a Loop:** Use `setInterval(drawClock, 1000)` to redraw the entire clock every second. 
    * **Hint:** Inside `drawClock`, you must clear the canvas or redraw the face first, otherwise, the hands will just stack on top of each other!

It is up to you to figure out the math behind converting time into radians for the canvas rotation!

## 4. Animate a bouncing ball in the second canvas
* The goal is to bounce a ball inside the second canvas
* Find out how to draw a circle on the second canvas and test your code
* Then how to redraw the circle in a new position - you can either erase the ball, or clear the whole canvase and redraw.
* Design an Ball object that contains all the information needed to draw an instance of a ball.  
* Later you will be creating an array of ball objects, each with its independent x,y velocity.


## Assignment Grading Rubric (100 Points Total)

| Category | Criteria | Points |
| :--- | :--- | :--- |
| **Analog Clock Animation** | **Time Logic:** Correctly calculates radians for Hours, Minutes, and Seconds. | 15 |
| | **Visual Accuracy:** Hands point to the correct numbers and move smoothly. | 10 |
| | **Implementation:** Uses `setInterval` or `requestAnimationFrame` to refresh the clock. | 5 |
| **Ball Object & Setup** | **Object Design:** Implements the `Ball` class with properties for position, velocity, and size. | 10 |
| | **Drawing:** Correctly uses `arc()` and `fill()` to render the ball on the second canvas. | 10 |
| **Ball Physics** | **Movement:** Ball moves at a consistent "velocity" (distance per frame). | 10 |
| | **Collision Detection:** Ball reverses direction accurately when hitting all 4 canvas walls. | 15 |
| **User Interface** | **Controls:** The Start/Stop button successfully toggles the ball animation without affecting the clock. | 10 |
| **Code Quality** | **Organization:** Code is well-commented, uses meaningful variable names, and follows DRY (Don't Repeat Yourself) principles. | 15 |
| **Total** | | **100** |



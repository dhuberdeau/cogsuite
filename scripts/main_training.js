// A function to change the color of the circle

// A variable to store the current color of the circle
var currentColor = "white";

// A function to change the color of the circle
function changeColor() {
  // Get the circle element by its id
  var circle = document.getElementById("circle");
  // If the current color is white, change it to black
  if (currentColor == "white") {
    circle.style.backgroundColor = "grey";
    currentColor = "grey";
  }
  // Otherwise, change it to white
  else {
    circle.style.backgroundColor = "white";
    currentColor = "white";
  }
}

// A function to start the flashing animation
function startFlashing() {
  // Set an interval to call the changeColor function every 500 milliseconds
  setInterval(changeColor, 333);
}

var try_button = document.getElementById("try-it-button");

try_button.addEventListener("click", function() {
    var next_text_paragraph = document.getElementById("next_text_p");
    var next_text_sequence = document.getElementById("next_text_sequence");
    var next_text_circle = document.getElementById("circle");
    next_text_paragraph.style.display = "block";
    next_text_sequence.style.display = "block";
    next_text_circle.style.display = "block";
});


// function changeColor() {
//   // Get the circle element by its id
//   var circle = document.getElementById("circle");
//   // Generate a random color in hexadecimal format
//   var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
//   // Set the background color of the circle to the random color
//   circle.style.backgroundColor = color;
// }
//
// // A function to start the flashing animation
// function startFlashing() {
//   // Set an interval to call the changeColor function every 500 milliseconds
//   setInterval(changeColor, 400);
// }

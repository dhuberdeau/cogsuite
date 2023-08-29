// const myHeading = document.querySelector("h1");
// myHeading.textContent = "Interior Design Page..";

function diffArray(arr) {
    var diffs = []
    if (arr.length < 2){
        diffs.push(0);
    } else {
        for (var i = 0; i < arr.length-1; i++){
            diffs.push(arr[i+1] - arr[i]);
        }
    }
    return diffs;
}

let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

const timeOut = 60000; //milliseconds to run experiment.

const imageDisplayTime = 750; //milliseconds to display im

// Get the canvas element and context
const canvas = document.getElementById("tapTime-chart");
const ctx = canvas.getContext("2d");
                   
let guessCount = 1;
let resetButton;
guessField.focus();

let tapTimes = [];
let vect = [1,2,3,4,5];

let imageAsyncTime = Math.floor(Math.random() * 6000) + 1;
// number of milliseconds to delay showing the image


function showTargetImage() {
    var image = document.getElementById("targetImage");
    image.style.display = "block";
    setTimeout(function(){
        image.style.display = "none";
    }, imageDisplayTime);
}

function resetGame() {
    guessCount = 1;
  
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
    imageAsyncTime = Math.floor(Math.random() * 12000) + 1;
  }

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount == 1){
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += `${userGuess}`;
    guesses.textContent += ', '

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!Game Over!!!';
        lowOrHi.textContent = '';
        setGameOver()
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

// setTimeout(function(){
//     showTargetImage()
// }, imageAsyncTime);

guessSubmit.addEventListener('click', checkGuess);

// let vect = diffArray(tapTimes)
// Create the chart
var chart = new Chart(ctx, {
    type: "line",
    data: {
    labels: Array.from({ length: vect.length }, (_, i) => i + 1),
    datasets: [
        {
        label: "Vector Plot",
        data: vect,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        },
    ],
    },
    options: {},
});

document.onkeydown = function(event){
    if (event.code === "KeyB"){
        var timestamp = new Date().getTime();
        tapTimes.push(timestamp)
        vect = diffArray(tapTimes)
        chart.data.datasets[0].data = vect
        chart.data.labels = Array.from(Array(vect.length).keys())
        chart.update()
    } else {
        
    }
}

// n-back task code: (n = 2)
const n_back = 2;
var num = 0;
var sequence = [];
var n_expected = 0;
var grand_count = 0;
var count_expected = [];
function changeNumber() {
    grand_count++;
    num = Math.floor(Math.random()*10);
    document.getElementById("n-back-number").innerHTML = num;
    setTimeout(function (){
        document.getElementById("n-back-number").innerHTML = '*';
        }, 750)
    sequence.push(num)
    if (sequence.length > n_back) {
        sequence.shift()
    }
    if (sequence[0]==num) {
        n_expected = n_expected + 1;
        count_expected.push(grand_count)
    }
}
var timeoutid = setInterval(changeNumber, 1000);

var n_identified = 0;
var count_identified = [];
function increment() {
    n_identified++;
    count_identified.push(grand_count)
}

// Save an array to a local file:
function saveArrayToFile(array, filename){
    var array_to_save = new Blob([array.join(", ")],
     {type: "text/plain;charset=utf-8"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(array_to_save);
    link.download = filename;
    link.click();
}

function showContent() {
    var select = document.getElementById("T1-selection");
    var option = select.value;
    var num_gam = document.getElementById("number-game");
    var n_back = document.getElementById("n-back-task");
    if (option == "number-game") {
        num_gam.style.display = "block";
        n_back.style.display = "none";
    } else if (option == "n-back-task") {
        num_gam.style.display = "none";
        n_back.style.display = "block";
    }
}

setTimeout(function(){
    clearTimeout(timeoutid);
    alert('Terminate present experiment');
}, timeOut)
setTimeout(function(){iti_array = diffArray(tapTimes)}, timeOut+500)
setTimeout(function(){saveArrayToFile(iti_array, 'ITI_array_data.txt')},
     timeOut+750)

function specify_beat_sequence() {
    var select = document.getElementById("T2-selection");
    var option = select.value;
    var beat_display = document.getElementById("beat-sequence-display");
    if (option == "default") {
        beat_display.style.display = "none";
    }
    if (option == "length3") {
        beat_display.style.display = "block";
        beat_display.innerHTML = "<h3>1 1 0</h3>";
    }
    if (option == "length4") {
        var rand_num = Math.random();
        beat_display.style.display = "block";
        if (rand_num < .5) {
            beat_display.innerHTML = "<h3>1 1 0 0</h3>";
        }
        if (rand_num >= .5) {
            beat_display.innerHTML = "<h3>1 1 1 0</h3>";
        }
    }
    if (option == "length5") {
        var rand_num = Math.random();
        beat_display.style.display = "block";
        if (rand_num < .25) {
            beat_display.innerHTML = "<h3>1 1 0 0 0</h3>";
        }
        if (rand_num >= .25 && rand_num < .5) {
            beat_display.innerHTML = "<h3>1 0 1 0 0</h3>";
        }
        if (rand_num >= .5 && rand_num < .75) {
            beat_display.innerHTML = "<h3>1 1 1 0 0</h3>";
        }
        if (rand_num >= .75) {
            beat_display.innerHTML = "<h3>1 1 0 1 0</h3>";
        }
    }
    if (option == "length6") {
        var rand_num = Math.random();
        beat_display.style.display = "block";
        if (rand_num < .25) {
            beat_display.innerHTML = "<h3>1 1 1 0 0 0</h3>";
        }
        if (rand_num >= .25 && rand_num < .5) {
            beat_display.innerHTML = "<h3>1 1 0 1 0 0</h3>";
        }
        if (rand_num >= .5 && rand_num < .75) {
            beat_display.innerHTML = "<h3>1 1 1 0 1 0</h3>";
        }
        if (rand_num >= .75) {
            beat_display.innerHTML = "<h3>1 0 1 1 0 0</h3>";
        }
    }
    if (option == "length7") {
        var rand_num = Math.random();
        beat_display.style.display = "block";
        if (rand_num < .25) {
            beat_display.innerHTML = "<h3>1 1 0 1 0 0 0</h3>";
        }
        if (rand_num >= .25 && rand_num < .5) {
            beat_display.innerHTML = "<h3>1 0 1 1 0 0 0</h3>";
        }
        if (rand_num >= .5 && rand_num < .75) {
            beat_display.innerHTML = "<h3>1 0 1 0 1 0 0</h3>";
        }
        if (rand_num >= .75) {
            beat_display.innerHTML = "<h3>1 1 0 1 0 1 0</h3>";
        }
    }
}

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

var buttonoff = document.getElementById("off_button");

buttonoff.addEventListener("click", function() {
    var circle = document.getElementById("circle");
    if (circle.style.display == "none") {
        circle.style.display = "block";
    } else {
        circle.style.display = "none";
    }
});

// some work to try to get foot-pedal to work with map
// let var2 = [];
// const mapFrame = document.getElementById('map-frame');
// iframe_el = $('#map-frame')
// iframe_el.addEventListener("keydown", function(){var2.push(1);})
// mapFrame.contentWindow.document.addEventListener("keydown", function(event){
//     var2.push(event.key);
//     console.log('Pressed key: ' + event.key);
// }) 

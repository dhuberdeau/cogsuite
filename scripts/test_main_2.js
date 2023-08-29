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

setTimeout(function(){
    showTargetImage()
}, imageAsyncTime);

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

        // Compute power spectral density
        var fft = new FFT(vect.length, 1);
        fft.forward(vect);
        var psd = new Array(vect.length);
        for (var i = 0; i < vect.length; i++) {
            psd[i] = Math.pow(fft.real[i], 2) + Math.pow(fft.imag[i], 2);
        }

        // Plot power spectral density
        var trace1 = {
            x: Array.from({length: vect.length}, (_, i) => i),
            y: psd,
            type: 'scatter'
        };
        var layout = {
            title: 'Power Spectral Density Plot',
            xaxis: {
                title: 'Frequency (Hz)',
                tickvals: Array.from({length: vect.length}, (_, i) => i)
            },
            yaxis: {
                title: 'Power',
                range: [0, Math.max(...psd)]
            }
        };
        Plotly.newPlot('plot', [trace1], layout);

    } else {
        
    }
}

let var2 = [];
const mapFrame = document.getElementById('map-frame');
// iframe_el = $('#map-frame')
// iframe_el.addEventListener("keydown", function(){var2.push(1);})
mapFrame.contentWindow.document.addEventListener("keydown", function(event){
    var2.push(event.key);
    console.log('Pressed key: ' + event.key);
}) 
// $(document).ready(function() {  

//     $('#map-frame').ready(function(){
//     $(this).contents().on('keypress', function(event) { 
//       var2.push(1)});
//     });
//     $('#map-frame').attr("src","JavaScript:'iframe content'");
    
//     }); 


window.onload = function() {
    // Input time series data
    var tapTimes = [1, 2, 3, 4, 5, 4, 3, 2, 1];

    // Compute power spectral density
    var fft = new FFT(tapTimes.length, 1);
    fft.forward(tapTimes);
    var psd = new Array(tapTimes.length);
    for (var i = 0; i < tapTimes.length; i++) {
        psd[i] = Math.pow(fft.real[i], 2) + Math.pow(fft.imag[i], 2);
    }

    // Plot power spectral density
    var trace1 = {
        x: Array.from({length: tapTimes.length}, (_, i) => i),
        y: psd,
        type: 'scatter'
    };
    var layout = {
        title: 'Power Spectral Density Plot',
        xaxis: {
            title: 'Frequency (Hz)',
            tickvals: Array.from({length: tapTimes.length}, (_, i) => i)
        },
        yaxis: {
            title: 'Power',
            range: [0, Math.max(...psd)]
        }
    };
    Plotly.newPlot('plot', [trace1], layout);
}

// n-back task code: (n = 2)
const n_back = 2;
var num = 0;
var sequence = [];
function changeNumber() {
    num = Math.floor(Math.random()*10);
    document.getElementById("n-back-number").innerHTML = num;
    sequence.push(num)
    if (sequence.length > n_back) {
        sequence.shift()
    }
    if (sequence.includes(num)) {}
    sequence.push(num)
}
setInterval(changeNumber, 1000);
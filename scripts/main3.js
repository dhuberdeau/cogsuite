
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

// Get the canvas element and context
const canvas = document.getElementById("tapTime-chart");
const ctx = canvas.getContext("2d");

let tapTimes = [];
let vect = [1,2,3,4,5];



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



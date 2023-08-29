// ploter.js

// Define the vector of numbers
const vector = [1, 2, 3, 4, 5, 6];

// Get the canvas element and context
const canvas = document.getElementById("tapTime-chart");
const ctx = canvas.getContext("2d");

// Create the chart
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: Array.from({ length: vector.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "Vector Plot",
        data: vector,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
      },
    ],
  },
  options: {},
});
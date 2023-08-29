// This script accompanies the CogSuite welcome page.


// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// The URL of the target page
var url = "test3.html";

// Open a connection to the server
xhr.open("POST", url, true);

// Set the content type header to "application/json"
xhr.setRequestHeader("Content-Type", "application/json");

// Define a function to handle the response from the server
xhr.onreadystatechange = function () {
  // Check if the request is completed and successful
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Parse the response as JSON
    var json = JSON.parse(xhr.responseText);
    // Log the response
    console.log(json);
  }
};

// The JSON data to be sent
var data = JSON.stringify({
  name: "John",
  age: 25,
});

// Send the JSON data to the server
xhr.send(data);

$(document).ready(function(){
    $("#SaveCredentials").click(function(){
      var text = $("#text").val(); //get the text from the input box
      var data = {"text": text}; //create a json object with the text
      data["newField"] = "another value"
      var json = JSON.stringify(data); //convert the json object to a string
      var blob = new Blob([json], {type: "application/json"}); //create a blob object with the json string
      var url = URL.createObjectURL(blob); //create a URL for the blob object
      var link = document.createElement("a"); //create a link element
      link.href = url; //set the link href to the URL
      // link.download = "data.json"; //set the link download attribute to the file name
      // link.click(); //click the link
    });
  });
  

function startInstructions() {
    window.open('test3.html',
     '_blank');
}


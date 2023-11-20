 // This function handles events where one button is clicked
 $("#search-button").on("click", function(event) {
  event.preventDefault();

  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=33.4&lon=-94.4&appid=3daaa686e6b7ee2c9173bb0fd254fbba";

  fetch(apiUrl)
  .then(function (response) {
    // returning the json data from the url
    return response.json();
  })

  // executes function after we get the data
  .then(function (data) {
    console.log(data);
  })
 });

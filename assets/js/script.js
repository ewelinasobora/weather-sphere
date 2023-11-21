const searchInput = $("#search-input");
// function handles events where one button is clicked
 $("#search-button").on("click", function(event) {
  event.preventDefault();
   // it grabs the input from the textbox
   const cityName = searchInput.val().trim();

   // it stores the input in local storage
   localStorage.setItem("cityName", cityName);
   getWeatherBy(cityName)

 });

function getWeatherBy(cityName) {

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=20e460d7e4a79fa6b27760389b12e22f`;

  fetch(apiUrl)
    .then(function (response) {
    // returning the json data from the url
      return response.json();
    })
    // executes function after we get the data
    .then(function (data) {

      console.log(data);
    })
}
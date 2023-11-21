const searchInput = $("#search-input");
// function handles events where one button is clicked
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // store the input from the search input
  const cityName = searchInput.val().trim();

  // get the existing cities from local storage
  let cities = localStorage.getItem("cityName");
  cities = cities ? JSON.parse(cities) : [];

  // push the new city to the array
  cities.push(cityName);

  // store the updated array in local storage
  localStorage.setItem("cityName", JSON.stringify(cities));


  getWeatherBy(cityName);
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

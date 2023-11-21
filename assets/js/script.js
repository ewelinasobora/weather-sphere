const searchInput = $("#search-input");
// function handles events where one button is clicked
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // stores the input from the search input
  const cityName = searchInput.val().trim();

  // gets the existing cities from local storage
  let cities = localStorage.getItem("cityName");
  cities = cities ? JSON.parse(cities) : [];

  // creates a Set from the cities array to remove duplicates
  const citiesSet = new Set(cities);

  // adds the new city to the Set
  citiesSet.add(cityName.charAt(0).toUpperCase() + cityName.slice(1));

  // converts the Set back to an array
  cities = Array.from(citiesSet);

  // stores the updated array in local storage
  localStorage.setItem("cityName", JSON.stringify(cities));

  getWeatherBy(cityName);
});

function getWeatherBy(cityName) {

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=20e460d7e4a79fa6b27760389b12e22f`;

  fetch(apiUrl)
    .then(function (response) {
      // returns the json data from the url
      return response.json();
    })
    // executes function after we get the data
    .then(function (data) {

      console.log(data);
    })
}

const searchInput = $("#search-input");
const todaySection = $("#today");
const forecastSection = $("#forecast");
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
      displayCurrentWeather(data);
    })
}


function showSavedCities() {
  let cities = JSON.parse(localStorage.getItem("cityName"));

  $("#history").empty();

  for (const city of cities) {
    // creates a button for each city in the array with onclick event that calls getWeatherBy function
    const btn = $(`
    <div>
    <button class="btn" onclick="getWeatherBy('${city}')">${city}</button>
    </div>
    `)
    $("#history").append(btn)
  }
}


function displayCurrentWeather(weatherData) {
  const currentWeather = weatherData.list[0];

  todaySection.empty();

  // Converts temperature from Kelvin to Celsius
  const celsiusTemp = Math.round((currentWeather.main.temp - 273.15).toFixed(2));
  // Converts wind speed from mph to kph
  const windKPH = Math.round((currentWeather.wind.speed * 1.60934).toFixed(2));

  const html = `
  <div class="card">
    <h2>${weatherData.city.name} (${dayjs().format("M/D/YYYY")})
    <img class="weather-icon" src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png" alt="${currentWeather.weather[0].description}">
    </h2>
    <p>Temperature: ${celsiusTemp} °C</p>
    <p>Wind: ${windKPH} KPH</p>
    <p>Humidity: ${currentWeather.main.humidity}%</p>
  </div>
  `;

  todaySection.append(html);
}



showSavedCities();

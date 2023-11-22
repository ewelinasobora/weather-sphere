const searchForm = $("#search-form").addClass("d-grid");
const searchInput = $("#search-input");
const todaySection = $("#today");
const forecastSection = $("#forecast");
const today = dayjs();
const currentHour = today.hour()
const row = $("<div class='row'>");
const forecastRow = forecastSection.append(row);
const historySection = $("#history").addClass(" gap-2");

// function handles events where search button is clicked
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
      // displayCurrentWeather(data);
      displayForecast(data);
    })
}

function showSavedCities() {
  // gets the existing cities from local storage
  let cities = JSON.parse(localStorage.getItem("cityName") || "[]");

  historySection.empty();

  for (const city of cities) {
    // creates a button for each city in the array with onclick event that calls getWeatherBy function
    const btn = $(`
    <button class="btn btn-secondary" onclick="getWeatherBy('${city}')">${city}</button>
    `)
    historySection.append(btn)
  }
}

function displayForecast(weatherData) {
  todaySection.empty();
  forecastSection.empty();

  const forecast = weatherData.list;

  // loops through the forecast array and creates a card for each day
  for (let i = 0; i < forecast.length; i++) {
    // (24h / 3h = 8) there are 8 3-hour intervals in a day
    let day = i * 8;
    let unixTime = forecast[day].dt;
    let thisDate = new Date(unixTime * 1000);

    let formattedThisDate = moment(thisDate).format('DD/MM/YYYY')
    let formattedToday = moment(today).format('DD/MM/YYYY')

    // Converts temperature from Kelvin to Celsius
    const celsiusTemp = Math.round((forecast[day].main.temp - 273.15).toFixed(2));
    // Converts wind speed from mph to kph
    const windKPH = Math.round((forecast[day].wind.speed * 1.60934).toFixed(2));

    // creates main card with current weather data
    const mainCard = `
    <div class="card p-3">
      <h2>${weatherData.city.name} ${formattedThisDate}
      <img class="weather-icon" src="https://openweathermap.org/img/w/${forecast[day].weather[0].icon}.png" alt="${forecast[day].weather[0].description}">
      </h2>
      <p>Temperature: ${celsiusTemp} °C</p>
      <p>Wind: ${windKPH} KPH</p>
      <p>Humidity: ${forecast[day].main.humidity}%</p>
    </div>
    `;

    // creates cards with forecast data
    const cards = `
    <div class="col-lg-3 mb-3 mb-md-2">
      <div class="card forecast-card text-bg-secondary p-3">
        <h3>${formattedThisDate}</h3>
        <img class="forecast-icon" src="https://openweathermap.org/img/w/${forecast[day].weather[0].icon}.png" alt="${forecast[day].weather[0].description}">
        <p>Temperature: ${celsiusTemp} °C</p>
        <p>Wind: ${windKPH} KPH</p>
        <p>Humidity: ${forecast[day].main.humidity}%</p>
      </div>
    </div>
      `;

    if (formattedThisDate === formattedToday) {
      todaySection.append(mainCard);
    } else {
      forecastRow.append(cards);
    }


  }
}

showSavedCities();

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} , ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2b5oe2d82944a30ca14a100tfe32ce6e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "2b5oe2d82944a30ca14a100tfe32ce6e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast(response) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const icons = ["🌤", "🌤", "🌤", "🌤", "🌤", "🌤", "🌤"];
  const temperatures = [
    { max: "21°", min: "11°" },
    { max: "23°", min: "12°" },
    { max: "24°", min: "9°" },
    { max: "24°", min: "10°" },
    { max: "24°", min: "10°" },
    { max: "23°", min: "9°" },
    { max: "24°", min: "9°" },
  ];

  let forecastHTML =
    '<div class="weather-forecast-day"><div class="table-div"><table class="weather-forecast"><tr>';

  days.forEach((day) => {
    forecastHTML += `<th><div class="weather-forecast-date">${day}</div></th>`;
  });
  forecastHTML += "</tr>";

  forecastHTML += "<tr>";
  icons.forEach((icon) => {
    forecastHTML += `<td><div class="weather-forecast-icon">${icon}</div></td>`;
  });
  forecastHTML += "</tr>";

  forecastHTML += "<tr>";
  temperatures.forEach((temp) => {
    forecastHTML += `<td><div class="weather-forecast-temperatures"><span class="weather-app-temperature-max">${temp.max}</span><span class="weather-app-temperature-min">${temp.min}</span></div></td>`;
  });
  forecastHTML += "</tr>";

  forecastHTML += "</table></div></div>";

  forecast.innerHTML = forecastHTML;
}

searchCity("Johannesburg");
getForecast("Johannesburg");
displayForecast();

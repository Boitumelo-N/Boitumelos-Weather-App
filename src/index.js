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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  forecast.innerHTML = `
      <div>
 <table class="weather-forecast">
            <tr>
            <td class="weather-forecast-date">Mon</td>
            <td class="weather-forecast-date">Tue</td>
            <td class="weather-forecast-date">Wed</td>
            <td class="weather-forecast-date">Thu</td>
            <td class="weather-forecast-date">Fri</td>
            <td class="weather-forecast-date">Sat</td>
            <td class="weather-forecast-date">Sun</td>
          </tr>
            <tr>
              <td class="weather-forecast-icon">🌤</td>
              <td class="weather-forecast-icon">🌤</td>
              <td class="weather-forecast-icon">🌤</td>
              <td class="weather-forecast-icon">🌤</td>
              <td class="weather-forecast-icon">🌤</td>
              <td class="weather-forecast-icon">🌤</td>
              <td class="weather-forecast-icon">🌤</td>
            </tr>
            <tr>
              <td class="weather-forecast-temperatures">
                <span class="weather-app-temperature-min">8°</span>
                <span class="weather-app-temperature-max">20°</span>
              </td>
              <td class="weather-forecast-temperatures"><span class="weather-app-temperature-min">12°</span> <span class="weather-app-temperature-max">24°</span></td>
    <td class="weather-forecast-temperatures"><span class="weather-app-temperature-min">10°</span> <span class="weather-app-temperature-max">20°</span></td>
    <td class="weather-forecast-temperatures"><span class="weather-app-temperature-min">15°</span> <span class="weather-app-temperature-max">25°</span></td>
    <td class="weather-forecast-temperatures"><span class="weather-app-temperature-min">10°</span> <span class="weather-app-temperature-max">21°</span></td>
    <td class="weather-forecast-temperatures"><span class="weather-app-temperature-min">8°</span> <span class="weather-app-temperature-max">19°</span></td>
    <td class="weather-forecast-temperatures"><span class="weather-app-temperature-min">12°</span> <span class="weather-app-temperature-max">22°</span></td>
            </tr>
          </table>
          </div>
`;
}

searchCity("Johannesburg");
displayForecast();

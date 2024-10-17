// For fetching weather data via axios based on Search input
function searchTemp(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  h1.classList.add("main-description");
  let units = "metric";
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// For fetching weather data via axios based on geolocation
function janeLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "701f06352d61835bc4fc894e7b084629";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}
function showCity(position) {
  let h1 = document.querySelector("h1");
  let city = position.data.name;
  h1.innerHTML = city;
}

// For rendering weather data + calculation of °C|°F
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let maintemp = document.querySelector("#temperature");
  maintemp.innerHTML = temperature;
  let description = response.data.weather[0].description;
  let desc = document.querySelector("#main-description");
  desc.innerHTML = description;
  desc.classList.add("main-description");
  let feelslike = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feels_like");
  feels.innerHTML = feelslike;
  let humidity = response.data.main.humidity;
  let hud = document.querySelector("#humidity");
  hud.innerHTML = humidity;
  let windspeed = response.data.wind.speed;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = windspeed;
  globalC = temperature;
  globalF = Math.round((globalC * 9) / 5 + 32);
}

// For rendering date and time
function date() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let week = document.querySelector("#week-time");
  week.innerHTML = day + " " + hours + ":" + minutes;
}

// Toggles for °C|°F
function celTemp() {
  temp.innerHTML = globalC;
}
function fahTemp() {
  temp.innerHTML = globalF;
}

// Declaration of variables
let globalC;
let globalF;
let temp = document.querySelector("#temperature");
let getButton = document.querySelector("#current-location-button");
let form = document.querySelector("#search-form");
let celsiusTemperature = document.querySelector("#celsium-link");
let fahrenheitTemperature = document.querySelector("#fahrenheim-link");

// Runtime functions
date();

// EventListeners
getButton.addEventListener("click", janeLocation);
form.addEventListener("submit", searchTemp);
celsiusTemperature.addEventListener("click", celTemp);
fahrenheitTemperature.addEventListener("click", fahTemp);


// Forecast
function displayForecast () {
  let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml = 
      forecastHtml +
    `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">☀️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15°</strong>
              </div>
            <div class="weather-forecast-temperature">9°</div>
          </div>
        </div>   
    `;
  });

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;

}

displayForecast();

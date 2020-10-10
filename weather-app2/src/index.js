function formatDate() {
  let now = new Date();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  } else if (hours > 12) {
    hours = hours - 12;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`; //time formatting END
  }
  let dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = `${weekDay} | ${hours}:${minutes}`;
  let dateToday = document.querySelector("#date-today");
  dateToday.innerHTML = `${date} ${month} ${year}`;
}

formatDate(); //Function to show current time and date END

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index <= 4; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `
     <div class="col date">
          <h4>${formatHours(forecast.dt * 1000)}</h4>
         <img
    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
          <h5>SUNNY</h5>
          <p>${Math.round(forecast.main.temp_max)} | ${Math.round(
      forecast.main.temp_min
    )}°</p>
        </div>`;
  }
}
function displayWeather(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}º f`;

  let highLowTemp = document.querySelector("#high-low");
  highLowTemp.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}º | ${Math.round(response.data.main.temp_min)}º f`;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `feels like: ${Math.round(
    response.data.main.feels_like
  )}º f`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;

  let weatherDescription = document.querySelector("#sky");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#weather-icon-today");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  const apiKey = "a8c8f7d25b7901021cffbfe31b57f387";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

/* GEOLOCATION GEOLOCATION GEOLOCATION GEOLOCATION GEOLOCATION GEOLOCATION GEOLOCATION GEOLOCATION GEOLOCATION  */
function inputGeoPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getGeoPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(inputGeoPosition);
}

let findMeButton = document.querySelector("#find-me-button");
findMeButton.addEventListener("click", getGeoPosition);

/* TEMPERATURE CONVERSIONS - TEMPERATURE CONVERSIONS - TEMPERATURE CONVERSIONS - TEMPERATURE CONVERSIONS -  */
function convertCelsToFahr(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#current-temp");
  fahrLink.classList.add("active");
  celsLink.classList.remove("active");
  let temperature = tempToday.innerHTML;
  temperature = Number(temperature);
  tempToday.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrLink = document.querySelector("#fahrenheit-link");
fahrLink.addEventListener("click", convertCelsToFahr);

function convertFahrToCels(event) {
  event.preventDefault();
  let tempToday = document.querySelector("#current-temp");
  celsLink.classList.add("active");
  fahrLink.classList.remove("active");
  let temperature = tempToday.innerHTML;
  let celsiusTemp = Math.round(((temperature - 32) * 5) / 9);
  tempToday.innerHTML = celsiusTemp;
}

let celsLink = document.querySelector("#celsius-link");
celsLink.addEventListener("click", convertFahrToCels);

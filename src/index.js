let now = new Date();

//Day and time
let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${hours}:${minutes}`;


function displayForecast (response) {
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast");

  let days=["Tue", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML= `<div class="row">`;
  days.forEach(function(day){
  forecastHTML = 
  forecastHTML + 
  `
  <div class="col clearfix">
   <div class="forecast-weather-icon">⛅️</div> 
    <span class=forecast-temperatures> 
      <span class=forecast-temperature-max> 20° </span>
      <span class=forecast-temperature-min> 12° </span>
       </span>
    <br />
    <div class="forecast-date"> ${day} </div>
  </div>
`;
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

// Search engine

function getForecast(coordinates) {
let apiKey = "17d03f3d30691da284b38b6bdbdeb09d";
let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperatureElement").innerHTML = Math.round(
      response.data.main.temp
    );
   
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#feels-like").innerHTML = Math.round(
      response.data.main.feels_like
    );
    document.querySelector("#description").innerHTML= response.data.weather[0].description;
    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
    }

function searchCity(city) {
  let apiKey = "17d03f3d30691da284b38b6bdbdeb09d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "17d03f3d30691da284b38b6bdbdeb09d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("San Diego");

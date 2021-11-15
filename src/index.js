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

function formatDay (timestamp) {
  let date=new Date (timestamp*1000);
  let day= date.getDay();
  let days= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days [day];

}

function displayForecast (response) {
  let forecast= response.data.daily;
  let forecastElement=document.querySelector("#forecast");

  let days=["Tue", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML= `<div class="row">`;
  forecast.forEach(function(forecastDay,index){
    if (index < 6) { 
  forecastHTML = 
  forecastHTML + 
  `
  <div class="col-2 clearfix">
   <div class="forecast-weather-icon"> <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"} alt="${forecastDay.weather[0].description}" ></div> 
    <span class="forecast-temperatures"> 
      <span class="forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span> |
      <span class="forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
       </span>
    <br />
    <div class="forecast-date"> ${formatDay (forecastDay.dt)} </div>
  </div>
`;
}});
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

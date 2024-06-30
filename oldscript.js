const apiKey = "e5b6cfa3a3c23068f714ba848e1fa796"; // apikey for current weather
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="; // Current weather api url

const searchCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-img");

// Fetch Current weather for searched City
async function fetchWeather(city) {
  const response = await fetch(url + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".message").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    // console.log(data);

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".message").style.display = "none";

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".sky").innerHTML = data.weather[0].description;
    document.querySelector(".humid").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "images/snow.png";
    }
  }
}

searchBtn.addEventListener("click", () => {
  fetchWeather(searchCity.value);
  forecastWeather(searchCity.value);
});

searchCity.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if (searchCity.value === "") {
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".message").style.display = "none";
    } else {
      fetchWeather(searchCity.value);
      forecastWeather(searchCity.value);
    }
  }
});

// const foreKey = "4fa9bfb5752a14b5d52911b5b5497cb8"; // apikey for forcasting weather
// const foreUrl ="https://api.openweathermap.org/data/2.5/forecast?units=metric&exclude=current,minutely,hourly,alerts&cnt=6&q="; // Forecasting weather api url

// // Fetch weather forecast for future date
// async function forecastWeather(city="kathmandu") {
//   const forecastResponse = await fetch(foreUrl + city + `&appid=${foreKey}`);
//   var forecastData = await forecastResponse.json();
//   console.log(forecastData);
// }
// forecastWeather();

const foreKey = "UgmVIkIAsw38aK0dRxIpOt950OdGbT3y";
const foreUrl =
  "https://api.tomorrow.io/v4/weather/forecast?timesteps=1d&location="; // Forecasting weather api url

// Fetch weather for future date
async function forecastWeather(city) {
  const forecastResponse = await fetch(foreUrl + city + `&apikey=${foreKey}`);
  var forecastData = (await forecastResponse.json()) || {};
  // console.log(forecastData);

  let forecast = document.getElementById("forecast");
  for(i=1; i<=forecastData.timelines.daily.length; i++){
    const day = forecastData.timelines.daily[i];
    const date = new Date(day.time);
    const dayName = date.toLocaleString("default", {weekday: "long"});
    const temp = Math.round(day.values.temperatureAvg);
    const card = `<div class="card" id="card">
                <h2 class="day">${dayName}</h2>
                <img src="images/mist.png" class="forecast-img">
                <p class="fore-temp" id="temp1">${temp}</p>
                <p class="fore-sky">Misty</p>
            </div>`
    forecast.innerHTML += card;
  }
}
// document.querySelector(".fore-temp").innerHTML = Math.round(forecastData.timelines.daily[1].values.temperatureAvg) + "°C";

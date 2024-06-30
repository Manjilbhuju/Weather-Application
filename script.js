const foreKey = "UgmVIkIAsw38aK0dRxIpOt950OdGbT3y";
const foreUrl =
  "https://api.tomorrow.io/v4/weather/forecast?timesteps=1d&location="; // Forecasting weather api url

const searchCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-img");

// Functionality for button to operate on both Click and Enter
searchBtn.addEventListener("click", async () => {
  const forecastDataResponse = await fetchWeeklyWeather(searchCity.value);
  if (forecastDataResponse) {
    fetchWeather(forecastDataResponse);
    forecastWeather(forecastDataResponse);
  }
});

searchCity.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    if (searchCity.value === "") {
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".message").style.display = "none";
    } else {
      const forecastDataResponse = await fetchWeeklyWeather(searchCity.value);
      if (forecastDataResponse) {
        fetchWeather(forecastDataResponse);
        forecastWeather(forecastDataResponse);
      }
    }
  }
});

//Function for api call and storing data from api in a variable
async function fetchWeeklyWeather(city) {
  try {
    const forecastResponse = await fetch(foreUrl + city + `&apikey=${foreKey}`);
    const forecastData = await forecastResponse.json();
    return forecastData;
  } catch (error) {
    console.log(error);
  }
}

//function to fetch current date weather
async function fetchWeather(forecastDataResponse) {
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".message").style.display = "none";

  document.querySelector(".city").innerHTML =
    forecastDataResponse.location.name;
  document.querySelector(".temp").innerHTML =
    forecastDataResponse.timelines.daily[0].values.temperatureAvg + "°C";
  document.querySelector(".humid").innerHTML =
    forecastDataResponse.timelines.daily[0].values.humidityAvg + " %";
  document.querySelector(".wind").innerHTML =
    forecastDataResponse.timelines.daily[0].values.windSpeedAvg + " km/h";

  //Converting date into day
  const day = forecastDataResponse.timelines.daily[0].time;
  const date = new Date(day);
  const dayName = date.toLocaleString("default", { weekday: "long" });
  document.querySelector(".today").innerHTML = dayName;
}

//function to forecast weather data
async function forecastWeather(forecastDataResponse) {
  let forecast = document.getElementById("forecast");
  forecast.innerHTML = '';

  if (forecastDataResponse && forecastDataResponse.timelines) {
    for (i = 1; i <= forecastDataResponse.timelines.daily.length; i++) {
      const day = forecastDataResponse.timelines.daily[i];
      const date = new Date(day.time);
      const dayName = date.toLocaleString("default", { weekday: "long" });
      const temp = day.values.temperatureAvg;
      const card = `<div class="card" id="card">
                <h2 class="day">${dayName}</h2>
                <img src="images/mist.png" class="forecast-img">
                <p class="fore-temp" id="temp1">${temp}°c</p>
            </div>`;
      forecast.innerHTML += card;
    }
  }else {
    console.error('Invalid forecast data response');
  }
}

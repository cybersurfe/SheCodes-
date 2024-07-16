document.addEventListener("DOMContentLoaded", function () {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function updateWeather(response) {
    let newTemp = response.data.temperature.current;
    let tempElement = document.querySelector(".current-temperature-value");
    tempElement.innerHTML = Math.round(newTemp);

    let newEmoji = response.data.condition.icon_url;
    let emojiElement = document.querySelector(".current-temperature-icon");
    emojiElement.innerHTML = `<img src="${newEmoji}" alt="${response.data.condition.description}">`;

    let humid = response.data.temperature.humidity;
    let replaceHumidity = document.querySelector(".current-humidity");
    replaceHumidity.innerHTML = `${humid}%`;

    let speed = response.data.wind.speed;
    let replaceSpeed = document.querySelector(".current-speed");
    replaceSpeed.innerHTML = `${speed} Km/Hr`;

    let descrip = response.data.condition.description;
    let descripReplace = document.querySelector(".current-description");
    let capDescrip = capitalizeFirstLetter(descrip);
    descripReplace.innerHTML = `, ${capDescrip}.`;

    let currentDate = new Date(response.data.time * 1000);
    let currentDateElement = document.querySelector(".date");
    currentDateElement.innerHTML = formatDate(currentDate);

    updateForecast(response.data.city);
  }

  function formatDate(date) {
    const daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = date.getDay();
    let months = date.getMonth();
    let dates = date.getDate();
    let hours = date.getHours();
    let mins = date.getMinutes();

    if (mins < 10) {
      mins = `0${mins}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

    return `${month[months]} ${dates}, ${daysOfTheWeek[day]} ${hours}:${mins}`;
  }

  function formatNewDate(date) {
    const daysOfTheWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    let day = date.getDay();

    return `${daysOfTheWeek[day]}`;
  }

  function updateForecast(city) {
    let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=08863bfbdoc74bb4a127ab6ba62t6fb6&units=metric`;
    axios.get(url).then(forecastUpdate);
  }

  function forecastUpdate(response) {
    let data = response.data;
    let forecast = "";

    for (let i = 0; i < 5; i++) {
      let playDate = new Date(data.daily[i].time * 1000);
      forecast += `
      <div class="weather-forecast-${i + 1}">
        <div class="forecast-date-${i + 1}">
          ${formatNewDate(playDate)}
        </div>
        <div class="forecast-icon-${i + 1}">
          <img src="${data.daily[i].condition.icon_url}" alt="${
        data.daily[i].condition.description
      }">
        </div>
        <div class="forecast-temp-${i + 1}">
          <strong>${Math.round(
            data.daily[i].temperature.maximum
          )}°C / ${Math.round(data.daily[i].temperature.minimum)}°C</strong>
        </div>
      </div>`;
    }

    let forecastUpdateElement = document.querySelector(".forecast");
    forecastUpdateElement.innerHTML = forecast;
  }

  function updateCity(event) {
    event.preventDefault();
    let input = document.querySelector(".search-input").value || "Bloemfontein"; // Default city
    let capitalizedInput = capitalizeFirstLetter(input);
    let cityElement = document.querySelector(".current-city");
    cityElement.innerHTML = capitalizedInput;

    let url = `https://api.shecodes.io/weather/v1/current?query=${capitalizedInput}&key=08863bfbdoc74bb4a127ab6ba62t6fb6&units=metric`;
    axios.get(url).then(updateWeather);
  }

  function updateInitialCity() {
    let city = "Pretoria";
    let cityEle = document.querySelector(".current-city");
    cityEle.innerHTML = city;

    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=08863bfbdoc74bb4a127ab6ba62t6fb6&units=metric`;
    axios.get(url).then(updateWeather);
  }

  let searchForm = document.querySelector("form");
  searchForm.addEventListener("submit", updateCity);
  updateInitialCity();
});

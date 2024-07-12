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

  function updateCity(event) {
    event.preventDefault();
    let input = document.querySelector(".search-input").value || "bloemfontein"; // Default city
    let capitalizedInput = capitalizeFirstLetter(input);
    let cityElement = document.querySelector(".current-city");
    cityElement.innerHTML = capitalizedInput;

    let url = `https://api.shecodes.io/weather/v1/current?query=${capitalizedInput}&key=08863bfbdoc74bb4a127ab6ba62t6fb6&units=metric`;
    axios.get(url).then(updateWeather);
  }

  function updateInitialCity() {
    let city = "Pretoria";
    let cityEle = document.querySelector(".current-city");
    cityEle.innerHTML = `${city}`;

    let url = `https://api.shecodes.io/weather/v1/current?query=Pretoria&key=08863bfbdoc74bb4a127ab6ba62t6fb6&units=metric`;
    axios.get(url).then(updateWeather);
  }

  let searchForm = document.querySelector("form");
  searchForm.addEventListener("submit", updateCity);
  updateInitialCity();
  updateCity();
});

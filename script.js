let now = new Date();
let day = now.getDay();
let months = now.getMonth();
let dates = now.getDate();
let hours = now.getHours();
let mins = now.getMinutes();
const dateNum = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 28, 29, 30, 31,
];
const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sturday",
];
const minutes = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];
const Hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
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

let dateElement = document.querySelector(".date");
dateElement.innerHTML = `${month[months - 1]} ${dateNum[dates - 1]}, ${
  daysOfTheWeek[day]
}  ${Hours[hours]}:${minutes[mins]}`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function updateCity() {
  event.preventDefault();
  let input = document.querySelector(".search-input").value;
  inputs = capitalizeFirstLetter(input);
  let city = document.querySelector(".current-city");
  city.innerHTML = `${inputs}`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${inputs}&key=08863bfbdoc74bb4a127ab6ba62t6fb6&units=metric`;
  axios.get(url).then(updateTemp);
  //axios.get(url).then(updateEmoji);
}
function updateTemp(response) {
  let newTemP = response.data.temperature.current;
  let newTemp = document.querySelector(".current-temperature-value");
  newTemp.innerHTML = Math.round(newTemP);
}
/*function updateEmoji(response){
    let newEmoji = response.data.condition.icon_url;
    let replaceEmoji = document.querySelector(".current-temperature-icon");
    replaceEmoji.src = newEmoji;
}*/

let submission = document.querySelector("form");
submission.addEventListener("submit", updateCity);

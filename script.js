let button = document.querySelector(".button");
let inputValue = document.querySelector(".inputValue");
let cityName = document.querySelector(".name");
let temp = document.querySelector(".temp");
let temp2 = document.querySelector(".temp2");
let weatherIcon = document.querySelector(".weather-icon");
let timeformat = document.querySelector(".time");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let weatherType = document.querySelector(".weather");
let getDate = document.querySelector(".date");
let getDay = document.querySelector(".day");
let temperatureCity = document.querySelector(".tempSelectedCity");
let mapEl = document.querySelector("#map");
callAPImain = () => {
  //   alert("Hi");
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputValue.value +
      "&appid=16d64166ca502b12ef31310e57ab25dc"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let nameValue = data["name"];
      console.log(nameValue);
      let tempValue = data["main"]["temp"];
      console.log(tempValue);
      let tempCelsius = tempValue - 273.15;
      console.log(tempCelsius);
      let roundedTemp1 = Math.round(tempCelsius);
      cityName.innerHTML = nameValue;
      temp.innerHTML = ` ${roundedTemp1} <button class="btnT" >°C</button> | <button class="btnF">°F</button>`;
      let tempFar = tempCelsius * 1.8 + 32;
      let btnT = document.querySelector(".btnT");
      let btnF = document.querySelector(".btnF");
      btnT.onclick = () => {
        // alert("Test2");
        temp.innerHTML = ` ${roundedTemp1} <button class="btnT">°C</button> | <button class="btnF">°F</button>`;
      };
      btnF.onclick = () => {
        temp.innerHTML = `${Math.round(
          tempFar
        )} <button class="btnT">°C</button> | <button class="btnF">°F</button>`;
      };
      // temp2.innerHTML = `${Math.round(tempFar)} °F`;
      //--------------------------------
      let timezone = data.timezone;
      console.log(timezone);
      let date = new Date();
      // let currentHour = date.getHours();
      // console.log(currentHour);
      let time = date.getTime() + timezone * 1000;
      // Adjust for the difference between UTC and GMT
      let gmtOffset = date.getTimezoneOffset() * 60 * 1000;
      time += gmtOffset;
      date.setTime(time);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;

      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      let timeString = `${hours}: ${minutes} ${ampm}`;
      console.log(timeString);
      timeformat.innerHTML = timeString;
      let weather = data["weather"][0]["icon"];
      console.log(weather);
      weatherIcon.src =
        "https://openweathermap.org/img/wn/" + weather + "@2x.png";
      weatherIcon.innerHTML = weatherIcon.src;
      let getWind = data["wind"]["speed"];
      console.log(getWind);
      wind.innerHTML = `${getWind} km/h`;
      let getHumidity = data["main"]["humidity"];
      console.log(getHumidity);
      humidity.innerHTML = `${getHumidity} %`;
      let getweather = data["weather"][0]["description"];
      console.log(getweather);
      weatherType.innerHTML = `${getweather}`;
      // get the date
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      console.log(`${day}/${month}/${year}`);
      getDate.innerHTML = `${day}/${month}/${year}`;
      console.log(date.getDay());
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let dayOfWeek = weekdays[date.getDay()];
      getDay.innerHTML = dayOfWeek;

      console.log(dayOfWeek);
    })
    .catch((err) => alert("Wrong city name"));
};

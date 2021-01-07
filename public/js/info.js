let queryString = window.location.search;
console.log(queryString);
// ?fname=johnny&lname=depp

let urlParams = new URLSearchParams(queryString);

let weathd = document.querySelector("#weathD");
let temp = document.querySelector("#temp");
let winds = document.querySelector("#winds");
let press = document.querySelector("#pressure");
let precipitation = document.querySelector("#precip");
let humid = document.querySelector("#humidity");
let fil = document.querySelector("#fil");
let uv = document.querySelector("#uv");
let visib = document.querySelector("#visib");
let address = document.querySelector("#location");
let icon = document.getElementById("wicon");
let theme = document.getElementById("theme");
let bgVideo = document.getElementById("bgVideo");

address.textContent = "Loading...";
weathd.textContent = "Loading...";
temp.textContent = "Loading...";
winds.textContent = "Loading...";
press.textContent = "Loading...";
precipitation.textContent = "Loading...";
humid.textContent = "Loading...";
fil.textContent = "Loading...";
uv.textContent = "Loading...";
visib.textContent = "Loading...";

let location_name = urlParams.get("location");
console.log(location_name);

let url = "/weather?address=" + location_name;
fetch(url).then((response) => {
  response.json().then((whole_data) => {
    if (whole_data.error) {
      location.replace("/error?error=" + whole_data.error);
      console.log(whole_data.error);
    } else {
      let {
        weatherDescription,
        temperature,
        icon_url,
        windSpeed,
        pressure,
        precip,
        humidity,
        feelslike,
        uv_index,
        visibility,
        isDay,
        code,
      } = whole_data.data;
      console.log(whole_data.data);

      let location = whole_data.location;
      address.textContent = location;
      weathd.textContent = weatherDescription;
      temp.textContent = temperature;
      winds.textContent = windSpeed;
      press.innerHTML = pressure;
      precipitation.innerHTML = precip;
      humid.textContent = humidity;
      fil.textContent = feelslike;
      uv.textContent = uv_index;
      visib.textContent = visibility;
      var img = document.createElement("img");
      img.src = icon_url;
      icon.appendChild(img);
      img.style.borderRadius = "5px";

      var videoSrc = document.createElement("source");
      videoSrc.type = "video/mp4";
      if (isDay === "yes") {
        if (code == 113 && feelslike >= 10) {
          //Sunny
          videoSrc.src = "assets/day/sunny.mp4";
        } else if (code == 116 || code == 119 || code == 122) {
          //Partly Cloudy
          //Cloudy
          //Overcast
          videoSrc.src = "assets/day/cloudy.mp4";
        } else if (code == 143) {
          //Mist
          videoSrc.src = "assets/day/mist.mp4";
        } else if (
          code == 176 ||
          code == 293 ||
          code == 296 ||
          code == 299 ||
          code == 302 ||
          code == 311
        ) {
          //Patchy rain
          //Patchy light rain
          //light rain
          //moderate light rain
          //moderate rain
          //light freezing rain
          videoSrc.src = "assets/day/drizzle.mp4";
        } else if (code == 179 || code == 182 || code == 227) {
          //Patchy snow
          //Patchy sleet
          videoSrc.src = "assets/day/light-snow.mp4";
        } else if (code == 200) {
          //thundery outbreak
          videoSrc.src = "assets/day/thunderstorm.mp4";
        } else if (code == 248 || code == 260) {
          //Fog
          videoSrc.src = "assets/day/fog.mp4";
        } else if (code == 185 || code == 263 || code == 266) {
          //Patchy drizzle
          //patchy light drizzle
          //light drizzle
          videoSrc.src = "assets/day/light-drizzle.mp4";
        } else if (code == 281 || code == 284) {
          //Freezing drizzle
          //Heavy Freezing Drizzle
          videoSrc.src = "assets/day/light-drizzle.mp4";
        } else if (code == 305 || code == 308) {
          //heavy Rain sometime
          //Heavy rain
          videoSrc.src = "assets/night/heavy-rain.mp4";
        } else if (code == 230 || feelslike < 10) {
          //Blizzard
          videoSrc.src = "assets/day/light-snow.mp4";
        }

        theme.href = "css/styleinfoday.css";
      } else {
        if (code == 113 && feelslike >= 10) {
          //clear
          videoSrc.src = "assets/night/clear.mp4";
        } else if (code == 116 || code == 119 || code == 122) {
          //Partly Cloudy
          //Cloudy
          //Overcast
          videoSrc.src = "assets/night/cloudy.mp4";
        } else if (code == 143) {
          //Mist
          videoSrc.src = "assets/night/fog.mp4";
        } else if (
          code == 176 ||
          code == 293 ||
          code == 296 ||
          code == 299 ||
          code == 302 ||
          code == 311
        ) {
          //Patchy rain
          //Patchy light rain
          //light rain
          //moderate light rain
          //moderate rain
          //light freezing rain
          videoSrc.src = "assets/night/drizzle.mp4";
        } else if (code == 179 || code == 182 || code == 227) {
          //Patchy snow
          //Patchy sleet
          videoSrc.src = "assets/day/light-snow.mp4";
        } else if (code == 200) {
          //thundery outbreak
          videoSrc.src = "assets/night/thunderstorm.mp4";
        } else if (code == 248 || code == 260) {
          //Fog
          videoSrc.src = "assets/night/fog.mp4";
        } else if (code == 185 || code == 263 || code == 266) {
          //Patchy drizzle
          //patchy light drizzle
          //light drizzle
          videoSrc.src = "assets/night/light-drizzle.mp4";
        } else if (code == 281 || code == 284) {
          //Freezing drizzle
          //Heavy Freezing Drizzle
          videoSrc.src = "assets/night/light-drizzle.mp4";
        } else if (code == 305 || code == 308) {
          //heavy Rain sometime
          //Heavy rain
          videoSrc.src = "assets/night/heavy-rain.mp4";
        } else if (code == 230 || feelslike < 10) {
          //Blizzard
          videoSrc.src = "assets/day/light-snow.mp4";
        }

        theme.href = "css/styleinfonight.css";
      }
      bgVideo.appendChild(videoSrc);
    }
  });
});

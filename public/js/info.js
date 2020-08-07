const queryString = window.location.search;
console.log(queryString);
// ?fname=johnny&lname=depp

const urlParams = new URLSearchParams(queryString);

const weathd = document.querySelector("#weathD");
const temp = document.querySelector("#temp");
const winds = document.querySelector("#winds");
const press = document.querySelector("#pressure");
const precipitation = document.querySelector("#precip");
const humid = document.querySelector("#humidity");
const fil = document.querySelector("#fil");
const uv = document.querySelector("#uv");
const visib = document.querySelector("#visib");
const address = document.querySelector("#location");
const icon = document.getElementById("wicon");
let theme = document.getElementById("theme");

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

const location_name = urlParams.get("location");
console.log(location_name);

const url = "/weather?address=" + location_name;
fetch(url).then((response) => {
  response.json().then((whole_data) => {
    if (whole_data.error) {
      console.log(whole_data.error);
    } else {
      const {
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
      } = whole_data.data;

      console.log(whole_data.data);

      const location = whole_data.location;

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
      if (isDay === "yes") {
        theme.href = "css/styleinfoday.css";
      } else {
        theme.href = "css/styleinfonight.css";
      }
    }
  });
});

const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f937a7baa36c8d094f0e74928b3f8a15&query=" +
    latitude +
    "," +
    longitude;

  console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log("error");
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const weatherDescription = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const icon_url = body.current.weather_icons[0];
      const windSpeed = body.current.wind_speed;
      const pressure = body.current.pressure;
      const precip = body.current.precip;
      const humidity = body.current.humidity;
      const feelslike = body.current.feelslike;
      const uv_index = body.current.uv_index;
      const visibility = body.current.visibility;
      const isDay = body.current.is_day;
      const code = body.current.weather_code;
      callback(undefined, {
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
      });
    }
  });
};

module.exports = forecast;

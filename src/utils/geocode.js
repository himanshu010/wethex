const request = require("postman-request");

const geocode = (name, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(name) +
    ".json?access_token=pk.eyJ1IjoiaGltYW5zaHVhc3dhbCIsImEiOiJja2RkNzhxcG4xOHd4MzRyeHdlaHhpa3hhIn0.CkuFU_aFlkw1fzKRp4EbEA&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geoCode", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find this location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

const path = require("path");
const express = require("express");
console.log(__dirname);
console.log(path.join(__dirname, ".."));
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

//defining paths for handlebars
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//seting up static files. So that
//we don't have to give location
//of whole file present in public folder
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app 1",
    name: "himanshu aswal",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        res.send({ data, location });
      });
    }
  );
});

app.get("/weatherinfo", (req, res) => {
  if (!req.query.location) {
    return res.render("error", { error: "You must provide a location" });
  }
  res.render("weather-info", {
    location: req.query.location,
  });
});

app.get("/error", (req, res) => {
  error = req.query.error;
  res.render("error", { error });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});

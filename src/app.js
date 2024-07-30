const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const path = require("path");
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
const viewsDirectory = path.join(__dirname, "../Temp1/views");
app.set("views", viewsDirectory);

var hbs = require("hbs");
const partialsPath = path.join(__dirname, "../Temp1/partials");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "HOME",
    desc: "This is home page",
  });
});

const geocode = require("./tools/geocode");
const forecast = require("./tools/forecastFile");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: "Name : " + req.query.address,
        latitude: "Latitude : " + data.latitude,
        longitude: "Longitude : " + data.longitude,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404 Page Not Founded");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=82a9b4eb3f084102847160018241907&q=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(
        undefined,
        response.body.location.name +
          " it's " +
          response.body.current.condition.text +
          " and the temperature is " +
        response.body.current.temp_c +
        " c"
      );
    }
  });
};
module.exports = forecast;

/* jshint esversion: 6 */
// 3a5fdc839841f5ca120acb2468098afc

const request = require('request');
const argv = require('yargs').argv;


var apiKey = '7a56c7f8233d0aeccbc878ab724e40f1';
// node app.js -c Boston - to change the city!
var city = argv.c || 'boston';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

request(url, function(err, response, body) {
  if (err) {
    console.log(error);
  } else {
    var weather = JSON.parse(body);
    // let message =  ;
    var message = `It's ${weather.main.temp} degrees in ${weather.name}! humidity is ${weather.main.humidity}%`;
    console.log(message);
    console.log(weather);
    // console.log(weather);
  }
});




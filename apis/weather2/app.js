/* jshint esversion: 6*/
var express     = require('express');
var ejs         = require('ejs');
var request     = require('request');
var bodyParser  = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
var city;
var apiKey;
var url;
var weather;
var message;



app.get("/", function(req, res) {
  var boo = "boo and bar";
  res.render("home", {boo: boo, message: message});
});


app.post("/addcity", function(req, res) {
  city = req.body.newcity;
  apiKey = '7a56c7f8233d0aeccbc878ab724e40f1';
  url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log(city);

  request(url, function(err, response, body) {
    if (err) {
      console.log(error);
    } else {
      weather = JSON.parse(body);
      // let message =  ;
      message = `It's ${weather.main.temp} degrees Kelvin in ${weather.name}! humidity is ${weather.main.humidity}%`;
      console.log(weather);
    }
  });

  res.redirect("/weather");

});

app.get("/weather", function(req, res) {
  res.render("weather", {message: message});
});



app.get('*', function(req, res) {
  res.send("Seems like you're lost!");
});

app.listen(3000, function() {
  console.log('Server is runnnig  on port 3000');
});
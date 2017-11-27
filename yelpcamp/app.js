
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "New York", image:"http://www.dec.ny.gov/images/lands_forests_images/backcamping1.jpg" },
  {name: "Los Angeles", image:"https://skywaycamping.com/images/SM-Slide-Trailer.jpg" },
  {name: "Rio de Janeiro", image:"http://www.greatnortherncatskills.com/sites/default/files/styles/general_listings_300x200/public/dscn1175_0.jpg?itok=mtHKAVsz" },
  {name: "Toronto", image:"http://sugarcreekglencamping.com/wp-content/uploads/2017/02/welcome-to-sugar-creek-glen-campground-in-danville-new-york-300x200-1.png" },

];


app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
  res.render('new');
});



app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  // transforming the data into an object
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect('/campgrounds');
});



app.get("*", function(req, res) {
  res.send("seems like you're lost");
});

app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
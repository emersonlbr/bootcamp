
var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose');



// connecting to Db
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
// using bodyParser
app.use(bodyParser.urlencoded({extended: true}));
// setting the engine view to ejs
app.set("view engine", "ejs");




// Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});



// compiling into a model
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//   name: "Colt Bootcamp!",
//   image:"http://blog.hackerrank.com/wp-content/uploads/2014/08/Bootcamp.jpg",
//   description: "Colt really know how to teach! I really can understand almost everything that he teaches in this class"
//
// }, function(err, campground) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('newly created campground!');
//     console.log(campground);
//   }
// });



app.get("/", function(req, res) {
  res.render("landing");
});



// INDEX . show all campgrounds
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from DB
  Campground.find({}, function(err, allcampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {campgrounds: allcampgrounds});
    }
  });

});



// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var dsc = req.body.description;
  // transforming the data into an object
  var newCampground = {name: name, image: image, description: dsc};
  // create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});



// NEW - show form to create a new campground
app.get("/campgrounds/new", function(req, res) {
  res.render('new');
});


//SHOW - Showing more info about campground
app.get('/campgrounds/:id', function(req, res) {
  // find campground witht the provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render('show', {campground: foundCampground});
    }
  });


});



// Showing error message
app.get("*", function(req, res) {
  res.send("seems like you're lost");
});



// telling node the port it should listen to
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});




// a pattern
// restfull routes

// name          url         verb          desc
// ============================================================
// INDEX         /dogs       GET         Display a list of all dogs
// NEW           /dogs/new   GET         Displays form to make a new dog
// CREATE        /dogs       POST        Add new dog to DB
// SHOW          /dogs:id    GET         Shows info about one dog
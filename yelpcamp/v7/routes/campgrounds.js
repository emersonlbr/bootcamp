var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// INDEX . show all campgrounds
router.get("/campgrounds", function(req, res) {
  // get all campgrounds from DB
  Campground.find({}, function(err, allcampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allcampgrounds});
    }
  });

});


// CREATE - add new campground to DB
router.post("/campgrounds", function(req, res) {
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
router.get("/campgrounds/new", function(req, res) {
  res.render('campgrounds/new');
});


//SHOW - Showing more info about campground
router.get('/campgrounds/:id', function(req, res) {
  // find campground witht the provided ID
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      // render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

module.exports = router;

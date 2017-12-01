
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require('./seeds');


// connecting to Db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp_v6', {useMongoClient: true});
// using bodyParser
app.use(bodyParser.urlencoded({extended: true}));
// setting the engine view to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
  secret: "Once again Rusty wins cutest dog",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});




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
      res.render('campgrounds/index', {campgrounds: allcampgrounds});
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
  res.render('campgrounds/new');
});


//SHOW - Showing more info about campground
app.get('/campgrounds/:id', function(req, res) {
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


// ==================================÷
// COMMETS ROUTES
// ===================================
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
  // find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground});
    }
  });
});

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
  // look up campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
  //create new comment
  // connect new comment to campground
  // redirect to campground's page
});

// ==============
// AUTH ROUTES 
// ==============
app.get('/register', function(req, res){
  res.render('register');
});

// handle sign up logic
app.post('/register', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
    res.redirect('/campgrounds');
    }); 
  });
});

// Show login form
app.get('/login', function(req, res){
  res.render('login');
});
// halding login logic
// app.post('/login', middleware, callback)
app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), function(req, res){
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}











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
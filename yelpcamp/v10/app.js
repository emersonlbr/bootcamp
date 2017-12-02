
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    Campground      = require('./models/campground'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require('./seeds');

var commentRoutes     = require('./routes/comments'),
    campgroundsRoutes = require('./routes/campgrounds'),
    indexRoutes        = require('./routes/index');

// connecting to DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp_v9', {useMongoClient: true});
// using bodyParser
app.use(bodyParser.urlencoded({extended: true}));
// setting the engine view to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seed the database
// seedDB();

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

// passing to every single template
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(indexRoutes);
app.use(campgroundsRoutes);
app.use(commentRoutes);

// Showing error message
app.get("*", function(req, res) {
  res.send("seems like you're lost");
});
// telling node the port it should listen to
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
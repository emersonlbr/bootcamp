var express        = require('express'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    app            = express();



// APP CONFIG
mongoose.connect('mongodb://localhost/rest_full', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));



// MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  // created should be a date, and the default should be now
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);


// creates a new blog manually
// Blog.create({
//   title: "Test Blog",
//   image: "https://codeinstitute.net/wp-content/uploads/2014/10/students-and-laptops.jpg",
//   body: "Hello this is a blog post!"
// });



// RESFULL ROUTES
// redirect to the index page
app.get('/', function(req, res) {
  res.redirect('/blogs');
});

// index page
app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});









// SERVER
app.listen(3000, function() {
  console.log("Server has started on port 3000");
});
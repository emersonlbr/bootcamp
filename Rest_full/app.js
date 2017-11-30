var express           = require('express'),
    bodyParser        = require('body-parser'),
    // for the PUT requests!
    methodOverride    = require('method-override'),
    // it removes any scripts on the blogs create body
    expressSanitizer  = require('express-sanitizer'),
    mongoose          = require('mongoose'),
    app               = express();



// APP CONFIG
mongoose.connect('mongodb://localhost/rest_full', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
// for the PUT requests!
// cause you cant do that with html
app.use(methodOverride('_method'));




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



// INDEX ROUTE
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



// NEW ROUTE
app.get('/blogs/new', function(req, res) {
  res.render('new');
});


// CREATE ROUTE
app.post('/blogs', function(req, res) {
  // create blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog){
    if (err) {
      res.render('new');
    } else {
      // redirect to index
      res.redirect('/blogs');
    }
  });
});



// SHOW ROUTE
app.get('/blogs/:id', function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
});



// EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  });
});



// UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
    if (err) {
      res.render('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});



// DELETE ROUTE
app.delete('/blogs/:id', function(req, res){
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('blogs');
    }
  });
});









// SERVER
app.listen(3000, function() {
  console.log("Server has started on port 3000");
});
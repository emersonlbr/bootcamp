var express = require("express");
var app = express();

// route to the css and js files
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

// '/' => 'hi there'
app.get("/", function(req, res) {
  var emerson = "Lopes";
  res.render('home', {emerson: emerson});
});


app.get('/love/:thing', function(req, res){
  // capture thing
  var thing = req.params.thing;
  // passing 'thing as an object to the ejs file'
  res.render('love', {thing: thing});
});


app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post 1", author: "Sussy"},
    {title: "Can you believe this?", author: "Mark"},
    {title: "this is great1", author: "John"},
  ];
  res.render("posts", {posts: posts});
});

// redirects to any route that is not defined
// must be placed at the end
app.get('*', function(req, res) {
  res.send('Seems like you are lost!');
});


// server
app.listen(3000, process.env.IP, function() {
  console.log("Server has started on port 3000");
});
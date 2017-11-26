var express = require("express");
var app = express();

// makes the post an object
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


var friends = ["Daniel", "Bruno", "Matheus", "Jorge", "Marcos"];

app.get("/", function(req, res) {
  res.render('home');
});

app.get("/friends", function(req, res) {
  res.render("friends", {friends: friends});
});

// post routes are used when we want to send data
app.post("/addfriend", function(req, res) {
  // cathing object on name="newfrend" on home.ejs
  var newFriend = req.body.newfriend;
  // adding the friend to the array
  friends.push(newFriend);
  // res.send("you have reached the post route!");
  res.redirect("/friends");
});

app.listen(3000, function(){
  console.log("Server is runing on port 3000");
});

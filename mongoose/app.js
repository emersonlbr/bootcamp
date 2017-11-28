
var mongoose = require('mongoose');
// telling node to use mongoose
mongoose.connect('mongodb://localhost/cat_app', {useMongoClient: true});

// definnign a patternt for our data
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the DB
// var george = new Cat({
//   name: "amanha",
//   age: 1,
//   temperament: 'lazy'
// });
//
// george.save(function(err, cat){
//   if (err) {
//     console.log("Something went wrong");
//   } else {
//     console.log('we just added a cat to the DB');
//     console.log(cat);
//   }
// });



// creating and adding the add in one step
// Cat.create({
//   name: "Snow White",
//   age: 2,
//   temperament: 'Bland'
// }, function(err, cat) {
//   if (err) {
//     console.log();
//   } else {
//     console.log(cat);
//   }
// });



// retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats) {
  if (err) {
    console.log('oh no error');
    console.log(err);
  } else {
    console.log('all the cats');
    console.log(cats);
  }
});



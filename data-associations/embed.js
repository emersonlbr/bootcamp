var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog_demo', {useMongoClient: true});


// POST
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model('Post', postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
var User = mongoose.model('User', userSchema);



// var newUser = new User({
//   email: 'crazylol@gmail.com',
//   name: 'Roberto Alberto'
// });
//
// newUser.posts.push({
//   title: 'how to be a great person and do',
//   content: 'you can always make your life better by taking simple steps to acomplish you goal, just need to change the new stuff'
// });
//
// newUser.save(function(err, user){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });



// NEW USER
// var newUser = new User({
//   email: 'crazylol@gmail.com',
//   name: 'Roberto Alberto'
// });
// newUser.save(function(err, user){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });



// NEW POST
// var newPost = new Post ({
//   title: 'reflection on apples',
//   content: 'they are delicious'
// });
// newPost.save(function(err, post){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });


User.findOne({name:'Roberto Alberto'}, function(err, user){
  if (err) {
    // console.log(err);
  } else {
    user.posts.push({
      title: '3 things i really hate',
      content: 'you, you, you, and some of your friends'
    });
    user.save(function(err, user){
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
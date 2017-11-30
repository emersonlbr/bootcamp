// references ids instead of embeding the posts

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog_demo_2', {useMongoClient: true});

var Post = require('./models/post');
var User = require('./models/user');
// or
// require('./models/post');



// User.create({
//   email: 'bob@gmail.com',
//   name: ' Bob Belcher'
// });

Post.create({
  title: 'MAKE SHIT HAPPEN 5',
  content: 'ALKSDHFJKADSHFJHASDJFHASJDFSS'
}, function(err, post){
  // console.log(post);
  User.findOne({email: 'bob@gmail.com'}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.posts.push(post);
      foundUser.save(function(err, data){
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  });
});

// FIND USER
// User.findOne({email: 'bob@gmail.com'}).populate('posts').exec(function(err, user){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

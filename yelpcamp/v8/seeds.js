var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');


var data = [
  {
    name: 'tech camp',
    image: 'https://res.cloudinary.com/simpleview/image/fetch/c_fill,f_auto,h_250,q_75,w_350/https://res.cloudinary.com/simpleview/image/upload/v1488915577/clients/newyorkstate/Forked_Lake_State_Campground_a518f87e-9cb2-4ad8-ab7a-0772a33a384e.jpg',
    description: 'Large online course library, where classes are taught by real university professors. All courses are free of charge, but you have the option to pay for a “Coursera Verified Certificate” to prove course completion. These cost between $30 and $100 depending on the course, and sometimes paying for a certificate grants access to content not available in the free courses. They also offer “Specializations,” which are collections of courses on a specific topic, typically with a capstone project at the end.!'
  },
  {
    name: 'whatever bruh',
    image: 'http://today.lbl.gov/wp-content/uploads/sites/3/boot-camp.png',
    description: 'this campground is awesome!Large online course library, where classes are taught by real university professors. All courses are free of charge, but you have the option to pay for a “Coursera Verified Certificate” to prove course completion. These cost between $30 and $100 depending on the course, and sometimes paying for a certificate grants access to content not available in the free courses. They also offer “Specializations,” which are collections of courses on a specific topic, typically with a capstone project at the end.'
  },
  {
    name: 'cool shit',
    image: 'http://codingnomads.co/wp-content/uploads/2017/10/Whiteboard-compu-sm-w.jpg',
    description: 'this campground is awesomeLarge online course library, where classes are taught by real university professors. All courses are free of charge, but you have the option to pay for a “Coursera Verified Certificate” to prove course completion. These cost between $30 and $100 depending on the course, and sometimes paying for a certificate grants access to content not available in the free courses. They also offer “Specializations,” which are collections of courses on a specific topic, typically with a capstone project at the end.!'
  }
];

function seedDB(){
  // remove all campgrounds
  Campground.remove({}, function(err){
    if (err) {
      console.log(err);
    }
    console.log('removed all camps');
    // add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if (err) {
          console.log(err);
        } else {
          console.log('added a campground');
          // create a comment
          Comment.create(
            {
              text: 'this place is great I wish there was internet',
              author: 'Homer'
            }, function(err, comment){
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('created a new comment');
              }
            });
            }
      });
    });
  });
}

module.exports = seedDB;

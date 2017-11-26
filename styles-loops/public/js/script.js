console.log("Emerson is the best!");

var boo = 3;
var bar = 98;

if (boo < bar) {
  console.log(boo + ' is less than ' + bar);
}

var p = document.querySelector('p');

p.onclick = function() {
  this.style.backgroundColor = 'red';
  console.log('turned the background color to');
};


document.querySelector('h1').addEventListener('mouseover', function(){
  this.style.color = 'steelblue';
});



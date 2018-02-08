/* === studio2 javascript == */
// global variables
var chocolates = document.getElementById('chocolates');
var laptop = document.getElementById('laptop');
var phone = document.getElementById('phone');

var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');

var close1 = document.getElementById('close1');
var close2 = document.getElementById('close2');
var close3 = document.getElementById('close3');
// add click to joke with anonymous function to show answer
chocolates.addEventListener('click', function(){
  answer1.style.display="block";
})
close1.addEventListener('click', function(){
  answer1.style.display="none";
})


laptop.addEventListener('click', function(){
  answer2.style.display="block";
})
close2.addEventListener('click', function(){
  answer2.style.display="none";
})

phone.addEventListener('click', function(){
  answer3.style.display="block";
})
close3.addEventListener('click', function(){
  answer3.style.display="none";
})

;

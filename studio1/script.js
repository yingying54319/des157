/* === madibs javascript == */

console.log("reading");

var results = document.getElementById("results");
var myMsg = document.getElementById("myMsg");

document.f.onsubmit = processForm;
document.f.onreset = resetForm;


function processForm() {
  var userName = document.f.userName.value;
  var userP = document.f.userP.value;
  var userWeekday = document.f.userWeekday.value;
  var userNumber = document.f.userNumber.value;
  var userAnimal = document.f.userAnimal.value;

  myMsg.innerHTML =
    "Squire " + userName + "!<br> With great honor, the King would like to request for your presence to the Kingdom of Utopia on this coming " +
    userWeekday +
    " to a royal birthday celebration. Our precious princess " + userP + "is turning " + userNumber + ". We are asking for you to please Wear a " +
    userAnimal + "custume.";
  return false;
}

function resetForm() {
  myMsg.innerhtml = '';
  results.setAttribute("class", "hide");
}

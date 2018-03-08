/* === studio javascript == */
var scroller= null;
var marginY = 0;
var speed = 15;
var destination = null;

function initScroll(elementId){
  destination= document.getElementById(elementId).offsetTop;

  marginY = marginY + speed;
  scroller = setTimeout(function(){
    initScroll(elementId);
  }, 1);

  if(marginY >= destination){
    clearTimeout(scroller);
  }
  window.scroll(0, marginY);
}


function toTop(){
  marginY = marginY - speed;
  scroller = setTimeout(function(){
    toTop();
  }, 1);

  if(marginY+32 <= 0){
    clearTimeout(scroller);
  }
  window.scroll(0, marginY);

}









function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function initMap() {
  // Map options
  var options = {
    zoom: 3,
    center: {
      lat: 34.0479,
      lng: 100.6197
    }
  }

  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(event) {
    // Add marker
    addMarker({
      coords: event.latLng
    });
  });



  // Array of markers

  // Loop through markers
  for (var i = 0; i < markers.length; i++) {
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      //icon:props.iconImage
    });

    // Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
  }
}

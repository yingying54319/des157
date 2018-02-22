/* === studio javascript == */

  function initMap(){
    // Map options
    var options = {
      zoom:2,
      center:{lat:25.9631,lng:-1.0208}
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Listen for click on map
    google.maps.event.addListener(map, 'click', function(event){
      // Add marker
      addMarker({coords:event.latLng});
    });



    // Array of markers
    var markers = [
      {
        coords:{lat:60.1530,lng:1.1493},
        content:'<h3>Up Helly Aa Fire Festival</h3><h4>Genre: fire festival</h4><h4>Dates: Tuesday, January 30</h4><h4>Location: Lerwick, Scotland</h4>'
      },
      {
        coords:{lat:-22.970722,lng:-43.1729},
        content:'<h3>Rio Carnival</h3><h4>Genre: samba, marchinhas, pop, rock</h4><h4>Dates: February 9 to February 18</h4><h4>Location: Rio de Janeiro, Brazil</h4>'
      },
      {
        coords:{lat:45.8038,lng:116.4074},
        content:'<h3>Ice and Snow Sculpture Festival</h3><h4>Genre:	winter festival</h4><h4>Dates: December 24 to February 25</h4><h4>Location: Harbin, China</h4>'
      },
      {
        coords:{lat:29.9511,lng:-90.0715},
        content:'<h3>Mardi Gras — New Orleans</h3><h4>Genre: LGBTIQ film festival</h4><h4>Dates: March 3</h4><h4>Location: New Orleans, United States</h4>'
      },
      {
        coords:{lat:51.0861,lng:-4.3663},
        content:'<h3>Tomorrowland Fesitival</h3><h4>Genre: electronic dance music	</h4><h4>Dates: July 20 to July 29 7</h4><h4>Location: Boom, Belgium</h4>'
      },
      {
        coords:{lat:48.1351,lng:10.4515},
        content:'<h3>Oktoberfest Fesitival</h3><h4>Genre: summer festival</h4><h4>Dates: September 22 to October 7</h4><h4>Location: Munich, Germany</h4>'
      },
      {
        coords:{lat:35.9078,lng:127.7669},
        content:'<h3>Boryeong Mud Festival</h3><h4>Genre: beer festival</h4><h4>Dates: July</h4><h4>Location: Boryeong, South Korea</h4>'
      },
      {
        coords:{lat:37.7749,lng:-122.4194},
        content:'<h3>Gay Pride Parade</h3><h4>Genre: (LGBT) pride parade</h4><h4>Dates: June 23 to June 24</h4><h4>Location:  San Francisco</h4>'
      },
      {
        coords:{lat:23.6978,lng:120.9605},
        content:'<h3>Lantern Festival</h3><h4>Genre: Lantern Festival</h4><h4>Dates: March 2</h4><h4>Location: Pingxi, Taiwan</h4>'
      },
      {
        coords:{lat:51.1474,lng:-2.7185},
        content:'<h3>Glastonbury Festival</h3><h4>Genre: music festival</h4><h4>Dates: last weekend of June</h4><h4>Location: Pilton, Somerset, England</h4>'
      },
      {
        coords:{lat:21.315603,lng:-157.858093},
        content:'<h3>Wanderlust Yoga Festival</h3><h4>Genre: yoga festival</h4><h4>Dates: March 1</h4><h4>Location: Oahu, Hawaii</h4>'
      }
    ];

    // Loop through markers
    for(var i = 0;i < markers.length;i++){
      // Add marker
      addMarker(markers[i]);
    }

    // Add Marker Function
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        //icon:props.iconImage
      });

      // Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
  }

window.onload = function() {
  var canvas = document.getElementById("canv");
  var ctx = canvas.getContext("2d");
  // Utilities
  function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
  }

  function randomWord() {
  var word = words[Math.floor(Math.random() * words.length)];
  return word;
}

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Make the canvas occupy the full page
  var W = window.innerWidth,
    H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  var particles = [];
  var mouse = {};
  //Lets create some particles now
  var particle_count = 50;
  for (var i = 0; i < particle_count; i++) {
    particles.push(new particle());
  }
  canvas.addEventListener('mousedown', track_mouse, false);
  canvas.addEventListener('touch', track_mouse, false);

  function track_mouse(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;

    for (var i = 0; i < particle_count; i++) {
      particles.push(new particle());
    }
  }

  function particle() {
    //speed, life, location, life, colors
    //speed range = -2.5 to 2.5
    this.speed = {
      x: -2.5 + Math.random() * 1,
      y: -2.5 + Math.random() * 1
    };
    //location = center of the screen
    if (mouse.x && mouse.y) {
      this.location = {
        x: mouse.x,
        y: mouse.y
      };
    } else {
      this.location = {
        x: W / 2,
        y: H / 2
      };
    }
    this.color = randomColor()

    this.font = {
      size: randomInt(3, 15)
    }

    this.word = randomWord()
  }

  function draw() {
    ctx.globalCompositeOperation = "source-over";
    //Painting the canvas black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.font = p.font.size + "vh Luckiest Guy";
      ctx.textAlign = "center";
      ctx.transition = "all 2s ease";
      ctx.fillStyle = p.color;
      ctx.fillText(p.word, p.location.x, p.location.y);
      ctx.fill();
      ctx.stroke();

      //lets move the particles
      p.location.x += p.speed.x;
      p.location.y += p.speed.y;

      p.speed.x += randomInt(-0.01, 0.01);
      p.speed.y += randomInt(-0.01, 0.01);

      // Make 'em big and small
      // Warning: Causes extreme lag
      //p.font.size += randomInt(-0.1, 0.1)
    }
  }
  setInterval(draw, 10);
};

// Big Word Array
words = [ "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan" ];




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

/* ===========================================================
 * onepagescroll.js v1.2.2
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/purejs-onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

function onePageScroll(element, options) {

  var defaults = {
	    	sectionContainer: "section",
	    	easing: "ease",
	    	animationTime: 1000,
	    	pagination: true,
	    	updateURL: false,
	    	keyboard: true,
	    	beforeMove: null,
	    	afterMove: null,
	    	loop: false,
	    	responsiveFallback: false
	    },
	    _root = this,
	    settings = Object.extend({}, defaults, options),
	    el = document.querySelector(element),
	    sections = document.querySelectorAll(settings.sectionContainer),
	    total = sections.length,
	    status = "off",
	    topPos = 0,
	    lastAnimation = 0,
	    quietPeriod = 500,
	    paginationList = "",
	    body = document.querySelector("body");

  this.init = function() {
    /*-------------------------------------------*/
    /*  Prepare Everything                       */
    /*-------------------------------------------*/

  	_addClass(el, "onepage-wrapper")
  	el.style.position = "relative";

  	for( var i = 0; i < sections.length; i++){
  	  _addClass(sections[i], "ops-section")
  	  sections[i].dataset.index = i + 1;
  	  topPos = topPos + 100;

  	  if(settings.pagination == true) {
  			paginationList += "<li><a data-index='" + (i + 1) + "' href='#" + (i + 1) + "'></a></li>";
  		}
    }

  	_swipeEvents(el);
  	document.addEventListener("swipeDown",  function(event){
  	  if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
  		moveUp(el);
  	});
  	document.addEventListener("swipeUp", function(event){
  		if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
  		moveDown(el);
  	});

  	// Create Pagination and Display Them

  	if(settings.pagination == true) {
  	  var pagination = document.createElement("ul");
  	  pagination.setAttribute("class", "onepage-pagination");

  	  body.appendChild(pagination)
  		pagination.innerHTML = paginationList;
  		var posTop = (document.querySelector(".onepage-pagination").offsetHeight / 2) * -1;
  		document.querySelector(".onepage-pagination").style.marginTop = posTop;
  	}

  	if(window.location.hash != "" && window.location.hash != "#1") {
  		var init_index =  window.location.hash.replace("#", ""),
  		    next = document.querySelector(settings.sectionContainer + "[data-index='" + (init_index) + "']"),
  		    next_index = next.dataset.index;

  		_addClass( document.querySelector(settings.sectionContainer + "[data-index='" + init_index + "']") ,"active")
  		_addClass(body, "viewing-page-"+ init_index)
  		if(settings.pagination == true) _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + init_index + "']"), "active");

  		if(next) {
  			_addClass(next, "active")
  			if(settings.pagination == true) _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + init_index + "']"), "active");

  			body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
  			_addClass(body, "viewing-page-" + next_index)
  			if (history.replaceState && settings.updateURL == true) {
  				var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (init_index);
  				history.pushState( {}, document.title, href );
  			}
  		}
  		var pos = ((init_index - 1) * 100) * -1;
  		_transformPage(el, settings, pos, init_index);

  	}else{
  	  _addClass(document.querySelector(settings.sectionContainer + "[data-index='1']"), "active");
  	  _addClass(body, "viewing-page-1");
  		if(settings.pagination == true) _addClass(document.querySelector(".onepage-pagination li a[data-index='1']"), "active");
  	}

  	_paginationHandler = function() {
      var page_index = this.dataset.index;
  		moveTo(el, page_index);
  	}


  	if(settings.pagination == true)  {
  	  var pagination_links = document.querySelectorAll(".onepage-pagination li a");

  	  for( var i = 0; i < pagination_links.length; i++){
    	  pagination_links[i].addEventListener('click', _paginationHandler);
      }
  	}

  	_mouseWheelHandler = function(event) {
  		event.preventDefault();
  		var delta = event.wheelDelta || -event.detail;
  		if (!_hasClass(body, "disabled-onepage-scroll")) _init_scroll(event, delta);
  	}

  	document.addEventListener('mousewheel', _mouseWheelHandler);
  	document.addEventListener('DOMMouseScroll', _mouseWheelHandler);


  	if(settings.responsiveFallback != false) {
  	  window.onresize = function(){
  			_responsive();
  		}

  		_responsive();
  	}

    _keydownHandler = function(e) {
  		var tag = e.target.tagName.toLowerCase();

  		if (!_hasClass(body, "disabled-onepage-scroll")) {
  			switch(e.which) {
  				case 38:
  					if (tag != 'input' && tag != 'textarea') moveUp(el)
  					break;
  				case 40:
  					if (tag != 'input' && tag != 'textarea') moveDown(el)
  					break;
  				default: return;
  			}
  		}
  		return false;
  	}

  	if(settings.keyboard == true) {
  		document.onkeydown = _keydownHandler;
  	}
  	return false;
  }

  /*-------------------------------------------------------*/
  /*  Private Functions                                    */
  /*-------------------------------------------------------*/
  /*------------------------------------------------*/
  /*  Credit: Eike Send for the awesome swipe event */
  /*------------------------------------------------*/
  _swipeEvents = function(el){
  	var startX,
  		startY;

    document.addEventListener("touchstart", touchstart);

  	function touchstart(event) {
  		var touches = event.touches;
  		if (touches && touches.length) {
  			startX = touches[0].pageX;
  			startY = touches[0].pageY;
  			document.addEventListener("touchmove", touchmove);
  		}
  	}

  	function touchmove(event) {
  		var touches = event.touches;
  		if (touches && touches.length) {
  		  event.preventDefault();
  			var deltaX = startX - touches[0].pageX;
  			var deltaY = startY - touches[0].pageY;

  			if (deltaX >= 50) {
  			  var event = new Event('swipeLeft');
  			  document.dispatchEvent(event);
  			}
  			if (deltaX <= -50) {
  			  var event = new Event('swipeRight');
  			  document.dispatchEvent(event);
  			}
  			if (deltaY >= 50) {
  			  var event = new Event('swipeUp');
  			  document.dispatchEvent(event);
  			}
  			if (deltaY <= -50) {
  			  var event = new Event('swipeDown');
  			  document.dispatchEvent(event);
  			}

  			if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
  				document.removeEventListener('touchmove', touchmove);
  			}
  		}
  	}

  };
  /*-----------------------------------------------------------*/
	/*  Utility to add/remove class easily with javascript       */
	/*-----------------------------------------------------------*/

  _trim = function(str) {
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  _hasClass = function(ele,cls) {
    if (ele.className) {
      return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    } else {
      return ele.className = cls;
    }
  }

  _addClass = function(ele,cls) {
    if (!_hasClass(ele,cls)) ele.className += " "+cls;
    ele.className = _trim(ele.className)
  }

  _removeClass = function(ele,cls) {
    if (_hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
    ele.className = _trim(ele.className)
  }

  /*-----------------------------------------------------------*/
	/*  Transtionend Normalizer by Modernizr                     */
	/*-----------------------------------------------------------*/

  _whichTransitionEvent = function(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
  }

  /*-----------------------------------------------------------*/
	/*  Function to perform scroll to top animation              */
	/*-----------------------------------------------------------*/

  _scrollTo = function(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop == to) return;
        _scrollTo(element, to, duration - 10);
    }, 10);
  }



  /*---------------------------------*/
  /*  Function to transform the page */
  /*---------------------------------*/

  _transformPage = function(el2, settings, pos, index, next_el) {
    if (typeof settings.beforeMove == 'function') settings.beforeMove(index, next_el);

    var transformCSS = "-webkit-transform: translate3d(0, " + pos + "%, 0); -webkit-transition: -webkit-transform " + settings.animationTime + "ms " + settings.easing + "; -moz-transform: translate3d(0, " + pos + "%, 0); -moz-transition: -moz-transform " + settings.animationTime + "ms " + settings.easing + "; -ms-transform: translate3d(0, " + pos + "%, 0); -ms-transition: -ms-transform " + settings.animationTime + "ms " + settings.easing + "; transform: translate3d(0, " + pos + "%, 0); transition: transform " + settings.animationTime + "ms " + settings.easing + ";";

    el2.style.cssText = transformCSS;

    var transitionEnd = _whichTransitionEvent();
     el2.addEventListener(transitionEnd, endAnimation, false);

    function endAnimation() {
      if (typeof settings.afterMove == 'function') settings.afterMove(index, next_el);
      el2.removeEventListener(transitionEnd, endAnimation)
    }
  }

  /*-------------------------------------------*/
  /*  Responsive Fallback trigger              */
  /*-------------------------------------------*/

  _responsive = function() {

		if (document.body.clientWidth < settings.responsiveFallback) {

			_addClass(body, "disabled-onepage-scroll");
			document.removeEventListener('mousewheel', _mouseWheelHandler);
			document.removeEventListener('DOMMouseScroll', _mouseWheelHandler);
			_swipeEvents(el);
			document.removeEventListener("swipeDown");
			document.removeEventListener("swipeUp");

		} else {

		  if (_hasClass(body, "disabled-onepage-scroll")) {
		    _removeClass(body, "disabled-onepage-scroll");
		    _scrollTo(document.documentElement, 0, 2000);
	    }



			_swipeEvents(el);
			document.addEventListener("swipeDown",  function(event){
			  if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
				moveUp(el);
			});
			document.addEventListener("swipeUp", function(event){
				if (!_hasClass(body, "disabled-onepage-scroll")) event.preventDefault();
				moveDown(el);
			});

      document.addEventListener('mousewheel', _mouseWheelHandler);
  		document.addEventListener('DOMMouseScroll', _mouseWheelHandler);

		}
	}

	/*-------------------------------------------*/
  /*  Initialize scroll detection              */
  /*-------------------------------------------*/

  _init_scroll = function(event, delta) {
		var deltaOfInterest = delta,
			timeNow = new Date().getTime();

		// Cancel scroll if currently animating or within quiet period
		if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
			event.preventDefault();
			return;
		}

		if (deltaOfInterest < 0) {
			moveDown(el)
		} else {
			moveUp(el)
		}

		lastAnimation = timeNow;
	}


  /*-------------------------------------------------------*/
  /*  Public Functions                                     */
  /*-------------------------------------------------------*/

  /*---------------------------------*/
  /*  Function to move down section  */
  /*---------------------------------*/

   this.moveDown = function(el3) {

    if (typeof el3 == "string") el3 = document.querySelector(el3);

    var index = document.querySelector(settings.sectionContainer +".active").dataset.index,
		    current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']"),
		    next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index) + 1) + "']");


		if(!next) {
			if (settings.loop == true) {
				pos = 0;
				next = document.querySelector(settings.sectionContainer + "[data-index='1']");
			} else {
				return
			}

		}else {
			pos = (index * 100) * -1;
		}
		var next_index = next.dataset.index;
		_removeClass(current, "active");
		_addClass(next, "active");

		if(settings.pagination == true) {
		  _removeClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + index + "']"), "active");
		  _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + next_index + "']"), "active");
		}

		body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
		_addClass(body, "viewing-page-"+ next_index);

		if (history.replaceState && settings.updateURL == true) {
			var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (parseInt(index) + 1);
			history.pushState( {}, document.title, href );
		}
		_transformPage(el3, settings, pos, next_index, next);
	}

	/*---------------------------------*/
  /*  Function to move up section    */
  /*---------------------------------*/

	this.moveUp = function(el4) {

	  if (typeof el4 == "string") el4 = document.querySelector(el4);

	  var index = document.querySelector(settings.sectionContainer +".active").dataset.index,
		    current = document.querySelector(settings.sectionContainer + "[data-index='" + index + "']"),
		    next = document.querySelector(settings.sectionContainer + "[data-index='" + (parseInt(index) - 1) + "']");

		if(!next) {
			if (settings.loop == true) {
				pos = ((total - 1) * 100) * -1;
				next = document.querySelector(settings.sectionContainer + "[data-index='" + total + "']");
			} else {
				return
			}
		}else {
			pos = ((next.dataset.index - 1) * 100) * -1;
		}
		var next_index = next.dataset.index;
		_removeClass(current, "active")
		_addClass(next, "active")

		if(settings.pagination == true) {
		  _removeClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + index + "']"), "active");
		  _addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + next_index + "']"), "active");
		}
		body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
		_addClass(body, "viewing-page-"+ next_index);

		if (history.replaceState && settings.updateURL == true) {
			var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (parseInt(index) - 1);
			history.pushState( {}, document.title, href );
		}
		_transformPage(el4, settings, pos, next_index, next);
	}

  /*-------------------------------------------*/
  /*  Function to move to specified section    */
  /*-------------------------------------------*/

  this.moveTo = function(el5, page_index) {

    if (typeof el5 == "string") el5 = document.querySelector(el5);

		var current = document.querySelector(settings.sectionContainer + ".active"),
		    next = document.querySelector(settings.sectionContainer + "[data-index='" + (page_index) + "']");

		if(next) {
		  var next_index = next.dataset.index;
			_removeClass(current, "active");
			_addClass(next, "active");
			_removeClass(document.querySelector(".onepage-pagination li a" + ".active"), "active");
			_addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + (page_index) + "']"), "active");

			body.className = body.className.replace(/\bviewing-page-\d.*?\b/g, '');
			_addClass(body, "viewing-page-"+ next_index);

			pos = ((page_index - 1) * 100) * -1;

			if (history.replaceState && settings.updateURL == true) {
				var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (parseInt(page_index) - 1);
				history.pushState( {}, document.title, href );
			}
			_transformPage(el5, settings, pos, page_index, next);
		}
	}

  this.init();
}

/*------------------------------------------------*/
 /*  Ulitilities Method                            */
 /*------------------------------------------------*/

 /*-----------------------------------------------------------*/
 /*  Function by John Resig to replicate extend functionality */
 /*-----------------------------------------------------------*/

 Object.extend = function(orig){
   if ( orig == null )
     return orig;

   for ( var i = 1; i < arguments.length; i++ ) {
     var obj = arguments[i];
     if ( obj != null ) {
       for ( var prop in obj ) {
         var getter = obj.__lookupGetter__( prop ),
             setter = obj.__lookupSetter__( prop );

         if ( getter || setter ) {
           if ( getter )
             orig.__defineGetter__( prop, getter );
           if ( setter )
             orig.__defineSetter__( prop, setter );
         } else {
           orig[ prop ] = obj[ prop ];
         }
       }
     }
   }

   return orig;
 };


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
   var particle_count = 20;
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
     ctx.globalCompositeOperation = "";
     for (var i = 0; i < particles.length; i++) {
       var p = particles[i];
       ctx.beginPath();
       ctx.font = p.font.size + "1px Georgia";
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

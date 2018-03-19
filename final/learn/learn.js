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










 // This will let you use the .remove() function later on
 if (!('remove' in Element.prototype)) {
   Element.prototype.remove = function() {
     if (this.parentNode) {
       this.parentNode.removeChild(this);
     }
   };
 }

 mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2lqbmpqazdlMDBsdnRva284cWd3bm11byJ9.V6Hg2oYJwMAxeoR9GEzkAA';

 // This adds the map
 var map = new mapboxgl.Map({
   // container id specified in the HTML
   container: 'map',
   // style URL
   style: 'mapbox://styles/mapbox/light-v9',
   // initial position in [long, lat] format
   center: [84.1240,38.3949],
   // initial zoom
   zoom: 2.2,
   scrollZoom: false
 });

 var stores = {
   "type": "FeatureCollection",
   "features": [{"type": "Feature",
       "geometry": {"type": "Point",
         "coordinates": [
           67.7100,
           33.9391
         ]
       },
       "properties": {
         "address": "Afghanistan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           45.0382,
           40.0691
         ]
       },
       "properties": {
         "address": "Armenia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           47.5769,
           40.1431
         ]
       },
       "properties": {
         "address": "Azerbaijan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           50.5577,
           26.0667
         ]
       },
       "properties": {
         "address": "Bahrain",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           90.3563,
           23.6850
         ]
       },
       "properties": {
         "address": "Bangladesh",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           90.4336,
           27.5142
         ]
       },
       "properties": {
         "address": "Bhutan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           114.7277,
           4.5353
         ]
       },
       "properties": {
         "address": "Brunei",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           104.9910,
           12.5657
         ]
       },
       "properties": {
         "address": "Cambodia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           101.7782,
           36.6171
         ]
       },
       "properties": {
         "address": "China",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           33.4299,
           35.1264
         ]
       },
       "properties": {
         "address": "Cyprus",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           82.9001,
           32.1656
         ]
       },
       "properties": {
         "address": "Georgia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           78.9629,
           20.5937
         ]
       },
       "properties": {
         "address": "India",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           113.9213,
           0.7893
         ]
       },
       "properties": {
         "address": "Indonesia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           53.6880,
           32.4279
         ]
       },
       "properties": {
         "address": "Iran",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           43.6793,
           33.2232
         ]
       },
       "properties": {
         "address": "Iraq",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           34.8516,
           31.0461
         ]
       },
       "properties": {
         "address": "Israel",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           138.2529,
           36.2048
         ]
       },
       "properties": {
         "address": "Japan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           36.2384,
           30.5852
         ]
       },
       "properties": {
         "address": "Jordan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           47.4818,
           29.3117
         ]
       },
       "properties": {
         "address": "Kuwait",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           74.7661,
           41.2044
         ]
       },
       "properties": {
         "address": "Kyrgyzstan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           102.4955,
           19.8563
         ]
       },
       "properties": {
         "address": "Laos",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           35.8623,
           33.8547
         ]
       },
       "properties": {
         "address": "Lebanon",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           101.9758,
           4.2105
         ]
       },
       "properties": {
         "address": "Malaysia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           73.2207,
           3.2028
         ]
       },
       "properties": {
         "address": "Maldives",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           103.8467,
           46.8625
         ]
       },
       "properties": {
         "address": "Mongolia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           95.9560,
           21.9162
         ]
       },
       "properties": {
         "address": "Myanmar",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           84.1240,
           28.3949
         ]
       },
       "properties": {
         "address": "Nepal",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           127.5101,
           40.3399
         ]
       },
       "properties": {
         "address": "North Korea",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           55.9754,
           21.4735
         ]
       },
       "properties": {
         "address": "Oman",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           69.3451,
           30.3753
         ]
       },
       "properties": {
         "address": "Pakistan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           35.2332,
           31.9522
         ]
       },
       "properties": {
         "address": "Palestine",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           121.7740,
           12.8797
         ]
       },
       "properties": {
         "address": "Philippines",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           51.1839,
           25.3548
         ]
       },
       "properties": {
         "address": "Qatar",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
         105.3188,
         61.5240
         ]
       },
       "properties": {
         "address": "Russia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           45.0792,
           23.8859
         ]
       },
       "properties": {
         "address": "Saudi Arabia",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           103.8198,
           1.3521
         ]
       },
       "properties": {
         "address": "Singapore",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
         127.7669,
           35.9078
         ]
       },
       "properties": {
         "address": "South Korea",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           80.7718,
           7.8731
         ]
       },
       "properties": {
         "address": "Sri Lanka",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           38.9968,
           34.8021
         ]
       },
       "properties": {
         "address": "Syria",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           71.2761,
           38.8610
         ]
       },
       "properties": {
         "address": "Tajikistan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           100.9925,
           15.8700
         ]
       },
       "properties": {
         "address": "Thailand",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           125.7275,
           8.8742
         ]
       },
       "properties": {
         "address": "Timor-Leste",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           35.2433,
           38.9637
         ]
       },
       "properties": {
         "address": "Turkey",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           59.5563,
           38.9697
         ]
       },
       "properties": {
         "address": "Turkmenistan",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           53.8478,
           23.4241
         ]
       },
       "properties": {
         "address": "United Arab Emirates",
       }
     },
     {
       "type": "Feature",
       "geometry": {
         "type": "Point",
         "coordinates": [
           64.5853,
           41.3775
         ]
       },
       "properties": {
         "address": "Uzbekistan",
       }
     }
   ]
 };
 // This adds the data to the map
 map.on('load', function(e) {

   // Initialize the list
   buildLocationList(stores);

 });


 // This is where your interactions with the symbol layer used to be
 // Now you have interactions with DOM markers instead
 stores.features.forEach(function(marker, i) {
   // Create an img element for the marker
   var el = document.createElement('div');
   el.id = "marker-" + i;
   el.className = 'marker';
   // Add markers to the map at all points
   new mapboxgl.Marker(el, {
       offset: [0, -20]
     })
     .setLngLat(marker.geometry.coordinates)
     .addTo(map);

   el.addEventListener('click', function(e) {
     // 1. Fly to the point
     flyToStore(marker);

   });
 });


 function flyToStore(currentFeature) {
   map.flyTo({
     center: currentFeature.geometry.coordinates,
     zoom: 5

   });
 }


 function buildLocationList(data) {
   for (i = 0; i < data.features.length; i++) {
     var currentFeature = data.features[i];
     var prop = currentFeature.properties;

     var listings = document.getElementById('listings');
     var listing = listings.appendChild(document.createElement('div'));
     listing.className = 'item';
     listing.id = "listing-" + i;

     var link = listing.appendChild(document.createElement('a'));
     link.href = '#';
     link.className = 'title';
     link.dataPosition = i;
     link.innerHTML = prop.address;

     var details = listing.appendChild(document.createElement('div'));



     link.addEventListener('click', function(e) {
       // Update the currentFeature to the store associated with the clicked link
       var clickedListing = data.features[this.dataPosition];

       // 1. Fly to the point
       flyToStore(clickedListing);

       // 2. Highlight listing in sidebar (and remove highlight for all other listings)
       var activeItem = document.getElementsByClassName('active');

       if (activeItem[0]) {
         activeItem[0].classList.remove('active');
       }
       this.parentNode.classList.add('active');

     });
   }
 }

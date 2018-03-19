var ocean = {};

/*========================================
Utility
========================================*/

ocean.PI = Math.PI;
ocean.TAU = ocean.PI * 2;

ocean.rand = function( min, max ) {
	if ( !max ) {
		var max = min;
		min = 0;
	}
	return Math.random() * ( max - min ) + min;
};

/*========================================
Initialize
========================================*/

ocean.init = () => {
	ocean.c = document.querySelector( 'canvas' );
	ocean.ctx = ocean.c.getContext( '2d' );
	ocean.simplex = new SimplexNoise();
	ocean.events();
	ocean.reset();
	ocean.loop();
};

/*========================================
Reset
========================================*/

ocean.reset = () => {
	ocean.w = window.innerWidth;
	ocean.h = window.innerHeight;
	ocean.cx = ocean.w / 2;
	ocean.cy = ocean.h / 2;
	ocean.c.width = ocean.w;
	ocean.c.height = ocean.h;

	ocean.count = Math.floor( ocean.w / 50 );
	ocean.xoff = 0;
	ocean.xinc = 0.05;
	ocean.yoff = 0;
	ocean.yinc = 0.003;
	ocean.goff = 0;
	ocean.ginc = 0.003;
	ocean.y = ocean.h * 0.66;
	ocean.length = ocean.w + 10;
	ocean.amp = 40;
};

/*========================================
Event
========================================*/

ocean.events = () => {
	window.addEventListener( 'resize', ocean.reset.bind( this ) );
};

/*========================================
Wave
========================================*/

ocean.wave = () => {
	ocean.ctx.beginPath();
	let sway = ocean.simplex.noise2D( ocean.goff, 0 ) * ocean.amp;
	for( let i = 0; i <= ocean.count; i++ ) {
		ocean.xoff += ocean.xinc;
		let x = ocean.cx - ocean.length / 2 + ( ocean.length / ocean.count ) * i;
		let y = ocean.y + ocean.simplex.noise2D( ocean.xoff, ocean.yoff ) * ocean.amp + sway;
		ocean.ctx[ i === 0 ? 'moveTo' : 'lineTo' ]( x, y );
	}
	ocean.ctx.lineTo( ocean.w, ocean.h );
	ocean.ctx.lineTo( 0, ocean.h );
	ocean.ctx.closePath();
	ocean.ctx.fillStyle = 'hsla(210, 90%, 50%, 0.2)';
	ocean.ctx.fill();
};

/*========================================
Loop
========================================*/

ocean.loop = () => {
	requestAnimationFrame( ocean.loop );
	ocean.ctx.clearRect( 0, 0, ocean.w, ocean.h );
	ocean.xoff = 0;
	ocean.wave();
	ocean.wave();
	ocean.wave();
	ocean.wave();
	ocean.yoff += ocean.yinc;
	ocean.goff += ocean.ginc;
};

/*========================================
Start
========================================*/

ocean.init();

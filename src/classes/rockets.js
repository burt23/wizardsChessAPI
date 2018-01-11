const svg = document.querySelector('#svg');
// svg.addEventListener('load', fireRockets)
import {TimelineMax} from 'gsap'


function fireRockets(rocketBundle, windowHeight, windowWidth) {
	// const rocketBundle = svg.contentDocument.querySelectorAll('.rockets');

	const tl = new TimelineMax({delay: .5});

	let radius, theta, x, y, r, center, rocket, i, j
	for (i = 0; i<rocketBundle.length; i++) {
		rocket = rocketBundle[i].children;
		radius = getRadius();
		center = getCenter();

		tl.to(rocket, 2, {bezier: [center]}, "launch" + i)

		let fill = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		tl.to(rocket, .01, {fill, opacity:100}, "color" + i)

		let coin = Math.random();
		coin > .5 ? heart() : generic();
		
		tl.to(rocket, .5, {opacity: 0}, "disappear" + i)
	}

	function getRadius() {
		return 1/6*windowWidth + Math.random()*1/7*windowWidth;
	}

	function getCenter() {
		return {
			x: Math.random()*3/4*windowWidth - windowWidth/2,
			y: -3/4*windowHeight - 1/4*Math.random()*windowHeight
		};
	}

	function heart() {
		for (j = 0; j<rocket.length; j++) {
			x = Math.random()*4 - 2;
			let b = Math.random();
			y = b > .5 ? Math.sqrt(1 - Math.pow(Math.abs(x) - 1, 2)) : Math.acos(1 - Math.abs(x)) - Math.PI
			r = radius/3;
			tl.to(rocket[j], 1, {x: x*r + center.x, y: y*-r + center.y}, "explode" + i)
		}
	}

	function generic() {
		for (j = 0; j<rocket.length; j++) {
			theta = Math.random()*360;
			r = Math.random()*radius;
			x = center.x + r*Math.cos(theta);
			y = center.y + r*Math.sin(theta);

			tl.to(rocket[j], 1, {x, y}, "explode" + i)
		}
	}


}

module.exports = fireRockets;
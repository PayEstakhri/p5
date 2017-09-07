var r;
var g;
var c;
var count = 0;;

function setup() {
	createCanvas(600, 600);
	background(255);
}

function draw() {
	for (var i = 0; i < width; i++) {
		for (var q = 0; q < height; q++) {
			r = map(i, 0, 600, 0, 255);
			g = map(q, 0, 600, 0, 255);
			stroke(r, g, 0);
			point(i, q);
		}
	}
}
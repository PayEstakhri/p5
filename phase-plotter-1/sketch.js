var x;
var y;
var scale;
//var opacity = 5;
var vectors = [];
var angles = [];

function setup() {
	//var myCanvas = createCanvas(600, 600);  // Creating the Canvas
	//myCanvas.parent('myCanvas');
	createCanvas(600, 600);
}

function draw() {
	/*if (abs(opacity) == 50) {
		opacity = opacity * (-1);
	}*/

	//background(0, 100, 150, opacity)

	background(255, 255, 255, 0.1);

	x = 'x^2';  //  Our Input Functions
	y = '4*x + y';
	scale = 20;

	vectors = createVectorArray(x, y, scale);

	angles = phaseAnimation(vectors, scale);

	stroke(0);
	push();
	strokeWeight(2);
	line(0, height / 2, width, height / 2);  // Creating our X/Y Plane
	line(width / 2, 0, width / 2, height);
	//textSize(8);
	//text("X Axis", width - 28, height / 2 - 6);  // Labeling our Axes
	//text("Y Axis", width / 2 + 5, 12)
	pop();

	for (var i = width / scale; i < width; i += width / scale) {			//  Plotting Every Vertex in our X/Y Plane
		for (var q = height / scale; q < height; q += height / scale) {  
			stroke(0);
			strokeWeight(3);
			point(i, q);
		}
	}
}
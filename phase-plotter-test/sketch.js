var x;
var y;
var scale;
var vectors = [];
var angles = [];

function setup() {
	//var myCanvas = createCanvas(600, 600);  // Creating the Canvas
	//myCanvas.parent('myCanvas');
	createCanvas(600, 600);
}

/*function getXInput() {
    var nameFieldX = document.getElementById('nameFieldX').value;
    var resultX = document.getElementById('resultX');
    
   	resultX.textContent = 'dx/dt = ' + nameFieldX;
}
// use an eventlistener for the eveNT
var subButtonX = document.getElementById('subButtonX');
subButtonX.addEventListener('click', getXInput, false);

function getYInput() {
    var nameFieldY = document.getElementById('nameFieldY').value;
    var resultY = document.getElementById('resultY');
    
   	resultY.textContent = 'dy/dt = ' + nameFieldY;
}

var subButtonY = document.getElementById('subButtonY');
subButtonY.addEventListener('click', getYInput, false);*/

function draw() {
	/*if (abs(opacity) == 50) {
		opacity = opacity * (-1);
	}*/

	//background(0, 100, 150, opacity)

	//background(255, 255, 255, 0.1);

	//x = 'x^2';  //  Our Input Functions
	//y = '4*x + y';

	//x = subButtonX;
	//y = subButtonY;

	//scale = 20;

	vectors = createVectorArray(x_dot, y_dot, scale);

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
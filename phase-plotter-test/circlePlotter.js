function circlePlotter(angles) {
	var color;
	var count = 0;

	for (var w = 0; w < width; w++) {
		for (var z = 0; z < height; z++) {
			if (count < ((width / 20 - 1) * (height / 20 - 1))) {
				color = map(angles[count], -PI, PI, 0, 255);

				//var path = new Path.Circle(new Point(w, z), 10);
				//path.fillColor = new Color(color, 0, 0);

				push();
				ellipseMode(RADIUS);
				translate(w, z);
				strokeWeight(0);
				fill(color, 0, 0);
				ellipse(0, 0, 10, 10);
				pop();

				count++;
			}
			else {
			}
		}
	}
}
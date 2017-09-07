function phaseAnimation(input_vector_array, scale) {
	var init_coords = [];
	var angleRad = [];
	var index_coords = 0;
	var count = 0;
	var r = [];
	var new_x;
	var new_y;
	var xy_coord_final = [];
	var color_line;
	var color_change;
	var freq = 0.3;
	var amp = 127;
	var center = 128;

	for (var w = width / scale; w < width; w+= width / scale) {				 
		for (var z = height / scale; z < height; z += height / scale) {
			if (index_coords < ((scale - 1) * (scale - 1))) {
				init_coords[index_coords] = [[map(w, width / scale, width - width / scale, (-1) * ((scale / 2) - 1), (scale / 2) - 1)], [map(z, height / scale, height - height / scale, (scale / 2) - 1, (-1) * ((scale / 2) -1))]];
				index_coords++;
			}
			else {
			}
		}
	}

	for (var i = 0; i < init_coords.length; i++) {						//  Conversion from Cartesian to Polar Coordinates
		if (input_vector_array[i][0] == 0) {							//  Cannot divide by zero
			r[i] = 0;
			angleRad[i] = 0;
		}
		else if (input_vector_array[i][0] < 0 && input_vector_array[i][1] < 0) {				//  Adjusting angleRad to be within bounds of atan
			if (abs(input_vector_array[i][0]) > abs(input_vector_array[i][1])) {				//  If abs(x) > abs(y)
				r[i] = sqrt(math.square(10) + math.square((10 * input_vector_array[i][1])/input_vector_array[i][0]));
			}
			else if (abs(input_vector_array[i][1]) > abs(input_vector_array[i][0])) { 			//  if abs(y) > abs(x)
				r[i] = sqrt(math.square((10 * input_vector_array[i][0])/input_vector_array[i][1]) + math.square(10));
			}
			else {																				// if abs(x) = abs(y)
				r[i] = sqrt(math.square(10) + math.square(10));
			}
			angleRad[i] = math.atan(input_vector_array[i][1] / input_vector_array[i][0]) - math.PI;
		}
		else if (input_vector_array[i][0] < 0 && input_vector_array[i][1] > 0) {
			if (abs(input_vector_array[i][0]) > abs(input_vector_array[i][1])) {
				r[i] = sqrt(math.square(10) + math.square((10 * input_vector_array[i][1])/input_vector_array[i][0]));
			}
			else if (abs(input_vector_array[i][1]) > abs(input_vector_array[i][0])) {
				r[i] = sqrt(math.square((10 * input_vector_array[i][0])/input_vector_array[i][1]) + math.square(10));
			}
			else {
				r[i] = sqrt(math.square(10) + math.square(10));
			}
			angleRad[i] = math.atan(input_vector_array[i][1] / input_vector_array[i][0]) + math.PI;
		}
		else {
			if (abs(input_vector_array[i][0]) > abs(input_vector_array[i][1])) {
				r[i] = sqrt(math.square(10) + math.square((10 * input_vector_array[i][1])/input_vector_array[i][0]));
			}
			else if (abs(input_vector_array[i][1]) > abs(input_vector_array[i][0])) {
				r[i] = sqrt(math.square((10 * input_vector_array[i][0])/input_vector_array[i][1]) + math.square(10));
			}
			else {
				r[i] = sqrt(math.square(10) + math.square(10));
			}
			angleRad[i] = math.atan(input_vector_array[i][1] / input_vector_array[i][0]);
		}
	}

	for (var w = width / scale; w < width; w += width / scale) {				 
		for (var z = height / scale; z < height; z += height / scale) {
			if (count < (scale - 1) * (scale- 1)) {
				color_line = map(angleRad[count], -PI, PI, 0, 255);
				color_change = map(count, 0, (scale - 1) * (scale - 1), 0, 255); 
				//color_line = sin(freq * count) * amp + center;

				new_x = r[count] * math.cos(angleRad[count]);
				new_y = (-1) * r[count] * math.sin(angleRad[count]);

				/*if (new_x == 0 && new_y == 0) {
					push();										//  creating our circles at each point in the coordinate system
					ellipseMode(RADIUS);
					translate(w, z);
					strokeWeight(0);
					fill(0, 127, 0, 10);
					ellipse(0, 0, 10, 10);
					pop();
				}
				else {
					push();										//  creating our circles at each point in the coordinate system
					ellipseMode(RADIUS);
					translate(w, z);
					strokeWeight(0);
					fill(color_circle, 0, 0, 10);
					ellipse(0, 0, 10, 10);
					pop();
				}*/
				push();										//  creating the directional vectors at each point in the coordinate system
				translate(w, z);
				strokeWeight(2);
				//stroke(color_line, color_line, color_line);
				//stroke(0, 170, 170);
				//stroke(255-color_circle, 25);
				stroke(color_line, color_change, 255 - color_change);
				line(0, 0, new_x, new_y);
				pop();

				xy_coord_final[count] = [[new_x], [new_y]];
				count++;
			}
			else {
			}
		}
	}
	//return xy_coord_final;
	return angleRad;
}
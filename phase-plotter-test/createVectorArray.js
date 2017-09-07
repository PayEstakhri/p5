function createVectorArray(x, y, scale) {
	var x_init;
	var y_init;
	var x1_dot;
	var x2_dot;
	var y1_dot;
	var y2_dot;
	var x_coord;
	var y_coord;
	var x1_func;
	var x2_func;
	var y1_func;
	var y2_func;
	var x1_val;
	var x2_val;
	var y1_val;
	var y2_val;
	var index = 0;
	var coord_matrix = [];
	var val_matrix = [];
	var vector_array = [];

	x_init = math.eval("f(x, y) = " + x);
	y_init = math.eval("f(x, y) = " + y);

	x1_dot = math.string(math.derivative(x, 'x'));  // Computing the Partial Derivatives of our input functions
	x2_dot = math.string(math.derivative(x, 'y'));

	y1_dot = math.string(math.derivative(y, 'x'));
	y2_dot = math.string(math.derivative(y, 'y'));

	x1_func = math.eval("f(x, y) = " + x1_dot);
	x2_func = math.eval("f(x, y) = " + x2_dot);

	y1_func = math.eval("f(x, y) = " + y1_dot);
	y2_func = math.eval("f(x, y) = " + y2_dot);

	for (var w = width / scale; w < width; w+= width / scale) {				//  Creating an Array of Vectors for each point on our X/Y Plane
		for (var z = height / scale; z < height; z += height / scale) {
			if (index < ((scale - 1) * (scale - 1))) {   //  Add checks for nodes
				x_coord = map(w, width / scale, width - width / scale, (-1) * ((scale / 2) - 1), (scale / 2) - 1);
				y_coord = map(z, height / scale, height - height / scale, (scale / 2) - 1, (-1) * ((scale / 2) - 1));
				coord_matrix[index] = [[x_coord], [y_coord]];

				if (Number(x_init(x_coord, y_coord)) == 0 && Number(y_init(x_coord, y_coord)) == 0) {
					x1_val = 0;
					x2_val = 0;

					y1_val = 0;
					y2_val = 0;
				}
				else {
					x1_val = Number(x1_func(x_coord, y_coord));
					x2_val = Number(x2_func(x_coord, y_coord));

					y1_val = Number(y1_func(x_coord, y_coord));
					y2_val = Number(y2_func(x_coord, y_coord));
				}
				val_matrix[index] = [[x1_val, x2_val], [y1_val, y2_val]];
				vector_array[index] = math.multiply(val_matrix[index], coord_matrix[index]);
				index++;
			}
			else {
			}
		}
	}
	return vector_array;
}
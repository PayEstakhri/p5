write_three_d = function(input.df, output_file, x, y, z,
                         size = NULL, color = NULL, label = NULL, group = NULL, other_vars = character(0),
                         progress_updates = NULL) {
  # input.df: the data frame to extract data from.
  # output_file: file to write to.
  # x, y, z, size, color, label: strings representing fields in input.df.
  # other_vars: vector of strings of variables to be written to 'other'.
  
  num_samples = length(input.df[[x]])
  have_others = FALSE
  print_others = FALSE
  
  if (length(other_vars) > 0) {
    have_others = TRUE
    base_vars = c(x, y, z)
    if (!is.null(size)) { base_vars = c(base_vars, size) }
    if (!is.null(color)) { base_vars = c(base_vars, color) }
    if (!is.null(label)) { base_vars = c(base_vars, label) }
    if (!is.null(group)) { base_vars = c(base_vars, group) }
    
    other_var_indices = integer()
    print_other_indices = integer()
    unique_others = 0
    num_base = length(base_vars)
    
    for (i in 1:length(other_vars)) {
      if (other_vars[i] %in% base_vars) {
        other_var_indices = c(other_var_indices, which(base_vars == other_vars[i]))
      } else {
        print_others = TRUE
        unique_others = unique_others + 1
        other_var_indices = c(other_var_indices, num_base + unique_others)
        print_other_indices = c(print_other_indices, i)
      }
    }
  }
  
  js_lines = "<script type=\"text/javascript\">"
  js_lines = c(js_lines, "function init_plot() {")
  js_lines = c(js_lines, "  var params = {};")
  js_lines = c(js_lines, "  params.div_id = \"div_plot_area\";")
  js_lines = c(js_lines, paste("  params.axis_titles = [\"", x, "\", \"", y, "\", \"", z, "\"];", sep=""))
  js_lines = c(js_lines, "  params.data = [];")
  js_lines = c(js_lines, "  ")
  js_lines = c(js_lines, "  var input_data = [")
  
  for (i in 1:num_samples) {
    if (!is.null(progress_updates)) {
      if (i %% progress_updates == 0) {
        print(i)
      }
    }
    
    this_x = input.df[[x]][i]
    this_y = input.df[[y]][i]
    this_z = input.df[[z]][i]
    
    if (is.na(this_x) || is.null(this_x)) { this_x = "NaN" }
    if (is.na(this_y) || is.null(this_y)) { this_y = "NaN" }
    if (is.na(this_z) || is.null(this_z)) { this_z = "NaN" }
    
    this_line = paste(this_x, this_y, this_z, sep=",")
    
    if (!is.null(size)) {
      this_size = input.df[[size]][i]
      if (is.na(this_size) || is.null(this_size)) { this_size = "NaN" }
      
      this_line = paste(this_line, this_size, sep=",")
    }
    
    if (!is.null(color)) {
      this_color = input.df[[color]][i]
      
      if (typeof(this_color) == "character") {
        this_color = paste("\"", this_color, "\"", sep="")
      }
      
      if (is.na(this_color) || is.null(this_color)) { this_color = "NaN" }
      
      this_line = paste(this_line, this_color, sep=",")
    }
    
    if (!is.null(label)) {
      this_label = paste("\"", input.df[[label]][i], "\"", sep="")
      this_line = paste(this_line, this_label, sep=",")
    }
    
    if (!is.null(group)) {
      this_group = paste("\"", input.df[[group]][i], "\"", sep="")
      this_line = paste(this_line, this_group, sep=",")
    }
    
    if (print_others) {
      for (j in print_other_indices) {
        this_other = input.df[[other_vars[j]]][i]
        this_type = typeof(this_other)
        
        if (is.na(this_other) || is.null(this_other)) {
          this_other = "NaN"
        } else {
          if (this_type == "character") {
            this_other = paste("\"", this_other, "\"", sep="")
          }
        }
        
        this_line = paste(this_line, this_other, sep=",")
      }
    }
    
    comma = ","
    if (i == num_samples) { comma = "" }
    
    this_line = paste("    [", this_line, "]", comma, sep="")
    
    js_lines = c(js_lines, this_line)
  }
  
  js_lines = c(js_lines, "  ];\n")
  
  js_lines = c(js_lines, "  for (var i = 0; i < input_data.length; i++) {")
  js_lines = c(js_lines, "    params.data.push({});")
  js_lines = c(js_lines, "    params.data[i].x = input_data[i][0];")
  js_lines = c(js_lines, "    params.data[i].y = input_data[i][1];")
  js_lines = c(js_lines, "    params.data[i].z = input_data[i][2];")
  
  i = 3
  if (!is.null(size)) {
    js_lines = c(js_lines, "    params.data[i].size = input_data[i][3];")
    i = i + 1
  }
  
  if (!is.null(color)) {
    js_lines = c(js_lines, paste("    params.data[i].color = input_data[i][", i, "];", sep=""))
    i = i + 1
  }
  
  if (!is.null(label)) {
    js_lines = c(js_lines, paste("    params.data[i].label = input_data[i][", i, "];", sep=""))
    i = i + 1
  }
  
  if (!is.null(group)) {
    js_lines = c(js_lines, paste("    params.data[i].group = input_data[i][", i, "];", sep=""))
    i = i + 1
  }
  
  if (have_others) {
    js_lines = c(js_lines, "    params.data[i].other = {};")
    
    for (i in 1:length(other_vars)) {
      this_i = other_var_indices[i] - 1
      this_var = other_vars[i]
      
      this_var = gsub("\\.", "_", this_var)
      
      js_lines = c(js_lines, paste("    params.data[i].other.", this_var, " = input_data[i][", this_i, "];", sep=""))
    }
  }
  
  js_lines = c(js_lines, "  }\n")
  
  js_lines = c(js_lines, "  three_d.make_scatter(params);")
  js_lines = c(js_lines, "}\n")
  
  js_lines = c(js_lines, "init_plot();")
  js_lines = c(js_lines, "</script>")
  
  write(js_lines, file=output_file)
}
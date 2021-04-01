const drawFullStats = (f_w, f_h, data1, data2) => {
  const fullStats = d3
    .select("#fullStats")
    // Container class to make it responsive.
    .classed("svg-container", true)
    .append("svg")
    // Responsive SVG needs these 2 attributes and no width and height attr.
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 400")
    // Class to make it responsive.
    .classed("svg-content-responsive", true)
    .attr("width", f_w)
    .attr("height", f_h)
    .attr("viewBox", "0 0 " + f_w + " " + f_h);

  // Scales
  const _yScale = d3
    .scaleLinear()
    .domain([d3.max(data1), 0])
    .range([f_h - 10, 0]);

  const _xScale = d3
    .scaleLinear()
    .domain([0, data1.length])
    .range([f_h - 10, 0]);

  const _yScaleReverse = d3
    .scaleLinear()
    .domain([d3.max(data1), 0])
    .range([0, f_h - 10]);

  // Grid Lines
  const yGrid = d3
    .axisLeft(_yScaleReverse)
    .ticks(9, "f")
    .tickSize(-f_w, 0, 0)
    .tickFormat((d) => {
      if (d >= 1000000000) return d / 1000000000 + "Md";
      if (d >= 1000000) return d / 1000000 + "M";
      if (d >= 1000) return d / 1000 + "k";
      return d;
    });
  fullStats
    .append("g")
    .attr(
      "transform",
      "translate(" + _pad + ", " + (f_h - 5 - _yScaleReverse(0)) + ")"
    )
    .call(yGrid);

  // Drawing
  fullStats
    .append("g")
    .attr("data-target", 1)
    .selectAll(".bar")
    .data(data1)
    .enter()
    .append("rect")
    .attr("x", (d, i) => _pad * 2 + ((f_w - _pad) / data1.length) * i)
    .attr("y", (d) => f_h - 5)
    .attr("width", _pad / 2)
    .attr("height", (d) => 0)
    .style("fill", "#0265b5")
    .transition()
    .duration(800)
    .attr("y", (d) => f_h - _yScale(d) - 5)
    .attr("height", (d) => _yScale(d))
    .delay(100);
  fullStats
    .append("g")
    .attr("data-target", 2)
    .selectAll(".bar-1")
    .data(data2)
    .enter()
    .append("rect")
    .attr("x", (d, i) => _pad * 3 + ((f_w - _pad) / data2.length) * i)
    .attr("y", (d) => f_h - 5)
    .attr("width", _pad / 2)
    .attr("height", (d) => 0)
    .style("fill", "#d99827")
    .transition()
    .duration(800)
    .attr("y", (d) => f_h - _yScale(d) - 5)
    .attr("height", (d) => _yScale(d))
    .delay(300);
};

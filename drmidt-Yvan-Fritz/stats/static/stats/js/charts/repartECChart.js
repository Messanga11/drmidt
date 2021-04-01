const drawRepartEC = (_w, _h) => {
  const dataRepartEC = Object.keys(dataset[0].EC).map(
    (dep) => dataset[0].EC[dep]
  );
  const pad = 30;
  const radius = (Math.min(_w, _h) - pad) / 3;

  const repartSvg = d3
    .select("#repartEc")
    // Container class to make it responsive.
    .classed("svg-container", true)
    .append("svg")
    // Responsive SVG needs these 2 attributes and no width and height attr.
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 400")
    // Class to make it responsive.
    .classed("svg-content-responsive", true)
    .attr("viewBox", "0 0 " + _w + " " + _h);
  const gPie = repartSvg
    .append("g")
    .attr("transform", "translate(" + _w / 2 + " ," + (_h / 2 + pad) + ")");

  const pie = d3.pie();

  const formatedData = pie(dataRepartEC);

  const color = d3.scaleOrdinal(["#ff957c", "#fbff0d", "#a7c5ff", "#00d00b"]);

  gPie
    .selectAll(".repPiePart")
    .data(formatedData)
    .enter()
    .append("path")
    .attr("d", d3.arc().innerRadius(0).outerRadius(0))
    .style("fill", (d, i) => color(i))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .transition()
    .duration(800)
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(radius / 2)
        .outerRadius(radius)
    )
    .delay(300);

  // Title
  repartSvg
    .append("text")
    .text("Répartition des EC")
    .attr("x", "50%")
    .attr("y", "30")
    .attr("text-anchor", "middle")
    .attr("class", "chart-title");
};

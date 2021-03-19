const card = document.getElementsByClassName("card-stat")[0];

const dataset = [
  {
    label: "Littoral",
    gains: {
      wouri: 50,
      nkam: 49,
      moungo: 32,
      "sanaga maritime": 48,
    },
    pertes: {
      wouri: 20,
      nkam: 25,
      moungo: 15,
      "sanaga maritime": 20,
    },
    EC: {
      wouri: 20,
      nkam: 25,
      moungo: 15,
      "sanaga maritime": 20,
    },
  },
];

const drawSommeDues = (w, h) => {
  const datasetSommesDuesGains = Object.keys(dataset[0].gains).map(
    (dep) => dataset[0].gains[dep]
  );
  const datasetSommesDuesPertes = Object.keys(dataset[0].pertes).map(
    (dep) => dataset[0].pertes[dep]
  );
  const svgSommeDues = d3
    .select("#sommesDues")
    // Container class to make it responsive.
    .append("svg")
    // Responsive SVG needs these 2 attributes and no width and height attr.
    .attr("viewBox", "0 0 " + w + " " + h)
    .attr("width", w)
    .attr("height", h)
    // Class to make it responsive.
    .attr("id", "sommeDuesSvg")
    .attr("viewBox", "0 0 " + w + " " + h);
  // Scales

  // These scales is define for scaling height of bars
  const barScaleGains = d3
    .scaleLinear()
    .domain([0, d3.max(datasetSommesDuesGains)])
    .range([0, h / 4]);
  const barScalePertes = d3
    .scaleLinear()
    .domain([0, d3.max(datasetSommesDuesPertes)])
    .range([0, h / 4]);

  // Scales for axis
  const yScale1 = d3
    .scaleLinear()
    .domain([d3.max(datasetSommesDuesGains), 0])
    .range([0, h / 4]);
  const yScale2 = d3
    .scaleLinear()
    .domain([0, d3.max(datasetSommesDuesPertes)])
    .range([0, h / 4]);
  const xScale = d3
    .scaleLinear()
    .domain([0, 4])
    .range([w / 4, w - w / 4]);

  // Drawing Bars
  // Drawing Gains
  svgSommeDues
    .append("g")
    .attr("id", "data-gains")
    .attr("class", "data-chart")
    .selectAll(".gain")
    .data(datasetSommesDuesGains)
    .enter()
    .append("rect")
    .attr(
      "x",
      (d, i) =>
        w / 6 + 50 + (i * w - w / 4) / (datasetSommesDuesPertes.length + 1)
    )
    .attr("y", (d) => h / 2)
    .attr("width", 8)
    .attr("height", 0)
    .attr("rx", 4)
    .attr("ry", 4)
    .style("fill", "#0265b5")
    .transition()
    .duration(800)
    .attr("y", (d) => h / 2 - barScaleGains(d))
    .attr("height", (d) => barScaleGains(d) - 10)
    .delay((d, i) => i * 100);

  // Drawing Pertes
  svgSommeDues
    .append("g")
    .attr("id", "data-pertes")
    .attr("class", "data-chart")
    .selectAll(".perte")
    .data(datasetSommesDuesPertes)
    .enter()
    .append("rect")
    .attr(
      "x",
      (d, i) =>
        w / 6 + 50 + (i * w - w / 4) / (datasetSommesDuesPertes.length + 1)
    )
    .attr("y", (d) => h / 2 + 10)
    .attr("width", 8)
    .attr("height", 0)
    .attr("rx", 4)
    .attr("ry", 4)
    .style("fill", "#d99827")
    .transition()
    .duration(800)
    .attr("y", (d) => h / 2 + 10)
    .attr("height", (d) => barScalePertes(d) - 10)
    .delay((d, i) => i * 100);

  // 0 axis
  svgSommeDues
    .append("line")
    .attr("x1", w / 6 + 10)
    .attr("y1", h / 2)
    .attr("x2", w)
    .attr("y2", h / 2)
    .attr("stroke", "#7c828a")
    .attr("stroke-width", "3")
    .attr("stroke-dasharray", "1, 5")
    .attr("stroke-linecap", "round");

  // Left Axis
  const leftAxis1 = d3.axisLeft(yScale1).ticks(3, "f");
  const leftAxis2 = d3.axisLeft(yScale2).ticks(3, "f");

  svgSommeDues
    .append("g")
    .call(leftAxis1)
    .attr("transform", "translate(" + w / 6 + "," + h / 4 + ")");

  svgSommeDues
    .append("g")
    .call(leftAxis2)
    .attr("transform", "translate(" + w / 6 + "," + h / 2 + ")");

  // Texts
  svgSommeDues
    .append("text")
    .text("Sommes Dues")
    .attr("x", "50%")
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("class", "chart-title");

  const deps = Object.keys(dataset[0].gains);

  // Labels
  svgSommeDues
    .selectAll(".labels")
    .data(deps)
    .enter()
    .append("text")
    .text((d, i) =>
      d.split(" ").forEach((word, k) =>
        svgSommeDues
          .append("text")
          .attr("class", "labels")
          .attr("x", (d) => w / 6 + 50 + (i * w - w / 4) / (deps.length + 1))
          .attr("text-anchor", "middle")
          .attr(
            "y",
            (d) =>
              20 + h / 2 + k * 15 + barScalePertes(datasetSommesDuesPertes[i])
          )
          .text(word)
      )
    );

  // Put Currency sign
  document.querySelectorAll("svg g .tick text").forEach((tickText) => {
    tickText.textContent += " FCFA";
  });

  // Separator
  svgSommeDues
    .append("line")
    .attr("x1", 10)
    .attr("x2", w - 10)
    .attr("y1", h - 30)
    .attr("y2", h - 30)
    .attr("stroke-width", 1)
    .attr("stroke", "lightgray");

  // Legend
  svgSommeDues
    .append("circle")
    .attr("cx", 20)
    .attr("cy", h - 10)
    .attr("r", 4)
    .style("fill", "#0265b5");

  svgSommeDues
    .append("text")
    .text("Générés")
    .attr("class", "legend-text")
    .attr("x", 30)
    .attr("y", h - 5);

  svgSommeDues
    .append("circle")
    .attr("cx", w - 90)
    .attr("cy", h - 10)
    .attr("r", 4)
    .style("fill", "#d99827");

  svgSommeDues
    .append("text")
    .text("Recouvrés")
    .attr("x", w - 80)
    .attr("y", h - 5)
    .attr("class", "legend-text");
};

drawSommeDues(card.clientWidth, card.clientHeight - 30);
window.addEventListener("resize", () => {
  document.querySelector("#sommesDues").children[0].remove();
  drawSommeDues(card.clientWidth, card.clientHeight);
});
